import * as React from 'react'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import type { Metadata } from 'next'
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
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <header className="px-4 py-2 border-b shadow-sm">
              <div className="container mx-auto">
                <Navigation />
              </div>
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <footer className="footer p-10 bg-neutral text-neutral-content">
              <div>
                <p>Copyright © 2023 - All right reserved</p>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 