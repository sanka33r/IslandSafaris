'use client';

import { useState, useTransition } from 'react';
import { updateBookingStatus } from '@/lib/actions/admin';
import {
    X, Loader2, User, MapPin, Calendar, Users, Phone, Mail,
    MessageSquare, Tag, Car, Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PACKAGE_INFO, SAFARI_EXTRA_PERSON_USD, SAFARI_MAX_GROUP_SIZE, EXTRA_HOUR_PRICE_USD } from '@/lib/constants';
import { useRouter } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingDetailModal({ booking, onClose, extraHourPriceUsd }: { booking: any; onClose: () => void; extraHourPriceUsd?: number }) {
    const hourPrice = extraHourPriceUsd ?? EXTRA_HOUR_PRICE_USD;
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const statusColors = {
        new: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        confirmed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
        cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    };
    const config = statusColors[booking.status as keyof typeof statusColors] || statusColors.new;

    const formatPackageName = (type: string) => {
        return type?.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || '';
    };
    const name = booking.package_type
        ? formatPackageName(booking.package_type)
        : (booking.destinations?.name || 'Safari');

    const handleUpdate = async (status: 'confirmed' | 'cancelled') => {
        if (confirm(`Mark this booking as ${status}?`)) {
            startTransition(async () => {
                await updateBookingStatus(booking.id, status);
                router.refresh();
                if (status === 'cancelled') onClose();
            });
        }
    };

    const dest = booking.destinations;
    // Safari: jeep only (vehicle + extra hours + extra person), all USD. Entrance ticket is paid at gate, so exclude from Total/Balance.
    const vehicleCount = dest ? Math.ceil(booking.group_size / SAFARI_MAX_GROUP_SIZE) : 0;
    const safariJeepTotalUsd = !booking.package_type && dest
        ? (dest.vehicle_price_up_to_3 ?? 0) * vehicleCount +
          (booking.extra_hours || 0) * hourPrice * vehicleCount +
          Math.max(0, booking.group_size - 3) * SAFARI_EXTRA_PERSON_USD
        : null;
    const totalPrice = booking.package_type
        ? (PACKAGE_INFO[booking.package_type as keyof typeof PACKAGE_INFO]?.price ?? 0) * booking.group_size
        : safariJeepTotalUsd ?? 0;
    const discount = booking.discount_amount ?? 0;
    const advance = booking.advance_payment_amount ?? 0;
    const discountUsd = discount;
    const isPaid = booking.advance_payment_status === 'paid';
    const balanceDue = isPaid ? 0 : Math.max(0, totalPrice - discountUsd - advance);

    const DetailItem = ({ label, value, icon: Icon }: { label: string; value: string | number | null | undefined; icon?: React.ElementType }) =>
        value != null && value !== '' ? (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-safari-50">
                {Icon && <Icon size={16} className="text-safari-500 mt-0.5 flex-shrink-0" />}
                <div className="min-w-0">
                    <p className="text-sm font-bold text-safari-500 uppercase">{label}</p>
                    <p className="text-base font-medium text-safari-900 break-words">{String(value)}</p>
                </div>
            </div>
        ) : null;

    const isMapLink = (s: string | null | undefined) => typeof s === 'string' && s.includes('google.com/maps');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl border border-safari-100 max-w-5xl w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-safari-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
                    <h3 className="text-lg font-bold text-safari-900">Booking Details</h3>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-safari-100 text-safari-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-base font-mono text-safari-400">Ref: {booking.id.slice(0, 8)}</p>
                            <p className="text-xl font-bold text-safari-900">{booking.customer_name}</p>
                        </div>
                        <span className={cn('px-2 py-1 rounded-full text-base font-bold uppercase', config.bg, config.text, config.border)}>
                            {booking.status}
                        </span>
                    </div>

                    {/* Trip details */}
                    <div className="mb-4">
                        <p className="text-sm font-bold text-safari-500 uppercase mb-2">Trip details</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-base">
                            <DetailItem label={booking.package_type ? 'Package' : 'Destination'} value={name} icon={MapPin} />
                            <DetailItem label="Date & Time" value={`${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at ${booking.time}`} icon={Calendar} />
                            <DetailItem label="Group Size" value={`${booking.group_size} person${booking.group_size > 1 ? 's' : ''}`} icon={Users} />
                            <DetailItem label="Extra Hours" value={booking.extra_hours > 0 ? `${booking.extra_hours} hour${booking.extra_hours > 1 ? 's' : ''}` : '0'} icon={Calendar} />
                            {booking.created_at && (
                                <DetailItem label="Booked On" value={new Date(booking.created_at).toLocaleString('en-US')} icon={Calendar} />
                            )}
                        </div>
                    </div>

                    {/* Contact & ID */}
                    <div className="mb-4">
                        <p className="text-sm font-bold text-safari-500 uppercase mb-2">Contact & ID</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-base">
                            <DetailItem label="Email" value={booking.email} icon={Mail} />
                            <DetailItem label="Phone" value={booking.phone} icon={Phone} />
                            <DetailItem label="Country" value={booking.country} icon={User} />
                            <DetailItem label="Passport" value={booking.passport_number} icon={User} />
                        </div>
                    </div>

                    {/* Pickup details */}
                    <div className="mb-4">
                        <p className="text-sm font-bold text-safari-500 uppercase mb-2 flex items-center gap-1.5">
                            <Car size={14} /> Pickup details
                        </p>
                        <div className="p-4 rounded-xl bg-safari-50 border border-safari-100 space-y-3">
                            <div className="flex items-start gap-2">
                                <Car size={16} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-safari-500 uppercase">Pickup requested</p>
                                    <p className="text-base font-medium text-safari-900">{booking.pickup_required ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            {booking.pickup_required && (
                                <>
                                    <div className="flex items-start gap-2">
                                        <Building2 size={16} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-safari-500 uppercase">Hotel name</p>
                                            <p className="text-base font-medium text-safari-900 break-words">{booking.hotel_name ?? '—'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin size={16} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-safari-500 uppercase">Pickup location</p>
                                            {booking.pickup_location ? (
                                                isMapLink(booking.pickup_location) ? (
                                                    <a href={booking.pickup_location} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-secondary-600 hover:underline break-all">
                                                        {booking.pickup_location}
                                                    </a>
                                                ) : (
                                                    <p className="text-base font-medium text-safari-900 break-words">{booking.pickup_location}</p>
                                                )
                                            ) : (
                                                <p className="text-base text-safari-500">—</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin size={16} className="text-safari-500 mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-safari-500 uppercase">Dropoff location</p>
                                            {booking.dropoff_location ? (
                                                isMapLink(booking.dropoff_location) ? (
                                                    <a href={booking.dropoff_location} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-secondary-600 hover:underline break-all">
                                                        {booking.dropoff_location}
                                                    </a>
                                                ) : (
                                                    <p className="text-base font-medium text-safari-900 break-words">{booking.dropoff_location}</p>
                                                )
                                            ) : (
                                                <p className="text-base text-safari-500">—</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {!booking.pickup_required && (
                                <p className="text-sm text-safari-500">No pickup requested. Hotel, pickup and dropoff locations are not provided.</p>
                            )}
                        </div>
                    </div>

                    {(booking.special_requests || booking.message) && (
                        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-safari-50">
                            <MessageSquare size={18} className="text-safari-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-base font-bold text-safari-500 uppercase">Notes / Special Requests</p>
                                <p className="text-base font-medium text-safari-900">{booking.special_requests || booking.message}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {booking.promo_code && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-100">
                                <Tag size={16} className="text-green-600" />
                                <span className="text-base font-bold text-green-700">Promo:</span>
                                <span className="font-semibold text-green-800">{booking.promo_code}</span>
                                {discountUsd > 0 && <span className="text-green-600">(-${typeof discountUsd === 'number' ? discountUsd.toFixed(2) : discountUsd})</span>}
                            </div>
                        )}
                        <div className="p-3 rounded-xl bg-safari-50 border border-safari-100 space-y-2">
                            <p className="text-base font-bold text-safari-500 uppercase">Payment</p>
                            <div className="flex justify-between text-base">
                                <span className="text-safari-600">Total</span>
                                <span className="font-semibold">${typeof totalPrice === 'number' ? (Number.isInteger(totalPrice) ? totalPrice : totalPrice.toFixed(2)) : totalPrice}</span>
                            </div>
                            {discountUsd > 0 && (
                                <div className="flex justify-between text-base text-green-600">
                                    <span>Discount</span>
                                    <span>-${typeof discountUsd === 'number' ? discountUsd.toFixed(2) : discountUsd}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-base">
                                <span className="text-safari-600">Advance Paid</span>
                                <span className="font-semibold">${advance}</span>
                            </div>
                            <div className="flex justify-between text-base pt-2 border-t border-safari-200">
                                <span className="font-bold text-secondary-700">Balance Due</span>
                                <span className="font-bold text-secondary-700">${typeof balanceDue === 'number' ? (Number.isInteger(balanceDue) ? balanceDue : balanceDue.toFixed(2)) : balanceDue}</span>
                            </div>
                            {booking.advance_payment_status && (
                                <p className="text-base text-safari-500 mt-1">Status: {booking.advance_payment_status}</p>
                            )}
                        </div>
                    </div>

                    {booking.status !== 'cancelled' && (
                        <div className="flex gap-2 mt-6">
                            {booking.status !== 'confirmed' && (
                                <button
                                    onClick={() => handleUpdate('confirmed')}
                                    disabled={isPending}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 font-bold transition-all disabled:opacity-50"
                                >
                                    {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
                                    Confirm
                                </button>
                            )}
                            <button
                                onClick={() => handleUpdate('cancelled')}
                                disabled={isPending}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-bold transition-all disabled:opacity-50"
                            >
                                {isPending ? <Loader2 size={16} className="animate-spin" /> : <X size={16} />}
                                Cancel Booking
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
