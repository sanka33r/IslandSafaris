'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

interface PayPalButtonProps {
    bookingId: string;
    amount: number;
    currency?: string;
    onSuccess?: () => void;
    onError?: (message: string) => void;
    disabled?: boolean;
    className?: string;
}

declare global {
    interface Window {
        paypal?: {
            Buttons: (config: {
                createOrder: (data: unknown, actions: unknown) => Promise<string>;
                onApprove: (data: { orderID: string }, actions: unknown) => Promise<void>;
                onError?: (err: Error) => void;
                style?: { color?: string; shape?: string; label?: string };
            }) => { render: (selector: string | HTMLElement) => Promise<void>; isEligible: () => boolean };
        };
    }
}

export default function PayPalButton({
    bookingId,
    amount,
    onSuccess,
    onError,
    disabled,
    className = '',
}: PayPalButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryToken, setRetryToken] = useState(0);

    const handleRetry = () => {
        renderedRef.current = false;
        setError(null);
        setLoading(true);
        setRetryToken((t) => t + 1);
    };

    // Never show raw API/JSON errors to users; show a safe fallback
    const safeErrorMessage = (msg: string): string => {
        if (!msg || msg.length > 200) return 'Payment is temporarily unavailable. Please try again or contact us.';
        if (/^\s*\{[\s\S]*\}\s*$/.test(msg) || msg.includes('"debug_id"') || msg.includes('UNPROCESSABLE_ENTITY')) {
            return 'Payment is temporarily unavailable. Please try again or contact us.';
        }
        return msg;
    };

    // Track whether buttons have been rendered to prevent double-initialization
    // (React StrictMode fires effects twice in development)
    const renderedRef = useRef(false);
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    const loadScript = useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (window.paypal) {
                resolve();
                return;
            }
            // Check if script is already being loaded
            const existing = document.querySelector(
                `script[src*="paypal.com/sdk/js"]`
            );
            if (existing) {
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', () =>
                    reject(new Error('Failed to load PayPal SDK'))
                );
                return;
            }
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
            document.body.appendChild(script);
        });
    }, [clientId]);

    useEffect(() => {
        if (!clientId || paid || disabled) {
            setLoading(false);
            return;
        }

        // Prevent double-render from React StrictMode
        if (renderedRef.current) {
            setLoading(false);
            return;
        }

        let cancelled = false;

        loadScript()
            .then(() => {
                if (cancelled || !window.paypal || !containerRef.current) return;

                // Mark as rendered before calling render() to prevent
                // a second effect invocation from re-rendering
                renderedRef.current = true;

                window.paypal
                    .Buttons({
                        style: { color: 'gold', shape: 'rect', label: 'paypal' },
                        createOrder: async () => {
                            const res = await fetch('/api/paypal/create-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ bookingId }),
                            });
                            const data = await res.json();
                            if (!res.ok) {
                                const userMsg = safeErrorMessage(data.error || 'Failed to create order');
                                throw new Error(userMsg);
                            }
                            return data.orderId;
                        },
                        onApprove: async (data: { orderID: string }) => {
                            const res = await fetch('/api/paypal/capture-order', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ orderId: data.orderID, bookingId }),
                            });
                            const result = await res.json();
                            if (!res.ok) {
                                const userMsg = safeErrorMessage(result.error || 'Payment failed');
                                onError?.(userMsg);
                                setError(userMsg);
                                return;
                            }
                            setPaid(true);
                            onSuccess?.();
                        },
                        onError: (err: Error) => {
                            const msg = safeErrorMessage(err?.message || 'PayPal error');
                            setError(msg);
                            onError?.(msg);
                        },
                    })
                    .render(containerRef.current)
                    .catch((err) => {
                        // Swallow "zoid destroyed" errors — they are harmless
                        // teardown artefacts from StrictMode double-mount
                        if (!cancelled) {
                            const msg: string = err?.message ?? '';
                            if (!msg.toLowerCase().includes('zoid')) {
                                setError(safeErrorMessage(msg || 'Could not load PayPal'));
                            }
                        }
                    })
                    .finally(() => {
                        if (!cancelled) setLoading(false);
                    });
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(safeErrorMessage(err?.message || 'PayPal not available'));
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
            // Reset rendered flag only if component fully unmounts
            // (in StrictMode this runs between the two mount cycles)
            renderedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId, bookingId, paid, disabled, retryToken]);

    if (!clientId) {
        return (
            <p className="text-sm text-safari-500">
                PayPal is not configured. Set NEXT_PUBLIC_PAYPAL_CLIENT_ID.
            </p>
        );
    }

    if (paid) {
        return (
            <div className={`flex items-center gap-2 text-green-600 font-semibold ${className}`}>
                <CheckCircle size={20} />
                Payment completed
            </div>
        );
    }

    if (error) {
        return (
            <div className={className}>
                <p className="text-sm text-red-600 mb-2">{error}</p>
                <button
                    type="button"
                    onClick={handleRetry}
                    className="w-full rounded-lg border-2 border-safari-200 bg-white px-5 py-3 font-bold text-safari-900 transition-colors hover:border-secondary-400 hover:bg-secondary-50"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className={className}>
            {loading && (
                <div className="flex items-center gap-2 text-safari-600 mb-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-sm">Loading PayPal…</span>
                </div>
            )}
            <div ref={containerRef} />
        </div>
    );
}
