import TopicCard from '@/components/TopicCard';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';
import { client } from '@/sanity/client';

export default async function TechTopicsSection() {
  // 直接进行服务器端数据获取
  let topics = [];
  
  try {
    // 获取所有类型为topic的分类
    topics = await client.fetch(`
      *[_type == "category" && defined(type) && type == "topic"] {
        _id,
        title,
        "slug": _id,
        "marketBody": marketBody,
        icon,
        iconColor,
        bgColor,
        "articles": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0..2] {
          _id,
          title,
          "slug": _id
        },
        "articleCount": count(*[_type == "post" && references(^._id)])
      }
    `);
  } catch (error) {
    console.error("获取专题数据失败:", error);
    topics = [];
  }

  return (
    <div className={styles.techTopicsSection}>
      <div className="container">
        <SectionHeader 
          title="技术专题" 
          linkText="查看全部" 
          linkUrl="/topics" 
        />
        
        <div className={styles.topicsGrid}>
          {topics.length === 0 ? (
            <div className={styles.loading}>暂无数据</div>
          ) : (
            topics.map((topic: any, index: any) => (
              <TopicCard 
                key={topic._id || index}
                title={topic.title.zh}
                articleCount={topic.articleCount}
                description={topic.marketBody}
                articles={topic.articles}
                slug={topic.slug}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
} 