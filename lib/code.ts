import type { CodeSpace } from 'components/code-example';
import fs from 'fs';
import path from 'path';

const codeDirectory = path.join(process.cwd(), 'content', 'codes');

export function getCode(id: string): CodeSpace {
  const folderPath = path.join(codeDirectory, id);
  const sourcePath = path.join(folderPath, 'index.jsx');
  const jsx = fs.readFileSync(sourcePath, 'utf8');

  const cssPath = path.join(folderPath, 'index.css');
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : null;

  return {
    jsx,
    ...(css || css === '') && { css },
  };
}

export function getPlayground() {
  return getCode('playground');
}
