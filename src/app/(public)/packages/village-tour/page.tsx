import Link from 'next/link';
import { notFound } from 'next/navigation';
import StickyPriceBar from '@/components/packages/StickyPriceBar';
import PackageGallery from '@/components/packages/PackageGallery';
import { getVisiblePackageBySlug } from '@/lib/packages';
import {
    ArrowRight, ArrowLeft, TreePalm, MapPin, Ship, Footprints, Utensils,
    Car, CheckCircle, Heart, Leaf, Camera, Users, Clock, Quote,
} from 'lucide-react';
import { getRequestLocale } from '@/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, touristTripSchema } from '@/lib/schema';
import { optimizeCloudinaryUrl } from '@/lib/images';

export const metadata = buildMetadata({
    title: 'Sigiriya Village Tour Experience',
    description: 'Enjoy an authentic Sigiriya village tour with cart ride, catamaran crossing, village cooking insight, and a traditional Sri Lankan lunch.',
    path: '/packages/village-tour',
});

const enCopy = {
        back: 'Back to All Packages',
        packageLabel: 'Experience Package',
        stickyPrice: 'USD 22',
        galleryTitle: 'Village tour in photos',
        heroTitleTop: 'Sigiriya Village',
        heroTitleAccent: 'Tour',
        heroLead: 'Our Sigiriya village tour is a once-in-a-lifetime way to experience the nature, culture, and authentic lifestyle of rural Sri Lanka.',
        pillDuration: '4-5 Hours',
        pillVillage: 'Sigiriya Village',
        pillGroups: 'Small Groups',
        experienceLabel: 'The Experience',
        experienceTitleTop: 'Journey Into the Heart of',
        experienceTitleAccent: 'Rural Sri Lanka',
        experienceBodyOne: "This isn't just a tour - it's a journey into the soul of rural Sri Lanka. From scenic bullock cart rides to serene lake crossings, every moment connects you with the land and its people.",
        experienceBodyTwo: 'Our experienced guides will share their knowledge about sustainable farming practices and the importance of preserving cultural heritage for future generations.',
        quoteBody: 'The village is where the true spirit of Sri Lanka lives - in the rhythm of the paddy fields, the warmth of the people, and the flavors of home-cooked meals.',
        quoteAuthor: 'Local Wisdom',
        stepByStep: 'Step by Step',
        whatsIncluded: "What's Included",
        yourJourney: 'Your',
        journeyAccent: 'Journey',
        stepLabel: 'Step',
        includesOne: 'Pickup and drop-off',
        includesTwo: 'Bullock cart ride',
        includesThree: 'Catamaran boat ride',
        includesFour: 'Village walk through paddy fields',
        includesFive: 'Cooking demonstration',
        includesSix: 'Traditional rice & curry lunch',
        includesSeven: 'Tuk-tuk return ride',
        immersionBadge: 'Cultural Immersion',
        immersionTitle: 'A True Village Experience',
        immersionBody: 'Every moment is designed to connect you with the land and its people - from scenic cart rides to serene lake crossings.',
        returnRide: 'Return ride included',
        bookThis: 'Book This Experience',
        step1Title: 'Bullock Cart Ride',
        step1Text: "Step back in time and experience one of Sri Lanka's oldest forms of transport.",
        step2Title: 'Boat Ride',
        step2Text: 'Glide across Maha Kimbissa Lake on a serene catamaran ride with panoramic views.',
        step3Title: 'Village Walk & Cooking',
        step3Text: 'Walk through paddy fields to a village home for a traditional cooking demo.',
        step4Title: 'Free Lunch',
        step4Text: 'Enjoy a delicious Sri Lankan-style rice and curry lunch.',
        step5Title: 'Return',
        step5Text: 'Finish with a comfortable tuk-tuk ride back.',
        hl1Title: 'Scenic Views',
        hl1Text: 'Panoramic views of Sigiriya Rock, Pidurangala, and surrounding mountains.',
        hl2Title: 'Eco-Friendly',
        hl2Text: 'Sustainable tourism supporting local communities and cultural heritage.',
        hl3Title: 'Authentic Culture',
        hl3Text: 'Genuine interactions with local villagers and traditional ways of life.',
        hl4Title: 'Personal Touch',
        hl4Text: 'Small group experience with personalized attention and warm hospitality.',
        readyTitle: 'Ready for a Village',
        readyAccent: 'Adventure?',
        ctaBody: 'Secure your spot with just a USD 5 advance payment. The remaining balance is paid on the day of the tour.',
        cancel: 'Free cancellation up to 24 hours before the tour.',
        bookNow: 'Book Now — USD 5 Advance',
        viewOther: 'View Other Packages',
    };

