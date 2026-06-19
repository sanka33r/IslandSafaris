import { cookies, headers } from 'next/headers';
import { defaultLocale, localeCookieName, locales, rtlLocales, type Locale } from './config';

const localeSet = new Set<string>(locales);

function normalizeLocale(input?: string | null): Locale {
  if (!input) return defaultLocale;

  if (localeSet.has(input)) {
    return input as Locale;
  }

  const base = input.split('-')[0];
  const matched = locales.find((locale) => locale.toLowerCase().startsWith(base.toLowerCase()));
  return matched ?? defaultLocale;
}

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  if (cookieLocale) {
    return normalizeLocale(cookieLocale);
  }

  const headerStore = await headers();
  const acceptLanguage = headerStore.get('accept-language');
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0]?.trim())
    .filter(Boolean);

  for (const candidate of preferred) {
    const normalized = normalizeLocale(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return defaultLocale;
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}
