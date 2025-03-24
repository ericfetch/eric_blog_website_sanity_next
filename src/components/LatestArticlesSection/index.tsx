import ArticleCard from '@/components/ArticleCard';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';

// 文章数据
const articles = [
  {
    category: "前端开发",
    thumbnail: "https://via.placeholder.com/400x250",
    title: "React 18新特性详解与实践指南",
    date: "2023年12月20日",
    readTime: "8",
    excerpt: "React 18带来了并发渲染、自动批处理等重要更新，本文详细介绍这些新特性及其在实际项目中的应用...",
    slug: "react-18-features"
  },
  {
    category: "后端开发",
    thumbnail: "https://via.placeholder.com/400x250",
    title: "Node.js中的流处理详解",
    date: "2023年12月15日",
    readTime: "15",
    excerpt: "在处理大型数据集时，Node.js的流是一个强大的概念，它允许我们以高效的方式处理数据，而无需一次性将所有数据加载到内存中...",
    slug: "nodejs-streams"
  },
  {
    category: "DevOps",
    thumbnail: "https://via.placeholder.com/400x250",
    title: "使用GitHub Actions实现自动化部署",
    date: "2023年12月10日",
    readTime: "10",
    excerpt: "GitHub Actions提供了强大的CI/CD能力，本文将详细介绍如何使用它来自动化部署前端和后端应用...",
    slug: "github-actions-deploy"
  }
];

export default function LatestArticlesSection() {
  return (
    <section className={styles.latestArticlesSection}>
      <div className="container">
        <SectionHeader 
          title="最新文章" 
          linkText="查看全部" 
          linkUrl="/articles" 
        />
        
        <div className={styles.articlesGrid}>
          {articles.map((article, index) => (
            <ArticleCard 
              key={index}
              category={article.category}
              thumbnail={article.thumbnail}
              title={article.title}
              date={article.date}
              readTime={article.readTime}
              excerpt={article.excerpt}
              slug={article.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 