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
}

module.exports = withNextIntl(nextConfig); 