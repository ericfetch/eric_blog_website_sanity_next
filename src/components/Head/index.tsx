import Link from "next/link";
import './index.css'
export default function Head() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <Link href="/">Eric<span>.wen</span></Link>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><Link href="/" className="active">首页</Link></li>
                            <li><Link href="/articles">文章</Link></li>
                            <li><Link href="/categories">分类</Link></li>
                            <li><Link href="/about">关于</Link></li>
                        </ul>
                    </nav>
                    <div className="nav-right">
                        <button className="search-btn"><i className="fas fa-search"></i></button>
                        <button className="theme-toggle"><i className="fas fa-moon"></i></button>
                        <button className="login-btn"><Link href="/login">登录</Link></button>
                        <button className="menu-toggle"><i className="fas fa-bars"></i></button>
                    </div>
                </div>
            </header>
        </>
    )
}