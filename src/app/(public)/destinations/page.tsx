'use client';

import Link from 'next/link';
import { useGlobalData } from '@/providers/GlobalDataProvider';
import { ArrowRight, MapPin, Clock, Calendar, Camera, Car } from 'lucide-react';

// export const revalidate = 3600; // Not needed for client component

const seasonInfo: Record<string, { months: string; color: string; bgColor: string }> = {
    'minneriya-national-park': { months: 'Jul - Sep', color: 'text-green-600', bgColor: 'bg-green-100' },
    'kaudulla-national-park': { months: 'Oct - Nov', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    'hurulu-eco-park': { months: 'Dec - Jan', color: 'text-blue-600', bgColor: 'bg-blue-100' },
};

export default function DestinationsPage() {
    const { destinations, isLoading } = useGlobalData();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50">
            {/* Hero Header */}
            <div className="relative h-[70vh] bg-safari-900 overflow-hidden flex items-center justify-center">
                {/* Background Pattern/Gradient */}
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dtsuvx8dz/image/upload/v1706679901/cld-sample-2.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-safari-900/50 to-secondary-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-safari-900/90 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="animate-fade-in-up">
                            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 text-white/90">
                                <MapPin size={16} className="text-secondary-400" />
                                <span className="text-sm font-bold tracking-widest uppercase">The Wild Awaits</span>
                            </span>
                            <h1 className="text-6xl md:text-8xl font-bold mb-8 font-display text-white leading-tight">
                                Safari <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-500">Destinations</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-safari-100/80 leading-relaxed max-w-2xl font-light">
                                Journey through the heart of Sri Lanka's wilderness. Witness the gathering of giants in their natural habitat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Migration Overview */}
            <div className="container mx-auto px-6 -mt-20 relative z-20 mb-20">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center shrink-0">
                                <Calendar className="text-secondary-600" size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-safari-900 mb-2">The Great Elephant Migration</h3>
                                <p className="text-safari-600 leading-relaxed max-w-xl">
                                    Experience one of the world's greatest natural spectacles.
                                    Our elephants move between parks following the rains and water availability.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-safari-50 border border-safari-100 min-w-[140px]">
                                <span className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-200" />
                                <span className="text-xs font-bold uppercase tracking-wider text-safari-400">Jul - Sep</span>
                                <span className="text-safari-900 font-bold">Minneriya</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-safari-50 border border-safari-100 min-w-[140px]">
                                <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-200" />
                                <span className="text-xs font-bold uppercase tracking-wider text-safari-400">Oct - Nov</span>
                                <span className="text-safari-900 font-bold">Kaudulla</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary-50 border border-secondary-100 min-w-[140px] shadow-sm transform scale-105 ring-2 ring-secondary-200">
                                <span className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-200" />
                                <span className="text-xs font-bold uppercase tracking-wider text-secondary-600">Dec - Jan</span>
                                <span className="text-safari-900 font-bold">Hurulu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="container mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {destinations.map((destination, index) => {
                        const season = seasonInfo[destination.slug] || { months: 'Year-round', color: 'text-safari-600', bgColor: 'bg-safari-100' };
                        const isFeature = index === 0;

                        return (
                            <Link
                                key={destination.id}
                                href={`/destinations/${destination.slug}`}
                                className={`group relative block bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-safari-50 hover:-translate-y-2 ${isFeature ? 'lg:col-span-2' : ''}`}
                            >
                                <div className={`grid ${isFeature ? 'md:grid-cols-5 h-full' : 'grid-cols-1'}`}>
                                    {/* Image Section */}
                                    <div className={`relative ${isFeature ? 'md:col-span-3 aspect-[4/3] md:aspect-auto' : 'aspect-[16/10]'} bg-safari-200 overflow-hidden`}>
                                        {destination.images[0] ? (
                                            <img
                                                src={destination.images[0].secure_url}
                                                alt={destination.images[0].alt_text || destination.name}
                                                className="w-full h-full object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-safari-400 to-safari-600 flex items-center justify-center">
                                                <Camera className="text-white/30" size={64} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:hidden" />

                                        {/* Badges */}
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <span className={`inline-flex items-center gap-2 ${season.bgColor} ${season.color} text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm`}>
                                                <Calendar size={12} />
                                                Peak: {season.months}
                                            </span>
                                        </div>

                                        {/* Mobile Title Overlay */}
                                        <div className={`absolute bottom-6 left-6 right-6 md:hidden`}>
                                            <h2 className="text-3xl font-bold text-white font-display mb-1">
                                                {destination.name}
                                            </h2>
                                            <div className="flex items-center gap-2 text-white/90 text-sm">
                                                <MapPin size={14} className="text-secondary-400" />
                                                National Park
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className={`p-8 md:p-10 flex flex-col justify-between ${isFeature ? 'md:col-span-2' : ''}`}>
                                        <div>
                                            {/* Desktop Title */}
                                            <div className="hidden md:block mb-6">
                                                <div className="flex items-center gap-2 text-xs font-bold text-secondary-600 uppercase tracking-[0.2em] mb-3">
                                                    <MapPin size={14} />
                                                    National Park
                                                </div>
                                                <h2 className="text-3xl lg:text-4xl font-bold text-safari-900 group-hover:text-secondary-700 transition-colors font-display leading-tight">
                                                    {destination.name}
                                                </h2>
                                            </div>

                                            <p className={`text-safari-600 leading-relaxed mb-8 ${isFeature ? 'text-base md:text-lg line-clamp-4' : 'line-clamp-3'}`}>
                                                {destination.summary || destination.description}
                                            </p>

                                            {/* Detailed Stats */}
                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-center justify-between p-3 rounded-xl bg-safari-50 group-hover:bg-white border border-transparent group-hover:border-safari-100 transition-all">
                                                    <div className="flex items-center gap-3 text-safari-700">
                                                        <Clock size={18} className="text-secondary-500" />
                                                        <span className="font-medium text-sm">Duration</span>
                                                    </div>
                                                    <span className="font-bold text-safari-900">{destination.standard_duration_hours} Hours</span>
                                                </div>
                                                <div className="flex items-center justify-between p-3 rounded-xl bg-safari-50 group-hover:bg-white border border-transparent group-hover:border-safari-100 transition-all">
                                                    <div className="flex items-center gap-3 text-safari-700">
                                                        <Car size={18} className="text-secondary-500" />
                                                        <span className="font-medium text-sm">Private Jeep</span>
                                                    </div>
                                                    <span className="font-bold text-safari-900">
                                                        Rs. {destination.vehicle_price_up_to_3.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between pt-6 border-t border-safari-100">
                                            <span className="text-secondary-700 font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all inline-flex items-center gap-2">
                                                Explore Park
                                                <div className="bg-secondary-100 rounded-full p-1 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                                                    <ArrowRight size={14} />
                                                </div>
                                            </span>

                                            {/* Thumbnail Preview */}
                                            {destination.images.length > 1 && (
                                                <div className="flex -space-x-3">
                                                    {destination.images.slice(1, 4).map((img, idx) => (
                                                        <div
                                                            key={img.id}
                                                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
                                                            style={{ zIndex: 3 - idx }}
                                                        >
                                                            <img
                                                                src={img.secure_url}
                                                                alt=""
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                    {destination.images.length > 4 && (
                                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-safari-900 text-white flex items-center justify-center text-[10px] font-bold shadow-md" style={{ zIndex: 0 }}>
                                                            +{destination.images.length - 4}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {destinations.length === 0 && (
                    <div className="text-center py-32 opacity-60">
                        <div className="w-24 h-24 bg-safari-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin size={40} className="text-safari-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-safari-900 mb-2 font-display">No Destinations Yet</h3>
                        <p className="text-safari-600">Our scouts are out looking for new adventures.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
