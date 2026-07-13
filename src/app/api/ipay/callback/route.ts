import { NextResponse, after } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
    createIPayCallbackChecksum,
    fromIPayOrderId,
    secureEquals,
} from '@/lib/ipay';
import { getUsdToLkrRate } from '@/lib/exchange-rate';
import { sendSafariBookingConfirmation } from '@/lib/email/send-safari-confirmation';

async function parseCallbackBody(request: Request): Promise<Record<string, string>> {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        const json = await request.json();
        return Object.fromEntries(
            Object.entries(json as Record<string, unknown>).map(([key, value]) => [key, String(value ?? '')])
        );
    }
    const formData = await request.formData();
    return Object.fromEntries([...formData.entries()].map(([key, value]) => [key, String(value)]));
}

function reject(status: number, error: string, context: Record<string, unknown>) {
    console.error(`iPay callback rejected (${status}): ${error}`, context);
    return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
    try {
        const payload = await parseCallbackBody(request);

        const transactionReference = payload.transactionReference || '';
        const orderId = payload.orderId || '';
        const transactionAmount = payload.transactionAmount || '';
        const transactionStatus = payload.transactionStatus || '';
        const transactionTimeInMillis = payload.transactionTimeInMillis || '';
        const checksum = payload.checksum || '';

        if (!transactionReference || !orderId || !transactionAmount || !transactionStatus || !transactionTimeInMillis || !checksum) {
            return reject(400, 'Missing iPay callback fields', { receivedKeys: Object.keys(payload) });
        }

        const localChecksum = createIPayCallbackChecksum({
            transactionReference,
            orderId,
            transactionTimeInMillis,
            transactionAmount,
            transactionStatus,
        });

        if (!secureEquals(localChecksum, checksum)) {
            return reject(400, 'Invalid checksum', { orderId, transactionReference });
        }

        const bookingId = fromIPayOrderId(orderId);
        const { data: booking, error: bookingError } = await supabaseAdmin
            .from('bookings')
            .select('id, advance_payment_amount, advance_payment_lkr, advance_payment_status')
            .eq('id', bookingId)
            .single();

        if (bookingError || !booking) {
            return reject(404, 'Booking not found', { orderId, bookingId, bookingError });
        }

        // 'A' = accepted; 'P' = customer paid, settlement to merchant happens end of day.
        const isPaid = transactionStatus === 'A' || transactionStatus === 'P';

        // Declined/cancelled notifications carry nothing to validate or record;
        // acknowledge them before the amount check so they never bounce.
        if (!isPaid) {
            return NextResponse.json({ success: true });
        }

        const paidAmount = Number(transactionAmount.replace(/,/g, ''));
        if (!Number.isFinite(paidAmount)) {
            return reject(400, 'Unparseable payment amount', { orderId, transactionAmount });
        }

        const storedLkr = Number(booking.advance_payment_lkr);
        if (Number.isFinite(storedLkr) && storedLkr > 0) {
            // Compare against the exact LKR amount stored at checkout; 1 LKR of
            // slack covers formatting/rounding differences on the gateway side.
            if (Math.abs(storedLkr - paidAmount) > 1) {
                return reject(400, 'Payment amount mismatch', { orderId, expected: storedLkr, paid: paidAmount });
            }
        } else {
            // Legacy bookings from before the LKR amount was stored: re-derive
            // from the live rate and allow 3% drift since checkout.
            const usdToLkrRate = await getUsdToLkrRate();
            const expectedAmount = Number(booking.advance_payment_amount ?? 8) * usdToLkrRate;
            if (Math.abs(expectedAmount - paidAmount) > expectedAmount * 0.03) {
                return reject(400, 'Payment amount mismatch', { orderId, expected: expectedAmount, paid: paidAmount, usdToLkrRate });
            }
        }

        if (booking.advance_payment_status !== 'paid') {
            const { error: updateError } = await supabaseAdmin
                .from('bookings')
                .update({
                    advance_payment_status: 'paid',
                    status: 'new',
                })
                .eq('id', bookingId);

            if (updateError) {
                return reject(500, 'Booking update failed', { orderId, bookingId, updateError });
            }

            // Send the confirmation after responding so a slow email provider
            // can't make iPay time out waiting for the acknowledgement.
            after(async () => {
                const emailResult = await sendSafariBookingConfirmation(bookingId);
                if (!emailResult.success) {
                    console.error('Failed to send iPay booking confirmation email:', emailResult.error);
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('iPay callback error:', err);
        return NextResponse.json({ error: 'iPay callback failed' }, { status: 500 });
    }
}
