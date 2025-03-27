import styles from './index.module.css';
import Link from 'next/link';
interface AuthorInfo {
  name: string;
  avatar: string;
}

interface ArticleHeaderProps {
  id: string;
  category: string;
  title: string;
  author: AuthorInfo;
  date: string;
  readTime: string;
  views: string;
}

const ArticleHeader = ({
  id,
  category,
  title,
  author,
  date,
  readTime,
  views
}: ArticleHeaderProps) => {
  return (
    <header className={styles['article-header']}>
      <div className={styles['article-category']}>
        <Link href={`/category/${id}`}>所属分类：{category}</Link>
      </div>
      <h1 className={styles['article-title']}>{title}</h1>
      <div className={styles['article-meta']}>



      </div>
      <div className={styles['article-info']}>
        <div className={styles['article-author']}>
          <div className={styles['author-info']}>
            {author.name}
          </div>
          <div className={styles['article-tip']}>
            <span className={styles['article-date']}><i className="far fa-calendar"></i> {date}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader; 