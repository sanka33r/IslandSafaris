'use client';

import { useState, useTransition } from 'react';
import { ChevronLeft, ChevronRight, X, Loader2, User, MapPin, Calendar, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import { updateBookingStatus } from '@/lib/actions/admin';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// ── Native date helpers ────────────────────────────────────────────
function startOfDay(d: Date) { const r = new Date(d); r.setHours(0, 0, 0, 0); return r; }
function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
function addMonths(d: Date, n: number) { const r = new Date(d); r.setMonth(r.getMonth() + n); return r; }
function subMonths(d: Date, n: number) { return addMonths(d, -n); }
function isSameMonth(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth(); }

function isToday(d: Date) {
    const t = new Date();
    return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
}

function isBefore(a: Date, b: Date) { return a.getTime() < b.getTime(); }

// Monday-based week helpers
function startOfWeekMon(d: Date) {
    const r = new Date(d);
    const day = r.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    r.setDate(r.getDate() + diff);
    r.setHours(0, 0, 0, 0);
    return r;
}
function endOfWeekMon(d: Date) {
    const r = startOfWeekMon(d);
    r.setDate(r.getDate() + 6);
    return r;
}

function eachDay(start: Date, end: Date) {
    const days: Date[] = [];
    const cur = new Date(start);
    while (cur <= end) {
        days.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
    }
    return days;
}

function pad(n: number) { return n < 10 ? '0' + n : '' + n; }
function formatDate(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function formatYM(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; }

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function friendlyDate(d: Date) {
    return `${DAYS_FULL[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function shortDate(d: Date) {
    return `${DAYS_SHORT[(d.getDay() + 6) % 7]}, ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`;
}

// ── Types ──────────────────────────────────────────────────────────
interface Booking {
    id: string;
    customer_name: string;
    email?: string;
    phone?: string;
    date: string;
    time: string;
    status: string;
    group_size: number;
    package_type: string | null;
    destination_id: string | null;
    destinations?: { name: string } | null;
    country?: string | null;
    hotel_name?: string | null;
    pickup_required?: boolean;
    pickup_location?: string | null;
    special_requests?: string | null;
    message?: string | null;
    promo_code?: string | null;
    discount_amount?: number;
    advance_payment_amount?: number;
    advance_payment_status?: string;
}

interface BookingCalendarProps {
    bookings: Booking[];
    currentMonth: string; // YYYY-MM
}

type BookingStatus = 'cancelled' | 'upcoming' | 'finished' | 'new';

function getBookingStatus(booking: Booking): BookingStatus {
    if (booking.status === 'cancelled') return 'cancelled';
    const bookingDate = new Date(booking.date);
    const today = startOfDay(new Date());
    if (booking.status === 'confirmed') {
        return isBefore(bookingDate, today) ? 'finished' : 'upcoming';
    }
    return 'new';
}

const statusConfig: Record<BookingStatus, { bg: string; text: string; border: string; dot: string; label: string }> = {
    cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500', label: 'Cancelled' },
    upcoming: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500', label: 'Upcoming' },
    finished: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500', label: 'Finished' },
    new: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500', label: 'New' },
};

function formatPackageName(type: string) {
    return type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ── Sub-components ─────────────────────────────────────────────────
function BookingPill({ booking, onCancel, onViewDetails }: { booking: Booking; onCancel: (id: string) => void; onViewDetails?: (b: Booking) => void }) {
    const [isPending, startTransition] = useTransition();
    const status = getBookingStatus(booking);
    const config = statusConfig[status];
    const name = !booking.package_type
        ? (booking.destinations?.name || 'Safari')
        : formatPackageName(booking.package_type);

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm(`Cancel booking for ${booking.customer_name}?`)) {
            startTransition(() => { onCancel(booking.id); });
        }
    };

    return (
        <div
            className={cn('flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border transition-all group', config.bg, config.text, config.border, onViewDetails && 'cursor-pointer')}
            title={`${booking.customer_name} — ${name} — ${booking.time} — ${booking.group_size} pax — ${config.label}. Click to view details.`}
            onClick={onViewDetails ? (e) => { e.stopPropagation(); onViewDetails(booking); } : undefined}
        >
            <span className={cn('w-2 h-2 rounded-full flex-shrink-0', config.dot)} />
            <span className="truncate flex-1 leading-tight">{booking.customer_name.split(' ')[0]}</span>
            {status !== 'cancelled' && (
                <button onClick={handleCancel} disabled={isPending}
                    className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-0.5 rounded hover:bg-red-200/60 text-red-500 transition-all"
                    title="Cancel booking">
                    {isPending ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                </button>
            )}
        </div>
    );
}

function DetailRow({ booking, onCancel, onViewDetails }: { booking: Booking; onCancel: (id: string) => void; onViewDetails: (b: Booking) => void }) {
    const [isPending, startTransition] = useTransition();
    const status = getBookingStatus(booking);
    const config = statusConfig[status];
    const name = !booking.package_type
        ? (booking.destinations?.name || 'Safari')
        : formatPackageName(booking.package_type);

    const handleCancel = () => {
        if (confirm(`Cancel booking for ${booking.customer_name}?`)) {
            startTransition(() => { onCancel(booking.id); });
        }
    };

    return (
        <div
            className={cn('rounded-xl border p-3 flex items-start justify-between gap-3 cursor-pointer hover:ring-2 hover:ring-safari-200 transition-all', config.bg, config.border)}
            onClick={() => onViewDetails(booking)}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={cn('w-2 h-2 rounded-full flex-shrink-0', config.dot)} />
                    <span className={cn('text-base font-bold', config.text)}>{booking.customer_name}</span>
                    <span className={cn('text-xs font-bold uppercase px-2 py-0.5 rounded-full border', config.bg, config.text, config.border)}>
                        {config.label}
                    </span>
                </div>
                <div className="text-sm text-safari-500 space-y-0.5 ml-4">
                    <p><strong>{name}</strong> — {booking.time}</p>
                    <p>{booking.group_size} person{booking.group_size > 1 ? 's' : ''}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <span className="text-xs font-medium text-safari-500">View details</span>
                {status !== 'cancelled' && (
                    <button onClick={handleCancel} disabled={isPending}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-lg bg-red-100 text-red-600 hover:bg-red-200 border border-red-200 transition-all disabled:opacity-50">
                        {isPending ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}

function BookingDetailModal({ booking, onClose, onCancel }: { booking: Booking; onClose: () => void; onCancel: (id: string) => void }) {
    const [isPending, startTransition] = useTransition();
    const status = getBookingStatus(booking);
    const config = statusConfig[status];
    const name = !booking.package_type
        ? (booking.destinations?.name || 'Safari')
        : formatPackageName(booking.package_type);

    const handleCancel = () => {
        if (confirm(`Cancel booking for ${booking.customer_name}?`)) {
            startTransition(() => { onCancel(booking.id); });
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-safari-100 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-safari-100 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                    <h3 className="text-lg font-bold text-safari-900">Booking Details</h3>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-safari-100 text-safari-400 transition-colors"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-mono text-safari-400">Ref: {booking.id.slice(0, 8)}</p>
                            <p className="text-xl font-bold text-safari-900">{booking.customer_name}</p>
                        </div>
                        <span className={cn('px-2 py-1 rounded-full text-xs font-bold uppercase', config.bg, config.text, config.border)}>{config.label}</span>
                    </div>

                    <div className="grid gap-3 text-sm">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                            <MapPin size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-safari-500 uppercase">{booking.package_type ? 'Package' : 'Destination'}</p>
                                <p className="font-semibold text-safari-900">{name}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                            <Calendar size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-safari-500 uppercase">Date & Time</p>
                                <p className="font-semibold text-safari-900">{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {booking.time}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                            <Users size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-safari-500 uppercase">Group Size</p>
                                <p className="font-semibold text-safari-900">{booking.group_size} person{booking.group_size > 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        {booking.email && (
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                                <Mail size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-safari-500 uppercase">Email</p>
                                    <p className="font-medium text-safari-900 break-all">{booking.email}</p>
                                </div>
                            </div>
                        )}
                        {booking.phone && (
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                                <Phone size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-safari-500 uppercase">Phone</p>
                                    <p className="font-medium text-safari-900">{booking.phone}</p>
                                </div>
                            </div>
                        )}
                        {booking.country && (
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                                <User size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-safari-500 uppercase">Country</p>
                                    <p className="font-medium text-safari-900">{booking.country}</p>
                                </div>
                            </div>
                        )}
                        {booking.pickup_required && (booking.hotel_name || booking.pickup_location) && (
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                                <MapPin size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-safari-500 uppercase">Pickup</p>
                                    <p className="font-medium text-safari-900">{booking.hotel_name || booking.pickup_location}</p>
                                </div>
                            </div>
                        )}
                        {(booking.special_requests || booking.message) && (
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-safari-50">
                                <MessageSquare size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-safari-500 uppercase">Notes</p>
                                    <p className="font-medium text-safari-900">{booking.special_requests || booking.message}</p>
                                </div>
                            </div>
                        )}
                        {booking.promo_code && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100">
                                <span className="text-xs font-bold text-green-700">Promo:</span>
                                <span className="font-semibold text-green-800">{booking.promo_code}</span>
                                {booking.discount_amount ? <span className="text-green-600">(-${booking.discount_amount})</span> : null}
                            </div>
                        )}
                    </div>

                    {status !== 'cancelled' && (
                        <button onClick={handleCancel} disabled={isPending}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-bold transition-all disabled:opacity-50">
                            {isPending ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
                            Cancel Booking
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function DayDetail({ date, safariBookings, packageBookings, onCancel, onClose, onViewDetails }: {
    date: Date; safariBookings: Booking[]; packageBookings: Booking[]; onCancel: (id: string) => void; onClose: () => void; onViewDetails: (b: Booking) => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-safari-100 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-safari-100 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                    <h3 className="text-lg font-bold text-safari-900">{friendlyDate(date)}</h3>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-safari-100 text-safari-400 transition-colors"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-safari-400 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-safari-700" /> Safari Bookings ({safariBookings.length})
                        </h4>
                        {safariBookings.length === 0
                            ? <p className="text-sm text-safari-300 italic">No safari bookings</p>
                            : <div className="space-y-2">{safariBookings.map(b => <DetailRow key={b.id} booking={b} onCancel={onCancel} onViewDetails={onViewDetails} />)}</div>}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-purple-500 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500" /> Package Bookings ({packageBookings.length})
                        </h4>
                        {packageBookings.length === 0
                            ? <p className="text-sm text-safari-300 italic">No package bookings</p>
                            : <div className="space-y-2">{packageBookings.map(b => <DetailRow key={b.id} booking={b} onCancel={onCancel} onViewDetails={onViewDetails} />)}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main calendar ──────────────────────────────────────────────────
export default function BookingCalendar({ bookings, currentMonth }: BookingCalendarProps) {
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const current = new Date(currentMonth + '-01');

    const monthStart = startOfMonth(current);
    const monthEnd = endOfMonth(current);
    const calStart = startOfWeekMon(monthStart);
    const calEnd = endOfWeekMon(monthEnd);
    const days = eachDay(calStart, calEnd);

    // Group bookings by date
    const byDate: Record<string, { safari: Booking[]; packages: Booking[] }> = {};
    bookings.forEach(b => {
        const k = b.date;
        if (!byDate[k]) byDate[k] = { safari: [], packages: [] };
        b.package_type ? byDate[k].packages.push(b) : byDate[k].safari.push(b);
    });

    const navigateMonth = (dir: 'prev' | 'next') => {
        const m = dir === 'prev' ? subMonths(current, 1) : addMonths(current, 1);
        router.push(`/admin/calendar?month=${formatYM(m)}`);
    };

    const handleCancel = async (id: string) => {
        await updateBookingStatus(id, 'cancelled');
        router.refresh();
    };

    const totalSafari = bookings.filter(b => !b.package_type).length;
    const totalPackage = bookings.filter(b => !!b.package_type).length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const upcoming = bookings.filter(b => getBookingStatus(b) === 'upcoming').length;
    const finished = bookings.filter(b => getBookingStatus(b) === 'finished').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-safari-900">Booking Calendar</h1>
                    <p className="text-safari-600 text-sm">Visual overview of all bookings by date</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => navigateMonth('prev')} className="p-2 rounded-xl bg-white border border-safari-200 hover:bg-safari-50 text-safari-600 shadow-sm transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-lg font-bold text-safari-900 min-w-[180px] text-center">
                        {MONTHS[current.getMonth()]} {current.getFullYear()}
                    </span>
                    <button onClick={() => navigateMonth('next')} className="p-2 rounded-xl bg-white border border-safari-200 hover:bg-safari-50 text-safari-600 shadow-sm transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Legend & Stats */}
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-5 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-safari-100">
                    {Object.entries(statusConfig).map(([key, cfg]) => (
                        <div key={key} className="flex items-center gap-1.5 text-sm font-semibold">
                            <span className={cn('w-2.5 h-2.5 rounded-full', cfg.dot)} />
                            <span className={cfg.text}>{cfg.label}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-safari-100 text-sm font-bold text-safari-600">
                    <span>🦒 Safari: {totalSafari}</span>
                    <span>📦 Package: {totalPackage}</span>
                    <span className="text-green-600">↑ {upcoming}</span>
                    <span className="text-yellow-600">✓ {finished}</span>
                    <span className="text-red-600">✕ {cancelled}</span>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-safari-100 overflow-hidden">
                <div className="grid grid-cols-7 border-b border-safari-100">
                    {DAYS_SHORT.map(d => (
                        <div key={d} className="p-3 text-center text-sm font-bold text-safari-500 uppercase tracking-wider bg-safari-50/50">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7">
                    {days.map((day, i) => {
                        const dk = formatDate(day);
                        const db = byDate[dk];
                        const total = (db?.safari.length || 0) + (db?.packages.length || 0);
                        const inMonth = isSameMonth(day, current);

                        return (
                            <div
                                key={i}
                                onClick={() => total > 0 && setSelectedDay(day)}
                                className={cn(
                                    'min-h-[110px] md:min-h-[130px] border-b border-r border-safari-100/60 p-2 transition-all',
                                    !inMonth && 'bg-safari-50/40',
                                    inMonth && 'bg-white',
                                    isToday(day) && 'bg-secondary-50/30 ring-1 ring-inset ring-secondary-200',
                                    total > 0 && 'cursor-pointer hover:bg-safari-50/60'
                                )}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className={cn(
                                        'text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full',
                                        !inMonth && 'text-safari-300',
                                        inMonth && 'text-safari-700',
                                        isToday(day) && 'bg-secondary-500 text-white'
                                    )}>
                                        {day.getDate()}
                                    </span>
                                    {total > 0 && (
                                        <span className="text-xs font-bold text-safari-400 bg-safari-100 px-2 py-0.5 rounded-full">{total}</span>
                                    )}
                                </div>
                                {inMonth && db && (
                                    <div className="space-y-0.5">
                                        {[...db.safari, ...db.packages].slice(0, 3).map(b => (
                                            <BookingPill key={b.id} booking={b} onCancel={handleCancel} onViewDetails={(b) => setSelectedBooking(b)} />
                                        ))}
                                        {total > 3 && <div className="text-xs font-bold text-safari-400 text-center py-0.5">+{total - 3} more</div>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile list */}
            <div className="md:hidden space-y-3">
                <h2 className="text-lg font-bold text-safari-900">All Bookings This Month</h2>
                {Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([dk, dd]) => {
                    const d = new Date(dk);
                    if (!isSameMonth(d, current)) return null;
                    return (
                        <div key={dk} className="bg-white rounded-xl border border-safari-100 shadow-sm overflow-hidden">
                            <div className="px-4 py-2.5 bg-safari-50/60 border-b border-safari-100 flex items-center justify-between">
                                <span className="text-base font-bold text-safari-900">{shortDate(d)}</span>
                                <span className="text-sm text-safari-400 font-bold">{dd.safari.length + dd.packages.length} bookings</span>
                            </div>
                            <div className="p-3 space-y-3">
                                {dd.safari.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold uppercase text-safari-400 mb-1.5">🦒 Safari</p>
                                        <div className="space-y-1.5">{dd.safari.map(b => <DetailRow key={b.id} booking={b} onCancel={handleCancel} onViewDetails={setSelectedBooking} />)}</div>
                                    </div>
                                )}
                                {dd.packages.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold uppercase text-purple-500 mb-1.5">📦 Package</p>
                                        <div className="space-y-1.5">{dd.packages.map(b => <DetailRow key={b.id} booking={b} onCancel={handleCancel} onViewDetails={setSelectedBooking} />)}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Booking detail modal */}
            {selectedBooking && (
                <BookingDetailModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onCancel={async (id) => { await handleCancel(id); setSelectedBooking(null); }}
                />
            )}

            {/* Day detail modal */}
            {selectedDay && byDate[formatDate(selectedDay)] && (
                <DayDetail
                    date={selectedDay}
                    safariBookings={byDate[formatDate(selectedDay)]?.safari || []}
                    packageBookings={byDate[formatDate(selectedDay)]?.packages || []}
                    onCancel={handleCancel}
                    onClose={() => setSelectedDay(null)}
                    onViewDetails={(b) => { setSelectedDay(null); setSelectedBooking(b); }}
                />
            )}
        </div>
    );
}
