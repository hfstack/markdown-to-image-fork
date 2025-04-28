import { Metadata } from 'next';
import { generateMetadata } from '@/src/components/generateMetadata';

/**
 * 为App Router页面创建通用的元数据生成函数
 * @deprecated 建议直接使用 @/src/components/generateMetadata 中的 generateMetadata 函数，并重命名为 createMetadata 以避免命名冲突
 * 例如: import { generateMetadata as createMetadata } from '@/src/components/generateMetadata';
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