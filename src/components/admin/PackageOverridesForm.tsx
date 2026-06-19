'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import { updatePackageOverride } from '@/lib/actions/admin';
import type { PackageSlug, PackageWithOverrides } from '@/lib/packages';

interface PackageOverridesFormProps {
    packages: Array<Pick<PackageWithOverrides, 'slug' | 'title' | 'price' | 'visible'>>;
}

export default function PackageOverridesForm({ packages }: PackageOverridesFormProps) {
    const router = useRouter();
    const [loadingSlug, setLoadingSlug] = useState<PackageSlug | null>(null);
    const [values, setValues] = useState<Partial<Record<PackageSlug, { price: string; visible: boolean }>>>(
        () =>
            Object.fromEntries(
                packages.map((pkg) => [
                    pkg.slug,
                    {
                        price: pkg.price.toString(),
                        visible: pkg.visible,
                    },
                ])
            ) as Partial<Record<PackageSlug, { price: string; visible: boolean }>>
    );
    const [messages, setMessages] = useState<Partial<Record<PackageSlug, string>>>({});

    const onSave = async (slug: PackageSlug) => {
        const fallback = packages.find((pkg) => pkg.slug === slug);
        if (!fallback) {
            setMessages((prev) => ({ ...prev, [slug]: 'Package not found.' }));
            return;
        }
        const current = values[slug] ?? { price: fallback.price.toString(), visible: fallback.visible };
        const parsedPrice = Number(current.price);
        if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
            setMessages((prev) => ({ ...prev, [slug]: 'Enter a valid price >= 0.' }));
            return;
        }

        setLoadingSlug(slug);
        setMessages((prev) => ({ ...prev, [slug]: '' }));
        const result = await updatePackageOverride(slug, {
            price: parsedPrice,
            visible: current.visible,
        });
        setLoadingSlug(null);

        if (!result.success) {
            setMessages((prev) => ({ ...prev, [slug]: result.message ?? 'Failed to save changes.' }));
            return;
        }

        setMessages((prev) => ({ ...prev, [slug]: 'Saved.' }));
        router.refresh();
    };

    return (
        <div className="space-y-4">
            {packages.map((pkg) => {
                const entry = values[pkg.slug] ?? { price: pkg.price.toString(), visible: pkg.visible };
                const isSaving = loadingSlug === pkg.slug;
                return (
                    <div key={pkg.slug} className="bg-white rounded-3xl p-6 border border-safari-100 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-safari-900">{pkg.title}</h3>
                                <p className="text-safari-500 text-sm">/{pkg.slug}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => onSave(pkg.slug)}
                                disabled={isSaving}
                                className="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 disabled:bg-secondary-400 text-white px-4 py-2.5 rounded-xl font-bold transition-all"
                            >
                                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Save
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                            <label className="space-y-2">
                                <span className="text-sm font-bold text-safari-700">Price (USD / person)</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={entry.price}
                                    onChange={(e) =>
                                        setValues((prev) => ({
                                            ...prev,
                                            [pkg.slug]: {
                                                ...(prev[pkg.slug] ?? { price: pkg.price.toString(), visible: pkg.visible }),
                                                price: e.target.value,
                                            },
                                        }))
                                    }
                                    className="w-full p-3 bg-safari-50 text-black rounded-xl border border-safari-100 focus:border-secondary-500 outline-none transition-all"
                                />
                            </label>

                            <label className="space-y-2">
                                <span className="text-sm font-bold text-safari-700">Visibility</span>
                                <div className="flex items-center justify-between bg-safari-50 border border-safari-100 rounded-xl px-4 py-3">
                                    <span className="text-safari-700 font-medium">
                                        {entry.visible ? 'Visible on public pages' : 'Hidden from public pages'}
                                    </span>
                                    <input
                                        type="checkbox"
                                        checked={entry.visible}
                                        onChange={(e) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                [pkg.slug]: {
                                                    ...(prev[pkg.slug] ?? { price: pkg.price.toString(), visible: pkg.visible }),
                                                    visible: e.target.checked,
                                                },
                                            }))
                                        }
                                        className="h-5 w-5 accent-secondary-600"
                                    />
                                </div>
                            </label>
                        </div>

                        {messages[pkg.slug] ? (
                            <p className="mt-3 text-sm text-safari-600">{messages[pkg.slug]}</p>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
