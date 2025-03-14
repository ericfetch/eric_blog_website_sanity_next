import Head from "@/components/Head";
import PostListRecent from "@/components/PostListRecent";
import ProjectList from "@/components/ProjectList";
import PostListHot from "@/components/PostListHot";

import './page.css'
export default function Home() {
  return (
    <>
      <Head />
      <main className="main-content">
        <div className="container">
          <div className="content-layout">
            {/* 主要文章列表 */}
            <div className="main-column">
              {/* 最新发布 */}

              <PostListRecent />
              <PostListHot />
            </div>

            {/* 侧边栏 */}
            <aside className="sidebar">
              {/* 精选专栏 */}
              <ProjectList />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
