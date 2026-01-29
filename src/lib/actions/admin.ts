'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateBookingStatus(id: string, status: 'new' | 'confirmed' | 'cancelled') {
    const { error } = await supabaseAdmin
        .from('bookings')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating booking:', error);
        return { success: false, message: 'Failed to update status' };
    }

    revalidatePath('/admin/bookings');
    return { success: true };
}

export async function moderateReview(id: string, approved: boolean) {
    if (approved) {
        const { error } = await supabaseAdmin
            .from('reviews')
            .update({ approved: true })
            .eq('id', id);

        if (error) return { success: false };
    } else {
        // Rejecting - delete it? or just mark approved=false (default)?
        // Usually rejected reviews are deleted or kept hidden. 
        // Let's delete for clean-up or just keep hidden. Rejection implies Deletion in this simple scope.
        const { error } = await supabaseAdmin
            .from('reviews')
            .delete()
            .eq('id', id);

        if (error) return { success: false };
    }

    revalidatePath('/admin/reviews');
    revalidatePath('/destinations'); // Revalidate public pages too?
    return { success: true };
}

export async function updateDestination(id: string, data: any) {
    const { error } = await supabaseAdmin
        .from('destinations')
        .update({
            name: data.name,
            slug: data.slug,
            description: data.description,
            ticket_price: data.ticket_price,
            ticket_pricing_type: data.ticket_pricing_type,
            vehicle_price_up_to_3: data.vehicle_price_up_to_3,
            standard_duration_hours: data.standard_duration_hours,
            active: data.active
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating destination:', error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/destinations');
    revalidatePath(`/destinations/${data.slug}`);
    revalidatePath('/');
    return { success: true };
}

export async function addDestinationImage(destinationId: string, imageData: any) {
    const { error } = await supabaseAdmin
        .from('images')
        .insert({
            destination_id: destinationId,
            secure_url: imageData.secure_url,
            cloudinary_public_id: imageData.cloudinary_public_id || 'manual_upload',
            alt_text: imageData.alt_text,
            sort_order: imageData.sort_order || 0
        });

    if (error) {
        console.error('Error adding image:', error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/destinations');
    return { success: true };
}

export async function createDestination(data: any) {
    const { data: result, error } = await supabaseAdmin
        .from('destinations')
        .insert({
            name: data.name,
            slug: data.slug,
            description: data.description,
            ticket_price: data.ticket_price,
            ticket_pricing_type: data.ticket_pricing_type,
            vehicle_price_up_to_3: data.vehicle_price_up_to_3,
            standard_duration_hours: data.standard_duration_hours,
            active: data.active
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating destination:', error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/destinations');
    revalidatePath('/');
    return { success: true, data: result };
}

export async function deleteDestinationImage(id: string) {
    const { error } = await supabaseAdmin
        .from('images')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting image:', error);
        return { success: false, message: error.message };
    }

    revalidatePath('/admin/destinations');
    return { success: true };
}
