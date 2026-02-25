import Link from 'next/link';
import StickyPriceBar from '@/components/packages/StickyPriceBar';
import PackageGallery from '@/components/packages/PackageGallery';
import { packages } from '../page';
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
    Clock,
    MapPin,
    Quote,
} from 'lucide-react';

export const metadata = {
    title: 'Organic Cooking Experience | Island Safaris Sri Lanka',
    description:
        'Learn to cook authentic Sri Lankan cuisine in a peaceful organic garden. Hands-on cooking class with farm-to-table ingredients, traditional recipes, and a free lunch.',
};

const highlights = [
    {
        icon: Sparkles,
        title: 'Authenticity',
        text: 'Traditional recipes and cooking techniques passed down through generations.',
    },
    {
        icon: Leaf,
        title: 'Farm to Table',
        text: 'Handpick fresh, homegrown ingredients from our organic garden.',
    },
    {
        icon: GraduationCap,
        title: 'Expert Guidance',
        text: 'Personal guidance through every step of the cooking process.',
    },
    {
        icon: HandHeart,
        title: 'Hands-On Learning',
        text: 'Actively participate from preparation to the final plating.',
    },
    {
        icon: Users,
        title: 'Small Groups',
        text: 'Intimate setting for personalized attention and warm interaction.',
    },
    {
        icon: Globe,
        title: 'Cultural Immersion',
        text: "Explore Sri Lanka's culinary heritage beyond just cooking.",
    },
];

const additionalReasons = [
    {
        icon: Leaf,
        title: 'Sustainable & Eco Friendly',
        text: 'Organic agriculture that preserves the environment.',
    },
    {
        icon: Salad,
        title: 'Health-Conscious',
        text: 'Flavorful dishes that nourish your well-being.',
    },
    {
        icon: BookOpen,
        title: 'Take-Home Recipes',
        text: 'Recreate these flavors in your own kitchen.',
    },
    {
        icon: Heart,
        title: 'All Skill Levels',
        text: 'Beginners and experts are equally welcome.',
    },
    {
        icon: Home,
        title: 'Warm Hospitality',
        text: 'Feel at home with genuine Sri Lankan warmth.',
    },
];

