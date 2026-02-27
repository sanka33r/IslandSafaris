import { supabaseAdmin } from '@/lib/supabase';
import { getExtraHourPriceUsd } from '@/lib/settings';
import BookingsList from '@/components/admin/BookingsList';
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
    const extraHourPriceUsd = await getExtraHourPriceUsd();

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-safari-900">Package Bookings</h1>
                    <p className="text-safari-600 text-sm sm:text-base mt-0.5">Manage reviews and reservations for special packages</p>
                </div>
                <div className="w-full sm:w-auto min-w-0">
                    <BookingSearch />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0">
                    <BookingFilterTabs />
                </div>
                <div className="bg-white px-3 py-2 rounded-xl sm:rounded-2xl shadow-sm text-sm sm:text-base font-bold text-safari-600 border border-safari-100 italic shrink-0">
                    {count || 0} Results Found
                </div>
            </div>

            <BookingsList bookings={bookings || []} totalPages={totalPages} extraHourPriceUsd={extraHourPriceUsd} />

            <div className="md:hidden">
                <BookingPagination totalPages={totalPages} />
            </div>
        </div>
    );
}
