import { defaultLocale, type Locale } from './config';

type Messages = {
  nav: {
    home: string;
    destinations: string;
    packages: string;
    gallery: string;
    about: string;
    contact: string;
    bookNow: string;
    bookSafari: string;
  };
  hero: {
    tag: string;
    titleTop: string;
    titleHighlight: string;
    titleBottom: string;
    descriptionTop: string;
    descriptionBottom: string;
    ctaBook: string;
    ctaExplore: string;
    statElephants: string;
    statParks: string;
    statRated: string;
  };
  footer: {
    explore: string;
    destinations: string;
    contactUs: string;
    privacyPolicy: string;
    termsOfService: string;
    rights: string;
  };
  language: {
    label: string;
  };
};

const en: Messages = {
  nav: {
    home: 'Home',
    destinations: 'Destinations',
    packages: 'Packages',
    gallery: 'Gallery',
    about: 'About Us',
    contact: 'Contact',
    bookNow: 'Book Now',
    bookSafari: 'Book Your Safari',
  },
  hero: {
    tag: 'The Great Elephant Gathering Awaits',
    titleTop: 'Discover the',
    titleHighlight: 'Wild Heart',
    titleBottom: 'of Sri Lanka',
    descriptionTop: 'Exclusive jeep safaris through the legendary Minneriya-Kaudulla-Hurulu corridor.',
    descriptionBottom: 'Where hundreds of Asian elephants roam free.',
    ctaBook: 'Book Your Safari',
    ctaExplore: 'Explore Destinations',
    statElephants: 'Elephants',
    statParks: 'National Parks',
    statRated: 'Rated',
  },
  footer: {
    explore: 'Explore',
    destinations: 'Destinations',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    rights: 'All rights reserved.',
  },
  language: {
    label: 'Language',
  },
};

const translated: Partial<Record<Locale, Messages>> = {
  es: {
    ...en,
    nav: { ...en.nav, home: 'Inicio', destinations: 'Destinos', contact: 'Contacto' },
    language: { label: 'Idioma' },
  },
  ru: {
    ...en,
    nav: { ...en.nav, home: 'Главная', destinations: 'Направления', contact: 'Контакты' },
    language: { label: 'Язык' },
  },
  fr: {
    ...en,
    nav: { ...en.nav, home: 'Accueil', destinations: 'Destinations', contact: 'Contact' },
    language: { label: 'Langue' },
  },
  ja: {
    ...en,
    nav: { ...en.nav, home: 'ホーム', destinations: '目的地', contact: 'お問い合わせ' },
    language: { label: '言語' },
  },
  'zh-CN': {
    ...en,
    nav: { ...en.nav, home: '首页', destinations: '目的地', contact: '联系我们' },
    language: { label: '语言' },
  },
  hi: {
    ...en,
    nav: { ...en.nav, home: 'होम', destinations: 'गंतव्य', contact: 'संपर्क' },
    language: { label: 'भाषा' },
  },
  it: {
    ...en,
    nav: { ...en.nav, home: 'Home', destinations: 'Destinazioni', contact: 'Contatti' },
    language: { label: 'Lingua' },
  },
  'pt-BR': {
    ...en,
    nav: { ...en.nav, home: 'Início', destinations: 'Destinos', contact: 'Contato' },
    language: { label: 'Idioma' },
  },
  tr: {
    ...en,
    nav: { ...en.nav, home: 'Ana Sayfa', destinations: 'Rotalar', contact: 'İletişim' },
    language: { label: 'Dil' },
  },
  ar: {
    ...en,
    nav: { ...en.nav, home: 'الرئيسية', destinations: 'الوجهات', contact: 'اتصل بنا' },
    language: { label: 'اللغة' },
  },
  pl: {
    ...en,
    nav: { ...en.nav, home: 'Strona główna', destinations: 'Miejsca', contact: 'Kontakt' },
    language: { label: 'Język' },
  },
  gd: {
    ...en,
    nav: { ...en.nav, home: 'Dachaigh', destinations: 'Cinn-uidhe', contact: 'Cuir fios' },
    language: { label: 'Cànan' },
  },
  nl: {
    ...en,
    nav: { ...en.nav, home: 'Home', destinations: 'Bestemmingen', contact: 'Contact' },
    language: { label: 'Taal' },
  },
  de: {
    ...en,
    nav: { ...en.nav, home: 'Startseite', destinations: 'Reiseziele', contact: 'Kontakt' },
    language: { label: 'Sprache' },
  },
};

export const messagesByLocale: Record<Locale, Messages> = {
  en,
  es: translated.es ?? en,
  ru: translated.ru ?? en,
  fr: translated.fr ?? en,
  ja: translated.ja ?? en,
  'zh-CN': translated['zh-CN'] ?? en,
  hi: translated.hi ?? en,
  it: translated.it ?? en,
  'pt-BR': translated['pt-BR'] ?? en,
  tr: translated.tr ?? en,
  ar: translated.ar ?? en,
  pl: translated.pl ?? en,
  gd: translated.gd ?? en,
  nl: translated.nl ?? en,
  de: translated.de ?? en,
};

export type AppMessages = Messages;

export function getMessages(locale: string): AppMessages {
  return messagesByLocale[(locale as Locale) ?? defaultLocale] ?? messagesByLocale[defaultLocale];
}
