import * as React from 'react'
// import '../packages/Md2RichText/styles.css'
// import '../packages/Md2RichText/richtext.css'
import MDEditor from '@uiw/react-md-editor'

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

// 获取主题的内联样式
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

// 获取字体大小的内联样式
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

// 获取字体族的内联样式
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

// 使用marked库或类似转换工具效果更好，这里为了简化演示使用基本转换
const markdownToHtml = (
  markdown: string,
  theme: string,
  fontSize: string,
  fontFamily: string
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
  
  // 将整个内容包装在带样式的div容器中
  return `<div style="${containerStyle}">${html}</div>`;
};

const Md2RichTextExample = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'blue' | 'green'>('light')
  const [markdown, setMarkdown] = React.useState(sampleMarkdown)
  const [fontSize, setFontSize] = React.useState<'small' | 'medium' | 'large'>('medium')
  const [fontFamily, setFontFamily] = React.useState<'sans' | 'serif' | 'mono'>('sans')
  
  // HTML 输出内容的引用
  const htmlOutputRef = React.useRef<HTMLDivElement>(null)
  const htmlCodeRef = React.useRef<HTMLPreElement>(null)

  // 复制富文本内容
  const handleCopyRichText = async () => {
    try {
      // 生成带内联样式的富文本HTML
      const richTextHtml = markdownToHtml(markdown, theme, fontSize, fontFamily);
      
      // 创建一个临时元素
      const tempElem = document.createElement('div')
      tempElem.innerHTML = richTextHtml
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
      
      alert('富文本已复制到剪贴板')
    } catch (error) {
      console.error('复制失败:', error)
      alert('复制失败')
    }
  }

  // 复制HTML代码
  const handleCopyHtmlCode = async () => {
    try {
      const htmlCode = markdownToHtml(markdown, theme, fontSize, fontFamily);
      await navigator.clipboard.writeText(htmlCode)
      alert('HTML代码已复制到剪贴板')
    } catch (error) {
      console.error('复制失败:', error)
      alert('复制失败')
    }
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as any)
  }
  
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value as any)
  }
  
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value as any)
  }

  const handleMarkdownChange = (value?: string) => {
    setMarkdown(value || '')
  }
  
  // 根据当前设置获取富文本CSS类 (用于预览)
  const getRichTextClass = () => {
    return `rich-text-output rich-text-theme-${theme} rich-text-size-${fontSize} rich-text-font-${fontFamily}`;
  }

  // 获取HTML代码 (用于展示)
  const getHtml = () => {
    // 使用普通的HTML转换用于展示
    let basicHtml = markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/^\> (.*)$/gm, '<blockquote>$1</blockquote>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/^[0-9]+\. (.*$)/gm, '<li>$1</li>');
      
    // 处理表格
    let inTable = false;
    let tableContent = '';
    let hasHeader = false;
    
    const lines = basicHtml.split('\n');
    let newLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 检测表格开始
      if (line.startsWith('|') && line.endsWith('|') && !inTable) {
        inTable = true;
        hasHeader = false;
        tableContent = '<table border="1" cellpadding="6" cellspacing="0" style="width: 100%; border-collapse: collapse;">';
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
          
          let cellTag = hasHeader && tableContent.indexOf('<tr>') === -1 ? 'th' : 'td';
          
          tableContent += '<tr>';
          cells.forEach(cell => {
            tableContent += `<${cellTag} style="border: 1px solid #ddd; padding: 6px 13px;">${cell.trim()}</${cellTag}>`;
          });
          tableContent += '</tr>';
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
    
    basicHtml = newLines.join('\n');
      
    // 其他元素处理  
    basicHtml = basicHtml
      .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>') // 简化处理，合并列表项
      .replace(/<\/ul>\s*<ul>/g, '') // 移除相邻的关闭和开始标签
      .replace(/^([^<].*)/gm, '<p>$1</p>') // 将纯文本行包装为段落
      .replace(/<p>\s*<\/p>/g, '') // 移除空段落
      .replace(/<p><h([1-6])>/g, '<h$1>') // 修复段落内的标题
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>') // 修复段落内的标题
      .replace(/<p><(ul|ol|pre|blockquote|table)>/g, '<$1>') // 修复段落内的块元素
      .replace(/<\/(ul|ol|pre|blockquote|table)><\/p>/g, '</$1>'); // 修复段落内的块元素
    
    return basicHtml;
  }

  // 获取带样式的完整HTML
  const getStyledHtml = () => {
    // 直接调用已有的markdownToHtml函数
    return markdownToHtml(markdown, theme, fontSize, fontFamily);
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Markdown 转富文本工具</h1>
      
      <div className="flex flex-col md:flex-row p-4 gap-4">
        {/* 左侧控制和输入区 */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">富文本设置</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">主题</label>
                <select 
                  value={theme} 
                  onChange={handleThemeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="light">明亮</option>
                  <option value="dark">深色</option>
                  <option value="blue">蓝色</option>
                  <option value="green">绿色</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">字体大小</label>
                <select 
                  value={fontSize} 
                  onChange={handleFontSizeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="small">小</option>
                  <option value="medium">中</option>
                  <option value="large">大</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">字体类型</label>
                <select 
                  value={fontFamily} 
                  onChange={handleFontFamilyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="sans">默认</option>
                  <option value="serif">衬线字体</option>
                  <option value="mono">等宽字体</option>
                </select>
              </div>
            </div>
            
            {/* <div>
              <button 
                onClick={handleCopyRichText}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                复制富文本内容
              </button>
            </div> */}
          </div>
          
          {/* Markdown 输入区 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">编辑 Markdown</h2>
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
            <h2 className="text-xl font-bold mb-4">使用说明</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>在左侧编辑 Markdown 文本</li>
              <li>右侧上方展示转换后的HTML代码（带内联样式）</li>
              <li>右侧下方展示实际渲染效果</li>
              <li>使用富文本设置自定义外观</li>
              <li>点击"复制富文本内容"按钮复制带样式的富文本</li>
              <li>点击"复制HTML代码"按钮复制带内联样式的HTML代码</li>
              <li>可粘贴到Word、邮件等支持富文本的编辑器中</li>
            </ul>
          </div>
        </div>
        
        {/* 右侧富文本区 */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">带样式的HTML代码</h2>
              <button 
                onClick={handleCopyHtmlCode}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                复制HTML代码
              </button>
            </div>
            <div className="border border-gray-200 rounded bg-gray-100 p-3 overflow-auto text-sm font-mono" style={{maxHeight: '200px'}}>
              <pre ref={htmlCodeRef}>{getStyledHtml()}</pre>
            </div>
            <p className="text-xs text-gray-500 mt-2">此处显示转换后的HTML代码（带内联样式），点击上方按钮复制</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="text-xl font-bold mb-4">富文本预览</h2>
            <div 
              ref={htmlOutputRef}
              className="border border-gray-200 rounded overflow-auto" 
              style={{minHeight: '500px'}}
              dangerouslySetInnerHTML={{ __html: getStyledHtml() }}
            />
            <p className="text-xs text-gray-500 mt-2">上方是富文本渲染效果，点击"复制富文本内容"可将此内容以富文本格式复制到剪贴板</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Md2RichTextExample 