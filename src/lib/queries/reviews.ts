import { supabasePublic } from '@/lib/supabase';
import { Review } from '@/types/db';

export async function getApprovedReviews(destinationId?: string) {
    let query = supabasePublic
        .from('reviews')
        .select('*')
        .eq('approved', true) // Only approved
        .order('created_at', { ascending: false });

    if (destinationId) {
        query = query.eq('destination_id', destinationId);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }

    return data as Review[];
}
