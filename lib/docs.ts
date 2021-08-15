import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import deflist from 'remark-deflist';
import html from 'remark-html';
import { getDirectories } from './common';

const docsDirectory = path.join(process.cwd(), 'content', 'docs');
const getAllDocs = () => getDirectories(docsDirectory);

export function getSortedDocsData() {
  const docs = getAllDocs();
  const allDocsData = docs.map(folderName => {
    const id = folderName.name;
    const folderPath = path.join(docsDirectory, id);

    const mdPath = path.join(folderPath, 'index.md');
    const fileContents = fs.readFileSync(mdPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { order: number; title: string, date?: string }),
    };
  });

  return allDocsData.sort((a, b) => a.order - b.order);
}

export function getAllDocIds() {
  const docs = getAllDocs();
  return docs.map(doc => {
    return {
      params: {
        id: doc.name,
      },
    };
  });
}

export async function getDocData(id: string) {
  const fullPath = path.join(docsDirectory, id, 'index.md');
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
    ...(matterResult.data as { date: string; title: string }),
  };
}
