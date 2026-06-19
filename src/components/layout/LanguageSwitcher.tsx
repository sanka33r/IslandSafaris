'use client';

import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { localeCookieName, locales } from '@/i18n/config';
import { useLocale } from '@/providers/LocaleProvider';

const localeLabels: Record<string, string> = {
  en: 'English',
  es: 'Español',
  ru: 'Русский',
  fr: 'Français',
  ja: '日本語',
  'zh-CN': '中文(简体)',
  hi: 'हिन्दी',
  it: 'Italiano',
  'pt-BR': 'Português (BR)',
  tr: 'Türkçe',
  ar: 'العربية',
  pl: 'Polski',
  gd: 'Gàidhlig',
  nl: 'Nederlands',
  de: 'Deutsch',
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, messages } = useLocale();

  const onChangeLocale = (nextLocale: string) => {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <label className="inline-flex items-center gap-2 text-secondary-100/80 text-xs">
      <Globe size={14} className="text-secondary-400" />
      <span className="hidden lg:inline">{messages.language.label}</span>
      <select
        aria-label={messages.language.label}
        className="bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-secondary-100 text-xs outline-none"
        value={locale}
        onChange={(event) => onChangeLocale(event.target.value)}
      >
        {locales.map((value) => (
          <option key={value} value={value} className="text-black">
            {localeLabels[value] ?? value}
          </option>
        ))}
      </select>
    </label>
  );
}
