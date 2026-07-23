import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Leaf, MapPin, Clock, Camera, ChevronRight, Check } from 'lucide-react';
import { getDestinationsWithImages } from '@/lib/queries/destinations';
import { getApprovedReviews } from '@/lib/queries/reviews';
import HeroSection from '@/components/home/HeroSection';
import ReviewList from '@/components/reviews/ReviewList';
import { getRequestLocale } from '@/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, reviewSchemas, touristTripSchema } from '@/lib/schema';
import { optimizeCloudinaryUrl } from '@/lib/images';

export const revalidate = 3600;
export const metadata = buildMetadata({
  title: 'Sigiriya Safari | Minneriya, Kaudulla & Hurulu Jeep Tours',
  titleAbsolute: true,
  description: 'Private Sri Lanka elephant safari from Sigiriya with expert local guides. Jeep tours to Minneriya, Kaudulla & Hurulu Eco Park with hotel pickup included.',
  path: '/',
});

const enCopy = {
    migrationStory: 'The Migration Story',
    rhythmTitle: 'The Rhythm of the Wild',
    rhythmBody:
      'Welcome to Sigiriya, the heart of the Cultural Triangle, where the ancient pulse of nature dictates the journey. Unlike ordinary safari operators, we specialize in safaris from Sigiriya into the Minneriya-Kaudulla-Hurulu Corridor - a vast, interconnected wilderness where hundreds of Asian elephants roam freely.',
    whyBook: 'Why Book With Us?',
    whyBookBody:
      "Nature doesn't stay in one place, and neither do we. The Great Elephant Gathering is a seasonal masterpiece, and we ensure you're always in the front row. Our expert guides track the migration daily to bring you exactly where the magic is happening.",
    corridorLabel: 'Elephant Corridor',
    corridorParks: 'Minneriya • Kaudulla • Hurulu',
    learnMore: 'Learn More About Us',
    destinations: 'Destinations',
    safariParks: 'Our Safari Parks',
    parksBody: 'Discover the iconic parks of the elephant migration corridor, all within easy reach of Sigiriya and Habarana.',
    viewAllParks: 'View All Parks',
    nationalPark: 'National Park',
    hours: 'Hours',
    explore: 'Explore',
    greatMigration: 'The Great Migration',
    followElephants: 'Follow the Elephants',
    migrationBody: "The herds move with the seasons. We know exactly where they'll be.",
    peakSeason: 'Peak Season',
    transition: 'Transition',
    winterHaven: 'Winter Haven',
    parkPeakMonth: 'Aug-Sep',
    parkTransitionMonth: 'Oct-Nov',
    parkWinterMonth: 'Dec-Jan',
    minneBody:
      'The legendary gathering peaks here. Up to 300 elephants congregate around the ancient tank as water sources dry up elsewhere.',
    kaudullaBody:
      'As rains fill the tanks, herds migrate north. Kaudulla offers intimate encounters with fewer crowds.',
    huruluBody:
      'The final leg of the migration. Dense forests create dramatic close encounters in golden morning light.',
    timelinePeakMonth: 'Jul - Sep',
    timelineTransitionMonth: 'Oct - Nov',
    timelineWinterMonth: 'Dec - Jan',
    timelineParkMinneriya: 'Minneriya',
    timelineParkKaudulla: 'Kaudulla',
    timelineParkHurulu: 'Hurulu Eco Park',
    beyondSafari: 'Beyond the Safari',
    experienceCulture: 'Experience The Culture',
    viewAllExperiences: 'View All Experiences',
    from: 'From',
    perPerson: '/person',
    pkgOrganicTitle: 'Organic Cooking',
    pkgOrganicTagline: 'Farm to Table',
    pkgVillageTitle: 'Village Tour',
    pkgVillageTagline: 'Cultural Immersion',
    pkgBicycleTitle: 'Bicycle Rent',
    pkgBicycleTagline: 'Explore Freely',
    whyChooseUs: 'Why Choose Us',
    difference: 'The Island Safaris Difference',
    differenceBody:
      "We're not just tour operators-we're passionate naturalists dedicated to authentic wildlife experiences.",
    topRated: 'Top Rated Service',
    topRatedBody:
      'Consistently rated 5-stars by travelers from around the world for our reliable, friendly, and knowledgeable service.',
    safetyFirst: 'Safety First',
    safetyFirstBody:
      'Well-maintained 4x4 jeeps and experienced drivers ensure your safety while navigating the wild terrain.',
    ecoConscious: 'Eco-Conscious',
    ecoConsciousBody:
      "We respect the wildlife and strictly adhere to park rules. It's their home-we're just the guests.",
    travelerReviews: 'Traveler Reviews',
    guestsSay: 'What Our Guests Say',
    reviewsBody: 'Real experiences from visitors who explored the elephant corridor with us.',
    readyAdventure: 'Ready for Your Adventure?',
    ctaBody:
      "Book your Sigiriya safari today and witness nature's greatest spectacle-the Great Elephant Gathering of Sri Lanka.",
    bookNow: 'Book Now',
    contactUs: 'Contact Us',
  };

