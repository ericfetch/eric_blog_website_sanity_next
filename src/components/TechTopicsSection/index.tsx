import TopicCard from '@/components/TopicCard';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';

// 专题数据
const topics = [
  {
    icon: "fab fa-react",
    iconColor: "#319795",
    bgColor: "#E6FFFA",
    title: "React深入理解",
    articleCount: 8,
    description: "从基础到高级，全面解析React核心概念、Hooks、状态管理、性能优化等内容",
    articles: [
      { title: "React Hooks完全指南", slug: "react-hooks-guide" },
      { title: "React性能优化实战", slug: "react-performance" },
      { title: "React状态管理方案对比", slug: "react-state-management" }
    ],
    slug: "react"
  },
  {
    icon: "fas fa-database",
    iconColor: "#3182CE",
    bgColor: "#EBF8FF",
    title: "数据库优化指南",
    articleCount: 6,
    description: "关系型数据库和NoSQL数据库的性能优化、索引设计、查询优化等实用技巧",
    articles: [
      { title: "MySQL索引设计与优化", slug: "mysql-index-optimization" },
      { title: "MongoDB查询性能调优", slug: "mongodb-query-optimization" },
      { title: "Redis缓存策略与实践", slug: "redis-cache-strategies" }
    ],
    slug: "database"
  },
  {
    icon: "fas fa-code-branch",
    iconColor: "#38A169",
    bgColor: "#F0FFF4",
    title: "微服务架构实践",
    articleCount: 5,
    description: "微服务设计原则、服务拆分、通信方式、部署策略及常见问题解决方案",
    articles: [
      { title: "微服务架构设计原则", slug: "microservices-principles" },
      { title: "服务间通信方案对比", slug: "microservices-communication" },
      { title: "微服务监控与追踪", slug: "microservices-monitoring" }
    ],
    slug: "microservices"
  }
];

export default function TechTopicsSection() {
  return (
    <section className={styles.techTopicsSection}>
      <div className="container">
        <SectionHeader 
          title="技术专题" 
          linkText="查看全部" 
          linkUrl="/topics" 
        />
        
        <div className={styles.topicsGrid}>
          {topics.map((topic, index) => (
            <TopicCard 
              key={index}
              icon={topic.icon}
              iconColor={topic.iconColor}
              bgColor={topic.bgColor}
              title={topic.title}
              articleCount={topic.articleCount}
              description={topic.description}
              articles={topic.articles}
              slug={topic.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 