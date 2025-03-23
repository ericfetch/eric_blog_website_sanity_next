import CategoryCard from '@/components/CategoryCard';
import { client } from '@/sanity/client'; // 确保你有正确的Sanity客户端导入路径
import styles from './index.module.css';

// 服务端数据获取函数
async function getCategories() {
  const query = `*[_type == "category" && type == "knowledge"] {
    _id,
    title,
    "slug": _id,
    "description": marketBody,
    icon,
    iconColor,
    bgColor,
    "count": count(*[_type == "post" && references(^._id)])
  }`;
  
  return await client.fetch(query);
}

export default async function CategoriesSection() {
  // 在服务器组件中直接获取数据
  const categories = await getCategories();
  
  return (
    <section className={styles.categoriesSection}>
      <div className="container">
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <CategoryCard 
              key={category._id}
              title={category.title.zh}
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