'use client';

import { useState } from 'react';
import { submitReview } from '@/lib/actions/reviews';
import { Star, Loader2 } from 'lucide-react';

export default function ReviewForm({ destinationId }: { destinationId?: string }) {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        const res = await submitReview(destinationId, formData);
        setIsSubmitting(false);

        if (res.success) {
            setSuccess(true);
        } else {
            alert('Failed to submit review. Please try again.');
        }
    }

    if (success) {
        return (
            <div className="bg-green-50 p-8 rounded-2xl text-center border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">Your review has been submitted and is pending moderation.</p>
                <button onClick={() => setSuccess(false)} className="mt-4 text-sm text-green-600 underline">Submit another</button>
            </div>
        );
    }

    return (
        <form action={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-safari-100">
            <h3 className="text-2xl font-bold text-safari-900 mb-6 font-display">Write a Review</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-safari-700 mb-2">Your Rating</label>
                    <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                        {Array.from({ length: 5 }).map((_, i) => {
                            const starValue = i + 1;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHoverRating(starValue)}
                                    className="text-yellow-400 focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={28}
                                        fill={(hoverRating || rating) >= starValue ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    />
                                </button>
                            );
                        })}
                    </div>
                    <input type="hidden" name="rating" value={rating} />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-safari-700 mb-2">Name</label>
                    <input
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full p-3 rounded-xl border border-safari-200 focus:ring-2 focus:ring-secondary-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-safari-700 mb-2">Experience</label>
                    <textarea
                        name="comment"
                        required
                        rows={4}
                        placeholder="Tell us about your safari..."
                        className="w-full p-3 rounded-xl border border-safari-200 focus:ring-2 focus:ring-secondary-500 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-safari-800 text-white rounded-xl font-bold hover:bg-safari-900 transition-colors flex justify-center items-center gap-2"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Review'}
                </button>
            </div>
        </form>
    );
}
