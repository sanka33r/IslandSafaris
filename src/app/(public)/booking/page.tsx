import BookingWizard from '@/components/booking/BookingWizard';
import { getDestinations } from '@/lib/queries/destinations';
import { getExtraHourPriceUsd } from '@/lib/settings';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { getApprovedReviews } from '@/lib/queries/reviews';
import { Star, ShieldCheck, Clock3, BadgeCheck } from 'lucide-react';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';

export const metadata = buildMetadata({
    title: 'Book a Sri Lanka Elephant Safari',
    description: 'Book a private Sri Lanka elephant safari with instant support. Choose Minneriya, Kaudulla, or Hurulu Eco Park and confirm your ideal date and time in minutes.',
    path: '/booking',
});

export const revalidate = 3600;

interface PageProps {
    searchParams: Promise<{ destination?: string }>;
}

export default async function BookingPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const [destinations, extraHourPriceUsd, reviews] = await Promise.all([
        getDestinations(),
        getExtraHourPriceUsd(),
        getApprovedReviews(),
    ]);
    const preselectedId = searchParams.destination
        ? destinations.find(d => d.slug === searchParams.destination)?.id
        : undefined;
    const schemas = [
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Booking', path: '/booking' },
        ]),
        faqSchema([
            {
                question: 'Do I pay park entrance fees online?',
                answer: 'No. Safari booking covers jeep and guidance. Park entrance tickets are typically paid by travelers at the gate.',
            },
            {
                question: 'Can I choose Minneriya, Kaudulla, or Hurulu?',
                answer: 'Yes. You can request a destination, and we also guide you based on seasonal elephant movement.',
            },
        ]),
    ];

    return (
        <div className="bg-safari-50 min-h-screen py-16">
            {schemas.map((schema, index) => (
                <JsonLd key={`booking-schema-${index}`} data={schema} />
            ))}
            <div className="container mx-auto px-4">
                <BreadcrumbNav
                    className="mb-6"
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Booking' },
                    ]}
                />
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-safari-900 mb-4">Plan Your Safari</h1>
                    <p className="text-safari-600 max-w-2xl mx-auto mb-4">
                        Fill out the form below to request a booking.
                        Secure your spot with just a USD 8 advance payment. We will confirm availability shortly.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-safari-200 text-safari-800">
                            <Clock3 size={14} className="text-secondary-600" />
                            2-minute booking flow
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-safari-200 text-safari-800">
                            <ShieldCheck size={14} className="text-secondary-600" />
                            Trusted local operators
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-safari-200 text-safari-800">
                            <BadgeCheck size={14} className="text-secondary-600" />
                            Flexible park recommendation
                        </span>
                    </div>
                    <p className="text-safari-600 max-w-2xl mx-auto text-sm bg-safari-100/80 border border-safari-200 rounded-xl px-4 py-3 inline-block">
                        <strong>Note:</strong> We only charge for the safari jeep. The entrance ticket is paid separately by you at the park entrance gate for all safaris.
                    </p>
                    <p className="text-secondary-700 text-sm font-medium mt-3">
                        Peak safari slots can fill fast in season. Early booking helps secure your preferred time.
                    </p>
                </div>

                <BookingWizard
                    destinations={destinations}
                    preselectedDestinationId={preselectedId}
                    extraHourPriceUsd={extraHourPriceUsd}
                />

               
            </div>
        </div>
    );
}
