import styles from './index.module.css';

interface SeriesArticle {
  number: number;
  title: string;
  link: string;
  completed: boolean;
  current?: boolean;
}

interface SeriesNavigationProps {
  title: string;
  count: number;
  current: number;
  articles: SeriesArticle[];
}

const SeriesNavigation = ({ title, count, current, articles }: SeriesNavigationProps) => {
  const progressPercentage = (current / count) * 100;
  
  return (
    <section className={styles.seriesNavigation}>
      <div className={styles.container}>
        <div className={styles.seriesContainer}>
          <div className={styles.seriesHeader}>
            <h2 className={styles.seriesTitle}>{title}</h2>
            <span className={styles.seriesCount}>共{count}篇文章，当前第{current}篇</span>
          </div>
          <div className={styles.seriesProgress}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className={styles.seriesArticles}>
            {articles.map((article) => (
              <a 
                key={article.number}
                href={article.link} 
                className={`
                  ${styles.seriesArticle} 
                  ${article.completed ? styles.completed : ''} 
                  ${article.current ? styles.current : ''}
                `}
              >
                <span className={styles.articleNumber}>{article.number}</span>
                <span className={styles.articleTitle}>{article.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesNavigation; 