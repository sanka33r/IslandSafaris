'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBookingStatus, cancelBooking } from '@/lib/actions/admin';
import { Loader2, Check, X, User, MapPin, Calendar, Users, Phone, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PACKAGE_INFO, SAFARI_EXTRA_PERSON_USD, SAFARI_MAX_GROUP_SIZE, EXTRA_HOUR_PRICE_USD } from '@/lib/constants';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingCard({ booking, onViewDetails, extraHourPriceUsd }: { booking: any; onViewDetails?: () => void; extraHourPriceUsd?: number }) {
    const hourPrice = extraHourPriceUsd ?? EXTRA_HOUR_PRICE_USD;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [justConfirmed, setJustConfirmed] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const displayStatus = justConfirmed ? 'confirmed' : booking.status;

    const handleUpdate = async (status: 'confirmed') => {
        setShowConfirmDialog(false);
        setLoading(true);
        const result = await updateBookingStatus(booking.id, status);
        setLoading(false);
        if (result.success) {
            setJustConfirmed(true);
            router.refresh();
        }
    };

    const handleCancel = async () => {
        setShowCancelDialog(false);
        setLoading(true);
        await cancelBooking(booking.id, cancelReason);
        setCancelReason('');
        setLoading(false);
        router.refresh();
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
                <span className={cn("px-2 py-1 rounded-full text-sm font-bold uppercase tracking-wider", statusColors[displayStatus as keyof typeof statusColors])}>
                    {displayStatus}
                </span>
            </div>

            {justConfirmed && (
                <div className="p-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
                    Booking confirmed — confirmation email sent to the guest.
                </div>
            )}

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
                {(() => {
                    const dest = booking.destinations;
                    const vehicleCount = dest ? Math.ceil(booking.group_size / SAFARI_MAX_GROUP_SIZE) : 0;
                    // Safari: jeep only (vehicle + extra hours + extra person), all USD. Entrance ticket paid at gate — exclude from Total/Balance.
                    const safariTotalUsd = !booking.package_type && dest
                        ? (dest.vehicle_price_up_to_3 ?? 0) * vehicleCount +
                          (booking.extra_hours || 0) * hourPrice * vehicleCount +
                          Math.max(0, booking.group_size - 3) * SAFARI_EXTRA_PERSON_USD
                        : 0;
                    const totalPrice = booking.package_type
                        ? (PACKAGE_INFO[booking.package_type as keyof typeof PACKAGE_INFO]?.price ?? 0) * booking.group_size
                        : safariTotalUsd;
                    // Balance due = remaining to pay at destination (Total − discount − advance), not zeroed when advance is paid
                    const balanceDue = Math.max(0, totalPrice - (booking.discount_amount || 0) - (booking.advance_payment_amount || 0));
                    return (
                        <div className="col-span-2 mt-2 pt-2 border-t border-dashed border-safari-100">
                            <div className="flex justify-between items-center text-base">
                                <span className="text-safari-500">Total Price:</span>
                                <span className="font-bold text-safari-900">
                                    ${typeof totalPrice === 'number' && totalPrice >= 0 ? (booking.package_type ? totalPrice : totalPrice.toFixed(2)) : (booking.ticket_price ?? 0)}
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
                                    ${typeof balanceDue === 'number' ? (booking.package_type ? balanceDue : balanceDue.toFixed(2)) : 0}
                                </span>
                            </div>
                        </div>
                    );
                })()}
            </div>

            <div className="pt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                {displayStatus !== 'confirmed' && displayStatus !== 'cancelled' && (
                    <>
                        <button
                            onClick={() => setShowConfirmDialog(true)}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 font-bold transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={18} />}
                            Confirm
                        </button>
                        <button
                            onClick={() => setShowCancelDialog(true)}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-bold transition-all disabled:opacity-50"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    </>
                )}
                {displayStatus === 'confirmed' && (
                    <button
                        onClick={() => setShowCancelDialog(true)}
                        className="w-full py-2.5 text-base text-red-500 hover:text-red-600 font-bold bg-red-50 rounded-xl transition-all"
                    >
                        Cancel Booking
                    </button>
                )}
                {displayStatus === 'cancelled' && (
                    <div className="w-full text-center py-2.5 text-base text-safari-400 font-medium bg-safari-50 rounded-xl">
                        Cancelled
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={showConfirmDialog}
                title="Confirm booking"
                message={`Mark this booking for ${booking.customer_name} as confirmed? A confirmation email will be sent to the guest.`}
                confirmLabel="Confirm"
                loading={loading}
                onConfirm={() => handleUpdate('confirmed')}
                onCancel={() => setShowConfirmDialog(false)}
            />

            <ConfirmDialog
                open={showCancelDialog}
                title="Cancel booking"
                variant="danger"
                confirmLabel="Cancel booking"
                cancelLabel="Back"
                loading={loading}
                textarea={{
                    value: cancelReason,
                    onChange: setCancelReason,
                    label: 'Reason for cancellation',
                    placeholder: 'e.g. Fully booked, weather conditions, guest requested a change...',
                    helperText: 'This reason will be included in the cancellation email sent to the guest.',
                    required: true,
                }}
                onConfirm={handleCancel}
                onCancel={() => { setShowCancelDialog(false); setCancelReason(''); }}
            />
        </div>
    );
}
