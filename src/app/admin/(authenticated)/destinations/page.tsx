import Link from 'next/link';
import { Plus, Edit2, MapPin } from 'lucide-react';
import { getAllDestinations } from '@/lib/queries/destinations';
import { cn } from '@/lib/utils';

export default async function AdminDestinationsPage() {
    const destinations = await getAllDestinations();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-safari-900">Destinations</h1>
                    <p className="text-safari-600">Manage safari parks and tour pricing</p>
                </div>
                <Link
                    href="/admin/destinations/new"
                    className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
                >
                    <Plus size={20} />
                    Add Destination
                </Link>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {destinations.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center text-safari-400 shadow-sm border border-safari-100">
                        No destinations found. Create your first one above.
                    </div>
                ) : (
                    destinations.map((dest) => (
                        <div key={dest.id} className="bg-white rounded-3xl p-6 shadow-sm border border-safari-100 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-secondary-100/50 rounded-2xl flex items-center justify-center text-secondary-600 flex-shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-safari-900 leading-tight">{dest.name}</div>
                                        <div className="text-base text-safari-500">/{dest.slug}</div>
                                    </div>
                                </div>
                                <span className={cn(
                                    "px-2 py-1 rounded-full text-sm font-bold uppercase tracking-widest",
                                    dest.active ? "bg-green-100 text-green-700" : "bg-safari-100 text-safari-400"
                                )}>
                                    {dest.active ? 'Active' : 'Hidden'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-safari-50 text-base">
                                <div>
                                    <p className="text-base text-safari-400 font-bold uppercase mb-1">Pricing</p>
                                    <p className="font-semibold text-safari-900">Rs. {dest.ticket_price.toLocaleString()}</p>
                                    <p className="text-base text-safari-500">
                                        {dest.ticket_pricing_type === 'per_person' ? 'Per Person' : 'Flat'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-base text-safari-400 font-bold uppercase mb-1">Duration</p>
                                    <p className="font-semibold text-safari-900">{dest.standard_duration_hours} Hours</p>
                                </div>
                            </div>

                            <Link
                                href={`/admin/destinations/${dest.id}`}
                                className="flex items-center justify-center gap-2 w-full text-secondary-600 hover:text-secondary-700 font-bold text-base bg-secondary-50 hover:bg-secondary-100 py-3 rounded-xl transition-all"
                            >
                                <Edit2 size={16} />
                                Edit Destination
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-safari-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="bg-safari-50/50 border-b border-safari-100">
                                <th className="p-6 text-base font-bold text-safari-400 uppercase tracking-wider">Destination</th>
                                <th className="p-6 text-base font-bold text-safari-400 uppercase tracking-wider">Pricing</th>
                                <th className="p-6 text-base font-bold text-safari-400 uppercase tracking-wider">Duration</th>
                                <th className="p-6 text-base font-bold text-safari-400 uppercase tracking-wider">Status</th>
                                <th className="p-6 text-base font-bold text-safari-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-safari-50">
                            {destinations.map((dest) => (
                                <tr key={dest.id} className="hover:bg-safari-50/30 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-secondary-100/50 rounded-2xl flex items-center justify-center text-secondary-600">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-safari-900">{dest.name}</div>
                                                <div className="text-base text-safari-500">/{dest.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="text-base">
                                            <div className="font-semibold text-safari-900">
                                                Rs. {dest.ticket_price.toLocaleString()}
                                                <span className="text-base font-normal text-safari-500 ml-1">
                                                    ({dest.ticket_pricing_type === 'per_person' ? 'Per Person' : 'Flat'})
                                                </span>
                                            </div>
                                            <div className="text-base text-safari-500">
                                                Jeep: Rs. {dest.vehicle_price_up_to_3.toLocaleString()}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-base text-safari-800 font-medium">
                                        {dest.standard_duration_hours} Hours
                                    </td>
                                    <td className="p-6">
                                        <span className={cn(
                                            "inline-flex px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest",
                                            dest.active ? "bg-green-100 text-green-700" : "bg-safari-100 text-safari-400"
                                        )}>
                                            {dest.active ? 'Active' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <Link
                                            href={`/admin/destinations/${dest.id}`}
                                            className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-700 font-bold text-base bg-secondary-50 hover:bg-secondary-100 px-4 py-2 rounded-xl transition-all"
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {destinations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-safari-400">
                                        No destinations found. Create your first one above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
