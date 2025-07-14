/**
 * Language Selector Component
 * Allows users to switch between available languages
 */

import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { Locale } from '../../locales';

interface LanguageSelectorProps {
  compact?: boolean;
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  compact = false, 
  className = '' 
}) => {
  const { locale, setLocale, availableLocales } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = availableLocales.find((l: { code: Locale }) => l.code === locale);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as Locale);
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-2 py-1 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
          aria-label="Language selector"
        >
          <span className="text-lg mr-1">{currentLocale?.flag}</span>
          {!compact && <span className="hidden sm:inline">{currentLocale?.name}</span>}
          <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              {availableLocales.map((lang: { code: Locale; name: string; flag: string }) => (
                <button
                  key={lang.code}
                  onClick={() => handleLocaleChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center transition-colors ${
                    locale === lang.code
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg mr-2">{lang.flag}</span>
                  {lang.name}
                  {locale === lang.code && (
                    <svg className="ml-auto h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-3">🌐 Language / Sprache</h3>
      <div className="space-y-2">
        {availableLocales.map((lang: { code: Locale; name: string; flag: string }) => (
          <button
            key={lang.code}
            onClick={() => handleLocaleChange(lang.code)}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-200 ${
              locale === lang.code
                ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                : 'text-gray-700 hover:bg-gray-50 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{lang.flag}</span>
              <div>
                <div className="font-medium">{lang.name}</div>
                <div className="text-sm opacity-75">
                  {lang.code === 'en' ? 'English (US)' : 'Deutsch (Deutschland)'}
                </div>
              </div>
            </div>
            {locale === lang.code && (
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
