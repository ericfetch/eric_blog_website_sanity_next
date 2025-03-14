import Link from 'next/link'
import './index.css'

export default function PostListHot() {
    return (
        <div className="trending-posts">
            <div className="section-header">
                <h2>热门讨论</h2>
                <Link href="#" className="more-link">更多 <i className="fas fa-chevron-right"></i></Link>
            </div>
            <div className="posts-list">
                <article className="post-item discussion">
                    <div className="post-meta">
                        <span className="post-type"><i className="fas fa-fire"></i> 热议</span>
                        <span className="reply-count">89 回复</span>
                    </div>
                    <h3 className="post-title">
                        <Link href="#">2024年前端工程师应该关注哪些技术方向？</Link>
                    </h3>
                    <div className="post-preview">
                        目前正在学习React，想了解一下除了React之外，还有哪些技术值得投入时间学习...
                    </div>
                </article>
            </div>
        </div>
    )
}
