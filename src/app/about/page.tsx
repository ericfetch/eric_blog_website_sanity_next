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

          {/* 技能与专长 */}
          <section className="skills-section">
            <h2 className="section-title">技能与专长</h2>
            
            <div className="skills-container">
              <div className="skill-category">
                <h3>前端开发</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#61DAFB' }}>
                      <i className="fab fa-react" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>React</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#41B883' }}>
                      <i className="fab fa-vuejs" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>Vue.js</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#F7DF1E' }}>
                      <i className="fab fa-js" style={{ color: '#000' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>JavaScript</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#3178C6' }}>
                      <span style={{ color: '#fff' }}>TS</span>
                    </div>
                    <div className="skill-info">
                      <h4>TypeScript</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>后端开发</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#339933' }}>
                      <i className="fab fa-node-js" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>Node.js</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#4479A1' }}>
                      <i className="fas fa-database" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>MySQL</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#47A248' }}>
                      <i className="fas fa-leaf" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>MongoDB</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#FF6C37' }}>
                      <i className="fas fa-fire" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>GraphQL</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>DevOps & 工具</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#2496ED' }}>
                      <i className="fab fa-docker" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>Docker</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#F05032' }}>
                      <i className="fab fa-git-alt" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>Git</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#CB3837' }}>
                      <i className="fab fa-npm" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>npm/Yarn</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="skill-item">
                    <div className="skill-icon" style={{ backgroundColor: '#2088FF' }}>
                      <i className="fab fa-github-actions" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="skill-info">
                      <h4>CI/CD</h4>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 我的故事 */}
          <section className="story-section">
            <h2 className="section-title">我的故事</h2>
            
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2015</div>
                <div className="timeline-content">
                  <h3>开始编程之旅</h3>
                  <p>大学期间接触编程，开始学习HTML、CSS和JavaScript，并制作了第一个个人网站。</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2017</div>
                <div className="timeline-content">
                  <h3>第一份开发工作</h3>
                  <p>毕业后加入一家初创公司，担任前端开发工程师，主要使用React开发Web应用。</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2019</div>
                <div className="timeline-content">
                  <h3>转向全栈开发</h3>
                  <p>开始学习Node.js和后端技术，逐渐转向全栈开发。参与了公司核心产品的重构工作。</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2020</div>
                <div className="timeline-content">
                  <h3>开源贡献</h3>
                  <p>开始积极参与开源社区，为几个流行的JavaScript库贡献代码，并发布了自己的开源项目。</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2021</div>
                <div className="timeline-content">
                  <h3>技术博客诞生</h3>
                  <p>创建这个技术博客，开始记录和分享我的技术心得和经验。</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">现在</div>
                <div className="timeline-content">
                  <h3>持续学习与分享</h3>
                  <p>目前在一家科技公司担任高级开发工程师，同时继续学习新技术，并通过这个博客分享我的所学所思。</p>
                </div>
              </div>
            </div>
          </section>

          {/* 博客理念 */}
          <section className="philosophy-section">
            <h2 className="section-title">博客理念</h2>
            
            <div className="philosophy-content">
              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3>分享是最好的学习</h3>
                <p>我相信，通过分享知识，不仅能帮助他人，也能加深自己对知识的理解。写作过程中的思考和整理，往往能发现自己知识体系中的盲点。</p>
              </div>
              
              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <i className="fas fa-code"></i>
                </div>
                <h3>实用性优先</h3>
                <p>这个博客的内容注重实用性，我会尽量避免纯理论的讨论，而是分享实际工作中遇到的问题和解决方案，以及可以直接应用的技术和方法。</p>
              </div>
              
              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <h3>深入浅出</h3>
                <p>技术文章应该既有深度，又容易理解。我努力将复杂的概念用简单的语言和例子解释清楚，让读者能够轻松掌握。</p>
              </div>
              
              <div className="philosophy-item">
                <div className="philosophy-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>开放与互动</h3>
                <p>我欢迎读者的反馈和讨论，相信在交流中能产生更多的想法和见解。这个博客不仅是我的分享平台，也是一个学习社区。</p>
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
