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
    TrendingUp,
    CalendarDays,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface AdminDashboardProps {
    selectedDate: string;
    dailyBookings: Booking[];
    lastWeekBookings: Booking[];
    nextWeekBookings: Booking[];
    lastWeekRange: { start: string; end: string };
    nextWeekRange: { start: string; end: string };
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

const activityConfig: Record<
    ActivityType,
    { label: string; icon: React.ElementType; color: string; bg: string }
> = {
    safari: { label: 'Safaris', icon: TreePine, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    'cooking-class': { label: 'Cooking Classes', icon: ChefHat, color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
    'bicycle-rent': { label: 'Bicycles Rented', icon: Bike, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    'village-tour': { label: 'Village Tours', icon: MapPin, color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' },
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
}: {
    title: string;
    count: number;
    bookings: Booking[];
    config: (typeof activityConfig)[ActivityType];
}) {
    const Icon = config.icon;
    return (
        <div className={cn(
            'rounded-2xl border-2 p-5 shadow-sm hover:shadow-md transition-all duration-300',
            config.bg,
            'hover:-translate-y-0.5'
        )}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/70 border border-safari-200/50 shadow-sm">
                    <Icon className={cn('w-5 h-5', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={cn('font-bold text-base', config.color)}>{title}</h3>
                    <span className="text-2xl font-extrabold text-safari-900 tabular-nums">{count}</span>
                </div>
            </div>
            {bookings.length === 0 ? (
                <p className="text-sm text-safari-500 italic py-2">None scheduled</p>
            ) : (
                <ul className="space-y-2">
                    {bookings.map((b) => (
                        <li
                            key={b.id}
                            className="flex items-center justify-between text-sm bg-white/80 backdrop-blur rounded-xl px-4 py-2.5 border border-safari-100/80 shadow-sm"
                        >
                            <span className="font-semibold text-safari-900 truncate">{b.customer_name}</span>
                            <span className="text-safari-600 font-bold bg-safari-100/50 px-2 py-0.5 rounded-lg flex-shrink-0 ml-2">{b.time}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function ItineraryModal({
    title,
    bookings,
    onClose,
}: {
    title: string;
    bookings: Booking[];
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl border-2 border-safari-100 max-w-lg w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-safari-100 px-6 py-4 flex items-center justify-between shadow-sm">
                    <h3 className="text-lg font-bold text-safari-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-safari-100 text-safari-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh] space-y-3">
                    {bookings.length === 0 ? (
                        <p className="text-safari-500 italic py-4">No bookings</p>
                    ) : (
                        bookings.map((b) => (
                            <div
                                key={b.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-safari-50 border border-safari-100 hover:bg-safari-100/50 transition-colors"
                            >
                                <div>
                                    <p className="font-semibold text-safari-900">{b.customer_name}</p>
                                    <p className="text-xs text-safari-500 mt-0.5">
                                        {formatDate(b.date)} at {b.time} · {b.group_size} guest{b.group_size > 1 ? 's' : ''}
                                    </p>
                                    {!b.package_type && b.destinations?.name && (
                                        <p className="text-xs text-safari-600 mt-0.5">{b.destinations.name}</p>
                                    )}
                                </div>
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
}: AdminDashboardProps) {
    const router = useRouter();
    const [modal, setModal] = useState<{ type: ActivityType; period: 'last' | 'next' } | null>(null);

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

    const changeDate = (delta: number) => {
        const d = new Date(selectedDate + 'T12:00:00');
        d.setDate(d.getDate() + delta);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        router.push(`/admin?date=${y}-${m}-${day}`);
    };

    const lastWeekTotal = lastWeekTotals.safari + lastWeekTotals['cooking-class'] + lastWeekTotals['bicycle-rent'] + lastWeekTotals['village-tour'];
    const nextWeekTotal = nextWeekTotals.safari + nextWeekTotals['cooking-class'] + nextWeekTotals['bicycle-rent'] + nextWeekTotals['village-tour'];
    const dailyTotal = daily.safaris.length + daily.cookingClasses.length + daily.bicycles.length + daily.villageTours.length;

    const isToday = () => {
        const t = new Date();
        const s = new Date(selectedDate);
        return t.getFullYear() === s.getFullYear() && t.getMonth() === s.getMonth() && t.getDate() === s.getDate();
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-safari-900 tracking-tight">Dashboard</h1>
                    <p className="text-safari-600 text-sm mt-1">Daily activities and weekly summary</p>
                </div>
                <Link
                    href="/admin/calendar"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary-600 hover:bg-secondary-500 text-white font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
                >
                    <CalendarDays size={18} />
                    View Calendar
                    <ArrowRight size={16} />
                </Link>
            </div>

            {/* Date selector + today's total */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 bg-white rounded-2xl border-2 border-safari-100 p-4 shadow-md hover:shadow-lg transition-shadow">
                    <button
                        onClick={() => changeDate(-1)}
                        className="p-2.5 rounded-xl bg-safari-50 hover:bg-safari-100 text-safari-600 transition-all hover:scale-105 active:scale-95"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex-1 flex items-center justify-center gap-3 min-w-0">
                        <Calendar className="w-6 h-6 text-secondary-500 flex-shrink-0" />
                        <div className="text-center">
                            <span className="font-bold text-safari-900 text-lg block">{formatDate(selectedDate)}</span>
                            {isToday() && (
                                <span className="text-xs font-semibold text-secondary-600 bg-secondary-100 px-2 py-0.5 rounded-full mt-1 inline-block">Today</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => changeDate(1)}
                        className="p-2.5 rounded-xl bg-safari-50 hover:bg-safari-100 text-safari-600 transition-all hover:scale-105 active:scale-95"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-2xl px-6 py-4 text-white shadow-lg flex-1">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Today&apos;s Total</p>
                            <p className="text-3xl font-extrabold tabular-nums">{dailyTotal}</p>
                            <p className="text-white/70 text-xs">activities</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily list */}
            <section>
                <h2 className="text-lg font-bold text-safari-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-secondary-500 rounded-full" />
                    Activities for {formatDate(selectedDate)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <DailySection
                        title="Safaris"
                        count={daily.safaris.length}
                        bookings={daily.safaris}
                        config={activityConfig.safari}
                    />
                    <DailySection
                        title="Cooking Classes"
                        count={daily.cookingClasses.length}
                        bookings={daily.cookingClasses}
                        config={activityConfig['cooking-class']}
                    />
                    <DailySection
                        title="Bicycles Rented"
                        count={daily.bicycles.length}
                        bookings={daily.bicycles}
                        config={activityConfig['bicycle-rent']}
                    />
                    <DailySection
                        title="Village Tours"
                        count={daily.villageTours.length}
                        bookings={daily.villageTours}
                        config={activityConfig['village-tour']}
                    />
                </div>
            </section>

            {/* Weekly summary */}
            <section>
                <h2 className="text-lg font-bold text-safari-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-secondary-500 rounded-full" />
                    Weekly Summary
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Last week */}
                    <div className="bg-white rounded-2xl border-2 border-safari-100 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="px-6 py-4 bg-gradient-to-r from-safari-50 to-safari-100/50 border-b border-safari-100">
                            <h3 className="font-bold text-safari-800 text-lg">
                                Last Week
                            </h3>
                            <p className="text-sm text-safari-600 mt-0.5">
                                {formatShortDate(lastWeekRange.start)} – {formatShortDate(lastWeekRange.end)}
                            </p>
                            <p className="text-xs font-semibold text-safari-500 mt-2 bg-white/60 px-2 py-1 rounded-lg w-fit">
                                {lastWeekTotal} activities completed
                            </p>
                        </div>
                        <div className="p-5 space-y-3">
                            {(Object.keys(activityConfig) as ActivityType[]).map((type) => {
                                const config = activityConfig[type];
                                const count = lastWeekTotals[type as keyof typeof lastWeekTotals];
                                const Icon = config.icon;
                                return (
                                    <div
                                        key={type}
                                        className={cn(
                                            'flex items-center justify-between p-4 rounded-xl border-2 transition-all',
                                            config.bg
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-white/70 flex items-center justify-center border border-safari-100">
                                                <Icon className={cn('w-4 h-4', config.color)} />
                                            </div>
                                            <span className={cn('font-semibold', config.color)}>{config.label}</span>
                                        </div>
                                        <span className="font-extrabold text-safari-900 text-lg tabular-nums">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Next week - clickable */}
                    <div className="bg-white rounded-2xl border-2 border-secondary-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="px-6 py-4 bg-gradient-to-r from-secondary-50 to-secondary-100/30 border-b border-secondary-100">
                            <h3 className="font-bold text-safari-800 text-lg">
                                Coming Week
                            </h3>
                            <p className="text-sm text-safari-600 mt-0.5">
                                {formatShortDate(nextWeekRange.start)} – {formatShortDate(nextWeekRange.end)}
                            </p>
                            <p className="text-xs font-semibold text-secondary-600 mt-2 bg-secondary-100/50 px-2 py-1 rounded-lg w-fit">
                                {nextWeekTotal} upcoming · Click to view itineraries
                            </p>
                        </div>
                        <div className="p-5 space-y-3">
                            {(Object.keys(activityConfig) as ActivityType[]).map((type) => {
                                const config = activityConfig[type];
                                const count = nextWeekTotals[type as keyof typeof nextWeekTotals];
                                const Icon = config.icon;
                                const isClickable = count > 0;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => isClickable && setModal({ type, period: 'next' })}
                                        className={cn(
                                            'w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all',
                                            config.bg,
                                            isClickable && 'hover:ring-2 hover:ring-secondary-400 hover:scale-[1.02] cursor-pointer active:scale-[0.99]',
                                            !isClickable && 'opacity-75 cursor-default'
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-white/70 flex items-center justify-center border border-safari-100">
                                                <Icon className={cn('w-4 h-4', config.color)} />
                                            </div>
                                            <span className={cn('font-semibold', config.color)}>{config.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-safari-900 text-lg tabular-nums">{count}</span>
                                            {isClickable && (
                                                <ChevronRight className="w-5 h-5 text-safari-500" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary modal */}
            {modal && (
                <ItineraryModal
                    title={`${activityConfig[modal.type].label} – Coming Week`}
                    bookings={
                        modal.period === 'next'
                            ? getActivityBookings(nextWeekBookings, modal.type)
                            : getActivityBookings(lastWeekBookings, modal.type)
                    }
                    onClose={() => setModal(null)}
                />
            )}
        </div>
    );
}
