/* ============================================================
   WHITEHAVEN WAVES VOLLEYBALL — main.js
   ============================================================
   MODULES:
   1. Theme Toggle (Dark / Light Mode)
   2. Nav Scroll Behaviour & Hamburger
   3. Scroll Reveal Animations
   4. Stat Counter Animation
   5. Timetable Tabs
   6. Contact Form Handler
   7. Back to Top Button
   8. Active Nav Link Highlight
   ============================================================ */

'use strict';

/* ============================================================
   1. THEME TOGGLE
   Persists preference in localStorage
   ============================================================ */
const ThemeManager = (() => {
  const HTML        = document.documentElement;
  const TOGGLE_BTN  = document.getElementById('themeToggle');
  const STORAGE_KEY = 'ww-theme'; // key stored in localStorage

  function getPreferred() {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function apply(theme) {
    HTML.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggle() {
    const current = HTML.getAttribute('data-theme') || 'dark';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    apply(getPreferred());
    if (TOGGLE_BTN) TOGGLE_BTN.addEventListener('click', toggle);

    // Also respond to OS-level preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) apply(e.matches ? 'light' : 'dark');
    });
  }

  return { init };
})();


/* ============================================================
   2. NAV SCROLL BEHAVIOUR & HAMBURGER
   ============================================================ */
const NavManager = (() => {
  const NAV        = document.getElementById('mainNav');
  const HAMBURGER  = document.getElementById('navToggle');
  const NAV_LINKS  = document.getElementById('navLinks');
  const NAV_ITEMS  = document.querySelectorAll('.nav__link');

  function handleScroll() {
    if (!NAV) return;
    NAV.classList.toggle('scrolled', window.scrollY > 60);
  }

  function toggleMenu() {
    if (!HAMBURGER || !NAV_LINKS) return;
    const open = NAV_LINKS.classList.toggle('open');
    HAMBURGER.classList.toggle('open', open);
    // Prevent body scroll when menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function closeMenu() {
    if (!NAV_LINKS) return;
    NAV_LINKS.classList.remove('open');
    HAMBURGER && HAMBURGER.classList.remove('open');
    document.body.style.overflow = '';
  }

  function init() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (HAMBURGER) HAMBURGER.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked
    NAV_ITEMS.forEach(link => link.addEventListener('click', closeMenu));

    // Close menu on outside click
    document.addEventListener('click', e => {
      if (NAV_LINKS && !NAV_LINKS.contains(e.target) && !HAMBURGER.contains(e.target)) {
        closeMenu();
      }
    });

    handleScroll();
  }

  return { init };
})();


/* ============================================================
   3. SCROLL REVEAL ANIMATIONS
   Uses IntersectionObserver for performance
   ============================================================ */
const RevealManager = (() => {
  const SELECTOR = '.reveal';

  function init() {
    const elements = document.querySelectorAll(SELECTOR);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once revealed, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  }

  return { init };
})();


/* ============================================================
   4. STAT COUNTER ANIMATION
   Animates numbers from 0 to target when scrolled into view
   REPLACE: Update data-target attribute on each .stat__number element in HTML
   ============================================================ */
