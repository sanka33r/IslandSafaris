'use client';

import { useState } from 'react';
import { updateBookingStatus } from '@/lib/actions/admin';
import { Loader2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingRow({ booking, onSelect }: { booking: any; onSelect?: () => void }) {
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
        <tr
            className={cn("hover:bg-safari-50/50 transition-colors", onSelect && "cursor-pointer")}
            onClick={onSelect}
        >
            <td className="p-4 font-mono text-xs text-safari-400">{booking.id.slice(0, 8)}</td>
            <td className="p-4">
                <div className="font-semibold text-safari-900">{booking.customer_name}</div>
                <div className="text-xs text-safari-500">{booking.email}</div>
                <div className="text-xs text-safari-500">{booking.phone}</div>
            </td>
            <td className="p-4 text-safari-800">
                {booking.package_type ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
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
                <div className="text-xs text-safari-500">{booking.time}</div>
            </td>
            <td className="p-4 text-safari-800">{booking.group_size}</td>
            <td className="p-4">
                <span className={cn("px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider", statusColors[booking.status as keyof typeof statusColors])}>
                    {booking.status}
                </span>
            </td>
            <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2">
                    {booking.status !== 'confirmed' && booking.status !== 'cancelled' && (
                        <>
                            <button
                                onClick={() => handleUpdate('confirmed')}
                                disabled={loading}
                                className="p-1 rounded bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 disabled:opacity-50"
                                title="Confirm"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                            </button>
                            <button
                                onClick={() => handleUpdate('cancelled')}
                                disabled={loading}
                                className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 disabled:opacity-50"
                                title="Cancel"
                            >
                                <X size={16} />
                            </button>
                        </>
                    )}
                    {booking.status === 'confirmed' && (
                        <button onClick={() => handleUpdate('cancelled')} className="text-xs text-red-500 hover:underline">Cancel</button>
                    )}
                </div>
            </td>
        </tr>
    );
}
