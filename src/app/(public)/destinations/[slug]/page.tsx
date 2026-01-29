import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDestinationBySlug, getDestinationImages } from '@/lib/queries/destinations';
import { getApprovedReviews } from '@/lib/queries/reviews';
import { cn } from '@/lib/utils';
import { Clock, Ticket, Car, Camera } from 'lucide-react';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export default async function DestinationDetailPage(props: PageProps) {
    const params = await props.params;
    const destination = await getDestinationBySlug(params.slug);

    if (!destination) {
        notFound();
    }

    const [reviews, images] = await Promise.all([
        getApprovedReviews(destination.id),
        getDestinationImages(destination.id)
    ]);

    // Use the first image as hero if available
    const heroImage = images.length > 0 ? images[0].secure_url : null;

    return (
        <div className="bg-safari-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="relative h-[60vh] bg-safari-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                {heroImage ? (
                    <img
                        src={heroImage}
                        alt={destination.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-safari-900/50 to-secondary-900/30" />
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 container mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary-600 text-xs font-bold uppercase tracking-wider mb-4">
                        Safari Destination
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
                        {destination.name}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-safari-100">
                            <h2 className="text-2xl font-bold text-safari-900 mb-4">About this Park</h2>
                            <div className="prose prose-safari max-w-none text-safari-700 leading-relaxed whitespace-pre-line">
                                {destination.description}
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-safari-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Camera className="text-secondary-600" size={24} />
                                <h2 className="text-2xl font-bold text-safari-900">Park Gallery</h2>
                            </div>

                            {images.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {images.map((image, idx) => (
                                        <div
                                            key={image.id}
                                            className={cn(
                                                "relative rounded-2xl overflow-hidden group aspect-[4/3]",
                                                idx === 0 && "md:col-span-2 md:aspect-video"
                                            )}
                                        >
                                            <img
                                                src={image.secure_url}
                                                alt={image.alt_text || destination.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-sm font-medium">{image.alt_text}</p>
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

                        {/* Reviews Section */}
                        <div className="space-y-8" id="reviews">
                            <div className="flex items-center justify-between border-b border-safari-100 pb-4">
                                <h2 className="text-2xl font-bold text-safari-900">Traveler Reviews</h2>
                                <span className="bg-safari-100 text-safari-700 font-bold px-3 py-1 rounded-full text-sm">
                                    {reviews.length} Reviews
                                </span>
                            </div>

                            <ReviewList reviews={reviews} />
                            <ReviewForm destinationId={destination.id} />
                        </div>
                    </div>

                    {/* Sidebar / Pricing */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-safari-100 sticky top-24">
                            <h3 className="text-xl font-bold text-safari-900 mb-6">Trip Details</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-safari-100 p-2 rounded-lg text-safari-700">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-safari-500 font-medium">Duration</p>
                                        <p className="text-safari-900 font-semibold">{destination.standard_duration_hours} Hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-safari-100 p-2 rounded-lg text-safari-700">
                                        <Ticket size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-safari-500 font-medium">Entrance Ticket</p>
                                        <p className="text-safari-900 font-semibold">
                                            Rs. {destination.ticket_price.toLocaleString()}
                                            <span className="text-sm font-normal text-safari-500">
                                                {destination.ticket_pricing_type === 'per_person' ? ' / person' : ' flat rate'}
                                            </span>
                                        </p>
                                        <p className="text-xs text-secondary-600 mt-1">*Paid at gate</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-safari-100 p-2 rounded-lg text-safari-700">
                                        <Car size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-safari-500 font-medium">Jeep Fee</p>
                                        <p className="text-safari-900 font-semibold">
                                            Rs. {destination.vehicle_price_up_to_3.toLocaleString()}
                                            <span className="text-sm font-normal text-safari-500"> (up to 3 pax)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/booking?destination=${destination.slug}`}
                                className="w-full block text-center bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Book This Safari
                            </Link>
                            <p className="text-xs text-center text-safari-400 mt-4">
                                No payment required online. Pay on arrival.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
