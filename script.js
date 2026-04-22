(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('siteHeader');
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const revealables = document.querySelectorAll(
      '.reveal, .section-head, .work-card, .service-card, .narrowing, .contact-card, .big-quote, .story-lead, .story-quote, .stack'
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

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
