import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh', 'fr', 'es', 'ja', 'ko'],
  defaultLocale: 'en',
  localePrefix: 'never'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing); 