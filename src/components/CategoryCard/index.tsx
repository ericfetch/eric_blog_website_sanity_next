import Link from 'next/link';
import styles from './index.module.css';

interface CategoryCardProps {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
  count: number;
  slug: string;
}

export default function CategoryCard({ 
  icon, 
  iconColor, 
  bgColor, 
  title, 
  description, 
  count, 
  slug 
}: CategoryCardProps) {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryIcon} style={{ backgroundColor: bgColor }}>
        <i className={icon} style={{ color: iconColor }}></i>
      </div>
      <div className={styles.categoryContent}>
        <h2 className={styles.categoryTitle}>{title}</h2>
        <p className={styles.categoryDescription}>{description}</p>
        <span className={styles.categoryCount}>{count}篇文章</span>
        <Link href={`/category/${slug}`} className={styles.categoryLink}>
          浏览文章 <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
} 