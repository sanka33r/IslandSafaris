import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId, bookingId } = body as { orderId?: string; bookingId?: string };

        if (!orderId || !bookingId) {
            return NextResponse.json({ error: 'Missing orderId or bookingId' }, { status: 400 });
        }

        const result = await capturePayPalOrder(orderId);

        if (!result.success) {
            return NextResponse.json({ error: 'Payment capture failed' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('bookings')
            .update({
                advance_payment_status: 'paid',
            })
            .eq('id', bookingId);

        if (error) {
            console.error('Failed to update booking after capture:', error);
            return NextResponse.json({ error: 'Booking update failed' }, { status: 500 });
        }

        return NextResponse.json({ success: true, captureId: result.captureId });
    } catch (err) {
        console.error('PayPal capture-order error:', err);
        const message = err instanceof Error ? err.message : 'Failed to capture payment';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
