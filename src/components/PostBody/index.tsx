import React from 'react';
import { PortableText } from '@portabletext/react';

// 自定义组件（可选）
const CustomComponents = {
    types: {
        // 渲染图片
        image: ({ value }) => (
            <img src={value.asset.url} alt={value.alt || 'Image'} style={{ maxWidth: '100%' }} />
        ),
    },
    marks: {
        // 渲染加粗文字
        strong: ({ children }) => <strong>{children}</strong>,
        // 渲染链接
        link: ({ value, children }) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
    },
    block: {
        // 渲染标题
        h2: ({ children }) => <h2>{children}</h2>,
        // 渲染普通段落
        normal: ({ children }) => <p>{children}</p>,
    },
};

export default function PostBody({ content }: { content: Array<any> }) {
    return (
        <div>
            <PortableText value={content} components={CustomComponents} />
        </div>
    );
}