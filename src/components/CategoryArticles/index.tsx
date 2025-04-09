import Link from 'next/link';
import { urlForImage } from '@/sanity/imageUrl';
import { client } from '@/sanity/client';
import './index.css'

interface CategoryArticlesProps {
  categoryId: string;
  categoryTitle:string;
  currentArticleId: string;
}

async function fetchCategoryArticles(categoryId: string, currentArticleId: string) {
  const query = `*[_type == "post" && category._ref == $categoryId] | order(publishedAt asc)[0...5]{
    _id,
    title
  }`;

  return await client.fetch(query, { 
    categoryId, 
    currentId: currentArticleId 
  });
}

export default async function CategoryArticles({ 
  categoryId, 
  categoryTitle,
  currentArticleId 
}: CategoryArticlesProps) {
    console.log(categoryId,currentArticleId)
  const categoryArticles = await fetchCategoryArticles(categoryId, currentArticleId);

  console.log(categoryArticles)
  if (!categoryArticles || categoryArticles.length === 0) {
    return null;
  }

  return (
    <div className="category-articles">
      <h3>{categoryTitle}</h3>
      <div className="category-articles-list">
        {categoryArticles.map((post: any,index:number) => (
          <div key={post._id} className={`category-article-item ${post._id===currentArticleId?'active-item':''}`}>
            <Link className="category-article-info" href={`/article/${post._id}`}>
              {index+1}、{post.title?.zh || "无标题文章"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}