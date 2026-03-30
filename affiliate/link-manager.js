/**
 * link-manager.js
 * Manages affiliate links — inserts, tracks, and validates affiliate URLs.
 *
 * Usage:
 *   node affiliate/link-manager.js --action build --product "Sony WH-1000XM5" --asin "B09XS7JWHH"
 *   node affiliate/link-manager.js --action list
 *   node affiliate/link-manager.js --action inject --file "generated/sony-wh-1000xm5-review.md"
 */

'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const networks = require('./networks.json');

// -----------------------------------------------------------------------
// Build an affiliate URL for a given network and product identifier
// -----------------------------------------------------------------------
function buildAffiliateUrl(network, productId) {
  const tag = process.env.AMAZON_AFFILIATE_TAG || networks.amazon.affiliateTag;

  switch (network.toLowerCase()) {
    case 'amazon':
      return `${networks.amazon.baseUrl}${productId}?tag=${tag}`;
    case 'shareasale':
      return `${networks.shareasale.baseUrl}r.cfm?b=${productId}&m=${networks.shareasale.merchantId}`;
    default:
      throw new Error(`Unknown affiliate network: "${network}". Supported: amazon, shareasale`);
  }
}

// -----------------------------------------------------------------------
// Inject affiliate links into a markdown file
// Replaces AFFILIATE_LINK placeholders with real URLs from a links map
// -----------------------------------------------------------------------
function injectLinksIntoFile(filePath, linksMap) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let replacements = 0;

  Object.entries(linksMap).forEach(function ([placeholder, url]) {
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const count = (content.match(regex) || []).length;
    content = content.replace(regex, url);
    replacements += count;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Injected ${replacements} affiliate link(s) into: ${filePath}`);
}

// -----------------------------------------------------------------------
// List all configured affiliate networks
// -----------------------------------------------------------------------
function listNetworks() {
  console.log('\n📋 Configured Affiliate Networks:\n');
  Object.entries(networks).forEach(function ([key, network]) {
    console.log(`  🔗 ${network.name} (${key})`);
    console.log(`     Base URL: ${network.baseUrl}`);
    console.log(`     Commission: ${network.commission}`);
    if (network.affiliateTag) {
      console.log(`     Tag/ID: ${network.affiliateTag === 'YOUR-AFFILIATE-TAG' ? '⚠️  Not configured' : '✅ Configured'}`);
    }
    console.log('');
  });
}

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
// Main CLI
// -----------------------------------------------------------------------
const args = parseArgs(process.argv);

switch (args.action) {
  case 'build': {
    if (!args.product || !args.asin) {
      console.log('Usage: node affiliate/link-manager.js --action build --product "Product Name" --asin "ASIN123"');
      process.exit(1);
    }
    const url = buildAffiliateUrl('amazon', args.asin);
    console.log(`\n🔗 Affiliate URL for "${args.product}":`);
    console.log(`   ${url}\n`);
    break;
  }
  case 'inject': {
    if (!args.file) {
      console.log('Usage: node affiliate/link-manager.js --action inject --file "path/to/file.md"');
      process.exit(1);
    }
    // Example links map — customize this for your products
    const linksMap = {
      AFFILIATE_LINK: buildAffiliateUrl('amazon', 'B09XS7JWHH'),
      AFFILIATE_LINK_1: buildAffiliateUrl('amazon', 'B09XS7JWHH'),
      AFFILIATE_LINK_2: buildAffiliateUrl('amazon', 'B08PZHYWJS'),
      AFFILIATE_LINK_3: buildAffiliateUrl('amazon', 'B098FKXT8L'),
    };
    injectLinksIntoFile(args.file, linksMap);
    break;
  }
  case 'list':
    listNetworks();
    break;
  default:
    console.log('Usage: node affiliate/link-manager.js --action [build|inject|list]');
    console.log('');
    console.log('Examples:');
    console.log('  node affiliate/link-manager.js --action build --product "Sony WH-1000XM5" --asin "B09XS7JWHH"');
    console.log('  node affiliate/link-manager.js --action inject --file "generated/sony-review.md"');
    console.log('  node affiliate/link-manager.js --action list');
}

module.exports = { buildAffiliateUrl, injectLinksIntoFile };
