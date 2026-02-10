import Link from 'next/link';
import {
    ArrowRight,
    ArrowLeft,
    Bike,
    Leaf,
    Heart,
    Users,
    MapPin,
    CheckCircle,
    DollarSign,
    Sun,
    Mountain,
    Timer,
} from 'lucide-react';

export const metadata = {
    title: 'Bicycle Rent | Island Safaris Sri Lanka',
    description:
        'Explore the scenic Sri Lankan countryside on a comfortable bicycle. Pedal through village roads, paddy fields, and forest trails at your own pace.',
};

export default function BicycleRentPage() {
    return (
        <div className="bg-secondary-50 min-h-screen">
            {/* ═══════ HERO ═══════ */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative text-white">
                    <Link
                        href="/packages"
                        className="inline-flex items-center gap-2 text-safari-300 hover:text-white transition-colors mb-8 text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to All Packages
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Bike size={32} className="text-white" />
                        </div>
                        <div>
                            <span className="text-secondary-400 text-sm font-medium uppercase tracking-wider">
                                Experience Package
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold">Bicycle Rent</h1>
                        </div>
                    </div>

                    <p className="text-safari-200 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Discover the stunning Sri Lankan countryside at your own pace on a
                        comfortable bicycle. The most eco-friendly way to explore.
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
                                From USD 5{' '}
                                <span className="text-safari-400 text-base font-normal">
                                    / person
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-safari-200" />
                        <div className="text-center md:text-left">
                            <div className="text-sm text-safari-500 mb-1">Duration</div>
                            <div className="text-lg font-bold text-safari-900">Flexible</div>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-safari-200" />
                        <div className="text-center md:text-left">
                            <div className="text-sm text-safari-500 mb-1">Location</div>
                            <div className="text-lg font-bold text-safari-900">
                                Sigiriya & Surroundings
                            </div>
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

            {/* ═══════ DETAILS ═══════ */}
            <section className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-safari-700 text-lg leading-relaxed">
                        <h2 className="text-2xl md:text-3xl font-bold text-safari-900">
                            Explore the Countryside on Two Wheels
                        </h2>
                        <p>
                            Discover the stunning Sri Lankan countryside at your own pace on a
                            comfortable bicycle. Pedal through quiet village roads, lush paddy
                            fields, and shaded forest trails while taking in the fresh air and
                            panoramic views.
                        </p>
                        <p>
                            Our well-maintained bicycles are perfect for all skill levels —
                            whether you want a leisurely ride to a nearby village or a longer
                            adventure along scenic rural paths. It&apos;s an eco-friendly,
                            healthy, and unforgettable way to explore the area.
                        </p>
                        <p>
                            We provide route suggestions and local tips to help you make the
                            most of your ride. Discover hidden temples, small village shops,
                            and stunning viewpoints that most tourists never see.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            {
                                icon: Leaf,
                                title: 'Eco-Friendly',
                                text: 'Explore without leaving a carbon footprint — the greenest way to see the countryside.',
                                color: 'from-green-500 to-green-600',
                            },
                            {
                                icon: MapPin,
                                title: 'Scenic Routes',
                                text: 'We suggest beautiful routes through paddy fields, ancient temples, and village lanes.',
                                color: 'from-blue-500 to-blue-600',
                            },
                            {
                                icon: Users,
                                title: 'All Skill Levels',
                                text: 'Comfortable bicycles suitable for beginners, families, and experienced riders alike.',
                                color: 'from-violet-500 to-violet-600',
                            },
                            {
                                icon: Heart,
                                title: 'Freedom to Explore',
                                text: 'No fixed schedule — ride wherever and however long you want at your own pace.',
                                color: 'from-rose-500 to-rose-600',
                            },
                            {
                                icon: Sun,
                                title: 'Best Times to Ride',
                                text: 'Early morning or late afternoon rides are magical — cool breeze and golden light.',
                                color: 'from-amber-500 to-amber-600',
                            },
                            {
                                icon: Mountain,
                                title: 'Stunning Views',
                                text: 'Enjoy views of Sigiriya Rock, Pidurangala, and the surrounding mountain ranges.',
                                color: 'from-teal-500 to-teal-600',
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
                                'Well-maintained bicycle',
                                'Helmet (on request)',
                                'Suggested scenic routes & maps',
                                'Local tips and recommendations',
                                'Basic repair kit',
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
                    <div className="bg-white rounded-3xl p-8 border border-safari-100 shadow-sm">
                        <h3 className="text-xl font-bold text-safari-900 mb-5">
                            Good to Know
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Available daily from 6:00 AM to 6:00 PM',
                                'Suitable for ages 12 and above',
                                'Bring sunscreen, hat, and water bottle',
                                'Comfortable clothing recommended',
                                'Guided group rides available on request',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <Timer
                                        size={20}
                                        className="text-blue-500 mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-safari-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ═══════ CTA ═══════ */}
            <section className="py-20 md:py-28 bg-safari-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-safari-900 via-safari-800 to-safari-900" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Ride?
                    </h2>
                    <p className="text-safari-300 text-lg max-w-2xl mx-auto mb-4">
                        Secure your bicycle with a USD 5 advance payment. Contact us to
                        reserve and get personalized route recommendations.
                    </p>
                    <p className="text-safari-400 text-sm mb-10">
                        Free cancellation up to 24 hours in advance.
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
