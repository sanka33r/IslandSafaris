import Link from 'next/link';
import Image from 'next/image';
import { getDestinationsWithImages } from '@/lib/queries/destinations';
import { ArrowRight, MapPin, Clock, Calendar, Camera, Car, ChevronDown } from 'lucide-react';
import { formatUsd } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, touristTripSchema } from '@/lib/schema';
import { optimizeCloudinaryUrl } from '@/lib/images';

export const revalidate = 3600;

const seasonInfo: Record<string, { months: string; color: string; bgColor: string; label: string }> = {
    'minneriya-national-park': { months: 'Jul - Sep', color: 'text-green-600', bgColor: 'bg-green-100', label: 'Minneriya' },
    'kaudulla-national-park': { months: 'Oct - Nov', color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Kaudulla' },
    'hurulu-eco-park': { months: 'Dec - Jan', color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Hurulu' },
};

const MIGRATION_PARK_SLUGS = ['minneriya-national-park', 'kaudulla-national-park', 'hurulu-eco-park'] as const;

/** Park slug that matches the current month (peak season). Jul–Sep Minneriya, Oct–Nov Kaudulla, Dec–Jan Hurulu. Feb–Jun: next up is Minneriya. */
function getCurrentSeasonParkSlug(month: number): string {
    if (month >= 7 && month <= 9) return 'minneriya-national-park';
    if (month >= 10 && month <= 11) return 'kaudulla-national-park';
    if (month === 12 || month === 1) return 'hurulu-eco-park';
    return 'minneriya-national-park'; // Feb–Jun: next peak is Minneriya
}

/** Order migration parks so the time-matching one is first, then the other two in calendar order. */
function orderedMigrationPills(currentSlug: string): readonly string[] {
    const idx = MIGRATION_PARK_SLUGS.indexOf(currentSlug as (typeof MIGRATION_PARK_SLUGS)[number]);
    if (idx <= 0) return MIGRATION_PARK_SLUGS;
    return [currentSlug, ...MIGRATION_PARK_SLUGS.filter((s) => s !== currentSlug)];
}

/** Sort destinations so the park matching the current month is first (featured), then other migration parks, then the rest. */
function sortDestinationsByCurrentSeason<T extends { slug: string }>(destinations: T[], currentSlug: string): T[] {
    const bySlug = new Map(destinations.map((d) => [d.slug, d]));
    const ordered: T[] = [];
    const migrationOrder = orderedMigrationPills(currentSlug);
    for (const slug of migrationOrder) {
        const d = bySlug.get(slug);
        if (d) ordered.push(d);
    }
    for (const d of destinations) {
        if (!MIGRATION_PARK_SLUGS.includes(d.slug as (typeof MIGRATION_PARK_SLUGS)[number])) ordered.push(d);
    }
    return ordered;
}

export default async function DestinationsPage() {
    const destinations = await getDestinationsWithImages();
    const currentMonth = new Date().getMonth() + 1; // 1–12
    const currentSeasonSlug = getCurrentSeasonParkSlug(currentMonth);
    const sortedDestinations = sortDestinationsByCurrentSeason(destinations, currentSeasonSlug);
    const migrationPillOrder = orderedMigrationPills(currentSeasonSlug);
    const schemas = [
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Destinations', path: '/destinations' },
        ]),
        faqSchema([
            {
                question: 'Which destination is best for elephant sightings?',
                answer: 'The best park changes seasonally between Minneriya, Kaudulla, and Hurulu Eco Park based on rainfall and herd movement.',
            },
            {
                question: 'What safari pricing is shown?',
                answer: 'Displayed prices are typically private jeep rates, while park entrance tickets may be paid separately at the park gate.',
            },
        ]),
        ...sortedDestinations.slice(0, 3).map((destination) =>
            touristTripSchema({
                name: `${destination.name} Safari`,
                description: destination.summary || destination.description,
                path: `/destinations/${destination.slug}`,
                price: destination.vehicle_price_up_to_3,
                duration: `PT${destination.standard_duration_hours}H`,
                location: destination.name,
            })
        ),
    ];

    return (
        <div className="min-h-screen bg-secondary-50">
            {schemas.map((schema, index) => (
                <JsonLd key={`destinations-schema-${index}`} data={schema} />
            ))}
            {/* Hero Header */}
            <div className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] bg-safari-900 overflow-hidden flex items-end">
                {/* Full-bleed background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045435/IMG_6160.JPG_gxx9vc.jpg', { width: 1920, quality: 70 })}')` }}
                />
                {/* Overlay: darken from top (image visible) to bottom (readable text) */}
                <div className="absolute inset-0 bg-gradient-to-b from-safari-900/30 via-safari-900/70 to-safari-900/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-safari-900/80 via-transparent to-transparent" />
                {/* Depth: soft blur orbs */}
                <div className="absolute top-0 right-0 w-[min(80vw,500px)] h-[min(80vw,500px)] bg-secondary-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-safari-600/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 relative z-10 pb-20 sm:pb-16 md:pb-24 pt-20 sm:pt-24 md:pt-32">
                    <div className="max-w-4xl">
                        <div className="animate-fade-in-up">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="h-px w-8 sm:w-12 bg-secondary-400" />
                                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-white/95">
                                    <MapPin size={12} className="text-secondary-400 sm:w-[14px] sm:h-[14px]" />
                                    <span className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase">The Wild Awaits</span>
                                </span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 font-display text-white leading-[1.05] drop-shadow-sm">
                                Safari <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-500 drop-shadow-sm">
                                    Destinations
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-safari-100/90 leading-relaxed max-w-2xl font-light">
                                Journey through the heart of Sri Lanka&apos;s wilderness. Witness the gathering of giants in their natural habitat.
                            </p>
                            <a
                                href="#migration-overview"
                                className="mt-6 sm:mt-10 inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors"
                            >
                                <span>Explore destinations</span>
                                <ChevronDown size={18} className="animate-bounce" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom edge fade into page */}
                <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-secondary-50 to-transparent pointer-events-none" />
            </div>

            {/* Migration Overview */}
            <div id="migration-overview" className="container mx-auto px-4 sm:px-6 -mt-6 sm:-mt-20 relative z-20 mb-12 sm:mb-20 scroll-mt-20 sm:scroll-mt-24">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-5 sm:p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left w-full lg:w-auto">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary-100 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                                <Calendar className="text-secondary-600" size={28} />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-xl sm:text-2xl font-bold text-safari-900 mb-1.5 sm:mb-2">The Great Elephant Migration</h2>
                                <p className="text-sm sm:text-base text-safari-600 leading-relaxed max-w-xl">
                                    Experience one of the world's greatest natural spectacles.
                                    Our elephants move between parks following the rains and water availability.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full lg:w-auto shrink-0">
                            {migrationPillOrder.map((slug, i) => {
                                const info = seasonInfo[slug];
                                if (!info) return null;
                                const isNow = slug === currentSeasonSlug;
                                return (
                                    <div
                                        key={slug}
                                        className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl min-w-[100px] sm:min-w-[120px] md:min-w-[140px] border ${
                                            isNow
                                                ? 'bg-secondary-50 border-secondary-200 shadow-sm transform scale-105 ring-2 ring-secondary-200'
                                                : 'bg-safari-50 border-safari-100'
                                        }`}
                                    >
                                        <span className={`w-3 h-3 rounded-full shadow-lg ${slug === 'minneriya-national-park' ? 'bg-green-500 shadow-green-200' : slug === 'kaudulla-national-park' ? 'bg-yellow-500 shadow-yellow-200' : 'bg-blue-500 shadow-blue-200'}`} />
                                        <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isNow ? 'text-secondary-600' : 'text-safari-400'}`}>
                                            {info.months}
                                        </span>
                                        <span className="text-safari-900 font-bold text-sm sm:text-base">{info.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="container mx-auto px-4 sm:px-6 pb-20 sm:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                    {sortedDestinations.map((destination, index) => {
                        const season = seasonInfo[destination.slug] || { months: 'Year-round', color: 'text-safari-600', bgColor: 'bg-safari-100' };
                        const isFeature = index === 0;

                        return (
                            <Link
                                key={destination.id}
                                href={`/destinations/${destination.slug}`}
                                className={`group relative block bg-white rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-safari-50 hover:-translate-y-1 sm:hover:-translate-y-2 ${isFeature ? 'lg:col-span-2' : ''}`}
                            >
                                <div className={`grid ${isFeature ? 'md:grid-cols-5 h-full' : 'grid-cols-1'}`}>
                                    {/* Image Section */}
                                    <div className={`relative ${isFeature ? 'md:col-span-3 aspect-[4/3] md:aspect-auto' : 'aspect-[16/10]'} bg-safari-200 overflow-hidden`}>
                                        {destination.images[0] ? (
                                            <Image
                                                src={optimizeCloudinaryUrl(destination.images[0].secure_url, { width: 1200, quality: 70 })}
                                                alt={destination.images[0].alt_text || `${destination.name} safari wildlife in Sri Lanka`}
                                                fill
                                                sizes={isFeature ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
                                                className="object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-safari-400 to-safari-600 flex items-center justify-center">
                                                <Camera className="text-white/30" size={64} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:hidden" />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2">
                                            <span className={`inline-flex items-center gap-1.5 sm:gap-2 ${season.bgColor} ${season.color} text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm`}>
                                                <Calendar size={12} />
                                                Peak: {season.months}
                                            </span>
                                        </div>

                                        {/* Mobile Title Overlay */}
                                        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:hidden">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-0.5 sm:mb-1 leading-tight">
                                                {destination.name}
                                            </h2>
                                            <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                                                <MapPin size={12} className="text-secondary-400 sm:w-[14px] sm:h-[14px]" />
                                                National Park
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className={`p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between ${isFeature ? 'md:col-span-2' : ''}`}>
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

                                            <p className={`text-safari-600 leading-relaxed mb-5 sm:mb-8 text-sm sm:text-base ${isFeature ? 'md:text-lg line-clamp-4' : 'line-clamp-3'}`}>
                                                {destination.summary || destination.description}
                                            </p>

                                            {/* Detailed Stats */}
                                            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-8">
                                                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-safari-50 group-hover:bg-white border border-transparent group-hover:border-safari-100 transition-all">
                                                    <div className="flex items-center gap-2 sm:gap-3 text-safari-700">
                                                        <Clock size={16} className="text-secondary-500 sm:w-[18px] sm:h-[18px] shrink-0" />
                                                        <span className="font-medium text-xs sm:text-sm">Duration</span>
                                                    </div>
                                                    <span className="font-bold text-safari-900 text-sm sm:text-base">{destination.standard_duration_hours} Hours</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-safari-50 group-hover:bg-white border border-transparent group-hover:border-safari-100 transition-all">
                                                    <div className="flex items-center gap-2 sm:gap-3 text-safari-700">
                                                        <Car size={16} className="text-secondary-500 sm:w-[18px] sm:h-[18px] shrink-0" />
                                                        <span className="font-medium text-xs sm:text-sm">Private Jeep</span>
                                                    </div>
                                                    <span className="font-bold text-safari-900 text-sm sm:text-base">
                                                        USD {formatUsd(destination.vehicle_price_up_to_3)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between gap-3 pt-4 sm:pt-6 border-t border-safari-100">
                                            <span className="text-secondary-700 font-bold text-xs sm:text-sm uppercase tracking-wider group-hover:gap-4 transition-all inline-flex items-center gap-1.5 sm:gap-2 shrink-0">
                                                Explore Park
                                                <div className="bg-secondary-100 rounded-full p-0.5 sm:p-1 group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                                                    <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                                                </div>
                                            </span>

                                            {/* Thumbnail Preview */}
                                            {destination.images.length > 1 && (
                                                <div className="flex -space-x-2 sm:-space-x-3 shrink-0">
                                                    {destination.images.slice(1, 4).map((img, idx) => (
                                                        <div
                                                            key={img.id}
                                                            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
                                                            style={{ zIndex: 3 - idx }}
                                                        >
                                                            <Image
                                                                src={optimizeCloudinaryUrl(img.secure_url, { width: 120, quality: 60 })}
                                                                alt=""
                                                                fill
                                                                sizes="40px"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                    {destination.images.length > 4 && (
                                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-safari-900 text-white flex items-center justify-center text-[8px] sm:text-[10px] font-bold shadow-md" style={{ zIndex: 0 }}>
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

                {sortedDestinations.length === 0 && (
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
