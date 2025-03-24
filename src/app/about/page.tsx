'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from '@/components/Head';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/imageUrl';
import './page.css';
import PostBody from '@/components/PostBody';

export default function AboutPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const query = `*[_type == "profile"][0]{
          name,
          title,
          introduction,
          avatar,
          socialLinks {
            github,
            twitter,
            linkedin,
            zhihu,
            weibo
          },
          contactEmail
        }`;
        
        const data = await client.fetch(query);
        setUserData(data);
      } catch (error) {
        console.error('获取用户信息失败', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('表单提交数据:', formData);
    alert('消息已发送！');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  if (loading) {
    return <div>加载中...</div>;
  }

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
                  src={urlFor(userData.avatar).width(400).height(400).url()} 
                  alt="博主照片"
                  width={400}
                  height={400}
                />
              </div>
              <div className="about-text">
                <h2>你好，我是{userData.name}</h2>
                <p className="about-subtitle">{userData.title}</p>
                
             
                <PostBody content={userData.introduction} />
                
                <div className="social-links">
                  {userData.socialLinks.github && (
                    <a href={userData.socialLinks.github} className="social-link" title="GitHub">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {userData.socialLinks.twitter && (
                    <a href={userData.socialLinks.twitter} className="social-link" title="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {userData.socialLinks.linkedin && (
                    <a href={userData.socialLinks.linkedin} className="social-link" title="LinkedIn">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {userData.socialLinks.zhihu && (
                    <a href={userData.socialLinks.zhihu} className="social-link" title="知乎">
                      <i className="fab fa-zhihu"></i>
                    </a>
                  )}
                  {userData.socialLinks.weibo && (
                    <a href={userData.socialLinks.weibo} className="social-link" title="微博">
                      <i className="fab fa-weibo"></i>
                    </a>
                  )}
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
                  <li><i className="fas fa-envelope"></i> <a href={`mailto:${userData.contactEmail}`}>{userData.contactEmail}</a></li>
                  {userData.socialLinks.github && (
                    <li>
                      <i className="fab fa-github"></i> 
                      <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        {userData.socialLinks.github.replace('https://', '')}
                      </a>
                    </li>
                  )}
                  {userData.socialLinks.twitter && (
                    <li>
                      <i className="fab fa-twitter"></i> 
                      <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        {userData.socialLinks.twitter.replace('https://twitter.com/', '@')}
                      </a>
                    </li>
                  )}
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
