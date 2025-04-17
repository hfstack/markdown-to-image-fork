import { createPageMetadata } from '@/src/lib/metadata';
import { Metadata } from 'next';

// 使用更简洁的方式生成元数据
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return createPageMetadata(params, {
    // 自定义这个页面的元数据
    canonicalPath: 'example',
    // 根据语言提供不同的标题
    customTitle: params.locale === 'zh' 
      ? '示例页面 - Markdown转图片' 
      : params.locale === 'fr'
        ? 'Page d\'exemple - Markdown en Image'
        : 'Example Page - Markdown to Image',
  });
}

export default function ExamplePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Example Page</h1>
      <p>This page demonstrates how to use multilingual metadata.</p>
    </div>
  );
} 