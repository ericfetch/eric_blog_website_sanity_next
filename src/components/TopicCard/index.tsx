import Link from 'next/link';
import styles from './index.module.css';

interface TopicCardProps {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  articleCount: number;
  description: string;
  articles: Array<{title: string; slug: string}>;
  slug: string;
}

export default function TopicCard({
  icon,
  iconColor,
  bgColor,
  title,
  articleCount,
  description,
  articles,
  slug
}: TopicCardProps) {
  return (
    <div className={styles.topicCard}>
      <div className={styles.topicHeader} style={{ backgroundColor: bgColor }}>
        <div className={styles.topicIcon}>
          <i className={icon} style={{ color: iconColor }}></i>
        </div>
        <div className={styles.topicInfo}>
          <h3 className={styles.topicTitle}>{title}</h3>
          <span className={styles.topicCount}>{articleCount}篇文章</span>
        </div>
      </div>
      <div className={styles.topicContent}>
        <p className={styles.topicDescription}>{description}</p>
        <div className={styles.topicArticles}>
          {articles.map((article, index) => (
            <Link 
              key={index} 
              href={`/article/${article.slug}`} 
              className={styles.topicArticleLink}
            >
              {article.title}
            </Link>
          ))}
        </div>
        <Link href={`/topic/${slug}`} className={styles.topicLink}>
          查看专题 <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
} 