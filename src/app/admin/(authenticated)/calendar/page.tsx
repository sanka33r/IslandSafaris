import { supabaseAdmin } from '@/lib/supabase';
import BookingCalendar from '@/components/admin/BookingCalendar';

export const revalidate = 0;

interface PageProps {
    searchParams: Promise<{
        month?: string;
    }>;
}

function pad(n: number) { return n < 10 ? '0' + n : '' + n; }

function getMonthRange(ym: string) {
    const d = new Date(ym + '-01');
    const year = d.getFullYear();
    const month = d.getMonth();
    const start = `${year}-${pad(month + 1)}-01`;
    const endDay = new Date(year, month + 1, 0).getDate();
    const end = `${year}-${pad(month + 1)}-${pad(endDay)}`;
    return { start, end };
}

export default async function AdminCalendarPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const now = new Date();
    const monthParam = params.month || `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    const { start, end } = getMonthRange(monthParam);

    const { data: bookings, error } = await supabaseAdmin
        .from('bookings')
        .select('*, destinations(name)')
        .gte('date', start)
        .lte('date', end)
        .order('date', { ascending: true })
        .order('time', { ascending: true });

    if (error) {
        console.error('Error loading calendar bookings:', error);
        return <div className="text-red-500">Error loading bookings</div>;
    }

    return <BookingCalendar bookings={bookings || []} currentMonth={monthParam} />;
}
