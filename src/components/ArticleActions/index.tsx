'use client';
import './index.css';
interface ArticleActionsProps {
  onShare?: () => void;
}

const ArticleActions = ({ onShare }: ArticleActionsProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const scrollToComments = () => {
    const commentsSection = document.querySelector('.comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const toggleToc = () => {
    const tocMobile = document.querySelector('.toc-mobile');
    if (tocMobile) {
      tocMobile.classList.toggle('active');
    }
  };
  
  return (
    <div className="article-actions">
      <button className="action-btn toc-action" title="目录" onClick={toggleToc}>
        <i className="fas fa-list"></i>
      </button>
      <button className="action-btn share-action" title="分享" onClick={onShare}>
        <i className="fas fa-share-alt"></i>
      </button>
      <button className="action-btn like-action" title="点赞">
        <i className="far fa-heart"></i>
      </button>
      <button className="action-btn bookmark-action" title="收藏">
        <i className="far fa-bookmark"></i>
      </button>
      <button className="action-btn comment-action" title="评论" onClick={scrollToComments}>
        <i className="far fa-comment"></i>
      </button>
      <button className="action-btn top-action" title="回到顶部" onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default ArticleActions;