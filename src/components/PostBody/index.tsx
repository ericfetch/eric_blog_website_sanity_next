import React from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
// 自定义组件（可选）
const CustomComponents = {
    types: {
        // 渲染图片
        image: ({ value }: { value: any }) => (
            <Image src={value.asset.url} alt={value.alt || 'Image'} width={400} height={400} />
        ),
    },
    marks: {
        // 渲染加粗文字
        strong: ({ children }: { children: any }) => <strong>{children}</strong>,
        // 渲染链接
        link: ({ value, children }: { value: any, children: any }) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ),
    },
    block: {
        // 渲染标题
        h2: ({ children }: { children: any }) => <h2>{children}</h2>,
        // 渲染普通段落
        normal: ({ children }: { children: any }) => <p>{children}</p>,
    },
};

export default function PostBody({ content }: { content: Array<any> }) {
    return (
        <div>
            <PortableText value={content} components={CustomComponents as any} />
        </div>
    );
}