import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import styles from './index.module.css';
import { client } from '@/sanity/client';

export default async function ProjectsSection() {
  // 直接进行服务器端数据获取
  let projects = [];
  
  try {
    // 获取所有类型为project的分类
    projects = await client.fetch(`
      *[_type == "category" && defined(type) && type == "project"] {
        _id,
        title,
        "slug": _id,
        description,
        thumbnail,
        difficulty,
        badges,
        "tutorialCount": count(*[_type == "post" && references(^._id)]),
        "tutorials": *[_type == "post" && references(^._id)] | order(publishedAt desc)
      }
    `);
  } catch (error) {
    console.error("获取项目数据失败:", error);
    projects = [];
  }

  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <SectionHeader 
          title="实战项目专区" 
          linkText="查看全部" 
          linkUrl="/projects"
        />
        
        <div className={styles.projectsGrid}>
          {projects.length === 0 ? (
            <div className={styles.loading}>暂无项目数据</div>
          ) : (
            projects.map((project, index) => (
              <ProjectCard 
                key={project._id || index}
                thumbnail={project.thumbnail}
                badges={project.badges}
                title={project.title.zh}
                description={project.description}
                difficulty={project.difficulty}
                tutorialCount={project.tutorialCount}
                slug={project.slug}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
} 