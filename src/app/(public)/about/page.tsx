import { Shield, Users, Leaf, Heart, MapPin, Phone, Mail, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getRequestLocale } from '@/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { optimizeCloudinaryUrl } from '@/lib/images';

export const metadata = buildMetadata({
    title: 'About Island Safaris',
    description: 'Learn how our local team plans ethical private safaris across Minneriya, Kaudulla, and Hurulu Eco Park with trusted drivers and flexible support.',
    path: '/about',
});

const enCopy = {
    storyBadge: 'Our Story',
    title: 'About Island Safaris',
    subtitle:
        'Your trusted partner for authentic wildlife experiences in Minneriya, Kaudulla, and Hurulu Eco Park.',
    statExperience: 'Years of Experience',
    statTravelers: 'Happy Travelers',
    statParks: 'National Parks',
    statElephants: 'Elephants in One Gathering',
    journeyBadge: 'Our Journey',
    journeyTitle: "Born from a Deep Love for Sri Lanka's Wild Heart",
    journeyBodyOne:
        "Island Safaris was founded with a simple mission: to share the magic of Sri Lanka's incredible wildlife with travelers from around the world. Based in Habarana, at the gateway to the Cultural Triangle, we specialize in private jeep safaris to the region's most famous national parks.",
    journeyQuote:
        "A safari is more than seeing animals-it's about understanding the ecosystem, respecting the habitats, and creating memories that last a lifetime.",
    journeyBodyTwo:
        "Our team of experienced drivers not only navigate the terrain expertly but also serve as knowledgeable guides who can read the forest like a book. Over the years, we've developed an intimate understanding of the Great Elephant Migration-the seasonal movement of hundreds of Asian elephants between Minneriya, Kaudulla, and Hurulu Eco Park. This knowledge ensures you're always at the right place, at the right time.",
    corridorLabel: 'Elephant Corridor',
    corridorParks: 'Minneriya • Kaudulla • Hurulu',
    basedTitle: 'Based in Habarana',
    basedSubtitle: 'Heart of the Cultural Triangle',
    parksCta: 'Explore Our Parks',
    whyBadge: 'Why Choose Us',
    whyTitle: 'The Island Safaris Difference',
    whyBody:
        "We're not just tour operators-we're passionate naturalists dedicated to authentic wildlife experiences.",
    featureSafetyTitle: 'Safety First',
    featureSafetyDesc: 'Expert drivers and well-maintained safari jeeps ensure your complete safety on every adventure.',
    featureGuidesTitle: 'Expert Guides',
    featureGuidesDesc: 'Our local guides know the parks inside out, tracking wildlife and sharing deep ecological knowledge.',
    featureEcoTitle: 'Eco Friendly',
    featureEcoDesc: "We respect nature and adhere to strict park rules. It's their home-we're just the guests.",
    featureTeamTitle: 'Passionate Team',
    featureTeamDesc: 'We love what we do and want to share the untamed beauty of Sri Lanka with you.',
    ctaTitle: 'Ready to Experience the Wild?',
    ctaBody: "Whether you have questions about our safaris or want to book your adventure, we're here to help.",
    callUs: 'Call Us',
    emailUs: 'Email Us',
    bookSafari: 'Book Your Safari',
    contactUs: 'Contact Us',
};

