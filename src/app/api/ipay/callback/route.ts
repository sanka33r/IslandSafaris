import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
    createIPayCallbackChecksum,
    formatIPayAmount,
    fromIPayOrderId,
    secureEquals,
} from '@/lib/ipay';
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
            return NextResponse.json({ error: 'Missing iPay callback fields' }, { status: 400 });
        }

        const localChecksum = createIPayCallbackChecksum({
            transactionReference,
            orderId,
            transactionTimeInMillis,
            transactionAmount,
            transactionStatus,
        });

        if (!secureEquals(localChecksum, checksum)) {
            return NextResponse.json({ error: 'Invalid checksum' }, { status: 400 });
        }

        const bookingId = fromIPayOrderId(orderId);
        const { data: booking, error: bookingError } = await supabaseAdmin
            .from('bookings')
            .select('id, advance_payment_amount, advance_payment_status')
            .eq('id', bookingId)
            .single();

        if (bookingError || !booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        const expectedAmount = Number(formatIPayAmount(Number(booking.advance_payment_amount ?? 8)));
        const paidAmount = Number(transactionAmount);
        if (!Number.isFinite(paidAmount) || Math.abs(expectedAmount - paidAmount) > 0.01) {
            return NextResponse.json({ error: 'Payment amount mismatch' }, { status: 400 });
        }

        // 'A' = accepted; 'P' = customer paid, settlement to merchant happens end of day.
        const isPaid = transactionStatus === 'A' || transactionStatus === 'P';

        if (isPaid && booking.advance_payment_status !== 'paid') {
            const { error: updateError } = await supabaseAdmin
                .from('bookings')
                .update({
                    advance_payment_status: 'paid',
                    status: 'new',
                })
                .eq('id', bookingId);

            if (updateError) {
                console.error('Failed to update booking after iPay callback:', updateError);
                return NextResponse.json({ error: 'Booking update failed' }, { status: 500 });
            }

            const emailResult = await sendSafariBookingConfirmation(bookingId);
            if (!emailResult.success) {
                console.error('Failed to send iPay booking confirmation email:', emailResult.error);
            }
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('iPay callback error:', err);
        return NextResponse.json({ error: 'iPay callback failed' }, { status: 500 });
    }
}
