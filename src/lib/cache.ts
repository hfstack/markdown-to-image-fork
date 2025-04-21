type CacheItem = {
  markdown: string;
  createdAt: number;
};

const cache: Record<string, CacheItem> = {};
const CACHE_EXPIRY = 5 * 60 * 1000; // 5分钟

// 清理过期缓存
function cleanExpiredCache() {
  const now = Date.now();
  for (const id in cache) {
    if (now - cache[id].createdAt > CACHE_EXPIRY) {
      delete cache[id];
    }
  }
}

// 存储Markdown并返回唯一ID
export function storeMarkdown(markdown: string): string {
  cleanExpiredCache();
  
  const id = Math.random().toString(36).substring(2, 15);
  
  cache[id] = {
    markdown,
    createdAt: Date.now()
  };
  
  return id;
}

// 通过ID获取富文本内容


// 通过ID获取原始Markdown
export function getMarkdownById(id: string): string | null {
  cleanExpiredCache();
  
  const item = cache[id];
  if (!item) return null;
  
  return item.markdown;
}