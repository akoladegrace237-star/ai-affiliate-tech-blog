/**
 * generate-seo-keywords.js
 * AI-powered SEO keyword research generator using OpenAI API.
 *
 * Usage:
 *   node ai/generate-seo-keywords.js --topic "wireless headphones" --category "headphones"
 *
 * Output: A JSON file saved to ./generated/<slug>-keywords.json
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
  const promptPath = path.join(__dirname, 'prompts', 'seo-prompt.txt');
  return fs.readFileSync(promptPath, 'utf-8');
}

// -----------------------------------------------------------------------
// Build the SEO prompt
// -----------------------------------------------------------------------
function buildPrompt(topic, category) {
  const template = loadPrompt();
  return template
    .replace('{{TOPIC}}', topic)
    .replace('{{CATEGORY}}', category)
    .replace('{{YEAR}}', new Date().getFullYear().toString());
}

// -----------------------------------------------------------------------
// Parse AI response into structured JSON
// -----------------------------------------------------------------------
function parseKeywordsResponse(content) {
  // Try to extract JSON if the AI wraps it in code blocks
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]+?)```/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1].trim());
  }
  // Try to parse directly
  return JSON.parse(content.trim());
}

// -----------------------------------------------------------------------
// Main: Generate SEO keywords
// -----------------------------------------------------------------------
async function generateSEOKeywords(topic, category) {
  const openai = getOpenAIClient();

  console.log(`\n🔍 Generating SEO keywords for: "${topic}"`);
  console.log(`   Category: ${category}`);
  console.log(`   Model: ${MODEL}\n`);

  const prompt = buildPrompt(topic, category);

  // --- Generate keywords ---
  console.log('🤖 Analyzing topic and generating keywords...');
  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are an expert SEO strategist specializing in tech and gadget affiliate blogs. You provide actionable keyword research with search intent analysis. Always respond with valid JSON only.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 1500,
    temperature: 0.5,
  });

  const content = response.choices[0].message.content.trim();
  console.log('✅ Keywords generated.');

  // --- Parse and structure the output ---
  let keywordsData;
  try {
    keywordsData = parseKeywordsResponse(content);
  } catch (err) {
    // Fallback: save raw content if JSON parsing fails
    console.warn('⚠️  Could not parse as JSON. Saving raw response.');
    keywordsData = { raw: content };
  }

  // --- Add metadata ---
  const result = {
    topic,
    category,
    year: new Date().getFullYear(),
    generated: new Date().toISOString(),
    ...keywordsData,
  };

  // --- Save to file ---
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const slug = slugify(topic);
  const outputPath = path.join(OUTPUT_DIR, `${slug}-keywords.json`);
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

  // --- Print summary ---
  console.log(`\n🎉 Keywords saved to: ${outputPath}`);
  if (keywordsData.primaryKeyword) {
    console.log(`🎯 Primary Keyword: "${keywordsData.primaryKeyword}"`);
  }
  if (keywordsData.secondaryKeywords) {
    console.log(`📋 Secondary Keywords (${keywordsData.secondaryKeywords.length}): ${keywordsData.secondaryKeywords.slice(0, 3).join(', ')}...`);
  }
  if (keywordsData.longTailKeywords) {
    console.log(`🔎 Long-Tail Keywords (${keywordsData.longTailKeywords.length}): ${keywordsData.longTailKeywords.slice(0, 2).join(', ')}...`);
  }
  if (keywordsData.suggestedTitles) {
    console.log(`\n💡 Suggested Article Titles:`);
    keywordsData.suggestedTitles.forEach((title, i) => {
      console.log(`   ${i + 1}. ${title}`);
    });
  }
  console.log('');

  return outputPath;
}

// -----------------------------------------------------------------------
// Entry Point
// -----------------------------------------------------------------------
const args = parseArgs(process.argv);

if (!args.topic || !args.category) {
  console.log('Usage: node ai/generate-seo-keywords.js --topic "topic name" --category "category"');
  console.log('Example: node ai/generate-seo-keywords.js --topic "wireless headphones" --category "headphones"');
  process.exit(1);
}

generateSEOKeywords(args.topic, args.category).catch(function (err) {
  console.error('❌ Error generating keywords:', err.message);
  process.exit(1);
});
