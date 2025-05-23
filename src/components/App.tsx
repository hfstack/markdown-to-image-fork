'use client'

import * as React from 'react'
import { Md2Poster, Md2PosterContent, Md2PosterHeader } from '../packages'
import MDEditor from '@uiw/react-md-editor'
import { useTranslations } from 'next-intl'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const t = useTranslations('common')
  const md2postT = useTranslations('md2post')
  const markdownRef = React.useRef<any>(null)
  const [markdown, setMarkdown] = React.useState(`# AI Morning News - April 29th
  ![image](https://imageio.forbes.com/specials-images/imageserve/64b5825a5b9b4d3225e9bd15/artificial-intelligence--ai/960x0.jpg?format=jpg&width=1440)
  1. **MetaElephant Company Releases Multi-Modal Large Model XVERSE-V**: Supports image input of any aspect ratio, performs well in multiple authoritative evaluations, and has been open-sourced.
  2. **Tongyi Qianwen Team Open-Sources Billion-Parameter Model Qwen1.5-110B**: Uses Transformer decoder architecture, supports multiple languages, and has an efficient attention mechanism.
  3. **Shengshu Technology and Tsinghua University Release Video Large Model Vidu**: Adopts a fusion architecture of Diffusion and Transformer, generates high-definition videos with one click, leading internationally.
  4. **Mutable AI Launches Auto Wiki v2**: Automatically converts code into Wikipedia-style articles, solving the problem of code documentation.
  5. **Google Builds New Data Center in the U.S.**: Plans to invest $3 billion to build a data center campus in Indiana, expand facilities in Virginia, and launch an artificial intelligence opportunity fund.
  6. **China Academy of Information and Communications Technology Releases Automobile Large Model Standard**: Aims to standardize and promote the intelligent development of the automotive industry.
  7. Kimi Chat Mobile App Update: Version 1.2.1 completely revamps the user interface, introduces a new light mode, and provides a comfortable and intuitive experience.
    `)

  const [theme, setTheme] = React.useState<any>('SpringGradientWave')
  const [size, setSize] = React.useState<any>('mobile')
  
  const handleCopy = () => {
    markdownRef?.current?.handleCopy().then(() => {
      alert('已成功复制到剪贴板')
    }).catch((error: any) => {
      console.error('复制失败:', error)
      alert('复制失败，请稍后再试')
    })
  }
  
  const handleDownload = () => {
    markdownRef?.current?.handleDownload().then(() => {
      alert('已成功下载图片')
    }).catch((error: any) => {
      console.error('下载失败:', error)
      alert('下载失败，请稍后再试')
    })
  }
  
  const copySuccessCallback = () => {
    toast.success(md2postT('copySuccess'), {
      duration: 2000,
      position: 'top-center',
    })
  }
  
  const copyFailedCallback = () => {
    toast.error(md2postT('copyFailed'), {
      duration: 3000,
      position: 'top-center',
    })
  }
  
  const downloadSuccessCallback = () => {
    toast.success(md2postT('downloadSuccess'), {
      duration: 2000,
      position: 'top-center',
    })
  }
  
  const downloadFailedCallback = () => {
    toast.error(md2postT('downloadFailed'), {
      duration: 3000,
      position: 'top-center',
    })
  }

  const handleMarkdownChange = (value?: string) => {
    setMarkdown(value || "")
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
  }

  const themeList = ['blue', 'pink', 'purple', 'green', 'yellow', 'gray', 'red', 'indigo', 'SpringGradientWave']

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <main className="flex-grow flex flex-col md:flex-row  md:p-4 p-2 gap-4">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white md:p-4 p-2 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('posterSettings')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">{t('theme')}</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={theme}
                  onChange={handleThemeChange}
                >
                  {themeList.map((item) => (
                    <option value={item} key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">{t('size')}</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="size" 
                      value="mobile" 
                      checked={size === 'mobile'} 
                      onChange={() => setSize('mobile')}
                      className="mr-2"
                    />
                    {t('mobile')}
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="size" 
                      value="desktop" 
                      checked={size === 'desktop'} 
                      onChange={() => setSize('desktop')}
                      className="mr-2"
                    />
                    {t('desktop')}
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white md:p-4 p-2 rounded-lg shadow-md">
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
        </div>
        
        <div className="w-full md:w-1/2 bg-white md:p-4 p-0 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">{t('posterPreview')}</h2>
          <div className="border border-gray-200 rounded-md p-1 overflow-auto max-h-[800px] flex justify-center w-full">
            <div className="flex justify-center w-full">
              <Md2Poster 
                theme={theme}
                size={size}
                ref={markdownRef} 
                copySuccessCallback={copySuccessCallback}
                copyFailedCallback={copyFailedCallback}
                downloadSuccessCallback={downloadSuccessCallback}
                downloadFailedCallback={downloadFailedCallback}
                canCopy
                canDownload
                className="flex flex-col items-center"
              >
                <Md2PosterHeader className='flex justify-center items-center w-full px-4 text-center'>
                  <span className='text-2xl font-bold'>{new Date().toISOString().slice(0, 10)}</span>
                </Md2PosterHeader>
                <Md2PosterContent className="mx-auto px-2">{markdown}</Md2PosterContent>
              </Md2Poster>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App