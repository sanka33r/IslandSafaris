'use client';

import { Review } from '@/types/db';
import { Star } from 'lucide-react';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
    const shouldAnimate = reviews.length > 2;
    const displayReviews = shouldAnimate ? [...reviews, ...reviews] : reviews;
    const placeholderCards = Array.from({ length: 3 }, (_, index) => (
        <div
            key={`placeholder-${index}`}
            className="w-[min(85vw,280px)] sm:w-[280px] flex-shrink-0 self-start bg-white p-6 rounded-2xl shadow-sm border border-safari-100 animate-pulse"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-24 rounded bg-safari-100" />
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                        <div key={starIndex} className="h-4 w-4 rounded-full bg-safari-100" />
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 w-full rounded bg-safari-100" />
                <div className="h-3 w-5/6 rounded bg-safari-100" />
                <div className="h-3 w-3/4 rounded bg-safari-100" />
            </div>
        </div>
    ));

    return (
        <div className="overflow-hidden">
            <div className={`flex w-max gap-6 pr-6 ${shouldAnimate ? 'motion-safe:animate-[scroll_28s_linear_infinite] hover:[animation-play-state:paused]' : ''}`}>
                {reviews.length === 0 ? placeholderCards : displayReviews.map((review, index) => (
                    <div
                        key={`${review.id}-${index}`}
                        className="w-[min(85vw,280px)] sm:w-[280px] flex-shrink-0 self-start bg-white p-6 rounded-2xl shadow-sm border border-safari-100"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-safari-900">{review.name}</h4>
                            <div className="flex text-yellow-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} stroke="currentColor" />
                                ))}
                            </div>
                        </div>
                        <p className="text-safari-600 text-sm leading-relaxed whitespace-pre-line">
                            &quot;{review.comment}&quot;
                        </p>
                    </div>
                ))}
            </div>

            {shouldAnimate && (
                <style jsx>{`
                    @keyframes scroll {
                        from {
                            transform: translateX(0);
                        }
                        to {
                            transform: translateX(-50%);
                        }
                    }
                `}</style>
            )}
        </div>
    );
}
