import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css';

interface ArticleCardProps {
  category: string;
  thumbnail: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  slug: string;
}

export default function ArticleCard({
  category,
  thumbnail,
  title,
  date,
  readTime,
  excerpt,
  slug
}: ArticleCardProps) {
  return (
    <article className={styles.articleCard}>
      <div className={styles.articleThumbnail}>
        <span className={styles.articleCategory}>{category}</span>
        <Image 
          src={thumbnail} 
          alt={`${title} 缩略图`} 
          width={400} 
          height={250} 
          layout="responsive"
        />
      </div>
      <div className={styles.articleContent}>
        <h3 className={styles.articleTitle}>
          <Link href={`/article/${slug}`}>{title}</Link>
        </h3>
        <div className={styles.articleMeta}>
          <span className={styles.articleDate}>
            <i className="far fa-calendar"></i> {date}
          </span>
          <span className={styles.articleTime}>
            <i className="far fa-clock"></i> {readTime}分钟阅读
          </span>
        </div>
        <p className={styles.articleExcerpt}>{excerpt}</p>
        <Link href={`/article/${slug}`} className={styles.readMore}>
          阅读全文 <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
} 