'use server';

import { supabasePublic } from '@/lib/supabase';
import { z } from 'zod';

const reviewSchema = z.object({
    destination_id: z.string().uuid().optional().or(z.literal('')),
    name: z.string().min(2, "Name is required"),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(10, "Review must be at least 10 characters"),
});

export async function submitReview(destinationId: string | null | undefined, formData: FormData) {
    const rawData = {
        destination_id: destinationId || formData.get('destination_id'),
        name: formData.get('name'),
        rating: formData.get('rating'),
        comment: formData.get('comment'),
    };

    const result = reviewSchema.safeParse(rawData);

    if (!result.success) {
        return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const { error } = await supabasePublic
        .from('reviews')
        .insert({
            destination_id: result.data.destination_id || null, // Handle empty string vs null
            name: result.data.name,
            rating: result.data.rating,
            comment: result.data.comment,
            approved: false // Default to false
        });

    if (error) {
        console.error("Review Submit Error:", error);
        return { success: false, message: 'Failed to submit review' };
    }

    return { success: true };
}
