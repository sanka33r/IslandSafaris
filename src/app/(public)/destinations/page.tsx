import Link from 'next/link';
import { getDestinations } from '@/lib/queries/destinations';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function DestinationsPage() {
    const destinations = await getDestinations();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-safari-900 mb-6">
                    Our Safari <span className="text-secondary-600">Destinations</span>
                </h1>
                <p className="text-lg text-safari-600 leading-relaxed">
                    Embark on a journey through Sri Lanka&apos;s most breathtaking national parks.
                    Witness the gathering of giants and the untouched beauty of the wild.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((destination) => (
                    <Link
                        key={destination.id}
                        href={`/destinations/${destination.slug}`}
                        className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-safari-100"
                    >
                        <div className="relative h-64 bg-safari-200 overflow-hidden">
                            {/* Fallback image or cloud image here */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 z-20 text-white">
                                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                                    <MapPin size={16} className="text-secondary-400" />
                                    <span>National Park</span>
                                </div>
                                <h2 className="text-2xl font-bold group-hover:text-secondary-300 transition-colors">
                                    {destination.name}
                                </h2>
                            </div>
                        </div>

                        <div className="p-6">
                            <p className="text-safari-600 line-clamp-3 mb-6">
                                {destination.description}
                            </p>

                            <div className="flex items-center justify-between text-sm font-medium">
                                <div className="flex items-center gap-2 text-safari-500">
                                    <Clock size={18} />
                                    <span>{destination.standard_duration_hours} Hours</span>
                                </div>
                                <span className="flex items-center gap-2 text-secondary-600 group-hover:translate-x-1 transition-transform">
                                    Explore <ArrowRight size={18} />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
