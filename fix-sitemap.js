const fs = require('fs');
const path = require('path');

// 读取sitemap文件
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

// 修复重复的URL路径
content = content.replace(/\/(\w+)\/\1(?=["'])/g, '/$1');

// 写入修复后的内容
fs.writeFileSync(sitemapPath, content, 'utf8');

console.log('✅ Sitemap固定成功！URL重复问题已修复。'); 