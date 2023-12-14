import Image from 'next/image';
import { getDocPaths, getPageContent } from '@/services/docsService';
import Link from 'next/link';

export default async function Home() {
  const markdownHtml = await getPageContent();
  const links = await getDocPaths();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      home page
      <div>
        {/*links: {JSON.stringify(links)} */}
        <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
        <div style={{ padding: '30px' }}>
          Navigation:
          {links.map((item, i) => (
            <div key={i} style={{ padding: '10px 0' }}>
              <Link href={item.link}>{item.link}</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
