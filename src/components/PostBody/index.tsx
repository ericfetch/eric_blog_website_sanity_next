import React from 'react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// 导入常用语言
import 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import 'react-syntax-highlighter/dist/esm/languages/prism/json';
import 'react-syntax-highlighter/dist/esm/languages/prism/css';
import 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import 'react-syntax-highlighter/dist/esm/languages/prism/tsx';


import styles from './index.module.css'

const CustomComponents = {
    types: {
        // 改进图片渲染，支持响应式和自定义样式
        image: ({ value }: { value: any }) => (
            <div className="my-4 w-full">
                <Image 
                    src={value.asset.url} 
                    alt={value.alt || 'Image'} 
                    width={800} 
                    height={500} 
                    className="rounded-lg object-cover"
                    layout="responsive"
                />
                {value.caption && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                        {value.caption}
                    </p>
                )}
            </div>
        ),
        // 添加代码块支持
        code: ({ value }: { value: any }) => {
            const { code, language } = value;
            return (
                <div className="my-4 rounded-lg overflow-x-auto">
                    <SyntaxHighlighter 
                        language={'javascript'}
                        style={atomDark} 
                        showLineNumbers={true}
                        copy
                        wrapLines={true}
                        customStyle={{
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            padding: '1rem',
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            );
        },
    },
    marks: {
        // 增强链接样式和行为
        link: ({ value, children }: { value: any, children: any }) => {
            const isExternal = value.href.startsWith('http');
            return isExternal ? (
                <a 
                    href={value.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {children}
                </a>
            ) : (
                <Link href={value.href} className="text-blue-600 hover:underline">
                    {children}
                </Link>
            );
        },
        // 添加高亮和删除线等标记
        highlight: ({ children }: { children: any }) => (
            <mark className="bg-yellow-200">{children}</mark>
        ),
        strike: ({ children }: { children: any }) => (
            <del className="text-gray-500">{children}</del>
        ),
    },
    block: {
        // 改进标题样式
        h1: ({ children }: { children: any }) => (
            <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }: { children: any }) => (
            <h2 className="text-2xl font-semibold mb-3">{children}</h2>
        ),
        h3: ({ children }: { children: any }) => (
            <h3 className="text-xl font-medium mb-2">{children}</h3>
        ),
        // 添加块引用样式
        blockquote: ({ children }: { children: any }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
                {children}
            </blockquote>
        ),
        // 普通段落添加样式
        normal: ({ children }: { children: any }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
        ),
    },
    list: {
        // 有序和无序列表样式
        bullet: ({ children }: { children: any }) => (
            <ul className="list-disc pl-5 mb-4">{children}</ul>
        ),
        number: ({ children }: { children: any }) => (
            <ol className="list-decimal pl-5 mb-4">{children}</ol>
        ),
    },
};

export default function PostBody({ content }: { content: Array<any> }) {
    return (
        <div className={styles.article}>
            <PortableText value={content} components={CustomComponents as any} />
        </div>
    );
}