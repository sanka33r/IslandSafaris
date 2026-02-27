import DestinationForm from '@/components/admin/DestinationForm';

export default function NewDestinationPage() {
    // Default values for a new destination
    const emptyDestination = {
        id: 'new',
        slug: '',
        name: '',
        description: '',
        description_sections: null,
        ticket_price: 0,
        ticket_pricing_type: 'per_person' as const,
        vehicle_price_up_to_3: 0,
        standard_duration_hours: 3,
        active: false,
        created_at: new Date().toISOString()
    };

    return (
        <div className="max-w-6xl mx-auto pb-12 sm:pb-20 w-full min-w-0 px-0">
            <div className="mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-4xl font-bold text-safari-900 mb-1 sm:mb-2">Add New Destination</h1>
                <p className="text-safari-500 text-sm sm:text-base">Create a new safari experience for your travelers.</p>
            </div>

            <DestinationForm destination={emptyDestination} images={[]} />
        </div>
    );
}
