/**
 * sitemap-generator.js
 * Auto-generates a sitemap.xml for the AI Affiliate Tech Blog.
 *
 * Usage:
 *   node seo/sitemap-generator.js
 *
 * Output: sitemap.xml in the project root
 */

'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// -----------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------
const SITE_URL = process.env.SITE_URL || 'https://yourdomain.com';
const OUTPUT_PATH = path.join(__dirname, '..', 'sitemap.xml');
const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');

// -----------------------------------------------------------------------
// Collect all HTML pages from the src/pages directory
// -----------------------------------------------------------------------
function collectPages(dir, baseUrl, basePath) {
  const pages = [];

  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Pages directory not found: ${dir}`);
    return pages;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(function (entry) {
    const entryPath = path.join(dir, entry.name);
    const urlPath = basePath + '/' + entry.name;

    if (entry.isDirectory()) {
      pages.push(...collectPages(entryPath, baseUrl, urlPath));
    } else if (entry.name.endsWith('.html')) {
      const cleanPath = urlPath
        .replace('/index.html', '/')
        .replace('.html', '');
      pages.push({
        url: baseUrl + cleanPath,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: entry.name === 'index.html' ? 'daily' : 'weekly',
        priority: entry.name === 'index.html' ? '1.0' : '0.8',
      });
    }
  });

  return pages;
}

// -----------------------------------------------------------------------
// Generate an XML sitemap string
// -----------------------------------------------------------------------
function generateSitemapXml(pages) {
  const urlEntries = pages
    .map(function (page) {
      return `  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// -----------------------------------------------------------------------
// Escape special XML characters
// -----------------------------------------------------------------------
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// -----------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------
function generateSitemap() {
  console.log(`\n🗺️  Generating sitemap for: ${SITE_URL}`);

  const pages = collectPages(PAGES_DIR, SITE_URL, '');

  // Add any additional static pages not in the HTML files
  const staticPages = [
    { url: SITE_URL + '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
  ];

  // Deduplicate
  const allPages = [...staticPages, ...pages].filter(
    (page, index, self) => index === self.findIndex(p => p.url === page.url)
  );

  const xml = generateSitemapXml(allPages);
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');

  console.log(`✅ Sitemap generated: ${OUTPUT_PATH}`);
  console.log(`   Total URLs: ${allPages.length}`);
  allPages.forEach(p => console.log(`   - ${p.url}`));
  console.log('');
}

generateSitemap();

module.exports = { collectPages, generateSitemapXml, escapeXml };
