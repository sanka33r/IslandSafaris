import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createPayHereNotificationHash, getPayHereMerchantId, secureEquals } from '@/lib/payhere';
import { sendSafariBookingConfirmation } from '@/lib/email/send-safari-confirmation';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const merchantId = String(formData.get('merchant_id') || '');
        const orderId = String(formData.get('order_id') || '');
        const payhereAmount = String(formData.get('payhere_amount') || '');
        const payhereCurrency = String(formData.get('payhere_currency') || '');
        const statusCode = String(formData.get('status_code') || '');
        const md5sig = String(formData.get('md5sig') || '');

        if (!merchantId || !orderId || !payhereAmount || !payhereCurrency || !statusCode || !md5sig) {
            return NextResponse.json({ error: 'Missing PayHere notification fields' }, { status: 400 });
        }

        if (merchantId !== getPayHereMerchantId()) {
            return NextResponse.json({ error: 'Invalid merchant' }, { status: 400 });
        }

        const localSig = createPayHereNotificationHash({
            merchantId,
            orderId,
            amount: payhereAmount,
            currency: payhereCurrency,
            statusCode,
        });

        if (!secureEquals(localSig, md5sig.toUpperCase())) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const { data: booking, error: bookingError } = await supabaseAdmin
            .from('bookings')
            .select('id, advance_payment_amount, advance_payment_status')
            .eq('id', orderId)
            .single();

        if (bookingError || !booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        const expectedAmount = Number(booking.advance_payment_amount ?? 8);
        const paidAmount = Number(payhereAmount);
        if (payhereCurrency !== 'USD' || Math.abs(expectedAmount - paidAmount) > 0.01) {
            return NextResponse.json({ error: 'Payment amount mismatch' }, { status: 400 });
        }

        if (statusCode === '2' && booking.advance_payment_status !== 'paid') {
            const { error: updateError } = await supabaseAdmin
                .from('bookings')
                .update({
                    advance_payment_status: 'paid',
                    status: 'new',
                })
                .eq('id', orderId);

            if (updateError) {
                console.error('Failed to update booking after PayHere notification:', updateError);
                return NextResponse.json({ error: 'Booking update failed' }, { status: 500 });
            }

            const emailResult = await sendSafariBookingConfirmation(orderId);
            if (!emailResult.success) {
                console.error('Failed to send PayHere booking confirmation email:', emailResult.error);
            }
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('PayHere notify error:', err);
        return NextResponse.json({ error: 'PayHere notification failed' }, { status: 500 });
    }
}
