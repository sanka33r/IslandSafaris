'use client';

import { useState } from 'react';
import { moderateReview } from '@/lib/actions/admin';
import { Loader2, Check, Trash2, Star } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReviewRow({ review, readOnly = false }: { review: any, readOnly?: boolean }) {
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleModerate = async (approve: boolean) => {
        if (confirm(approve ? "Approve this review?" : "Delete this review permanently?")) {
            setLoading(true);
            const result = await moderateReview(review.id, approve);
            setLoading(false);

            if (result.success && !approve) {
                setDeleted(true);
            }
        }
    };

    if (deleted) {
        return null;
    }

    return (
        <tr className="hover:bg-safari-50/50 transition-colors">
            <td className="p-4">
                <div className="font-semibold text-safari-900">{review.name}</div>
                <div className="text-base text-safari-400">{new Date(review.created_at).toLocaleDateString()}</div>
            </td>
            <td className="p-4 text-safari-800">{review.destinations?.name || 'General'}</td>
            <td className="p-4">
                <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                    ))}
                </div>
            </td>
            <td className="p-4 text-safari-600 line-clamp-2 md:line-clamp-none">
                {review.comment}
            </td>
            <td className="p-4">
                {readOnly ? (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleModerate(false)}
                            disabled={loading}
                            className="px-3 py-1 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-base font-semibold flex items-center gap-1"
                        >
                            {loading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                            Delete
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleModerate(true)}
                            disabled={loading}
                            className="px-3 py-1 rounded bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 text-base font-semibold flex items-center gap-1"
                        >
                            {loading ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                            Approve
                        </button>
                        <button
                            onClick={() => handleModerate(false)}
                            disabled={loading}
                            className="p-1.5 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                            title="Reject/Delete"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
