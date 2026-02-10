'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, MapPin, Mail, Phone, Globe, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface BookingFormProps {
    preselectedPackage?: 'cooking-class' | 'village-tour' | 'bicycle-rent';
    locked?: boolean;
}

const PACKAGE_INFO = {
    'cooking-class': {
        name: 'Organic Cooking Experience',
        price: 22,
        duration: '4-5 Hours',
        advance: 5,
    },
    'village-tour': {
        name: 'Sigiriya Village Tour',
        price: 22,
        duration: '4-5 Hours',
        advance: 5,
    },
    'bicycle-rent': {
        name: 'Bicycle Rent',
        price: 5,
        duration: 'Flexible',
        advance: 5,
    },
};

const TIME_SLOTS = [
    { value: '06:00', label: '6:00 AM - Early Morning' },
    { value: '09:00', label: '9:00 AM - Morning' },
    { value: '14:00', label: '2:00 PM - Afternoon' },
    { value: '16:00', label: '4:00 PM - Late Afternoon' },
];

export default function BookingForm({ preselectedPackage, locked = false }: BookingFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        package_type: preselectedPackage || 'cooking-class',
        date: '',
        time: '09:00',
        group_size: 2,
        pickup_required: false,
        hotel_name: '',
        customer_name: '',
        email: '',
        phone: '',
        country: '',
        special_requests: '',
    });

    const selectedPackage = PACKAGE_INFO[formData.package_type as keyof typeof PACKAGE_INFO];
    const totalPrice = selectedPackage.price * formData.group_size;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    advance_payment_amount: selectedPackage.advance,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create booking');
            }

            // Redirect to confirmation page
            router.push(`/packages/book/confirmation/${data.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
            setLoading(false);
        }
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-red-900 mb-1">Booking Error</h4>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Package Selection - Only show if not locked */}
            {!locked && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                            <CheckCircle size={20} className="text-secondary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-safari-900">Select Experience</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {Object.entries(PACKAGE_INFO).map(([key, info]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setFormData({ ...formData, package_type: key as any })}
                                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${formData.package_type === key
                                    ? 'border-secondary-600 bg-secondary-50'
                                    : 'border-safari-100 hover:border-safari-200'
                                    }`}
                            >
                                <div className="font-bold text-safari-900 mb-1 text-sm sm:text-base">{info.name}</div>
                                <div className="text-secondary-600 font-bold text-lg sm:text-xl">USD {info.price}</div>
                                <div className="text-safari-500 text-xs sm:text-sm mt-1">{info.duration}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* If locked, maybe show a read-only header? Or just rely on the page title? */}
            {locked && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={24} className="text-secondary-600" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-safari-500 uppercase tracking-wider">Selected Experience</div>
                            <div className="text-xl font-bold text-safari-900">{selectedPackage.name}</div>
                            <div className="text-sm text-safari-600 mt-1">{selectedPackage.duration} • USD {selectedPackage.price} per person</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Date & Time */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Calendar size={20} className="text-secondary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-safari-900">Date & Time</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Preferred Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            min={getTomorrowDate()}
                            required
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Preferred Time</label>
                        <select
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            required
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                        >
                            {TIME_SLOTS.map((slot) => (
                                <option key={slot.value} value={slot.value}>{slot.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Group Size</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, group_size: Math.max(1, formData.group_size - 1) })}
                                className="w-12 h-12 bg-safari-100 hover:bg-safari-200 rounded-xl font-bold text-safari-900 transition-colors"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={formData.group_size}
                                onChange={(e) => setFormData({ ...formData, group_size: Math.max(1, parseInt(e.target.value) || 1) })}
                                min="1"
                                max="20"
                                required
                                className="flex-1 p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all text-center font-bold text-lg"
                            />
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, group_size: Math.min(20, formData.group_size + 1) })}
                                className="w-12 h-12 bg-safari-100 hover:bg-safari-200 rounded-xl font-bold text-safari-900 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pickup Details */}
            {formData.package_type !== 'bicycle-rent' && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                            <MapPin size={20} className="text-secondary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-safari-900">Pickup Details</h3>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer mb-4 p-4 rounded-xl hover:bg-safari-50 transition-colors">
                        <input
                            type="checkbox"
                            checked={formData.pickup_required}
                            onChange={(e) => setFormData({ ...formData, pickup_required: e.target.checked })}
                            className="w-5 h-5 rounded border-safari-300 text-secondary-600 focus:ring-secondary-500"
                        />
                        <span className="font-semibold text-safari-900">I need hotel pickup</span>
                    </label>

                    {formData.pickup_required && (
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-safari-700 ml-1">Hotel Name</label>
                            <input
                                type="text"
                                value={formData.hotel_name}
                                onChange={(e) => setFormData({ ...formData, hotel_name: e.target.value })}
                                placeholder="Enter your hotel name"
                                required={formData.pickup_required}
                                className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Contact Information */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Mail size={20} className="text-secondary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-safari-900">Your Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.customer_name}
                            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                            placeholder="John Doe"
                            required
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            required
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Phone (with country code)</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 234 567 8900"
                            required
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Country</label>
                        <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="United States"
                            required
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Special Requests (Optional)</label>
                        <textarea
                            value={formData.special_requests}
                            onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                            placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                            rows={4}
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                <div>
                    <div className="text-sm text-safari-600 mb-1">Total Price</div>
                    <div className="text-3xl font-bold text-safari-900">
                        USD {totalPrice}
                        <span className="text-base text-safari-500 font-normal ml-2">
                            ({formData.group_size} {formData.group_size === 1 ? 'person' : 'people'})
                        </span>
                    </div>
                    <div className="text-sm text-secondary-600 font-semibold mt-1">
                        Advance payment: USD {selectedPackage.advance}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-secondary-600 hover:bg-secondary-500 disabled:bg-safari-300 text-white font-bold py-4 px-8 sm:px-12 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg disabled:hover:scale-100 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3 text-base sm:text-lg"
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Complete Booking
                            <CheckCircle size={20} />
                        </>
                    )}
                </button>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-safari-50 rounded-2xl p-6 border border-safari-100">
                <h4 className="font-bold text-safari-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} className="text-safari-600" />
                    Cancellation Policy
                </h4>
                <ul className="space-y-2 text-sm text-safari-700">
                    <li className="flex items-start gap-2">
                        <span className="text-secondary-600 mt-1">•</span>
                        <span>Free cancellation up to 24 hours before the experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-secondary-600 mt-1">•</span>
                        <span>Full refund of advance payment if cancelled within policy</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-secondary-600 mt-1">•</span>
                        <span>Remaining balance paid on the day of the experience</span>
                    </li>
                </ul>
            </div>
        </form>
    );
}