const esCopy = {
        back: 'Volver a todos los paquetes',
        packageLabel: 'Paquete de experiencia',
        stickyPrice: 'USD 22',
        galleryTitle: 'Tour de aldea en fotos',
        heroTitleTop: 'Aldea de Sigiriya',
        heroTitleAccent: 'Tour',
        heroLead: 'Una oportunidad unica para vivir la naturaleza, cultura y estilo de vida autentico de una aldea de Sri Lanka.',
        pillDuration: '4-5 horas',
        pillVillage: 'Aldea de Sigiriya',
        pillGroups: 'Grupos pequenos',
        experienceLabel: 'La experiencia',
        experienceTitleTop: 'Viaje al corazon de',
        experienceTitleAccent: 'Sri Lanka rural',
        experienceBodyOne: 'No es solo un tour: es un viaje al alma rural de Sri Lanka.',
        experienceBodyTwo: 'Nuestros guias comparten conocimientos sobre agricultura sostenible y patrimonio cultural.',
        quoteBody: 'La aldea es donde vive el verdadero espiritu de Sri Lanka, en el ritmo de los arrozales y la calidez de su gente.',
        quoteAuthor: 'Sabiduria local',
        stepByStep: 'Paso a paso',
        whatsIncluded: 'Que incluye',
        yourJourney: 'Tu',
        journeyAccent: 'recorrido',
        stepLabel: 'Paso',
        includesOne: 'Recogida y regreso',
        includesTwo: 'Paseo en carreta',
        includesThree: 'Paseo en catamaran',
        includesFour: 'Caminata por arrozales',
        includesFive: 'Demostracion de cocina',
        includesSix: 'Almuerzo tradicional de arroz y curry',
        includesSeven: 'Regreso en tuk-tuk',
        immersionBadge: 'Inmersion cultural',
        immersionTitle: 'Una experiencia de aldea real',
        immersionBody: 'Cada momento esta pensado para conectarte con la tierra y su gente.',
        returnRide: 'Incluye viaje de regreso',
        bookThis: 'Reservar esta experiencia',
        step1Title: 'Paseo en carreta',
        step1Text: 'Viaja en uno de los medios de transporte mas antiguos de Sri Lanka.',
        step2Title: 'Paseo en bote',
        step2Text: 'Navega el lago Maha Kimbissa en catamaran con vistas panoramicas.',
        step3Title: 'Caminata y cocina',
        step3Text: 'Camina por arrozales hasta una casa local para una demostracion de cocina.',
        step4Title: 'Almuerzo gratis',
        step4Text: 'Disfruta un delicioso almuerzo tradicional de arroz y curry.',
        step5Title: 'Regreso',
        step5Text: 'Finaliza con un comodo regreso en tuk-tuk.',
        hl1Title: 'Vistas escenicas',
        hl1Text: 'Vistas panoramicas de Sigiriya, Pidurangala y montanas cercanas.',
        hl2Title: 'Eco-amigable',
        hl2Text: 'Turismo sostenible que apoya comunidades locales y patrimonio cultural.',
        hl3Title: 'Cultura autentica',
        hl3Text: 'Interacciones genuinas con aldeanos y formas de vida tradicionales.',
        hl4Title: 'Toque personal',
        hl4Text: 'Experiencia en grupos pequenos con atencion personalizada.',
        readyTitle: 'Listo para una',
        readyAccent: 'aventura rural?',
        ctaBody: 'Asegura tu cupo con solo USD 5 de anticipo. El saldo restante se paga el dia del tour.',
        cancel: 'Cancelacion gratuita hasta 24 horas antes del tour.',
        bookNow: 'Reservar ahora — anticipo USD 5',
        viewOther: 'Ver otros paquetes',
    };

const copyByLocale = {
    en: enCopy,
    es: esCopy,
    ru: enCopy,
    fr: enCopy,
    ja: enCopy,
    'zh-CN': enCopy,
    hi: enCopy,
    it: enCopy,
    'pt-BR': enCopy,
    tr: enCopy,
    ar: enCopy,
    pl: enCopy,
    gd: enCopy,
    nl: enCopy,
    de: enCopy,
} as const;

