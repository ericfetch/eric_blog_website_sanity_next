import Link from 'next/link';
import { client } from '@/sanity/client'; // 假设这是项目中已存在的 Sanity 客户端
import './index.css';

async function getCategories() {
    const query = `*[_type == "category"] {
        _id,
        title,
    } | order(title asc)`;
    
    try {
        const categories = await client.fetch(query);
        return categories;
    } catch (error) {
        console.error('获取分类错误:', error);
        return [];
    }
}

export default async function Footer() {
    const categories = await getCategories();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-about">
                        <h3 className="footer-title">关于博客</h3>
                        <p>这是一个专注于技术分享的个人博客，记录我在编程道路上的所思所想，希望能帮助到更多的开发者。</p>
                    </div>
                    <div className="footer-links">
                        <h3 className="footer-title">快速链接</h3>
                        <ul>
                            <li><Link href="/">首页</Link></li>
                            <li><Link href="/articles">文章</Link></li>
                            <li><Link href="/categories">分类</Link></li>
                            <li><Link href="/about">关于</Link></li>
                            <li><Link href="/contact">联系</Link></li>
                        </ul>
                    </div>
                    <div className="footer-categories">
                        <h3 className="footer-title">文章分类</h3>
                        <ul>
                            {categories.map((category: any) => (
                                <li key={category._id}>
                                    <Link href={`/category/${category._id}`}>
                                        {category.title.zh}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-subscribe">
                        <h3 className="footer-title">订阅更新</h3>
                        <form className="subscribe-form">
                            <input type="email" placeholder="您的邮箱地址" required />
                            <button type="submit" className="btn primary-btn">订阅</button>
                        </form>
                    </div>
                </div>

            </div>
            <button className="back-to-top"><i className="fas fa-arrow-up"></i></button>
        </footer>
    );
}