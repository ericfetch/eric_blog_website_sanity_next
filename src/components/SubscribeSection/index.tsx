'use client';

import { useState } from 'react';
import './index.css';
const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理订阅
    console.log('订阅邮箱:', email);
    setEmail('');
  };
  
  return (
    <div className="subscribe-section">
      <div className="container">
        <div className="subscribe-container">
          <div className="subscribe-content">
            <h2>喜欢这篇文章？订阅获取更多内容</h2>
            <p>每周发送精选技术文章和编程技巧，绝不发送垃圾邮件。</p>
          </div>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="您的邮箱地址" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn primary-btn">订阅</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection; 