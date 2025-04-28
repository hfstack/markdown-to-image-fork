/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.md2poster.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/admin/*', '/private/*'],
  changefreq: 'weekly',
  priority: 0.7,
  
  // 设置为false，禁用sitemap索引文件
  generateIndexSitemap: false,
  
  // 明确添加额外的路径
  additionalPaths: async (config) => {
    const result = [];
    
    // 添加根路径
    result.push({
      loc: '/',
      priority: 1.0,
      changefreq: 'weekly',
      lastmod: new Date().toISOString(),
      // 主页的alternateRefs
      alternateRefs: [
        { href: 'https://www.md2poster.com/en', hreflang: 'en' },
        { href: 'https://www.md2poster.com/zh', hreflang: 'zh' },
        { href: 'https://www.md2poster.com/fr', hreflang: 'fr' },
        { href: 'https://www.md2poster.com/es', hreflang: 'es' },
        { href: 'https://www.md2poster.com/ja', hreflang: 'ja' },
        { href: 'https://www.md2poster.com/ko', hreflang: 'ko' },
        { href: 'https://www.md2poster.com/en', hreflang: 'x-default' },
      ],
    });
    
    // 添加 md2richTxt 路径
    result.push({
      loc: '/md2richTxt',
      priority: 0.9,
      changefreq: 'weekly',
      lastmod: new Date().toISOString(),
      // md2richTxt的正确alternateRefs
      alternateRefs: [
        { href: 'https://www.md2poster.com/en/md2richTxt', hreflang: 'en' },
        { href: 'https://www.md2poster.com/zh/md2richTxt', hreflang: 'zh' },
        { href: 'https://www.md2poster.com/fr/md2richTxt', hreflang: 'fr' },
        { href: 'https://www.md2poster.com/es/md2richTxt', hreflang: 'es' },
        { href: 'https://www.md2poster.com/ja/md2richTxt', hreflang: 'ja' },
        { href: 'https://www.md2poster.com/ko/md2richTxt', hreflang: 'ko' },
        { href: 'https://www.md2poster.com/en/md2richTxt', hreflang: 'x-default' },
      ],
    });
    
    // 添加 md2pdf 路径
    result.push({
      loc: '/md2pdf',
      priority: 0.9,
      changefreq: 'weekly',
      lastmod: new Date().toISOString(),
      // md2pdf的正确alternateRefs
      alternateRefs: [
        { href: 'https://www.md2poster.com/en/md2pdf', hreflang: 'en' },
        { href: 'https://www.md2poster.com/zh/md2pdf', hreflang: 'zh' },
        { href: 'https://www.md2poster.com/fr/md2pdf', hreflang: 'fr' },
        { href: 'https://www.md2poster.com/es/md2pdf', hreflang: 'es' },
        { href: 'https://www.md2poster.com/ja/md2pdf', hreflang: 'ja' },
        { href: 'https://www.md2poster.com/ko/md2pdf', hreflang: 'ko' },
        { href: 'https://www.md2poster.com/en/md2pdf', hreflang: 'x-default' },
      ],
    });
    
    // 添加各语言版本
    const locales = ['en', 'zh', 'fr', 'es', 'ja', 'ko'];
    
    locales.forEach(locale => {
      // 添加语言主页
      result.push({
        loc: `/${locale}`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      });
      
      // 添加语言版本的 md2richTxt 页面
      result.push({
        loc: `/${locale}/md2richTxt`,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      });
      
      // 添加语言版本的 md2pdf 页面
      result.push({
        loc: `/${locale}/md2pdf`,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      });
    });
    
    return result;
  },
}; 