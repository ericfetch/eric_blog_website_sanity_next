import './page.css'
import Header from '@/components/Head'
import Footer from '@/components/Footer'
import { client } from '@/sanity/client'

// 获取特定分类信息
async function getCategory(categoryId: string) {
  return await client.fetch(`
    *[_type == "category" && _id == $categoryId][0] {
      _id,
      title
    }
  `, { categoryId })
}

// 从Sanity获取特定分类的文章
async function getArticles(categoryId: string) {
  return await client.fetch(`
    *[_type == "post" && category._ref == $categoryId] | order(publishedAt desc) {
      _id,
      title,
      publishedAt,
      category->{_id,title},
      tags[]->{_id,title}
     
    }
  `, { categoryId })
}

// 将组件改为异步组件以获取数据
export default async function CategoryArticles({ params }: { params: { id: string } }) {
    const categoryId = params.id;
    const category = await getCategory(categoryId);
    const articles = await getArticles(categoryId);
    
    return (
        <div className='articles-page'>
           <Header />
           <main className='articles-main container'>
            <div className='articles-container'>
                <h1 className='page-title'>{category?.title?.zh || '分类文章'}</h1>
                <div className='articles-list'>
                    {articles.length === 0 ? (
                      <p className='no-articles'>该分类下暂无文章</p>
                    ) : (
                      articles.map((article) => (
                        <div key={article._id} className='article-item'>
                          <div className='article-item-content'>
                            <div className='article-info'>
                              <h2>{article.title.zh}</h2>
                              <p className='article-date'>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</p>
                            </div>
                            <div className='article-tags'>
                                {article.tags && article.tags.length > 0 && article.tags.map((tag) => (
                                    <span key={tag._id}>{tag.title}</span>
                                ))}
                            </div>
                            <div className='article-category'>
                                {article.category && <span>{article.category.title.zh}</span>}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                </div>
            </div>
           </main>
           <Footer />
        </div>
    )
}
