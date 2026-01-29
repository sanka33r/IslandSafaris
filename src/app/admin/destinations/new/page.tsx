import DestinationForm from '@/components/admin/DestinationForm';

export default function NewDestinationPage() {
    // Default values for a new destination
    const emptyDestination = {
        id: 'new',
        slug: '',
        name: '',
        description: '',
        ticket_price: 0,
        ticket_pricing_type: 'per_person' as const,
        vehicle_price_up_to_3: 0,
        standard_duration_hours: 3,
        active: false,
        created_at: new Date().toISOString()
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-safari-900 mb-2">Add New Destination</h1>
                <p className="text-safari-500">Create a new safari experience for your travelers.</p>
            </div>

            <DestinationForm destination={emptyDestination} images={[]} />
        </div>
    );
}
