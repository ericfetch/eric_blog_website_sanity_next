import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
const POSTS_QUERY = `*[_type == "post"]{
  ...,
  "tags": tags[]->{ 
    _id,
    title
  },
  "category": category->{ 
    _id,
    title
  }
}`;

import './index.css'
import Link from "next/link";
export default async function PostListRecent() {
    
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, { next: { revalidate: 30 } })
    console.log(posts)
    return (
        <section className="latest-posts">
            <div className="section-header">
                <h2>最新发布</h2>
                <Link href="#" className="more-link">更多 <i className="fas fa-chevron-right"></i></Link>
            </div>
            <div className="posts-list">
                {
                    posts.map((post: any) => (
                            <article key={post._id} className="post-item" >
                            <div className="post-meta">
                               <Link href={`/category/${post.category._id}`}>{post.category.title.zh}</Link>
                                <time>{new Date(post.publishedAt).toISOString().split('T')[0]}</time>
                            </div>
                            <h3 className="post-title">
                                <Link href={`/article/${post._id}`}>{post.title.zh}</Link>
                            </h3>
                            <div className="post-info">
                                <div className="post-tags">
                                    {post.tags?.map((tag: any) => (
                                        <div className="post-tag" key={tag?._id}>{tag.title}</div>
                                    ))}
                                </div>
                                <div className="post-stats">
                                    <span><i className="far fa-eye"></i> 1.2k</span>
                                    <span><i className="far fa-comment"></i> 23</span>
                                </div>
                            </div>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}
