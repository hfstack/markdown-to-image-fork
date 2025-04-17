import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LOCALES } from './src/components/generateMetadata';
import config from './src/i18n/config';

// 确保使用相同的语言配置
if (JSON.stringify(SUPPORTED_LOCALES) !== JSON.stringify(config.locales)) {
  console.warn('Warning: SUPPORTED_LOCALES in generateMetadata.ts differs from locales in i18n/config.ts');
}

// 创建next-intl中间件
const intlMiddleware = createMiddleware({
  // 支持的语言列表
  locales: SUPPORTED_LOCALES,
  // 默认语言
  defaultLocale: 'en',
  // 语言检测策略
  localeDetection: true,
  // 是否将默认语言放在URL中
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  // 处理根路径重定向
  const pathname = request.nextUrl.pathname;
  
  if (pathname === '/') {
    // 根据Accept-Language头检测用户首选语言
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = getPreferredLocale(acceptLanguage);
    
    // 重定向到用户首选语言或默认语言
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }
  
  // 对其他路径使用next-intl中间件
  return intlMiddleware(request);
}

// 从Accept-Language头解析用户首选语言
function getPreferredLocale(acceptLanguage: string): string {
  if (!acceptLanguage) return 'en';
  
  const languages = acceptLanguage.split(',');
  for (const lang of languages) {
    const [langCode] = lang.trim().split(';');
    const baseCode = langCode.split('-')[0].toLowerCase();
    
    if (SUPPORTED_LOCALES.includes(baseCode)) {
      return baseCode;
    }
  }
  
  return 'en';
}

export const config = {
  // 匹配需要中间件处理的路径
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}; 