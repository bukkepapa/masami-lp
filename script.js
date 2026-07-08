(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- ヘッダー：スクロールで縮小＆進捗バー ---- */
    const header = document.getElementById('siteHeader');
    const progressBar = document.getElementById('progressBar');
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');

      if (progressBar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        progressBar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- スクロール出現アニメーション ---- */
    const revealables = document.querySelectorAll(
      '.reveal, .section-head, .work-card, .service-card, .narrowing, .contact-card, .big-quote, .story-lead, .story-quote, .stack, .timeline, .flow-step, .faq-list'
    );
    revealables.forEach((el) => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
      );
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    }

    /* ---- 数字カウントアップ（ヒーローの実績） ---- */
    const counters = document.querySelectorAll('.count[data-count]');
    const runCount = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      if (prefersReducedMotion) { el.textContent = String(target); return; }
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ゆっくり止まるイージング
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window && counters.length) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => cio.observe(el));
    } else {
      counters.forEach((el) => { el.textContent = el.getAttribute('data-count'); });
    }

    /* ---- ナビの現在地ハイライト ---- */
    const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    const sectionsById = {};
    navLinks.forEach((link) => {
      const id = link.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) sectionsById[id] = link;
    });
    if ('IntersectionObserver' in window && Object.keys(sectionsById).length) {
      const nio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((a) => a.classList.remove('active'));
            const link = sectionsById[entry.target.id];
            if (link) link.classList.add('active');
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      Object.keys(sectionsById).forEach((id) => nio.observe(document.getElementById(id)));
      // ヒーロー表示中はハイライトなし（#topはナビに無いので消灯だけされる）
      const heroSec = document.getElementById('top');
      if (heroSec) nio.observe(heroSec);
    }

    /* ---- FAQ：ひとつ開いたら他を閉じる ---- */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          faqItems.forEach((other) => {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });

    /* ---- ページ内リンクのスムーズスクロール ---- */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });

    /* ---- フッター年号の自動更新 ---- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
