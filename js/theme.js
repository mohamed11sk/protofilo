(function initTheme() {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (_) {
      /* private browsing */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateMeta(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#0F172A' : '#F1F5F9';
  }

  function updateToggle(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    btn.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
    const icon = btn.querySelector('[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      if (window.lucide) lucide.createIcons();
    }
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (_) {
        /* ignore */
      }
    }
    updateMeta(theme);
    updateToggle(theme);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  window.setPortfolioTheme = applyTheme;

  document.addEventListener('DOMContentLoaded', () => {
    const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    applyTheme(current, false);

    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(theme);
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch (_) {
      /* ignore */
    }
    applyTheme(e.matches ? 'dark' : 'light', false);
  });
})();
