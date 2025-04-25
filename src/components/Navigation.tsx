"use client"

import { Link, usePathname } from '../i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    console.log('Navigation: locale changed to', locale);
    console.log('Translated md2richTxt:', t('md2richTxt'));
  }, [locale, t]);
  
  return (
    <div className="w-full flex items-center justify-between">
      {/* 移动端菜单按钮 */}
      <button 
        className="md:hidden p-2 rounded-md hover:bg-gray-100"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>
      
      {/* 导航菜单 */}
      <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
          <li className="hover:text-primary transition-colors py-2 md:py-0">
            <Link href="/" locale={locale}>{t('home')}</Link>
          </li>
          <li className="hover:text-primary transition-colors py-2 md:py-0">
            <Link href="/md2richTxt" locale={locale}>{t('md2richTxt')}</Link>
          </li>
        </ul>
      </nav>
      
      {/* 语言切换器 */}
      <div className="flex-shrink-0">
        <LanguageSwitcher />
      </div>
    </div>
  )
}