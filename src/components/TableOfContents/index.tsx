'use client';

import { useState } from 'react';
import './index.css';
const TableOfContents = () => {
  const [tocCollapsed, setTocCollapsed] = useState(false);
  
  return (
    <aside className="article-toc">
      <div className="toc-container">
        <div className="toc-header">
          <h2>目录</h2>
          <button 
            className="toc-toggle" 
            onClick={() => setTocCollapsed(!tocCollapsed)}
          >
            <i className={`fas fa-chevron-${tocCollapsed ? 'down' : 'up'}`}></i>
          </button>
        </div>
        {!tocCollapsed && (
          <div className="toc-content">
            <ul className="toc-list">
              <li><a href="#introduction">1. 流的基本概念</a></li>
              <li>
                <a href="#types">2. 流的类型</a>
                <ul>
                  <li><a href="#readable">2.1 可读流</a></li>
                  <li><a href="#writable">2.2 可写流</a></li>
                  <li><a href="#duplex">2.3 双工流</a></li>
                  <li><a href="#transform">2.4 转换流</a></li>
                </ul>
              </li>
              <li>
                <a href="#examples">3. 实际应用示例</a>
                <ul>
                  <li><a href="#file-processing">3.1 文件处理</a></li>
                  <li><a href="#http">3.2 HTTP请求处理</a></li>
                  <li><a href="#data-processing">3.3 数据转换处理</a></li>
                </ul>
              </li>
              <li><a href="#best-practices">4. 最佳实践</a></li>
              <li><a href="#conclusion">5. 总结</a></li>
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default TableOfContents; 