const esCopy = {
    migrationStory: 'La historia de la migracion',
    rhythmTitle: 'El ritmo de la naturaleza',
    rhythmBody:
      'Bienvenido al corazon del Triangulo Cultural, donde el pulso de la naturaleza guia el viaje. Nos especializamos en el corredor Minneriya-Kaudulla-Hurulu, una gran zona silvestre conectada donde los elefantes asiaticos se mueven libremente.',
    whyBook: 'Por que reservar con nosotros?',
    whyBookBody:
      'La naturaleza no se queda en un solo lugar, y nosotros tampoco. Nuestros guias expertos siguen la migracion cada dia para llevarte justo donde ocurre la magia.',
    corridorLabel: 'Corredor de elefantes',
    corridorParks: 'Minneriya • Kaudulla • Hurulu',
    learnMore: 'Conoce mas sobre nosotros',
    destinations: 'Destinos',
    safariParks: 'Nuestros parques de safari',
    parksBody: 'Descubre los parques iconicos del corredor de migracion de elefantes, todos cerca de Sigiriya y Habarana.',
    viewAllParks: 'Ver todos los parques',
    nationalPark: 'Parque nacional',
    hours: 'Horas',
    explore: 'Explorar',
    greatMigration: 'La gran migracion',
    followElephants: 'Sigue a los elefantes',
    migrationBody: 'Las manadas se mueven con las estaciones. Sabemos exactamente donde estaran.',
    peakSeason: 'Temporada alta',
    transition: 'Transicion',
    winterHaven: 'Refugio de invierno',
    parkPeakMonth: 'Ago-Sep',
    parkTransitionMonth: 'Oct-Nov',
    parkWinterMonth: 'Dic-Ene',
    minneBody:
      'La legendaria concentracion alcanza su punto maximo aqui. Hasta 300 elefantes se reunen alrededor del antiguo embalse.',
    kaudullaBody:
      'Cuando las lluvias llenan los embalses, las manadas migran al norte. Kaudulla ofrece encuentros mas cercanos y menos concurridos.',
    huruluBody:
      'La etapa final de la migracion. Los bosques densos crean encuentros espectaculares con luz dorada.',
    timelinePeakMonth: 'Jul - Sep',
    timelineTransitionMonth: 'Oct - Nov',
    timelineWinterMonth: 'Dic - Ene',
    timelineParkMinneriya: 'Minneriya',
    timelineParkKaudulla: 'Kaudulla',
    timelineParkHurulu: 'Parque Eco Hurulu',
    beyondSafari: 'Mas alla del safari',
    experienceCulture: 'Vive la cultura',
    viewAllExperiences: 'Ver todas las experiencias',
    from: 'Desde',
    perPerson: '/persona',
    pkgOrganicTitle: 'Cocina organica',
    pkgOrganicTagline: 'De la huerta a la mesa',
    pkgVillageTitle: 'Tour de aldea',
    pkgVillageTagline: 'Inmersion cultural',
    pkgBicycleTitle: 'Alquiler de bicicleta',
    pkgBicycleTagline: 'Explora libremente',
    whyChooseUs: 'Por que elegirnos',
    difference: 'La diferencia de Island Safaris',
    differenceBody:
      'No somos solo operadores turisticos: somos amantes de la naturaleza dedicados a experiencias autenticas.',
    topRated: 'Servicio mejor valorado',
    topRatedBody:
      'Valorado de forma constante con 5 estrellas por viajeros de todo el mundo por nuestro servicio confiable y amable.',
    safetyFirst: 'Seguridad primero',
    safetyFirstBody:
      'Jeeps 4x4 bien mantenidos y conductores con experiencia garantizan tu seguridad en terrenos salvajes.',
    ecoConscious: 'Eco-consciente',
    ecoConsciousBody:
      'Respetamos la vida silvestre y cumplimos estrictamente las normas del parque. Es su hogar, nosotros somos visitantes.',
    travelerReviews: 'Resenas de viajeros',
    guestsSay: 'Lo que dicen nuestros visitantes',
    reviewsBody: 'Experiencias reales de visitantes que exploraron el corredor de elefantes con nosotros.',
    readyAdventure: 'Listo para tu aventura?',
    ctaBody:
      'Reserva tu safari en Sigiriya hoy y presencia el mayor espectaculo natural: la gran concentracion de elefantes de Sri Lanka.',
    bookNow: 'Reservar ahora',
    contactUs: 'Contactanos',
  };

