/* ------------------------------------------------------------------
   QA Engineer Portfolio — Interactions
-------------------------------------------------------------------*/

(function () {
  'use strict';

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------- Year in footer ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (persisted) ---------- */
  const themeToggle = $('#themeToggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = $('#menuToggle');
  const navLinks = $('.nav__links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    $$('.nav__links a').forEach((a) =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Shadow on nav after scroll ---------- */
  const nav = $('#nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active link on scroll (IntersectionObserver) ---------- */
  const sections = $$('section[id]');
  const linkMap = new Map();
  $$('.nav__links a').forEach((a) => {
    const id = a.getAttribute('href');
    if (id && id.startsWith('#')) linkMap.set(id.slice(1), a);
  });
  if ('IntersectionObserver' in window && sections.length) {
    const activeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            linkMap.forEach((el) => el.classList.remove('active'));
            const el = linkMap.get(entry.target.id);
            if (el) el.classList.add('active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => activeObs.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => revealObs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Animated counters ---------- */
  const counters = $$('[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const startTs = performance.now();
    const start = 0;
    const step = (now) => {
      const progress = Math.min((now - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (target - start) * eased);
      el.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => countObs.observe(el));
  }

  /* ---------- Animate skill bars when in view ---------- */
  const bars = $$('.bar i');
  if ('IntersectionObserver' in window && bars.length) {
    const barObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lvl = entry.target.getAttribute('data-level');
            if (lvl) entry.target.style.width = lvl + '%';
            barObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach((b) => barObs.observe(b));
  } else {
    bars.forEach((b) => {
      const lvl = b.getAttribute('data-level');
      if (lvl) b.style.width = lvl + '%';
    });
  }

  /* ---------- Contact form (client-side validation) ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  const showFieldError = (field, msg) => {
    const parent = field.closest('.field');
    if (!parent) return;
    parent.classList.add('invalid');
    const err = parent.querySelector('.error');
    if (err) err.textContent = msg;
  };
  const clearFieldError = (field) => {
    const parent = field.closest('.field');
    if (!parent) return;
    parent.classList.remove('invalid');
    const err = parent.querySelector('.error');
    if (err) err.textContent = '';
  };
  const validEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  if (form) {
    form.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('input', () => clearFieldError(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form__status';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      let ok = true;
      if (name.length < 2) { showFieldError(form.name, 'Please enter your name.'); ok = false; }
      if (!validEmail(email)) { showFieldError(form.email, 'Please enter a valid email.'); ok = false; }
      if (message.length < 10) { showFieldError(form.message, 'Message should be at least 10 characters.'); ok = false; }

      if (!ok) {
        status.textContent = 'Please fix the highlighted fields.';
        status.classList.add('error');
        return;
      }

      // No backend wired up — open the user's email client as a graceful fallback.
      const subject = encodeURIComponent('Portfolio inquiry from ' + name);
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href =
        'mailto:ganesh.guda@cloudfuze.com?subject=' + subject + '&body=' + body;

      status.textContent = "Thanks! Opening your email client — I'll reply within 24 hours.";
      status.classList.add('success');
      form.reset();
    });
  }
})();
