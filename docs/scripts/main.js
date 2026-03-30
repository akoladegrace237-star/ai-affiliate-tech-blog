/**
 * main.js — AI Affiliate Tech Blog
 * Frontend JavaScript: dark mode toggle, mobile menu, search/filtering, newsletter
 */

(function () {
  'use strict';

  // -----------------------------------------------------------------------
  // Dark Mode Toggle
  // -----------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'ai-blog-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(saved || preferred);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  initTheme();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // -----------------------------------------------------------------------
  // Mobile Navigation Toggle
  // -----------------------------------------------------------------------
  const navBurger = document.getElementById('nav-burger');
  const navMenu = document.getElementById('nav-menu');

  if (navBurger && navMenu) {
    navBurger.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navBurger.setAttribute('aria-expanded', isOpen.toString());
      navBurger.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navBurger.textContent = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (navMenu.classList.contains('is-open') &&
          !navMenu.contains(e.target) &&
          !navBurger.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navBurger.textContent = '☰';
      }
    });
  }

  // -----------------------------------------------------------------------
  // Sticky Header shadow on scroll
  // -----------------------------------------------------------------------
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // -----------------------------------------------------------------------
  // Product Review Search & Filtering
  // -----------------------------------------------------------------------
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const reviewsGrid = document.getElementById('reviews-grid');

  function filterCards(query) {
    if (!reviewsGrid) return;
    const cards = reviewsGrid.querySelectorAll('.card');
    const q = query.toLowerCase().trim();

    cards.forEach(function (card) {
      if (!q) {
        card.style.display = '';
        return;
      }
      const title = (card.querySelector('.card__title') || {}).textContent || '';
      const excerpt = (card.querySelector('.card__excerpt') || {}).textContent || '';
      const category = (card.dataset.category || '');
      const text = (title + ' ' + excerpt + ' ' + category).toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterCards(this.value);
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') filterCards(this.value);
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      filterCards(searchInput ? searchInput.value : '');
    });
  }

  // -----------------------------------------------------------------------
  // Newsletter Form Handler
  // -----------------------------------------------------------------------
  window.handleNewsletterSubmit = function (event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!emailInput || !emailInput.value) return;

    // Simulate form submission (replace with actual API call)
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    setTimeout(function () {
      form.innerHTML = '<p style="color:white;font-size:1.2rem;font-weight:700;">🎉 Thanks for subscribing! Check your inbox for a confirmation email.</p>';
    }, 1200);

    // TODO: Replace with actual email service integration:
    // e.g., Mailchimp, ConvertKit, or a backend endpoint
    // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email: emailInput.value }) })
  };

  // -----------------------------------------------------------------------
  // Animate performance bars (Article page)
  // -----------------------------------------------------------------------
  function animatePerfBars() {
    const bars = document.querySelectorAll('.perf-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.style.width;
          bar.style.width = '0%';
          requestAnimationFrame(function () {
            bar.style.width = width;
          });
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  animatePerfBars();

  // -----------------------------------------------------------------------
  // Smooth scroll for anchor links
  // -----------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        if (navMenu) navMenu.classList.remove('is-open');
      }
    });
  });

})();
