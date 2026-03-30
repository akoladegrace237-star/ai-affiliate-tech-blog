/**
 * site.config.js
 * Central configuration for site metadata, SEO defaults, and affiliate settings.
 * Update these values before deploying your blog.
 */

const siteConfig = {
  // -----------------------------------------------------------------------
  // Site Metadata
  // -----------------------------------------------------------------------
  site: {
    name: 'AI Tech Reviews',
    tagline: 'AI-Powered Tech Reviews You Can Trust',
    description:
      'Discover the best tech products with AI-powered reviews, comparisons, and buying guides. Honest, in-depth analysis of smartphones, laptops, headphones, and more.',
    url: process.env.SITE_URL || 'https://yourdomain.com',
    language: 'en',
    locale: 'en_US',
    author: 'AI Tech Reviews Team',
    email: 'contact@yourdomain.com',
    logo: '/public/images/logo.svg',
    favicon: '/public/images/favicon.ico',
    twitterHandle: '@AiTechReviews',
  },

  // -----------------------------------------------------------------------
  // SEO Defaults
  // -----------------------------------------------------------------------
  seo: {
    titleTemplate: '%s | AI Tech Reviews',
    defaultTitle: 'AI Tech Reviews — Best Tech & Gadget Reviews',
    defaultDescription:
      'AI-generated, expert-reviewed guides on the latest tech products. Find the best laptops, smartphones, headphones, and gadgets.',
    keywords: [
      'tech reviews',
      'gadget reviews',
      'best laptops 2026',
      'best headphones 2026',
      'smartphone comparison',
      'buying guide',
      'AI tech blog',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: 'AI Tech Reviews',
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    robotsTxt: {
      policy: [{ userAgent: '*', allow: '/' }],
      sitemap: '/sitemap.xml',
    },
  },

  // -----------------------------------------------------------------------
  // Categories
  // -----------------------------------------------------------------------
  categories: [
    { name: 'Smartphones', slug: 'smartphones', icon: '📱' },
    { name: 'Laptops', slug: 'laptops', icon: '💻' },
    { name: 'Headphones', slug: 'headphones', icon: '🎧' },
    { name: 'Smart Home', slug: 'smart-home', icon: '🏠' },
    { name: 'Gaming Gear', slug: 'gaming-gear', icon: '🎮' },
    { name: 'Cameras', slug: 'cameras', icon: '📷' },
    { name: 'Wearables', slug: 'wearables', icon: '⌚' },
  ],

  // -----------------------------------------------------------------------
  // Affiliate Networks
  // -----------------------------------------------------------------------
  affiliate: {
    disclosure:
      'This site contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you. Thank you for supporting AI Tech Reviews!',
    networks: {
      amazon: {
        name: 'Amazon Associates',
        tag: process.env.AMAZON_AFFILIATE_TAG || 'yourtag-20',
        baseUrl: 'https://www.amazon.com/dp/',
        commission: '1–10%',
      },
      shareasale: {
        name: 'ShareASale',
        merchantId: process.env.SHAREASALE_MERCHANT_ID || '',
        baseUrl: 'https://www.shareasale.com/',
        commission: 'Varies',
      },
      impact: {
        name: 'Impact',
        accountSid: process.env.IMPACT_ACCOUNT_SID || '',
        commission: 'Varies',
      },
      cj: {
        name: 'CJ Affiliate',
        websiteId: process.env.CJ_WEBSITE_ID || '',
        commission: 'Varies',
      },
    },
  },

  // -----------------------------------------------------------------------
  // Content Settings
  // -----------------------------------------------------------------------
  content: {
    postsPerPage: 12,
    featuredPostsCount: 3,
    excerptLength: 160,
    outputDir: './generated',
    templatesDir: './src/templates',
  },
};

module.exports = siteConfig;
