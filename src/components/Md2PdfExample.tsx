"use client"

import * as React from 'react'
import MDEditor from '@uiw/react-md-editor'
import { useTranslations, useLocale } from 'next-intl'
import html2pdf from 'html2pdf.js'

// 使用与Md2RichTextExample相同的示例Markdown
const sampleMarkdownEN = `# Markdown to PDF Example

## Basic Formatting

This is **bold**, this is *italic*, this is ~~strikethrough~~.

## Lists

Unordered list:

* Item 1
* Item 2
  * Nested item A
  * Nested item B

Ordered list:

1. First item
2. Second item
3. Third item

## Code

\`\`\`javascript
// This is a code block
function greet() {
  console.log("Hello, world!");
}
\`\`\`

## Tables

| Name | Age | Gender |
|------|-----|--------|
| John | 25  | Male   |
| Jane | 28  | Female |

## Quotes

> This is a quoted text.
> Quotes can span multiple lines.

## Links and Images

[This is a link](https://example.com)

![Image example](https://via.placeholder.com/150)
`

const sampleMarkdownZH = `# Markdown PDF转换示例

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

// 复用Md2RichTextExample中的样式逻辑
const getThemeStyles = (theme: string) => {
  switch (theme) {
    case 'dark':
      return {
        container: 'background-color: #1e1e1e; color: #e0e0e0',
        h1h2Border: 'border-bottom-color: #4a5568',
        blockquote: 'color: #a0aec0; border-left-color: #4a5568',
        code: 'background-color: rgba(255, 255, 255, 0.1)',
        pre: 'background-color: #2d2d2d',
        table: 'border-color: #4a5568',
        tableBg: 'background-color: transparent',
        tableAltBg: 'background-color: rgba(0, 0, 0, 0.2)',
        link: 'color: #63b3ed',
        hr: 'background-color: #4a5568',
      };
    case 'blue':
      return {
        container: 'background-color: #ebf8ff; color: #2b6cb0',
        h1h2Border: 'border-bottom-color: #bee3f8',
        blockquote: 'color: #4299e1; border-left-color: #90cdf4',
        code: 'background-color: rgba(66, 153, 225, 0.1)',
        pre: 'background-color: #e1effe',
        table: 'border-color: #bee3f8',
        tableBg: 'background-color: #ebf8ff',
        tableAltBg: 'background-color: #e1effe',
        link: 'color: #3182ce',
        hr: 'background-color: #bee3f8',
      };
    case 'green':
      return {
        container: 'background-color: #f0fff4; color: #276749',
        h1h2Border: 'border-bottom-color: #c6f6d5',
        blockquote: 'color: #38a169; border-left-color: #9ae6b4',
        code: 'background-color: rgba(56, 161, 105, 0.1)',
        pre: 'background-color: #e6ffed',
        table: 'border-color: #c6f6d5',
        tableBg: 'background-color: #f0fff4',
        tableAltBg: 'background-color: #e6ffed',
        link: 'color: #2f855a',
        hr: 'background-color: #c6f6d5',
      };
    default: // light
      return {
        container: 'background-color: white; color: #333',
        h1h2Border: 'border-bottom-color: #eaecef',
        blockquote: 'color: #6a737d; border-left-color: #dfe2e5',
        code: 'background-color: rgba(27, 31, 35, 0.05)',
        pre: 'background-color: #f6f8fa',
        table: 'border-color: #dfe2e5',
        tableBg: 'background-color: #fff',
        tableAltBg: 'background-color: #f6f8fa',
        link: 'color: #0366d6',
        hr: 'background-color: #e1e4e8',
      };
  }
};

const getFontSizeStyle = (size: string) => {
  switch (size) {
    case 'small':
      return 'font-size: 0.875rem';
    case 'large':
      return 'font-size: 1.125rem';
    default: // medium
      return 'font-size: 1rem';
  }
};

const getFontFamilyStyle = (family: string) => {
  switch (family) {
    case 'serif':
      return 'font-family: Georgia, Cambria, "Times New Roman", Times, serif';
    case 'mono':
      return 'font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
    default: // sans
      return 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
  }
};

// 复用转换逻辑，把markdown转成带样式的HTML
const markdownToHtml = (
  markdown: string,
  theme: string,
  fontSize: string,
  fontFamily: string,
  pageSize: string
): string => {
  // 获取样式
  const themeStyles = getThemeStyles(theme);
  const fontSizeStyle = getFontSizeStyle(fontSize);
  const fontFamilyStyle = getFontFamilyStyle(fontFamily);
  
  // 基本容器样式 - 正确组合各样式属性，每个属性之间用分号分隔
  const containerStyle = `${themeStyles.container}; ${fontSizeStyle}; line-height: 1.6; padding: 16px; ${fontFamilyStyle}`;
  
  // 各元素样式
  const h1Style = `margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; font-size: 2em; padding-bottom: 0.3em; ${themeStyles.h1h2Border}`;
  const h2Style = `margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; font-size: 1.5em; padding-bottom: 0.3em; ${themeStyles.h1h2Border}`;
  const h3Style = `margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; font-size: 1.25em;`;
  const h4Style = `margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; font-size: 1em;`;
  const h5Style = `margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; font-size: 0.875em;`;
  const h6Style = `margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; font-size: 0.85em; color: #6a737d;`;
  
  const pStyle = `margin-top: 0; margin-bottom: 16px;`;
  const strongStyle = `font-weight: 600;`;
  const emStyle = `font-style: italic;`;
  const delStyle = `text-decoration: line-through;`;
  
  const blockquoteStyle = `padding: 0 1em; ${themeStyles.blockquote} border-left: 0.25em solid; margin: 0 0 16px 0;`;
  
  const ulStyle = `padding-left: 2em; margin-top: 0; margin-bottom: 16px;`;
  const olStyle = `padding-left: 2em; margin-top: 0; margin-bottom: 16px;`;
  const liStyle = `margin-top: 0.25em;`;
  
  const codeStyle = `padding: 0.2em 0.4em; margin: 0; font-size: 85%; ${themeStyles.code} border-radius: 3px; font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;`;
  const preStyle = `padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; ${themeStyles.pre} border-radius: 3px; margin-bottom: 16px;`;
  const preCodeStyle = `padding: 0; margin: 0; font-size: 100%; background-color: transparent; border: 0;`;
  
  const tableStyle = `width: 100%; border-spacing: 0; border-collapse: collapse; margin-top: 0; margin-bottom: 16px; border: 1px solid ${themeStyles.table};`;
  const thStyle = `padding: 6px 13px; border: 1px solid;${themeStyles.table}; font-weight: 600;`;
  const tdStyle = `padding: 6px 13px; border: 1px solid;${themeStyles.table};`;
  const trStyle = `${themeStyles.tableBg};`;
  const trAltStyle = `${themeStyles.tableAltBg};`;
  
  const aStyle = `${themeStyles.link} text-decoration: none;`;
  const imgStyle = `max-width: 100%; box-sizing: content-box; background-color: #fff;`;
  
  const hrStyle = `height: 0.25em; padding: 0; margin: 24px 0; ${themeStyles.hr} border: 0;`;
  
  // 将Markdown转换为带内联样式的HTML片段
  let html = markdown
    .replace(/^# (.*$)/gm, `<h1 style="${h1Style}">$1</h1>`)
    .replace(/^## (.*$)/gm, `<h2 style="${h2Style}">$1</h2>`)
    .replace(/^### (.*$)/gm, `<h3 style="${h3Style}">$1</h3>`)
    .replace(/^#### (.*$)/gm, `<h4 style="${h4Style}">$1</h4>`)
    .replace(/^##### (.*$)/gm, `<h5 style="${h5Style}">$1</h5>`)
    .replace(/^###### (.*$)/gm, `<h6 style="${h6Style}">$1</h6>`)
    .replace(/\*\*(.*?)\*\*/g, `<strong style="${strongStyle}">$1</strong>`)
    .replace(/\*(.*?)\*/g, `<em style="${emStyle}">$1</em>`)
    .replace(/~~(.*?)~~/g, `<del style="${delStyle}">$1</del>`)
    .replace(/^\> (.*)$/gm, `<blockquote style="${blockquoteStyle}">$1</blockquote>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="${aStyle}">$1</a>`)
    .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, `<img src="$2" alt="$1" style="${imgStyle}">`)
    .replace(/`([^`]+)`/g, `<code style="${codeStyle}">$1</code>`)
    .replace(/```([\s\S]*?)```/g, `<pre style="${preStyle}"><code style="${preCodeStyle}">$1</code></pre>`)
    .replace(/^- (.*$)/gm, `<li style="${liStyle}">$1</li>`)
    .replace(/^\* (.*$)/gm, `<li style="${liStyle}">$1</li>`)
    .replace(/^[0-9]+\. (.*$)/gm, `<li style="${liStyle}">$1</li>`);

  // 表格处理 - 改进表格处理逻辑，正确识别表格头部和分隔行
  let inTable = false;
  let tableContent = '';
  let hasHeader = false;
  let rowIndex = 0;
  
  const lines = html.split('\n');
  let newLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 检测表格开始
    if (line.startsWith('|') && line.endsWith('|') && !inTable) {
      inTable = true;
      hasHeader = false;
      tableContent = `<table style="${tableStyle}">`;
      rowIndex = 0;
    }
    
    // 处理表格内容
    if (inTable) {
      const trimmedLine = line.trim();
      
      // 检测是否是分隔行 (包含 ----- 的行)
      if (trimmedLine.startsWith('|') && trimmedLine.includes('-') && trimmedLine.match(/\|[-\s|]+\|/)) {
        hasHeader = true;
        continue; // 跳过分隔行
      }
      
      // 处理表格行
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        const cells = trimmedLine.slice(1, -1).split('|');
        
        let cellTag = hasHeader && rowIndex === 0 ? 'th' : 'td';
        let cellStyle = hasHeader && rowIndex === 0 ? thStyle : tdStyle;
        
        const rowStyle = rowIndex % 2 === 0 ? trStyle : trAltStyle;
        
        tableContent += `<tr style="${rowStyle}">`;
        cells.forEach(cell => {
          tableContent += `<${cellTag} style="${cellStyle}">${cell.trim()}</${cellTag}>`;
        });
        tableContent += '</tr>';
        
        rowIndex++;
      } else {
        // 表格结束
        tableContent += '</table>';
        newLines.push(tableContent);
        inTable = false;
        continue;
      }
    } else {
      newLines.push(line);
    }
  }
  
  // 如果文档末尾还有未闭合的表格
  if (inTable) {
    tableContent += '</table>';
    newLines.push(tableContent);
  }
  
  html = newLines.join('\n');
  
  // 处理列表和其他标签
  html = html
    .replace(/(<li style="[^"]+">.*<\/li>)/g, `<ul style="${ulStyle}">$1</ul>`) // 简化处理，合并列表项
    .replace(/<\/ul>\s*<ul/g, '</ul><ul') // 移除相邻的关闭和开始标签
    .replace(/^([^<].*)/gm, `<p style="${pStyle}">$1</p>`) // 将纯文本行包装为段落
    .replace(/<p style="[^"]+"><\/p>/g, '') // 移除空段落
    .replace(/<p style="[^"]+"><h([1-6]) style/g, '<h$1 style') // 修复段落内的标题
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>') // 修复段落内的标题
    .replace(/<p style="[^"]+"><(ul|ol|pre|blockquote|table) style/g, '<$1 style') // 修复段落内的块元素
    .replace(/<\/(ul|ol|pre|blockquote|table)><\/p>/g, '</$1>'); // 修复段落内的块元素
  
  // 设置页面尺寸样式
  let pageSizeStyle = '';
  if (pageSize === 'a4') {
    pageSizeStyle = 'width: 210mm; min-height: 297mm;';
  } else if (pageSize === 'letter') {
    pageSizeStyle = 'width: 8.5in; min-height: 11in;';
  } else if (pageSize === 'legal') {
    pageSizeStyle = 'width: 8.5in; min-height: 14in;';
  }
  
  // 将整个内容包装在带样式的div容器中，添加页面尺寸样式
  return `<div style="${containerStyle}; ${pageSizeStyle}">${html}</div>`;
};

const Md2PdfExample = () => {
  const t = useTranslations('md2pdf')
  const locale = useLocale()
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'blue' | 'green'>('light')
  const [markdown, setMarkdown] = React.useState(locale === 'zh' ? sampleMarkdownZH : sampleMarkdownEN)
  const [fontSize, setFontSize] = React.useState<'small' | 'medium' | 'large'>('medium')
  const [fontFamily, setFontFamily] = React.useState<'sans' | 'serif' | 'mono'>('sans')
  const [pageSize, setPageSize] = React.useState<'a4' | 'letter' | 'legal'>('a4')
  const [filename, setFilename] = React.useState<string>('markdown-document')
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false)
  
  // HTML 预览区域引用
  const previewRef = React.useRef<HTMLDivElement>(null)

  // 当语言变化时更新示例文本
  React.useEffect(() => {
    setMarkdown(locale === 'zh' ? sampleMarkdownZH : sampleMarkdownEN);
  }, [locale]);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as any)
  }
  
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value as any)
  }
  
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value as any)
  }
  
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(e.target.value as any)
  }
  
  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value)
  }

  const handleMarkdownChange = (value?: string) => {
    setMarkdown(value || '')
  }
  
  // 生成PDF文件
  const generatePdf = async () => {
    if (!markdown) {
      alert(t('emptyMarkdownWarning'))
      return
    }
    
    setIsGenerating(true)
    
    try {
      // 获取带样式的HTML
      const htmlContent = markdownToHtml(markdown, theme, fontSize, fontFamily, pageSize)
      
      // 创建一个临时div来保存HTML内容
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlContent
      document.body.appendChild(tempDiv)
      
      // 配置html2pdf选项
      const options = {
        margin: 10,
        filename: `${filename || 'markdown-document'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: pageSize, orientation: 'portrait' }
      }
      
      // 生成PDF
      await html2pdf().from(tempDiv).set(options).save()
      
      // 清理临时元素
      document.body.removeChild(tempDiv)
    } catch (error) {
      console.error('PDF生成失败:', error)
      alert(t('pdfGenerationError'))
    } finally {
      setIsGenerating(false)
    }
  }
  
  // 获取HTML预览
  const getStyledHtml = () => {
    return markdownToHtml(markdown, theme, fontSize, fontFamily, pageSize);
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('title')}</h1>
      
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* 左侧控制和输入区 */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('settings')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('theme')}</label>
                <select 
                  value={theme} 
                  onChange={handleThemeChange}
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
                  onChange={handleFontSizeChange}
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
                  onChange={handleFontFamilyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="sans">{t('default')}</option>
                  <option value="serif">{t('serif')}</option>
                  <option value="mono">{t('mono')}</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('pageSize')}</label>
                <select 
                  value={pageSize} 
                  onChange={handlePageSizeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="a4">A4</option>
                  <option value="letter">{t('letter')}</option>
                  <option value="legal">{t('legal')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('filename')}</label>
                <input 
                  type="text" 
                  value={filename} 
                  onChange={handleFilenameChange}
                  placeholder={t('filenameHint')}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>
            </div>
            
            <div>
              <button 
                onClick={generatePdf}
                disabled={isGenerating}
                className={`w-full px-4 py-2 ${isGenerating ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-center items-center`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('generating')}
                  </>
                ) : t('generatePdf')}
              </button>
            </div>
          </div>
          
          {/* Markdown 输入区 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('editMarkdown')}</h2>
            <div data-color-mode="light">
              <MDEditor
                height={400}
                preview='edit'
                value={markdown}
                onChange={handleMarkdownChange}
              />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('instructions')}</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('instruction1')}</li>
              <li>{t('instruction2')}</li>
              <li>{t('instruction3')}</li>
              <li>{t('instruction4')}</li>
              <li>{t('instruction5')}</li>
            </ul>
          </div>
        </div>
        
        {/* 右侧预览区 */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('preview')}</h2>
            <p className="text-sm text-gray-500 mb-4">{t('previewDescription')}</p>
            
            <div 
              ref={previewRef}
              className="border border-gray-200 rounded overflow-auto" 
              style={{
                minHeight: '500px',
                maxHeight: '800px',
                padding: '0.5rem',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
              }}
              dangerouslySetInnerHTML={{ __html: getStyledHtml() }}
            />
            
            <div className="mt-4 text-sm text-gray-500">
              <p>{t('pdfNote')}</p>
              <p className="mt-2"><strong>{t('pageSetupNote')}</strong> {t('pageSetupNoteDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Md2PdfExample 