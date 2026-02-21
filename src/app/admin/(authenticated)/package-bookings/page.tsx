import { supabaseAdmin } from '@/lib/supabase';
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

            <BookingsList bookings={bookings || []} totalPages={totalPages} />

            <div className="md:hidden">
                <BookingPagination totalPages={totalPages} />
            </div>
        </div>
    );
}
