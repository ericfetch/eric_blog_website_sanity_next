'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from '@/components/Head';
import './page.css';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('表单提交数据:', formData);
    // 在这里可以添加表单提交逻辑
    alert('消息已发送！');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Head />

      {/* 页面标题 */}
      <section className="page-title">
        <div className="container">
          <h1>关于我</h1>
          <p>了解我的故事、技术栈和博客理念</p>
        </div>
      </section>

      {/* 主要内容 */}
      <main className="about-main">
        <div className="container">
          {/* 个人介绍 */}
          <section className="about-section">
            <div className="about-content">
              <div className="about-image">
                <Image 
                  src="https://via.placeholder.com/400x400" 
                  alt="博主照片"
                  width={400}
                  height={400}
                />
              </div>
              <div className="about-text">
                <h2>你好，我是张三</h2>
                <p className="about-subtitle">全栈开发者 / 技术博主 / 开源爱好者</p>
                
                <p>我是一名拥有8年经验的全栈开发者，专注于JavaScript生态系统，包括React、Node.js和相关技术。目前在一家科技公司担任高级开发工程师，负责设计和实现复杂的Web应用。</p>
                
                <p>除了工作，我热衷于开源社区，是几个流行JavaScript库的贡献者。我相信知识共享的力量，这也是我创建这个博客的主要原因——记录学习过程，分享技术心得，同时也希望能帮助到其他开发者。</p>
                
                <div className="social-links">
                  <a href="#" className="social-link" title="GitHub"><i className="fab fa-github"></i></a>
                  <a href="#" className="social-link" title="Twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-link" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
                  <a href="#" className="social-link" title="知乎"><i className="fab fa-zhihu"></i></a>
                  <a href="#" className="social-link" title="微博"><i className="fab fa-weibo"></i></a>
                </div>
              </div>
            </div>
          </section>

       

          {/* 联系方式 */}
          <section className="contact-section">
            <h2 className="section-title">联系我</h2>
            
            <div className="contact-content">
              <div className="contact-info">
                <p>如果你有任何问题、建议或合作意向，欢迎通过以下方式联系我：</p>
                
                <ul className="contact-list">
                  <li><i className="fas fa-envelope"></i> <a href="mailto:example@example.com">example@example.com</a></li>
                  <li><i className="fab fa-github"></i> <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">github.com/username</a></li>
                  <li><i className="fab fa-twitter"></i> <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer">@username</a></li>
                </ul>
                
                <p>你也可以通过下面的表单给我发送消息：</p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">邮箱</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">主题</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">消息</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn primary-btn">发送消息</button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
