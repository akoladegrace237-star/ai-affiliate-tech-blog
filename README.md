# 🤖 AI Affiliate Tech Blog

![AI Affiliate Tech Blog](public/images/logo.svg)

> An AI-powered affiliate marketing blog focused on the **Tech & Gadgets** niche. Automatically generates SEO-optimized product reviews, comparison articles, and buying guides — monetized through affiliate links.

---

## 📋 Table of Contents

- [What is this?](#what-is-this)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Monetization Strategy](#monetization-strategy)
- [Content Types](#content-types)
- [Niche Focus](#niche-focus)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 💡 What is this?

The **AI Affiliate Tech Blog** is a complete starter project for launching a passive-income affiliate marketing blog powered by AI. Instead of manually writing product reviews, this system uses the **OpenAI API (GPT-4)** to auto-generate high-quality, SEO-optimized articles in seconds. You focus on strategy; the AI does the writing.

---

## ✨ Features

- 🤖 **AI Content Generation** — Auto-generate product reviews, comparisons, and buying guides using OpenAI GPT
- 🔍 **SEO Optimization** — Built-in keyword research, meta tag generation, and sitemap creation
- 🔗 **Affiliate Link Management** — Centralized system for managing Amazon, ShareASale, and other affiliate networks
- 📱 **Responsive Design** — Mobile-first, modern UI with dark mode support
- 📊 **Content Templates** — Ready-to-use markdown templates for consistent article structure
- ⚡ **Fast Setup** — Clone, configure your API keys, and start generating content in minutes

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (custom), Vanilla JavaScript |
| Backend / Scripts | Node.js (v18+) |
| AI | OpenAI API (GPT-4 / GPT-3.5-turbo) |
| SEO | Custom sitemap generator, meta tag helpers |
| Affiliate | Amazon Associates, ShareASale, Impact, CJ Affiliate |
| Hosting | GitHub Pages, Vercel, or Netlify (static) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [OpenAI API key](https://platform.openai.com/api-keys)
- Affiliate account(s): [Amazon Associates](https://affiliate-program.amazon.com/), [ShareASale](https://www.shareasale.com/), etc.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/akoladegrace237-star/ai-affiliate-tech-blog.git
cd ai-affiliate-tech-blog

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your API keys
```

---

## 👀 Preview the Website Locally (Before Hosting)

**You can see the full website on your computer before publishing it online — no hosting needed!**

```bash
npm start
```

That's it. Your browser will open automatically to **http://localhost:3000** and you'll see the live site.

| Page | URL |
|---|---|
| 🏠 Homepage | http://localhost:3000/src/pages/index.html |
| ℹ️ About | http://localhost:3000/src/pages/about.html |
| 📝 Sample Review | http://localhost:3000/src/pages/blog/sample-review.html |

> **Press `Ctrl + C`** in your terminal to stop the preview server when you're done.

You can also use a custom port if 3000 is already taken:

```bash
PORT=8080 npm start
```

---

### Environment Setup

Copy `.env.example` to `.env` and fill in:

```env
OPENAI_API_KEY=your-openai-api-key-here
AMAZON_AFFILIATE_TAG=yourtag-20
SHAREASALE_MERCHANT_ID=your-merchant-id
```

---

## ⚙️ How It Works

```
1. Choose a product  →  2. AI generates article  →  3. Insert affiliate links  →  4. Publish
```

**Step-by-step:**

1. **Choose a product** — pick a tech product to review (e.g., "MacBook Pro M3")
2. **Run the AI script** — `node ai/generate-review.js` generates a full markdown article
3. **Review & edit** — lightly edit the AI output for accuracy and personal touch
4. **Insert affiliate links** — `node affiliate/link-manager.js` inserts your affiliate URLs
5. **Generate SEO assets** — run `node seo/sitemap-generator.js` to update your sitemap
6. **Publish** — copy the HTML output to your pages directory and deploy

---

## 💰 Monetization Strategy

| Program | Commission Rate | Best For |
|---|---|---|
| [Amazon Associates](https://affiliate-program.amazon.com/) | 1–10% | Most tech products |
| [ShareASale](https://www.shareasale.com/) | Varies (5–30%) | Software, accessories |
| [Impact](https://impact.com/) | Varies | Big brand tech |
| [CJ Affiliate](https://www.cj.com/) | Varies | Electronics retailers |
| **Display Ads** (Google AdSense) | CPM-based | General traffic |
| **Sponsored Content** | Flat fee ($200–$2000/post) | Brand partnerships |

---

## 📝 Content Types

| Type | Frequency | AI Script |
|---|---|---|
| Product Reviews | 3x/week | `ai/generate-review.js` |
| Comparison Articles | 1x/week | `ai/generate-comparison.js` |
| Buying Guides | 2x/month | — |
| Deals Roundups | Weekly | — |
| News & Updates | As needed | — |

---

## 📱 Niche Focus: Tech & Gadgets

| Category | Example Products |
|---|---|
| 📱 Smartphones | iPhone 16, Samsung Galaxy S25 |
| 💻 Laptops | MacBook Pro, Dell XPS, ASUS ROG |
| 🎧 Headphones | Sony WH-1000XM5, AirPods Pro |
| 🏠 Smart Home | Amazon Echo, Google Nest, Ring |
| 🎮 Gaming Gear | PS5, Xbox, gaming mice, keyboards |

---

## 🗺️ Roadmap

- [x] Project structure & templates
- [x] AI content generation scripts (reviews, comparisons, SEO keywords)
- [x] Responsive landing page with dark mode
- [x] Affiliate link management system
- [x] SEO tools (sitemap, meta tags)
- [ ] Auto-publishing to WordPress / Ghost CMS
- [ ] Analytics dashboard (clicks, revenue tracking)
- [ ] Email newsletter integration (Mailchimp / ConvertKit)
- [ ] Social media auto-posting (Twitter, Pinterest, LinkedIn)
- [ ] Image generation with DALL-E / Midjourney
- [ ] A/B testing for affiliate CTA buttons

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and contribution guidelines.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for the GPT API
- [Amazon Associates](https://affiliate-program.amazon.com/) for the affiliate program
- The open-source community for inspiration and tools

---

*Built with ❤️ and 🤖 AI — Start your passive income journey today!*
