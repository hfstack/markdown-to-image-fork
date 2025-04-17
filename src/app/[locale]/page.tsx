import App from '@/src/components/App'
import { createPageMetadata } from '@/src/lib/metadata'
import { Metadata } from 'next'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return createPageMetadata(params, {
    canonicalPath: '',
  })
}

export default function HomePage() {
  return <App />
} 