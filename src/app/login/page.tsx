'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import Header from '@/components/Head';
import './page.css';
import AuthInfo from '@/components/AuthInfo';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError('请填写所有必填字段');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // 发送登录请求到API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '登录失败');
            }

             // 设置cookie
             document.cookie = `token=${data.token}; path=/; max-age=2592000`; // 30天有效期
      

            // 登录成功，重定向到仪表板
            router.push('/');
        } catch (err) {
            setIsLoading(false);
            setError(err instanceof Error ? err.message : '登录失败，请检查邮箱和密码');
            console.error('登录错误:', err);
        }
    };

    const handleSocialLogin = (provider: string) => {
        // 处理社交媒体登录
        console.log(`使用 ${provider} 登录`);
    };

    return (
        <>
            <Header />
            <main className="auth-page">
                <AuthInfo
                    title="欢迎回来"
                    description= "登录后即可访问更多精彩内容，参与社区讨论，记录学习进度。"
                    features={[
                        { icon: "fas fa-book-reader", text: "个性化学习路线" },
                        { icon: "fas fa-comments", text: "参与技术讨论" },
                        { icon: "fas fa-bookmark", text: "收藏喜欢的文章" }
                    ]}
                    switchText="还没有账号？"
                    switchLink="/register"
                    switchBtnText="立即注册"
                />
                {/* 右侧登录表单 */}
                <div className="auth-form">
                    <div className="form-header">
                        <h1>登录</h1>
                        <p>使用您的账号登录</p>
                    </div>

                    {/* 社交登录 */}
                    <div className="social-login">
                        <button
                            className="social-btn github"
                            onClick={() => handleSocialLogin('GitHub')}
                            type="button"
                        >
                            <FaGithub />
                            <span>GitHub 登录</span>
                        </button>
                        <button
                            className="social-btn google"
                            onClick={() => handleSocialLogin('Google')}
                            type="button"
                        >
                            <FaGoogle />
                            <span>Google 登录</span>
                        </button>
                    </div>

                    <div className="divider">
                        <span>或使用邮箱登录</span>
                    </div>

                    {/* 登录表单 */}
                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="email">邮箱地址</label>
                            <div className="input-group">
                                <FaEnvelope className="input-icon" />
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
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">密码</label>
                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="请输入密码"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                                <span>记住我</span>
                            </label>
                            <Link href="/forgot-password" className="forgot-password">忘记密码？</Link>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            <span>{isLoading ? '登录中...' : '登录'}</span>
                            {!isLoading && <FaArrowRight />}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
