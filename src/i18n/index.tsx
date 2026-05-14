import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  translations,
  type SupportedLanguage,
} from './translations';

type TranslateParams = Record<string, string | number>;

interface I18nContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, params?: TranslateParams) => string;
}

const LANGUAGE_STORAGE_KEY = 'linkup_language';

const I18nContext = createContext<I18nContextValue | null>(null);

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);
}

function normalizeLanguage(value?: string | null): SupportedLanguage {
  if (!value) return DEFAULT_LANGUAGE;
  if (isSupportedLanguage(value)) return value;

  const lowerValue = value.toLowerCase();
  if (lowerValue.startsWith('zh')) return 'zh-CN';
  if (lowerValue.startsWith('en')) return 'en';

  return DEFAULT_LANGUAGE;
}

function detectInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage) {
    return normalizeLanguage(savedLanguage);
  }

  const [preferredLanguage] = navigator.languages ?? [navigator.language];
  return normalizeLanguage(preferredLanguage);
}

function getNestedTranslation(source: Record<string, unknown>, key: string): string | null {
  const result = key.split('.').reduce<unknown>((currentValue, currentKey) => {
    if (currentValue && typeof currentValue === 'object' && currentKey in currentValue) {
      return (currentValue as Record<string, unknown>)[currentKey];
    }
    return null;
  }, source);

  return typeof result === 'string' ? result : null;
}

function interpolate(template: string, params?: TranslateParams) {
  if (!params) return template;

  return Object.entries(params).reduce((message, [key, value]) => {
    return message.split(`{{${key}}}`).join(String(value));
  }, template);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string, params?: TranslateParams) => {
      const currentDictionary = translations[language] as Record<string, unknown>;
      const fallbackDictionary = translations[DEFAULT_LANGUAGE] as Record<string, unknown>;
      const template =
        getNestedTranslation(currentDictionary, key) ??
        getNestedTranslation(fallbackDictionary, key) ??
        key;

      return interpolate(template, params);
    };

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return context;
}
