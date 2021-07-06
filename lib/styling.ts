import { CodeSpace } from 'components/code-example'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import deflist from 'remark-deflist'
import html from 'remark-html'

const docsDirectory = path.join(process.cwd(), 'content', 'styling');
const getAllItems = () => fs.readdirSync(docsDirectory, { withFileTypes: true }).filter(d => d.isDirectory());

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
    const folderPath = path.join(docsDirectory, id);

    const mdPath = path.join(folderPath, 'index.md');
    const fileContents = fs.readFileSync(mdPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .use(deflist)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const jsxPath = path.join(folderPath, 'index.jsx');
    const jsx = fs.readFileSync(jsxPath, 'utf8');

    const cssPath = path.join(folderPath, 'index.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    return {
      id,
      contentHtml,
      code: { jsx, css },
      ...matterResult.data,
    } as Styling;
  }))).filter(Boolean);

  return allItems.sort((a, b) => a.order - b.order);
}
