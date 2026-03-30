# 📅 Content Strategy: AI Affiliate Tech Blog

> **Niche:** Tech & Gadgets | **Goal:** 20+ articles/month using AI

---

## 1. Content Pillars

Our content is organized around 5 core pillars, each targeting different stages of the buyer's journey:

| Pillar | Type | Buyer Stage | Example |
|---|---|---|---|
| **1. Product Reviews** | In-depth single product review | Decision | "Sony WH-1000XM5 Review" |
| **2. Comparison Articles** | 2–3 product head-to-head | Consideration | "AirPods Pro vs Sony XM5" |
| **3. Buying Guides** | Best picks in a category | Awareness → Decision | "Best Laptops Under $1000" |
| **4. Deals & Roundups** | Weekly deals, gift guides | Impulse/Seasonal | "Best Tech Deals This Week" |
| **5. How-Tos & News** | Educational & informational | Awareness | "How to Choose a Gaming Mouse" |

---

## 2. Weekly Content Calendar Template

| Day | Content Type | AI Tool | Time Investment |
|---|---|---|---|
| **Monday** | Product Review | `generate-review.js` | 45 min |
| **Tuesday** | Product Review | `generate-review.js` | 45 min |
| **Wednesday** | Comparison Article | `generate-comparison.js` | 60 min |
| **Thursday** | Product Review | `generate-review.js` | 45 min |
| **Friday** | Buying Guide or Deals Roundup | Manual / AI | 90 min |
| **Saturday** | Social Media / Pinterest scheduling | Canva + Buffer | 60 min |
| **Sunday** | SEO keyword research for next week | `generate-seo-keywords.js` | 30 min |

**Weekly output: 3–4 articles + 1 guide or roundup**

---

## 3. Article Types & Frequency

### 3.1 Product Reviews (10/month)
- **Word count:** 1,200–1,800 words
- **Time to produce:** 45 minutes (AI + human edit)
- **SEO target:** "[Product name] review 2026"
- **Monetization:** 3–5 affiliate CTAs per article
- **Template:** `src/templates/product-review.md`

**Topic selection criteria:**
1. Search volume > 500/month (use Ubersuggest free)
2. Product has Amazon/ShareASale affiliate program
3. Product launched in last 12 months (fresh content)
4. Category you're building authority in

### 3.2 Comparison Articles (4/month)
- **Word count:** 1,500–2,000 words
- **Time to produce:** 60 minutes
- **SEO target:** "[Product A] vs [Product B]"
- **Monetization:** Affiliate links for both/all products
- **Template:** `src/templates/comparison-article.md`

### 3.3 Buying Guides (2/month)
- **Word count:** 2,000–3,000 words
- **Time to produce:** 90 minutes
- **SEO target:** "Best [category] [year]", "Best [category] under $X"
- **Monetization:** Multiple affiliate links (8–12 per article)
- **Template:** `src/templates/buying-guide.md`

### 3.4 Deals Roundups (4/month)
- **Word count:** 500–800 words
- **Time to produce:** 30 minutes
- **SEO target:** "Best tech deals [week/month]", "[Category] deals"
- **Monetization:** Many affiliate links, urgency-driven

---

## 4. Keyword Research Workflow

### Step 1: Identify Topics (Weekly, ~30 min)
```bash
node ai/generate-seo-keywords.js --topic "wireless earbuds" --category "headphones"
```

Use these tools to find topics:
- **Free:** Google Autocomplete, Google Trends, Reddit (r/gadgets, r/headphones)
- **Paid:** Ahrefs, SEMrush, Ubersuggest

### Step 2: Validate Keywords
Before writing, check:
- [ ] Search volume > 500/month
- [ ] Keyword difficulty < 30 (for new sites)
- [ ] Affiliate products available for the topic
- [ ] No very authoritative competitors dominating (NYT, Wirecutter, etc.)

