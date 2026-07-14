'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ConfirmDialogTextarea {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    required?: boolean;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'default',
    loading = false,
    textarea,
    onConfirm,
    onCancel,
}: {
    open: boolean;
    title: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'default' | 'danger';
    loading?: boolean;
    textarea?: ConfirmDialogTextarea;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    if (!open) return null;

    const confirmDisabled = loading || (textarea?.required && !textarea.value.trim());

    return (
        <div
            className="fixed inset-0 z-70 flex items-center justify-center p-4"
            onClick={(e) => { e.stopPropagation(); onCancel(); }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl border border-safari-100 max-w-sm w-full p-5"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-bold text-safari-900 mb-2">{title}</h3>
                {message && <p className="text-base text-safari-600 mb-4">{message}</p>}

                {textarea && (
                    <div className="mb-4">
                        {textarea.label && (
                            <label className="text-sm font-bold text-safari-500 uppercase">{textarea.label}</label>
                        )}
                        <textarea
                            autoFocus
                            value={textarea.value}
                            onChange={(e) => textarea.onChange(e.target.value)}
                            placeholder={textarea.placeholder}
                            rows={3}
                            className="mt-1 w-full rounded-lg border border-safari-200 bg-white p-2.5 text-base text-safari-900 focus:outline-none focus:ring-2 focus:ring-safari-300"
                        />
                        {textarea.helperText && (
                            <p className="text-sm text-safari-500 mt-1">{textarea.helperText}</p>
                        )}
                    </div>
                )}

                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl border border-safari-200 text-safari-600 hover:bg-safari-50 font-bold transition-all disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={confirmDisabled}
                        className={cn(
                            'px-4 py-2 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2',
                            variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-green-600 text-white hover:bg-green-700'
                        )}
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
