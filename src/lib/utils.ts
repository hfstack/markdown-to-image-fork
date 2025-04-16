import { ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!navigator.clipboard) {
      // 回退到传统方法（仅文本）
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.width = '2em'
      textArea.style.height = '2em'
      textArea.style.padding = '0'
      textArea.style.border = 'none'
      textArea.style.outline = 'none'
      textArea.style.boxShadow = 'none'
      textArea.style.background = 'transparent'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        if (successful) {
          resolve(true)
        } else {
          reject(new Error('无法复制文本'))
        }
      } catch (err) {
        document.body.removeChild(textArea)
        reject(err)
      }
    } else {
      // 使用现代API
      navigator.clipboard.writeText(text)
        .then(() => resolve(true))
        .catch(err => reject(err))
    }
  })
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// 解析markdown文本，提取标题和简短描述
export function parseMarkdown(markdown: string): { title: string; description: string } {
  const lines = markdown.split('\n')
  
  // 尝试找到第一个标题
  let title = ''
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '')
      break
    }
  }
  
  // 如果没有找到标题，取第一行文本
  if (!title && lines.length > 0) {
    title = lines[0].slice(0, 50)
  }
  
  // 找到第一段非空文本作为描述
  let description = ''
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('!') && !trimmed.startsWith('```')) {
      description = trimmed.slice(0, 100)
      break
    }
  }
  
  return { 
    title: title || '无标题文档', 
    description: description || '无描述'
  }
}
