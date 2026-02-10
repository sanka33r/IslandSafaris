import Link from 'next/link';
import {
    ArrowRight,
    ChefHat,
    Bike,
    TreePalm,
    Compass,
    Clock,
    MapPin,
    Sparkles,
} from 'lucide-react';

export const metadata = {
    title: 'Packages | Island Safaris Sri Lanka',
    description:
        'Explore our curated experience packages — organic cooking classes, authentic village tours, and scenic bicycle rentals in Sri Lanka.',
};

const packages = [
    {
        slug: 'cooking-class',
        icon: ChefHat,
        number: '01',
        title: 'Organic Cooking Experience',
        tagline: 'Farm to Table',
        price: '22',
        duration: '4–5 Hours',
        location: 'Sigiriya',
        description:
            'Step into a peaceful organic garden and learn to cook authentic Sri Lankan dishes using handpicked, homegrown ingredients. A true farm-to-table experience guided by a local host.',
        accent: 'bg-gradient-to-br from-orange-500 to-rose-500',
        accentLight: 'bg-orange-50',
        accentText: 'text-orange-600',
        accentBorder: 'border-orange-200',
        image:
            'https://images.unsplash.com/',
    },
    {
        slug: 'village-tour',
        icon: TreePalm,
        number: '02',
        title: 'Sigiriya Village Tour',
        tagline: 'Cultural Immersion',
        price: '22',
        duration: '4–5 Hours',
        location: 'Sigiriya Village',
        description:
            'Drift through the countryside on a bullock cart, glide across a serene lake by catamaran, and walk through lush paddy fields to a village home. A journey into the soul of rural Sri Lanka.',
        accent: 'bg-gradient-to-br from-emerald-500 to-teal-500',
        accentLight: 'bg-emerald-50',
        accentText: 'text-emerald-600',
        accentBorder: 'border-emerald-200',
        image:
            'https://images.unsplash.com/photo-1588828195511-584568433682?w=900&q=80',
    },
    {
        slug: 'bicycle-rent',
        icon: Bike,
        number: '03',
        title: 'Bicycle Rent',
        tagline: 'Explore Freely',
        price: '5',
        duration: 'Flexible',
        location: 'Sigiriya & Beyond',
        description:
            'Set your own pace through quiet village roads, shaded forest trails, and golden paddy fields. The most peaceful and eco-friendly way to discover the countryside.',
        accent: 'bg-gradient-to-br from-blue-500 to-indigo-500',
        accentLight: 'bg-blue-50',
        accentText: 'text-blue-600',
        accentBorder: 'border-blue-200',
        image:
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80',
    },
];

export default function PackagesPage() {
    return (
        <div className="min-h-screen bg-[#faf8f4]">
            {/* ═══════ COMPACT HERO ═══════ */}
            <section className="relative pt-14 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-safari-900 via-safari-800 to-[#2a3c28]" />
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_30%_40%,rgba(210,180,140,0.4),transparent_70%)]" />

                <div className="container mx-auto px-6 relative text-white text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Compass size={16} className="text-secondary-400" />
                        <span className="text-secondary-300 text-xs tracking-[0.25em] uppercase font-medium">
                            Curated Experiences
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-500">
                            Packages
                        </span>
                    </h1>
                    <p className="text-safari-200/70 text-base max-w-md mx-auto">
                        Immerse yourself in Sri Lanka&apos;s culture, cuisine, and countryside.
                    </p>
                </div>
            </section>

            {/* ═══════ PACKAGES ═══════ */}
            <section className="container mx-auto px-6 py-16 space-y-24">
                {packages.map((pkg, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <Link
                            key={pkg.slug}
                            href={`/packages/${pkg.slug}`}
                            className="group block"
                        >
                            <div className="relative">
                                {/* Large background number */}
                                <span
                                    className={`absolute -top-8 ${isEven ? '-left-2 md:-left-4' : '-right-2 md:-right-4'
                                        } text-[10rem] md:text-[14rem] font-black text-safari-900/[0.03] leading-none select-none pointer-events-none z-0`}
                                >
                                    {pkg.number}
                                </span>

                                <div
                                    className={`relative z-10 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                        } gap-8 items-center`}
                                >
                                    {/* Image with creative shape */}
                                    <div className="w-full lg:w-[55%] relative">
                                        <div className="relative rounded-[2rem] overflow-hidden aspect-[16/10] shadow-2xl shadow-safari-900/10">
                                            <img
                                                src={pkg.image}
                                                alt={pkg.title}
                                                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Floating price badge */}
                                        <div
                                            className={`absolute -bottom-5 ${isEven ? 'right-6 md:right-10' : 'left-6 md:left-10'
                                                } ${pkg.accent} text-white px-6 py-3 rounded-2xl shadow-xl`}
                                        >
                                            <span className="text-white/60 text-xs block">From</span>
                                            <span className="text-2xl font-bold">${pkg.price}</span>
                                            <span className="text-white/60 text-xs"> /person</span>
                                        </div>

                                        {/* Decorative accent dot */}
                                        <div
                                            className={`hidden lg:block absolute -top-3 ${isEven ? '-right-3' : '-left-3'
                                                } w-6 h-6 ${pkg.accent} rounded-full opacity-60`}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`w-full lg:w-[45%] ${isEven ? 'lg:pl-4' : 'lg:pr-4'
                                            } ${isEven ? '' : 'lg:text-right'}`}
                                    >
                                        {/* Tagline pill */}
                                        <div
                                            className={`inline-flex items-center gap-2 ${pkg.accentLight} ${pkg.accentText} px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5 border ${pkg.accentBorder}`}
                                        >
                                            <Sparkles size={12} />
                                            {pkg.tagline}
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold text-safari-900 mb-4 leading-tight group-hover:text-secondary-700 transition-colors duration-500">
                                            {pkg.title}
                                        </h2>

                                        <p className="text-safari-500 leading-relaxed mb-6">
                                            {pkg.description}
                                        </p>

                                        {/* Meta line */}
                                        <div
                                            className={`flex gap-5 text-sm text-safari-400 mb-8 ${isEven ? '' : 'lg:justify-end'
                                                }`}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={14} /> {pkg.duration}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={14} /> {pkg.location}
                                            </span>
                                        </div>

                                        {/* CTA */}
                                        <div
                                            className={`flex items-center gap-3 ${isEven ? '' : 'lg:justify-end'
                                                }`}
                                        >
                                            <span className="text-safari-900 font-semibold group-hover:text-secondary-600 transition-colors">
                                                Explore this experience
                                            </span>
                                            <div className="w-10 h-10 rounded-full border-2 border-safari-200 group-hover:border-secondary-500 group-hover:bg-secondary-600 flex items-center justify-center transition-all duration-500">
                                                <ArrowRight
                                                    size={16}
                                                    className="text-safari-600 group-hover:text-white transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>

            {/* ═══════ CLOSING CTA ═══════ */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-safari-900" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_50%_50%,rgba(162,91,39,0.2),transparent_70%)]" />

                <div className="container mx-auto px-6 relative text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Combine experiences. Make it yours.
                    </h2>
                    <p className="text-safari-300/70 text-base max-w-lg mx-auto mb-3">
                        Pair any package with a safari for the complete Sri Lankan adventure.
                    </p>
                    <p className="text-safari-400/50 text-sm mb-8">
                        USD 5 advance for packages · USD 8 advance for safaris (non-refundable)
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/booking"
                            className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl inline-flex items-center justify-center gap-2"
                        >
                            Book a Safari
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold py-3.5 px-8 rounded-full transition-all border border-white/10 hover:border-white/20"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
