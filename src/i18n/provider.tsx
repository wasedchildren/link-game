import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18nContext, type I18nContextValue, type TranslateParams } from './context';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  translations,
  type SupportedLanguage,
} from './translations';

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

function getPreferredLanguage() {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;

  const [preferredLanguage] = navigator.languages ?? [navigator.language];
  return normalizeLanguage(preferredLanguage);
}

function detectInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  return getPreferredLanguage();
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
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const syncLanguageWithDevice = () => {
      setLanguage(getPreferredLanguage());
    };

    window.addEventListener('languagechange', syncLanguageWithDevice);

    return () => {
      window.removeEventListener('languagechange', syncLanguageWithDevice);
    };
  }, []);

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
