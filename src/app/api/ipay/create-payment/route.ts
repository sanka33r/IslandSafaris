import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
    createIPayCheckoutChecksum,
    formatIPayAmount,
    getIPayCheckoutUrl,
    getIPayMerchantWebToken,
    toIPayOrderId,
} from '@/lib/ipay';
import { getUsdToLkrRate } from '@/lib/exchange-rate';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bookingId } = body as { bookingId?: string };

        if (!bookingId || typeof bookingId !== 'string') {
            return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
        }

        const { data: booking, error } = await supabaseAdmin
            .from('bookings')
            .select('id, customer_name, email, phone, advance_payment_amount, advance_payment_status')
            .eq('id', bookingId)
            .single();

        if (error || !booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.advance_payment_status === 'paid') {
            return NextResponse.json({ error: 'This booking is already paid' }, { status: 400 });
        }

        const merchantWebToken = getIPayMerchantWebToken();
        const orderId = toIPayOrderId(booking.id);
        const usdToLkrRate = await getUsdToLkrRate();
        const totalAmount = formatIPayAmount(Number(booking.advance_payment_amount ?? 8), usdToLkrRate);

        // Persist the exact LKR amount sent to iPay so the callback can
        // validate against it instead of re-deriving it from a live rate.
        // Non-fatal: if the advance_payment_lkr column/migration isn't in
        // place yet, the callback falls back to its live-rate comparison.
        const { error: lkrUpdateError } = await supabaseAdmin
            .from('bookings')
            .update({ advance_payment_lkr: Number(totalAmount) })
            .eq('id', booking.id);

        if (lkrUpdateError) {
            console.error('iPay create-payment: failed to store LKR amount for booking', booking.id, lkrUpdateError);
        }

        const origin = new URL(request.url).origin;
        const confirmationUrl = `${origin}/packages/book/confirmation/${booking.id}`;

        return NextResponse.json({
            action: getIPayCheckoutUrl(),
            fields: {
                merchantWebToken,
                orderId,
                orderDescription: 'Island Safaris advance payment',
                totalAmount,
                returnUrl: `${confirmationUrl}?payment=return`,
                cancelUrl: `${confirmationUrl}?payment=cancelled`,
                customerName: booking.customer_name || 'Guest',
                customerPhone: booking.phone || '',
                customerEmail: booking.email || '',
                merchantParam1: booking.id,
                merchantParam2: 'safari-advance',
                checksum: createIPayCheckoutChecksum({ merchantWebToken, orderId, totalAmount }),
            },
        });
    } catch (err) {
        console.error('iPay create-payment error:', err);
        return NextResponse.json(
            { error: 'iPay is temporarily unavailable. Please try again later or contact us.' },
            { status: 500 }
        );
    }
}
