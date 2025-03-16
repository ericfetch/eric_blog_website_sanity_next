import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from 'next/link'
import './index.css'

const HOT_POSTS_QUERY = `*[_type == "post"] | order(views desc)[0...5]{
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

export default async function PostListHot() {
    const posts = await client.fetch<SanityDocument[]>(HOT_POSTS_QUERY, {}, { next: { revalidate: 30 } })
    
    return (
        <div className="trending-posts">
            <div className="section-header">
                <h2>热门讨论</h2>
                <Link href="#" className="more-link">更多 <i className="fas fa-chevron-right"></i></Link>
            </div>
            <div className="posts-list">
                {posts.map((post) => (
                    <article key={post._id} className="post-item discussion">
                        <div className="post-meta">
                            <span className="post-type"><i className="fas fa-fire"></i> 热议</span>
                            <span className="post-views">{post.views} 浏览</span>
                        </div>
                        <h3 className="post-title">
                            <Link href="#">{post.title}</Link>
                        </h3>
                        <div className="post-preview">
                            {post.excerpt}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
