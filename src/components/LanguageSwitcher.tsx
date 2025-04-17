"use client"

import * as React from 'react'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '../i18n/routing'
import { SUPPORTED_LOCALES } from './generateMetadata'

// 语言名称映射
const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  es: 'Español',
  ja: '日本語',
  ko: '한국어'
}

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  
  console.log('LanguageSwitcher rendering, current locale:', locale);
  console.log('Current pathname:', pathname);
  
  return (
    <div className="flex flex-wrap gap-4">
      {SUPPORTED_LOCALES.map((lang) => (
        <Link 
          key={lang}
          href={pathname} 
          locale={lang} 
          className={`transition-colors hover:text-blue-600 ${locale === lang ? 'font-bold text-blue-500' : ''}`}
        >
          {LOCALE_NAMES[lang]}
        </Link>
      ))}
    </div>
  )
} 