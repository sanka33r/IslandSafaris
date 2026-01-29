import { Review } from '@/types/db';
import { Star } from 'lucide-react';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-safari-50 rounded-2xl border border-dashed border-safari-200">
                <p className="text-safari-500">No reviews yet. Be the first to share your experience!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-safari-100">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-safari-900">{review.name}</h4>
                        <div className="flex text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                            ))}
                        </div>
                    </div>
                    <p className="text-safari-600 text-sm leading-relaxed whitespace-pre-line">
                        &quot;{review.comment}&quot;
                    </p>
                    <p className="text-xs text-safari-300 mt-4 text-right">
                        {new Date(review.created_at).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
}
