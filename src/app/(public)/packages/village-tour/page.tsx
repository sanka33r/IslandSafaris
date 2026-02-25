import Link from 'next/link';
import StickyPriceBar from '@/components/packages/StickyPriceBar';
import PackageGallery from '@/components/packages/PackageGallery';
import { packages } from '../page';
import {
    ArrowRight, ArrowLeft, TreePalm, MapPin, Ship, Footprints, Utensils,
    Car, CheckCircle, Heart, Leaf, Camera, Users, Clock, Quote,
} from 'lucide-react';

export const metadata = {
    title: 'Sigiriya Village Tour | Island Safaris Sri Lanka',
    description: 'Experience the authentic lifestyle of a Sri Lankan village — bullock cart rides, catamaran boat rides, village walks, and traditional cooking demonstrations.',
};

const tourSteps = [
    { step: '01', icon: MapPin, title: 'Bullock Cart Ride', text: "Step back in time and experience one of Sri Lanka's oldest forms of transport. Travel along a scenic route through the roots and rocks of nature, leading to the breathtaking Maha Kimbissa Lake." },
    { step: '02', icon: Ship, title: 'Boat Ride', text: "Glide across Maha Kimbissa Lake on a serene catamaran ride. Enjoy panoramic views of Sigiriya and Pidurangala Rocks, and take in the lake's rich biodiversity — a feast for the eyes and soul." },
    { step: '03', icon: Footprints, title: 'Village Walk & Cooking', text: 'Take a short walk through lush paddy fields and vegetable gardens to a local village house, where a village lady will demonstrate traditional Sri Lankan cooking.' },
    { step: '04', icon: Utensils, title: 'Free Lunch', text: 'Relax and savor a delicious traditional Sri Lankan-style rice and curry lunch, freshly prepared during the cooking demonstration.' },
    { step: '05', icon: Car, title: 'Return', text: 'Finish the tour with a comfortable tuk-tuk ride back to your hotel or the tour starting point.' },
];

const tourHighlights = [
    { icon: Camera, title: 'Scenic Views', text: 'Panoramic views of Sigiriya Rock, Pidurangala, and surrounding mountain ranges.' },
    { icon: Leaf, title: 'Eco-Friendly', text: 'Sustainable tourism supporting local communities and cultural heritage.' },
    { icon: Heart, title: 'Authentic Culture', text: 'Genuine interactions with local villagers and traditional ways of life.' },
    { icon: Users, title: 'Personal Touch', text: 'Small group experience with personalized attention and warm hospitality.' },
];

