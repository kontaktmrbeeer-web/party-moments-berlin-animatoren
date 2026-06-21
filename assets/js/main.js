/* ============================================================
   PartyMoments Berlin — Shared JS entry point
   Initializes GSAP plugins and any global behaviour.
   Individual page logic lives in page-specific scripts.
   ============================================================ */

// GSAP + ScrollTrigger are loaded via CDN in each HTML file.
// This file is the shared bootstrap run on every page.

// ── Responsive video source + poster swap (runs before DOMContentLoaded) ──
(function () {
  var isMob = window.matchMedia('(max-width: 768px)').matches;
  document.querySelectorAll('video[data-mob-src]').forEach(function (v) {
    var src = v.querySelector('source');
    if (!src) return;
    src.src = isMob ? v.dataset.mobSrc : v.dataset.deskSrc;
    if (v.dataset.mobPoster) {
      v.poster = isMob ? v.dataset.mobPoster : (v.dataset.deskPoster || '');
    }
    v.load();
  });
}());

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins (available after CDN scripts load)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Mobile hamburger menu toggle (shared across all pages)
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navMenu    = document.querySelector('[data-nav-menu]');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.getAttribute('aria-expanded') === 'true';
      navMenu.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open');
    });
  }

  // WhatsApp CTA — all elements with data-whatsapp open the link
  const WA_URL =
    'https://wa.me/4917620488050?text=Hallo%20PartyMoments%20Berlin%2C%20ich%20m%C3%B6chte%20eine%20Anfrage%20stellen.';

  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      window.open(WA_URL, '_blank', 'noopener,noreferrer');
    });
  });
});
