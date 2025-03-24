import './index.css';
import Image from 'next/image';
interface RelatedArticle {
  title: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  return (
    <section className="related-articles">
      <div className="section-header">
        <h2>相关推荐</h2>
        <div className="section-line"></div>
      </div>
      <div className="related-grid">
        {articles.map((article, index) => (
          <article key={index} className="related-card">
            <div className="related-thumbnail">
              <Image src={article.image} alt={`${article.title}的缩略图`} width={400} height={400} />
            </div>
            <div className="related-content">
              <h3 className="related-title"><a href={article.link}>{article.title}</a></h3>
              <div className="related-meta">
                <span className="related-date">{article.date}</span>
                <span className="related-time">{article.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles; 