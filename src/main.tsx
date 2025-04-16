import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// 导入富文本样式
import './packages/Md2RichText/styles.css'
import './packages/Md2RichText/richtext.css'

// 应用Tailwind CSS
import './tailwind.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
