import { Shield, Users, Leaf, Heart, MapPin, Phone, Mail, Camera } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'About Us | Island Safaris Sri Lanka',
    description: 'Learn about our passion for wildlife and commitment to responsible tourism in Sri Lanka.',
};

export default function AboutPage() {
    const features = [
        { icon: Shield, title: 'Safety First', desc: 'Expert drivers and well-maintained safari jeeps ensure your complete safety on every adventure.', color: 'from-blue-500 to-blue-600' },
        { icon: Users, title: 'Expert Guides', desc: 'Our local guides know the parks inside out, tracking wildlife and sharing deep ecological knowledge.', color: 'from-secondary-500 to-secondary-600' },
        { icon: Leaf, title: 'Eco Friendly', desc: 'We respect nature and adhere to strict park rules. It\'s their home—we\'re just the guests.', color: 'from-green-500 to-green-600' },
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
            {/* Hero Section */}
            <div className="relative py-24 md:py-32 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900 overflow-hidden">
                
                <div className="container mx-auto px-6 relative text-center text-white">
                    <span className="inline-flex items-center gap-2 bg-secondary-600/20 backdrop-blur-sm border border-secondary-400/30 rounded-full px-4 py-2 mb-6">
                        <Heart size={16} className="text-secondary-400" />
                        <span className="text-secondary-300 text-sm font-medium">Our Story</span>
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About Island Safaris</h1>
                    <p className="text-safari-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Your trusted partner for authentic wildlife experiences in Minneriya, Kaudulla, and Hurulu Eco Park.
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="container mx-auto px-6 -mt-10 relative z-10 mb-16">
                <div className="bg-white rounded-2xl shadow-xl border border-safari-100 p-6 md:p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-secondary-600 mb-1">{stat.value}</div>
                                <div className="text-safari-600 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image Grid */}
                        <div className="relative order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="aspect-[3/4] rounded-3xl bg-safari-200 overflow-hidden shadow-xl">
                                        <div className="w-full h-full bg-gradient-to-br from-safari-400 to-safari-600 flex items-center justify-center">
                                            <Camera className="text-white/30" size={48} />
                                        </div>
                                    </div>
                                    <div className="aspect-square rounded-3xl bg-secondary-200 overflow-hidden shadow-xl">
                                        <div className="w-full h-full bg-gradient-to-br from-secondary-300 to-secondary-500 flex items-center justify-center">
                                            <Camera className="text-white/30" size={48} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="aspect-square rounded-3xl bg-safari-300 overflow-hidden shadow-xl">
                                        <div className="w-full h-full bg-gradient-to-br from-safari-300 to-safari-500 flex items-center justify-center">
                                            <Camera className="text-white/30" size={48} />
                                        </div>
                                    </div>
                                    <div className="aspect-[3/4] rounded-3xl bg-secondary-300 overflow-hidden shadow-xl">
                                        <div className="w-full h-full bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
                                            <Camera className="text-white/30" size={48} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-safari-100 hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-secondary-100 rounded-xl flex items-center justify-center">
                                        <MapPin className="text-secondary-600" size={28} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-safari-900">Based in Habarana</div>
                                        <div className="text-safari-600 text-sm">Heart of the Cultural Triangle</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                                Our Journey
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-safari-900 mb-6 leading-tight">
                                Born from a Deep Love for Sri Lanka&apos;s Wild Heart
                            </h2>
                            <div className="space-y-4 text-safari-600 leading-relaxed">
                                <p>
                                    Island Safaris was founded with a simple mission: to share the magic of Sri Lanka&apos;s 
                                    incredible wildlife with travelers from around the world. Based in Habarana, at the 
                                    gateway to the Cultural Triangle, we specialize in private jeep safaris to the region&apos;s 
                                    most famous national parks.
                                </p>
                                <p>
                                    We believe that a safari is more than just seeing animals—it&apos;s about understanding 
                                    the ecosystem, respecting the habitats, and creating memories that last a lifetime. 
                                    Our team of experienced drivers not only navigate the terrain expertly but also serve 
                                    as knowledgeable guides who can read the forest like a book.
                                </p>
                                <p>
                                    Over the years, we&apos;ve developed an intimate understanding of the <strong>Great Elephant 
                                    Migration</strong>—the seasonal movement of hundreds of Asian elephants between Minneriya, 
                                    Kaudulla, and Hurulu Eco Park. This knowledge ensures you&apos;re always at the right 
                                    place, at the right time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-safari-900 mb-4">
                            The Island Safaris Difference
                        </h2>
                        <p className="text-safari-600 text-lg max-w-2xl mx-auto">
                            We&apos;re not just tour operators—we&apos;re passionate naturalists dedicated to authentic wildlife experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-secondary-50 border border-safari-100 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <f.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-safari-900 mb-3">{f.title}</h3>
                                <p className="text-safari-600 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 md:py-24 bg-safari-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-safari-900 via-safari-800 to-safari-900" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />
                
                <div className="container mx-auto px-6 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Experience the Wild?
                            </h2>
                            <p className="text-safari-300 text-lg leading-relaxed mb-8">
                                Whether you have questions about our safaris or want to book your adventure, 
                                we&apos;re here to help. Reach out and let&apos;s plan your unforgettable journey.
                            </p>
                            <div className="space-y-4">
                                <a href="tel:+94770000000" className="flex items-center gap-4 text-white hover:text-secondary-400 transition-colors">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-safari-400">Call Us</div>
                                        <div className="font-semibold">+94 77 000 0000</div>
                                    </div>
                                </a>
                                <a href="mailto:info@islandsafaris.com" className="flex items-center gap-4 text-white hover:text-secondary-400 transition-colors">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-safari-400">Email Us</div>
                                        <div className="font-semibold">info@islandsafaris.com</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                            <Link
                                href="/booking"
                                className="bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl text-center"
                            >
                                Book Your Safari
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/20 hover:border-white/40 text-center"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
