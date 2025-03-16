import './index.css';
interface Tag {
  name: string;
  link: string;
}

interface ArticleTagsProps {
  tags: Tag[];
}

const ArticleTags = ({ tags }: ArticleTagsProps) => {
  return (
    <div className="article-tags">
      <span className="tags-title">文章标签：</span>
      <div className="tags-list">
        {tags.map((tag, index) => (
          <a key={index} href={tag.link} className="tag-item">{tag.name}</a>
        ))}
      </div>
    </div>
  );
};

export default ArticleTags; 