const copyByLocale = {
  en: enCopy,
  es: esCopy,
  ru: { ...enCopy, destinations: 'Направления', viewAllParks: 'Все парки', bookNow: 'Забронировать' },
  fr: { ...enCopy, destinations: 'Destinations', viewAllParks: 'Voir tous les parcs', bookNow: 'Reserver' },
  ja: { ...enCopy, destinations: '目的地', viewAllParks: 'すべての公園を見る', bookNow: '今すぐ予約' },
  'zh-CN': { ...enCopy, destinations: '目的地', viewAllParks: '查看所有公园', bookNow: '立即预订' },
  hi: { ...enCopy, destinations: 'गंतव्य', viewAllParks: 'सभी पार्क देखें', bookNow: 'अभी बुक करें' },
  it: { ...enCopy, destinations: 'Destinazioni', viewAllParks: 'Vedi tutti i parchi', bookNow: 'Prenota ora' },
  'pt-BR': { ...enCopy, destinations: 'Destinos', viewAllParks: 'Ver todos os parques', bookNow: 'Reserve agora' },
  tr: { ...enCopy, destinations: 'Rotalar', viewAllParks: 'Tum parklari gor', bookNow: 'Hemen rezervasyon yap' },
  ar: { ...enCopy, destinations: 'الوجهات', viewAllParks: 'عرض جميع المتنزهات', bookNow: 'احجز الآن' },
  pl: { ...enCopy, destinations: 'Miejsca', viewAllParks: 'Zobacz wszystkie parki', bookNow: 'Zarezerwuj teraz' },
  gd: { ...enCopy, destinations: 'Cinn-uidhe', viewAllParks: 'Faic a h-uile pairc', bookNow: 'Glèidh a-nis' },
  nl: { ...enCopy, destinations: 'Bestemmingen', viewAllParks: 'Bekijk alle parken', bookNow: 'Boek nu' },
  de: { ...enCopy, destinations: 'Reiseziele', viewAllParks: 'Alle Parks ansehen', bookNow: 'Jetzt buchen' },
} as const;

const sigiriyaSeoContent = {
  eyebrow: 'Your Local Safari Specialists',
  heading: 'Sigiriya Safari: Private Jeep Safaris to Minneriya, Kaudulla & Hurulu Eco Park',
  paragraphs: [
    "Experience the ultimate Sigiriya safari with Island Safaris Sri Lanka, your trusted local safari specialist based in Sigiriya. We offer unforgettable private jeep safaris to Minneriya National Park, Kaudulla National Park, and Hurulu Eco Park, the heart of Sri Lanka's legendary elephant corridor, where hundreds of wild Asian elephants roam freely throughout the year.",
    'Founded from a deep love for Sri Lanka\'s wildlife and natural heritage, Island Safaris is dedicated to providing authentic, safe, and memorable safari experiences for travelers from around the world. More than just a jeep ride, every safari is an opportunity to connect with nature, understand the unique ecosystem, and witness wildlife in its natural habitat while supporting responsible tourism.',
    'Our experienced local drivers are passionate wildlife experts who know the parks like the back of their hand. They carefully track the seasonal movement of elephants between Minneriya, Kaudulla, and Hurulu Eco Park, ensuring you visit the park with the highest chance of seeing the famous Great Elephant Gathering. Along the way, you may also encounter leopards, sloth bears, spotted deer, sambar deer, crocodiles, water buffalo, monkeys, peacocks, eagles, and a wide variety of native birds.',
    "We provide comfortable private safari jeeps, experienced English-speaking guides, flexible departure times, and convenient hotel pickup and drop-off from Sigiriya, Dambulla, Habarana, Kandalama, and nearby areas. Whether you're travelling as a couple, family, group, or solo adventurer, we tailor every safari to deliver an unforgettable wildlife experience.",
  ],
  whyHeading: 'Why choose Island Safaris?',
  bullets: [
    'Private jeep safaris with experienced local guides',
    'Daily departures from Sigiriya and surrounding areas',
    'Visits to Minneriya, Kaudulla, or Hurulu Eco Park based on elephant movements',
    'Excellent opportunities to see hundreds of wild Asian elephants',
    'Hotel pickup and drop-off included',
    'Comfortable, well-maintained safari jeeps',
    'Friendly service with local knowledge',
    'Responsible and eco-friendly wildlife tourism',
  ],
  closing:
    'If you are searching for the best Sigiriya safari, Minneriya safari, Kaudulla safari, or Hurulu Eco Park safari, Island Safaris is your trusted local choice. Join us for an unforgettable journey into Sri Lanka\'s wild heart and create memories that will last a lifetime.',
};

