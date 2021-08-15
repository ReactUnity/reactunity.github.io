import { CodeSpace } from 'components/code-example';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import deflist from 'remark-deflist';
import html from 'remark-html';
import { getCode } from './code';
import { getFiles } from './common';

const docsDirectory = path.join(process.cwd(), 'content', 'styling');
const getAllItems = () => getFiles(docsDirectory);

export interface Styling {
  id: string;
  contentHtml: string;
  code: CodeSpace;
  order: number;
  title: string;
  css: string;
  jsx: string;
  inherited?: boolean;
  animatable?: boolean;
};

export async function getAllStyling() {
  const items = getAllItems();

  const allItems = (await Promise.all(items.map(async folderName => {
    const id = folderName.name;
    const mdPath = path.join(docsDirectory, id);

    const fileContents = fs.readFileSync(mdPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .use(deflist)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...matterResult.data,
      code: getCode(matterResult.data.code),
    } as Styling;
  }))).filter(Boolean);

  return allItems.sort((a, b) => a.order - b.order);
}
