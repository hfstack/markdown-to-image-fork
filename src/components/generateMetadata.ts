import { Metadata } from 'next';

// 定义支持的语言
export const SUPPORTED_LOCALES = ['en', 'zh', 'fr', 'es', 'ja', 'ko'];

// 为不同语言定义通用元数据
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

// 为特定页面定义专属元数据
export const pageSpecificMetaByLocale: Record<string, Record<string, {
  title: string;
  description: string;
  keywords: string;
}>> = {
  // 首页元数据
  'md2poster': {
    en: {
      title: 'Markdown to Image - Create beautiful social media images',
      description: 'Convert your markdown to beautiful social media images with just a few clicks. The best tool for content creators.',
      keywords: 'markdown, image, poster, social media, editor, content creation, online tool',
    },
    zh: {
      title: 'Markdown转图片 - 创建精美社交媒体图片',
      description: '只需点击几下，即可将您的Markdown转换为精美的社交媒体图片。内容创作者的最佳工具。',
      keywords: 'markdown, 图片, 海报, 社交媒体, 编辑器, 内容创作, 在线工具',
    },
    fr: {
      title: 'Markdown en Image - Créez de belles images pour les médias sociaux',
      description: 'Convertissez votre markdown en magnifiques images pour les médias sociaux en quelques clics. Le meilleur outil pour les créateurs de contenu.',
      keywords: 'markdown, image, affiche, médias sociaux, éditeur, création de contenu, outil en ligne',
    },
    es: {
      title: 'Markdown a Imagen - Crea hermosas imágenes para redes sociales',
      description: 'Convierte tu markdown en hermosas imágenes para redes sociales con solo unos clics. La mejor herramienta para creadores de contenido.',
      keywords: 'markdown, imagen, póster, redes sociales, editor, creación de contenido, herramienta en línea',
    },
    ja: {
      title: 'Markdownから画像へ - 美しいソーシャルメディア画像を作成',
      description: '数回クリックするだけで、Markdownを美しいソーシャルメディア画像に変換できます。コンテンツクリエイターのための最高のツール。',
      keywords: 'markdown, 画像, ポスター, ソーシャルメディア, エディター, コンテンツ作成, オンラインツール',
    },
    ko: {
      title: 'Markdown에서 이미지로 - 아름다운 소셜 미디어 이미지 만들기',
      description: '몇 번의 클릭만으로 Markdown을 아름다운 소셜 미디어 이미지로 변환하세요. 콘텐츠 제작자를 위한 최고의 도구입니다.',
      keywords: 'markdown, 이미지, 포스터, 소셜 미디어, 편집기, 콘텐츠 제작, 온라인 도구',
    }
  },
  // MD2PDF 页面元数据
  'md2pdf': {
    en: {
      title: 'Markdown to PDF - Convert markdown to PDF documents',
      description: 'Convert your markdown content to professional PDF documents easily',
      keywords: 'markdown, pdf, document, converter, export',
    },
    zh: {
      title: 'Markdown转PDF - 将Markdown转换为PDF文档',
      description: '轻松将您的Markdown内容转换为专业PDF文档',
      keywords: 'markdown, pdf, 文档, 转换器, 导出',
    },
    fr: {
      title: 'Markdown en PDF - Convertir markdown en documents PDF',
      description: 'Convertissez facilement votre contenu markdown en documents PDF professionnels',
      keywords: 'markdown, pdf, document, convertisseur, exporter',
    },
    es: {
      title: 'Markdown a PDF - Convierte markdown en documentos PDF',
      description: 'Convierte fácilmente tu contenido markdown en documentos PDF profesionales',
      keywords: 'markdown, pdf, documento, conversor, exportar',
    },
    ja: {
      title: 'MarkdownからPDFへ - Markdownを PDF文書に変換',
      description: 'Markdownコンテンツを簡単にプロフェッショナルなPDF文書に変換',
      keywords: 'markdown, pdf, 文書, コンバーター, エクスポート',
    },
    ko: {
      title: 'Markdown에서 PDF로 - Markdown을 PDF 문서로 변환',
      description: 'Markdown 콘텐츠를 전문적인 PDF 문서로 쉽게 변환',
      keywords: 'markdown, pdf, 문서, 변환기, 내보내기',
    }
  },
  // MD2RichText 页面元数据
  'md2richTxt': {
    en: {
      title: 'Markdown to Rich Text - Convert markdown to formatted text',
      description: 'Transform your markdown to rich text format for word processors and other applications',
      keywords: 'markdown, rich text, rtf, word, formatter, conversion',
    },
    zh: {
      title: 'Markdown转富文本 - 将Markdown转换为格式化文本',
      description: '将您的Markdown转换为富文本格式，用于文字处理器和其他应用程序',
      keywords: 'markdown, 富文本, rtf, word, 格式化, 转换',
    },
    fr: {
      title: 'Markdown en Texte Enrichi - Convertir markdown en texte formaté',
      description: 'Transformez votre markdown en format de texte enrichi pour les traitements de texte et autres applications',
      keywords: 'markdown, texte enrichi, rtf, word, formateur, conversion',
    },
    es: {
      title: 'Markdown a Texto Enriquecido - Convierte markdown en texto formateado',
      description: 'Transforma tu markdown en formato de texto enriquecido para procesadores de texto y otras aplicaciones',
      keywords: 'markdown, texto enriquecido, rtf, word, formateador, conversión',
    },
    ja: {
      title: 'Markdownからリッチテキストへ - Markdownを書式付きテキストに変換',
      description: 'Markdownをワードプロセッサなどのアプリケーション用のリッチテキスト形式に変換',
      keywords: 'markdown, リッチテキスト, rtf, word, フォーマッター, 変換',
    },
    ko: {
      title: 'Markdown에서 서식 있는 텍스트로 - Markdown을 서식 있는 텍스트로 변환',
      description: 'Markdown을 워드 프로세서 및 기타 애플리케이션용 서식 있는 텍스트 형식으로 변환',
      keywords: 'markdown, 서식 있는 텍스트, rtf, word, 포맷터, 변환',
    }
  }
};

