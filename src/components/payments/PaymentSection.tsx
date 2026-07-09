'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import PayPalButton from './PayPalButton';
import IPayButton from './IPayButton';

interface PaymentSectionProps {
    bookingId: string;
    amount: number;
    alreadyPaid: boolean;
    /** Called after any payment method successfully completes. */
    onPaymentSuccess?: () => void;
}

const METHODS = [
    {
        id: 'paypal' as const,
        name: 'PayPal',
        description: 'PayPal balance or credit / debit card',
        badge: 'Recommended',
    },
    {
        id: 'ipay' as const,
        name: 'iPay',
        description: 'Cards, iPay app & LankaQR',
        badge: null,
    },
];

export default function PaymentSection({ bookingId, amount, alreadyPaid, onPaymentSuccess }: PaymentSectionProps) {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'ipay'>('paypal');

    const handlePaymentSuccess = () => {
        if (onPaymentSuccess) {
            onPaymentSuccess();
        } else {
            router.refresh();
        }
    };

    return (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-safari-900">Payment</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-safari-500">
                    <Lock size={13} className="text-green-600" />
                    Secure checkout
                </span>
            </div>

            <div className="space-y-5">
                <div className="flex justify-between items-center rounded-xl bg-secondary-50 border border-secondary-100 px-4 py-3">
                    <span className="text-safari-700 font-medium">Advance payment</span>
                    <span className="text-2xl font-bold text-secondary-600">
                        USD {amount}
                    </span>
                </div>

                {alreadyPaid ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <CheckCircle size={20} className="text-green-600 shrink-0" />
                        <span className="text-green-700 font-semibold">Advance payment received</span>
                    </div>
                ) : (
                    <>
                        <fieldset>
                            <legend className="text-sm font-semibold text-safari-700 mb-3">Pay with</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {METHODS.map((method) => {
                                    const selected = paymentMethod === method.id;
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setPaymentMethod(method.id)}
                                            aria-pressed={selected}
                                            className={cn(
                                                'relative rounded-xl border-2 p-4 text-left transition-all duration-200',
                                                selected
                                                    ? 'border-secondary-600 bg-secondary-50/60 shadow-sm'
                                                    : 'border-safari-100 bg-white hover:border-safari-300'
                                            )}
                                        >
                                            <span className="flex items-start gap-3">
                                                {/* Radio indicator */}
                                                <span
                                                    className={cn(
                                                        'mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors',
                                                        selected ? 'border-secondary-600' : 'border-safari-300'
                                                    )}
                                                >
                                                    {selected && <span className="h-2.5 w-2.5 rounded-full bg-secondary-600" />}
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="flex items-center gap-2">
                                                        <span className="font-bold text-safari-900">{method.name}</span>
                                                        {method.badge && (
                                                            <span className="text-[10px] font-bold uppercase tracking-wide text-secondary-700 bg-secondary-100 px-2 py-0.5 rounded-full">
                                                                {method.badge}
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="block text-xs text-safari-500 mt-0.5">{method.description}</span>
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </fieldset>

                        {paymentMethod === 'paypal' && (
                            <PayPalButton
                                bookingId={bookingId}
                                amount={amount}
                                onSuccess={handlePaymentSuccess}
                                className="min-h-[45px]"
                            />
                        )}
                        {paymentMethod === 'ipay' && (
                            <IPayButton
                                bookingId={bookingId}
                                className="min-h-[45px]"
                            />
                        )}
                        <p className="text-xs text-safari-500">
                            Remaining balance is paid on the day of your experience. You&apos;ll get an email confirmation right after payment.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
