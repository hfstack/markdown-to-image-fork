import * as React from 'react'
import { cn } from '../../lib/utils'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

type IThemeType =
  | 'default'
  | 'dark'
  | 'light'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'

type ISizeType = 'normal' | 'compact' | 'large'

interface Md2RichTextProps {
  children?: any
  markdown?: string
  className?: string
  theme?: IThemeType
  size?: ISizeType
  canCopy?: boolean
  editable?: boolean
  onChange?: (text: string) => void
  copySuccessCallback?: () => void
  copyFailedCallback?: () => void
}

interface Md2RichTextRef {
  handleCopy: () => Promise<unknown>
  getMarkdown: () => string
  setMarkdown: (text: string) => void
}

const themeMapClassName = {
  default: 'bg-white text-gray-800',
  dark: 'bg-gray-900 text-white',
  light: 'bg-gray-100 text-gray-800',
  blue: 'bg-blue-50 text-blue-800',
  green: 'bg-green-50 text-green-800',
  yellow: 'bg-yellow-50 text-yellow-800',
  red: 'bg-red-50 text-red-800',
}

const sizeMapClassName = {
  normal: 'p-4',
  compact: 'p-2 text-sm',
  large: 'p-6 text-lg',
}

async function sleep(millisecond: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond)
  })
}

const Button = ({
  loading,
  onClick,
  children,
}: {
  loading?: boolean
  onClick?: () => void
  children?: string | React.ReactNode
}) => {
  return (
    <button
      className={`flex items-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:bg-indigo-200  
      font-bold py-2 px-4 rounded focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          fill="currentColor"
          viewBox="0 0 512 512"
          className="mr-2 h-4 w-4 animate-spin"
        >
          <path d="M 288 32 Q 288 18 279 9 L 279 9 L 279 9 Q 270 0 256 0 Q 242 0 233 9 Q 224 18 224 32 Q 224 46 233 55 Q 242 64 256 64 Q 270 64 279 55 Q 288 46 288 32 L 288 32 Z M 288 480 Q 288 466 279 457 L 279 457 L 279 457 Q 270 448 256 448 Q 242 448 233 457 Q 224 466 224 480 Q 224 494 233 503 Q 242 512 256 512 Q 270 512 279 503 Q 288 494 288 480 L 288 480 Z M 448 256 Q 448 270 457 279 L 457 279 L 457 279 Q 466 288 480 288 Q 494 288 503 279 Q 512 270 512 256 Q 512 242 503 233 Q 494 224 480 224 Q 466 224 457 233 Q 448 242 448 256 L 448 256 Z M 32 288 Q 46 288 55 279 L 55 279 L 55 279 Q 64 270 64 256 Q 64 242 55 233 Q 46 224 32 224 Q 18 224 9 233 Q 0 242 0 256 Q 0 270 9 279 Q 18 288 32 288 L 32 288 Z M 75 437 Q 85 446 98 446 L 98 446 L 98 446 Q 110 446 120 437 Q 130 427 130 414 Q 130 402 120 392 Q 110 382 98 382 Q 85 382 75 392 Q 66 402 66 414 Q 66 427 75 437 L 75 437 Z M 392 437 Q 405 450 423 447 Q 441 441 447 423 Q 450 405 437 392 Q 424 378 406 382 Q 387 387 382 406 Q 378 424 392 437 L 392 437 Z M 75 75 Q 66 85 66 98 L 66 98 L 66 98 Q 66 110 75 120 Q 85 130 98 130 Q 110 130 120 120 Q 130 110 130 98 Q 130 85 120 75 Q 110 66 98 66 Q 85 66 75 75 L 75 75 Z" />
        </svg>
      )}
      {children}
    </button>
  )
}

const Md2RichText = React.forwardRef<Md2RichTextRef, Md2RichTextProps>(
  (
    {
      children,
      markdown = '',
      theme = 'default',
      className,
      size = 'normal',
      canCopy = false,
      editable = false,
      onChange,
      copySuccessCallback,
      copyFailedCallback,
    }: Md2RichTextProps,
    ref
  ) => {
    const [mdText, setMdText] = React.useState(markdown || (children as string) || '')
    const [loading, setLoading] = React.useState(false)
    const mdRef = React.useRef<HTMLDivElement>(null)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    
    const themeClassName = themeMapClassName[theme]
    const sizeClassName = sizeMapClassName[size]

    const handleCopy = React.useCallback(async () => {
      return new Promise(async (resolve, reject) => {
        const element = mdRef.current
        if (element === null) {
          return
        }
        setLoading(true)
        await sleep(100)
        try {
          // 获取富文本HTML
          const htmlContent = element.innerHTML
          
          // 创建一个临时元素来复制HTML内容
          const tempElem = document.createElement('div')
          tempElem.innerHTML = htmlContent
          document.body.appendChild(tempElem)
          
          // 创建一个范围并选择临时元素
          const range = document.createRange()
          range.selectNodeContents(tempElem)
          
          const selection = window.getSelection()
          selection?.removeAllRanges()
          selection?.addRange(range)
          
          // 复制内容
          document.execCommand('copy')
          
          // 清理
          selection?.removeAllRanges()
          document.body.removeChild(tempElem)
          
          copySuccessCallback?.()
          resolve(htmlContent)
          console.log('Rich text copied to clipboard')
        } catch (error) {
          copyFailedCallback?.()
          reject(error)
          console.error('Failed to copy rich text:', error)
        } finally {
          setLoading(false)
        }
      })
    }, [mdRef, copySuccessCallback, copyFailedCallback])

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value
      setMdText(newText)
      onChange?.(newText)
    }, [onChange])

    // 暴露组件方法
    React.useImperativeHandle(ref, () => ({
      handleCopy,
      getMarkdown: () => mdText,
      setMarkdown: (text: string) => setMdText(text)
    }))

    const renderCopy = () => {
      return (
        canCopy && (
          <span className="py-2 inline-block mr-2">
            <Button onClick={handleCopy} loading={loading}>
              复制富文本
            </Button>
          </span>
        )
      )
    }

    return (
      <div className="markdown-to-richtext-root">
        {renderCopy()}
        
        {editable && (
          <div className="mb-4">
            <textarea
              ref={textareaRef}
              value={mdText}
              onChange={handleChange}
              className="w-full h-48 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="输入Markdown文本..."
            />
          </div>
        )}
        
        <div
          ref={mdRef}
          className={cn(
            'w-full relative rounded shadow markdown-body', 
            themeClassName, 
            sizeClassName, 
            className
          )}
        >
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {mdText}
          </ReactMarkdown>
        </div>
      </div>
    )
  }
)

export type { Md2RichTextProps, Md2RichTextRef }

export default Md2RichText 