interface GenerateMetadataParams {
  locale: string;
  pageName?: string; // 新增：页面名称，用于获取特定页面的元数据
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  ogImage?: string;
  canonicalPath?: string;
}

// 网站域名
const siteUrl = 'https://www.md2poster.com';

/**
 * 生成网站元数据
 * 此函数用于 Next.js 应用中的元数据 API
 * 
 * @example
 * // 在页面组件中使用（使用通用元数据）
 * export const metadata = generateMetadata({ locale: 'en' });
 * 
 * // 为特定页面使用专属元数据
 * export const metadata = generateMetadata({ locale: 'en', pageName: 'md2pdf' });
 * 
 * // 在动态路由中使用
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   return generateMetadata({ locale: params.locale, pageName: 'md2pdf' });
 * }
 */
export function generateMetadata({
  locale,
  pageName,
  customTitle,
  customDescription,
  customKeywords,
  ogImage = '/og-image.jpg',
  canonicalPath = '',
}: GenerateMetadataParams): Metadata {
  // 获取当前语言的元数据
  // 如果提供了页面名称且该页面有特定的元数据，则使用页面专属元数据
  // 否则使用通用元数据
  let currentLocaleMeta;
  
  if (pageName && pageSpecificMetaByLocale[pageName] && pageSpecificMetaByLocale[pageName][locale]) {
    currentLocaleMeta = pageSpecificMetaByLocale[pageName][locale];
  } else {
    currentLocaleMeta = metaByLocale[locale] || metaByLocale.en;
  }
  
  // 使用自定义值或默认语言值
  const title = customTitle || currentLocaleMeta.title;
  const description = customDescription || currentLocaleMeta.description;
  const keywords = customKeywords || currentLocaleMeta.keywords;
  
  // 如果提供了pageNam但未提供canonicalPath，则使用pageName作为canonicalPath
  if (pageName && !canonicalPath) {
    canonicalPath = pageName;
  }
  
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
  
  // 添加 x-default 语言链接 (指向英文版本)
  alternates.languages['x-default'] = `${siteUrl}/en${canonicalPath ? `/${canonicalPath}` : ''}`;
  
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
      siteName: 'MD2Poster',
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

/**
 * 获取当前语言的路由参数
 * 这个辅助函数可以在客户端组件中使用
 * 
 * @example
 * import { useParams } from 'next/navigation';
 * import { getLocaleFromParams } from '@/components/generateMetadata';
 * 
 * function MyComponent() {
 *   const params = useParams();
 *   const locale = getLocaleFromParams(params);
 *   // ...
 * }
 */
export function getLocaleFromParams(params: any): string {
  const locale = (params?.locale as string) || 'en';
  return SUPPORTED_LOCALES.includes(locale) ? locale : 'en';
}