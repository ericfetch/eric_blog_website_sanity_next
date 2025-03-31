import Link from 'next/link';
import { client } from '@/sanity/client'; // 假设这是项目中已存在的 Sanity 客户端
import './index.css';

async function getStaticProps() {
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
    const categories = await getStaticProps();

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
                            <li><Link href="/articles">所有文章</Link></li>
                            <li><Link href="/categories">所有分类</Link></li>
                            <li><Link href="/about">关于作者</Link></li>                        </ul>
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
                        <h3 className="footer-title">合作业务</h3>
                        <ul>
                            <li>项目开发</li>
                            <li>技术支持</li>
                            <li>技术咨询</li>
                            <li>技术培训</li>
                        </ul>
                    </div>
                </div>

            </div>
            
        </footer>
    );
}