'use client'

import * as React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useTranslations } from 'next-intl'

const sampleMarkdown = `# Markdown 富文本转换示例

## 基本格式

这是**粗体**，这是*斜体*，这是~~删除线~~。

## 列表

无序列表：

* 项目 1
* 项目 2
  * 嵌套项目 A
  * 嵌套项目 B

有序列表：

1. 第一项
2. 第二项
3. 第三项

## 代码

\`\`\`javascript
// 这是一段代码
function greet() {
  console.log("你好，世界！");
}
\`\`\`

## 表格

| 姓名 | 年龄 | 性别 |
|------|-----|------|
| 张三 | 25  | 男   |
| 李四 | 28  | 女   |

## 引用

> 这是一段引用文本。
> 引用可以有多行。

## 链接和图片

[这是一个链接](https://example.com)

![图片示例](https://via.placeholder.com/150)
`

// ... 其他辅助函数保持不变 ...

const Md2RichTextExample = () => {
  const t = useTranslations('common')
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'blue' | 'green'>('light')
  const [markdown, setMarkdown] = React.useState(sampleMarkdown)
  const [fontSize, setFontSize] = React.useState<'small' | 'medium' | 'large'>('medium')
  const [fontFamily, setFontFamily] = React.useState<'sans' | 'serif' | 'mono'>('sans')
  
  // ... 其他状态和处理函数保持不变 ...

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('markdownToRichText')}</h1>
      
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* 左侧控制和输入区 */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('richTextSettings')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('theme')}</label>
                <select 
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="light">{t('light')}</option>
                  <option value="dark">{t('dark')}</option>
                  <option value="blue">{t('blue')}</option>
                  <option value="green">{t('green')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fontSize')}</label>
                <select 
                  value={fontSize} 
                  onChange={(e) => setFontSize(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="small">{t('small')}</option>
                  <option value="medium">{t('medium')}</option>
                  <option value="large">{t('large')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fontFamily')}</label>
                <select 
                  value={fontFamily} 
                  onChange={(e) => setFontFamily(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="sans">{t('default')}</option>
                  <option value="serif">{t('serif')}</option>
                  <option value="mono">{t('monospace')}</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('editMarkdown')}</h2>
            <div data-color-mode="light">
              <MDEditor
                height={400}
                preview='edit'
                value={markdown}
                onChange={(value) => setMarkdown(value || '')}
              />
            </div>
          </div>
        </div>
        
        {/* 右侧预览区 */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('styledHtmlCode')}</h2>
            </div>
            <div className="border border-gray-200 rounded bg-gray-100 p-3 overflow-auto text-sm font-mono" style={{maxHeight: '200px'}}>
              <pre>{/* 这里显示转换后的HTML代码 */}</pre>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="text-xl font-bold mb-4">{t('richTextPreview')}</h2>
            <div 
              className="border border-gray-200 rounded overflow-auto" 
              style={{minHeight: '500px'}}
            >
              {/* 这里显示富文本预览 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Md2RichTextExample 