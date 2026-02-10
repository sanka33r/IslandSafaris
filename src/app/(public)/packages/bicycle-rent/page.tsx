import Link from 'next/link';
import {
    ArrowRight, ArrowLeft, Bike, Leaf, Heart, Users, MapPin, CheckCircle,
    DollarSign, Sun, Mountain, Timer, Clock, Quote, Wind, Route,
} from 'lucide-react';

export const metadata = {
    title: 'Bicycle Rent | Island Safaris Sri Lanka',
    description: 'Explore the scenic Sri Lankan countryside on a comfortable bicycle. Pedal through village roads, paddy fields, and forest trails at your own pace.',
};

const highlights = [
    { icon: Leaf, title: 'Eco-Friendly', text: 'Explore without leaving a carbon footprint — the greenest way to see the countryside.' },
    { icon: MapPin, title: 'Scenic Routes', text: 'Beautiful routes through paddy fields, ancient temples, and village lanes.' },
    { icon: Users, title: 'All Skill Levels', text: 'Comfortable bicycles for beginners, families, and experienced riders alike.' },
    { icon: Heart, title: 'Freedom to Explore', text: 'No fixed schedule — ride wherever and however long you want.' },
    { icon: Sun, title: 'Best Times to Ride', text: 'Early morning or late afternoon — cool breeze and golden light.' },
    { icon: Mountain, title: 'Stunning Views', text: 'Views of Sigiriya Rock, Pidurangala, and surrounding mountain ranges.' },
];

