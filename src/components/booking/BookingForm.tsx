'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, MapPin, Mail, Phone, Globe, MessageSquare, Loader2, CheckCircle, AlertCircle, ExternalLink, Tag, ChevronDown } from 'lucide-react';
import { validatePromoCode } from '@/lib/actions/promo-codes';

interface BookingFormProps {
    preselectedPackage?: 'cooking-class' | 'village-tour' | 'bicycle-rent';
    locked?: boolean;
}

const COUNTRY_CODES = [
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
];

import { PACKAGE_INFO, TIME_SLOTS } from '@/lib/constants';

export default function BookingForm({ preselectedPackage, locked = false }: BookingFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [showPromoCode, setShowPromoCode] = useState(false);

    const [formData, setFormData] = useState({
        package_type: preselectedPackage || 'cooking-class',
        date: '',
        time: '09:00',
        group_size: 2,
        pickup_required: false,
        hotel_name: '',
        pickup_location: '',
        customer_name: '',
        email: '',
        country_code: '+94',
        phone: '',
        passport_number: '',
        country: '',
        special_requests: '',
        promo_code: '',
    });



    // ... inside component ...
    const [discount, setDiscount] = useState<{ amount: number; code: string } | null>(null);
    const [validatingPromo, setValidatingPromo] = useState(false);
    const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // ... existing state ...

    const selectedPackage = PACKAGE_INFO[formData.package_type as keyof typeof PACKAGE_INFO];
    const basePrice = selectedPackage.price * formData.group_size;
    const totalPrice = discount ? Math.max(0, basePrice - discount.amount) : basePrice;

    // Reset discount when package or group size changes
    // We can use useEffect or just reset it in the onChange handlers (which is cumbersome)
    // or just re-validate if we want to be fancy. For now, let's clear it if parameters change to avoid inconsistency
    // actually, better to just keep it and re-validate on submit, or warning?
    // User might want the discount to apply even if they change group size (percentage works, fixed might be per order).
    // Let's simple: Clear discount if critical params change to force re-apply? Or just leave it?
    // If it's percentage, it should recalculate. If fixed, it stays. state stores amount?
    // The action returns specific amount. 
    // Let's clear discount on package/group change to play safe. 
    // But `formData` is one big object. 
    // Let's add useEffect to clear discount when price-affecting factors change.

    // ...

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: any) => {
        let error = '';
        if (name === 'date' && !value) error = 'Date is required';
        if (name === 'time' && !value) error = 'Time is required';
        if (name === 'customer_name' && !value) error = 'Name is required';
        if (name === 'email') {
            if (!value) error = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
        }
        if (name === 'phone' && !value) error = 'Phone number is required';
        if (name === 'country' && !value) error = 'Country is required';
        if (formData.pickup_required) {
            if (name === 'hotel_name' && !value) error = 'Hotel name is required';
            if (name === 'pickup_location' && !value) error = 'Pickup location is required';
        }

        setErrors(prev => {
            const newErrors = { ...prev };
            if (error) newErrors[name] = error;
            else delete newErrors[name];
            return newErrors;
        });
        return error;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear discount if critical params change
        if (['package_type', 'group_size'].includes(name)) {
            setDiscount(null);
            setPromoMessage(null);
        }

        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleApplyPromo = async () => {
        if (!formData.promo_code) return;
        setValidatingPromo(true);
        setPromoMessage(null);

        try {
            const result = await validatePromoCode(formData.promo_code, basePrice, formData.package_type);

            if (result.valid) {
                // Force re-render of total price by ensuring state update is processed
                setDiscount({ amount: result.discount || 0, code: result.code! });
                setFormData(prev => ({ ...prev, promo_code: result.code! })); // Ensure case matches
                setPromoMessage({ type: 'success', text: `Applied! You saved $${result.discount}` });
            } else {
                setDiscount(null);
                setPromoMessage({ type: 'error', text: result.message || 'Invalid code' });
            }
        } catch (error) {
            console.error(error);
            setPromoMessage({ type: 'error', text: 'Failed to validate code' });
        } finally {
            setValidatingPromo(false);
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.customer_name) newErrors.customer_name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (formData.pickup_required) {
            if (!formData.hotel_name) newErrors.hotel_name = 'Hotel name is required';
            if (!formData.pickup_location) newErrors.pickup_location = 'Pickup location is required';
        }
        setErrors(newErrors);
        setTouched({
            date: true, time: true, customer_name: true, email: true, phone: true, country: true,
            hotel_name: true, pickup_location: true
        });
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setError('Please correct the errors in the form before submitting.');
            // Scroll to top or first error?
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setError('');
        setLoading(true);

        try {
            const fullPhone = `${formData.country_code} ${formData.phone}`;
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    phone: fullPhone,
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
                                onClick={() => {
                                    setFormData({ ...formData, package_type: key as any });
                                    setDiscount(null);
                                    setPromoMessage(null);
                                }}
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
                            name="date"
                            value={formData.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            onBlur={handleBlur}
                            min={getTomorrowDate()}
                            className={`w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 placeholder:text-safari-500 focus:bg-white outline-none transition-all [color-scheme:light] ${errors.date ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                        />
                        {errors.date && <p className="text-red-500 text-xs ml-1">{errors.date}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Preferred Time</label>
                        <select
                            name="time"
                            value={formData.time}
                            onChange={(e) => handleChange('time', e.target.value)}
                            onBlur={handleBlur}
                            className={`w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 focus:bg-white outline-none transition-all [color-scheme:light] ${errors.time ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                        >
                            {TIME_SLOTS.map((slot) => (
                                <option key={slot.value} value={slot.value}>{slot.label}</option>
                            ))}
                        </select>
                        {errors.time && <p className="text-red-500 text-xs ml-1">{errors.time}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Group Size</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    handleChange('group_size', Math.max(1, formData.group_size - 1));
                                }}
                                className="w-12 h-12 bg-safari-100 hover:bg-safari-200 rounded-xl font-bold text-safari-900 transition-colors"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                name="group_size"
                                value={formData.group_size}
                                onChange={(e) => {
                                    handleChange('group_size', Math.max(1, parseInt(e.target.value) || 1));
                                }}
                                min="1"
                                max="20"
                                className="flex-1 p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 text-safari-900 focus:border-secondary-500 focus:bg-white outline-none transition-all text-center font-bold text-lg"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    handleChange('group_size', Math.min(20, formData.group_size + 1));
                                }}
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
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-safari-700 ml-1">Hotel Name</label>
                                <input
                                    type="text"
                                    name="hotel_name"
                                    value={formData.hotel_name}
                                    onChange={(e) => handleChange('hotel_name', e.target.value)}
                                    onBlur={handleBlur}
                                    placeholder="Enter your hotel name"
                                    className={`w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 placeholder:text-safari-500 focus:bg-white outline-none transition-all ${errors.hotel_name ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                                />
                                {errors.hotel_name && <p className="text-red-500 text-xs ml-1">{errors.hotel_name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-safari-700 ml-1">Pickup Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="pickup_location"
                                        value={formData.pickup_location}
                                        onChange={(e) => handleChange('pickup_location', e.target.value)}
                                        onBlur={handleBlur}
                                        placeholder="Paste Google Maps link or type location"
                                        className={`w-full p-3 sm:p-4 pr-10 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 placeholder:text-safari-500 focus:bg-white outline-none transition-all text-sm ${errors.pickup_location ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                                    />
                                    <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-safari-400" />
                                </div>
                                {errors.pickup_location && <p className="text-red-500 text-xs ml-1">{errors.pickup_location}</p>}

                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://www.google.com/maps/@7.8731,80.7718,9z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-600 hover:text-secondary-700 bg-secondary-50 hover:bg-secondary-100 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <MapPin size={12} />
                                        Pick on Google Maps
                                    </a>
                                    {formData.pickup_location && formData.pickup_location.includes('google.com/maps') && (
                                        <a
                                            href={formData.pickup_location}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700"
                                        >
                                            <ExternalLink size={12} />
                                            View on Maps
                                        </a>
                                    )}
                                </div>
                                {formData.pickup_location && formData.pickup_location.includes('google.com/maps') && (
                                    <div className="mt-1 rounded-xl overflow-hidden border border-safari-100">
                                        <iframe
                                            src={`https://maps.google.com/maps?q=${encodeURIComponent(formData.pickup_location)}&output=embed`}
                                            width="100%"
                                            height="150"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="rounded-xl"
                                        />
                                    </div>
                                )}
                            </div>
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
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={(e) => handleChange('customer_name', e.target.value)}
                            onBlur={handleBlur}
                            placeholder="John Doe"
                            className={`w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 placeholder:text-safari-500 focus:bg-white outline-none transition-all ${errors.customer_name ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                        />
                        {errors.customer_name && <p className="text-red-500 text-xs ml-1">{errors.customer_name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onBlur={handleBlur}
                            placeholder="john@example.com"
                            className={`w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 placeholder:text-safari-500 focus:bg-white outline-none transition-all ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Contact Number</label>
                        <div className="flex gap-2">
                            <div className="relative w-[100px] sm:w-[110px]">
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-safari-900">
                                    {COUNTRY_CODES.find(cc => cc.code === formData.country_code)?.flag} {formData.country_code}
                                </div>
                                <select
                                    value={formData.country_code}
                                    onChange={(e) => handleChange('country_code', e.target.value)}
                                    className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 focus:border-secondary-500 focus:bg-white outline-none transition-all text-sm text-transparent cursor-pointer appearance-none [color-scheme:light]"
                                >
                                    {COUNTRY_CODES.map((cc) => (
                                        <option key={cc.code} value={cc.code} className="text-safari-900 bg-white">
                                            {cc.flag} {cc.code} {cc.country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    onBlur={handleBlur}
                                    placeholder="771 234 567"
                                    className={`w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 placeholder:text-safari-500 focus:bg-white outline-none transition-all ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            onBlur={handleBlur}
                            placeholder="United States"
                            className={`w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border text-safari-900 placeholder:text-safari-500 focus:bg-white outline-none transition-all ${errors.country ? 'border-red-300 focus:border-red-500' : 'border-safari-100 focus:border-secondary-500'}`}
                        />
                        {errors.country && <p className="text-red-500 text-xs ml-1">{errors.country}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Passport Number</label>
                        <input
                            type="text"
                            value={formData.passport_number}
                            onChange={(e) => setFormData({ ...formData, passport_number: e.target.value })}
                            placeholder="e.g. N1234567"
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 text-safari-900 placeholder:text-safari-500 focus:border-secondary-500 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-bold text-safari-700 ml-1">Special Requests (Optional)</label>
                        <textarea
                            value={formData.special_requests}
                            onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                            placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                            rows={4}
                            className="w-full p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 text-safari-900 placeholder:text-safari-500 focus:border-secondary-500 focus:bg-white outline-none transition-all resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                <button
                    type="button"
                    onClick={() => setShowPromoCode(!showPromoCode)}
                    className="flex items-center gap-3 w-full text-left"
                >
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Tag size={20} className="text-secondary-600" />
                    </div>
                    <span className="text-lg font-bold text-safari-900 flex-1">Have a Promo Code?</span>
                    <ChevronDown size={20} className={`text-safari-400 transition-transform ${showPromoCode ? 'rotate-180' : ''}`} />
                </button>

                {showPromoCode && (
                    <div className="mt-4 space-y-3">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.promo_code}
                                onChange={(e) => {
                                    setFormData({ ...formData, promo_code: e.target.value.toUpperCase() });
                                    if (discount) {
                                        setDiscount(null);
                                        setPromoMessage(null);
                                    }
                                }}
                                placeholder="Enter promo code"
                                className="flex-1 p-3 sm:p-4 bg-safari-50/50 rounded-xl sm:rounded-2xl border border-safari-100 text-safari-900 placeholder:text-safari-500 focus:border-secondary-500 focus:bg-white outline-none transition-all uppercase tracking-wider font-semibold"
                            />
                            <button
                                type="button"
                                onClick={handleApplyPromo}
                                disabled={validatingPromo || !formData.promo_code}
                                className="bg-safari-900 text-white font-bold px-6 rounded-xl hover:bg-safari-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {validatingPromo ? <Loader2 className="animate-spin" size={20} /> : 'Apply'}
                            </button>
                        </div>
                        {promoMessage && (
                            <div className={`text-sm font-semibold flex items-center gap-2 ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                {promoMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                {promoMessage.text}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                <div>
                    <div className="text-sm text-safari-600 mb-1">Total Price</div>
                    <div className="text-3xl font-bold text-safari-900 flex flex-col items-start gap-1">
                        <div className="flex items-baseline gap-3">
                            {discount ? (
                                <>
                                    <span className="text-secondary-600">USD {totalPrice.toFixed(2)}</span>
                                    <span className="text-lg text-safari-400 line-through decoration-2">USD {basePrice.toFixed(2)}</span>
                                </>
                            ) : (
                                <span>USD {totalPrice}</span>
                            )}
                        </div>
                        <span className="text-base text-safari-500 font-normal">
                            ({formData.group_size} {formData.group_size === 1 ? 'person' : 'people'})
                        </span>
                    </div>
                    <div className="text-sm text-secondary-600 font-semibold mt-2">
                        Advance payment: USD {selectedPackage.advance}
                        <span className="text-red-500 text-xs font-bold ml-2">(Non-Refundable)</span>
                    </div>
                    {discount && (
                        <div className="text-sm text-green-600 font-bold mt-1">
                            You save USD {discount.amount.toFixed(2)}
                        </div>
                    )}
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
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-600" />
                    Payment & Cancellation Policy
                </h4>
                <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span><strong>The advance payment of USD {selectedPackage.advance} is non-refundable.</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Cancellation is allowed up to 24 hours before the experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Remaining balance is paid on the day of the experience</span>
                    </li>
                </ul>
            </div>
        </form >
    );
}
