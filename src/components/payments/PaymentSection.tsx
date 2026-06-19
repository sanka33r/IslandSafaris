'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PayPalButton from './PayPalButton';
import PayHereButton from './PayHereButton';

interface PaymentSectionProps {
    bookingId: string;
    amount: number;
    alreadyPaid: boolean;
    /** Called after any payment method successfully completes. */
    onPaymentSuccess?: () => void;
}

export default function PaymentSection({ bookingId, amount, alreadyPaid, onPaymentSuccess }: PaymentSectionProps) {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'payhere'>('paypal');

    const handlePaymentSuccess = () => {
        if (onPaymentSuccess) {
            onPaymentSuccess();
        } else {
            router.refresh();
        }
    };

    return (
        <div className="bg-secondary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-secondary-100 mb-6 sm:mb-8">
            <h3 className="text-xl font-bold text-safari-900 mb-4">Payment Information</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-secondary-200">
                    <span className="text-safari-700">Advance Payment</span>
                    <span className="text-2xl font-bold text-secondary-600">
                        USD {amount}
                    </span>
                </div>

                {alreadyPaid ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <span className="text-green-600 font-semibold">✓ Advance payment received</span>
                    </div>
                ) : (
                    <>
                        <div>
                            <p className="text-sm font-semibold text-safari-700 mb-3">Choose your payment method:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`rounded-xl border-2 p-4 text-left transition-all ${paymentMethod === 'paypal'
                                        ? 'border-secondary-600 bg-white shadow-sm'
                                        : 'border-secondary-100 bg-secondary-50 hover:border-secondary-200'
                                        }`}
                                >
                                    <span className="block font-bold text-safari-900">PayPal</span>
                                    <span className="text-xs text-safari-500">Pay with PayPal or card through PayPal.</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('payhere')}
                                    className={`rounded-xl border-2 p-4 text-left transition-all ${paymentMethod === 'payhere'
                                        ? 'border-secondary-600 bg-white shadow-sm'
                                        : 'border-secondary-100 bg-secondary-50 hover:border-secondary-200'
                                        }`}
                                >
                                    <span className="block font-bold text-safari-900">PayHere</span>
                                    <span className="text-xs text-safari-500">Pay securely using the PayHere onsite checkout.</span>
                                </button>
                            </div>
                        </div>

                        {paymentMethod === 'paypal' ? (
                            <PayPalButton
                                bookingId={bookingId}
                                amount={amount}
                                onSuccess={handlePaymentSuccess}
                                className="min-h-[45px]"
                            />
                        ) : (
                            <PayHereButton
                                bookingId={bookingId}
                                onSuccess={handlePaymentSuccess}
                                className="min-h-[45px]"
                            />
                        )}
                        <p className="text-xs text-safari-500 mt-2">
                            Remaining balance to be paid on the day of your experience.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
