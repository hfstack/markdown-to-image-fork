import * as React from 'react'
import { useLocale } from 'next-intl'
import { Link } from '../i18n/routing'

export default function LanguageSwitcher() {
  const locale = useLocale()
  
  return (
    <div className="flex gap-4">
      <Link href="/" locale="en" className={locale === 'en' ? 'font-bold' : ''}>
        English
      </Link>
      <Link href="/" locale="zh" className={locale === 'zh' ? 'font-bold' : ''}>
        中文
      </Link>
    </div>
  )
} 