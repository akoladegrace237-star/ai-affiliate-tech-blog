/**
 * generate-comparison.js
 * AI-powered product comparison article generator using OpenAI API.
 *
 * Usage:
 *   node ai/generate-comparison.js --products "Sony WH-1000XM5,AirPods Max,Bose QC45" --category "headphones"
 *
 * Output: A markdown file saved to ./generated/<slug>-comparison.md
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
  const promptPath = path.join(__dirname, 'prompts', 'comparison-prompt.txt');
  return fs.readFileSync(promptPath, 'utf-8');
}

// -----------------------------------------------------------------------
// Build the comparison prompt
// -----------------------------------------------------------------------
function buildPrompt(products, category) {
  const productList = products.map((p, i) => `${i + 1}. ${p}`).join('\n');
  const template = loadPrompt();
  return template
    .replace('{{PRODUCTS}}', productList)
    .replace('{{CATEGORY}}', category)
    .replace('{{YEAR}}', new Date().getFullYear().toString());
}

// -----------------------------------------------------------------------
// Main: Generate comparison article
// -----------------------------------------------------------------------
async function generateComparison(productsInput, category) {
  const openai = getOpenAIClient();

  const products = productsInput.split(',').map(p => p.trim()).filter(Boolean);

  if (products.length < 2) {
    console.error('❌ Error: Please provide at least 2 products to compare (comma-separated).');
    process.exit(1);
  }

  console.log(`\n🤖 Generating comparison article for: ${products.join(' vs ')}`);
  console.log(`   Category: ${category}`);
  console.log(`   Model: ${MODEL}\n`);

  const prompt = buildPrompt(products, category);

  // --- Generate comparison content ---
  console.log('📝 Generating comparison article...');
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are an expert tech product reviewer specializing in detailed product comparisons. Write objective, data-driven comparisons that help readers make informed purchasing decisions. Include a clear winner recommendation and affiliate CTA placeholders marked as AFFILIATE_LINK_[PRODUCT_NUMBER].',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 3500,
    temperature: 0.7,
  });

  const comparisonContent = response.choices[0].message.content.trim();
  console.log('✅ Comparison article generated.');

  // --- Assemble final output ---
  const slug = products.map(slugify).join('-vs-');
  const date = new Date().toISOString().split('T')[0];

  const frontMatter = `---
title: "${products.join(' vs ')} Comparison (${new Date().getFullYear()})"
category: "${category}"
products: [${products.map(p => `"${p}"`).join(', ')}]
date: "${date}"
affiliate_disclosure: "This article contains affiliate links. We may earn a commission at no extra cost to you."
---

`;

  const finalContent = frontMatter + comparisonContent;

  // --- Save to file ---
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, `${slug}-comparison.md`);
  fs.writeFileSync(outputPath, finalContent, 'utf-8');

  console.log(`\n🎉 Comparison saved to: ${outputPath}`);
  console.log(`📊 Word count: ~${comparisonContent.split(/\s+/).length} words\n`);

  return outputPath;
}

// -----------------------------------------------------------------------
// Entry Point
// -----------------------------------------------------------------------
const args = parseArgs(process.argv);

if (!args.products || !args.category) {
  console.log('Usage: node ai/generate-comparison.js --products "Product A,Product B,Product C" --category "category"');
  console.log('Example: node ai/generate-comparison.js --products "Sony WH-1000XM5,AirPods Max" --category "headphones"');
  process.exit(1);
}

generateComparison(args.products, args.category).catch(function (err) {
  console.error('❌ Error generating comparison:', err.message);
  process.exit(1);
});
