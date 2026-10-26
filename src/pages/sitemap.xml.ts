import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATEGORY_ARCHIVES } from '../data/blog-categories';
import { RESOURCE_LIBRARY_ITEMS } from '../data/resourceLibraryData';
import { LOCATION_PAGES } from '../data/locationData';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const publishedPosts = await getCollection('blog', ({ data }) => !data.draft);
  const categorySlugs = Object.keys(CATEGORY_ARCHIVES);
  const locationSlugs = Object.keys(LOCATION_PAGES);

  const staticUrls = [
    { loc: 'https://hometowntc.com/contract-to-close/', changefreq: 'monthly', priority: '0.85' },
    { loc: 'https://hometowntc.com/listing-coordination/', changefreq: 'monthly', priority: '0.85' },
    { loc: 'https://hometowntc.com/transaction-coordination/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/transaction-coordinator-for-realtors/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/how-htc-works/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/why-htc/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/who-we-support/', changefreq: 'monthly', priority: '0.75' },
    { loc: 'https://hometowntc.com/miami-transaction-coordinator/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/miami-dade-transaction-coordinator/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/broward-transaction-coordinator/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/south-florida-transaction-coordinator/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/about/', changefreq: 'monthly', priority: '0.75' },
    { loc: 'https://hometowntc.com/team/', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://hometowntc.com/faq/', changefreq: 'monthly', priority: '0.75' },
    { loc: 'https://hometowntc.com/reviews/', changefreq: 'monthly', priority: '0.75' },
    { loc: 'https://hometowntc.com/book/', changefreq: 'monthly', priority: '0.85' },
    { loc: 'https://hometowntc.com/agent-business-calculator/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/tcworkshop/', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://hometowntc.com/resources/free-guides-downloads/', changefreq: 'weekly', priority: '0.85' },
    { loc: 'https://hometowntc.com/resources/free-guides-downloads/condo-coop-hoa-guide/', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://hometowntc.com/resources/', changefreq: 'daily', priority: '0.9' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://hometowntc.com/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://hometowntc.com/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://hometowntc.com/es/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hometowntc.com/" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hometowntc.com/es/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://hometowntc.com/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://hometowntc.com/es/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hometowntc.com/" />
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://hometowntc.com/pricing/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://hometowntc.com/pricing/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://hometowntc.com/es/precios/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hometowntc.com/pricing/" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://hometowntc.com/es/precios/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://hometowntc.com/pricing/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://hometowntc.com/es/precios/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hometowntc.com/pricing/" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://hometowntc.com/submit-deal/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://hometowntc.com/submit-deal/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://hometowntc.com/es/enviar-transaccion/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hometowntc.com/submit-deal/" />
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://hometowntc.com/es/enviar-transaccion/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://hometowntc.com/submit-deal/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://hometowntc.com/es/enviar-transaccion/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hometowntc.com/submit-deal/" />
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
${staticUrls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
${RESOURCE_LIBRARY_ITEMS.map(
  (item) => `  <url>
    <loc>${escapeXml(`https://hometowntc.com/resources/free-guides-downloads/${item.slug}/`)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`
).join('\n')}
${locationSlugs
  .map(
    (locSlug) => `  <url>
    <loc>${escapeXml(`https://hometowntc.com/${locSlug}/`)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
${categorySlugs
  .map(
    (catSlug) => `  <url>
    <loc>${escapeXml(`https://hometowntc.com/resources/${catSlug}/`)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
${publishedPosts
  .map(
    (post) => `  <url>
    <loc>${escapeXml(post.data.canonical)}</loc>
    <lastmod>${escapeXml(post.data.modifiedDate)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
