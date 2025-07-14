/**
 * Internationalization Index
 * Central export for all language files
 */

import { en } from './en';
import { de } from './de';

export const locales = {
  en,
  de,
};

export type Locale = keyof typeof locales;
export type LocaleData = typeof en;

export default locales;
