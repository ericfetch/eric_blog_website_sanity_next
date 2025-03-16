"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import './index.css'

export default function Head() {
    const pathname = usePathname();
    
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="logo">
                        <Link href="/">Eric<span>.wen</span></Link>
                    </div>
                    <nav className="main-nav">
                        <ul>
                            <li><Link href="/" className={pathname === "/" ? "active" : ""}>首页</Link></li>
                            <li><Link href="/articles" className={pathname === "/articles" ? "active" : ""}>文章</Link></li>
                            <li><Link href="/categories" className={pathname === "/categories" ? "active" : ""}>分类</Link></li>
                            <li><Link href="/about" className={pathname === "/about" ? "active" : ""}>关于</Link></li>
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