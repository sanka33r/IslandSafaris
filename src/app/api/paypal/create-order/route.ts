import { NextResponse } from 'next/server';
import { createPayPalOrder } from '@/lib/paypal';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bookingId } = body as { bookingId?: string };

        if (!bookingId || typeof bookingId !== 'string') {
            return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
        }

        const { data: booking, error } = await supabaseAdmin
            .from('bookings')
            .select('id, advance_payment_amount, advance_payment_status')
            .eq('id', bookingId)
            .single();

        if (error || !booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.advance_payment_status === 'paid') {
            return NextResponse.json({ error: 'This booking is already paid' }, { status: 400 });
        }

        const amount = Number(booking.advance_payment_amount ?? 5);
        if (amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        const { orderId } = await createPayPalOrder({
            amountUsd: amount.toFixed(2),
            bookingId,
            description: `Advance payment - Island Safaris`,
        });

        return NextResponse.json({ orderId });
    } catch (err) {
        // Log full error server-side (visible in Vercel/server logs)
        console.error('PayPal create-order error:', err);
        // Return a generic message to the client — never expose API/stack details to users
        return NextResponse.json(
            { error: 'Payment is temporarily unavailable. Please try again later or contact us.' },
            { status: 500 }
        );
    }
}
