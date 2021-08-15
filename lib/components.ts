import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import deflist from 'remark-deflist';
import html from 'remark-html';
import { getCode } from './code';
import { getFiles } from './common';

const directory = path.join(process.cwd(), 'content/components');
const getAllItems = () => getFiles(directory);

export async function getAllComponents() {
  const items = getAllItems();

  const allItems = (await Promise.all(items.map(async folder => {
    const id = folder.name;
    if (id.startsWith('_')) return null;

    const fullPath = path.join(directory, id);

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .use(deflist)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as { order: number; title: string, component: string }),
      code: getCode(matterResult.data.code),
    };
  }))).filter(Boolean);

  return allItems.sort((a, b) => a.order - b.order);
}
