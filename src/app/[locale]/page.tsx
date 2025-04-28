import App from '@/src/components/App'
import { generateMetadata as createMetadata } from '@/src/components/generateMetadata';
import { Metadata } from 'next'

// 为动态路由生成元数据
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return createMetadata({ 
    locale: params.locale,
    pageName: 'md2poster' 
  });
}

export default function HomePage() {
  return <App />
} 