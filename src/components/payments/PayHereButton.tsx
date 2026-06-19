'use client';

import { useCallback, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

type PayHerePayment = Record<string, string | boolean | undefined>;

interface PayHereButtonProps {
    bookingId: string;
    onSuccess?: () => void;
    onError?: (message: string) => void;
    disabled?: boolean;
    className?: string;
}

declare global {
    interface Window {
        payhere?: {
            startPayment: (payment: PayHerePayment) => void;
            onCompleted?: (orderId: string) => void;
            onDismissed?: () => void;
            onError?: (error: string) => void;
        };
    }
}

const GENERIC_ERROR = 'PayHere is temporarily unavailable. Please try again or contact us.';

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function PayHereButton({
    bookingId,
    onSuccess,
    onError,
    disabled,
    className = '',
}: PayHereButtonProps) {
    const [loading, setLoading] = useState(false);
    const [paid, setPaid] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadScript = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (window.payhere) {
                resolve();
                return;
            }

            const existing = document.querySelector('script[src="https://www.payhere.lk/lib/payhere.js"]');
            if (existing) {
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', () => reject(new Error('Failed to load PayHere SDK')));
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://www.payhere.lk/lib/payhere.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load PayHere SDK'));
            document.body.appendChild(script);
        });
    }, []);

    const checkPaymentStatus = useCallback(async () => {
        for (let attempt = 0; attempt < 6; attempt += 1) {
            const res = await fetch(`/api/payhere/status?bookingId=${encodeURIComponent(bookingId)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.paid) return true;
            }
            await wait(1500);
        }
        return false;
    }, [bookingId]);

    const startPayment = async () => {
        if (disabled || loading || paid) return;

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            await loadScript();
            if (!window.payhere) {
                throw new Error('PayHere SDK unavailable');
            }

            const res = await fetch('/api/payhere/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId }),
            });
            const payment = await res.json();

            if (!res.ok) {
                throw new Error(payment.error || GENERIC_ERROR);
            }

            window.payhere.onCompleted = async () => {
                setMessage('Payment received. Verifying with PayHere...');
                const isPaid = await checkPaymentStatus();
                setLoading(false);

                if (isPaid) {
                    setPaid(true);
                    onSuccess?.();
                    return;
                }

                setMessage('Payment is still being verified. Please refresh in a moment or contact us if this continues.');
            };

            window.payhere.onDismissed = () => {
                setLoading(false);
                setMessage('Payment window closed before completion.');
            };

            window.payhere.onError = (payhereError: string) => {
                const safeMessage = payhereError || GENERIC_ERROR;
                setLoading(false);
                setError(safeMessage);
                onError?.(safeMessage);
            };

            window.payhere.startPayment(payment);
        } catch (err) {
            const safeMessage = err instanceof Error && err.message ? err.message : GENERIC_ERROR;
            setLoading(false);
            setError(safeMessage);
            onError?.(safeMessage);
        }
    };

    if (paid) {
        return (
            <div className={`flex items-center gap-2 text-green-600 font-semibold ${className}`}>
                <CheckCircle size={20} />
                Payment completed
            </div>
        );
    }

    return (
        <div className={className}>
            <button
                type="button"
                onClick={startPayment}
                disabled={disabled || loading}
                className="w-full rounded-lg bg-[#1f4aa8] px-5 py-3 font-bold text-white transition-colors hover:bg-[#183b86] disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Opening PayHere...
                    </>
                ) : (
                    'Pay with PayHere'
                )}
            </button>
            {message && <p className="mt-2 text-sm text-safari-600">{message}</p>}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}
