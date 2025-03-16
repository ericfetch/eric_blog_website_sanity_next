'use client';
import './index.css';

const SharePopup = () => {

const url = location.href;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(location.href).then(() => {
      alert('链接已复制到剪贴板');
    }).catch(err => {
      console.error('无法复制链接: ', err);
    });
  };
  
  
  return (
    <div className="share-popup" style={{display: 'none'}}>
      <div className="share-popup-content">
        <h3>分享文章</h3>
        <div className="share-links">
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`} target="_blank" className="share-link twitter" rel="noreferrer">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" className="share-link facebook" rel="noreferrer">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href={`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}`} target="_blank" className="share-link weibo" rel="noreferrer">
            <i className="fab fa-weibo"></i> 微博
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" className="share-link linkedin" rel="noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>
        <div className="share-copy">
          <button className="copy-link-btn" onClick={copyToClipboard}>复制链接</button>
        </div>
        <button className="close-popup-btn" >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default SharePopup; 