'use client';

import { useState, useEffect } from 'react';
import './index.css';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  children: TOCItem[];
}

const TableOfContents = () => {
  const [tocCollapsed, setTocCollapsed] = useState(false);
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  
  // 自动扫描页面上的标题并生成目录
  useEffect(() => {
    const article = document.querySelector('article') || document.body;
    const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items: TOCItem[] = [];
    
    headings.forEach((heading) => {
      // 确保每个标题有id，如果没有则生成一个
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || `heading-${Math.random().toString(36).substr(2, 9)}`;
      
      if (!heading.id) {
        heading.id = id;
      }
      
      const level = parseInt(heading.tagName.substring(1));
      const text = heading.textContent || '';
      
      const item: TOCItem = {
        id,
        text,
        level,
        children: [],
      };
      
      // 构建层次结构
      if (level === 1 || items.length === 0) {
        items.push(item);
      } else {
        let parent = items[items.length - 1];
        // 寻找合适的父级
        while (parent.children.length > 0 && parent.level < level - 1) {
          parent = parent.children[parent.children.length - 1];
        }
        
        if (parent.level === level - 1) {
          parent.children.push(item);
        } else {
          items.push(item);
        }
      }
    });
    
    setTocItems(items);
  }, []);
  
  // 渲染目录项及其子项
  const renderTocItems = (items: TOCItem[]) => {
    return (
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - 50;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {item.text}
            </a>
            {item.children.length > 0 && renderTocItems(item.children)}
          </li>
        ))}
      </ul>
    );
  };

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
            {renderTocItems(tocItems)}
          </div>
        )}
      </div>
    </aside>
  );
};

export default TableOfContents; 