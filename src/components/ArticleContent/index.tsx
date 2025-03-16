import './index.css';
import PostBody from '../PostBody';
const ArticleContent = (props: { content: Array<any> }) => {
    const { content } = props;
    return (
        <div className="article-body">
           <PostBody content={content} />
        </div>
    );
};

export default ArticleContent; 