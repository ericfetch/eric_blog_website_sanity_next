'use client';

import { useState } from 'react';
import './index.css';
const CommentsSection = () => {
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理评论提交
    console.log('提交评论:', commentText);
    setCommentText('');
  };
  
  return (
    <section className="comments-section">
      <div className="section-header">
        <h2>评论 (12)</h2>
        <div className="section-line"></div>
      </div>

      {/* 评论表单 */}
      <div className="comment-form-container">
        <h3>发表评论</h3>
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea 
              placeholder="分享你的想法..." 
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-actions">
            <div className="markdown-hint">
              <i className="fab fa-markdown"></i> 支持Markdown语法
            </div>
            <button type="submit" className="btn primary-btn">提交评论</button>
          </div>
        </form>
      </div>

      {/* 评论列表 - 这里只展示静态内容，实际应用中应该从API获取 */}
      <div className="comments-list">
        {/* 评论项 */}
        <div className="comment-item">
          {/* 评论内容... */}
        </div>
        {/* 更多评论... */}
      </div>

      <div className="load-more-container">
        <button className="btn load-more-btn">加载更多评论</button>
      </div>
    </section>
  );
};

export default CommentsSection; 