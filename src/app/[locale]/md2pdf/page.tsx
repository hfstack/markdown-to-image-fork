import Md2PdfExample from '@/src/components/Md2PdfExample'
import { generateMetadata as createMetadata } from '@/src/components/generateMetadata';
import { Metadata } from 'next';

// 为动态路由生成元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return createMetadata({ 
    locale: params.locale,
    pageName: 'md2pdf' 
  });
}

export default function Md2PdfPage() {
  return <Md2PdfExample />
} 