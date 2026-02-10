import { supabasePublic } from '@/lib/supabase';
import { Destination, Image } from '@/types/db';

export type DestinationWithImages = Destination & { images: Image[] };

export async function getDestinations(): Promise<Destination[]> {
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

export async function getDestinationsWithImages(): Promise<DestinationWithImages[]> {
    const { data: destinations, error } = await supabasePublic
        .from('destinations')
        .select('*')
        .eq('active', true)
        .order('name');

    if (error) {
        console.error('Error fetching destinations:', error);
        return [];
    }

    // Fetch images for all destinations
    const { data: images } = await supabasePublic
        .from('images')
        .select('*')
        .order('sort_order');

    const imagesByDestination = (images || []).reduce((acc, img) => {
        if (img.destination_id) {
            if (!acc[img.destination_id]) acc[img.destination_id] = [];
            acc[img.destination_id].push(img);
        }
        return acc;
    }, {} as Record<string, Image[]>);

    return (destinations || []).map(dest => ({
        ...dest,
        images: imagesByDestination[dest.id] || []
    })) as DestinationWithImages[];
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
