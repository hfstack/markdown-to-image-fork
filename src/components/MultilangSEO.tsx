import { useParams } from 'next/navigation';
import Head from 'next/head';

// 定义支持的语言
const SUPPORTED_LOCALES = ['en', 'zh', 'fr', 'es', 'ja', 'ko'];

// 为不同语言定义元数据
const metaByLocale = {
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

interface MultilangSEOProps {
  // 可以覆盖默认元数据的自定义值
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  ogImage?: string;
  canonicalPath?: string; // 不包含域名和语言前缀的路径
}

export default function MultilangSEO({
  customTitle,
  customDescription,
  customKeywords,
  ogImage = '/og-image.jpg',
  canonicalPath = '',
}: MultilangSEOProps) {
  // 获取当前语言
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  // 获取当前语言的元数据或默认使用英语
  const currentLocaleMeta = metaByLocale[locale as keyof typeof metaByLocale] || metaByLocale.en;
  
  // 使用自定义值或默认语言值
  const title = customTitle || currentLocaleMeta.title;
  const description = customDescription || currentLocaleMeta.description;
  const keywords = customKeywords || currentLocaleMeta.keywords;
  
  // 网站域名
  const siteUrl = 'https://readpo.com';
  
  // 构建规范链接和替代语言链接
  const canonicalUrl = `${siteUrl}/${locale}${canonicalPath ? `/${canonicalPath}` : ''}`;
  
  return (
    <Head>
      {/* 基本元数据 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* 规范链接 */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* 替代语言链接 */}
      {SUPPORTED_LOCALES.map(lang => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={`${siteUrl}/${lang}${canonicalPath ? `/${canonicalPath}` : ''}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en${canonicalPath ? `/${canonicalPath}` : ''}`} />
      
      {/* Open Graph 元数据 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter 卡片 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    </Head>
  );
} 