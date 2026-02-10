import { supabasePublic } from '@/lib/supabase';
import { Image } from '@/types/db';
import { Camera, MapPin } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;
export const metadata = {
    title: 'Gallery | Island Safaris Sri Lanka',
    description: 'Explore stunning wildlife photography from our safaris in Minneriya, Kaudulla, and Hurulu Eco Park.',
};

async function getImagesWithDestinations() {
    const { data: images, error } = await supabasePublic
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return [];

    // Get destinations to map names
    const { data: destinations } = await supabasePublic
        .from('destinations')
        .select('id, name, slug');

    const destMap = (destinations || []).reduce((acc, d) => {
        acc[d.id] = { name: d.name, slug: d.slug };
        return acc;
    }, {} as Record<string, { name: string; slug: string }>);

    return (images || []).map(img => ({
        ...img,
        destination: img.destination_id ? destMap[img.destination_id] : null
    })) as (Image & { destination: { name: string; slug: string } | null })[];
}

export default async function GalleryPage() {
    const images = await getImagesWithDestinations();

    // Create masonry-style sizing (assign sizes based on index pattern)
    const getSizeClass = (index: number) => {
        const pattern = index % 6;
        if (pattern === 0) return 'md:col-span-2 md:row-span-2';
        if (pattern === 3) return 'md:col-span-2';
        return '';
    };

    return (
        <div className="min-h-screen bg-secondary-50">
            {/* Hero Header */}
            <div className="relative py-24 md:py-32 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900 overflow-hidden">
                
                <div className="container mx-auto px-6 relative text-center text-white">
                    <span className="inline-flex items-center gap-2 bg-secondary-600/20 backdrop-blur-sm border border-secondary-400/30 rounded-full px-4 py-2 mb-6">
                        <Camera size={16} className="text-secondary-400" />
                        <span className="text-secondary-300 text-sm font-medium">{images.length} Photos</span>
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Safari Gallery</h1>
                    <p className="text-safari-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Glimpses of the wild. Captured moments from our safaris across Sri Lanka&apos;s 
                        most spectacular national parks.
                    </p>
                </div>
            </div>

            {/* Gallery Content */}
            <div className="container mx-auto px-6 py-16">
                {images.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-safari-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Camera size={40} className="text-safari-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-safari-900 mb-2">No Photos Yet</h3>
                        <p className="text-safari-600 mb-8">Our gallery is being curated. Check back soon for stunning wildlife photography!</p>
                        <Link 
                            href="/destinations" 
                            className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-full font-bold transition-all"
                        >
                            Explore Destinations
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Masonry Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                            {images.map((img, index) => (
                                <div 
                                    key={img.id} 
                                    className={`group relative overflow-hidden rounded-2xl bg-safari-200 cursor-pointer ${getSizeClass(index)}`}
                                >
                                    <img
                                        src={img.secure_url}
                                        alt={img.alt_text || 'Safari Image'}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {img.alt_text && (
                                            <p className="text-white font-medium text-lg mb-2">{img.alt_text}</p>
                                        )}
                                        {img.destination && (
                                            <Link 
                                                href={`/destinations/${img.destination.slug}`}
                                                className="inline-flex items-center gap-2 text-secondary-400 text-sm font-medium hover:text-secondary-300 transition-colors"
                                            >
                                                <MapPin size={14} />
                                                {img.destination.name}
                                            </Link>
                                        )}
                                    </div>

                                    {/* Corner Badge */}
                                    {img.destination && (
                                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="bg-white/90 backdrop-blur-sm text-safari-800 text-xs font-bold px-3 py-1.5 rounded-full">
                                                {img.destination.name.split(' ')[0]}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* View by Destination */}
                        <div className="mt-16 text-center">
                            <h3 className="text-2xl font-bold text-safari-900 mb-6">View by Destination</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link 
                                    href="/destinations/minneriya-national-park" 
                                    className="px-6 py-3 bg-white rounded-full font-semibold text-safari-800 hover:bg-secondary-600 hover:text-white transition-all shadow-sm border border-safari-100"
                                >
                                    Minneriya National Park
                                </Link>
                                <Link 
                                    href="/destinations/kaudulla-national-park" 
                                    className="px-6 py-3 bg-white rounded-full font-semibold text-safari-800 hover:bg-secondary-600 hover:text-white transition-all shadow-sm border border-safari-100"
                                >
                                    Kaudulla National Park
                                </Link>
                                <Link 
                                    href="/destinations/hurulu-eco-park" 
                                    className="px-6 py-3 bg-white rounded-full font-semibold text-safari-800 hover:bg-secondary-600 hover:text-white transition-all shadow-sm border border-safari-100"
                                >
                                    Hurulu Eco Park
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* CTA Section */}
            <section className="py-16 bg-safari-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-safari-900 via-safari-800 to-safari-900" />
                <div className="container mx-auto px-6 relative text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Want to Capture Your Own Moments?
                    </h2>
                    <p className="text-safari-300 text-lg max-w-2xl mx-auto mb-8">
                        Book a safari and create memories that last a lifetime. Our guides know the perfect spots.
                    </p>
                    <Link
                        href="/booking"
                        className="inline-flex items-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl"
                    >
                        <Camera size={20} />
                        Book Your Safari
                    </Link>
                </div>
            </section>
        </div>
    );
}
