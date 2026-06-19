import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
    PAYHERE_CURRENCY,
    createPayHereCheckoutHash,
    formatPayHereAmount,
    getPayHereMerchantId,
} from '@/lib/payhere';

function splitCustomerName(name: string): { firstName: string; lastName: string } {
    const parts = name.trim().split(/\s+/);
    const firstName = parts.shift() || 'Guest';
    return {
        firstName,
        lastName: parts.join(' ') || firstName,
    };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { bookingId } = body as { bookingId?: string };

        if (!bookingId || typeof bookingId !== 'string') {
            return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
        }

        const { data: booking, error } = await supabaseAdmin
            .from('bookings')
            .select('id, customer_name, email, phone, hotel_name, pickup_location, advance_payment_amount, advance_payment_status')
            .eq('id', bookingId)
            .single();

        if (error || !booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (booking.advance_payment_status === 'paid') {
            return NextResponse.json({ error: 'This booking is already paid' }, { status: 400 });
        }

        const merchantId = getPayHereMerchantId();
        const amount = formatPayHereAmount(Number(booking.advance_payment_amount ?? 8));
        const origin = new URL(request.url).origin;
        const notifyUrl = process.env.PAYHERE_NOTIFY_URL || `${origin}/api/payhere/notify`;
        const { firstName, lastName } = splitCustomerName(booking.customer_name || 'Guest');

        return NextResponse.json({
            sandbox: process.env.PAYHERE_MODE !== 'live',
            merchant_id: merchantId,
            return_url: `${origin}/booking`,
            cancel_url: `${origin}/booking`,
            notify_url: notifyUrl,
            order_id: booking.id,
            items: 'Island Safaris advance payment',
            amount,
            currency: PAYHERE_CURRENCY,
            hash: createPayHereCheckoutHash({
                merchantId,
                orderId: booking.id,
                amount,
                currency: PAYHERE_CURRENCY,
            }),
            first_name: firstName,
            last_name: lastName,
            email: booking.email,
            phone: booking.phone,
            address: booking.pickup_location || booking.hotel_name || 'Island Safaris booking',
            city: 'Habarana',
            country: 'Sri Lanka',
            custom_1: booking.id,
            custom_2: 'safari-advance',
        });
    } catch (err) {
        console.error('PayHere create-payment error:', err);
        return NextResponse.json(
            { error: 'PayHere is temporarily unavailable. Please try again later or contact us.' },
            { status: 500 }
        );
    }
}
