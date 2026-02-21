import BookingForm from '@/components/booking/BookingForm';
import { Calendar, Shield, HeadphonesIcon } from 'lucide-react';

export const metadata = {
    title: 'Book Your Experience | Island Safaris Sri Lanka',
    description: 'Book your authentic Sri Lankan experience with Island Safaris. Secure your spot with just USD 5 advance payment.',
};

interface BookingPageProps {
    searchParams: {
        package?: 'cooking-class' | 'village-tour' | 'bicycle-rent';
    };
}

export default function PackageBookingPage({ searchParams }: BookingPageProps) {
    const preselectedPackage = searchParams.package;

    return (
        <div className="bg-secondary-50 min-h-screen py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-secondary-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-safari-900 mb-4 sm:mb-6">
                        Book Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-secondary-500">
                            Experience
                        </span>
                    </h1>
                    <p className="text-safari-600 text-base sm:text-lg max-w-2xl mx-auto">
                        Secure your spot with just a USD 5 advance payment (non-refundable). Complete the form below and we&apos;ll confirm your booking within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <BookingForm preselectedPackage={preselectedPackage} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Why Book With Us */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-safari-100 shadow-sm">
                            <h3 className="text-xl font-bold text-safari-900 mb-6">Why Book With Us</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Shield size={20} className="text-secondary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-safari-900 mb-1">Secure Booking</h4>
                                        <p className="text-safari-600 text-sm">Your information is safe and secure with us.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Calendar size={20} className="text-secondary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-safari-900 mb-1">Non-Refundable Advance</h4>
                                        <p className="text-safari-600 text-sm">The advance payment secures your spot and is non-refundable.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <HeadphonesIcon size={20} className="text-secondary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-safari-900 mb-1">24/7 Support</h4>
                                        <p className="text-safari-600 text-sm">Our team is available anytime to help you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-gradient-to-br from-safari-900 to-safari-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
                            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                            <p className="text-safari-200 mb-6 text-sm">
                                Have questions about your booking? Our team is here to assist you.
                            </p>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <div className="text-safari-400 text-xs mb-1">WhatsApp / Phone</div>
                                    <div className="font-semibold">+94 77 000 0000</div>
                                </div>
                                <div>
                                    <div className="text-safari-400 text-xs mb-1">Email</div>
                                    <div className="font-semibold">info@islandsafaris.com</div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-secondary-50 rounded-2xl p-6 border border-secondary-100">
                            <div className="text-center">
                                <div className="text-4xl mb-3">🌟</div>
                                <div className="font-bold text-safari-900 mb-1">Trusted by Travelers</div>
                                <div className="text-safari-600 text-sm">Join hundreds of satisfied guests who have experienced authentic Sri Lankan culture with us.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
