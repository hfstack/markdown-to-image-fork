/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://readpo.com',
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
  // 支持的语言
  alternateRefs: [
    {
      href: 'https://readpo.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://readpo.com/zh',
      hreflang: 'zh',
    },
    {
      href: 'https://readpo.com/fr',
      hreflang: 'fr',
    },
    {
      href: 'https://readpo.com/es',
      hreflang: 'es',
    },
    {
      href: 'https://readpo.com/ja',
      hreflang: 'ja',
    },
    {
      href: 'https://readpo.com/ko',
      hreflang: 'ko',
    },
    {
      href: 'https://readpo.com/en',
      hreflang: 'x-default',
    },
  ],
  // 自定义转换函数，为每个URL添加语言变体
  transform: async (config, path) => {
    // 跳过已经包含语言前缀的路径
    if (/^\/(en|zh|fr|es|ja|ko)\//.test(path)) {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      }
    }
    
    // 对于没有语言前缀的路径，返回null以跳过
    return null
  },
}; 