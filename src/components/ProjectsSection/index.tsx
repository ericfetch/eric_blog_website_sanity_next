import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';

// 项目数据
const projects = [
  {
    thumbnail: "https://via.placeholder.com/500x300",
    badges: ["React", "Node.js", "MongoDB"],
    title: "全栈博客系统开发",
    description: "从零开始，使用React、Node.js和MongoDB构建一个完整的博客系统，包含用户认证、文章管理、评论系统等功能",
    difficulty: "中级",
    tutorialCount: 8,
    slug: "blog-system"
  },
  {
    thumbnail: "https://via.placeholder.com/500x300",
    badges: ["Vue", "Express", "MySQL"],
    title: "在线电商平台实现",
    description: "使用Vue.js和Express构建一个功能完整的电商平台，包括商品展示、购物车、订单管理、支付集成等功能",
    difficulty: "高级",
    tutorialCount: 12,
    slug: "ecommerce"
  }
];

export default function ProjectsSection() {
  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <SectionHeader 
          title="实战项目专区" 
          linkText="查看全部" 
          linkUrl="/projects"
        />
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              thumbnail={project.thumbnail}
              badges={project.badges}
              title={project.title}
              description={project.description}
              difficulty={project.difficulty}
              tutorialCount={project.tutorialCount}
              slug={project.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 