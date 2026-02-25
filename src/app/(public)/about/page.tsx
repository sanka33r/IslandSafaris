import { Shield, Users, Leaf, Heart, MapPin, Phone, Mail, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'About Us | Island Safaris Sri Lanka',
    description: 'Learn about our passion for wildlife and commitment to responsible tourism in Sri Lanka.',
};

export default function AboutPage() {
    const features = [
        { icon: Shield, title: 'Safety First', desc: 'Expert drivers and well-maintained safari jeeps ensure your complete safety on every adventure.', color: 'from-blue-500 to-blue-600' },
        { icon: Users, title: 'Expert Guides', desc: 'Our local guides know the parks inside out, tracking wildlife and sharing deep ecological knowledge.', color: 'from-secondary-500 to-secondary-600' },
        { icon: Leaf, title: 'Eco Friendly', desc: "We respect nature and adhere to strict park rules. It's their home—we're just the guests.", color: 'from-green-500 to-green-600' },
        { icon: Heart, title: 'Passionate Team', desc: 'We love what we do and want to share the untamed beauty of Sri Lanka with you.', color: 'from-red-500 to-red-600' },
    ];

    const stats = [
        { value: '15+', label: 'Years of Experience' },
        { value: '5000+', label: 'Happy Travelers' },
        { value: '3', label: 'National Parks' },
        { value: '300+', label: 'Elephants in One Gathering' },
    ];

    return (
        <div className="bg-secondary-50 min-h-screen">
            {/* Hero - full-bleed, matches Destinations / Packages */}
            <section className="relative min-h-[75vh] bg-safari-900 overflow-hidden flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://res.cloudinary.com/dxau42ovy/image/upload/v1770663701/IMG_6199.JPG_mxebtr.jpg')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-safari-900/30 via-safari-900/70 to-safari-900/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-safari-900/80 via-transparent to-transparent" />
                <div className="absolute top-0 right-0 w-[min(80vw,500px)] h-[min(80vw,500px)] bg-secondary-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-safari-600/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 pb-16 md:pb-24 pt-24 md:pt-32">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-secondary-400" />
                            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white/95">
                                <Heart size={14} className="text-secondary-400" />
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
                            About Island Safaris
                        </h1>
                        <p className="text-lg md:text-xl text-safari-100/90 leading-relaxed max-w-2xl mb-10">
                            Your trusted partner for authentic wildlife experiences in Minneriya, Kaudulla, and Hurulu Eco Park.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/20">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl md:text-3xl font-bold text-secondary-400">{stat.value}</div>
                                    <div className="text-safari-400 text-xs md:text-sm mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey - two-column layout with image stack */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Image stack - matches home "Rhythm of the Wild" */}
                        <div className="relative order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-safari-200">
                                        <img
                                            src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045462/IMG_6163.JPG_tewuwz.jpg"
                                            alt="Safari wildlife - Island Safaris"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                                        <img
                                            src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045450/IMG_6181_xxilcs.avif"
                                            alt="Elephant corridor - Island Safaris"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-safari-200">
                                        <img
                                            src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045443/IMG_6164_klnyzg.webp"
                                            alt="Safari experience - Island Safaris"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                                        <img
                                            src="https://res.cloudinary.com/dxau42ovy/image/upload/v1772045344/IMG_6203.JPG_nh8v7m.jpg"
                                            alt="Wildlife in the wild - Island Safaris"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-safari-100">
                                <div className="text-sm font-semibold text-safari-900">Elephant Corridor</div>
                                <div className="text-xs text-safari-500">Minneriya • Kaudulla • Hurulu</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                                Our Journey
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-6 leading-tight">
                                Born from a Deep Love for Sri Lanka&apos;s Wild Heart
                            </h2>
                            <p className="text-lg text-safari-600 leading-relaxed mb-6">
                                Island Safaris was founded with a simple mission: to share the magic of Sri Lanka&apos;s
                                incredible wildlife with travelers from around the world. Based in <strong>Habarana</strong>, at the
                                gateway to the Cultural Triangle, we specialize in private jeep safaris to the region&apos;s
                                most famous national parks.
                            </p>
                            <blockquote className="border-l-4 border-secondary-500 pl-6 py-2 mb-6 text-safari-700 italic text-lg">
                                A safari is more than seeing animals—it&apos;s about understanding the ecosystem, respecting
                                the habitats, and creating memories that last a lifetime.
                            </blockquote>
                            <p className="text-safari-600 leading-relaxed mb-6">
                                Our team of experienced drivers not only navigate the terrain expertly but also serve
                                as knowledgeable guides who can read the forest like a book. Over the years, we&apos;ve
                                developed an intimate understanding of the <strong>Great Elephant Migration</strong>—the
                                seasonal movement of hundreds of Asian elephants between Minneriya, Kaudulla, and Hurulu
                                Eco Park. This knowledge ensures you&apos;re always at the right place, at the right time.
                            </p>

                            {/* Location + CTA row */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                <div className="inline-flex items-center gap-4 bg-secondary-50 rounded-2xl px-5 py-4 border border-safari-100">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-safari-100">
                                        <MapPin className="text-secondary-600" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-safari-900">Based in Habarana</div>
                                        <div className="text-safari-600 text-sm">Heart of the Cultural Triangle</div>
                                    </div>
                                </div>
                                <Link
                                    href="/destinations"
                                    className="inline-flex items-center gap-2 text-secondary-600 font-bold hover:gap-3 transition-all shrink-0"
                                >
                                    Explore Our Parks <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 md:py-16 bg-secondary-50">
                <div className="container mx-auto px-6">
                    <div className="mb-12 md:mb-16">
                        <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                            Why Choose Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-3">
                            The Island Safaris Difference
                        </h2>
                        <p className="text-safari-500 text-lg max-w-2xl">
                            We&apos;re not just tour operators—we&apos;re passionate naturalists dedicated to authentic wildlife experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="group p-6 md:p-8 rounded-2xl bg-secondary-50 border border-safari-100 hover:bg-white hover:shadow-lg hover:border-safari-200 transition-all duration-300 flex gap-5 items-start"
                            >
                                <div className={`w-12 h-12 md:w-14 md:h-14 flex-shrink-0 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                                    <f.icon size={26} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-safari-900 mb-2">{f.title}</h3>
                                    <p className="text-safari-600 leading-relaxed text-sm md:text-base">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-12 md:py-16 bg-safari-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-safari-800 to-safari-900" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,500px)] h-[min(80vw,500px)] bg-secondary-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 relative text-center z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Experience the Wild?
                    </h2>
                    <p className="text-safari-300 text-lg max-w-xl mx-auto mb-10">
                        Whether you have questions about our safaris or want to book your adventure,
                        we&apos;re here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <a
                            href="tel:+94770000000"
                            className="inline-flex items-center justify-center gap-3 text-white hover:text-secondary-400 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <Phone size={20} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-safari-400">Call Us</div>
                                <div className="font-semibold">+94 77 000 0000</div>
                            </div>
                        </a>
                        <a
                            href="mailto:info@islandsafaris.com"
                            className="inline-flex items-center justify-center gap-3 text-white hover:text-secondary-400 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <Mail size={20} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-safari-400">Email Us</div>
                                <div className="font-semibold">info@islandsafaris.com</div>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/booking"
                            className="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-xl"
                        >
                            Book Your Safari <ChevronRight size={18} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full border border-white/20 hover:border-white/40 transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
