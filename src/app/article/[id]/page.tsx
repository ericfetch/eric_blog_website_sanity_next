import ArticleHeader from '@/components/ArticleHeader';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import ArticleLead from '@/components/ArticleLead';
import ArticleContent from '@/components/ArticleContent';
import ArticleTags from '@/components/ArticleTags';
import AuthorCard from '@/components/AuthorCard';
import ArticleNavigation from '@/components/ArticleNavigation';
import RelatedArticles from '@/components/RelatedArticles';
import CommentsSection from '@/components/CommentsSection';
import ArticleActions from '@/components/ArticleActions';
import SeriesNavigation from '@/components/SeriesNavigation';
import SubscribeSection from '@/components/SubscribeSection';
import ImageViewer from '@/components/ImageViewer';
import SharePopup from '@/components/SharePopup';
import Head from '@/components/Head';
import Footer from '@/components/Footer';
import './page.css';
import { client } from '@/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { notFound } from 'next/navigation';

const builder = imageUrlBuilder(client);

export function urlForImage(source: any) {
  return builder.image(source);
}

// 添加获取文章数据的函数
async function getArticle(id: string) {
  const query = `*[_type == "post" && _id == $id][0]{
    _id,
    title,
    
    publishedAt,
    body,
   
    mainImage,
    categories[]->{
      _id,
      title
    
    },
   
    tags[]->{
      _id,
      name
    },
    "relatedPosts": *[_type == "post" && _id != $id && count(categories[@._ref in ^.^.categories[]._ref]) > 0][0...3]{
      _id,
      title,
     
      publishedAt,
      mainImage,
      "readTime": round(length(pt::text(body)) / 1000)
    },
    "prevPost": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{
      _id,
      title,
      slug
    },
    "nextPost": *[_type == "post" && publishedAt > ^.publishedAt] | order(publishedAt asc)[0]{
      _id,
      title,
      slug
    }
  }`;
  
  return client.fetch(query, { id });
}


export default async function ArticlePage({params}: {params: {id: string}} ) {
  const { id } = params;
  
  // 获取文章数据
  const article = await getArticle(id);
  
  // 如果文章不存在，返回404
  if (!article) {
    notFound();
  }
  
  // 默认值设置
  const defaultReadTime = 5;
  const defaultCategory = "未分类";
  const defaultAuthor = {
    name: "匿名作者",
    bio: "作者简介",
    image: null
  };
  const defaultTags: any[] = [];
  const defaultRelatedPosts: any[] = [];
  
  // 计算阅读时间（假设1000字约需5分钟）
  const readTime = article.body ? Math.ceil(article.body.length / 1000) * 5 : defaultReadTime;
  
  // 从文章数据中获取系列信息，如果没有则为null
  const seriesData = article.seriesInfo ? {
    title: article.seriesInfo.title,
    count: article.seriesInfo.posts?.length || 0,
    current: article.seriesInfo.posts?.findIndex(post => post._id === id) + 1 || 1,
    articles: article.seriesInfo.posts?.map((post, index) => ({
      number: index + 1,
      title: post.title,
      link: `/article/${post._id}`,
      completed: new Date(post.publishedAt) < new Date(),
      current: post._id === id
    })) || []
  } : null;
  
  return (
    <>
      <Head />
      <ReadingProgress  />

      <main className="article-main" >
        <div className="container article-layout">
          <TableOfContents />

          <div className="article-container">
            <article className="article-content">
              <ArticleHeader
                category={article.categories?.[0]?.title || defaultCategory}
                title={article.title || "无标题文章"}
                author={{
                  name: article.author?.name || defaultAuthor.name,
                  title: article.author?.bio?.substring(0, 20) || defaultAuthor.bio,
                  avatar: article.author?.image ? urlForImage(article.author.image).url() : "https://via.placeholder.com/40x40"
                }}
                date={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : "未知日期"}
                readTime={`${readTime}分钟阅读`}
                views="计算中..."
              />

              <ArticleLead>
                {article.excerpt || "这篇文章暂无简介"}
              </ArticleLead>

              <ArticleContent content={article.body} />

              <ArticleTags
                tags={(article.tags || defaultTags).map(tag => ({
                  name: tag.name || "未命名标签",
                  link: `/tags/${tag.slug?.current || tag._id || "unknown"}`
                }))}
              />

              <AuthorCard
                name={article.author?.name || defaultAuthor.name}
                avatar={article.author?.image ? urlForImage(article.author.image).url() : "https://via.placeholder.com/80x80"}
                bio={article.author?.bio || defaultAuthor.bio}
                links={article.author?.socialLinks || []}
              />

              <ArticleNavigation
                prev={article.prevPost ? { 
                  title: article.prevPost.title, 
                  link: `/article/${article.prevPost._id}` 
                } : null}
                next={article.nextPost ? { 
                  title: article.nextPost.title, 
                  link: `/article/${article.nextPost._id}` 
                } : null}
              />
            </article>

            <RelatedArticles
              articles={(article.relatedPosts || defaultRelatedPosts).map(post => ({
                title: post.title || "相关文章",
                date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('zh-CN') : "未知日期",
                readTime: `${post.readTime || defaultReadTime}分钟阅读`,
                image: post.mainImage ? urlForImage(post.mainImage).width(300).height(180).url() : "https://via.placeholder.com/300x180",
                link: `/article/${post._id}`
              }))}
            />

            <CommentsSection />
          </div>

          <ArticleActions />
        </div>
      </main>

      {seriesData && (
        <SeriesNavigation
          title={seriesData.title}
          count={seriesData.count}
          current={seriesData.current}
          articles={seriesData.articles}
        />
      )}

      <SubscribeSection />

      <ImageViewer
        image={article.mainImage ? urlForImage(article.mainImage).url() : "https://via.placeholder.com/800x450"}
      />

      <SharePopup />

      <button className="toc-floating-btn">
        <i className="fas fa-list"></i>
      </button>

      <div className="toc-mobile"></div>
      <Footer />
    </>
  );
}
