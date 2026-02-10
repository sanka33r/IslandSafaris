import Link from 'next/link';
import {
    ArrowRight,
    ArrowLeft,
    TreePalm,
    MapPin,
    Ship,
    Footprints,
    Utensils,
    Car,
    CheckCircle,
    DollarSign,
    Heart,
    Leaf,
    Camera,
    Users,
} from 'lucide-react';

export const metadata = {
    title: 'Sigiriya Village Tour | Island Safaris Sri Lanka',
    description:
        'Experience the authentic lifestyle of a Sri Lankan village — bullock cart rides, catamaran boat rides, village walks, and traditional cooking demonstrations.',
};

export default function VillageTourPage() {
    const tourSteps = [
        {
            step: '01',
            icon: MapPin,
            title: 'Bullock Cart Ride',
            text: "Step back in time and experience one of Sri Lanka's oldest forms of transport. The bullock cart has long been a trusted companion of man and cow, and your journey on it sets the stage for unforgettable memories. Travel along a scenic route through the roots and rocks of nature, leading to the breathtaking Maha Kimbissa Lake.",
            color: 'from-amber-500 to-orange-500',
        },
        {
            step: '02',
            icon: Ship,
            title: 'Boat Ride',
            text: 'At Maha Kimbissa Lake, your adventure continues with a serene catamaran boat ride. Glide past ancient trees and sparkling waters as the gentle breeze from the paddies kisses your face, offering a true glimpse into rural life. From the boat, enjoy panoramic views of Sigiriya and Pidurangala Rocks, and take in the surrounding mountain ranges and the lake\'s rich biodiversity — a feast for the eyes and soul.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            step: '03',
            icon: Footprints,
            title: 'Village Walk & Cooking Experience',
            text: 'After the boat ride, take a short walk through lush paddy fields and vegetable gardens to reach a local village house. Here, a village lady will demonstrate traditional Sri Lankan cooking, giving you a hands-on cultural experience.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            step: '04',
            icon: Utensils,
            title: 'Free Lunch',
            text: 'Relax and savor a delicious traditional Sri Lankan-style rice and curry lunch, freshly prepared during the cooking demonstration.',
            color: 'from-rose-500 to-pink-500',
        },
        {
            step: '05',
            icon: Car,
            title: 'Return',
            text: 'Finish the tour with a comfortable tuk-tuk ride back to your hotel or the tour starting point.',
            color: 'from-violet-500 to-purple-500',
        },
    ];

    return (
        <div className="bg-secondary-50 min-h-screen">
            {/* ═══════ HERO ═══════ */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative text-white">
                    <Link
                        href="/packages"
                        className="inline-flex items-center gap-2 text-safari-300 hover:text-white transition-colors mb-8 text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to All Packages
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <TreePalm size={32} className="text-white" />
                        </div>
                        <div>
                            <span className="text-secondary-400 text-sm font-medium uppercase tracking-wider">
                                Experience Package
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold">
                                Sigiriya Village Tour
                            </h1>
                        </div>
                    </div>

                    <p className="text-safari-200 text-lg md:text-xl max-w-3xl leading-relaxed">
                        A once-in-a-lifetime opportunity to experience the nature, culture,
                        and authentic lifestyle of a Sri Lankan village.
                    </p>
                </div>
            </section>

            {/* ═══════ PRICE BAR ═══════ */}
            <section className="container mx-auto px-6 -mt-8 relative z-10 mb-16">
                <div className="bg-white rounded-2xl shadow-xl border border-safari-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-8">
                        <div className="text-center md:text-left">
                            <div className="text-sm text-safari-500 mb-1">Price</div>
                            <div className="text-3xl font-bold text-secondary-600">
                                USD 22 <span className="text-safari-400 text-base font-normal">/ person</span>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-safari-200" />
                        <div className="text-center md:text-left">
                            <div className="text-sm text-safari-500 mb-1">Duration</div>
                            <div className="text-lg font-bold text-safari-900">4-5 Hours</div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-safari-200" />
                        <div className="text-center md:text-left">
                            <div className="text-sm text-safari-500 mb-1">Location</div>
                            <div className="text-lg font-bold text-safari-900">Sigiriya Village</div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-safari-200" />
                        <div className="text-center md:text-left">
                            <div className="text-sm text-safari-500 mb-1">Advance Booking</div>
                            <div className="text-lg font-bold text-green-600 flex items-center gap-1">
                                <DollarSign size={18} /> USD 5
                            </div>
                        </div>
                    </div>
                    <Link
                        href="/contact"
                        className="bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap inline-flex items-center gap-2"
                    >
                        Book Now <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* ═══════ TOUR TIMELINE ═══════ */}
            <section className="container mx-auto px-6 mb-20">
                <h2 className="text-2xl md:text-3xl font-bold text-safari-900 mb-10">
                    Your Journey
                </h2>

                <div className="space-y-6">
                    {tourSteps.map((item, index) => (
                        <div
                            key={item.step}
                            className="relative bg-white rounded-3xl overflow-hidden border border-safari-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                {/* Step Number + Icon */}
                                <div
                                    className={`lg:col-span-2 bg-gradient-to-br ${item.color} p-8 flex flex-col items-center justify-center text-white`}
                                >
                                    <div className="text-5xl font-bold opacity-40 mb-2">
                                        {item.step}
                                    </div>
                                    <item.icon size={40} />
                                </div>

                                {/* Content */}
                                <div className="lg:col-span-10 p-8 md:p-10 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-safari-900 mb-3 group-hover:text-secondary-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-safari-600 leading-relaxed text-base">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════ HIGHLIGHTS ═══════ */}
            <section className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        {
                            icon: Camera,
                            title: 'Scenic Views',
                            text: 'Panoramic views of Sigiriya Rock, Pidurangala, and surrounding mountain ranges.',
                            color: 'from-blue-500 to-blue-600',
                        },
                        {
                            icon: Leaf,
                            title: 'Eco-Friendly',
                            text: 'Sustainable tourism that supports local communities and preserves cultural heritage.',
                            color: 'from-green-500 to-green-600',
                        },
                        {
                            icon: Heart,
                            title: 'Authentic Culture',
                            text: 'Genuine interactions with local villagers and traditional ways of life.',
                            color: 'from-rose-500 to-rose-600',
                        },
                        {
                            icon: Users,
                            title: 'Personal Touch',
                            text: 'Small group experience ensuring personalized attention and warm hospitality.',
                            color: 'from-violet-500 to-violet-600',
                        },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className="group p-6 rounded-2xl bg-white border border-safari-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
                            >
                                <f.icon size={24} className="text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-safari-900 mb-2">
                                {f.title}
                            </h4>
                            <p className="text-safari-600 text-sm leading-relaxed">
                                {f.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════ INCLUDES ═══════ */}
            <section className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl p-8 border border-safari-100 shadow-sm">
                        <h3 className="text-xl font-bold text-safari-900 mb-5">
                            What&apos;s Included
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Pickup and drop-off',
                                'Bullock cart ride',
                                'Catamaran boat ride',
                                'Village walk through paddy fields',
                                'Cooking demonstration',
                                'Traditional Sri Lankan rice & curry lunch',
                                'Tuk-tuk return ride',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle
                                        size={20}
                                        className="text-green-500 mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-safari-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-3">
                                A True Cultural Immersion
                            </h3>
                            <p className="text-green-100 leading-relaxed mb-4">
                                This isn&apos;t just a tour — it&apos;s a journey into the heart
                                of rural Sri Lanka. From scenic bullock cart rides to serene lake
                                crossings, every moment is designed to connect you with the land
                                and its people.
                            </p>
                            <div className="flex items-center gap-3 mb-6">
                                <Car size={20} className="text-green-200" />
                                <span className="text-green-100 text-sm">
                                    Comfortable tuk-tuk return ride included
                                </span>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                            Book This Experience
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════ CTA ═══════ */}
            <section className="py-20 md:py-28 bg-safari-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-safari-900 via-safari-800 to-safari-900" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready for a Village Adventure?
                    </h2>
                    <p className="text-safari-300 text-lg max-w-2xl mx-auto mb-4">
                        Secure your spot with just a USD 5 advance payment. The remaining
                        balance is paid on the day of the tour.
                    </p>
                    <p className="text-safari-400 text-sm mb-10">
                        Free cancellation up to 24 hours before the tour.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl active:scale-95 inline-flex items-center justify-center gap-3"
                        >
                            Book Now — USD 5 Advance
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        <Link
                            href="/packages"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/20 hover:border-white/40"
                        >
                            View Other Packages
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