export default async function VillageTourPage() {
    const locale = await getRequestLocale();
    const t = copyByLocale[(locale as keyof typeof copyByLocale)] ?? copyByLocale.en;

    const pkg = await getVisiblePackageBySlug('village-tour');
    if (!pkg) notFound();
    const galleryImages = pkg.images;
    const tourStepsLocalized = [
        { step: '01', icon: MapPin, title: t.step1Title, text: t.step1Text },
        { step: '02', icon: Ship, title: t.step2Title, text: t.step2Text },
        { step: '03', icon: Footprints, title: t.step3Title, text: t.step3Text },
        { step: '04', icon: Utensils, title: t.step4Title, text: t.step4Text },
        { step: '05', icon: Car, title: t.step5Title, text: t.step5Text },
    ];
    const tourHighlightsLocalized = [
        { icon: Camera, title: t.hl1Title, text: t.hl1Text },
        { icon: Leaf, title: t.hl2Title, text: t.hl2Text },
        { icon: Heart, title: t.hl3Title, text: t.hl3Text },
        { icon: Users, title: t.hl4Title, text: t.hl4Text },
    ];
    const schemas = [
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Packages', path: '/packages' },
            { name: 'Sigiriya Village Tour', path: '/packages/village-tour' },
        ]),
        touristTripSchema({
            name: 'Sigiriya Village Tour',
            description: t.heroLead,
            path: '/packages/village-tour',
            price: pkg.price,
            duration: 'PT5H',
            location: 'Sigiriya Village',
        }),
        faqSchema([
            {
                question: 'What activities are included in the village tour?',
                answer: 'The tour includes a cart ride, catamaran crossing, village walk, cooking demonstration, and traditional lunch.',
            },
            {
                question: 'What is the tour price?',
                answer: `The Sigiriya village tour starts from USD ${pkg.price}, with a small advance required for confirmation.`,
            },
        ]),
    ];

    return (
        <div className="bg-secondary-50 min-h-screen">
            {schemas.map((schema, index) => (
                <JsonLd key={`village-schema-${index}`} data={schema} />
            ))}
            <section className="relative py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
                {pkg?.image && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${optimizeCloudinaryUrl(pkg.image, { width: 1920, quality: 72 })})` }}
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
                        <ArrowLeft size={16} /> {t.back}
                    </Link>
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="h-px w-8 sm:w-12 bg-secondary-400" />
                            <span className="text-secondary-400 text-sm font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em]">{t.packageLabel}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]">
                            {t.heroTitleTop}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300">{t.heroTitleAccent}</span>
                        </h1>
                        <p className="text-safari-200 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-6 sm:mb-10">
                            {t.heroLead}
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {[{ icon: Clock, label: t.pillDuration }, { icon: MapPin, label: t.pillVillage }, { icon: Users, label: t.pillGroups }].map((pill) => (
                                <div key={pill.label} className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-safari-100">
                                    <pill.icon size={14} className="text-secondary-400" />{pill.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <StickyPriceBar
                packageName="Sigiriya Village Tour"
                price={`USD ${pkg.price}`}
                advancePrice="USD 5"
                bookHref="/packages/village-tour/booking"
            />

            <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-safari-100 rounded-full flex items-center justify-center">
                                <TreePalm size={18} className="text-safari-600" />
                            </div>
                            <span className="text-safari-600 text-sm font-semibold uppercase tracking-wider">{t.experienceLabel}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 mb-4 sm:mb-6 leading-snug">
                            {t.experienceTitleTop}<br className="hidden sm:block" />
                            <span className="text-secondary-600">{t.experienceTitleAccent}</span>
                        </h2>
                        <div className="space-y-3 sm:space-y-4 text-safari-600 text-base sm:text-lg leading-relaxed">
                            <p>{t.experienceBodyOne}</p>
                            <p>{t.experienceBodyTwo}</p>
                        </div>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-safari-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-secondary-500/10 rounded-full blur-2xl" />
                            <Quote size={20} className="text-secondary-400/40 mb-2 sm:mb-3" />
                            <p className="text-safari-100 text-sm leading-relaxed italic relative">&ldquo;{t.quoteBody}&rdquo;</p>
                            <div className="mt-2 sm:mt-3 flex items-center gap-2"><div className="w-6 h-px bg-secondary-400" /><span className="text-secondary-400 text-sm font-medium">{t.quoteAuthor}</span></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {tourHighlightsLocalized.map((h) => {
                                const Icon = h.icon; return (
                                    <div key={h.title} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-safari-100 group hover:shadow-md transition-all duration-300">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-secondary-50 to-safari-50 rounded-lg flex items-center justify-center mb-2 sm:mb-3 border border-safari-100 group-hover:scale-110 transition-transform">
                                            <Icon size={16} className="text-secondary-600" />
                                        </div>
                                        <div className="text-sm font-bold text-safari-900 mb-1">{h.title}</div>
                                        <p className="text-safari-600 text-sm leading-relaxed">{h.text}</p>
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
                    title={t.galleryTitle}
                    altPrefix="Village tour"
                />
            )}

            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-2xl mb-8 sm:mb-10 md:mb-14">
                        <div className="flex items-center gap-3 mb-3 sm:mb-4">
                            <div className="h-px w-8 sm:w-10 bg-secondary-400" />
                            <span className="text-secondary-600 text-sm font-semibold uppercase tracking-[0.15em]">{t.stepByStep}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 leading-snug">{t.yourJourney} <span className="text-secondary-600">{t.journeyAccent}</span></h2>
                    </div>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-safari-200 via-secondary-300 to-safari-200 hidden lg:block" />
                        <div className="space-y-4 sm:space-y-6">
                            {tourStepsLocalized.map((item) => {
                                const Icon = item.icon; return (
                                    <div key={item.step} className="relative group">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-start">
                                            <div className="lg:col-span-1 flex items-center gap-3 lg:flex-col lg:items-center">
                                                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-xl sm:rounded-2xl border-2 border-safari-200 group-hover:border-secondary-400 flex items-center justify-center shadow-sm transition-colors duration-300 flex-shrink-0">
                                                    <Icon size={20} className="text-secondary-600" />
                                                </div>
                                                <div className="lg:hidden"><span className="text-sm font-bold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{t.stepLabel} {item.step}</span></div>
                                            </div>
                                            <div className="lg:col-span-11 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-safari-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                                <div className="hidden lg:flex items-center gap-3 mb-3">
                                                    <span className="text-sm font-bold text-secondary-600 bg-secondary-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{t.stepLabel} {item.step}</span>
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
                            <h3 className="text-base sm:text-lg font-bold text-safari-900">{t.whatsIncluded}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {[t.includesOne, t.includesTwo, t.includesThree, t.includesFour, t.includesFive, t.includesSix, t.includesSeven].map((item) => (
                                <div key={item} className="flex items-center gap-2.5 sm:gap-3 bg-safari-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                                    <CheckCircle size={16} className="text-safari-400 flex-shrink-0" />
                                    <span className="text-safari-700 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full" />
                        <div className="absolute -left-4 -top-4 w-16 sm:w-20 h-16 sm:h-20 bg-white/5 rounded-full" />
                        <div className="relative">
                            <span className="inline-block bg-white/20 text-sm font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-3 sm:mb-4">{t.immersionBadge}</span>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t.immersionTitle}</h3>
                            <p className="text-secondary-100 leading-relaxed mb-3 sm:mb-4 text-sm">{t.immersionBody}</p>
                            <div className="flex items-center gap-2 mb-4 sm:mb-6"><Car size={16} className="text-secondary-200" /><span className="text-secondary-100 text-sm">{t.returnRide}</span></div>
                        </div>
                        <Link href="/contact" className="relative inline-flex items-center justify-center gap-2 bg-white text-secondary-700 font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-full hover:bg-secondary-50 transition-all shadow-lg hover:scale-105 active:scale-95 text-sm">
                            {t.bookThis} <ArrowRight size={16} />
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
                        {t.readyTitle}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-400">{t.readyAccent}</span>
                    </h2>
                    <p className="text-safari-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-3 sm:mb-4">{t.ctaBody}</p>
                    <p className="text-safari-500 text-sm mb-6 sm:mb-8 md:mb-10">{t.cancel}</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                        <Link href="/packages/village-tour/booking" className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-2 px-4 sm:py-4 sm:px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl active:scale-95 inline-flex items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-base">
                            {t.bookNow} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
                        </Link>
                        <Link href="/packages" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-2 px-4 sm:py-4 sm:px-8 rounded-full transition-all border border-white/20 hover:border-white/40 text-sm sm:text-base">
                            {t.viewOther}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
