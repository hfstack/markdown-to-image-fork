import { Metadata } from 'next';

// 定义支持的语言
export const SUPPORTED_LOCALES = ['en', 'zh', 'fr', 'es', 'ja', 'ko'];

// 为不同语言定义元数据
export const metaByLocale: Record<string, {
  title: string;
  description: string;
  keywords: string;
}> = {
  en: {
    title: 'Markdown to Image - Create beautiful social media images',
    description: 'Convert your markdown to beautiful social media images with just a few clicks',
    keywords: 'markdown, image, poster, social media, editor',
  },
  zh: {
    title: 'Markdown转图片 - 创建精美社交媒体图片',
    description: '只需点击几下，即可将您的Markdown转换为精美的社交媒体图片',
    keywords: 'markdown, 图片, 海报, 社交媒体, 编辑器',
  },
  fr: {
    title: 'Markdown en Image - Créez de belles images pour les médias sociaux',
    description: 'Convertissez votre markdown en magnifiques images pour les médias sociaux en quelques clics',
    keywords: 'markdown, image, affiche, médias sociaux, éditeur',
  },
  es: {
    title: 'Markdown a Imagen - Crea hermosas imágenes para redes sociales',
    description: 'Convierte tu markdown en hermosas imágenes para redes sociales con solo unos clics',
    keywords: 'markdown, imagen, póster, redes sociales, editor',
  },
  ja: {
    title: 'Markdownから画像へ - 美しいソーシャルメディア画像を作成',
    description: '数回クリックするだけで、Markdownを美しいソーシャルメディア画像に変換できます',
    keywords: 'markdown, 画像, ポスター, ソーシャルメディア, エディター',
  },
  ko: {
    title: 'Markdown에서 이미지로 - 아름다운 소셜 미디어 이미지 만들기',
    description: '몇 번의 클릭만으로 Markdown을 아름다운 소셜 미디어 이미지로 변환하세요',
    keywords: 'markdown, 이미지, 포스터, 소셜 미디어, 편집기',
  },
};

interface GenerateMetadataParams {
  locale: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  ogImage?: string;
  canonicalPath?: string;
}

// 网站域名
const siteUrl = 'https://www.md2poster.com';

export function generateMetadata({
  locale,
  customTitle,
  customDescription,
  customKeywords,
  ogImage = '/og-image.jpg',
  canonicalPath = '',
}: GenerateMetadataParams): Metadata {
  // 获取当前语言的元数据或默认使用英语
  const currentLocaleMeta = metaByLocale[locale] || metaByLocale.en;
  
  // 使用自定义值或默认语言值
  const title = customTitle || currentLocaleMeta.title;
  const description = customDescription || currentLocaleMeta.description;
  const keywords = customKeywords || currentLocaleMeta.keywords;
  
  // 构建规范链接
  const canonicalUrl = `${siteUrl}/${locale}${canonicalPath ? `/${canonicalPath}` : ''}`;
  
  // 构建替代语言链接
  const alternates = {
    canonical: canonicalUrl,
    languages: {} as Record<string, string>,
  };
  
  SUPPORTED_LOCALES.forEach(lang => {
    alternates.languages[lang] = `${siteUrl}/${lang}${canonicalPath ? `/${canonicalPath}` : ''}`;
  });
  
  return {
    title,
    description,
    keywords: keywords.split(',').map(k => k.trim()),
    metadataBase: new URL(siteUrl),
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ReadPo',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
} 