"use client"

import { useState, useRef, useEffect } from 'react'
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
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <div className="relative" ref={dropdownRef}>
      {/* 下拉按钮 */}
      <button 
        className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {LOCALE_NAMES[locale]}
        <svg className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          {SUPPORTED_LOCALES.map((lang) => (
            <Link 
              key={lang}
              href={pathname} 
              locale={lang} 
              className={`block px-4 py-2 text-sm hover:bg-blue-50 ${
                locale === lang 
                  ? 'font-bold text-blue-500 bg-blue-50' 
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

// 创建一个新组件用于平铺的语言切换
export function FlatLanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  
  return (
    <div className="flex items-center space-x-2">
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
  )
}