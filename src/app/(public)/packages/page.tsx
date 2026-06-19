import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowRight,
    Compass,
    Clock,
    MapPin,
    Sparkles,
} from 'lucide-react';
import { getRequestLocale } from '@/i18n/locale';
import { getVisiblePackages } from '@/lib/packages';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, touristTripSchema } from '@/lib/schema';
import { optimizeCloudinaryUrl } from '@/lib/images';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';

export const metadata = buildMetadata({
    title: 'Sigiriya Experiences: Village Tour, Cooking, Bicycle Rental',
    description: 'Compare our top Sigiriya experiences in one place: village tour, organic cooking class, and bicycle rental packages with simple booking.',
    path: '/packages',
});

const enCopy = {
        curated: 'Curated Experiences',
        packages: 'Packages',
        heroDescription: "Immerse yourself in Sri Lanka's culture, cuisine, and countryside.",
        exploreExperience: 'Explore this experience',
        from: 'From',
        perPerson: '/person',
        closingTitle: 'Combine experiences. Make it yours.',
        closingDescription: 'Pair any package with a safari for the complete Sri Lankan adventure.',
        closingNote: 'USD 5 advance for packages · USD 8 advance for safaris (non-refundable)',
        bookSafari: 'Book a Safari',
        contact: 'Get in Touch',
        cookingTitle: 'Organic Cooking Experience',
        cookingTagline: 'Farm to Table',
        cookingDescription:
            'Step into a peaceful organic garden and learn to cook authentic Sri Lankan dishes using handpicked, homegrown ingredients. A true farm-to-table experience guided by a local host.',
        villageTitle: 'Sigiriya Village Tour',
        villageTagline: 'Cultural Immersion',
        villageDescription:
            'Drift through the countryside on a bullock cart, glide across a serene lake by catamaran, and walk through lush paddy fields to a village home. A journey into the soul of rural Sri Lanka.',
        bicycleTitle: 'Bicycle Rent',
        bicycleTagline: 'Explore Freely',
        bicycleDescription:
            'Set your own pace through quiet village roads, shaded forest trails, and golden paddy fields. The most peaceful and eco-friendly way to discover the countryside.',
        hours45: '4-5 Hours',
        flexible: 'Flexible',
        sigiriya: 'Sigiriya',
        sigiriyaVillage: 'Sigiriya Village',
        sigiriyaBeyond: 'Sigiriya & Beyond',
    };

const esCopy = {
        curated: 'Experiencias seleccionadas',
        packages: 'Paquetes',
        heroDescription: 'Sumérgete en la cultura, cocina y paisajes de Sri Lanka.',
        exploreExperience: 'Explora esta experiencia',
        from: 'Desde',
        perPerson: '/persona',
        closingTitle: 'Combina experiencias. Hazla tuya.',
        closingDescription: 'Combina cualquier paquete con un safari para la aventura completa en Sri Lanka.',
        closingNote: 'Anticipo USD 5 para paquetes · Anticipo USD 8 para safaris (no reembolsable)',
        bookSafari: 'Reservar un safari',
        contact: 'Contáctanos',
        cookingTitle: 'Experiencia de cocina organica',
        cookingTagline: 'De la granja a la mesa',
        cookingDescription:
            'Entra en un tranquilo jardin organico y aprende a cocinar platos autenticos de Sri Lanka con ingredientes frescos cultivados en casa.',
        villageTitle: 'Tour de aldea en Sigiriya',
        villageTagline: 'Inmersion cultural',
        villageDescription:
            'Recorre el campo en carreta, cruza un lago en catamaran y camina por arrozales hasta una casa local.',
        bicycleTitle: 'Alquiler de bicicleta',
        bicycleTagline: 'Explora libremente',
        bicycleDescription:
            'Recorre caminos rurales, senderos boscosos y campos dorados a tu propio ritmo.',
        hours45: '4-5 horas',
        flexible: 'Flexible',
        sigiriya: 'Sigiriya',
        sigiriyaVillage: 'Aldea de Sigiriya',
        sigiriyaBeyond: 'Sigiriya y alrededores',
    };

