import Md2RichTextExample from '@/src/components/Md2RichTextExample'
import { generateMetadata as createMetadata } from '@/src/components/generateMetadata';
import { Metadata } from 'next';

// 为动态路由生成元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return createMetadata({ 
    locale: params.locale,
    pageName: 'md2richTxt' 
  });
}

export default function Md2RichTextPage() {
  return <Md2RichTextExample />
} 