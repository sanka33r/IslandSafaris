'use server';

import { bookingSchema, BookingFormData } from '@/lib/schemas/booking';
import { supabasePublic } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// Helper to calculate price implementation
async function calculatePrice(data: BookingFormData) {
    // Fetch destination pricing
    const { data: dest } = await supabasePublic
        .from('destinations')
        .select('*')
        .eq('id', data.destination_id)
        .single();

    if (!dest) throw new Error("Destination not found");

    // Fetch extra hour price from settings
    // Ideally this should be cached or fetched once
    // For now assuming 5000 or fetching
    const { data: settings } = await supabasePublic
        .from('settings')
        .select('value')
        .eq('key', 'extra_hour_price')
        .single();

    const extraHourPrice = settings ? parseInt(settings.value) : 5000;

    const vehicleCount = Math.ceil(data.group_size / 3);
    const vehicleCost = vehicleCount * dest.vehicle_price_up_to_3;

    let ticketCost = 0;
    if (dest.ticket_pricing_type === 'per_person') {
        ticketCost = dest.ticket_price * data.group_size;
    } else {
        // flat rate? implied per jeep usually but assume flat per group or similar?
        ticketCost = dest.ticket_price * data.group_size;
    }

    const extraHoursCost = data.extra_hours * extraHourPrice * vehicleCount; // Extra hours per jeep? Usually yes.

    return {
        tickets: ticketCost,
        vehicle: vehicleCost,
        extra_hours: extraHoursCost,
        total: ticketCost + vehicleCost + extraHoursCost,
        vehicle_count: vehicleCount,
        currency: 'LKR'
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
    const { error } = await supabasePublic
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
            status: 'new'
        });

    if (error) {
        console.error('Booking Error:', error);
        return { success: false, message: 'Failed to submit booking. Please try again.' };
    }

    revalidatePath('/admin/bookings');

    return { success: true, pricing };
}
