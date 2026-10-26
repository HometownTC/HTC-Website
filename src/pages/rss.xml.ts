import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  // Never include posts marked draft: true in feeds
  const publishedPosts = await getCollection('blog', ({ data }) => !data.draft);

  const itemsXml = publishedPosts
    .map((post) => {
      const pubDate = new Date(post.data.publishDate);
      const rfcDate = isNaN(pubDate.getTime()) ? new Date().toUTCString() : pubDate.toUTCString();
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${escapeXml(post.data.canonical)}</link>
      <guid isPermaLink="true">${escapeXml(post.data.canonical)}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <category>${escapeXml(post.data.category)}</category>
      <pubDate>${escapeXml(rfcDate)}</pubDate>
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Hometown Brief | Hometown Transaction Coordinators</title>
    <link>https://hometowntc.com/resources/</link>
    <description>Practical answers for Florida Realtors on transaction coordination, contracts, defensible files, and operations.</description>
    <language>en-us</language>
    <atom:link href="https://hometowntc.com/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
