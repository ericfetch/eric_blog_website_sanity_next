import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

// 初始化图片URL构建器
const builder = imageUrlBuilder(client);

// 创建urlFor函数，用于构建图片URL
export function urlFor(source: any) {
  return builder.image(source);
}