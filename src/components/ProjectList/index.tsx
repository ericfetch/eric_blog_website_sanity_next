import Link from 'next/link'
import { client } from '@/sanity/client' // 假设您已经配置了 Sanity 客户端

import './index.css'

interface ProjectSeries {
    _id: string
    title: string
    articleCount: number
    studyCount: number
    progress: number
}
const query = `
*[_type == "category" && (type == "project" || type == "topic")] {
    _id,
    title,
    "articleCount": count(*[_type == "post" && references(^._id)]),

}
`
export default async function ProjectList() {

    const projects = await client.fetch(query)

    return (
        <section className="featured-series widget">
            <div className="section-header">
                <h2>精选专栏</h2>
            </div>
            <div className="series-list">
                {projects.map((project: ProjectSeries) => (
                    <article key={project._id} className="series-item">
                        <div className="series-info">
                            <h3><Link href={`/category/${project._id}`}>{project.title.zh}</Link></h3>
                            <div className="series-meta">
                                <span>{project.articleCount} 篇文章</span>
                                <span>·</span>
                                <span>1人在学</span>
                            </div>
                            <div className="series-progress">
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{ width: `10%` }}
                                    ></div>
                                </div>
                                <span>更新至 10%</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
