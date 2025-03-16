import './index.css';
interface ArticleLeadProps {
  children: React.ReactNode;
}

const ArticleLead = ({ children }: ArticleLeadProps) => {
  return (
    <div className="article-lead">
      {children}
    </div>
  );
};

export default ArticleLead; 