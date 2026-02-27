'use client';

import { useState } from 'react';
import BookingRow from './BookingRow';
import BookingCard from './BookingCard';
import BookingDetailModal from './BookingDetailModal';
import BookingPagination from './BookingPagination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingsList({ bookings, totalPages, extraHourPriceUsd }: { bookings: any[]; totalPages: number; extraHourPriceUsd: number }) {
    const [selectedBooking, setSelectedBooking] = useState<typeof bookings[0] | null>(null);

    return (
        <>
            {/* Mobile View: List of Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {bookings?.map((booking: any) => (
                    <BookingCard key={booking.id} booking={booking} onViewDetails={() => setSelectedBooking(booking)} extraHourPriceUsd={extraHourPriceUsd} />
                ))}
                {(!bookings || bookings.length === 0) && (
                    <div className="bg-white p-12 text-center text-safari-400 rounded-3xl border border-safari-100 shadow-sm">
                        No bookings found matching filters.
                    </div>
                )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-safari-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-base min-w-[640px]">
                        <thead className="bg-safari-50 border-b border-safari-100/50">
                            <tr>
                                <th className="p-4 font-semibold text-safari-700">Ref</th>
                                <th className="p-4 font-semibold text-safari-700">Customer</th>
                                <th className="p-4 font-semibold text-safari-700">Destination</th>
                                <th className="p-4 font-semibold text-safari-700">Date/Time</th>
                                <th className="p-4 font-semibold text-safari-700">Group</th>
                                <th className="p-4 font-semibold text-safari-700">Status</th>
                                <th className="p-4 font-semibold text-safari-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-safari-100">
                            {bookings?.map((booking: any) => (
                                <BookingRow
                                    key={booking.id}
                                    booking={booking}
                                    onSelect={() => setSelectedBooking(booking)}
                                />
                            ))}
                            {(!bookings || bookings.length === 0) && (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-safari-400">
                                        No bookings found matching filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <BookingPagination totalPages={totalPages} />
            </div>

            {selectedBooking && (
                <BookingDetailModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    extraHourPriceUsd={extraHourPriceUsd}
                />
            )}
        </>
    );
}
