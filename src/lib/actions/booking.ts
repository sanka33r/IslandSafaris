'use server';

import { bookingSchema, BookingFormData } from '@/lib/schemas/booking';
import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { SAFARI_EXTRA_PERSON_USD, SAFARI_MAX_GROUP_SIZE } from '@/lib/constants';
import { getExtraHourPriceUsd } from '@/lib/settings';

// All amounts in USD. Destination ticket_price and vehicle_price_up_to_3 are stored in USD.
async function calculatePrice(data: BookingFormData) {
    const { data: dest } = await supabaseAdmin
        .from('destinations')
        .select('*')
        .eq('id', data.destination_id)
        .single();

    if (!dest) throw new Error("Destination not found");

    const vehicleCount = Math.ceil(data.group_size / SAFARI_MAX_GROUP_SIZE);
    const vehicleCost = vehicleCount * dest.vehicle_price_up_to_3;

    let ticketCost = 0;
    if (dest.ticket_pricing_type === 'per_person') {
        ticketCost = dest.ticket_price * data.group_size;
    } else {
        ticketCost = dest.ticket_price;
    }

    const extraHourPriceUsd = await getExtraHourPriceUsd();
    const extraHoursCost = data.extra_hours * extraHourPriceUsd * vehicleCount;
    const extraPersonCount = Math.max(0, data.group_size - 3);
    const extraPersonCostUsd = extraPersonCount * SAFARI_EXTRA_PERSON_USD;

    const ourCharge = vehicleCost + extraHoursCost + extraPersonCostUsd;

    return {
        tickets: ticketCost,
        vehicle: vehicleCost,
        extra_hours: extraHoursCost,
        extra_person: extraPersonCostUsd,
        total: ourCharge,
        vehicle_count: vehicleCount,
        currency: 'USD'
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitBooking(prevState: any, formData: BookingFormData) {
    const result = bookingSchema.safeParse(formData);

    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const pricing = await calculatePrice(result.data);

    // Insert into DB
    const { data: booking, error } = await supabaseAdmin
        .from('bookings')
        .insert({
            destination_id: result.data.destination_id,
            date: result.data.date,
            time: result.data.time,
            group_size: result.data.group_size,
            pickup_required: result.data.pickup_required,
            hotel_name: result.data.hotel_name,
            pickup_location: result.data.pickup_location || null,
            extra_hours: result.data.extra_hours,
            customer_name: result.data.customer_name,
            email: result.data.email,
            phone: result.data.phone,
            passport_number: result.data.passport_number || null,
            promo_code: result.data.promo_code || null,
            message: result.data.message,
            advance_payment_amount: 8,
            advance_payment_status: 'pending',
            status: 'payment_pending',
        })
        .select('id')
        .single();

    if (error || !booking) {
        console.error('Booking Error:', error);
        return { success: false, message: 'Failed to submit booking. Please try again.' };
    }

    revalidatePath('/admin/bookings');

    return { success: true, pricing, bookingId: booking.id };
}
