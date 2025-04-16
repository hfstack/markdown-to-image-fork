import * as React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  
  // 检查当前路径
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-white underline font-bold' : 'text-white hover:underline';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部导航栏 */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Markdown 工具集</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className={isActive('/')}>海报生成</Link></li>
              <li><Link to="/md2richTxt" className={isActive('/md2richTxt')}>富文本转换</Link></li>
              <li><a href="https://github.com/gcui-art/markdown-to-image" target="_blank" rel="noreferrer" className="text-white hover:underline">GitHub</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Markdown 工具集 - 保留所有权利</p>
      </footer>
    </div>
  );
};

export default Layout; 