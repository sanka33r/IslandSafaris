'use client';

import { useState } from 'react';
import { moderateReview } from '@/lib/actions/admin';
import { Loader2, Check, Trash2, Star, User, MapPin, Calendar, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ReviewCard({ review, readOnly = false }: { review: any, readOnly?: boolean }) {
    const [loading, setLoading] = useState(false);

    const handleModerate = async (approve: boolean) => {
        if (confirm(approve ? "Approve this review?" : "Delete this review permanently?")) {
            setLoading(true);
            await moderateReview(review.id, approve);
            setLoading(false);
        }
    };

    return (
        <div className={cn(
            "bg-white rounded-3xl p-6 shadow-sm border border-safari-100 space-y-4",
            readOnly && "opacity-80"
        )}>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-safari-50 rounded-full flex items-center justify-center text-safari-400">
                        <User size={20} />
                    </div>
                    <div>
                        <div className="font-bold text-safari-900">{review.name}</div>
                        <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                            ))}
                        </div>
                    </div>
                </div>
                {readOnly && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full uppercase tracking-wider">
                        Approved
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-base py-3 border-y border-safari-50">
                <div className="flex items-center gap-1.5 text-safari-600">
                    <MapPin size={14} className="text-secondary-500" />
                    <span className="font-medium truncate">{review.destinations?.name || 'General'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-safari-400">
                    <Calendar size={14} />
                    <span>{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="relative">
                <Quote size={16} className="text-safari-100 absolute -left-1 -top-1" />
                <p className="text-base text-safari-600 pl-4 leading-relaxed line-clamp-4">
                    {review.comment}
                </p>
            </div>

            {!readOnly && (
                <div className="pt-2 flex gap-2">
                    <button
                        onClick={() => handleModerate(true)}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 font-bold transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={18} />}
                        Approve
                    </button>
                    <button
                        onClick={() => handleModerate(false)}
                        disabled={loading}
                        className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all disabled:opacity-50"
                        title="Reject/Delete"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