### Step 3: Create Content Brief
Using the AI-generated keywords, build a brief:
1. Primary keyword (use in title, H1, first paragraph)
2. 5–7 secondary keywords (use in H2/H3 headings and body)
3. 3–5 long-tail keywords (answer these as FAQ questions)
4. Competitor URLs to reference (don't copy, but understand their structure)

### Step 4: Generate & Edit
```bash
node ai/generate-review.js --product "Product Name" --category "category"
```
Then edit for:
- Factual accuracy (verify specs on official product page)
- Affiliate links (replace AFFILIATE_LINK placeholders)
- Personal voice (add 1–2 personal observations)
- Internal links (link to 2–3 related articles on your site)

---

## 5. SEO Checklist for Every Article

Before publishing, verify:

### On-Page SEO
- [ ] Primary keyword in title (within first 60 characters)
- [ ] Primary keyword in meta description (under 155 characters)
- [ ] Primary keyword in first paragraph
- [ ] Primary keyword in at least one H2
- [ ] Secondary keywords used naturally in body text
- [ ] Long-tail keywords answered in FAQ section
- [ ] Internal links to 2–3 related articles
- [ ] External links to 1–2 authoritative sources (brand/Amazon pages)

### Content Quality
- [ ] Word count ≥ 1,000 words
- [ ] Article answers the search intent (review? comparison? guide?)
- [ ] Includes specs table or comparison table
- [ ] Pros & cons section present
- [ ] Clear verdict / recommendation
- [ ] Affiliate CTA visible above fold and at end of article

### Technical SEO
- [ ] URL slug is clean and includes primary keyword
- [ ] Title tag ≤ 60 characters
- [ ] Meta description 140–155 characters
- [ ] Images have alt text with keywords
- [ ] Schema markup for Article or Product
- [ ] Page loads in < 3 seconds

### Affiliate Compliance
- [ ] Affiliate disclosure at top of article
- [ ] All affiliate links use `rel="nofollow noopener"`
- [ ] Links open in new tab (`target="_blank"`)
- [ ] Amazon links include affiliate tag

---

## 6. Social Media Promotion Plan

### Pinterest (Primary Social Channel)
- Create 2–3 pins per article using Canva templates
- Pin to boards: "Best Tech 2026", "Gadget Reviews", "Laptop Recommendations", "Headphone Reviews"
- Use keyword-rich pin titles and descriptions
- Goal: 10,000 monthly Pinterest views by Month 6

### Reddit (Community Engagement)
- Answer questions in relevant subreddits: r/gadgets, r/headphones, r/laptops, r/buildapc
- Link to your review articles only when genuinely helpful
- Never spam — 1 link per 10 helpful comments

### Twitter/X (Brand Building)
- Post quick tips and mini-reviews
- Share "hot deal alerts" when prices drop
- Engage with tech communities and journalists

### YouTube Shorts (Video Content)
- Create 60-second "Quick Review" videos from blog content
- Use AI voiceover (ElevenLabs or similar)
- Link to full review in description with affiliate links

---

## 7. Email Newsletter Strategy

### List Building
- Exit-intent popup on all pages
- "Get the best tech deals weekly" opt-in on homepage
- Bonus: "Free Tech Buyer's Checklist" PDF as lead magnet

### Newsletter Frequency
- **Weekly:** "Best Tech Deals of the Week" (Tuesday, 10 AM)
- **Monthly:** "Top 5 Tech Reviews This Month"

### Email Content
- 3–5 deal highlights with affiliate links
- Link to latest review articles
- One exclusive recommendation per week

---

## 8. Content Calendar: First Month (Sample)

| Week | Day | Article Title | Category | Primary Keyword |
|---|---|---|---|---|
| 1 | Mon | Sony WH-1000XM5 Review (2026) | Headphones | sony wh-1000xm5 review |
| 1 | Wed | AirPods Pro 2 vs Sony XM5 | Headphones | airpods pro vs sony xm5 |
| 1 | Fri | Best Wireless Headphones 2026 | Headphones | best wireless headphones 2026 |
| 2 | Mon | MacBook Air M4 Review | Laptops | macbook air m4 review |
| 2 | Tue | Best Budget Laptops Under $700 | Laptops | best laptops under 700 |
| 2 | Thu | Dell XPS 15 Review | Laptops | dell xps 15 review |
| 3 | Mon | Samsung Galaxy S26 Review | Smartphones | samsung galaxy s26 review |
| 3 | Wed | iPhone 17 vs Galaxy S26 | Smartphones | iphone 17 vs galaxy s26 |
| 3 | Fri | Best Smartphones 2026 | Smartphones | best smartphones 2026 |
| 4 | Mon | PlayStation 5 Pro Review | Gaming | ps5 pro review |
| 4 | Tue | Best Gaming Mice 2026 | Gaming | best gaming mice 2026 |
| 4 | Thu | Best Smart Home Devices 2026 | Smart Home | best smart home devices |

---

*Update this strategy quarterly based on traffic data and SEO performance.*
