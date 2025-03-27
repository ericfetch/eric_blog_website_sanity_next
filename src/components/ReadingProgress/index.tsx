'use client';

import { useEffect, useState } from 'react';
import './index.css';


const ReadingProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
        const element = document.querySelector('.article-main');
        if (!element) return;
        const totalHeight = element.clientHeight;
        const windowScrollTop = window.scrollY;
      
      if (windowScrollTop === 0) {
        setReadingProgress(0);
        return;
      }
      
      if (windowScrollTop >= totalHeight) {
        setReadingProgress(100);
        return;
      }
      
      setReadingProgress((windowScrollTop / totalHeight) * 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="reading-progress-container">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${readingProgress}%` }}
      ></div>
    </div>
  );
};

export default ReadingProgress; 