export default function BicycleRentPage() {
    return (
        <div className="bg-secondary-50 min-h-screen">
            <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-950" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
                <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-[500px] h-64 sm:h-80 md:h-[500px] bg-secondary-600/10 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-[400px] h-48 sm:h-64 md:h-[400px] bg-safari-500/8 rounded-full blur-[60px] md:blur-[80px]" />
                <div className="container mx-auto px-4 sm:px-6 relative">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-safari-300 hover:text-white transition-colors mb-6 sm:mb-10 text-sm">
                        <ArrowLeft size={16} /> Back to All Packages
                    </Link>
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="h-px w-8 sm:w-12 bg-secondary-400" />
                            <span className="text-secondary-400 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em]">Experience Package</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
                            Bicycle<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300">Rent</span>
                        </h1>
                        <p className="text-safari-200 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-6 sm:mb-10">
                            Discover the stunning Sri Lankan countryside at your own pace on a comfortable bicycle. The most eco-friendly way to explore.
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {[{ icon: Clock, label: 'Flexible Duration' }, { icon: MapPin, label: 'Sigiriya & Surroundings' }, { icon: Wind, label: 'Self-Paced' }].map((pill) => (
                                <div key={pill.label} className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-safari-100">
                                    <pill.icon size={14} className="text-secondary-400" />{pill.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 md:-mt-10 relative z-10 mb-10 sm:mb-16">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-safari-100 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8 w-full md:w-auto">
                        <div className="text-center md:text-left">
                            <div className="text-xs text-safari-500 uppercase tracking-wider mb-1">Price</div>
                            <div className="text-2xl sm:text-3xl font-bold text-secondary-600">From USD 5 <span className="text-safari-400 text-sm sm:text-base font-normal">/ person</span></div>
                        </div>
                        <div className="hidden sm:block w-px h-10 sm:h-12 bg-safari-100" />
                        <div className="text-center md:text-left">
                            <div className="text-xs text-safari-500 uppercase tracking-wider mb-1">Advance Booking</div>
                            <div className="text-base sm:text-lg font-bold text-safari-800 flex items-center gap-1"><DollarSign size={16} className="text-secondary-600" /> USD 5</div>
                        </div>
                    </div>
                    <Link href="/packages/bicycle-rent/book" className="bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap inline-flex items-center gap-2 w-full md:w-auto justify-center text-sm sm:text-base">
                        Book Now <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-safari-100 rounded-full flex items-center justify-center">
                                <Bike size={18} className="text-safari-600" />
                            </div>
                            <span className="text-safari-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">The Adventure</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 mb-4 sm:mb-6 leading-snug">
                            Explore the Countryside on<br className="hidden sm:block" />
                            <span className="text-secondary-600">Two Wheels</span>
                        </h2>
                        <div className="space-y-3 sm:space-y-4 text-safari-600 text-base sm:text-lg leading-relaxed">
                            <p>Pedal through quiet village roads, lush paddy fields, and shaded forest trails while taking in the fresh air and panoramic views.</p>
                            <p>Our well-maintained bicycles are perfect for all skill levels. We provide route suggestions and local tips to help you discover hidden temples, small village shops, and stunning viewpoints that most tourists never see.</p>
                        </div>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-safari-100 shadow-sm">
                            <h3 className="text-base sm:text-lg font-bold text-safari-900 mb-4 sm:mb-5 flex items-center gap-2">
                                <Route size={18} className="text-secondary-600" /> Riding Tips
                            </h3>
                            <ul className="space-y-2.5 sm:space-y-3">
                                {['Available daily from 6:00 AM to 6:00 PM', 'Suitable for ages 12 and above', 'Bring sunscreen, hat, and water bottle', 'Comfortable clothing recommended', 'Guided group rides available on request'].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-2 sm:mt-2.5 flex-shrink-0" />
                                        <span className="text-safari-700 text-xs sm:text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-safari-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-secondary-500/10 rounded-full blur-2xl" />
                            <Quote size={20} className="text-secondary-400/40 mb-2 sm:mb-3" />
                            <p className="text-safari-100 text-xs sm:text-sm leading-relaxed italic relative">&ldquo;The best way to discover a place is slowly — on two wheels, with the wind in your hair and the world unfolding around you.&rdquo;</p>
                            <div className="mt-2 sm:mt-3 flex items-center gap-2"><div className="w-6 h-px bg-secondary-400" /><span className="text-secondary-400 text-xs font-medium">A Traveler&apos;s Wisdom</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-safari-200 to-safari-200" />
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary-400" /><div className="w-2.5 h-2.5 rounded-full bg-secondary-300" /><div className="w-1.5 h-1.5 rounded-full bg-secondary-400" /></div>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-safari-200 to-safari-200" />
                </div>
            </div>

            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-2xl mb-8 sm:mb-10 md:mb-14">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="h-px w-8 sm:w-10 bg-secondary-400" />
                            <span className="text-secondary-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">Why Ride With Us</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 leading-snug">Why Choose This <span className="text-secondary-600">Experience</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                        {highlights.map((item) => {
                            const Icon = item.icon; return (
                                <div key={item.title} className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-safari-100 hover:border-secondary-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-secondary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-secondary-50 to-safari-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 border border-safari-100">
                                            <Icon size={20} className="text-secondary-600" />
                                        </div>
                                        <h4 className="text-base sm:text-lg font-bold text-safari-900 mb-1.5 sm:mb-2 group-hover:text-secondary-700 transition-colors">{item.title}</h4>
                                        <p className="text-safari-600 text-xs sm:text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
                <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-safari-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="h-px w-6 sm:w-8 bg-secondary-400" />
                        <h3 className="text-base sm:text-lg font-bold text-safari-900">What&apos;s Included</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {['Well-maintained bicycle', 'Helmet (on request)', 'Suggested scenic routes & maps', 'Local tips and recommendations', 'Basic repair kit'].map((item) => (
                            <div key={item} className="flex items-center gap-2.5 sm:gap-3 bg-safari-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                                <CheckCircle size={16} className="text-safari-400 flex-shrink-0" />
                                <span className="text-safari-700 text-xs sm:text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 sm:py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
                <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary-500/10 rounded-full blur-[80px] sm:blur-[100px]" />
                <div className="container mx-auto px-4 sm:px-6 relative text-center">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary-400" /><div className="w-2.5 h-2.5 rounded-full bg-secondary-300" /><div className="w-1.5 h-1.5 rounded-full bg-secondary-400" /></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Ready to{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-400">Ride?</span>
                    </h2>
                    <p className="text-safari-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-3 sm:mb-4">Secure your bicycle with a USD 5 advance payment. Contact us to reserve and get personalized route recommendations.</p>
                    <p className="text-safari-500 text-xs sm:text-sm mb-6 sm:mb-8 md:mb-10">Free cancellation up to 24 hours in advance.</p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link href="/packages/bicycle-rent/book" className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl active:scale-95 inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                            Book Now — USD 5 Advance <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/packages" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all border border-white/20 hover:border-white/40 text-sm sm:text-base">
                            View Other Packages
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
