import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import { supabaseAdmin } from '@/lib/supabase';
import { sendSafariBookingConfirmation } from '@/lib/email/send-safari-confirmation';

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
                status: 'new',
            })
            .eq('id', bookingId);

        if (error) {
            console.error('Failed to update booking after capture:', error);
            return NextResponse.json({ error: 'Booking update failed' }, { status: 500 });
        }

        // Send safari booking confirmation email (safari bookings only; no-op for packages)
        const emailResult = await sendSafariBookingConfirmation(bookingId);
        if (!emailResult.success) {
            console.error('Failed to send booking confirmation email:', emailResult.error);
        }

        return NextResponse.json({ success: true, captureId: result.captureId, bookingId });
    } catch (err) {
        console.error('PayPal capture-order error:', err);
        const message = err instanceof Error ? err.message : 'Failed to capture payment';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
