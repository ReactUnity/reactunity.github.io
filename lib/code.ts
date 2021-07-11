import type { CodeSpace } from 'components/code-example';
import fs from 'fs';
import path from 'path';
import { getLeafDirectories } from './common';

const codeDirectory = path.join(process.cwd(), 'content', 'codes');

export function getCode(id: string | string[]): CodeSpace {
  const folder = Array.isArray(id) ? id.join('/') : id;

  const folderPath = path.join(codeDirectory, folder);
  const sourcePath = path.join(folderPath, 'index.jsx');
  const jsx = fs.readFileSync(sourcePath, 'utf8');

  const cssPath = path.join(folderPath, 'index.css');
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : null;

  return {
    id: folder,
    jsx,
    ...(css || css === '') && { css },
  };
}

export async function getAllCodes() {
  return getLeafDirectories(codeDirectory);
}
