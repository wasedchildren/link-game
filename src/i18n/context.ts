import { createContext } from 'react';
import type { SupportedLanguage } from './translations';

type TranslateParams = Record<string, string | number>;

export interface I18nContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, params?: TranslateParams) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export type { TranslateParams };
