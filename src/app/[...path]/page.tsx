import { getPageContent } from '@/services/docsService';
import Link from 'next/link';

export default async function Page({ params: { path } }: { params: { path: string[] } }) {
  const markdownHtml = await getPageContent(path.join('/'));
  console.log('===data', { path, markdownHtml });
  return (
    <>
      <h1>Doc Page NESTED {path.join('/')}</h1>
      <div>
        <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
      </div>
      <Link href={'/'}>back home</Link>
    </>
  );
}
