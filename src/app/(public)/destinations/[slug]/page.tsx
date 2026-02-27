'use client';

import { useGlobalData } from '@/providers/GlobalDataProvider';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatUsd } from '@/lib/constants';
import {
    Clock, Ticket, Car, Camera, DollarSign,
    MapPin, Star, Repeat, Compass, Sparkles, Sun,
    FileText, Lightbulb, Heart, CheckCircle, Info
} from 'lucide-react';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';
import { useEffect, useState } from 'react';
import { getApprovedReviews } from '@/lib/queries/reviews';
import { Review } from '@/types/db';

const toTitle = (value: string) =>
    value
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

const getSectionIcon = (key: string) => {
    switch (key) {
        case 'intro': return <Info className="w-5 h-5 text-secondary-600" />;
        case 'main_event': return <Star className="w-5 h-5 text-secondary-600" />;
        case 'migration_cycle': return <Repeat className="w-5 h-5 text-secondary-600" />;
        case 'experience': return <Compass className="w-5 h-5 text-secondary-600" />;
        case 'highlights': return <Sparkles className="w-5 h-5 text-secondary-600" />;
        case 'best_time':
        case 'best_times': return <Sun className="w-5 h-5 text-secondary-600" />;
        case 'safari_details': return <FileText className="w-5 h-5 text-secondary-600" />;
        case 'safari_tips':
        case 'pro_traveler_tips': return <Lightbulb className="w-5 h-5 text-secondary-600" />;
        case 'why_choose_hurulu': return <Heart className="w-5 h-5 text-secondary-600" />;
        default: return <CheckCircle className="w-5 h-5 text-secondary-600" />;
    }
};

const renderKeyValueList = (record: Record<string, unknown>) => (
    <div className="grid gap-3 sm:grid-cols-2 mt-4">
        {Object.entries(record).map(([key, value]) => (
            <div key={key} className="flex items-start gap-3 p-3 rounded-xl bg-safari-50 border border-safari-100/50 hover:border-safari-200 transition-colors">
                <div className="mt-0.5 min-w-[4px] h-[4px] rounded-full bg-secondary-500" />
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-safari-400">{toTitle(key)}</span>
                    <span className="text-sm font-medium text-safari-800">{String(value)}</span>
                </div>
            </div>
        ))}
    </div>
);

