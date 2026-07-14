'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ChevronLeft,
    ChevronRight,
    TreePine,
    ChefHat,
    Bike,
    MapPin,
    Calendar,
    X,
    ArrowRight,
    CalendarDays,
    AlertCircle,
    Users,
    TrendingUp,
    TrendingDown,
    Clock,
    DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BookingDetailModal from '@/components/admin/BookingDetailModal';

interface Booking {
    id: string;
    customer_name: string;
    date: string;
    time: string;
    status: string;
    group_size: number;
    package_type: 'cooking-class' | 'village-tour' | 'bicycle-rent' | null;
    destination_id: string | null;
    destinations?: { name: string } | null;
}

export type IncomeByCategory = {
    safari: number;
    'cooking-class': number;
    'bicycle-rent': number;
    'village-tour': number;
};

interface AdminDashboardProps {
    selectedDate: string;
    dailyBookings: Booking[];
    lastWeekBookings: Booking[];
    nextWeekBookings: Booking[];
    lastWeekRange: { start: string; end: string };
    nextWeekRange: { start: string; end: string };
    thisWeekRange: { start: string; end: string };
    incomeDaily: IncomeByCategory;
    incomeWeekly: IncomeByCategory;
    incomeMonthly: IncomeByCategory;
    fetchError?: string | null;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(d: string) {
    const date = new Date(d);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatShortDate(d: string) {
    const date = new Date(d);
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

function categorizeBookings(bookings: Booking[]) {
    const safaris = bookings.filter((b) => !b.package_type);
    const cookingClasses = bookings.filter((b) => b.package_type === 'cooking-class');
    const bicycles = bookings.filter((b) => b.package_type === 'bicycle-rent');
    const villageTours = bookings.filter((b) => b.package_type === 'village-tour');
    return { safaris, cookingClasses, bicycles, villageTours };
}

type ActivityType = 'safari' | 'cooking-class' | 'bicycle-rent' | 'village-tour';

const activityConfig: Record<ActivityType, { label: string; short: string; icon: React.ElementType; color: string; bg: string }> = {
    safari: { label: 'Safaris', short: 'Safari', icon: TreePine, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    'cooking-class': { label: 'Cooking Classes', short: 'Cooking', icon: ChefHat, color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
    'bicycle-rent': { label: 'Bicycles Rented', short: 'Bike', icon: Bike, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    'village-tour': { label: 'Village Tours', short: 'Village', icon: MapPin, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
};

function getActivityBookings(bookings: Booking[], type: ActivityType): Booking[] {
    if (type === 'safari') return bookings.filter((b) => !b.package_type);
    return bookings.filter((b) => b.package_type === type);
}

function DailySection({
    title,
    count,
    bookings,
    config,
    onSelect,
}: {
    title: string;
    count: number;
    bookings: Booking[];
    config: (typeof activityConfig)[ActivityType];
    onSelect: (b: Booking) => void;
}) {
    const Icon = config.icon;
    return (
        <div className={cn('rounded-2xl border-2 p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md', config.bg)}>
            <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/90 border border-safari-200/60 shadow-sm">
                    <Icon className={cn('w-5 h-5', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={cn('font-bold text-sm uppercase tracking-wide', config.color)}>{title}</h3>
                    <p className="text-2xl font-bold text-safari-900 tabular-nums">{count}</p>
                </div>
            </div>
            {bookings.length === 0 ? (
                <p className="text-sm text-safari-500 italic py-2">No bookings</p>
            ) : (
                <ul className="space-y-2">
                    {bookings.slice(0, 5).map((b) => (
                        <li key={b.id}>
                            <button
                                type="button"
                                onClick={() => onSelect(b)}
                                className="w-full flex items-center justify-between gap-2 text-sm bg-white/90 rounded-xl px-3 py-2 border border-safari-100/80 hover:ring-2 hover:ring-safari-300 transition-all text-left"
                            >
                                <span className="font-medium text-safari-900 truncate">{b.customer_name}</span>
                                <span className="text-safari-600 font-semibold tabular-nums flex-shrink-0">{b.time}</span>
                            </button>
                        </li>
                    ))}
                    {bookings.length > 5 && (
                        <li className="text-sm text-safari-500 italic pl-3 py-1">+{bookings.length - 5} more</li>
                    )}
                </ul>
            )}
        </div>
    );
}

function ItineraryModal({ title, bookings, onClose }: { title: string; bookings: Booking[]; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-safari-100 max-w-lg w-full max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-safari-50 border-b border-safari-100 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-bold text-safari-900 text-lg">{title}</h3>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-safari-200 text-safari-500 transition-colors" aria-label="Close">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto max-h-[calc(85vh-4rem)] space-y-2">
                    {bookings.length === 0 ? (
                        <p className="text-safari-500 italic py-6 text-center">No bookings in this period.</p>
                    ) : (
                        bookings.map((b) => (
                            <div key={b.id} className="p-3 rounded-xl bg-safari-50 border border-safari-100">
                                <p className="font-semibold text-safari-900">{b.customer_name}</p>
                                <p className="text-sm text-safari-500 mt-0.5">
                                    {formatDate(b.date)} at {b.time} · {b.group_size} guest{b.group_size > 1 ? 's' : ''}
                                </p>
                                {!b.package_type && b.destinations?.name && (
                                    <p className="text-sm text-safari-600 mt-0.5">{b.destinations.name}</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AdminDashboard({
    selectedDate,
    dailyBookings,
    lastWeekBookings,
    nextWeekBookings,
    lastWeekRange,
    nextWeekRange,
    thisWeekRange,
    incomeDaily,
    incomeWeekly,
    incomeMonthly,
    fetchError = null,
}: AdminDashboardProps) {
    const router = useRouter();
    const [modal, setModal] = useState<{ type: ActivityType; period: 'last' | 'next' } | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const daily = categorizeBookings(dailyBookings);
    const lastWeek = categorizeBookings(lastWeekBookings);
    const nextWeek = categorizeBookings(nextWeekBookings);

    const lastWeekTotals = {
        safari: lastWeek.safaris.length,
        'cooking-class': lastWeek.cookingClasses.length,
        'bicycle-rent': lastWeek.bicycles.length,
        'village-tour': lastWeek.villageTours.length,
    };

    const nextWeekTotals = {
        safari: nextWeek.safaris.length,
        'cooking-class': nextWeek.cookingClasses.length,
        'bicycle-rent': nextWeek.bicycles.length,
        'village-tour': nextWeek.villageTours.length,
    };

    const lastWeekTotal = Object.values(lastWeekTotals).reduce((a, b) => a + b, 0);
    const nextWeekTotal = Object.values(nextWeekTotals).reduce((a, b) => a + b, 0);
    const dailyTotal = daily.safaris.length + daily.cookingClasses.length + daily.bicycles.length + daily.villageTours.length;
    const totalGuests = dailyBookings.reduce((sum, b) => sum + (b.group_size || 0), 0);
    const pendingCount = dailyBookings.filter((b) => b.status === 'new').length;

    const weekChange = lastWeekTotal > 0 ? Math.round(((nextWeekTotal - lastWeekTotal) / lastWeekTotal) * 100) : (nextWeekTotal > 0 ? 100 : 0);

    const changeDate = (delta: number) => {
        const d = new Date(selectedDate + 'T12:00:00');
        d.setDate(d.getDate() + delta);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        router.push(`/admin?date=${y}-${m}-${day}`);
    };

    const isToday = () => {
        const t = new Date();
        const s = new Date(selectedDate);
        return t.getFullYear() === s.getFullYear() && t.getMonth() === s.getMonth() && t.getDate() === s.getDate();
    };

    const dailyTotalIncome = incomeDaily.safari + incomeDaily['cooking-class'] + incomeDaily['bicycle-rent'] + incomeDaily['village-tour'];
    const weeklyTotalIncome = incomeWeekly.safari + incomeWeekly['cooking-class'] + incomeWeekly['bicycle-rent'] + incomeWeekly['village-tour'];
    const monthlyTotalIncome = incomeMonthly.safari + incomeMonthly['cooking-class'] + incomeMonthly['bicycle-rent'] + incomeMonthly['village-tour'];

    return (
        <div className="space-y-8">
            {/* Error banner */}
            {fetchError && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 border-2 border-red-200 text-red-800 shadow-sm">
                    <AlertCircle size={22} className="flex-shrink-0" />
                    <p className="text-base font-medium">{fetchError}</p>
                </div>
            )}

            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-safari-900 tracking-tight">Dashboard</h1>
                    <p className="text-safari-600 text-sm sm:text-base mt-1">Overview of today’s activities, revenue, and weekly trends.</p>
                </div>
                <Link
                    href="/admin/calendar"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary-600 hover:bg-secondary-500 text-white font-semibold text-sm shadow-lg shadow-secondary-900/20 transition-all hover:shadow-xl active:scale-[0.98]"
                >
                    <CalendarDays size={18} />
                    View full calendar
                    <ArrowRight size={16} />
                </Link>
            </div>

            {/* Today at a glance – date picker + KPIs */}
            <div className="bg-white rounded-2xl border-2 border-safari-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-safari-50/80 border-b border-safari-100">
                    <h2 className="text-sm font-bold text-safari-600 uppercase tracking-wider">Today at a glance</h2>
                </div>
                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Date navigator */}
                    <div className="flex items-center gap-2 bg-safari-50/50 rounded-xl border border-safari-100 p-3">
                        <button
                            onClick={() => changeDate(-1)}
                            className="p-2.5 rounded-xl bg-white border border-safari-200 hover:bg-safari-100 text-safari-600 transition-colors"
                            aria-label="Previous day"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex-1 min-w-0 text-center">
                            <span className="font-bold text-safari-900 text-sm sm:text-base block leading-tight">{formatDate(selectedDate)}</span>
                            {isToday() && (
                                <span className="inline-block mt-1 text-xs font-semibold text-secondary-600 bg-secondary-100 px-2 py-0.5 rounded-full">Today</span>
                            )}
                        </div>
                        <button
                            onClick={() => changeDate(1)}
                            className="p-2.5 rounded-xl bg-white border border-safari-200 hover:bg-safari-100 text-safari-600 transition-colors"
                            aria-label="Next day"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-secondary-600 to-secondary-700 px-4 py-4 text-white shadow-lg shadow-secondary-900/20">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-white/90 text-xs font-semibold uppercase tracking-wider">Activities</p>
                            <p className="text-2xl sm:text-3xl font-bold tabular-nums">{dailyTotal}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border-2 border-safari-100 bg-white px-4 py-4">
                        <div className="w-12 h-12 rounded-xl bg-safari-100 flex items-center justify-center">
                            <Users size={22} className="text-safari-700" />
                        </div>
                        <div>
                            <p className="text-safari-500 text-xs font-semibold uppercase tracking-wider">Guests</p>
                            <p className="text-2xl sm:text-3xl font-bold text-safari-900 tabular-nums">{totalGuests}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl border-2 border-amber-100 bg-amber-50/50 px-4 py-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Clock size={22} className="text-amber-700" />
                        </div>
                        <div>
                            <p className="text-amber-700/90 text-xs font-semibold uppercase tracking-wider">Pending</p>
                            <p className="text-2xl sm:text-3xl font-bold text-safari-900 tabular-nums">{pendingCount}</p>
                            <p className="text-xs text-safari-500">to confirm</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Today’s schedule – activity breakdown */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold text-safari-800 flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-secondary-100 flex items-center justify-center">
                        <CalendarDays size={18} className="text-secondary-700" />
                    </span>
                    Today’s schedule — {formatDate(selectedDate)}
                </h2>
                {dailyTotal === 0 ? (
                    <p className="text-sm text-safari-500 italic">No bookings scheduled for this day.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {daily.safaris.length > 0 && (
                            <DailySection title="Safaris" count={daily.safaris.length} bookings={daily.safaris} config={activityConfig.safari} onSelect={setSelectedBooking} />
                        )}
                        {daily.cookingClasses.length > 0 && (
                            <DailySection title="Cooking" count={daily.cookingClasses.length} bookings={daily.cookingClasses} config={activityConfig['cooking-class']} onSelect={setSelectedBooking} />
                        )}
                        {daily.bicycles.length > 0 && (
                            <DailySection title="Bikes" count={daily.bicycles.length} bookings={daily.bicycles} config={activityConfig['bicycle-rent']} onSelect={setSelectedBooking} />
                        )}
                        {daily.villageTours.length > 0 && (
                            <DailySection title="Village" count={daily.villageTours.length} bookings={daily.villageTours} config={activityConfig['village-tour']} onSelect={setSelectedBooking} />
                        )}
                    </div>
                )}
            </section>

            {/* Revenue – Daily, Weekly, Monthly */}
            <section className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-safari-800 flex items-center gap-2">
                        <span className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                            <DollarSign size={18} className="text-green-700" />
                        </span>
                        Revenue
                    </h2>
                    <div className="flex flex-wrap gap-2 text-sm">
                        <span className="text-safari-500">Today: <strong className="text-safari-900">USD {dailyTotalIncome}</strong></span>
                        <span className="text-safari-300">|</span>
                        <span className="text-safari-500">This week: <strong className="text-safari-900">USD {weeklyTotalIncome}</strong></span>
                        <span className="text-safari-300">|</span>
                        <span className="text-safari-500">This month: <strong className="text-safari-900">USD {monthlyTotalIncome}</strong></span>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl border-2 border-safari-100 overflow-hidden shadow-sm flex flex-col">
                        <div className="px-4 py-3 bg-green-50 border-b border-green-100 flex flex-wrap items-center gap-2">
                            <DollarSign size={18} className="text-green-600 shrink-0" />
                            <h3 className="font-bold text-safari-800 text-sm">Daily</h3>
                            <span className="text-sm text-safari-600 ml-auto">{formatShortDate(selectedDate)}</span>
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            <div className="space-y-2">
                                {(Object.keys(activityConfig) as ActivityType[]).filter((type) => incomeDaily[type] > 0).map((type) => {
                                    const config = activityConfig[type];
                                    const amount = incomeDaily[type];
                                    const Icon = config.icon;
                                    return (
                                        <div key={type} className={cn('flex items-center justify-between p-3 rounded-xl border', config.bg)}>
                                            <div className="flex items-center gap-2">
                                                <Icon className={cn('w-4 h-4', config.color)} />
                                                <span className={cn('font-medium text-sm', config.color)}>{config.label}</span>
                                            </div>
                                            <span className="font-bold text-safari-900 tabular-nums">USD {amount}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-safari-100 border border-safari-200 font-bold text-safari-900 mt-auto pt-3">
                                <span>Total</span>
                                <span className="tabular-nums">USD {dailyTotalIncome}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border-2 border-safari-100 overflow-hidden shadow-sm flex flex-col">
                        <div className="px-4 py-3 bg-green-50 border-b border-green-100 flex flex-wrap items-center gap-2">
                            <DollarSign size={18} className="text-green-600 shrink-0" />
                            <h3 className="font-bold text-safari-800 text-sm">Weekly</h3>
                            <span className="text-sm text-safari-600 ml-auto">{formatShortDate(thisWeekRange.start)} – {formatShortDate(thisWeekRange.end)}</span>
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            <div className="space-y-2">
                                {(Object.keys(activityConfig) as ActivityType[]).filter((type) => incomeWeekly[type] > 0).map((type) => {
                                    const config = activityConfig[type];
                                    const amount = incomeWeekly[type];
                                    const Icon = config.icon;
                                    return (
                                        <div key={type} className={cn('flex items-center justify-between p-3 rounded-xl border', config.bg)}>
                                            <div className="flex items-center gap-2">
                                                <Icon className={cn('w-4 h-4', config.color)} />
                                                <span className={cn('font-medium text-sm', config.color)}>{config.label}</span>
                                            </div>
                                            <span className="font-bold text-safari-900 tabular-nums">USD {amount}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-safari-100 border border-safari-200 font-bold text-safari-900 mt-auto pt-3">
                                <span>Total</span>
                                <span className="tabular-nums">USD {weeklyTotalIncome}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border-2 border-safari-100 overflow-hidden shadow-sm flex flex-col">
                        <div className="px-4 py-3 bg-green-50 border-b border-green-100 flex flex-wrap items-center gap-2">
                            <DollarSign size={18} className="text-green-600 shrink-0" />
                            <h3 className="font-bold text-safari-800 text-sm">Monthly</h3>
                            <span className="text-sm text-safari-600 ml-auto">{MONTHS[new Date(selectedDate).getMonth()]} {new Date(selectedDate).getFullYear()}</span>
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            <div className="space-y-2">
                                {(Object.keys(activityConfig) as ActivityType[]).filter((type) => incomeMonthly[type] > 0).map((type) => {
                                    const config = activityConfig[type];
                                    const amount = incomeMonthly[type];
                                    const Icon = config.icon;
                                    return (
                                        <div key={type} className={cn('flex items-center justify-between p-3 rounded-xl border', config.bg)}>
                                            <div className="flex items-center gap-2">
                                                <Icon className={cn('w-4 h-4', config.color)} />
                                                <span className={cn('font-medium text-sm', config.color)}>{config.label}</span>
                                            </div>
                                            <span className="font-bold text-safari-900 tabular-nums">USD {amount}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-safari-100 border border-safari-200 font-bold text-safari-900 mt-auto pt-3">
                                <span>Total</span>
                                <span className="tabular-nums">USD {monthlyTotalIncome}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Weekly comparison */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold text-safari-800 flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-safari-100 flex items-center justify-center">
                        <TrendingUp size={18} className="text-safari-700" />
                    </span>
                    Weekly comparison
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border-2 border-safari-100 overflow-hidden shadow-sm">
                        <div className="px-4 py-3 bg-safari-50 border-b border-safari-100 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h3 className="font-bold text-safari-800 text-sm">Last week</h3>
                                <p className="text-sm text-safari-600">{formatShortDate(lastWeekRange.start)} – {formatShortDate(lastWeekRange.end)}</p>
                            </div>
                            <span className="text-sm font-bold text-safari-700 bg-white px-3 py-1 rounded-full border border-safari-200">{lastWeekTotal} completed</span>
                        </div>
                        <div className="p-3 space-y-2">
                            {(Object.keys(activityConfig) as ActivityType[]).map((type) => {
                                const config = activityConfig[type];
                                const count = lastWeekTotals[type];
                                const Icon = config.icon;
                                const isClickable = count > 0;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => isClickable && setModal({ type, period: 'last' })}
                                        className={cn(
                                            'w-full flex items-center justify-between p-3 rounded-xl border text-left text-sm transition-all',
                                            config.bg,
                                            isClickable && 'hover:ring-2 hover:ring-safari-300 cursor-pointer active:scale-[0.99]',
                                            !isClickable && 'opacity-60 cursor-default'
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className={cn('w-4 h-4', config.color)} />
                                            <span className={cn('font-medium', config.color)}>{config.short}</span>
                                        </div>
                                        <span className="font-bold text-safari-900 tabular-nums">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border-2 border-secondary-200 overflow-hidden shadow-sm">
                        <div className="px-4 py-3 bg-secondary-50 border-b border-secondary-100 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h3 className="font-bold text-safari-800 text-sm">Coming week</h3>
                                <p className="text-sm text-safari-600">{formatShortDate(nextWeekRange.start)} – {formatShortDate(nextWeekRange.end)}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                                {weekChange !== 0 && (
                                    <span className={cn('text-sm font-bold flex items-center gap-1 px-2 py-0.5 rounded-full', weekChange >= 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100')}>
                                        {weekChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {weekChange >= 0 ? '+' : ''}{weekChange}%
                                    </span>
                                )}
                                <span className="text-sm font-bold text-secondary-700 bg-white px-3 py-1 rounded-full border border-secondary-200">{nextWeekTotal} upcoming</span>
                            </div>
                        </div>
                        <div className="p-3 space-y-2">
                            {(Object.keys(activityConfig) as ActivityType[]).map((type) => {
                                const config = activityConfig[type];
                                const count = nextWeekTotals[type];
                                const Icon = config.icon;
                                const isClickable = count > 0;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => isClickable && setModal({ type, period: 'next' })}
                                        className={cn(
                                            'w-full flex items-center justify-between p-3 rounded-xl border text-left text-sm transition-all',
                                            config.bg,
                                            isClickable && 'hover:ring-2 hover:ring-secondary-400 cursor-pointer active:scale-[0.99]',
                                            !isClickable && 'opacity-60 cursor-default'
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className={cn('w-4 h-4', config.color)} />
                                            <span className={cn('font-medium', config.color)}>{config.short}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-safari-900 tabular-nums">{count}</span>
                                            {isClickable && <ChevronRight className="w-4 h-4 text-safari-500" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {modal && (
                <ItineraryModal
                    title={`${activityConfig[modal.type].label} – ${modal.period === 'next' ? 'Coming Week' : 'Last Week'}`}
                    bookings={modal.period === 'next' ? getActivityBookings(nextWeekBookings, modal.type) : getActivityBookings(lastWeekBookings, modal.type)}
                    onClose={() => setModal(null)}
                />
            )}

            {selectedBooking && (
                <BookingDetailModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
}
