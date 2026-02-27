'use client';

import { useState } from 'react';
import { updateExtraHourPriceUsd } from '@/lib/settings';
import { Clock, Save, Loader2 } from 'lucide-react';

interface SettingsFormProps {
    initialExtraHourPriceUsd: number;
}

export default function SettingsForm({ initialExtraHourPriceUsd }: SettingsFormProps) {
    const [extraHourPrice, setExtraHourPrice] = useState(String(initialExtraHourPriceUsd));
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const value = Number.parseFloat(extraHourPrice);
        if (!Number.isFinite(value) || value < 0) {
            setMessage({ type: 'error', text: 'Please enter a valid amount (0 or more).' });
            return;
        }
        setSaving(true);
        setMessage(null);
        const { error } = await updateExtraHourPriceUsd(value);
        setSaving(false);
        if (error) {
            setMessage({ type: 'error', text: error });
            return;
        }
        setMessage({ type: 'success', text: 'Extra hour charge saved.' });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-safari-100 overflow-hidden max-w-xl">
            <div className="p-6 border-b border-safari-100">
                <h2 className="text-lg font-bold text-safari-900 flex items-center gap-2">
                    <Clock className="text-safari-500" size={20} />
                    Safari pricing
                </h2>
                <p className="text-safari-500 text-sm mt-1">
                    Set the charge per extra hour per jeep (USD). Used when customers add extra hours to a safari booking.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label htmlFor="extra_hour_price" className="block text-sm font-semibold text-safari-700 mb-1">
                        Extra hour charge (USD per hour per jeep)
                    </label>
                    <input
                        id="extra_hour_price"
                        type="number"
                        min={0}
                        step={0.01}
                        value={extraHourPrice}
                        onChange={(e) => setExtraHourPrice(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-safari-200 text-safari-900 focus:ring-2 focus:ring-safari-500 focus:border-safari-500"
                    />
                </div>
                {message && (
                    <p className={message.type === 'success' ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
                        {message.text}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-safari-600 text-white font-semibold rounded-xl hover:bg-safari-700 disabled:opacity-50"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {saving ? 'Saving…' : 'Save'}
                </button>
            </form>
        </div>
    );
}