export default function VillageTourPage() {
    const pkg = packages.find((p) => p.slug === 'village-tour');
    const galleryImages = pkg && 'images' in pkg ? pkg.images : undefined;

    return (
        <div className="bg-secondary-50 min-h-screen">
            <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
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
                <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-[500px] h-64 sm:h-80 md:h-[500px] bg-safari-500/10 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-[400px] h-48 sm:h-64 md:h-[400px] bg-secondary-400/8 rounded-full blur-[60px] md:blur-[80px]" />
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
                            Sigiriya Village<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300">Tour</span>
                        </h1>
                        <p className="text-safari-200 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-6 sm:mb-10">
                            A once-in-a-lifetime opportunity to experience the nature, culture, and authentic lifestyle of a Sri Lankan village.
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {[{ icon: Clock, label: '4-5 Hours' }, { icon: MapPin, label: 'Sigiriya Village' }, { icon: Users, label: 'Small Groups' }].map((pill) => (
                                <div key={pill.label} className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-safari-100">
                                    <pill.icon size={14} className="text-secondary-400" />{pill.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <StickyPriceBar
                packageName="Sigiriya Village Tour"
                price="USD 22"
                advancePrice="USD 5"
                bookHref="/packages/village-tour/book"
            />

            <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-safari-100 rounded-full flex items-center justify-center">
                                <TreePalm size={18} className="text-safari-600" />
                            </div>
                            <span className="text-safari-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">The Experience</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 mb-4 sm:mb-6 leading-snug">
                            Journey Into the Heart of<br className="hidden sm:block" />
                            <span className="text-secondary-600">Rural Sri Lanka</span>
                        </h2>
                        <div className="space-y-3 sm:space-y-4 text-safari-600 text-base sm:text-lg leading-relaxed">
                            <p>This isn&apos;t just a tour — it&apos;s a journey into the soul of rural Sri Lanka. From scenic bullock cart rides to serene lake crossings, every moment connects you with the land and its people.</p>
                            <p>Our experienced guides will share their knowledge about sustainable farming practices and the importance of preserving cultural heritage for future generations.</p>
                        </div>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-safari-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-secondary-500/10 rounded-full blur-2xl" />
                            <Quote size={20} className="text-secondary-400/40 mb-2 sm:mb-3" />
                            <p className="text-safari-100 text-xs sm:text-sm leading-relaxed italic relative">&ldquo;The village is where the true spirit of Sri Lanka lives — in the rhythm of the paddy fields, the warmth of the people, and the flavors of home-cooked meals.&rdquo;</p>
                            <div className="mt-2 sm:mt-3 flex items-center gap-2"><div className="w-6 h-px bg-secondary-400" /><span className="text-secondary-400 text-xs font-medium">Local Wisdom</span></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {tourHighlights.map((h) => {
                                const Icon = h.icon; return (
                                    <div key={h.title} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-safari-100 group hover:shadow-md transition-all duration-300">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-secondary-50 to-safari-50 rounded-lg flex items-center justify-center mb-2 sm:mb-3 border border-safari-100 group-hover:scale-110 transition-transform">
                                            <Icon size={16} className="text-secondary-600" />
                                        </div>
                                        <div className="text-xs sm:text-sm font-bold text-safari-900 mb-1">{h.title}</div>
                                        <p className="text-safari-600 text-[10px] sm:text-xs leading-relaxed">{h.text}</p>
                                    </div>
                                );
                            })}
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
            {/* Gallery */}
            {galleryImages && (
                <PackageGallery
                    images={galleryImages}
                    title="Village tour in photos"
                    altPrefix="Village tour"
                />
            )}

            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-2xl mb-8 sm:mb-10 md:mb-14">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="h-px w-8 sm:w-10 bg-secondary-400" />
                            <span className="text-secondary-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">Step by Step</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 leading-snug">Your <span className="text-secondary-600">Journey</span></h2>
                    </div>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-safari-200 via-secondary-300 to-safari-200 hidden lg:block" />
                        <div className="space-y-4 sm:space-y-6">
                            {tourSteps.map((item) => {
                                const Icon = item.icon; return (
                                    <div key={item.step} className="relative group">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-start">
                                            <div className="lg:col-span-1 flex items-center gap-3 lg:flex-col lg:items-center">
                                                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-xl sm:rounded-2xl border-2 border-safari-200 group-hover:border-secondary-400 flex items-center justify-center shadow-sm transition-colors duration-300 flex-shrink-0">
                                                    <Icon size={20} className="text-secondary-600" />
                                                </div>
                                                <div className="lg:hidden"><span className="text-xs font-bold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step {item.step}</span></div>
                                            </div>
                                            <div className="lg:col-span-11 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-safari-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                                <div className="hidden lg:flex items-center gap-3 mb-3">
                                                    <span className="text-xs font-bold text-secondary-600 bg-secondary-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Step {item.step}</span>
                                                    <h3 className="text-xl font-bold text-safari-900 group-hover:text-secondary-600 transition-colors">{item.title}</h3>
                                                </div>
                                                <h3 className="lg:hidden text-base sm:text-lg font-bold text-safari-900 mb-2 group-hover:text-secondary-600 transition-colors">{item.title}</h3>
                                                <p className="text-safari-600 text-sm sm:text-base leading-relaxed">{item.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
                    <div className="md:col-span-3 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-safari-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="h-px w-6 sm:w-8 bg-secondary-400" />
                            <h3 className="text-base sm:text-lg font-bold text-safari-900">What&apos;s Included</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {['Pickup and drop-off', 'Bullock cart ride', 'Catamaran boat ride', 'Village walk through paddy fields', 'Cooking demonstration', 'Traditional rice & curry lunch', 'Tuk-tuk return ride'].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 sm:gap-3 bg-safari-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                                    <CheckCircle size={16} className="text-safari-400 flex-shrink-0" />
                                    <span className="text-safari-700 text-xs sm:text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full" />
                        <div className="absolute -left-4 -top-4 w-16 sm:w-20 h-16 sm:h-20 bg-white/5 rounded-full" />
                        <div className="relative">
                            <span className="inline-block bg-white/20 text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-3 sm:mb-4">Cultural Immersion</span>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">A True Village Experience</h3>
                            <p className="text-secondary-100 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm">Every moment is designed to connect you with the land and its people — from scenic cart rides to serene lake crossings.</p>
                            <div className="flex items-center gap-2 mb-4 sm:mb-6"><Car size={16} className="text-secondary-200" /><span className="text-secondary-100 text-xs">Return ride included</span></div>
                        </div>
                        <Link href="/contact" className="relative inline-flex items-center justify-center gap-2 bg-white text-secondary-700 font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-full hover:bg-secondary-50 transition-all shadow-lg hover:scale-105 active:scale-95 text-xs sm:text-sm">
                            Book This Experience <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>



            <section className="py-14 sm:py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-safari-900 via-safari-800 to-safari-900" />
                <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-secondary-500/10 rounded-full blur-[80px] sm:blur-[100px]" />
                <div className="container mx-auto px-4 sm:px-6 relative text-center">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary-400" /><div className="w-2.5 h-2.5 rounded-full bg-secondary-300" /><div className="w-1.5 h-1.5 rounded-full bg-secondary-400" /></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                        Ready for a Village{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-400">Adventure?</span>
                    </h2>
                    <p className="text-safari-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-3 sm:mb-4">Secure your spot with just a USD 5 advance payment. The remaining balance is paid on the day of the tour.</p>
                    <p className="text-safari-500 text-xs sm:text-sm mb-6 sm:mb-8 md:mb-10">Free cancellation up to 24 hours before the tour.</p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link href="/packages/village-tour/book" className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl active:scale-95 inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
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
