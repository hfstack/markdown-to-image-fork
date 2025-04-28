import * as React from 'react'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import type { Metadata } from 'next'
import Navigation from '@/src/components/Navigation'
import { FlatLanguageSwitcher } from '@/src/components/LanguageSwitcher'
import { Analytics } from '@vercel/analytics/next';
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
        <meta name="msvalidate.01" content="786AB095793CA748F2F7DAE30190C99B" />
        <meta name="baidu-site-verification" content="codeva-FyBqt8wvzB" />
        {/* Google Analytics 跟踪代码 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7HM6X6VQR5"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7HM6X6VQR5');
          `
        }} />
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "cb2d46bf156c48d780af91e3369a7eab"}'></script>
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <header className="px-4 py-2 border-b shadow-sm">
              <div className="container mx-auto px-4 sm:px-6">
                <Navigation />
              </div>
            </header>
            <main className="flex-grow md:px-4 px-0 sm:px-6 py-4">
              {children}
            </main>
            <footer className="footer p-4 sm:p-10 bg-neutral text-neutral-content">
              <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <p>Copyright © 2025 - All right reserved</p>
                </div>
                <FlatLanguageSwitcher />
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}