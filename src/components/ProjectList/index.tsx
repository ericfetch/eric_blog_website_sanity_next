import Link from 'next/link'

import './index.css'
export default function ProjectList() {
    return (
        <section className="featured-series widget">
            <div className="section-header">
                <h2>精选专栏</h2>
                <Link href="#" className="more-link">全部专栏 <i className="fas fa-chevron-right"></i></Link>
            </div>
            <div className="series-list">
                <article className="series-item">
                    <div className="series-info">
                        <h3><Link href="#">TypeScript 实战指南</Link></h3>
                        <div className="series-meta">
                            <span>12 篇文章</span>
                            <span>·</span>
                            <span>328 人在学</span>
                        </div>
                        <div className="series-progress">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '75%' }}></div>
                            </div>
                            <span>更新至 9/12 节</span>
                        </div>
                    </div>
                </article>
                {/* 更多专栏... */}
            </div>
        </section>
    )
}
