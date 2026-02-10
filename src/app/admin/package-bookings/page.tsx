import { supabaseAdmin } from '@/lib/supabase';
import BookingRow from '@/components/admin/BookingRow';
import BookingCard from '@/components/admin/BookingCard';
import BookingFilterTabs from '@/components/admin/BookingFilterTabs';
import BookingSearch from '@/components/admin/BookingSearch';
import BookingPagination from '@/components/admin/BookingPagination';

export const revalidate = 0; // Dynamic

const PAGE_SIZE = 10;

interface PageProps {
    searchParams: Promise<{
        status?: string;
        search?: string;
        page?: string;
    }>;
}

export default async function AdminPackageBookingsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const status = params.status || 'new';
    const search = params.search || '';
    const page = Number(params.page) || 1;

    let query = supabaseAdmin
        .from('bookings')
        .select('*', { count: 'exact' })
        .not('package_type', 'is', null);

    // Filter by status if not 'all'
    if (status !== 'all') {
        query = query.eq('status', status);
    }

    // Search filter
    if (search) {
        query = query.or(`customer_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    // Pagination
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: bookings, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error loading package bookings:', error);
        return <div className="text-red-500">Error loading bookings</div>;
    }

    const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-safari-900">Package Bookings</h1>
                    <p className="text-safari-600 text-sm">Manage reviews and reservations for special packages</p>
                </div>
                <BookingSearch />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <BookingFilterTabs />
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-sm font-bold text-safari-600 border border-safari-100 italic">
                    {count || 0} Results Found
                </div>
            </div>

            {/* Mobile View: List of Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {bookings?.map((booking: any) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
                {(!bookings || bookings.length === 0) && (
                    <div className="bg-white p-12 text-center text-safari-400 rounded-3xl border border-safari-100 shadow-sm">
                        No package bookings found matching filters.
                    </div>
                )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-safari-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-safari-50 border-b border-safari-100/50">
                            <tr>
                                <th className="p-4 font-semibold text-safari-700">Ref</th>
                                <th className="p-4 font-semibold text-safari-700">Customer</th>
                                <th className="p-4 font-semibold text-safari-700">Package (Type)</th>
                                <th className="p-4 font-semibold text-safari-700">Date/Time</th>
                                <th className="p-4 font-semibold text-safari-700">Group</th>
                                <th className="p-4 font-semibold text-safari-700">Status</th>
                                <th className="p-4 font-semibold text-safari-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-safari-100">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {bookings?.map((booking: any) => (
                                <BookingRow key={booking.id} booking={booking} />
                            ))}
                            {(!bookings || bookings.length === 0) && (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-safari-400">
                                        No package bookings found matching filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <BookingPagination totalPages={totalPages} />
            </div>

            {/* Pagination for Mobile */}
            <div className="md:hidden">
                <BookingPagination totalPages={totalPages} />
            </div>
        </div>
    );
}
