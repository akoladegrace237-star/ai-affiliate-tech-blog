/**
 * meta-tags.js
 * SEO meta tag helper functions.
 * Generates HTML meta tags for pages, articles, and product reviews.
 *
 * Usage (Node.js):
 *   const metaTags = require('./seo/meta-tags');
 *   const html = metaTags.generateMetaTags({ title: 'My Page', description: '...' });
 *
 * Usage (browser):
 *   Include this script and call MetaTags.inject(config) to inject meta tags dynamically.
 */

'use strict';

const siteConfig = require('../config/site.config');

// -----------------------------------------------------------------------
// Generate HTML string for all SEO meta tags
// -----------------------------------------------------------------------
function generateMetaTags(config) {
  const {
    title,
    description = siteConfig.seo.defaultDescription,
    keywords = siteConfig.seo.keywords.join(', '),
    url = siteConfig.site.url,
    image = siteConfig.site.url + '/public/images/og-default.jpg',
    type = 'website',
    author = siteConfig.site.author,
    datePublished,
    dateModified,
    noindex = false,
  } = config;

  const fullTitle = title
    ? siteConfig.seo.titleTemplate.replace('%s', title)
    : siteConfig.seo.defaultTitle;

  const tags = [];

  // --- Basic Meta ---
  tags.push(`<meta charset="UTF-8" />`);
  tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
  tags.push(`<title>${escapeHtml(fullTitle)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(description)}" />`);
  tags.push(`<meta name="keywords" content="${escapeHtml(keywords)}" />`);
  tags.push(`<meta name="author" content="${escapeHtml(author)}" />`);

  if (noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  } else {
    tags.push(`<meta name="robots" content="index, follow" />`);
  }

  // --- Canonical ---
  tags.push(`<link rel="canonical" href="${escapeHtml(url)}" />`);

  // --- Open Graph ---
  tags.push(`<meta property="og:title" content="${escapeHtml(fullTitle)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
  tags.push(`<meta property="og:type" content="${escapeHtml(type)}" />`);
  tags.push(`<meta property="og:url" content="${escapeHtml(url)}" />`);
  tags.push(`<meta property="og:image" content="${escapeHtml(image)}" />`);
  tags.push(`<meta property="og:site_name" content="${escapeHtml(siteConfig.site.name)}" />`);
  tags.push(`<meta property="og:locale" content="${siteConfig.seo.openGraph.locale}" />`);

  if (datePublished) {
    tags.push(`<meta property="article:published_time" content="${datePublished}" />`);
  }
  if (dateModified) {
    tags.push(`<meta property="article:modified_time" content="${dateModified}" />`);
  }

  // --- Twitter Card ---
  tags.push(`<meta name="twitter:card" content="${siteConfig.seo.twitter.cardType}" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  if (siteConfig.site.twitterHandle) {
    tags.push(`<meta name="twitter:site" content="${siteConfig.site.twitterHandle}" />`);
  }

  return tags.join('\n  ');
}

// -----------------------------------------------------------------------
// Generate JSON-LD structured data for an article/review
// -----------------------------------------------------------------------
function generateArticleSchema(config) {
  const {
    title,
    description,
    url,
    datePublished,
    dateModified,
    image,
    ratingValue,
    ratingCount = 1,
  } = config;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: siteConfig.site.name,
      url: siteConfig.site.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.site.name,
      url: siteConfig.site.url,
    },
  };

  if (image) schema.image = image;

  if (ratingValue) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      bestRating: '10',
      worstRating: '1',
      ratingCount: ratingCount,
    };
  }

  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// -----------------------------------------------------------------------
// Generate JSON-LD structured data for a product review
// -----------------------------------------------------------------------
function generateProductSchema(config) {
  const { name, description, image, url, ratingValue, ratingCount = 1, price, priceCurrency = 'USD' } = config;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    url: url,
  };

  if (image) schema.image = image;
  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price: price,
      priceCurrency: priceCurrency,
      availability: 'https://schema.org/InStock',
    };
  }
  if (ratingValue) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      bestRating: '10',
      worstRating: '1',
      ratingCount: ratingCount,
    };
  }

  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// -----------------------------------------------------------------------
// Escape HTML special characters to prevent XSS
// -----------------------------------------------------------------------
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// -----------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------
module.exports = {
  generateMetaTags,
  generateArticleSchema,
  generateProductSchema,
  escapeHtml,
};
