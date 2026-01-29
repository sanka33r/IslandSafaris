import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
    title: 'Contact Us | Island Safaris Sri Lanka',
    description: 'Get in touch for bookings and inquiries.',
};

export default function ContactPage() {
    return (
        <div className="bg-safari-50 min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-safari-900 mb-4">Contact Us</h1>
                    <p className="text-safari-600">Have questions? We are here to help you plan your safari.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-safari-100 space-y-8">
                        <h2 className="text-2xl font-bold text-safari-900">Get in Touch</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary-100 p-3 rounded-xl text-secondary-600">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-safari-900">Phone & WhatsApp</h3>
                                    <p className="text-safari-600">+94 77 000 0000</p>
                                    <p className="text-sm text-safari-400 mt-1">Available 24/7</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-secondary-100 p-3 rounded-xl text-secondary-600">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-safari-900">Email</h3>
                                    <p className="text-safari-600">info@islandsafaris.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-secondary-100 p-3 rounded-xl text-secondary-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-safari-900">Location</h3>
                                    <p className="text-safari-600">Habarana, Sri Lanka</p>
                                    <p className="text-sm text-safari-400 mt-1">Main Safari Hub</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder or Simple Message Form */}
                    <div className="bg-safari-900 p-8 rounded-3xl text-white flex flex-col justify-center text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to Book?</h3>
                        <p className="text-safari-200 mb-8">
                            Skip the hassle and book your safari directly through our website.
                            No advance payment required.
                        </p>
                        <a
                            href="/booking"
                            className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 px-8 rounded-xl transition-colors"
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
