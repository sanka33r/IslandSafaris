import { notFound } from 'next/navigation';
import { getDestinationById, getDestinationImages } from '@/lib/queries/destinations';
import DestinationForm from '@/components/admin/DestinationForm';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditDestinationPage(props: PageProps) {
    const params = await props.params;
    const destination = await getDestinationById(params.id);

    if (!destination) {
        notFound();
    }

    const images = await getDestinationImages(destination.id);

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-safari-900 mb-2">Edit {destination.name}</h1>
                <p className="text-safari-500">Configure parameters, pricing, and image gallery for this safari.</p>
            </div>

            <DestinationForm destination={destination} images={images} />
        </div>
    );
}
