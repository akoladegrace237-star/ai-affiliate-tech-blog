/**
 * generate-review.js
 * AI-powered product review generator using OpenAI API.
 *
 * Usage:
 *   node ai/generate-review.js --product "Sony WH-1000XM5" --category "headphones"
 *   node ai/generate-review.js --product "MacBook Pro M4" --category "laptops" --features "M4 chip, 18h battery, Liquid Retina display"
 *
 * Output: A markdown file saved to ./generated/<slug>-review.md
 */

'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// -----------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

/** Lazy-initialize the OpenAI client (requires API key to be set in .env) */
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY is not set. Copy .env.example to .env and add your key.');
    process.exit(1);
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
const OUTPUT_DIR = path.join(__dirname, '..', 'generated');

// -----------------------------------------------------------------------
// Parse CLI arguments
// -----------------------------------------------------------------------
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--/, '');
    args[key] = argv[i + 1] || '';
  }
  return args;
}

// -----------------------------------------------------------------------
// Slugify a string for use as a filename
// -----------------------------------------------------------------------
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// -----------------------------------------------------------------------
// Load prompt template
// -----------------------------------------------------------------------
function loadPrompt() {
  const promptPath = path.join(__dirname, 'prompts', 'review-prompt.txt');
  return fs.readFileSync(promptPath, 'utf-8');
}

// -----------------------------------------------------------------------
// Build the prompt for a product review
// -----------------------------------------------------------------------
function buildPrompt(product, category, features) {
  const template = loadPrompt();
  return template
    .replace('{{PRODUCT}}', product)
    .replace('{{CATEGORY}}', category)
    .replace('{{FEATURES}}', features || 'Not specified — research and use accurate specs');
}

// -----------------------------------------------------------------------
// Generate SEO meta description using AI
// -----------------------------------------------------------------------
async function generateMetaDescription(openai, product, reviewContent) {
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'user',
        content: `Write a compelling SEO meta description (under 155 characters) for a product review of: "${product}".
The review covers: ${reviewContent.substring(0, 300)}...
Return ONLY the meta description text, nothing else.`,
      },
    ],
    max_tokens: 80,
  });
  return response.choices[0].message.content.trim();
}

// -----------------------------------------------------------------------
// Main: Generate the product review
// -----------------------------------------------------------------------
async function generateReview(product, category, features) {
  const openai = getOpenAIClient();

  console.log(`\n🤖 Generating review for: ${product}`);
  console.log(`   Category: ${category}`);
  console.log(`   Model: ${MODEL}\n`);

  const prompt = buildPrompt(product, category, features);

  // --- Generate main review content ---
  console.log('📝 Generating article content...');
  const reviewResponse = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are an expert tech product reviewer who writes honest, detailed, and SEO-optimized product reviews for an affiliate marketing blog. Write in a clear, engaging, and helpful style. Always include affiliate CTA placeholders marked as AFFILIATE_LINK.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 3000,
    temperature: 0.7,
  });

  const reviewContent = reviewResponse.choices[0].message.content.trim();
  console.log('✅ Article content generated.');

  // --- Generate SEO meta description ---
  console.log('🔍 Generating SEO meta description...');
  const metaDescription = await generateMetaDescription(openai, product, reviewContent);
  console.log('✅ Meta description generated.');

  // --- Assemble final markdown file ---
  const slug = slugify(product);
  const date = new Date().toISOString().split('T')[0];

  const frontMatter = `---
title: "${product} Review (${new Date().getFullYear()})"
category: "${category}"
date: "${date}"
meta_description: "${metaDescription}"
affiliate_disclosure: "This article contains affiliate links. We may earn a commission at no extra cost to you."
---

`;

  const finalContent = frontMatter + reviewContent;

  // --- Save to file ---
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, `${slug}-review.md`);
  fs.writeFileSync(outputPath, finalContent, 'utf-8');

  console.log(`\n🎉 Review saved to: ${outputPath}`);
  console.log(`📊 Word count: ~${reviewContent.split(/\s+/).length} words`);
  console.log(`📝 Meta description: ${metaDescription}\n`);

  return outputPath;
}

// -----------------------------------------------------------------------
// Entry Point
// -----------------------------------------------------------------------
const args = parseArgs(process.argv);

if (!args.product || !args.category) {
  console.log('Usage: node ai/generate-review.js --product "Product Name" --category "category" [--features "feature1, feature2"]');
  console.log('Example: node ai/generate-review.js --product "Sony WH-1000XM5" --category "headphones"');
  process.exit(1);
}

generateReview(args.product, args.category, args.features).catch(function (err) {
  console.error('❌ Error generating review:', err.message);
  process.exit(1);
});
