import { supabasePublic } from '@/lib/supabase';
import { Image } from '@/types/db';

export const revalidate = 3600;
export const metadata = {
    title: 'Gallery | Island Safaris Sri Lanka',
};

async function getImages() {
    const { data, error } = await supabasePublic
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return [];
    return data as Image[];
}

export default async function GalleryPage() {
    const images = await getImages();

    return (
        <div className="bg-safari-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-safari-900 mb-4">Our Gallery</h1>
                    <p className="text-safari-600">Glimpses of the wild. Captured moments from our safaris.</p>
                </div>

                {images.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-safari-400 text-lg">No images uploaded yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="relative group overflow-hidden rounded-xl aspect-square bg-safari-200">
                                {/* Real implementation would use CldImage or next/image with Cloudinary loader */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={img.secure_url}
                                    alt={img.alt_text || 'Safari Image'}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-medium px-4 text-center">{img.alt_text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
