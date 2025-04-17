"use client"

import * as React from 'react'
import { useLocale } from 'next-intl'
import { Link, usePathname } from '../i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  
  console.log('LanguageSwitcher rendering, current locale:', locale);
  console.log('Current pathname:', pathname);
  
  return (
    <div className="flex gap-4">
      <Link href={pathname} locale="en" className={locale === 'en' ? 'font-bold' : ''}>
        English
      </Link>
      <Link href={pathname} locale="zh" className={locale === 'zh' ? 'font-bold' : ''}>
        中文
      </Link>
    </div>
  )
} 