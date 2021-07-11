import fs from 'fs';
import path from 'path';

export const getFiles = (dir: string) => fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isFile());
export const getFilesAsync = (dir: string) => fs.promises.readdir(dir, { withFileTypes: true }).then(x => x.filter(d => d.isFile()));

export const getDirectories = (dir: string) => fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());
export const getDirectoriesAsync = (dir: string) => fs.promises.readdir(dir, { withFileTypes: true }).then(x => x.filter(d => d.isDirectory()));


const getLeafDirsLoop = async (dir: string, name: string, results: string[]) => {
  const dirs = await getDirectoriesAsync(dir);

  if (dirs.length > 0) {
    for await (const child of dirs) {
      const combinedName = name != null ? path.join(name, child.name) : child.name;
      await getLeafDirsLoop(path.join(dir, child.name), combinedName, results);
    }
  } else if (name) {
    results.push(name);
  }
};

export const getLeafDirectories = async (dir: string) => {
  const results: string[] = [];
  await getLeafDirsLoop(dir, null, results);
  return results;
};
