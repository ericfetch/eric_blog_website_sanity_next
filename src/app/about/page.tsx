'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from '@/components/Head';
import { urlFor } from '@/sanity/imageUrl';
import './page.css';
import PostBody from '@/components/PostBody';
export default function AboutPage() {
  const [userData, setUserData] = useState<any>({
    name: 'eric.wen',
    title: '全栈前端/alibaba 前端架构师',
    introduction: '',
    avatar: 'https://assets.ericengineer.com/i/2025/03/31/xccug7.png',
    socialLinks: {},
    contactEmail: 'eric.fetech@gmail.com'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '提交消息失败');
      }

      setSubmitStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('提交消息失败:', error);
      setSubmitStatus({ loading: false, success: false, error: error.message });
    }
  };

  return (
    <>
      <Head />

      {/* 页面标题 */}
      <section className="page-title">
        <div className="container">
          <h1>关于我</h1>
          <p>了解我的故事、技术栈</p>
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
                  src={userData.avatar}
                  alt="博主照片"
                  width={400}
                  height={400}
                />
              </div>
              <div className="about-text">
                <h2>你好，我是{userData.name}</h2>
                <p className="about-subtitle">{userData.title}</p>
                <div className='about-intro'>
                  <div >
                    <p>
                      十二年从业经验，从未离开业务开发，涉及直播、电商、教育、房产、大数据等主流业务生态
                    </p>
                    <p>
                      6年前端负责人，5年架构师经验
                    </p>
                    <p>
                      开发过的项目100+，平台涉及pc\h5\hybrid\rn\electron\小程序\公众号\node等，熟悉从产品形态抽象平台架构。
                    </p>
                    <p>

                      基础设施架构能力，从零搭建前端基础设施，从开发到部署生态，前端建设react\vue与业务结合的自定义脚手架工程、日志收集、ui组件库、业务组件库、sdk设计等。后端nodejs微服务架构的开发和部署。
                    </p>
                  </div>
                </div>

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

                <button
                  type="submit"
                  className="btn primary-btn"
                  disabled={submitStatus.loading}
                >
                  {submitStatus.loading ? '发送中...' : '发送消息'}
                </button>

                {submitStatus.success && (
                  <div className="form-message success">
                    消息已成功发送！
                  </div>
                )}

                {submitStatus.error && (
                  <div className="form-message error">
                    发送失败：{submitStatus.error}
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
