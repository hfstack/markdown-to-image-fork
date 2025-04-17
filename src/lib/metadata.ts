import { Metadata } from 'next';
import { generateMetadata } from '@/src/components/generateMetadata';

/**
 * 为App Router页面创建通用的元数据生成函数
 */
export function createPageMetadata(
  params: { locale: string },
  options?: {
    customTitle?: string;
    customDescription?: string;
    customKeywords?: string;
    ogImage?: string;
    canonicalPath?: string;
  }
): Metadata {
  return generateMetadata({
    locale: params.locale,
    ...options,
  });
} 