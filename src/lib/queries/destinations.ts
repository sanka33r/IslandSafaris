import { supabasePublic } from '@/lib/supabase';
import { Destination, Image } from '@/types/db';

export async function getDestinations() {
    const { data, error } = await supabasePublic
        .from('destinations')
        .select('*')
        .eq('active', true)
        .order('name');

    if (error) {
        console.error('Error fetching destinations:', error);
        return [];
    }

    return data as Destination[];
}

export async function getAllDestinations() {
    const { data, error } = await supabasePublic
        .from('destinations')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching all destinations:', error);
        return [];
    }

    return data as Destination[];
}

export async function getDestinationBySlug(slug: string) {
    const { data, error } = await supabasePublic
        .from('destinations')
        .select('*')
        .eq('slug', slug)
        .eq('active', true)
        .single();

    if (error) return null;
    return data as Destination;
}

export async function getDestinationById(id: string) {
    const { data, error } = await supabasePublic
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching destination by ID:', error);
        return null;
    }

    return data as Destination;
}

export async function getDestinationImages(destinationId: string) {
    const { data, error } = await supabasePublic
        .from('images')
        .select('*')
        .eq('destination_id', destinationId)
        .order('sort_order');

    if (error) {
        return [];
    }
    return data as Image[];
}
