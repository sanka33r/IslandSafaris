import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
        return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    const { data: booking, error } = await supabaseAdmin
        .from('bookings')
        .select('id, advance_payment_status')
        .eq('id', bookingId)
        .single();

    if (error || !booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({
        paid: booking.advance_payment_status === 'paid',
        status: booking.advance_payment_status,
    });
}
