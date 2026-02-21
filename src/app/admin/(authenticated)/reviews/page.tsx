import { supabaseAdmin } from '@/lib/supabase';
import ReviewRow from '@/components/admin/ReviewRow';
import ReviewCard from '@/components/admin/ReviewCard';

export const revalidate = 0;

export default async function AdminReviewsPage() {
    const { data: reviews, error } = await supabaseAdmin
        .from('reviews')
        .select('*, destinations(name)')
        .order('created_at', { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading reviews</div>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pendingReviews = reviews?.filter((r: any) => !r.approved) || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const approvedReviews = reviews?.filter((r: any) => r.approved) || [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-safari-900 mb-2">Reviews Moderation</h1>
                <p className="text-safari-600">Approve or reject customer reviews.</p>
            </div>

            {/* Pending Reviews */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-yellow-700 flex items-center gap-2">
                    Pending Approval
                    <span className="bg-yellow-100 text-yellow-800 text-base px-2 py-1 rounded-full">{pendingReviews.length}</span>
                </h2>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {pendingReviews.map((review: any) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                    {pendingReviews.length === 0 && (
                        <div className="p-8 text-center text-safari-400 bg-white rounded-3xl border border-safari-100 shadow-sm">
                            No pending reviews.
                        </div>
                    )}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-safari-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-base">
                            <thead className="bg-safari-50 text-safari-700">
                                <tr>
                                    <th className="p-4">Reviewer</th>
                                    <th className="p-4">Destination</th>
                                    <th className="p-4">Rating</th>
                                    <th className="p-4 w-1/3">Comment</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-safari-100">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {pendingReviews.map((review: any) => (
                                    <ReviewRow key={review.id} review={review} />
                                ))}
                                {pendingReviews.length === 0 && (
                                    <tr><td colSpan={5} className="p-8 text-center text-safari-400">No pending reviews.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Approved Reviews History */}
            <div className="space-y-6">
                <h2 className="text-lg font-bold text-safari-700">Recent Approved History</h2>

                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-4 md:hidden opacity-75">
                    {approvedReviews.slice(0, 5).map((review: any) => (
                        <ReviewCard key={review.id} review={review} readOnly />
                    ))}
                    {approvedReviews.length === 0 && (
                        <div className="p-8 text-center text-safari-400 bg-white rounded-3xl border border-safari-100 shadow-sm">
                            No approved reviews yet.
                        </div>
                    )}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-safari-100 overflow-hidden opacity-75">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-base">
                            <tbody className="divide-y divide-safari-100">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {approvedReviews.slice(0, 5).map((review: any) => ( // Show last 5
                                    <ReviewRow key={review.id} review={review} readOnly />
                                ))}
                                {approvedReviews.length === 0 && (
                                    <tr><td colSpan={5} className="p-8 text-center text-safari-400">No approved reviews yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
