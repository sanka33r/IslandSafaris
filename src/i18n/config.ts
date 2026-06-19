export const defaultLocale = 'en';

export const locales = [
  'en',
  'es',
  'ru',
  'fr',
  'ja',
  'zh-CN',
  'hi',
  'it',
  'pt-BR',
  'tr',
  'ar',
  'pl',
  'gd',
  'nl',
  'de',
] as const;

export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ['ar'];

export const localeCookieName = 'island_locale';
