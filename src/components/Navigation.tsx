"use client"

import { Link, usePathname } from '../i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()
  
  // 添加useEffect以监听语言变化
  useEffect(() => {
    console.log('Navigation: locale changed to', locale);
    console.log('Translated md2richTxt:', t('md2richTxt'));
  }, [locale, t]);
  
  return (
    <div className="w-full flex items-center justify-between">
      <nav>
        <ul className="flex gap-4">
          <li className="hover:text-primary transition-colors">
            <Link href="/" locale={locale}>{t('home')}</Link>
          </li>
          <li className="hover:text-primary transition-colors">
            <Link href="/md2richTxt" locale={locale}>{t('md2richTxt')}</Link>
          </li>
        </ul>
      </nav>
      <div className="flex-shrink-0">
        <LanguageSwitcher />
      </div>
    </div>
  )
} 