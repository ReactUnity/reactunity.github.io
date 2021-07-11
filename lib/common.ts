import fs from 'fs';

export const getFiles = (dir: string) => fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isFile());
export const getDirectories = (dir: string) => fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory());
