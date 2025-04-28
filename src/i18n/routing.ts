import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from '@/src/components/generateMetadata';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);