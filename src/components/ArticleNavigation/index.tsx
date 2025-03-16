import './index.css';
interface NavItem {
  title: string;
  link: string;
}

interface ArticleNavigationProps {
  prev?: NavItem;
  next?: NavItem;
}

const ArticleNavigation = ({ prev, next }: ArticleNavigationProps) => {
  return (
    <div className="article-navigation">
      {prev && (
        <a href={prev.link} className="nav-item prev">
          <span className="nav-label"><i className="fas fa-arrow-left"></i> 上一篇</span>
          <span className="nav-title">{prev.title}</span>
        </a>
      )}
      {next && (
        <a href={next.link} className="nav-item next">
          <span className="nav-label">下一篇 <i className="fas fa-arrow-right"></i></span>
          <span className="nav-title">{next.title}</span>
        </a>
      )}
    </div>
  );
};

export default ArticleNavigation; 