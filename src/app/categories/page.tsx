import Header from '@/components/Head';
import Footer from '@/components/Footer';
import PageTitle from '@/components/PageTitle';
import CategoriesSection from '@/components/CategoriesSection';
import TechTopicsSection from '@/components/TechTopicsSection';
import ProjectsSection from '@/components/ProjectsSection';

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <PageTitle 
        title="文章分类" 
        description="探索不同领域的技术文章，找到你感兴趣的主题" 
      />
      <CategoriesSection />
      <TechTopicsSection />
      <ProjectsSection />
      <Footer />
    </>
  );
}