const copyByLocale = {
    en: enCopy,
    es: esCopy,
    ru: {
        ...enCopy,
        curated: 'Тщательно подобранные впечатления',
        packages: 'Пакеты',
        exploreExperience: 'Подробнее о пакете',
        bookSafari: 'Забронировать сафари',
        contact: 'Связаться',
    },
    fr: {
        ...enCopy,
        curated: 'Experiences selectionnees',
        packages: 'Forfaits',
        exploreExperience: 'Explorer cette experience',
        bookSafari: 'Reserver un safari',
        contact: 'Nous contacter',
    },
    ja: {
        ...enCopy,
        curated: '厳選された体験',
        packages: 'パッケージ',
        exploreExperience: 'この体験を見る',
        bookSafari: 'サファリを予約',
        contact: 'お問い合わせ',
    },
    'zh-CN': {
        ...enCopy,
        curated: '精选体验',
        packages: '套餐',
        exploreExperience: '查看此体验',
        bookSafari: '预订Safari',
        contact: '联系我们',
    },
    hi: {
        ...enCopy,
        curated: 'चयनित अनुभव',
        packages: 'पैकेज',
        exploreExperience: 'इस अनुभव को देखें',
        bookSafari: 'सफारी बुक करें',
        contact: 'संपर्क करें',
    },
    it: {
        ...enCopy,
        curated: 'Esperienze selezionate',
        packages: 'Pacchetti',
        exploreExperience: 'Esplora questa esperienza',
        bookSafari: 'Prenota un safari',
        contact: 'Contattaci',
    },
    'pt-BR': {
        ...enCopy,
        curated: 'Experiencias selecionadas',
        packages: 'Pacotes',
        exploreExperience: 'Explorar esta experiencia',
        bookSafari: 'Reservar um safari',
        contact: 'Fale conosco',
    },
    tr: {
        ...enCopy,
        curated: 'Secilmis deneyimler',
        packages: 'Paketler',
        exploreExperience: 'Bu deneyimi kesfet',
        bookSafari: 'Safari rezervasyonu yap',
        contact: 'Bize ulasin',
    },
    ar: {
        ...enCopy,
        curated: 'تجارب مختارة',
        packages: 'الباقات',
        exploreExperience: 'استكشف هذه التجربة',
        bookSafari: 'احجز سفاري',
        contact: 'تواصل معنا',
    },
    pl: {
        ...enCopy,
        curated: 'Wybrane doswiadczenia',
        packages: 'Pakiety',
        exploreExperience: 'Poznaj to doswiadczenie',
        bookSafari: 'Zarezerwuj safari',
        contact: 'Skontaktuj sie',
    },
    gd: {
        ...enCopy,
        curated: 'Eòlasan taghte',
        packages: 'Pasganan',
        exploreExperience: 'Rannsaich an t-eòlas seo',
        bookSafari: 'Glèidh safari',
        contact: 'Cuir fios',
    },
    nl: {
        ...enCopy,
        curated: 'Geselecteerde ervaringen',
        packages: 'Pakketten',
        exploreExperience: 'Verken deze ervaring',
        bookSafari: 'Boek een safari',
        contact: 'Neem contact op',
    },
    de: {
        ...enCopy,
        curated: 'Ausgewahlte Erlebnisse',
        packages: 'Pakete',
        exploreExperience: 'Dieses Erlebnis entdecken',
        bookSafari: 'Safari buchen',
        contact: 'Kontakt',
    },
} as const;

