"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Head';
import AuthInfo from '@/components/AuthInfo';
import SocialLogin from '@/components/SocialLogin';
import PasswordStrength from '@/components/PasswordStrength';
import './page.css';

export default function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strengthLevel, setStrengthLevel] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // 简单的密码强度检测
    let level = 0;
    if (newPassword.length > 6) level += 1;
    if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) level += 1;
    if (/[0-9]/.test(newPassword) || /[^A-Za-z0-9]/.test(newPassword)) level += 1;
    
    setStrengthLevel(level);
    
    // 检查密码是否匹配
    setPasswordsMatch(newPassword === confirmPassword || confirmPassword === '');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    
    // 检查密码是否匹配
    setPasswordsMatch(password === newConfirmPassword || newConfirmPassword === '');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 提交前再次验证密码是否匹配
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // 验证表单完整性
    if (!username || !email || !password) {
      setError('请填写所有必填项');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // 调用注册API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email,
          password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '注册失败');
      }
      
      // 注册成功，可以存储token并重定向
      // 设置cookie
      document.cookie = `token=${data.token}; path=/; max-age=2592000`; // 30天有效期
      
      // 重定向到首页或用户仪表板
      window.location.href = '/';
      
    } catch (err: any) {
      setError(err.message || '注册过程中出现错误，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      
      <main className="auth-page">
            {/* 左侧信息区域 */}
            <AuthInfo 
              title="加入我们"
              description="创建账号后即可访问更多精彩内容，参与社区讨论，记录学习进度。"
              features={[
                { icon: "fas fa-book-reader", text: "个性化学习路线" },
                { icon: "fas fa-comments", text: "参与技术讨论" },
                { icon: "fas fa-bookmark", text: "收藏喜欢的文章" }
              ]}
              switchText="已有账号？"
              switchLink="/login"
              switchBtnText="立即登录"
            />

            {/* 右侧注册表单 */}
            <div className="auth-form">
              <div className="form-header">
                <h1>注册</h1>
              </div>

              {/* 社交登录 */}
              <SocialLogin />


              {/* 注册表单 */}
              <form className="register-form" id="registerForm" onSubmit={handleSubmit}>
                {error && (
                  <div className="error-banner">
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="username">用户名</label>
                  <div className="input-group">
                    <i className="fas fa-user"></i>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      placeholder="请输入用户名"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">邮箱地址</label>
                  <div className="input-group">
                    <i className="fas fa-envelope"></i>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="请输入邮箱地址"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <p className="input-hint">我们将发送验证邮件到此地址</p>
                </div>

                <div className="form-group">
                  <label htmlFor="password">密码</label>
                  <div className="input-group">
                    <i className="fas fa-lock"></i>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      name="password"
                      placeholder="请设置密码"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  
                  {/* 密码强度指示器 */}
                  <PasswordStrength level={strengthLevel} />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">确认密码</label>
                  <div className="input-group">
                    <i className="fas fa-lock"></i>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      id="confirmPassword" 
                      name="confirmPassword"
                      placeholder="请再次输入密码"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {!passwordsMatch && (
                    <p className="error-message">两次输入的密码不一致</p>
                  )}
                </div>

                <div className="form-agreement">
                  <label className="agreement-checkbox">
                    <input type="checkbox" name="agreement" required />
                    <span>我已阅读并同意</span>
                  </label>
                  <Link href="/terms" className="agreement-link">服务条款</Link>
                  <span>和</span>
                  <Link href="/privacy" className="agreement-link">隐私政策</Link>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>处理中...</span>
                  ) : (
                    <>
                      <span>创建账号</span>
                      <i className="fas fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
        
      </main>

    </>
  );
}
