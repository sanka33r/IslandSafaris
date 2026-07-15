'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const reviewSchema = z.object({
    destination_id: z.string().uuid().optional().or(z.literal('')).or(z.string().nullable()),
    name: z.string().trim().min(2, 'Name is required'),
    rating: z.coerce.number().int().min(1).max(5),
    comment: z.string().trim().min(0, 'Comment is required'),
});

export async function submitReview(destinationId: string | null | undefined, formData: FormData) {
    const resolvedFormData = new FormData();
    const entries = Array.from(formData.entries());

    for (const [key, value] of entries) {
        if (typeof value === 'string') {
            const normalizedKey = key.replace(/^\d+_/, '');
            resolvedFormData.append(normalizedKey, value);
        }
    }

    const rawData = {
        destination_id: destinationId || formData.get('destination_id') || resolvedFormData.get('destination_id'),
        name: resolvedFormData.get('name') || formData.get('name'),
        rating: resolvedFormData.get('rating') || formData.get('rating'),
        comment: resolvedFormData.get('comment') || formData.get('comment'),
    };

    const result = reviewSchema.safeParse(rawData);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
            message: 'Please check your review details and try again.'
        };
    }

    const { error } = await supabaseAdmin
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
