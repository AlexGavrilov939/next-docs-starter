import path from 'path';
import fs from 'fs/promises';
import { remark } from 'remark';
import html from 'remark-html';

const docsPath = path.join(process.cwd(), process.env.DOCS_PATH!);
const indexFileName = 'README.md';

export const getDocPaths = async (
  folderPath: string = docsPath,
  paths: { link: string; target: string }[] = []
) => {
  const files = await fs.readdir(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const fileStats = await fs.lstat(filePath);

    if (fileStats.isFile() && file.slice(-3) == '.md') {
      paths.push({
        link: path.relative(process.cwd(), path.join(folderPath, file)),
        target: file,
      });
    } else if (fileStats.isDirectory()) {
      await getDocPaths(filePath, paths);
    }
  }

  return paths;
};

export const getPageContent = async (filePath: string = indexFileName) => {
  console.log('-');
  if (!(await checkFileExist(filePath))) {
    return '';
  }

  return markdownToHtml(filePath);
};

export const checkFileExist = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

export async function markdownToHtml(filePath: string): Promise<string> {
  try {
    const markdownContent = await fs.readFile(filePath, 'utf-8');

    const result = await remark().use(html).process(markdownContent);
    return result.toString();
  } catch (error) {
    console.error('Error reading or converting Markdown:', error);
    return '';
  }
}
