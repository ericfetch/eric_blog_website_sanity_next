import CategoryCard from '@/components/CategoryCard';
import styles from './index.module.css';

// 分类数据
const categories = [
  {
    icon: "fas fa-code",
    iconColor: "#2B6CB0",
    bgColor: "#E9F5FF",
    title: "前端开发",
    description: "HTML, CSS, JavaScript, React, Vue等前端技术的深度探索",
    count: 42,
    slug: "frontend"
  },
  {
    icon: "fas fa-server",
    iconColor: "#2F855A",
    bgColor: "#F0FFF4",
    title: "后端开发",
    description: "Node.js, Python, Java, 数据库等后端技术和架构设计",
    count: 38,
    slug: "backend"
  },
  {
    icon: "fas fa-mobile-alt",
    iconColor: "#C53030",
    bgColor: "#FFF5F5",
    title: "移动开发",
    description: "React Native, Flutter, iOS, Android等移动应用开发技术",
    count: 24,
    slug: "mobile"
  },
  {
    icon: "fas fa-sitemap",
    iconColor: "#4C51BF",
    bgColor: "#EBF4FF",
    title: "算法与数据结构",
    description: "常见算法、数据结构及其在实际编程中的应用",
    count: 19,
    slug: "algorithm"
  },
  {
    icon: "fas fa-cogs",
    iconColor: "#DD6B20",
    bgColor: "#FFFAF0",
    title: "DevOps",
    description: "CI/CD, Docker, Kubernetes, 自动化部署等DevOps实践",
    count: 15,
    slug: "devops"
  },
  {
    icon: "fas fa-tools",
    iconColor: "#4A5568",
    bgColor: "#F0F4F8",
    title: "工具与效率",
    description: "提升开发效率的工具、技巧和最佳实践",
    count: 27,
    slug: "tools"
  }
];

export default function CategoriesSection() {
  return (
    <section className={styles.categoriesSection}>
      <div className="container">
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              icon={category.icon}
              iconColor={category.iconColor}
              bgColor={category.bgColor}
              title={category.title}
              description={category.description}
              count={category.count}
              slug={category.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 