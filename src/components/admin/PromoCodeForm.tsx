'use client';

import { useState } from 'react';
import { PromoCode } from '@/types/db';
import { createPromoCode, updatePromoCode } from '@/lib/actions/promo-codes';
import { Loader2, Save, X, AlertCircle } from 'lucide-react';

interface PromoCodeFormProps {
    initialData?: PromoCode;
    onClose: () => void;
    onSuccess: () => void;
}

const SCOPES = [
    { value: 'all', label: 'All Bookings' },
    { value: 'safari', label: 'Safaris (Destinations)' },
    { value: 'cooking-class', label: 'Cooking Class' },
    { value: 'village-tour', label: 'Village Tour' },
    { value: 'bicycle-rent', label: 'Bicycle Rent' },
];

export default function PromoCodeForm({ initialData, onClose, onSuccess }: PromoCodeFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<Partial<PromoCode>>({
        code: initialData?.code || '',
        type: initialData?.type || 'fixed',
        value: initialData?.value || 0,
        min_order_value: initialData?.min_order_value || 0,
        max_discount: initialData?.max_discount || null,
        start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
        end_date: initialData?.end_date ? new Date(initialData.end_date).toISOString().slice(0, 16) : '',
        usage_limit: initialData?.usage_limit || null,
        status: initialData?.status || 'active',
        applicable_scope: initialData?.applicable_scope || ['all'],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const payload: any = {
                ...formData,
                start_date: new Date(formData.start_date!).toISOString(),
                end_date: new Date(formData.end_date!).toISOString(),
            };

            let result;
            if (initialData) {
                result = await updatePromoCode(initialData.id, payload);
            } else {
                result = await createPromoCode(payload);
            }

            if (!result.success) {
                throw new Error(result.message);
            }

            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const toggleScope = (scope: string) => {
        const currentscopes = formData.applicable_scope || [];
        let newScopes: string[];

        if (scope === 'all') {
            // If selecting 'all', clear others
            newScopes = ['all'];
        } else {
            // If selecting others, remove 'all' if present
            const withoutAll = currentscopes.filter(s => s !== 'all');
            if (currentscopes.includes(scope)) {
                newScopes = withoutAll.filter(s => s !== scope);
            } else {
                newScopes = [...withoutAll, scope];
            }
        }

        if (newScopes.length === 0) newScopes = ['all'];
        setFormData({ ...formData, applicable_scope: newScopes });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-safari-100 flex items-center justify-between bg-safari-50">
                <h2 className="text-xl font-bold text-safari-900">
                    {initialData ? 'Edit Promo Code' : 'Create New Promo Code'}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-safari-200 rounded-full transition-colors text-safari-500">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">Code</label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase().replace(/\s/g, '') })}
                            className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none font-mono uppercase font-bold tracking-wider"
                            placeholder="SUMMER2024"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                            className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">Discount Type</label>
                        <div className="flex bg-safari-50 p-1 rounded-xl border border-safari-200">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'fixed' })}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.type === 'fixed'
                                        ? 'bg-white shadow text-secondary-600'
                                        : 'text-safari-500 hover:text-safari-700'
                                    }`}
                            >
                                Fixed Amount ($)
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, type: 'percentage' })}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.type === 'percentage'
                                        ? 'bg-white shadow text-secondary-600'
                                        : 'text-safari-500 hover:text-safari-700'
                                    }`}
                            >
                                Percentage (%)
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">
                            {formData.type === 'fixed' ? 'Discount Amount ($)' : 'Discount Percentage (%)'}
                        </label>
                        <input
                            type="number"
                            min="0"
                            step={formData.type === 'fixed' ? '0.01' : '1'}
                            max={formData.type === 'percentage' ? '100' : undefined}
                            value={formData.value}
                            onChange={e => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                            className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none"
                            required
                        />
                    </div>

                    {formData.type === 'percentage' && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-safari-700">Max Discount Limit ($)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.max_discount || ''}
                                onChange={e => setFormData({ ...formData, max_discount: e.target.value ? parseFloat(e.target.value) : null })}
                                placeholder="Optional (e.g. 50.00)"
                                className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">Min Order Value ($)</label>
                        <input
                            type="number"
                            min="0"
                            value={formData.min_order_value}
                            onChange={e => setFormData({ ...formData, min_order_value: parseFloat(e.target.value) })}
                            className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">Usage Limit</label>
                        <input
                            type="number"
                            min="1"
                            value={formData.usage_limit || ''}
                            onChange={e => setFormData({ ...formData, usage_limit: e.target.value ? parseInt(e.target.value) : null })}
                            placeholder="Unlimited"
                            className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">Start Date</label>
                        <input
                            type="datetime-local"
                            value={formData.start_date}
                            onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                            className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-safari-700">End Date</label>
                        <input
                            type="datetime-local"
                            value={formData.end_date}
                            onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                            className="w-full p-3 bg-safari-50 border border-safari-200 rounded-xl focus:ring-2 focus:ring-secondary-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold text-safari-700 block">Applicable Scope</label>
                    <div className="flex flex-wrap gap-2">
                        {SCOPES.map(scope => {
                            const isSelected = formData.applicable_scope?.includes(scope.value);
                            return (
                                <button
                                    key={scope.value}
                                    type="button"
                                    onClick={() => toggleScope(scope.value)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${isSelected
                                            ? 'bg-secondary-600 border-secondary-600 text-white shadow-md'
                                            : 'bg-white border-safari-200 text-safari-600 hover:bg-safari-50'
                                        }`}
                                >
                                    {scope.label}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-xs text-safari-500">
                        Select which bookings this code applies to. Selecting "All Bookings" will override specific selections.
                    </p>
                </div>

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-safari-600 bg-white border border-safari-200 hover:bg-safari-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-secondary-600 hover:bg-secondary-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Promo Code
                    </button>
                </div>
            </form>
        </div>
    );
}
