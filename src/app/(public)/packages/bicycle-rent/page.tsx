import Link from 'next/link';
import { notFound } from 'next/navigation';
import StickyPriceBar from '@/components/packages/StickyPriceBar';
import PackageGallery from '@/components/packages/PackageGallery';
import { getVisiblePackageBySlug } from '@/lib/packages';
import {
    ArrowRight, ArrowLeft, Bike, Leaf, Heart, Users, MapPin, CheckCircle,
    Sun, Mountain, Clock, Quote, Wind, Route,
} from 'lucide-react';
import { getRequestLocale } from '@/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, touristTripSchema } from '@/lib/schema';
import { optimizeCloudinaryUrl } from '@/lib/images';

export const metadata = buildMetadata({
    title: 'Bicycle Rental in Sigiriya, Sri Lanka',
    description: 'Rent a bicycle in Sigiriya, Sri Lanka and explore village roads, paddy landscapes, and scenic viewpoints at your own pace. Flexible hourly and full-day hire.',
    path: '/packages/bicycle-rental',
});

const enCopy = {
        back: 'Back to All Packages',
        packageLabel: 'Experience Package',
        heroLead: 'Choose a Bicycle rental Sigiriya adventure to discover Sri Lankan countryside roads at your own pace in the most eco-friendly way.',
        stickyPrice: 'From USD 5',
        galleryTitle: 'Bicycle Rent in photos',
        heroTitleTop: 'Bicycle',
        heroTitleAccent: 'Rent',
        heroPillDuration: 'Flexible Duration',
        heroPillLocation: 'Sigiriya & Surroundings',
        heroPillPace: 'Self-Paced',
        adventureLabel: 'The Adventure',
        adventureTitleTop: 'Explore the Countryside on',
        adventureTitleAccent: 'Two Wheels',
        adventureBodyOne: 'Pedal through quiet village roads, lush paddy fields, and shaded forest trails while taking in the fresh air and panoramic views.',
        adventureBodyTwo: 'Our well-maintained bicycles are perfect for all skill levels. We provide route suggestions and local tips to help you discover hidden temples, small village shops, and stunning viewpoints that most tourists never see.',
        ridingTips: 'Riding Tips',
        tipsOne: 'Available daily from 6:00 AM to 6:00 PM',
        tipsTwo: 'Suitable for ages 12 and above',
        tipsThree: 'Bring sunscreen, hat, and water bottle',
        tipsFour: 'Comfortable clothing recommended',
        tipsFive: 'Guided group rides available on request',
        quoteBody: 'The best way to discover a place is slowly - on two wheels, with the wind in your hair and the world unfolding around you.',
        quoteAuthor: "A Traveler's Wisdom",
        whyRide: 'Why Ride With Us',
        whyChooseThis: 'Why Choose This',
        whyExperience: 'Experience',
        highlightEcoTitle: 'Eco-Friendly',
        highlightEcoText: 'Explore without leaving a carbon footprint - the greenest way to see the countryside.',
        highlightRoutesTitle: 'Scenic Routes',
        highlightRoutesText: 'Beautiful routes through paddy fields, ancient temples, and village lanes.',
        highlightSkillTitle: 'All Skill Levels',
        highlightSkillText: 'Comfortable bicycles for beginners, families, and experienced riders alike.',
        highlightFreedomTitle: 'Freedom to Explore',
        highlightFreedomText: 'No fixed schedule - ride wherever and however long you want.',
        highlightTimesTitle: 'Best Times to Ride',
        highlightTimesText: 'Early morning or late afternoon - cool breeze and golden light.',
        highlightViewsTitle: 'Stunning Views',
        highlightViewsText: 'Views of Sigiriya Rock, Pidurangala, and surrounding mountain ranges.',
        whatsIncluded: "What's Included",
        includedOne: 'Well-maintained bicycle',
        includedTwo: 'Helmet (on request)',
        includedThree: 'Suggested scenic routes & maps',
        includedFour: 'Local tips and recommendations',
        includedFive: 'Basic repair kit',
        readyTitle: 'Ready to Ride?',
        readyBody: 'Secure your bicycle with a USD 5 advance payment. Contact us to reserve and get personalized route recommendations.',
        cancel: 'Free cancellation up to 24 hours in advance.',
        bookNow: 'Book Now — USD 5 Advance',
        viewOther: 'View Other Packages',
    };