const esCopy = {
    storyBadge: 'Nuestra historia',
    title: 'Sobre Island Safaris',
    subtitle:
        'Tu aliado de confianza para experiencias autenticas de vida silvestre en Minneriya, Kaudulla y Hurulu Eco Park.',
    statExperience: 'Anos de experiencia',
    statTravelers: 'Viajeros felices',
    statParks: 'Parques nacionales',
    statElephants: 'Elefantes en una concentracion',
    journeyBadge: 'Nuestro recorrido',
    journeyTitle: 'Nacido de un amor profundo por la naturaleza de Sri Lanka',
    journeyBodyOne:
        'Island Safaris nacio con una mision simple: compartir la magia de la increible vida silvestre de Sri Lanka con viajeros de todo el mundo. Con base en Habarana, nos especializamos en safaris privados en jeep por los parques nacionales mas emblematicos de la region.',
    journeyQuote:
        'Un safari es mas que ver animales: se trata de entender el ecosistema, respetar los habitats y crear recuerdos para toda la vida.',
    journeyBodyTwo:
        'Nuestro equipo de conductores expertos no solo domina el terreno, tambien actua como guia con gran conocimiento del bosque. Con los anos, desarrollamos un entendimiento unico de la Gran Migracion de Elefantes.',
    corridorLabel: 'Corredor de elefantes',
    corridorParks: 'Minneriya • Kaudulla • Hurulu',
    basedTitle: 'Con base en Habarana',
    basedSubtitle: 'Corazon del Triangulo Cultural',
    parksCta: 'Explora nuestros parques',
    whyBadge: 'Por que elegirnos',
    whyTitle: 'La diferencia de Island Safaris',
    whyBody: 'No somos solo operadores turisticos: somos naturalistas apasionados por experiencias autenticas.',
    featureSafetyTitle: 'Seguridad primero',
    featureSafetyDesc: 'Conductores expertos y jeeps bien mantenidos garantizan seguridad en cada aventura.',
    featureGuidesTitle: 'Guias expertos',
    featureGuidesDesc: 'Nuestros guias locales conocen los parques a fondo y comparten gran conocimiento ecologico.',
    featureEcoTitle: 'Eco amigable',
    featureEcoDesc: 'Respetamos la naturaleza y cumplimos estrictamente las normas del parque.',
    featureTeamTitle: 'Equipo apasionado',
    featureTeamDesc: 'Amamos lo que hacemos y queremos compartir la belleza salvaje de Sri Lanka contigo.',
    ctaTitle: 'Listo para vivir lo salvaje?',
    ctaBody: 'Si tienes preguntas o quieres reservar tu aventura, estamos aqui para ayudarte.',
    callUs: 'Llamanos',
    emailUs: 'Escribenos',
    bookSafari: 'Reserva tu safari',
    contactUs: 'Contactanos',
};

const copyByLocale = {
    en: enCopy,
    es: esCopy,
    ru: { ...enCopy, title: 'О Island Safaris', storyBadge: 'Наша история', contactUs: 'Связаться' },
    fr: { ...enCopy, title: 'A propos de Island Safaris', storyBadge: 'Notre histoire', contactUs: 'Nous contacter' },
    ja: { ...enCopy, title: 'Island Safarisについて', storyBadge: '私たちの物語', contactUs: 'お問い合わせ' },
    'zh-CN': { ...enCopy, title: '关于 Island Safaris', storyBadge: '我们的故事', contactUs: '联系我们' },
    hi: { ...enCopy, title: 'Island Safaris के बारे में', storyBadge: 'हमारी कहानी', contactUs: 'संपर्क करें' },
    it: { ...enCopy, title: 'Chi siamo - Island Safaris', storyBadge: 'La nostra storia', contactUs: 'Contattaci' },
    'pt-BR': { ...enCopy, title: 'Sobre a Island Safaris', storyBadge: 'Nossa historia', contactUs: 'Fale conosco' },
    tr: { ...enCopy, title: 'Island Safaris Hakkinda', storyBadge: 'Hikayemiz', contactUs: 'Iletisim' },
    ar: { ...enCopy, title: 'حول Island Safaris', storyBadge: 'قصتنا', contactUs: 'تواصل معنا' },
    pl: { ...enCopy, title: 'O Island Safaris', storyBadge: 'Nasza historia', contactUs: 'Kontakt' },
    gd: { ...enCopy, title: 'Mu Island Safaris', storyBadge: 'Ar sgeul', contactUs: 'Cuir fios' },
    nl: { ...enCopy, title: 'Over Island Safaris', storyBadge: 'Ons verhaal', contactUs: 'Contact' },
    de: { ...enCopy, title: 'Uber Island Safaris', storyBadge: 'Unsere Geschichte', contactUs: 'Kontakt' },
} as const;