export default function CookingClassPage() {
    const pkg = packages.find((p) => p.slug === 'cooking-class');
    const galleryImages = pkg && 'images' in pkg ? pkg.images : undefined;

    return (
        <div className="bg-secondary-50 min-h-screen">
            {/* ═══════ HERO ═══════ */}
            <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
                {/* Layered background */}
                {pkg?.image && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${pkg.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-safari-900/90 via-safari-800/85 to-safari-950/95" />
                    </>
                )}
                {!pkg?.image && (
                    <div className="absolute inset-0 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-950" />
                )}
                <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-[500px] h-64 sm:h-80 md:h-[500px] bg-secondary-600/10 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-[400px] h-48 sm:h-64 md:h-[400px] bg-secondary-400/8 rounded-full blur-[60px] md:blur-[80px]" />

                <div className="container mx-auto px-4 sm:px-6 relative">
                    <Link
                        href="/packages"
                        className="inline-flex items-center gap-2 text-safari-300 hover:text-white transition-colors mb-6 sm:mb-10 text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to All Packages
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="h-px w-8 sm:w-12 bg-secondary-400" />
                            <span className="text-secondary-400 text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                                Experience Package
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
                            Organic Cooking
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300">
                                Experience
                            </span>
                        </h1>

                        <p className="text-safari-200 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-6 sm:mb-10">
                            Step into our peaceful organic garden and learn to prepare authentic
                            Sri Lankan signature dishes using 100% fresh, homegrown ingredients.
                        </p>

                        {/* Quick info pills */}
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {[
                                { icon: Clock, label: '4-5 Hours' },
                                { icon: Users, label: 'Small Groups' },
                                { icon: MapPin, label: 'Organic Garden' },
                            ].map((pill) => (
                                <div
                                    key={pill.label}
                                    className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-safari-100"
                                >
                                    <pill.icon size={14} className="text-secondary-400" />
                                    {pill.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ STICKY PRICE BAR ═══════ */}
            <StickyPriceBar
                packageName="Organic Cooking Experience"
                price="USD 22"
                advancePrice="USD 5"
                bookHref="/packages/cooking-class/book"
            />

            {/* ═══════ CULTURAL INTRO ═══════ */}
            <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    {/* Left — storytelling */}
                    <div>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                                <ChefHat size={18} className="text-secondary-600 sm:hidden" />
                                <ChefHat size={20} className="text-secondary-600 hidden sm:block" />
                            </div>
                            <span className="text-secondary-600 text-sm font-semibold uppercase tracking-wider">
                                Our Story
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 mb-4 sm:mb-6 leading-snug">
                            A Garden Where Flavors
                            <br className="hidden sm:block" />
                            Come <span className="text-secondary-600">Alive</span>
                        </h2>

                        <div className="space-y-3 sm:space-y-4 text-safari-600 text-base sm:text-lg leading-relaxed">
                            <p>
                                Our organic cooking class takes place in our very own garden — a
                                peaceful oasis filled with fresh, natural ingredients.
                            </p>
                            <p>
                                Located in the heart of Sri Lanka, this beautiful garden is a true
                                sanctuary where you can explore, relax, and handpick the freshest
                                fruits, vegetables, and herbs.
                            </p>
                        </div>
                    </div>

                    {/* Right — experience checklist + cultural quote */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-safari-100 shadow-sm">
                            <h3 className="text-base sm:text-lg font-bold text-safari-900 mb-4 sm:mb-5 flex items-center gap-2">
                                <CheckCircle size={18} className="text-secondary-600" />
                                What You&apos;ll Experience
                            </h3>
                            <ul className="space-y-2.5 sm:space-y-3">
                                {[
                                    'Learn to prepare authentic Sri Lankan signature dishes',
                                    'Discover traditional local cooking techniques',
                                    'Understand Ayurvedic principles and healthy ingredients',
                                    'Enjoy a delicious meal made by you',
                                    'Take home recipes to recreate the dishes',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-2 sm:mt-2.5 flex-shrink-0" />
                                        <span className="text-safari-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cultural quote */}
                        <div className="bg-safari-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-secondary-500/10 rounded-full blur-2xl" />
                            <Quote size={20} className="text-secondary-400/40 mb-2 sm:mb-3 sm:w-6 sm:h-6" />
                            <p className="text-safari-100 text-sm leading-relaxed italic relative">
                                &ldquo;Cooking is more than recipes — it&apos;s the soul of our culture,
                                passed from grandmother to grandchild, one spice at a time.&rdquo;
                            </p>
                            <div className="mt-2 sm:mt-3 flex items-center gap-2">
                                <div className="w-6 h-px bg-secondary-400" />
                                <span className="text-secondary-400 text-sm font-medium">Sri Lankan Tradition</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ CULTURAL DIVIDER ═══════ */}
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-safari-200 to-safari-200" />
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-secondary-300" />
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-safari-200 to-safari-200" />
                </div>
            </div>


            {/* ═══════ GALLERY ═══════ */}
            {galleryImages && (
                <PackageGallery
                    images={galleryImages}
                    title="Cooking experience in photos"
                    altPrefix="Cooking experience"
                />
            )}
            
            {/* ═══════ WHY CHOOSE — EDITORIAL LAYOUT ═══════ */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Section header */}
                    <div className="max-w-2xl mb-8 sm:mb-10 md:mb-14">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="h-px w-8 sm:w-10 bg-secondary-400" />
                            <span className="text-secondary-600 text-sm font-semibold uppercase tracking-[0.15em]">
                                Why Choose Us
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 leading-snug">
                            Why Choose This{' '}
                            <span className="text-secondary-600">Experience</span>
                        </h2>
                    </div>

                    {/* Main 6 highlights — responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
                        {highlights.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-safari-100 hover:border-secondary-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                                >
                                    {/* Subtle pattern on hover */}
                                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-secondary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-secondary-50 to-safari-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 border border-safari-100">
                                            <Icon size={20} className="text-secondary-600" />
                                        </div>
                                        <h4 className="text-base sm:text-lg font-bold text-safari-900 mb-1.5 sm:mb-2 group-hover:text-secondary-700 transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-safari-600 text-sm leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Additional reasons — compact horizontal strip */}
                    <div className="bg-safari-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                            {additionalReasons.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className="flex items-center gap-3 group">
                                        <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-secondary-600/20 transition-colors flex-shrink-0">
                                            <Icon size={16} className="text-secondary-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-white text-sm font-semibold">{item.title}</div>
                                            <div className="text-safari-400 text-sm">{item.text}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ INCLUDES + BONUS ═══════ */}
            <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
                    {/* What's Included — wider */}
                    <div className="md:col-span-3 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-safari-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="h-px w-6 sm:w-8 bg-secondary-400" />
                            <h3 className="text-base sm:text-lg font-bold text-safari-900">
                                What&apos;s Included
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {[
                                'Pickup and drop-off',
                                'Hands-on cooking experience',
                                'Organic garden visit',
                                'Traditional rice & curry lunch',
                                'Take-home recipes',
                                'Tuk-tuk return ride',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 sm:gap-3 bg-safari-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                                    <CheckCircle
                                        size={16}
                                        className="text-safari-400 flex-shrink-0"
                                    />
                                    <span className="text-safari-700 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bonus card */}
                    <div className="md:col-span-2 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full" />
                        <div className="absolute -left-4 -top-4 w-16 sm:w-20 h-16 sm:h-20 bg-white/5 rounded-full" />
                        <div className="relative">
                            <span className="inline-block bg-white/20 text-sm font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-3 sm:mb-4">
                                Bonus
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                                Free Traditional Lunch
                            </h3>
                            <p className="text-secondary-100 leading-relaxed mb-3 sm:mb-4 text-sm">
                                Enjoy a delicious Sri Lankan style rice and curry
                                lunch, freshly prepared during the cooking session.
                            </p>
                            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                                <Car size={16} className="text-secondary-200" />
                                <span className="text-secondary-100 text-sm">
                                    Return ride included
                                </span>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center justify-center gap-2 bg-white text-secondary-700 font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-full hover:bg-secondary-50 transition-all shadow-lg hover:scale-105 active:scale-95 text-sm"
                        >
                            Book This Experience
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* ═══════ CTA ═══════ */}
            <section className="py-14 sm:py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900" />
                <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary-500/10 rounded-full blur-[80px] sm:blur-[100px]" />

                <div className="container mx-auto px-4 sm:px-6 relative text-center">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-secondary-300" />
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Ready to Cook Like a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-400">
                            Local?
                        </span>
                    </h2>
                    <p className="text-safari-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-3 sm:mb-4">
                        Secure your spot with just a USD 5 advance payment. The remaining
                        balance is paid on the day of the experience.
                    </p>
                    <p className="text-safari-500 text-sm mb-6 sm:mb-8 md:mb-10">
                        Free cancellation up to 24 hours before the experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-2 px-4 sm:py-4 sm:px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl active:scale-95 inline-flex items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-base"
                        >
                            Book Now — USD 5 Advance
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform shrink-0"
                            />
                        </Link>
                        <Link
                            href="/packages"
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-2 px-4 sm:py-4 sm:px-8 rounded-full transition-all border border-white/20 hover:border-white/40 text-sm sm:text-base"
                        >
                            View Other Packages
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
