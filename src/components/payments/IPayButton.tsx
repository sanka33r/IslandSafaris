'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface IPayButtonProps {
    bookingId: string;
    disabled?: boolean;
    onError?: (message: string) => void;
    className?: string;
}

const GENERIC_ERROR = 'iPay is temporarily unavailable. Please try again or contact us.';

/**
 * iPay uses a form-POST redirect: the customer leaves the site to pay on the
 * iPay gateway page and is redirected back to the booking confirmation page,
 * which reads the payment status (updated by /api/ipay/callback) from the DB.
 */
export default function IPayButton({ bookingId, disabled, onError, className = '' }: IPayButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startPayment = async () => {
        if (disabled || loading) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/ipay/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId }),
            });
            const payment = await res.json();

            if (!res.ok) {
                throw new Error(payment.error || GENERIC_ERROR);
            }

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = payment.action;

            for (const [name, value] of Object.entries(payment.fields as Record<string, string>)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            // Keep the button in its loading state while the browser navigates away.
        } catch (err) {
            const safeMessage = err instanceof Error && err.message ? err.message : GENERIC_ERROR;
            setLoading(false);
            setError(safeMessage);
            onError?.(safeMessage);
        }
    };

    return (
        <div className={className}>
            <button
                type="button"
                onClick={startPayment}
                disabled={disabled || loading}
                className="w-full rounded-lg bg-[#0d7bc4] px-5 py-3 font-bold text-white transition-colors hover:bg-[#0a639e] disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Redirecting to iPay...
                    </>
                ) : (
                    'Pay with iPay'
                )}
            </button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}
