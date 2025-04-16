import * as React from 'react'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import type { Metadata } from 'next'
import LanguageSwitcher from '@/src/components/LanguageSwitcher'
import Navigation from '@/src/components/Navigation'
import '@/src/packages/index.css'

import '../globals.css'
// 导入全局样式

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Markdown to Image',
  description: 'Convert markdown to beautiful social media images',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = params.locale;

  let messages;
  try {
    messages = (await import(`@/src/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="p-4 bg-gray-100">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <Navigation />
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 