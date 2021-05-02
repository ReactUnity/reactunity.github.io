import { CodeSpace } from 'components/code-example'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import deflist from 'remark-deflist'
import html from 'remark-html'

const componentsDirectory = path.join(process.cwd(), 'content/components');
const playgroundPath = path.join(process.cwd(), 'content/playground');

export async function getAllComponents() {
  const items = fs.readdirSync(componentsDirectory, { withFileTypes: true }).filter(x => x.isDirectory());

  const allItems = (await Promise.all(items.map(async folder => {
    const id = folder.name;
    if (id.startsWith('_')) return null;

    const folderPath = path.join(componentsDirectory, id);

    const fullPath = path.join(folderPath, 'index.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .use(deflist)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const sourcePath = path.join(folderPath, 'index.jsx');
    const jsx = fs.readFileSync(sourcePath, 'utf8');

    const cssPath = path.join(folderPath, 'index.css');
    const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : null;

    return {
      id,
      contentHtml,
      code: {
        jsx,
        ...css && { css },
      },
      ...(matterResult.data as { order: number; title: string, component: string }),
    };
  }))).filter(Boolean);

  return allItems.sort((a, b) => a.order - b.order);
}

export function getPlayground(): CodeSpace {
  return {
    jsx: fs.readFileSync(path.join(playgroundPath, 'index.jsx'), 'utf8'),
    css: fs.readFileSync(path.join(playgroundPath, 'index.css'), 'utf8'),
  };
}