export default async function HomePage() {
  const locale = await getRequestLocale();
  const t = copyByLocale[(locale as keyof typeof copyByLocale)] ?? copyByLocale.en;

  const [destinations, reviews] = await Promise.all([
    getDestinationsWithImages(),
    getApprovedReviews(), // all approved reviews for home
  ]);
  const packagePreview = [
    {
      title: t.pkgOrganicTitle,
      tagline: t.pkgOrganicTagline,
      price: '22',
      image: 'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045142/WhatsApp_Image_2026-02-15_at_12.06.43_PM_bxpezn.jpg',
      href: '/packages/cooking-class',
    },
    {
      title: t.pkgVillageTitle,
      tagline: t.pkgVillageTagline,
      price: '22',
      image: 'https://res.cloudinary.com/dxau42ovy/image/upload/v1772045164/WhatsApp_Image_2026-02-15_at_12.06.47_PM_aknrgc.jpg',
      href: '/packages/village-tour',
    },
    {
      title: t.pkgBicycleTitle,
      tagline: t.pkgBicycleTagline,
      price: '5',
      image: 'https://res.cloudinary.com/dxau42ovy/image/upload/v1772218312/24ba6f02-8af7-46af-9563-d882218b1916.png',
      href: '/packages/bicycle-rental',
    },
  ];
  const homeSchemas = [
    breadcrumbSchema([{ name: 'Home', path: '/' }]),
    faqSchema([
      {
        question: 'Which safari park near Sigiriya is best right now?',
        answer:
          'It depends on seasonality. Our team recommends Minneriya, Kaudulla, or Hurulu Eco Park based on current elephant movement and weather, with pickup from Sigiriya and Habarana hotels.',
      },
      {
        question: 'What is included in safari pricing?',
        answer:
          'Safari pricing covers the private jeep and guiding support. Park entrance tickets are usually paid separately at the gate.',
      },
    ]),
    touristTripSchema({
      name: 'Sigiriya Safari: Private Elephant Jeep Tours',
      description: 'Private safari experience from Sigiriya in the Minneriya-Kaudulla-Hurulu elephant corridor.',
      path: '/booking',
      price: 65,
      duration: 'PT3H',
      location: 'Sigiriya, Minneriya, Kaudulla, Hurulu Eco Park',
    }),
    ...reviewSchemas(reviews, '/'),
  ];

  return (
    <>
      {homeSchemas.map((schema, index) => (
        <JsonLd key={`home-schema-${index}`} data={schema} />
      ))}
      <HeroSection />
      {/* Safari trail scroll companion — disabled for now, re-enable with <SafariTrail /> */}

      {/* About Section - The Rhythm of the Wild */}
      {/* relative -mt-px: paints 1px over the hero's bottom edge so DPR
          rounding never shows the dark body background as a seam line */}
      <section className="relative -mt-px py-12 md:py-16 bg-secondary-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Stack - The Rhythm of the Wild (Cloudinary) */}
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-safari-200">
                    <Image
                      src={optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045462/IMG_6163.JPG_tewuwz.jpg', { width: 900, quality: 70 })}
                      alt="Sri Lanka safari wildlife near Minneriya corridor"
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                    <Image
                      src={optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045450/IMG_6181_xxilcs.avif', { width: 900, quality: 70 })}
                      alt="Elephants in the Minneriya Kaudulla Hurulu safari corridor"
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
                      alt="Private jeep safari experience in Sri Lanka"
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-safari-100 bg-secondary-200">
                    <Image
                      src={optimizeCloudinaryUrl('https://res.cloudinary.com/dxau42ovy/image/upload/v1772045344/IMG_6203.JPG_nh8v7m.jpg', { width: 900, quality: 70 })}
                      alt="Wild elephant sighting in Sri Lanka national park"
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
              <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-3 bg-secondary-100 px-4 py-2 rounded-full">
                {t.migrationStory}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-4 leading-tight">
                {t.rhythmTitle}
              </h2>
              <p className="text-lg text-safari-600 leading-relaxed mb-4">
                {t.rhythmBody}
              </p>
              <div className="rounded-3xl bg-white border border-safari-100 p-5 md:p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-safari-900 mb-2">{t.whyBook}</h3>
                <p className="text-safari-600 leading-relaxed mb-4">
                  {t.whyBookBody}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-secondary-600 font-bold hover:gap-3 transition-all"
                >
                  {t.learnMore} <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-24 bg-white relative content-visibility-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div>
              <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                {t.destinations}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-3">{t.safariParks}</h2>
              <p className="text-safari-500 text-lg">{t.parksBody}</p>
            </div>
            <Link href="/destinations" className="flex items-center gap-2 text-secondary-600 font-bold hover:gap-3 transition-all text-lg">
              {t.viewAllParks} <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {destinations.slice(0, 3).map((dest, index) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group block rounded-[2rem] overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-safari-100 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] bg-safari-200 overflow-hidden">
                  {dest.images[0] ? (
                    <Image
                      src={optimizeCloudinaryUrl(dest.images[0].secure_url, { width: 900, quality: 70 })}
                      alt={dest.images[0].alt_text || `${dest.name} safari wildlife in Sri Lanka`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-safari-400 to-safari-600 flex items-center justify-center">
                      <Camera className="text-white/30" size={64} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Peak Season Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-safari-800 text-xs font-bold px-3 py-1.5 rounded-full">
                      <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                      {index === 0 ? t.parkPeakMonth : index === 1 ? t.parkTransitionMonth : t.parkWinterMonth}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-2 text-xs font-semibold text-safari-500 uppercase tracking-wide mb-3">
                    <MapPin size={14} className="text-secondary-600" />
                    <span>{t.nationalPark}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-safari-900 mb-3 group-hover:text-secondary-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-safari-600 line-clamp-2 text-sm md:text-base mb-5">
                    {dest.summary || dest.description}
                  </p>
                  <div className="flex items-center justify-between text-sm font-semibold text-safari-500 pt-4 border-t border-safari-100">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={16} />
                      {dest.standard_duration_hours} {t.hours}
                    </span>
                    <span className="inline-flex items-center gap-2 text-secondary-600 group-hover:gap-3 transition-all">
                      {t.explore} <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Timeline */}
      <section className="py-20 md:py-28 bg-safari-900 text-white relative overflow-hidden content-visibility-auto">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary-400 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-900/50 px-4 py-2 rounded-full border border-secondary-700/50">
              {t.greatMigration}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.followElephants}</h2>
            <p className="text-safari-300 text-lg max-w-2xl mx-auto">
              {t.migrationBody}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-700/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                {t.peakSeason}
              </div>
              <div className="text-green-400 text-5xl font-bold mb-2">{t.timelinePeakMonth}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.timelineParkMinneriya}</h3>
              <p className="text-safari-300 leading-relaxed">
                {t.minneBody}
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border border-yellow-700/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 bg-yellow-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                {t.transition}
              </div>
              <div className="text-yellow-400 text-5xl font-bold mb-2">{t.timelineTransitionMonth}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.timelineParkKaudulla}</h3>
              <p className="text-safari-300 leading-relaxed">
                {t.kaudullaBody}
              </p>
            </div>

            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700/30 backdrop-blur-sm">
              <div className="absolute -top-4 left-8 bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                {t.winterHaven}
              </div>
              <div className="text-blue-400 text-5xl font-bold mb-2">{t.timelineWinterMonth}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.timelineParkHurulu}</h3>
              <p className="text-safari-300 leading-relaxed">
                {t.huruluBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Sneak Peek */}
      <section className="py-20 md:py-28 bg-[#faf8f4] relative overflow-hidden content-visibility-auto">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-secondary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <span className="text-secondary-600 text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">
                {t.beyondSafari}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-safari-900">
                {t.experienceCulture}
              </h2>
            </div>
            <Link
              href="/packages"
              className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-500 font-semibold transition-colors"
            >
              {t.viewAllExperiences}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packagePreview.map((pkg) => (
              <Link
                key={pkg.title}
                href={pkg.href}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] block"
              >
                <Image
                  src={optimizeCloudinaryUrl(pkg.image, { width: 800, quality: 70 })}
                  alt={`${pkg.title} in Sigiriya Sri Lanka`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white/50 text-xs tracking-wider uppercase block mb-1">
                    {pkg.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary-300 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {t.from} <span className="text-lg font-bold text-white">${pkg.price}</span>{t.perPerson}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-white/30 group-hover:border-secondary-400 group-hover:bg-secondary-600 flex items-center justify-center transition-all duration-400">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Features Grid */}
      <section className="py-20 md:py-28 bg-secondary-50 content-visibility-auto">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
              {t.whyChooseUs}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-4">{t.difference}</h2>
            <p className="text-safari-600 text-lg max-w-2xl mx-auto">
              {t.differenceBody}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 md:p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-safari-100 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-secondary-500/20 group-hover:scale-110 transition-transform">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-safari-900 mb-4">{t.topRated}</h3>
              <p className="text-safari-600 leading-relaxed">
                {t.topRatedBody}
              </p>
            </div>

            <div className="group p-8 md:p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-safari-100 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-safari-500 to-safari-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-safari-500/20 group-hover:scale-110 transition-transform">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-safari-900 mb-4">{t.safetyFirst}</h3>
              <p className="text-safari-600 leading-relaxed">
                {t.safetyFirstBody}
              </p>
            </div>

            <div className="group p-8 md:p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-safari-100 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                <Leaf size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-safari-900 mb-4">{t.ecoConscious}</h3>
              <p className="text-safari-600 leading-relaxed">
                {t.ecoConsciousBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-28 bg-white content-visibility-auto">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
              {t.travelerReviews}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-safari-900 mb-4">{t.guestsSay}</h2>
            <p className="text-safari-600 text-lg max-w-2xl mx-auto">
              {t.reviewsBody}
            </p>
          </div>
          <ReviewList reviews={reviews.slice(0, 6)} />
        </div>
      </section>

      {/* SEO Content — Sigiriya Safari specialists */}
      <section className="py-14 md:py-20 bg-secondary-50 content-visibility-auto">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: intro copy */}
            <div>
              <span className="inline-block text-secondary-600 font-bold uppercase tracking-widest text-xs mb-4 bg-secondary-100 px-4 py-2 rounded-full">
                {sigiriyaSeoContent.eyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-safari-900 mb-4 leading-tight">
                {sigiriyaSeoContent.heading}
              </h2>
              <div className="space-y-3 text-safari-700 leading-relaxed text-sm md:text-base">
                {sigiriyaSeoContent.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Right: why choose us card */}
            <div className="rounded-3xl bg-white border border-safari-100 shadow-sm p-6 md:p-8 lg:sticky lg:top-28">
              <h3 className="text-xl md:text-2xl font-bold text-safari-900 mb-5">
                {sigiriyaSeoContent.whyHeading}
              </h3>
              <ul className="space-y-3">
                {sigiriyaSeoContent.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-safari-700 text-sm md:text-base">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-secondary-600 text-white flex items-center justify-center">
                      <Check size={13} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-6 border-t border-safari-100 text-safari-600 leading-relaxed text-sm">
                {sigiriyaSeoContent.closing}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-safari-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-safari-900 via-safari-800 to-safari-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.readyAdventure}
          </h2>
          <p className="text-safari-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {t.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="group bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl shadow-secondary-900/50 active:scale-95 inline-flex items-center justify-center gap-3"
            >
              {t.bookNow}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-all border border-white/20 hover:border-white/40"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
