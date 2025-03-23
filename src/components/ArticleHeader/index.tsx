import styles from './index.module.css';
interface AuthorInfo {
  name: string;
  avatar: string;
}

interface ArticleHeaderProps {
  category: string;
  title: string;
  author: AuthorInfo;
  date: string;
  readTime: string;
  views: string;
}

const ArticleHeader = ({ 
  category, 
  title, 
  author, 
  date, 
  readTime, 
  views 
}: ArticleHeaderProps) => {
  return (
    <header className={styles.articleHeader}>
      <div className={styles.articleCategory}>
        <a href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</a>
      </div>
      <h1 className={styles.articleTitle}>{title}</h1>
      <div className={styles.articleMeta}>
        <div className={styles.articleAuthor}>
          <div className={styles.authorInfo}>
            <a href={`/author/${author.name.toLowerCase().replace(/\s+/g, '')}`} className={styles.authorName}>{author.name}</a>
          </div>
        </div>
        <div className={styles.articleInfo}>
          <span className={styles.articleDate}><i className="far fa-calendar"></i> {date}</span>
          <span className={styles.articleTime}><i className="far fa-clock"></i> {readTime}</span>
          <span className={styles.articleViews}><i className="far fa-eye"></i> {views}</span>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader; 