export default async function AboutPage() {
    const locale = await getRequestLocale();
    const t = copyByLocale[(locale as keyof typeof copyByLocale)] ?? copyByLocale.en;

    const features = [
        { icon: Shield, title: t.featureSafetyTitle, desc: t.featureSafetyDesc, color: 'from-blue-500 to-blue-600' },
        { icon: Users, title: t.featureGuidesTitle, desc: t.featureGuidesDesc, color: 'from-secondary-500 to-secondary-600' },
        { icon: Leaf, title: t.featureEcoTitle, desc: t.featureEcoDesc, color: 'from-green-500 to-green-600' },
        { icon: Heart, title: t.featureTeamTitle, desc: t.featureTeamDesc, color: 'from-red-500 to-red-600' },
    ];

    const stats = [
        { value: '15+', label: t.statExperience },
        { value: '5000+', label: t.statTravelers },
        { value: '3', label: t.statParks },
        { value: '300+', label: t.statElephants },
    ];
    const schemas = [
        breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
        ]),
        faqSchema([
            {
                question: 'Where is Island Safaris based?',
                answer: 'Island Safaris is based in Habarana, Sri Lanka, close to Minneriya, Kaudulla, and Hurulu Eco Park.',
            },
            {
                question: 'What makes your safaris different?',
                answer: 'We provide private trips, experienced local drivers, and seasonal destination guidance for better wildlife sightings.',
            },
        ]),
    ];

    return (
        <div className="bg-secondary-50 min-h-screen">
            {schemas.map((schema, index) => (
                <JsonLd key={`about-schema-${index}`} data={schema} />
            ))}
            {/* Hero - full-bleed, matches Destinations / Packages */}
            <section className="relative min-h-[75vh] bg-safari-900 overflow-hidden flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1770663701/IMG_6199.JPG_mxebtr.jpg', { width: 1920, quality: 70 })}')` }}
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
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase">{t.storyBadge}</span>
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
                            {t.title}
                        </h1>
                        <p className="text-lg md:text-xl text-safari-100/90 leading-relaxed max-w-2xl mb-10">
                            {t.subtitle}
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
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-safari-200">
                                        <Image
                                            src={optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045462/IMG_6163.JPG_tewuwz.jpg', { width: 900, quality: 70 })}
                                            alt="Sri Lanka safari wildlife with Island Safaris"
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 30vw"
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                                        <Image
                                            src={optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045450/IMG_6181_xxilcs.avif', { width: 900, quality: 70 })}
                                            alt="Elephant migration corridor in Sri Lanka"
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 30vw"
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-safari-200">
                                        <Image
                                            src={optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045443/IMG_6164_klnyzg.webp', { width: 900, quality: 70 })}
                                            alt="Guided private jeep safari experience in Sri Lanka"
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 30vw"
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                                        <Image
                                            src={optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045344/IMG_6203.JPG_nh8v7m.jpg', { width: 900, quality: 70 })}
                                            alt="Wildlife photography from Sri Lanka safari tour"
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 30vw"
                                            className="object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-5 py-4 shadow-lg border border-safari-100">
                                <div className="text-sm font-semibold text-safari-900">{t.corridorLabel}</div>
                                <div className="text-xs text-safari-500">{t.corridorParks}</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                                {t.journeyBadge}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-6 leading-tight">
                                {t.journeyTitle}
                            </h2>
                            <p className="text-lg text-safari-600 leading-relaxed mb-6">
                                {t.journeyBodyOne}
                            </p>
                            <blockquote className="border-l-4 border-secondary-500 pl-6 py-2 mb-6 text-safari-700 italic text-lg">
                                {t.journeyQuote}
                            </blockquote>
                            <p className="text-safari-600 leading-relaxed mb-6">
                                {t.journeyBodyTwo}
                            </p>

                            {/* Location + CTA row */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                <div className="inline-flex items-center gap-4 bg-secondary-50 rounded-2xl px-5 py-4 border border-safari-100">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-safari-100">
                                        <MapPin className="text-secondary-600" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-safari-900">{t.basedTitle}</div>
                                        <div className="text-safari-600 text-sm">{t.basedSubtitle}</div>
                                    </div>
                                </div>
                                <Link
                                    href="/destinations"
                                    className="inline-flex items-center gap-2 text-secondary-600 font-bold hover:gap-3 transition-all shrink-0"
                                >
                                    {t.parksCta} <ArrowRight size={20} />
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
                            {t.whyBadge}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-3">
                            {t.whyTitle}
                        </h2>
                        <p className="text-safari-500 text-lg max-w-2xl">
                            {t.whyBody}
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
                        {t.ctaTitle}
                    </h2>
                    <p className="text-safari-300 text-lg max-w-xl mx-auto mb-10">
                        {t.ctaBody}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <a
                            href="tel:+94707682401"
                            className="inline-flex items-center justify-center gap-3 text-white hover:text-secondary-400 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <Phone size={20} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-safari-400">{t.callUs}</div>
                                <div className="font-semibold">0707682401</div>
                            </div>
                        </a>
                        <a
                            href="mailto:islandsafariessrilanka@gmail.com"
                            className="inline-flex items-center justify-center gap-3 text-white hover:text-secondary-400 transition-colors"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                <Mail size={20} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-safari-400">{t.emailUs}</div>
                                <div className="font-semibold">islandsafariessrilanka@gmail.com</div>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/booking"
                            className="inline-flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-xl"
                        >
                            {t.bookSafari} <ChevronRight size={18} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full border border-white/20 hover:border-white/40 transition-all"
                        >
                            {t.contactUs}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
