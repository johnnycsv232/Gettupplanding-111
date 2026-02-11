'use client';

import { createContext, useContext, useState } from 'react';

type Locale = 'en' | 'es';

const translations = {
  en: {
    hero: {
      title: 'THE ULTIMATE',
      subtitle: 'EXPERIENCE',
      description: 'We orchestrate the highest-growth nightlife productions in',
      cta: "CLAIM YOUR CITY'S CROWN",
    },
    agent: {
      greeting: "I'm the GettUpp AI. Looking to dominate the scene in",
    },
    gallery: {
      title: 'THE WORK',
      subtitle: 'PORTFOLIO',
    },
  },
  es: {
    hero: {
      title: 'LA EXPERIENCIA',
      subtitle: 'DEFINITIVA',
      description: 'Orquestamos las producciones de vida nocturna de mayor crecimiento en',
      cta: 'RECLAMA LA CORONA DE TU CIUDAD',
    },
    agent: {
      greeting: 'Soy la IA de GettUpp. ¿Buscas dominar la escena en',
    },
    gallery: {
      title: 'EL TRABAJO',
      subtitle: 'PORTAFOLIO',
    },
  },
};

interface i18nContextType {
  locale: Locale;
  t: (path: string) => string;
  setLocale: (l: Locale) => void;
}

const i18nContext = createContext<i18nContextType | null>(null);

export function I18nProvider({
  children,
  initialLocale = 'en',
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) {
  const [locale, setLocale] = useState<Locale>((initialLocale as Locale) || 'en');

  const t = (path: string) => {
    const keys = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = translations[locale];
    for (const key of keys) {
      if (result[key]) result = result[key];
      else return path;
    }
    return result;
  };

  return <i18nContext.Provider value={{ locale, t, setLocale }}>{children}</i18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(i18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
