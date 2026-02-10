import Link from 'next/link';
import { getDestinationsWithImages } from '@/lib/queries/destinations';
import { ArrowRight, MapPin, Clock, Calendar, Camera } from 'lucide-react';

export const revalidate = 3600;

const seasonInfo: Record<string, { months: string; color: string; bgColor: string }> = {
    'minneriya-national-park': { months: 'Jul - Sep', color: 'text-green-600', bgColor: 'bg-green-100' },
    'kaudulla-national-park': { months: 'Oct - Nov', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    'hurulu-eco-park': { months: 'Dec - Jan', color: 'text-blue-600', bgColor: 'bg-blue-100' },
};

export default async function DestinationsPage() {
    const destinations = await getDestinationsWithImages();

    return (
        <div className="min-h-screen bg-secondary-50">
            {/* Hero Header */}
            <div className="relative py-24 md:py-32 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900 overflow-hidden">
                
                <div className="container mx-auto px-6 relative">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <span className="inline-flex items-center gap-2 bg-secondary-600/20 backdrop-blur-sm border border-secondary-400/30 rounded-full px-4 py-2 mb-6">
                            <MapPin size={16} className="text-secondary-400" />
                            <span className="text-secondary-300 text-sm font-medium">3 Iconic Parks</span>
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Our Safari <span className="text-secondary-400">Destinations</span>
                        </h1>
                        <p className="text-lg md:text-xl text-safari-200 leading-relaxed">
                            Embark on a journey through Sri Lanka&apos;s most breathtaking national parks.
                            Witness the gathering of giants and the untouched beauty of the wild.
                        </p>
                    </div>
                </div>
            </div>

            {/* Migration Overview */}
            <div className="container mx-auto px-6 -mt-8 relative z-10 mb-16">
                <div className="bg-white rounded-2xl shadow-xl border border-safari-100 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                                <Calendar className="text-secondary-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-safari-900">The Great Elephant Migration</h3>
                                <p className="text-safari-600 text-sm">Elephants move between parks based on water availability</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full" />
                                <span className="text-safari-700">Jul-Sep: Minneriya</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                                <span className="text-safari-700">Oct-Nov: Kaudulla</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-blue-500 rounded-full" />
                                <span className="text-safari-700">Dec-Jan: Hurulu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="container mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {destinations.map((destination, index) => {
                        const season = seasonInfo[destination.slug] || { months: 'Year-round', color: 'text-safari-600', bgColor: 'bg-safari-100' };
                        const isFeature = index === 0;
                        
                        return (
                            <Link
                                key={destination.id}
                                href={`/destinations/${destination.slug}`}
                                className={`group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-safari-100 hover:-translate-y-2 ${isFeature ? 'lg:col-span-2' : ''}`}
                            >
                                <div className={`grid ${isFeature ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                                    {/* Image Section */}
                                    <div className={`relative ${isFeature ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[16/10]'} bg-safari-200 overflow-hidden`}>
                                        {destination.images[0] ? (
                                            <img
                                                src={destination.images[0].secure_url}
                                                alt={destination.images[0].alt_text || destination.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-safari-400 to-safari-600 flex items-center justify-center">
                                                <Camera className="text-white/30" size={64} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        
                                        {/* Season Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`inline-flex items-center gap-1.5 ${season.bgColor} ${season.color} text-xs font-bold px-3 py-1.5 rounded-full`}>
                                                <Calendar size={12} />
                                                Peak: {season.months}
                                            </span>
                                        </div>

                                        {/* Image Count Badge */}
                                        {destination.images.length > 1 && (
                                            <div className="absolute top-4 right-4">
                                                <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                                                    <Camera size={12} />
                                                    {destination.images.length} photos
                                                </span>
                                            </div>
                                        )}

                                        {/* Mobile Title Overlay */}
                                        <div className={`absolute bottom-4 left-4 right-4 ${isFeature ? 'md:hidden' : ''}`}>
                                            <div className="flex items-center gap-2 text-xs font-medium text-white/80 mb-1">
                                                <MapPin size={14} className="text-secondary-400" />
                                                National Park
                                            </div>
                                            <h2 className="text-2xl font-bold text-white">
                                                {destination.name}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className={`p-6 md:p-8 ${isFeature ? 'flex flex-col justify-center' : ''}`}>
                                        {/* Desktop Title (for featured) */}
                                        {isFeature && (
                                            <div className="hidden md:block mb-4">
                                                <div className="flex items-center gap-2 text-xs font-semibold text-safari-500 uppercase tracking-wide mb-2">
                                                    <MapPin size={14} className="text-secondary-600" />
                                                    National Park
                                                </div>
                                                <h2 className="text-3xl font-bold text-safari-900 group-hover:text-secondary-600 transition-colors">
                                                    {destination.name}
                                                </h2>
                                            </div>
                                        )}

                                        {/* Non-featured Title */}
                                        {!isFeature && (
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 text-xs font-semibold text-safari-500 uppercase tracking-wide mb-2">
                                                    <MapPin size={14} className="text-secondary-600" />
                                                    National Park
                                                </div>
                                                <h2 className="text-2xl font-bold text-safari-900 group-hover:text-secondary-600 transition-colors">
                                                    {destination.name}
                                                </h2>
                                            </div>
                                        )}

                                        <p className={`text-safari-600 leading-relaxed mb-6 ${isFeature ? 'text-base md:text-lg' : 'line-clamp-3'}`}>
                                            {destination.summary || destination.description}
                                        </p>

                                        {/* Quick Info */}
                                        <div className="flex flex-wrap gap-4 mb-6 text-sm">
                                            <div className="flex items-center gap-2 text-safari-600">
                                                <Clock size={16} className="text-secondary-600" />
                                                <span>{destination.standard_duration_hours} Hours Safari</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-safari-600">
                                                <span className="font-semibold">Rs. {destination.vehicle_price_up_to_3.toLocaleString()}</span>
                                                <span className="text-safari-400">/ jeep</span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between pt-4 border-t border-safari-100">
                                            <span className="text-secondary-600 font-bold group-hover:gap-3 transition-all inline-flex items-center gap-2">
                                                Explore Park <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            
                                            {/* Thumbnail Gallery Preview */}
                                            {destination.images.length > 1 && (
                                                <div className="flex -space-x-2">
                                                    {destination.images.slice(1, 4).map((img, idx) => (
                                                        <div 
                                                            key={img.id} 
                                                            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
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
                                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-safari-100 flex items-center justify-center text-xs font-bold text-safari-600">
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
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-safari-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin size={40} className="text-safari-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-safari-900 mb-2">No Destinations Yet</h3>
                        <p className="text-safari-600">Check back soon for our safari destinations.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
