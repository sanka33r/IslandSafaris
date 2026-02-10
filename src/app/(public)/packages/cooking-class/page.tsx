import Link from 'next/link';
import {
    ArrowRight,
    ChefHat,
    Leaf,
    Heart,
    Users,
    BookOpen,
    Sparkles,
    Car,
    CheckCircle,
    Globe,
    HandHeart,
    GraduationCap,
    Salad,
    Home,
    ArrowLeft,
    DollarSign,
} from 'lucide-react';

export const metadata = {
    title: 'Organic Cooking Experience | Island Safaris Sri Lanka',
    description:
        'Learn to cook authentic Sri Lankan cuisine in a peaceful organic garden. Hands-on cooking class with farm-to-table ingredients, traditional recipes, and a free lunch.',
};

function FeatureCard({
    icon: Icon,
    title,
    text,
    color,
}: {
    icon: React.ElementType;
    title: string;
    text: string;
    color: string;
}) {
    return (
        <div className="group p-6 rounded-2xl bg-white border border-safari-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div
                className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
            >
                <Icon size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-bold text-safari-900 mb-2">{title}</h4>
            <p className="text-safari-600 text-sm leading-relaxed">{text}</p>
        </div>
    );
}

export default function CookingClassPage() {
    return (
        <div className="bg-secondary-50 min-h-screen">
            {/* ═══════ HERO ═══════ */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative text-white">
                    <Link
                        href="/packages"
                        className="inline-flex items-center gap-2 text-safari-300 hover:text-white transition-colors mb-8 text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to All Packages
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <ChefHat size={32} className="text-white" />
                        </div>
                        <div>
                            <span className="text-secondary-400 text-sm font-medium uppercase tracking-wider">
                                Experience Package
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold">
                                Organic Cooking Experience
                            </h1>
                        </div>
                    </div>

                    <p className="text-safari-200 text-lg md:text-xl max-w-3xl leading-relaxed">
                        Step into our peaceful organic garden and learn to prepare authentic
                        Sri Lankan signature dishes using 100% fresh, homegrown ingredients.
                    </p>
                </div>
            </section>

            {/* ═══════ PRICE BAR ═══════ */}
            <section className="container mx-auto px-6 -mt-8 relative z-10 mb-12">
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
                            <div className="text-sm text-safari-500 mb-1">Group Size</div>
                            <div className="text-lg font-bold text-safari-900">Small Groups</div>
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

            {/* ═══════ INTRO ═══════ */}
            <section className="container mx-auto px-6 mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3 space-y-5 text-safari-700 text-lg leading-relaxed">
                        <p>
                            Our organic cooking class takes place in our very own garden — a
                            peaceful oasis filled with fresh, natural ingredients.
                        </p>
                        <p>
                            Located in the heart of Sri Lanka, this beautiful garden is a true
                            sanctuary where you can explore, relax, and handpick the freshest
                            fruits, vegetables, and herbs. Our experienced gardeners will guide
                            you through the garden, sharing their knowledge about sustainable
                            farming practices and the importance of organic agriculture in
                            protecting our planet.
                        </p>
                    </div>

                    {/* What You'll Experience */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-safari-100 shadow-sm">
                        <h3 className="text-xl font-bold text-safari-900 mb-5">
                            What You&apos;ll Experience
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Learn to prepare authentic Sri Lankan signature dishes',
                                'Discover traditional local cooking techniques',
                                'Understand the basics of Ayurvedic principles and healthy ingredients',
                                'Enjoy a delicious meal made by you',
                                'Take home recipes to recreate the dishes yourself',
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <CheckCircle
                                        size={18}
                                        className="text-secondary-600 mt-1 flex-shrink-0"
                                    />
                                    <span className="text-safari-700 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ═══════ FEATURE GRID ═══════ */}
            <section className="container mx-auto px-6 mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-safari-900 mb-8">
                    Why Choose This Experience
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    <FeatureCard
                        icon={Sparkles}
                        title="Authenticity"
                        text="Deeply rooted in traditional Sri Lankan recipes and time-honored cooking techniques passed down through generations for a truly immersive cultural experience."
                        color="from-orange-500 to-orange-600"
                    />
                    <FeatureCard
                        icon={Leaf}
                        title="Farm to Table"
                        text="100% fresh, homegrown ingredients from our organic garden — a true farm to table experience from handpicking produce to transforming it into traditional dishes."
                        color="from-green-500 to-green-600"
                    />
                    <FeatureCard
                        icon={GraduationCap}
                        title="Expert Guidance"
                        text="I will personally guide you throughout, sharing knowledge to help you gain a deeper understanding of Sri Lankan cooking and organic farming practices."
                        color="from-blue-500 to-blue-600"
                    />
                    <FeatureCard
                        icon={Leaf}
                        title="Sustainable & Eco Friendly"
                        text="We promote organic agriculture and minimize our ecological footprint. By choosing our class, you contribute to protecting and preserving the environment."
                        color="from-emerald-500 to-emerald-600"
                    />
                    <FeatureCard
                        icon={HandHeart}
                        title="Hands-On Learning"
                        text="A fully hands-on experience where you actively participate in every step — from preparing fresh ingredients to cooking and serving the final dishes."
                        color="from-pink-500 to-pink-600"
                    />
                    <FeatureCard
                        icon={Users}
                        title="Small Group Experience"
                        text="Conducted in small groups for personalized attention and a warm, friendly atmosphere where you can interact closely with the instructor and fellow guests."
                        color="from-violet-500 to-violet-600"
                    />
                    <FeatureCard
                        icon={Salad}
                        title="Health-Conscious Cooking"
                        text="Using organic and locally sourced ingredients, discover how traditional Sri Lankan dishes can be both flavorful and nourishing for your overall well-being."
                        color="from-lime-500 to-lime-600"
                    />
                    <FeatureCard
                        icon={Globe}
                        title="Cultural Immersion"
                        text="Goes beyond cooking — offering deeper insight into Sri Lanka's rich culinary heritage and the important role food plays in local culture and daily life."
                        color="from-teal-500 to-teal-600"
                    />
                    <FeatureCard
                        icon={BookOpen}
                        title="Take-Home Recipes"
                        text="Receive recipes of the dishes you prepared — a special keepsake to recreate authentic Sri Lankan flavors in your own kitchen with family and friends."
                        color="from-amber-500 to-amber-600"
                    />
                    <FeatureCard
                        icon={Heart}
                        title="Inclusive Experience"
                        text="Designed for all skill levels — whether you're a seasoned cook or a complete beginner, everyone is welcome to learn and enjoy authentic Sri Lankan flavors."
                        color="from-rose-500 to-rose-600"
                    />
                    <FeatureCard
                        icon={Home}
                        title="Warm Sri Lankan Hospitality"
                        text="Experience the warmth and genuine hospitality Sri Lanka is known for. I will personally ensure you feel comfortable, welcomed, and truly at home."
                        color="from-secondary-500 to-secondary-600"
                    />
                </div>
            </section>

            {/* ═══════ INCLUDES + BONUS ═══════ */}
            <section className="container mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl p-8 border border-safari-100 shadow-sm">
                        <h3 className="text-xl font-bold text-safari-900 mb-5">
                            What&apos;s Included
                        </h3>
                        <ul className="space-y-3">
                            {[
                                'Pickup and drop-off',
                                'Hands-on cooking experience',
                                'Organic garden visit',
                                'Free traditional Sri Lankan rice & curry lunch',
                                'Take-home recipes',
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
                    <div className="bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-3xl p-8 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-3">
                                Bonus: Free Traditional Lunch
                            </h3>
                            <p className="text-secondary-100 leading-relaxed mb-4">
                                Relax and enjoy a delicious Sri Lankan style rice and curry
                                lunch, freshly prepared during the cooking session with
                                ingredients from our organic garden.
                            </p>
                            <div className="flex items-center gap-3 mb-6">
                                <Car size={20} className="text-secondary-200" />
                                <span className="text-secondary-100 text-sm">
                                    Comfortable tuk-tuk return ride included
                                </span>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white text-secondary-700 font-bold py-3 px-8 rounded-full hover:bg-secondary-50 transition-all shadow-lg hover:scale-105 active:scale-95"
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
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready to Cook Like a Local?
                    </h2>
                    <p className="text-safari-300 text-lg max-w-2xl mx-auto mb-4">
                        Secure your spot with just a USD 5 advance payment. The remaining
                        balance is paid on the day of the experience.
                    </p>
                    <p className="text-safari-400 text-sm mb-10">
                        Free cancellation up to 24 hours before the experience.
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
