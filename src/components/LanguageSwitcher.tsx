"use client"

import { useState } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)
  
  console.log('LanguageSwitcher rendering, current locale:', locale);
  console.log('Current pathname:', pathname);
  
  return (
    <div className="relative">
      {/* 移动端下拉按钮 */}
      <button 
        className="md:hidden px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {LOCALE_NAMES[locale]}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {/* 桌面端横向排列 */}
      <div className="hidden md:flex items-center space-x-2">
        {SUPPORTED_LOCALES.map((lang) => (
          <Link 
            key={lang}
            href={pathname} 
            locale={lang} 
            className={`text-sm px-2 py-1 rounded transition-colors hover:bg-blue-100 hover:text-blue-600 ${
              locale === lang 
                ? 'font-bold text-blue-500 bg-blue-50' 
                : 'text-gray-600'
            }`}
          >
            {LOCALE_NAMES[lang]}
          </Link>
        ))}
      </div>
      
      {/* 移动端下拉菜单 */}
      {isOpen && (
        <div className="md:hidden absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
          {SUPPORTED_LOCALES.map((lang) => (
            <Link 
              key={lang}
              href={pathname} 
              locale={lang} 
              className={`block px-4 py-2 text-sm hover:bg-blue-50 ${
                locale === lang 
                  ? 'font-bold text-blue-500' 
                  : 'text-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {LOCALE_NAMES[lang]}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}