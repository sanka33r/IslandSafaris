'use client';

import { useState } from 'react';
import { updateBookingStatus } from '@/lib/actions/admin';
import { Loader2, Check, X, User, MapPin, Calendar, Users, Phone, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PACKAGE_INFO } from '@/lib/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingCard({ booking, onViewDetails }: { booking: any; onViewDetails?: () => void }) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (status: 'confirmed' | 'cancelled') => {
        if (confirm(`Mark this booking as ${status}?`)) {
            setLoading(true);
            await updateBookingStatus(booking.id, status);
            setLoading(false);
        }
    };

    const statusColors = {
        new: 'bg-blue-100 text-blue-700',
        confirmed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
    };

    const formatPackageName = (type: string) => {
        return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div
            className={cn("bg-white rounded-3xl p-6 shadow-sm border border-safari-100 space-y-4", onViewDetails && "cursor-pointer hover:ring-2 hover:ring-secondary-200 transition-all")}
            onClick={onViewDetails}
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-safari-400 font-mono text-base">
                        <span>Ref: {booking.id.slice(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-secondary-600" />
                        <span className="font-bold text-safari-900">{booking.customer_name}</span>
                    </div>
                </div>
                <span className={cn("px-2 py-1 rounded-full text-sm font-bold uppercase tracking-wider", statusColors[booking.status as keyof typeof statusColors])}>
                    {booking.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2 pt-2 text-base border-t border-safari-50">
                <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-safari-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-safari-400 uppercase">
                            {booking.package_type ? 'Package' : 'Destination'}
                        </p>
                        <p className="text-safari-800 font-medium leading-tight">
                            {booking.package_type ? (
                                <span className="text-purple-700">{formatPackageName(booking.package_type)}</span>
                            ) : (
                                booking.destinations?.name || 'Unknown'
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-safari-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-safari-400 uppercase">Date & Time</p>
                        <p className="text-safari-800 font-medium truncate">
                            {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ {booking.time}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Users size={16} className="text-safari-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-safari-400 uppercase">Group</p>
                        <p className="text-safari-800 font-medium">{booking.group_size} Persons</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Phone size={16} className="text-safari-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-safari-400 uppercase">Contact</p>
                        <p className="text-safari-800 font-medium truncate text-base">{booking.phone}</p>
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="col-span-2 mt-2 pt-2 border-t border-dashed border-safari-100">
                    <div className="flex justify-between items-center text-base">
                        <span className="text-safari-500">Total Price:</span>
                        <span className="font-bold text-safari-900">
                            ${booking.package_type ? (PACKAGE_INFO[booking.package_type as keyof typeof PACKAGE_INFO]?.price * booking.group_size) : booking.ticket_price}
                        </span>
                    </div>
                    {booking.discount_amount > 0 && (
                        <div className="flex justify-between items-center text-base text-green-600 font-medium">
                            <span className="flex items-center gap-1">
                                <Tag size={10} />
                                Promo ({booking.promo_code}):
                            </span>
                            <span>-${booking.discount_amount}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-base">
                        <span className="text-safari-500">Advance Paid:</span>
                        <span className="font-bold text-safari-900">${booking.advance_payment_amount || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-base mt-1 pt-1 border-t border-safari-100">
                        <span className="font-bold text-secondary-700">Balance Due:</span>
                        <span className="font-bold text-secondary-700">
                            ${Math.max(0, (booking.package_type ? (PACKAGE_INFO[booking.package_type as keyof typeof PACKAGE_INFO]?.price * booking.group_size) : booking.ticket_price) - (booking.discount_amount || 0) - (booking.advance_payment_amount || 0))}
                        </span>
                    </div>
                </div>
            </div>

            <div className="pt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                {booking.status !== 'confirmed' && booking.status !== 'cancelled' && (
                    <>
                        <button
                            onClick={() => handleUpdate('confirmed')}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 font-bold transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={18} />}
                            Confirm
                        </button>
                        <button
                            onClick={() => handleUpdate('cancelled')}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-bold transition-all disabled:opacity-50"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    </>
                )}
                {booking.status === 'confirmed' && (
                    <button
                        onClick={() => handleUpdate('cancelled')}
                        className="w-full py-2.5 text-base text-red-500 hover:text-red-600 font-bold bg-red-50 rounded-xl transition-all"
                    >
                        Cancel Booking
                    </button>
                )}
                {booking.status === 'cancelled' && (
                    <div className="w-full text-center py-2.5 text-base text-safari-400 font-medium bg-safari-50 rounded-xl">
                        Cancelled
                    </div>
                )}
            </div>
        </div>
    );
}
