/**
 * Internationalization Context
 * Provides language switching and translation functionality
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { locales, Locale, LocaleData } from '../locales';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: LocaleData;
  availableLocales: { code: Locale; name: string; flag: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

const availableLocales = [
  { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
  { code: 'de' as Locale, name: 'Deutsch', flag: '🇩🇪' },
];

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  // Initialize locale from localStorage or default to English
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('sjccms-locale');
    return (saved && saved in locales) ? saved as Locale : 'en';
  });

  // Save locale preference to localStorage
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('sjccms-locale', newLocale);
    
    // Update document language attribute
    document.documentElement.lang = newLocale;
  };

  // Set initial document language
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value: I18nContextType = {
    locale,
    setLocale,
    t: locales[locale],
    availableLocales,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export default I18nProvider;
