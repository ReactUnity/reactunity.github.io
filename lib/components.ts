import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import deflist from 'remark-deflist'
import html from 'remark-html'

const componentsDirectory = path.join(process.cwd(), 'content/components');
const playgroundPath = path.join(process.cwd(), 'content/playground.jsx');

export async function getAllComponents() {
  const fileNames = fs.readdirSync(componentsDirectory);
  const allPostsData = (await Promise.all(fileNames.map(async fileName => {
    if (!fileName.endsWith('.md')) return null;

    const id = fileName.replace(/\.md$/, '');
    const sourceFileName = fileName.replace(/\.md$/, '.jsx');

    const fullPath = path.join(componentsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .use(deflist)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const sourcePath = path.join(componentsDirectory, sourceFileName);
    const code = fs.readFileSync(sourcePath, 'utf8');

    return {
      id,
      contentHtml,
      code,
      ...(matterResult.data as { order: number; title: string, component: string }),
    };
  }))).filter(Boolean);

  return allPostsData.sort((a, b) => a.order - b.order);
}

export function getPlayground() {
  return fs.readFileSync(playgroundPath, 'utf8');
}
