import { supabaseAdmin } from '@/lib/supabase';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const revalidate = 0;

function pad(n: number) {
    return n < 10 ? '0' + n : '' + n;
}

function getWeekRange(date: Date): { start: string; end: string } {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    const start = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    d.setDate(d.getDate() + 6);
    const end = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return { start, end };
}

interface PageProps {
    searchParams: Promise<{ date?: string }>;
}

export default async function AdminDashboardPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const now = new Date();
    const dateParam = params.date || `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    const today = new Date(dateParam);
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const nextWeekStart = new Date(today);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);

    const lastWeek = getWeekRange(lastWeekStart);
    const nextWeek = getWeekRange(nextWeekStart);

    const [dailyRes, lastWeekRes, nextWeekRes] = await Promise.all([
        supabaseAdmin
            .from('bookings')
            .select('*, destinations(name)')
            .eq('date', dateParam)
            .neq('status', 'cancelled')
            .order('time', { ascending: true }),
        supabaseAdmin
            .from('bookings')
            .select('*, destinations(name)')
            .gte('date', lastWeek.start)
            .lte('date', lastWeek.end)
            .neq('status', 'cancelled')
            .order('date', { ascending: true })
            .order('time', { ascending: true }),
        supabaseAdmin
            .from('bookings')
            .select('*, destinations(name)')
            .gte('date', nextWeek.start)
            .lte('date', nextWeek.end)
            .neq('status', 'cancelled')
            .order('date', { ascending: true })
            .order('time', { ascending: true }),
    ]);

    const dailyBookings = (dailyRes.data || []) as any[];
    const lastWeekBookings = (lastWeekRes.data || []) as any[];
    const nextWeekBookings = (nextWeekRes.data || []) as any[];

    return (
        <AdminDashboard
            selectedDate={dateParam}
            dailyBookings={dailyBookings}
            lastWeekBookings={lastWeekBookings}
            nextWeekBookings={nextWeekBookings}
            lastWeekRange={lastWeek}
            nextWeekRange={nextWeek}
        />
    );
}