const esCopy = {
        back: 'Volver a todos los paquetes',
        packageLabel: 'Paquete de experiencia',
        heroLead: 'Descubre el impresionante campo de Sri Lanka a tu ritmo en una bicicleta comoda. La forma mas ecologica de explorar.',
        stickyPrice: 'Desde USD 5',
        galleryTitle: 'Alquiler de bicicletas en fotos',
        heroTitleTop: 'Alquiler de',
        heroTitleAccent: 'bicicleta',
        heroPillDuration: 'Duracion flexible',
        heroPillLocation: 'Sigiriya y alrededores',
        heroPillPace: 'A tu ritmo',
        adventureLabel: 'La aventura',
        adventureTitleTop: 'Explora el campo en',
        adventureTitleAccent: 'dos ruedas',
        adventureBodyOne: 'Pedalea por caminos rurales, arrozales y senderos sombreados disfrutando del aire fresco.',
        adventureBodyTwo: 'Nuestras bicicletas son ideales para todos los niveles. Te damos rutas y recomendaciones locales.',
        ridingTips: 'Consejos para pedalear',
        tipsOne: 'Disponible todos los dias de 6:00 AM a 6:00 PM',
        tipsTwo: 'Apto para mayores de 12 anos',
        tipsThree: 'Lleva protector solar, gorra y agua',
        tipsFour: 'Se recomienda ropa comoda',
        tipsFive: 'Paseos guiados disponibles bajo solicitud',
        quoteBody: 'La mejor forma de descubrir un lugar es lentamente: sobre dos ruedas, con el viento y el paisaje alrededor.',
        quoteAuthor: 'Sabiduria de viajero',
        whyRide: 'Por que pedalear con nosotros',
        whyChooseThis: 'Por que elegir esta',
        whyExperience: 'experiencia',
        highlightEcoTitle: 'Eco-amigable',
        highlightEcoText: 'Explora sin dejar huella de carbono - la forma mas verde de conocer el campo.',
        highlightRoutesTitle: 'Rutas escenicas',
        highlightRoutesText: 'Rutas hermosas entre arrozales, templos y caminos de aldea.',
        highlightSkillTitle: 'Todos los niveles',
        highlightSkillText: 'Bicicletas comodas para principiantes, familias y ciclistas con experiencia.',
        highlightFreedomTitle: 'Libertad para explorar',
        highlightFreedomText: 'Sin horario fijo - pedalea donde y cuanto quieras.',
        highlightTimesTitle: 'Mejores horarios',
        highlightTimesText: 'Temprano en la manana o al atardecer, con brisa fresca y luz dorada.',
        highlightViewsTitle: 'Vistas increibles',
        highlightViewsText: 'Vistas de Sigiriya, Pidurangala y montanas cercanas.',
        whatsIncluded: 'Que incluye',
        includedOne: 'Bicicleta en buen estado',
        includedTwo: 'Casco (bajo solicitud)',
        includedThree: 'Rutas sugeridas y mapas',
        includedFour: 'Consejos y recomendaciones locales',
        includedFive: 'Kit basico de reparacion',
        readyTitle: 'Listo para pedalear?',
        readyBody: 'Reserva tu bicicleta con un anticipo de USD 5. Contactanos para obtener rutas personalizadas.',
        cancel: 'Cancelacion gratuita hasta 24 horas antes.',
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

export default async function BicycleRentPage() {
    const locale = await getRequestLocale();
    const t = copyByLocale[(locale as keyof typeof copyByLocale)] ?? copyByLocale.en;

    const pkg = await getVisiblePackageBySlug('bicycle-rent');
    if (!pkg) notFound();
    const galleryImages = pkg.images;
    const highlights = [
        { icon: Leaf, title: t.highlightEcoTitle, text: t.highlightEcoText },
        { icon: MapPin, title: t.highlightRoutesTitle, text: t.highlightRoutesText },
        { icon: Users, title: t.highlightSkillTitle, text: t.highlightSkillText },
        { icon: Heart, title: t.highlightFreedomTitle, text: t.highlightFreedomText },
        { icon: Sun, title: t.highlightTimesTitle, text: t.highlightTimesText },
        { icon: Mountain, title: t.highlightViewsTitle, text: t.highlightViewsText },
    ];
    const schemas = [
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Packages', path: '/packages' },
            { name: 'Bicycle Rental Sigiriya', path: '/packages/bicycle-rental' },
        ]),
        touristTripSchema({
            name: 'Bicycle Rental Sigiriya',
            description: t.heroLead,
            path: '/packages/bicycle-rental',
            price: pkg.price,
            location: 'Sigiriya',
        }),
        faqSchema([
            {
                question: 'Is this bicycle rental suitable for beginners?',
                answer: 'Yes. Routes and recommendations are available for beginners, families, and experienced riders.',
            },
            {
                question: 'How much does bicycle rental cost?',
                answer: `Bicycle rental starts from USD ${pkg.price} with advance booking available online.`,
            },
        ]),
    ];

    return (
        <div className="bg-secondary-50 min-h-screen">
            {schemas.map((schema, index) => (
                <JsonLd key={`bicycle-schema-${index}`} data={schema} />
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
                <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-[500px] h-64 sm:h-80 md:h-[500px] bg-secondary-600/10 rounded-full blur-[80px] md:blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-[400px] h-48 sm:h-64 md:h-[400px] bg-safari-500/8 rounded-full blur-[60px] md:blur-[80px]" />
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
                            {[{ icon: Clock, label: t.heroPillDuration }, { icon: MapPin, label: t.heroPillLocation }, { icon: Wind, label: t.heroPillPace }].map((pill) => (
                                <div key={pill.label} className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm text-safari-100">
                                    <pill.icon size={14} className="text-secondary-400" />{pill.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <StickyPriceBar
                packageName="Bicycle Rent"
                price={`USD ${pkg.price}`}
                advancePrice="USD 5"
                bookHref="/packages/bicycle-rental/booking"
            />

            {galleryImages && (
                <PackageGallery
                    images={galleryImages}
                    title={t.galleryTitle}
                    altPrefix="Bicycle rent"
                />
            )}

            <section className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-safari-100 rounded-full flex items-center justify-center">
                                <Bike size={18} className="text-safari-600" />
                            </div>
                            <span className="text-safari-600 text-sm font-semibold uppercase tracking-wider">{t.adventureLabel}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 mb-4 sm:mb-6 leading-snug">
                            {t.adventureTitleTop}<br className="hidden sm:block" />
                            <span className="text-secondary-600">{t.adventureTitleAccent}</span>
                        </h2>
                        <div className="space-y-3 sm:space-y-4 text-safari-600 text-base sm:text-lg leading-relaxed">
                            <p>{t.adventureBodyOne}</p>
                            <p>{t.adventureBodyTwo}</p>
                        </div>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-safari-100 shadow-sm">
                            <h3 className="text-base sm:text-lg font-bold text-safari-900 mb-4 sm:mb-5 flex items-center gap-2">
                                <Route size={18} className="text-secondary-600" /> {t.ridingTips}
                            </h3>
                            <ul className="space-y-2.5 sm:space-y-3">
                                {[t.tipsOne, t.tipsTwo, t.tipsThree, t.tipsFour, t.tipsFive].map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-2 sm:mt-2.5 flex-shrink-0" />
                                        <span className="text-safari-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-safari-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-secondary-500/10 rounded-full blur-2xl" />
                            <Quote size={20} className="text-secondary-400/40 mb-2 sm:mb-3" />
                            <p className="text-safari-100 text-sm leading-relaxed italic relative">&ldquo;{t.quoteBody}&rdquo;</p>
                            <div className="mt-2 sm:mt-3 flex items-center gap-2"><div className="w-6 h-px bg-secondary-400" /><span className="text-secondary-400 text-sm font-medium">{t.quoteAuthor}</span></div>
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
                            <span className="text-secondary-600 text-sm font-semibold uppercase tracking-[0.15em]">{t.whyRide}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-safari-900 leading-snug">{t.whyChooseThis} <span className="text-secondary-600">{t.whyExperience}</span></h2>
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
                                        <p className="text-safari-600 text-sm leading-relaxed">{item.text}</p>
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
                            <h3 className="text-base sm:text-lg font-bold text-safari-900">{t.whatsIncluded}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                        {[t.includedOne, t.includedTwo, t.includedThree, t.includedFour, t.includedFive].map((item) => (
                            <div key={item} className="flex items-center gap-2.5 sm:gap-3 bg-safari-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                                <CheckCircle size={16} className="text-safari-400 flex-shrink-0" />
                                <span className="text-safari-700 text-sm">{item}</span>
                            </div>
                        ))}
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
                        {t.readyTitle.split(' ').slice(0, -1).join(' ')}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-400">{t.readyTitle.split(' ').slice(-1).join(' ')}</span>
                    </h2>
                    <p className="text-safari-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-3 sm:mb-4">{t.readyBody}</p>
                    <p className="text-safari-500 text-sm mb-6 sm:mb-8 md:mb-10">{t.cancel}</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                        <Link href="/packages/bicycle-rental/booking" className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-2 px-4 sm:py-4 sm:px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl active:scale-95 inline-flex items-center justify-center gap-1.5 sm:gap-3 text-sm sm:text-base">
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
