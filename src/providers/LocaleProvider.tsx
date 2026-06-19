'use client';

import { createContext, useContext } from 'react';
import type { AppMessages } from '@/i18n/messages';
import type { Locale } from '@/i18n/config';

type LocaleContextValue = {
  locale: Locale;
  messages: AppMessages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: AppMessages;
}) {
  return <LocaleContext.Provider value={{ locale, messages }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return value;
}
