"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/useUser";
import './index.css'
import { useRouter } from "next/navigation";

export default function Head() {
    const pathname = usePathname();
    const { user, loading, logout } = useUser();
    const router = useRouter();
    return (
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
                        <li><Link href="/about" className={pathname === "/about" ? "active" : ""}>关于作者</Link></li>
                    </ul>
                </nav>
                <div className="nav-right">
                    {/* <button className="search-btn"><i className="fas fa-search"></i></button> */}
                    {!loading && (
                        user ? (
                            <>
                                <div className="user-info" onClick={() => router.push('/profile')}>
                                    <i className="fas fa-user-circle"></i>
                                    <span className="username">{user.username.split('@')[0]}<span className="highlight">.user</span></span>
                                </div>
                                <button className="logout-btn" onClick={logout}>登出</button>
                            </>
                        ) : (
                            <button className="login-btn"><Link href="/login">登录</Link></button>
                        )
                    )}
                    <button className="menu-toggle"><i className="fas fa-bars"></i></button>
                </div>
            </div>
        </header>
    )
}