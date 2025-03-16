import './page.css'
import Header from '@/components/Head'
import Footer from '@/components/Footer'
import { client } from '@/sanity/client'

// 从Sanity获取文章
async function getArticles() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      publishedAt,
      category->{_id,title},
      tags[]->{_id,title}
     
    }
  `)
}

// 将组件改为异步组件以获取数据
export default async function Articles() {
    const articles = await getArticles();
    
    return (
        <div className='articles-page'>
           <Header />
           <main className='articles-main'>
            <div className='articles-container'>
                <h1 className='page-title'>所有文章</h1>
                <div className='articles-list'>
                    {articles.length === 0 ? (
                      <p className='no-articles'>目前还没有文章</p>
                    ) : (
                      articles.map((article) => (
                        <div key={article._id} className='article-item'>
                          <div className='article-item-content'>
                            <div className='article-info'>
                              <h2>{article.title}</h2>
                              <p className='article-date'>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</p>
                            </div>
                            <div className='article-tags'>
                                {article.tags && article.tags.length > 0 && article.tags.map((tag) => (
                                    <span key={tag._id}>{tag.title}</span>
                                ))}
                            </div>
                            <div className='article-category'>
                                {article.category && <span>{article.category.title}</span>}
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
