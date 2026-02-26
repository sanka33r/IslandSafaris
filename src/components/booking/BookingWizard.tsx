'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Destination } from '@/types/db';
import { submitBooking } from '@/lib/actions/booking';
import { validatePromoCode } from '@/lib/actions/promo-codes';
import { BookingFormData } from '@/lib/schemas/booking';
import { Loader2, CheckCircle, CreditCard, Car, MapPin, ExternalLink, Tag, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { lkrToUsd } from '@/lib/constants';
import PaymentSection from '@/components/payments/PaymentSection';

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

interface BookingWizardProps {
    destinations: Destination[];
    preselectedDestinationId?: string;
}

const steps = [
    { id: 1, title: 'Destination' },
    { id: 2, title: 'Details' },
    { id: 3, title: 'Extras' },
    { id: 4, title: 'Contact' },
    { id: 5, title: 'Confirm' },
];

const step1Schema = z.object({
    destination_id: z.string().min(1, 'Please select a destination').uuid('Please select a valid destination'),
});
const step2Schema = z.object({
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    group_size: z.coerce.number().min(1, 'At least 1 person is required').max(20, 'For groups over 20, please contact us'),
});
const step3Schema = z.object({
    pickup_required: z.boolean(),
    hotel_name: z.string().optional(),
}).refine((d) => !d.pickup_required || (d.hotel_name && d.hotel_name.trim().length > 0), {
    message: 'Hotel name is required when pickup is requested',
    path: ['hotel_name'],
});
const step4Schema = z.object({
    customer_name: z.string().min(2, 'Name is required (at least 2 characters)'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    phone: z.string().min(8, 'Valid phone number is required'),
});

export default function BookingWizard({ destinations, preselectedDestinationId }: BookingWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<BookingFormData>>({
        destination_id: preselectedDestinationId || '',
        group_size: 2,
        extra_hours: 0,
        pickup_required: false,
        time: '06:00',
        country_code: '+94',
        pickup_location: '',
        passport_number: '',
        promo_code: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<any>(null);
    const [estimatedPrice, setEstimatedPrice] = useState<any>(null);

    const [discount, setDiscount] = useState<{ amount: number; code: string } | null>(null);
    const [validatingPromo, setValidatingPromo] = useState(false);
    const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [stepErrors, setStepErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (preselectedDestinationId && currentStep === 1) {
            setCurrentStep(2);
            setFormData(prev => ({ ...prev, destination_id: preselectedDestinationId }));
        }
    }, [preselectedDestinationId, currentStep]);

    useEffect(() => {
        if (formData.destination_id && formData.group_size) {
            const dest = destinations.find(d => d.id === formData.destination_id);
            if (dest) {
                const vehicles = Math.ceil((formData.group_size || 0) / 3);
                const vehicleCost = vehicles * dest.vehicle_price_up_to_3;
                const ticketCost = (dest.ticket_pricing_type === 'per_person' ? dest.ticket_price * (formData.group_size || 0) : dest.ticket_price * (formData.group_size || 0));
                const extraHours = formData.extra_hours || 0;
                const extraHourPrice = 5000;
                const extraCost = extraHours * extraHourPrice * vehicles;

                // We only charge for the safari jeep (+ extra hours). Entrance tickets are paid at the park gate.
                const ourCharge = vehicleCost + extraCost;
                setEstimatedPrice({
                    total: ourCharge,
                    breakdown: { ticketCost, vehicleCost, extraCost }
                });
            }
        }
    }, [formData, destinations]);

    // Clear discount when price-affecting factors change
    useEffect(() => {
        setDiscount(null);
        setPromoMessage(null);
    }, [formData.destination_id, formData.group_size, formData.extra_hours]);

    const handleApplyPromo = async () => {
        const code = (formData as any).promo_code?.trim();
        if (!code || !estimatedPrice) return;
        setValidatingPromo(true);
        setPromoMessage(null);
        try {
            const result = await validatePromoCode(code, estimatedPrice.total, 'safari');
            if (result.valid && result.discount != null) {
                setDiscount({ amount: result.discount, code: result.code! });
                updateField('promo_code' as any, result.code!);
                setPromoMessage({ type: 'success', text: `Applied! You saved USD ${lkrToUsd(result.discount)}` });
            } else {
                setDiscount(null);
                setPromoMessage({ type: 'error', text: result.message || 'Invalid promo code' });
            }
        } catch {
            setDiscount(null);
            setPromoMessage({ type: 'error', text: 'Failed to validate promo code' });
        } finally {
            setValidatingPromo(false);
        }
    };

    const updateField = (field: keyof BookingFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setStepErrors(prev => {
            const next = { ...prev };
            if (next[currentStep]) delete next[currentStep];
            return next;
        });
    };

    function validateStep(step: number): Record<string, string> {
        const errors: Record<string, string> = {};
        if (step === 1) {
            const r = step1Schema.safeParse({ destination_id: formData.destination_id || '' });
            if (!r.success) r.error.flatten().fieldErrors.destination_id?.forEach((m) => { errors.destination_id = m; });
        }
        if (step === 2) {
            const r = step2Schema.safeParse({
                date: formData.date || '',
                time: formData.time || '',
                group_size: formData.group_size ?? 0,
            });
            if (!r.success) {
                const f = r.error.flatten().fieldErrors;
                if (f.date?.[0]) errors.date = f.date[0];
                if (f.time?.[0]) errors.time = f.time[0];
                if (f.group_size?.[0]) errors.group_size = f.group_size[0];
            }
        }
        if (step === 3) {
            const r = step3Schema.safeParse({
                pickup_required: formData.pickup_required ?? false,
                hotel_name: (formData as any).hotel_name ?? '',
            });
            if (!r.success) {
                const f = r.error.flatten().fieldErrors;
                if (f.hotel_name?.[0]) errors.hotel_name = f.hotel_name[0];
            }
        }
        if (step === 4) {
            const r = step4Schema.safeParse({
                customer_name: (formData.customer_name ?? '').trim(),
                email: (formData.email ?? '').trim(),
                phone: (formData.phone ?? '').trim().replace(/\s/g, ''),
            });
            if (!r.success) {
                const f = r.error.flatten().fieldErrors;
                if (f.customer_name?.[0]) errors.customer_name = f.customer_name[0];
                if (f.email?.[0]) errors.email = f.email[0];
                if (f.phone?.[0]) errors.phone = f.phone[0];
            }
        }
        return errors;
    }

    const handleNext = () => {
        const errors = validateStep(currentStep);
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) {
            setStepErrors(prev => ({ ...prev, [currentStep]: errors }));
            return;
        }
        setStepErrors(prev => ({ ...prev, [currentStep]: {} }));
        setCurrentStep(prev => Math.min(prev + 1, 5));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const fullPhone = formData.country_code && formData.phone
                ? `${formData.country_code} ${formData.phone}`
                : formData.phone || '';
            const submitData = {
                ...formData,
                phone: fullPhone,
            } as BookingFormData;
            const res = await submitBooking(null, submitData);
            if (res.success) {
                setSubmitResult(res);
            } else {
                alert('Validation failed: ' + JSON.stringify(res.errors));
            }
        } catch (e) {
            console.error(e);
            alert('An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Payment confirmed state
    if (submitResult?.paid) {
        return (
            <div className="max-w-xl mx-auto bg-white rounded-3xl p-12 text-center shadow-lg border border-green-100">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold text-safari-900 mb-4">Booking Confirmed!</h2>
                <p className="text-safari-600 mb-8">
                    Thank you, {formData.customer_name}! Your advance payment has been received and your safari booking for {formData.date} is confirmed.
                </p>
                <div className="bg-safari-50 p-6 rounded-xl text-left mb-6 space-y-3">
                    <h3 className="font-semibold text-safari-900 mb-2">Safari jeep (remaining balance — pay at destination)</h3>
                    <p className="text-2xl font-bold text-secondary-600">USD {lkrToUsd(submitResult.pricing.total)}</p>
                    {submitResult.pricing.tickets != null && submitResult.pricing.tickets > 0 && (
                        <p className="text-sm text-safari-600">
                            Entrance ticket (approx. USD {lkrToUsd(submitResult.pricing.tickets)}) is paid separately at the park gate.
                        </p>
                    )}
                </div>
                <button onClick={() => window.location.href = '/'} className="w-full bg-secondary-600 text-white rounded-lg py-3 font-semibold hover:bg-secondary-700">Back to Home</button>
            </div>
        );
    }

    // Payment pending state — booking saved, show payment section
    if (submitResult?.success && submitResult?.bookingId) {
        return (
            <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-lg border border-amber-100">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-safari-900 mb-2">Complete Your Payment</h2>
                    <p className="text-safari-600 text-sm">
                        Almost done, {formData.customer_name}! Pay the USD 8 advance to confirm your safari booking for {formData.date}.
                    </p>
                </div>

                <PaymentSection
                    bookingId={submitResult.bookingId}
                    amount={8}
                    alreadyPaid={false}
                    onPaymentSuccess={() => setSubmitResult({ ...submitResult, paid: true })}
                />

                <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs text-red-800 mt-2">
                    <p className="flex items-start gap-2">
                        <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Non-Refundable Advance:</strong> The USD 8 advance payment is non-refundable. Remaining balance is paid at the destination.</span>
                    </p>
                </div>
            </div>
        );
    }

    const selectedDest = destinations.find(d => d.id === formData.destination_id);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Desktop Stepper */}
            <div className="mb-8 hidden md:flex items-center justify-between px-12">
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center z-10 relative">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                            currentStep >= step.id ? "bg-secondary-600 text-white shadow-md" : "bg-safari-100 text-safari-400"
                        )}>
                            {step.id}
                        </div>
                        <span className={cn(
                            "absolute -bottom-6 text-xs font-semibold whitespace-nowrap",
                            currentStep >= step.id ? "text-secondary-600" : "text-safari-300"
                        )}>{step.title}</span>
                    </div>
                ))}
            </div>

            {/* Mobile Stepper */}
            <div className="mb-6 md:hidden px-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-safari-400 uppercase tracking-wider">Step {currentStep} of {steps.length}</span>
                    <span className="text-sm font-bold text-safari-900">{steps.find(s => s.id === currentStep)?.title}</span>
                </div>
                <div className="w-full bg-safari-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                        className="bg-secondary-600 h-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-safari-100 min-h-[400px] mb-20 md:mb-0"
                    >
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-safari-900">Select Destination</h2>
                                {stepErrors[1]?.destination_id && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                                        <AlertCircle size={18} className="shrink-0" />
                                        {stepErrors[1].destination_id}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 gap-4">
                                    {destinations.map(d => (
                                        <button
                                            key={d.id}
                                            onClick={() => updateField('destination_id', d.id)}
                                            className={cn(
                                                "flex items-center p-4 rounded-xl border-2 text-left transition-all",
                                                formData.destination_id === d.id
                                                    ? "border-secondary-600 bg-secondary-50"
                                                    : "border-safari-100 hover:border-safari-200"
                                            )}
                                        >
                                            <MapPin className={cn("mr-4", formData.destination_id === d.id ? "text-secondary-600" : "text-safari-300")} />
                                            <div>
                                                <p className="font-bold text-safari-900">{d.name}</p>
                                                <p className="text-sm text-safari-500 line-clamp-1">{d.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-safari-900">Safari Details</h2>
                                {Object.keys(stepErrors[2] || {}).length > 0 && (
                                    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                        <ul className="list-disc list-inside space-y-0.5">
                                            {Object.values(stepErrors[2]!).map((msg, i) => (
                                                <li key={i}>{msg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-safari-700">Date</label>
                                        <input
                                            type="date"
                                            className={cn(
                                                "w-full p-3 rounded-lg border bg-safari-50 text-safari-900 focus:ring-2 focus:ring-secondary-500 outline-none [color-scheme:light]",
                                                stepErrors[2]?.date ? "border-red-400" : "border-safari-200"
                                            )}
                                            value={formData.date || ''}
                                            onChange={(e) => updateField('date', e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {stepErrors[2]?.date && (
                                            <p className="text-sm text-red-600 font-medium">{stepErrors[2].date}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-safari-700">Preferred Time</label>
                                        <div className="flex gap-2">
                                            {['06:00', '14:00'].map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => updateField('time', t)}
                                                    className={cn(
                                                        "flex-1 py-3 rounded-lg border text-center text-sm font-bold",
                                                        formData.time === t ? "bg-secondary-600 text-white border-secondary-600" : "border-safari-200 text-safari-900 hover:bg-safari-50",
                                                        stepErrors[2]?.time && "border-red-400"
                                                    )}
                                                >
                                                    {t === '06:00' ? 'Morning (6 AM)' : 'Evening (2 PM)'}
                                                </button>
                                            ))}
                                        </div>
                                        {stepErrors[2]?.time && (
                                            <p className="text-sm text-red-600 font-medium">{stepErrors[2].time}</p>
                                        )}
                                    </div>
                                    <div className="col-span-full space-y-4">
                                        <label className="text-sm font-semibold text-safari-700">Group Size</label>
                                        <div className="flex items-center gap-6">
                                            <input
                                                type="range"
                                                min="1"
                                                max="20"
                                                value={formData.group_size || 1}
                                                onChange={(e) => updateField('group_size', parseInt(e.target.value))}
                                                className="flex-1 accent-secondary-600 h-3 bg-safari-100 rounded-lg appearance-none cursor-pointer"
                                            />
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner",
                                                stepErrors[2]?.group_size ? "bg-red-50 border-2 border-red-300 text-red-700" : "bg-secondary-50 border-2 border-secondary-200 text-safari-900"
                                            )}>
                                                {formData.group_size}
                                            </div>
                                        </div>
                                        {stepErrors[2]?.group_size && (
                                            <p className="text-sm text-red-600 font-medium">{stepErrors[2].group_size}</p>
                                        )}
                                        <p className="text-xs text-safari-500">For groups &gt; 20, please contact us directly.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-safari-900">Extras & Pickup</h2>
                                {stepErrors[3]?.hotel_name && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                                        <AlertCircle size={18} className="shrink-0" />
                                        {stepErrors[3].hotel_name}
                                    </div>
                                )}
                                <div className="space-y-4 rounded-xl border border-safari-100 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Car className="text-secondary-600" />
                                            <span className="font-semibold text-safari-900">Hotel Pickup Required?</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={formData.pickup_required} onChange={(e) => updateField('pickup_required', e.target.checked)} />
                                            <div className="w-11 h-6 bg-safari-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600"></div>
                                        </label>
                                    </div>
                                    {formData.pickup_required && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Enter Hotel Name"
                                                className={cn(
                                                    "w-full mt-3 p-3 text-sm rounded-lg border text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none",
                                                    stepErrors[3]?.hotel_name ? "border-red-400" : "border-safari-200"
                                                )}
                                                value={formData.hotel_name || ''}
                                                onChange={(e) => updateField('hotel_name', e.target.value)}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {/* Pickup Location */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-semibold text-safari-600">Pickup Location</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Paste Google Maps link or type location"
                                                            className="w-full p-3 pr-9 text-sm rounded-lg border border-safari-200 text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none"
                                                            value={(formData as any).pickup_location || ''}
                                                            onChange={(e) => updateField('pickup_location' as any, e.target.value)}
                                                        />
                                                        <MapPin size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-safari-400" />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <a
                                                            href="https://www.google.com/maps/@7.8731,80.7718,9z"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary-600 hover:text-secondary-700 bg-secondary-50 hover:bg-secondary-100 px-2 py-1 rounded-md transition-colors"
                                                        >
                                                            <MapPin size={10} />
                                                            Pick on Maps
                                                        </a>
                                                        {(formData as any).pickup_location && (formData as any).pickup_location.includes('google.com/maps') && (
                                                            <a
                                                                href={(formData as any).pickup_location}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-600 hover:text-green-700"
                                                            >
                                                                <ExternalLink size={10} />
                                                                View on Maps
                                                            </a>
                                                        )}
                                                    </div>
                                                    {(formData as any).pickup_location && (formData as any).pickup_location.includes('google.com/maps') && (
                                                        <div className="rounded-lg overflow-hidden border border-safari-100">
                                                            <iframe
                                                                src={`https://maps.google.com/maps?q=${encodeURIComponent((formData as any).pickup_location)}&output=embed`}
                                                                width="100%"
                                                                height="120"
                                                                style={{ border: 0 }}
                                                                allowFullScreen
                                                                loading="lazy"
                                                                referrerPolicy="no-referrer-when-downgrade"
                                                                className="rounded-lg"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-lg font-semibold text-safari-900">Extra Hours</label>
                                    <div className="flex gap-4">
                                        {[0, 1, 2].map(hr => (
                                            <button
                                                key={hr}
                                                onClick={() => updateField('extra_hours', hr)}
                                                className={cn(
                                                    "flex-1 py-4 rounded-xl border font-semibold transition-all",
                                                    formData.extra_hours === hr ? "border-secondary-600 bg-secondary-50 text-secondary-800" : "border-safari-100 hover:border-safari-200 text-safari-900"
                                                )}
                                            >
                                                {hr === 0 ? 'Standard (3hrs)' : `+${hr} Hr`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-safari-900">Contact Details</h2>
                                {Object.keys(stepErrors[4] || {}).length > 0 && (
                                    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                        <ul className="list-disc list-inside space-y-0.5">
                                            {Object.values(stepErrors[4]!).map((msg, i) => (
                                                <li key={i}>{msg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className={cn(
                                                "w-full p-3 rounded-lg border text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none",
                                                stepErrors[4]?.customer_name ? "border-red-400" : "border-safari-200"
                                            )}
                                            value={formData.customer_name || ''}
                                            onChange={e => updateField('customer_name', e.target.value)}
                                        />
                                        {stepErrors[4]?.customer_name && (
                                            <p className="text-sm text-red-600 font-medium">{stepErrors[4].customer_name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            className={cn(
                                                "w-full p-3 rounded-lg border text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none",
                                                stepErrors[4]?.email ? "border-red-400" : "border-safari-200"
                                            )}
                                            value={formData.email || ''}
                                            onChange={e => updateField('email', e.target.value)}
                                        />
                                        {stepErrors[4]?.email && (
                                            <p className="text-sm text-red-600 font-medium">{stepErrors[4].email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-safari-700">Contact Number</label>
                                        <div className="flex gap-2">
                                            <div className="relative w-[100px]">
                                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-safari-900">
                                                    {COUNTRY_CODES.find(cc => cc.code === ((formData as any).country_code || '+94'))?.flag} {(formData as any).country_code || '+94'}
                                                </div>
                                                <select
                                                    value={(formData as any).country_code || '+94'}
                                                    onChange={(e) => updateField('country_code' as any, e.target.value)}
                                                    className="w-full p-3 text-sm rounded-lg border border-safari-200 focus:ring-2 focus:ring-secondary-500 outline-none text-transparent cursor-pointer appearance-none bg-white [color-scheme:light]"
                                                >
                                                    {COUNTRY_CODES.map((cc) => (
                                                        <option key={cc.code} value={cc.code} className="text-safari-900 bg-white">
                                                            {cc.flag} {cc.code} {cc.country}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                className={cn(
                                                    "flex-1 p-3 rounded-lg border text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none",
                                                    stepErrors[4]?.phone ? "border-red-400" : "border-safari-200"
                                                )}
                                                value={formData.phone || ''}
                                                onChange={e => updateField('phone', e.target.value)}
                                            />
                                        </div>
                                        {stepErrors[4]?.phone && (
                                            <p className="text-sm text-red-600 font-medium">{stepErrors[4].phone}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-safari-700">Passport Number</label>
                                        <input type="text" placeholder="e.g. N1234567" className="w-full p-3 rounded-lg border border-safari-200 text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none"
                                            value={(formData as any).passport_number || ''} onChange={e => updateField('passport_number' as any, e.target.value)} />
                                    </div>

                                    <textarea placeholder="Message (Optional)" className="p-3 rounded-lg border border-safari-200 text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none min-h-[100px]"
                                        value={formData.message || ''} onChange={e => updateField('message', e.target.value)} />
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-safari-900">Review & Submit</h2>
                                <div className="bg-safari-50 p-6 rounded-2xl space-y-3 text-sm text-safari-800">
                                    <div className="flex justify-between border-b pb-2 border-safari-200">
                                        <span className="text-safari-500">Destination</span>
                                        <span className="font-semibold">{selectedDest?.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2 border-safari-200">
                                        <span className="text-safari-500">Date & Time</span>
                                        <span className="font-semibold">{formData.date} at {formData.time}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2 border-safari-200">
                                        <span className="text-safari-500">Contact</span>
                                        <span className="font-semibold text-right">{formData.customer_name}<br />{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between pb-2">
                                        <span className="text-safari-500">Advance Payment</span>
                                        <span className="font-bold text-secondary-600">USD 8</span>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-safari-700 flex items-center gap-2">
                                        <Tag size={14} className="text-secondary-600" />
                                        Promo Code (Optional)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter promo code"
                                            className="flex-1 p-3 rounded-lg border border-safari-200 text-safari-900 placeholder:text-safari-500 focus:ring-2 focus:ring-secondary-500 outline-none uppercase tracking-wider font-semibold"
                                            value={(formData as any).promo_code || ''}
                                            onChange={(e) => {
                                                updateField('promo_code' as any, e.target.value.toUpperCase());
                                                if (discount) {
                                                    setDiscount(null);
                                                    setPromoMessage(null);
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleApplyPromo}
                                            disabled={validatingPromo || !(formData as any).promo_code?.trim() || !estimatedPrice}
                                            className="px-6 py-3 rounded-lg bg-safari-900 text-white font-bold hover:bg-safari-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shrink-0"
                                        >
                                            {validatingPromo ? <Loader2 className="animate-spin" size={18} /> : 'Apply'}
                                        </button>
                                    </div>
                                    {promoMessage && (
                                        <div className={`text-sm font-semibold flex items-center gap-2 ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                            {promoMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                            {promoMessage.text}
                                        </div>
                                    )}
                                </div>

                                {/* Non-refundable Notice */}
                                <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs text-red-800">
                                    <p className="flex items-start gap-2">
                                        <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                                        <span>
                                            <strong>Non-Refundable Advance:</strong> The advance payment of USD 8 is non-refundable. Remaining balance is paid at the destination.
                                        </span>
                                    </p>
                                </div>

                                <div className="bg-safari-50 border border-safari-200 p-4 rounded-xl text-sm text-safari-800">
                                    <p><strong>Entrance ticket:</strong> Paid separately by you at the park entrance gate. We only charge for the safari jeep; the remaining balance shown is for the jeep (pay at destination).</p>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-safari-100 md:relative md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:flex md:justify-between md:pt-4 z-30">
                        <div className="flex md:w-full items-center justify-between gap-4">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1 || isSubmitting}
                                className="px-6 py-4 md:py-3 rounded-full font-semibold text-safari-600 hover:bg-safari-100 disabled:opacity-50 disabled:invisible transition-all text-sm md:text-base"
                            >
                                Back
                            </button>

                            {/* Mobile Price Overlay */}
                            {estimatedPrice && (
                                <div className="md:hidden flex flex-col items-center">
                                    <span className="text-[10px] uppercase tracking-wider text-safari-400 font-bold">Estimated</span>
                                    <span className="text-lg font-bold text-secondary-600 leading-none">
                                        USD {lkrToUsd(discount ? Math.max(0, estimatedPrice.total - discount.amount) : estimatedPrice.total)}
                                    </span>
                                </div>
                            )}

                            <button
                                onClick={currentStep === 5 ? handleSubmit : handleNext}
                                disabled={isSubmitting}
                                className="px-8 py-4 md:py-3 rounded-full bg-secondary-600 text-white font-bold hover:bg-secondary-700 shadow-xl shadow-secondary-900/20 flex items-center justify-center gap-2 disabled:bg-safari-300 min-w-40 transition-transform active:scale-95 text-sm md:text-base"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : (currentStep === 5 ? 'Confirm' : 'Next Step')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-safari-100 sticky top-24">
                        <h3 className="text-lg font-bold text-safari-900 mb-4">Estimated Price</h3>
                        {estimatedPrice ? (
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-safari-500">Safari Jeep (x{Math.ceil((formData.group_size || 1) / 3)})</span>
                                    <span className="font-medium text-safari-900">USD {lkrToUsd(estimatedPrice.breakdown.vehicleCost)}</span>
                                </div>
                                {estimatedPrice.breakdown.extraCost > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-safari-500">Extra Hours</span>
                                        <span className="font-medium text-safari-900">USD {lkrToUsd(estimatedPrice.breakdown.extraCost)}</span>
                                    </div>
                                )}
                                {discount && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span className="text-safari-500">Promo ({discount.code})</span>
                                        <span className="font-medium">- USD {lkrToUsd(discount.amount)}</span>
                                    </div>
                                )}
                                <div className="border-t border-safari-100 pt-3 mt-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-safari-900 font-bold">Our charge (jeep)</span>
                                        <span className="text-2xl font-bold text-safari-900">
                                            USD {lkrToUsd(discount ? Math.max(0, estimatedPrice.total - discount.amount) : estimatedPrice.total)}
                                        </span>
                                    </div>
                                    {discount && (
                                        <span className="text-sm text-safari-400 line-through">USD {lkrToUsd(estimatedPrice.total)}</span>
                                    )}
                                    <p className="text-xs text-right text-safari-400 mt-1">Pay at destination</p>
                                </div>
                                <div className="border-t border-safari-100 pt-3 mt-3">
                                    <div className="text-xs text-safari-500 mb-1.5">For your information</div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-safari-500">Entrance ticket (approx.)</span>
                                        <span className="font-medium text-safari-900">USD {lkrToUsd(estimatedPrice.breakdown.ticketCost)}</span>
                                    </div>
                                    <p className="text-xs text-safari-500 mt-0.5">Paid separately at the park gate</p>
                                </div>
                                <div className="bg-safari-50 border border-safari-200 p-3 rounded-lg">
                                    <p className="text-xs text-safari-700 font-medium">
                                        Entrance tickets are paid separately at the park entrance for all safaris. We only charge for the safari jeep.
                                    </p>
                                </div>
                                <div className="border-t border-safari-100 pt-3 mt-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-safari-700 font-semibold">Advance Payment</span>
                                        <span className="font-bold text-safari-900">USD 8</span>
                                    </div>
                                    <p className="text-xs text-red-500 font-semibold mt-1">Non-refundable</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-safari-400 text-center py-4">Select details to see price</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
