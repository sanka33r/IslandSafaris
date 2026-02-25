import BookingWizard from '@/components/booking/BookingWizard';
import { getDestinations } from '@/lib/queries/destinations';

export const metadata = {
    title: 'Book Your Safari | Island Safaris Sri Lanka',
    description: 'Request your safari booking for Minneriya, Kaudulla, or Hurulu Eco Park.',
};

export const revalidate = 3600;

interface PageProps {
    searchParams: Promise<{ destination?: string }>;
}

export default async function BookingPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const destinations = await getDestinations();
    const preselectedId = searchParams.destination
        ? destinations.find(d => d.slug === searchParams.destination)?.id
        : undefined;

    return (
        <div className="bg-safari-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-safari-900 mb-4">Plan Your Safari</h1>
                    <p className="text-safari-600 max-w-2xl mx-auto mb-4">
                        Fill out the form below to request a booking.
                        Secure your spot with just a USD 8 advance payment. We will confirm availability shortly.
                    </p>
                    <p className="text-safari-600 max-w-2xl mx-auto text-sm bg-safari-100/80 border border-safari-200 rounded-xl px-4 py-3 inline-block">
                        <strong>Note:</strong> We only charge for the safari jeep. The entrance ticket is paid separately by you at the park entrance gate for all safaris.
                    </p>
                </div>

                <BookingWizard
                    destinations={destinations}
                    preselectedDestinationId={preselectedId}
                />
            </div>
        </div>
    );
}
