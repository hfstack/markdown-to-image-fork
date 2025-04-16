import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径除了api路由、静态文件等
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 