const renderDescriptionSections = (sections: Record<string, unknown>) => {
    const preferredOrder = [
        'intro',
        'main_event',
        'migration_cycle',
        'experience',
        'highlights',
        'best_time',
        'best_times',
        'safari_details',
        'safari_tips',
        'pro_traveler_tips',
        'why_choose_hurulu'
    ];

    const entries = Object.entries(sections);
    const ordered = [
        ...preferredOrder.flatMap(key => entries.filter(([entryKey]) => entryKey === key)),
        ...entries.filter(([entryKey]) => !preferredOrder.includes(entryKey))
    ];

    return (
        <div className="grid gap-6">
            {ordered.map(([key, value]) => {
                const sectionTitle = toTitle(key);
                const icon = getSectionIcon(key);

                if (Array.isArray(value)) {
                    return (
                        <div key={key} className="group rounded-2xl sm:rounded-3xl border border-safari-100 bg-white p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-safari-50 text-secondary-600 group-hover:bg-secondary-50 transition-colors shrink-0">
                                    {icon}
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-safari-900">{sectionTitle}</h3>
                            </div>
                            <ul className="space-y-2 sm:space-y-3">
                                {value.map((item, idx) => (
                                    <li key={`${key}-${idx}`} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-safari-700/90 leading-relaxed">
                                        <span className="mt-1.5 sm:mt-2 min-w-[6px] h-[6px] rounded-full bg-secondary-400 shrink-0" />
                                        <span>{String(item)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                }

                if (value && typeof value === 'object') {
                    const record = value as Record<string, unknown>;
                    const title = typeof record.title === 'string' ? record.title : sectionTitle;
                    const content = typeof record.content === 'string' ? record.content : null;
                    const extraKeys = Object.keys(record).filter(k => !['title', 'content'].includes(k));

                    return (
                        <div key={key} className="group rounded-2xl sm:rounded-3xl border border-safari-100 bg-white p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-safari-50 text-secondary-600 group-hover:bg-secondary-50 transition-colors shrink-0">
                                    {icon}
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-safari-900">{title}</h3>
                            </div>
                            {content ? <p className="text-sm sm:text-base md:text-lg text-safari-700/90 mb-4 sm:mb-6 leading-relaxed">{content}</p> : null}
                            {extraKeys.length > 0 ? (
                                renderKeyValueList(
                                    extraKeys.reduce<Record<string, unknown>>((acc, entryKey) => {
                                        acc[entryKey] = record[entryKey];
                                        return acc;
                                    }, {})
                                )
                            ) : null}
                        </div>
                    );
                }

                return (
                    <div key={key} className="group rounded-2xl sm:rounded-3xl border border-safari-100 bg-white p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-safari-50 text-secondary-600 group-hover:bg-secondary-50 transition-colors shrink-0">
                                {icon}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-safari-900">{sectionTitle}</h3>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg text-safari-700/90 leading-relaxed">{String(value)}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default function DestinationDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const { destinations, isLoading: isGlobalLoading } = useGlobalData();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    const destination = destinations.find(d => d.slug === slug);

    useEffect(() => {
        if (destination?.id) {
            getApprovedReviews(destination.id).then((data) => {
                setReviews(data);
                setIsLoadingReviews(false);
            });
        }
    }, [destination?.id]);

    if (isGlobalLoading) {
        return (
            <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-600"></div>
            </div>
        );
    }

    if (!destination) {
        return notFound();
    }

    const images = destination.images || [];
    // Use the first image as hero if available
    const heroImage = images.length > 0 ? images[0].secure_url : null;

    const descriptionSections =
        destination.description_sections && typeof destination.description_sections === 'object'
            ? destination.description_sections
            : null;


    return (
        <div className="bg-safari-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="relative h-[55vh] min-h-[280px] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] bg-safari-900 text-white overflow-hidden group">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-safari-950 via-transparent to-transparent z-20 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-20" />

                {heroImage ? (
                    <img
                        src={heroImage}
                        alt={destination.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-safari-900/50 to-secondary-900/30" />
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center z-30 container mx-auto px-4 sm:px-6 text-center">
                    <div className="animate-fade-in-up w-full max-w-4xl">
                        <span className="inline-block py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 text-white/90">
                            Safari Destination
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-bold mb-4 sm:mb-6 font-display tracking-tight text-white drop-shadow-lg leading-tight px-1">
                            {destination.name}
                        </h1>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center animate-bounce text-white/70">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 sm:mb-2 font-medium">Explore</span>
                    <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 md:-mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* About - mobile: 1st, lg: col 1 row 1 */}
                    <div className="lg:col-span-2 lg:row-start-1">
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-safari-100">
                            <h2 className="text-xl sm:text-2xl font-bold text-safari-900 mb-3 sm:mb-4">About this Park</h2>
                            {(() => {
                                if (descriptionSections) {
                                    return renderDescriptionSections(descriptionSections as Record<string, unknown>);
                                }

                                const sections = Array.isArray(destination.sections) ? destination.sections : [];
                                const seasonalCalendar = Array.isArray(destination.seasonal_calendar)
                                    ? destination.seasonal_calendar
                                    : [];
                                const tips = Array.isArray(destination.tips) ? destination.tips : [];
                                const hasStructured =
                                    Boolean(destination.summary) ||
                                    sections.length > 0 ||
                                    seasonalCalendar.length > 0 ||
                                    tips.length > 0;

                                if (!hasStructured) {
                                    return (
                                        <div className="prose prose-safari max-w-none text-safari-700 leading-relaxed whitespace-pre-line">
                                            {destination.description}
                                        </div>
                                    );
                                }

                                return (
                                    <div className="space-y-8 text-safari-700 leading-relaxed">
                                        {destination.summary ? (
                                            <p className="text-base md:text-lg">{destination.summary}</p>
                                        ) : null}

                                        {sections.map((section, idx) => (
                                            <div key={`${section.title}-${idx}`} className="space-y-3">
                                                <h3 className="text-xl font-bold text-safari-900">{section.title}</h3>
                                                {section.body ? <p>{section.body}</p> : null}
                                                {Array.isArray(section.bullets) && section.bullets.length > 0 ? (
                                                    <ul className="list-disc pl-6 space-y-2">
                                                        {section.bullets.map((item, itemIdx) => (
                                                            <li key={`${section.title}-bullet-${itemIdx}`}>{item}</li>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div>
                                        ))}

                                        {seasonalCalendar.length > 0 ? (
                                            <div className="space-y-3">
                                                <h3 className="text-xl font-bold text-safari-900">Seasonal Calendar</h3>
                                                <ul className="list-disc pl-6 space-y-2">
                                                    {seasonalCalendar.map((entry, entryIdx) => (
                                                        <li key={`calendar-${entryIdx}`}>
                                                            <span className="font-semibold">{entry.months}:</span> {entry.note}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}

                                        {tips.length > 0 ? (
                                            <div className="space-y-3">
                                                <h3 className="text-xl font-bold text-safari-900">Pro-Traveler Tips</h3>
                                                <ul className="list-disc pl-6 space-y-2">
                                                    {tips.map((tip, tipIdx) => (
                                                        <li key={`tip-${tipIdx}`}>{tip}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Gallery - mobile: 2nd, lg: col 1 row 2 */}
                    <div className="lg:col-span-2 lg:row-start-2">
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border border-safari-100">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <Camera className="text-secondary-600 w-5 h-5 sm:w-6 sm:h-6" />
                                <h2 className="text-xl sm:text-2xl font-bold text-safari-900">Park Gallery</h2>
                            </div>

                            {images.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4">
                                    {images.map((image, idx) => (
                                        <div
                                            key={image.id}
                                            className={cn(
                                                "relative rounded-lg sm:rounded-2xl overflow-hidden group aspect-[4/3]",
                                                idx === 0 && "sm:col-span-2 sm:aspect-video"
                                            )}
                                        >
                                            <img
                                                src={image.secure_url}
                                                alt={image.alt_text || destination.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{image.alt_text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-safari-100 rounded-2xl">
                                    <div className="bg-safari-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Camera className="text-safari-200" size={32} />
                                    </div>
                                    <p className="text-safari-400 font-medium">No photos available for this park yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Book - mobile: 3rd (after gallery), lg: col 2 row 1-3 */}
                    <div className="lg:col-span-1 lg:row-start-1 lg:row-span-3">
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-safari-100 lg:sticky lg:top-24">
                            <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-safari-50">
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary-600 mb-1.5 sm:mb-2 block">Starting from</span>
                                <div className="flex items-baseline gap-1 flex-wrap">
                                    <span className="text-3xl sm:text-4xl font-bold text-safari-900">
                                        USD {formatUsd(destination.vehicle_price_up_to_3)}
                                    </span>
                                    <span className="text-safari-500 font-medium text-sm sm:text-base">/ jeep</span>
                                </div>
                                <p className="text-sm text-safari-400 mt-1.5 sm:mt-2 font-medium">
                                    Best price guaranteed • Instant confirmation
                                </p>
                            </div>

                            <div className="space-y-3 sm:space-y-6 mb-6 sm:mb-8">
                                <div className="flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 hover:bg-safari-50 rounded-lg sm:rounded-xl transition-colors">
                                    <div className="bg-safari-100 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-safari-700 shrink-0">
                                        <Clock size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-safari-500 font-bold uppercase tracking-wider mb-0.5">Duration</p>
                                        <p className="text-safari-900 font-bold text-sm sm:text-base">{destination.standard_duration_hours} Hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 hover:bg-safari-50 rounded-lg sm:rounded-xl transition-colors">
                                    <div className="bg-safari-100 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-safari-700 shrink-0">
                                        <Ticket size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-safari-500 font-bold uppercase tracking-wider mb-0.5">Entrance Ticket</p>
                                        <p className="text-safari-900 font-bold text-sm sm:text-base">
                                            USD {formatUsd(destination.ticket_price)}
                                            <span className="text-xs sm:text-sm font-normal text-safari-500">
                                                {destination.ticket_pricing_type === 'per_person' ? ' / person' : ' flat rate'}
                                            </span>
                                        </p>
                                        <p className="text-xs text-secondary-600 font-bold uppercase mt-1 bg-secondary-50 inline-block px-1.5 py-0.5 rounded">Tickets payable at gate</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 hover:bg-safari-50 rounded-lg sm:rounded-xl transition-colors">
                                    <div className="bg-safari-100 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-safari-700 shrink-0">
                                        <Car size={18} className="sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-safari-500 font-bold uppercase tracking-wider mb-0.5">Jeep Fee</p>
                                        <p className="text-safari-900 font-bold text-sm sm:text-base">
                                            USD {formatUsd(destination.vehicle_price_up_to_3)}
                                            <span className="text-xs sm:text-sm font-normal text-safari-500"> (up to 3 pax)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/booking?destination=${destination.slug}`}
                                className="w-full block text-center bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-700 hover:to-secondary-600 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg"
                            >
                                Book This Safari
                            </Link>

                            <div className="mt-4 sm:mt-6 bg-safari-50/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-safari-100">
                                <div className="flex items-start gap-2.5 sm:gap-3">
                                    <div className="bg-white p-1 sm:p-1.5 rounded-md sm:rounded-lg text-secondary-600 shadow-sm shrink-0 border border-safari-100">
                                        <DollarSign size={14} className="sm:w-4 sm:h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs sm:text-sm font-bold text-safari-900">Reservations</p>
                                        <p className="text-xs sm:text-sm text-safari-600 mt-0.5 sm:mt-1 leading-relaxed">
                                            Secure your spot with just a <span className="font-bold text-secondary-700">$5 advance fee</span>. Pay the rest comfortably upon arrival.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews - mobile: 4th, lg: col 1 row 3 */}
                    <div className="lg:col-span-2 lg:row-start-3 space-y-6 sm:space-y-8" id="reviews">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-safari-100 pb-3 sm:pb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-safari-900">Traveler Reviews</h2>
                                <span className="bg-safari-100 text-safari-700 font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm w-fit">
                                    {reviews.length} Reviews
                                </span>
                            </div>

                            {isLoadingReviews ? (
                                <div className="flex justify-center p-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary-600"></div>
                                </div>
                            ) : (
                                <ReviewList reviews={reviews} />
                            )}
                            <ReviewForm destinationId={destination.id} />
                    </div>

                </div>
            </div>
        </div>
    );
}
