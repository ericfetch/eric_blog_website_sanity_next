import './index.css';
interface AuthorInfo {
  name: string;
  title: string;
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
    <header className="article-header">
      <div className="article-category">
        <a href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</a>
      </div>
      <h1 className="article-title">{title}</h1>
      <div className="article-meta">
        <div className="article-author">
          <img src={author.avatar} alt="作者头像" />
          <div className="author-info">
            <a href={`/author/${author.name.toLowerCase().replace(/\s+/g, '')}`} className="author-name">{author.name}</a>
            <span className="author-title">{author.title}</span>
          </div>
        </div>
        <div className="article-info">
          <span className="article-date"><i className="far fa-calendar"></i> {date}</span>
          <span className="article-time"><i className="far fa-clock"></i> {readTime}</span>
          <span className="article-views"><i className="far fa-eye"></i> {views}</span>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader; 