const CounterManager = (() => {
  const SELECTOR = '.stat__number[data-target]';
  const DURATION = 1800; // ms

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const start  = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const value    = Math.round(easeOutQuart(progress) * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function init() {
    const elements = document.querySelectorAll(SELECTOR);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach(el => observer.observe(el));
  }

  return { init };
})();


/* ============================================================
   5. TIMETABLE TABS
   Switches between Training / Fixtures / Results tabs
   ============================================================ */
const TabManager = (() => {
  const TAB_BTNS    = document.querySelectorAll('.tab-btn');
  const TAB_CONTENT = document.querySelectorAll('.tab-content');

  function switchTab(targetId) {
    TAB_BTNS.forEach(btn => {
      btn.classList.toggle('tab-btn--active', btn.dataset.tab === targetId);
    });
    TAB_CONTENT.forEach(panel => {
      panel.classList.toggle('tab-content--active', panel.id === `tab-${targetId}`);
    });
  }

  function init() {
    TAB_BTNS.forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
  }

  return { init };
})();


/* ============================================================
   6. CONTACT FORM HANDLER
   REPLACE: Swap the fetch URL with your form endpoint
   (e.g. Formspree: https://formspree.io/f/YOUR_FORM_ID)
   ============================================================ */
const FormManager = (() => {
  const FORM     = document.getElementById('contactForm');
  const NOTE     = document.getElementById('formNote');

  // REPLACE: Your form submission endpoint
  const ENDPOINT = '<!-- REPLACE: https://formspree.io/f/YOUR_FORM_ID -->';

  function setNote(msg, colour) {
    if (!NOTE) return;
    NOTE.textContent = msg;
    NOTE.style.color = colour;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data   = new FormData(FORM);
    const submitBtn = FORM.querySelector('[type="submit"]');

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled    = true;

    // ── If no real endpoint is set, show a placeholder success ──
    if (!ENDPOINT || ENDPOINT.includes('REPLACE')) {
      setTimeout(() => {
        setNote('✅ Message received! We\'ll get back to you soon. (Configure your form endpoint in main.js)', '#34d399');
        FORM.reset();
        submitBtn.textContent = 'Send Message 🌊';
        submitBtn.disabled    = false;
      }, 800);
      return;
    }

    // ── Real submission ──
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body:   data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setNote('✅ Message sent! We\'ll be in touch soon.', '#34d399');
        FORM.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        const msg  = json.error || 'Something went wrong. Please try again.';
        setNote(`❌ ${msg}`, '#f87171');
      }
    } catch {
      setNote('❌ Network error. Please check your connection.', '#f87171');
    } finally {
      submitBtn.textContent = 'Send Message 🌊';
      submitBtn.disabled    = false;
    }
  }

  function init() {
    if (FORM) FORM.addEventListener('submit', handleSubmit);
  }

  return { init };
})();


/* ============================================================
   7. BACK TO TOP BUTTON
   ============================================================ */
const BackToTopManager = (() => {
  const BTN = document.getElementById('backToTop');

  function init() {
    if (!BTN) return;
    window.addEventListener('scroll', () => {
      BTN.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    BTN.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return { init };
})();


/* ============================================================
   8. ACTIVE NAV LINK HIGHLIGHT (Scroll Spy)
   ============================================================ */
const ScrollSpyManager = (() => {
  const SECTIONS = document.querySelectorAll('section[id]');
  const NAV_LINKS = document.querySelectorAll('.nav__link[href^="#"]');

  function update() {
    const scrollY = window.scrollY + 120;

    SECTIONS.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        NAV_LINKS.forEach(link => {
          const href = link.getAttribute('href').slice(1);
          link.style.color = href === id ? 'var(--accent)' : '';
        });
      }
    });
  }

  function init() {
    if (!SECTIONS.length) return;
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  return { init };
})();


/* ============================================================
   BONUS: Volleyball bubble particle effect on hero
   Creates small floating bubbles for atmosphere
   ============================================================ */
const BubbleEffect = (() => {
  function createBubble(container) {
    const bubble = document.createElement('div');
    const size   = Math.random() * 6 + 2; // 2–8px
    const left   = Math.random() * 100;
    const delay  = Math.random() * 8;
    const dur    = Math.random() * 6 + 6; // 6–12s

    Object.assign(bubble.style, {
      position:        'absolute',
      bottom:          '-20px',
      left:            `${left}%`,
      width:           `${size}px`,
      height:          `${size}px`,
      borderRadius:    '50%',
      background:      'rgba(14, 165, 233, 0.3)',
      border:          '1px solid rgba(14, 165, 233, 0.5)',
      animation:       `bubbleRise ${dur}s ease-in ${delay}s infinite`,
      pointerEvents:   'none',
    });

    container.appendChild(bubble);
  }

  function injectKeyframes() {
    if (document.getElementById('bubble-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'bubble-keyframes';
    style.textContent = `
      @keyframes bubbleRise {
        0%   { transform: translateY(0) scale(1); opacity: 0; }
        10%  { opacity: 0.6; }
        90%  { opacity: 0.3; }
        100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    injectKeyframes();
    const container = document.createElement('div');
    Object.assign(container.style, {
      position:       'absolute',
      inset:          '0',
      overflow:       'hidden',
      pointerEvents:  'none',
      zIndex:         '1',
    });
    hero.appendChild(container);
    for (let i = 0; i < 20; i++) createBubble(container);
  }

  return { init };
})();


/* ============================================================
   INIT — Boot all modules on DOM ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavManager.init();
  RevealManager.init();
  CounterManager.init();
  TabManager.init();
  FormManager.init();
  BackToTopManager.init();
  ScrollSpyManager.init();
  BubbleEffect.init();

  console.log('🌊 Whitehaven Waves — Site loaded');
});
