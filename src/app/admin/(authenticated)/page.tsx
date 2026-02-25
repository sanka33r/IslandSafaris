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

    const thisWeekStart = new Date(dateParam + 'T12:00:00');
    const thisWeek = getWeekRange(thisWeekStart);
    const monthStart = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-01`;
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const monthEnd = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(lastDayOfMonth.getDate())}`;

    let dailyBookings: any[] = [];
    let lastWeekBookings: any[] = [];
    let nextWeekBookings: any[] = [];
    let weekBookings: any[] = [];
    let monthBookings: any[] = [];
    let fetchError: string | null = null;

    try {
        const [dailyRes, lastWeekRes, nextWeekRes, weekRes, monthRes] = await Promise.all([
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
            supabaseAdmin
                .from('bookings')
                .select('id, date, package_type, advance_payment_amount')
                .gte('date', thisWeek.start)
                .lte('date', thisWeek.end)
                .neq('status', 'cancelled'),
            supabaseAdmin
                .from('bookings')
                .select('id, date, package_type, advance_payment_amount')
                .gte('date', monthStart)
                .lte('date', monthEnd)
                .neq('status', 'cancelled'),
        ]);

        dailyBookings = dailyRes.data ?? [];
        lastWeekBookings = lastWeekRes.data ?? [];
        nextWeekBookings = nextWeekRes.data ?? [];
        weekBookings = weekRes.data ?? [];
        monthBookings = monthRes.data ?? [];

        if (dailyRes.error || lastWeekRes.error || nextWeekRes.error || weekRes.error || monthRes.error) {
            fetchError = dailyRes.error?.message || lastWeekRes.error?.message || nextWeekRes.error?.message || weekRes.error?.message || monthRes.error?.message || 'Failed to load data';
        }
    } catch (err) {
        fetchError = err instanceof Error ? err.message : 'Failed to load dashboard data';
    }

    function incomeByCategory(bookings: { package_type: string | null; advance_payment_amount?: number | null }[]) {
        const safari = bookings.filter((b) => !b.package_type);
        const cooking = bookings.filter((b) => b.package_type === 'cooking-class');
        const bicycle = bookings.filter((b) => b.package_type === 'bicycle-rent');
        const village = bookings.filter((b) => b.package_type === 'village-tour');
        const sum = (arr: typeof safari) => arr.reduce((acc, b) => acc + (b.advance_payment_amount ?? (b.package_type ? 5 : 8)), 0);
        return {
            safari: sum(safari),
            'cooking-class': sum(cooking),
            'bicycle-rent': sum(bicycle),
            'village-tour': sum(village),
        };
    }

    const incomeDaily = incomeByCategory(dailyBookings);
    const incomeWeekly = incomeByCategory(weekBookings);
    const incomeMonthly = incomeByCategory(monthBookings);

    return (
        <AdminDashboard
            selectedDate={dateParam}
            fetchError={fetchError}
            dailyBookings={dailyBookings}
            lastWeekBookings={lastWeekBookings}
            nextWeekBookings={nextWeekBookings}
            lastWeekRange={lastWeek}
            nextWeekRange={nextWeek}
            thisWeekRange={thisWeek}
            incomeDaily={incomeDaily}
            incomeWeekly={incomeWeekly}
            incomeMonthly={incomeMonthly}
        />
    );
}