export default async function PackagesPage() {
    const locale = await getRequestLocale();
    const t = copyByLocale[(locale as keyof typeof copyByLocale)] ?? copyByLocale.en;
    const packages = await getVisiblePackages();
    const localizedPackages = packages.map((pkg) => {
        if (pkg.slug === 'cooking-class') {
            return {
                ...pkg,
                title: t.cookingTitle,
                tagline: t.cookingTagline,
                description: t.cookingDescription,
                duration: t.hours45,
                location: t.sigiriya,
            };
        }

        if (pkg.slug === 'village-tour') {
            return {
                ...pkg,
                title: t.villageTitle,
                tagline: t.villageTagline,
                description: t.villageDescription,
                duration: t.hours45,
                location: t.sigiriyaVillage,
            };
        }

        return {
            ...pkg,
            title: t.bicycleTitle,
            tagline: t.bicycleTagline,
            description: t.bicycleDescription,
            duration: t.flexible,
            location: t.sigiriyaBeyond,
        };
    });
    const schemas = [
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Packages', path: '/packages' },
        ]),
        faqSchema([
            {
                question: 'Which Sigiriya experience should I choose?',
                answer: 'Choose village tour for culture, cooking class for food immersion, or bicycle rental for flexible exploration.',
            },
            {
                question: 'How much is the advance payment?',
                answer: 'Packages typically require a small USD 5 advance to secure availability.',
            },
        ]),
        ...packages.map((pkg) =>
            touristTripSchema({
                name: pkg.title,
                description: pkg.description,
                path: pkg.slug === 'bicycle-rent' ? '/packages/bicycle-rental' : `/packages/${pkg.slug}`,
                price: pkg.price,
                location: pkg.location,
            })
        ),
    ];

    return (
        <div className="min-h-screen bg-[#faf8f4]">
            {schemas.map((schema, index) => (
                <JsonLd key={`packages-schema-${index}`} data={schema} />
            ))}
            <div className="container mx-auto px-6 pt-6">
                <BreadcrumbNav
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Packages' },
                    ]}
                />
            </div>
            {/* ═══════ COMPACT HERO ═══════ */}
            <section className="relative pt-14 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-safari-900 via-safari-800 to-[#2a3c28]" />
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_30%_40%,rgba(210,180,140,0.4),transparent_70%)]" />

                <div className="container mx-auto px-6 relative text-white text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Compass size={16} className="text-secondary-400" />
                        <span className="text-secondary-300 text-sm tracking-[0.25em] uppercase font-medium">
                            {t.curated}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-secondary-500">
                            {t.packages}
                        </span>
                    </h1>
                    <p className="text-safari-200/70 text-base max-w-md mx-auto">
                        {t.heroDescription}
                    </p>
                </div>
            </section>

            {/* ═══════ PACKAGES ═══════ */}
            <section className="container mx-auto px-6 py-16 space-y-24">
                {localizedPackages.map((pkg, index) => {
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
                                            <Image
                                                src={optimizeCloudinaryUrl(pkg.image, { width: 1200, quality: 70 })}
                                                alt={`${pkg.title} experience in Sigiriya Sri Lanka`}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 55vw"
                                                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Floating price badge */}
                                        <div
                                            className={`absolute -bottom-5 ${isEven ? 'right-6 md:right-10' : 'left-6 md:left-10'
                                                } ${pkg.accent} text-white px-6 py-3 rounded-2xl shadow-xl`}
                                        >
                                            <span className="text-white/60 text-xs block">{t.from}</span>
                                            <span className="text-2xl font-bold">${pkg.price}</span>
                                            <span className="text-white/60 text-sm"> {t.perPerson}</span>
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
                                            className={`inline-flex items-center gap-2 ${pkg.accentLight} ${pkg.accentText} px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-5 border ${pkg.accentBorder}`}
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
                                                {t.exploreExperience}
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
                        {t.closingTitle}
                    </h2>
                    <p className="text-safari-300/70 text-base max-w-lg mx-auto mb-3">
                        {t.closingDescription}
                    </p>
                    <p className="text-safari-400/50 text-sm mb-8">
                        {t.closingNote}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/booking"
                            className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl inline-flex items-center justify-center gap-2"
                        >
                            {t.bookSafari}
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-semibold py-3.5 px-8 rounded-full transition-all border border-white/10 hover:border-white/20"
                        >
                            {t.contact}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
