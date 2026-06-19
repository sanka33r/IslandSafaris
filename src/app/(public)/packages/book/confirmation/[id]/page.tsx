import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { CheckCircle, Calendar, Clock, Users, MapPin, Mail, Phone, Globe, ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import PaymentSection from '@/components/payments/PaymentSection';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'Booking Confirmation',
    description: 'Review your booking details and payment status for your Island Safaris experience.',
    path: '/packages/booking/confirmation',
    noIndex: true,
});

const PACKAGE_NAMES = {
    'cooking-class': 'Organic Cooking Experience',
    'village-tour': 'Sigiriya Village Tour',
    'bicycle-rent': 'Bicycle Rent',
};

interface ConfirmationPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BookingConfirmationPage(props: ConfirmationPageProps) {
    const params = await props.params;

    const { data: booking, error } = await supabaseAdmin
        .from('bookings')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !booking || !booking.package_type) {
        notFound();
    }

    const isPaid = booking.advance_payment_status === 'paid';
    const isPaymentPending = booking.status === 'payment_pending' && !isPaid;

    const packageName = PACKAGE_NAMES[booking.package_type as keyof typeof PACKAGE_NAMES];
    const bookingDate = new Date(booking.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const bookingTime = new Date(`2000-01-01T${booking.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className="bg-secondary-50 min-h-screen py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">

                {/* Header — varies by payment state */}
                <div className="text-center mb-10 sm:mb-12">
                    <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-6 ${isPaymentPending ? 'bg-amber-100' : 'bg-green-100'}`}>
                        {isPaymentPending ? (
                            <CreditCard size={40} className="text-amber-600" />
                        ) : (
                            <CheckCircle size={40} className="text-green-600" />
                        )}
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-safari-900 mb-4">
                        {isPaymentPending ? 'Complete Your ' : 'Booking '}
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isPaymentPending ? 'from-amber-500 to-amber-400' : 'from-green-600 to-green-500'}`}>
                            {isPaymentPending ? 'Payment' : 'Confirmed!'}
                        </span>
                    </h1>
                    <p className="text-safari-600 text-base sm:text-lg max-w-2xl mx-auto">
                        {isPaymentPending
                            ? 'Your booking details have been saved. Please complete the advance payment below to confirm your booking.'
                            : "Thank you for booking with Island Safaris. We've received your payment and will send final details shortly."}
                    </p>
                </div>

                {/* Booking Reference */}
                <div className="bg-gradient-to-br from-safari-900 to-safari-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white mb-6 sm:mb-8">
                    <div className="text-center">
                        <div className="text-safari-400 text-sm mb-2">Booking Reference</div>
                        <div className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">
                            {booking.id.substring(0, 8).toUpperCase()}
                        </div>
                        <div className="text-safari-300 text-sm mt-3">
                            Please save this reference number for your records
                        </div>
                        {isPaymentPending && (
                            <div className="mt-3 inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-500/30">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                Awaiting Payment
                            </div>
                        )}
                    </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm mb-6 sm:mb-8">
                    <h2 className="text-2xl font-bold text-safari-900 mb-6">Booking Details</h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 pb-6 border-b border-safari-100">
                            <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle size={20} className="text-secondary-600" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-safari-600 mb-1">Experience</div>
                                <div className="font-bold text-safari-900 text-lg">{packageName}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Calendar size={20} className="text-secondary-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-safari-600 mb-1">Date</div>
                                    <div className="font-semibold text-safari-900">{bookingDate}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock size={20} className="text-secondary-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-safari-600 mb-1">Time</div>
                                    <div className="font-semibold text-safari-900">{bookingTime}</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Users size={20} className="text-secondary-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-safari-600 mb-1">Group Size</div>
                                    <div className="font-semibold text-safari-900">
                                        {booking.group_size} {booking.group_size === 1 ? 'Person' : 'People'}
                                    </div>
                                </div>
                            </div>

                            {booking.pickup_required && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin size={20} className="text-secondary-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-safari-600 mb-1">Pickup Location</div>
                                        <div className="font-semibold text-safari-900">{booking.hotel_name}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm mb-6 sm:mb-8">
                    <h3 className="text-xl font-bold text-safari-900 mb-6">Your Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <Mail size={18} className="text-safari-400 mt-1" />
                            <div>
                                <div className="text-sm text-safari-600 mb-1">Email</div>
                                <div className="font-semibold text-safari-900">{booking.email}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone size={18} className="text-safari-400 mt-1" />
                            <div>
                                <div className="text-sm text-safari-600 mb-1">Phone</div>
                                <div className="font-semibold text-safari-900">{booking.phone}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Globe size={18} className="text-safari-400 mt-1" />
                            <div>
                                <div className="text-sm text-safari-600 mb-1">Country</div>
                                <div className="font-semibold text-safari-900">{booking.country}</div>
                            </div>
                        </div>
                    </div>

                    {booking.special_requests && (
                        <div className="mt-6 pt-6 border-t border-safari-100">
                            <div className="text-sm text-safari-600 mb-2">Special Requests</div>
                            <div className="text-safari-900">{booking.special_requests}</div>
                        </div>
                    )}
                </div>

                {/* Payment Section */}
                <PaymentSection
                    bookingId={booking.id}
                    amount={Number(booking.advance_payment_amount) || 5}
                    alreadyPaid={isPaid}
                />

                {/* What Happens Next — only show while waiting for payment OR after confirmed */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm mb-8">
                    <h3 className="text-xl font-bold text-safari-900 mb-4">What Happens Next?</h3>
                    <ol className="space-y-4">
                        {isPaymentPending ? (
                            <>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                    <div>
                                        <div className="font-semibold text-safari-900 mb-1">Complete Payment</div>
                                        <div className="text-safari-600 text-sm">Use the PayPal button above to pay the USD {Number(booking.advance_payment_amount) || 5} advance. Your booking will be confirmed instantly.</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                    <div>
                                        <div className="font-semibold text-safari-900 mb-1">Confirmation Email</div>
                                        <div className="text-safari-600 text-sm">You&apos;ll receive a booking confirmation email after payment is processed.</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                                    <div>
                                        <div className="font-semibold text-safari-900 mb-1">Final Details</div>
                                        <div className="text-safari-600 text-sm">We&apos;ll send pickup information and final details closer to your experience date.</div>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                    <div>
                                        <div className="font-semibold text-safari-900 mb-1">Confirmation Email</div>
                                        <div className="text-safari-600 text-sm">A booking confirmation has been sent to {booking.email}.</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                    <div>
                                        <div className="font-semibold text-safari-900 mb-1">Final Details</div>
                                        <div className="text-safari-600 text-sm">We&apos;ll send pickup information and final details closer to your experience date.</div>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                                    <div>
                                        <div className="font-semibold text-safari-900 mb-1">Remaining Balance</div>
                                        <div className="text-safari-600 text-sm">The remaining balance is paid on the day of your experience.</div>
                                    </div>
                                </li>
                            </>
                        )}
                    </ol>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/packages"
                        className="flex-1 bg-safari-900 hover:bg-safari-800 text-white font-bold py-4 px-6 rounded-full transition-all text-center inline-flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} />
                        Back to Packages
                    </Link>
                    <Link
                        href="/contact"
                        className="flex-1 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-6 rounded-full transition-all text-center"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
