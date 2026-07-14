'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateBookingStatus, cancelBooking } from '@/lib/actions/admin';
import { Loader2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingRow({ booking, onSelect }: { booking: any; onSelect?: () => void }) {
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
        <tr
            className={cn("hover:bg-safari-50/50 transition-colors", onSelect && "cursor-pointer")}
            onClick={onSelect}
        >
            <td className="p-4 font-mono text-sm text-safari-400">{booking.id.slice(0, 8)}</td>
            <td className="p-4">
                <div className="font-semibold text-safari-900">{booking.customer_name}</div>
                <div className="text-sm text-safari-500">{booking.email}</div>
                <div className="text-sm text-safari-500">{booking.phone}</div>
            </td>
            <td className="p-4 text-safari-800">
                {booking.package_type ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-purple-100 text-purple-800">
                        {formatPackageName(booking.package_type)}
                    </span>
                ) : (
                    booking.destinations?.name || 'Unknown'
                )}
            </td>
            <td className="p-4">
                <div className="font-medium text-safari-900">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </div>
                <div className="text-sm text-safari-500">{booking.time}</div>
            </td>
            <td className="p-4 text-safari-800">{booking.group_size}</td>
            <td className="p-4">
                <span className={cn("px-2 py-1 rounded-full text-sm font-bold uppercase tracking-wider", statusColors[displayStatus as keyof typeof statusColors])}>
                    {displayStatus}
                </span>
                {justConfirmed && (
                    <div className="mt-1 text-sm font-semibold text-green-700">Confirmed — email sent</div>
                )}
            </td>
            <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                    {displayStatus !== 'confirmed' && displayStatus !== 'cancelled' && (
                        <>
                            <button
                                onClick={() => setShowConfirmDialog(true)}
                                disabled={loading}
                                className="p-1 rounded bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 disabled:opacity-50"
                                title="Confirm"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                            </button>
                            <button
                                onClick={() => setShowCancelDialog(true)}
                                disabled={loading}
                                className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 disabled:opacity-50"
                                title="Cancel"
                            >
                                <X size={16} />
                            </button>
                        </>
                    )}
                    {displayStatus === 'confirmed' && (
                        <button onClick={() => setShowCancelDialog(true)} className="text-sm text-red-500 hover:underline">Cancel</button>
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
            </td>
        </tr>
    );
}
