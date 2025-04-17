const withNextIntl = require('next-intl/plugin')(
  './src/i18n/request.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@uiw/react-md-editor'],
  webpack: (config) => {
    // 这里添加任何需要的 webpack 配置
    return config
  },
  // 添加重定向规则，将根路径重定向到默认语言
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/zh',
        permanent: false,
      },
    ];
  },
}

module.exports = withNextIntl(nextConfig); 