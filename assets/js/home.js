/* home.js — PartyMoments Berlin homepage animations */
(function () {
  'use strict';

  /* ── Wait for GSAP + ScrollTrigger to be ready ── */
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Swiper === 'undefined') {
      return setTimeout(init, 50);
    }
    gsap.registerPlugin(ScrollTrigger);
    heroAnimations();
    aboutAnimations();
    serviceCards();
    serviceCardLinks();
    counters();
    whyPoints();
    initSwiper();
    finalCTA();
  }

  /* ── Hero entrance ──
     The hero no longer pins or scrubs: it is two doorways the visitor
     picks between, so it just arrives and then stays out of the way. */
  function heroAnimations() {
    var hero = document.querySelector('.home-hero');
    if (!hero) return;

    /* GSAP does not read the CSS media query, so check it here too. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var targets = '.home-hero__text > *, .home-hero__arches .arch';

    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.home-hero__text > *', { opacity: 0, y: 24, duration: 0.6, stagger: 0.07 })
      .from('.home-hero__arches .arch', { opacity: 0, y: 32, duration: 0.7, stagger: 0.09 }, '-=0.35');

    /* gsap.from() parks these at opacity 0 the moment the tween is built and
       only lifts it as the ticker runs. Where requestAnimationFrame is
       throttled — background tab, occluded window, power saving — the hero
       would be left half-faded or fully invisible. The timeline needs ~1.5s,
       so if it has not finished well past that, snap it to its end state.
       What matters is that the content is visible, not how it got there. */
    setTimeout(function () {
      if (tl.progress() === 1) return;
      tl.progress(1).kill();
      gsap.set(targets, { clearProps: 'all' });
    }, 2500);
  }

  /* ── About section ── */
  function aboutAnimations() {
    gsap.from('.about__inner', {
      scrollTrigger: { trigger: '.about', start: 'top 75%' },
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out'
    });
    gsap.from('.about__highlight', {
      scrollTrigger: { trigger: '.about__highlights', start: 'top 85%' },
      opacity: 0, x: -20, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });
  }

  /* ── Service cards entrance + hover ── */
  function serviceCards() {
    gsap.from('.service-card', {
      scrollTrigger: { trigger: '.service-cards', start: 'top 78%' },
      opacity: 0, y: 60, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    });

    document.querySelectorAll('.service-card').forEach(function (card) {
      const media = card.querySelector('.service-card__media');

      card.addEventListener('mouseenter', function () {
        gsap.to(card,  { y: -8, duration: 0.35, ease: 'power2.out' });
        gsap.to(media, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card,  { y: 0, duration: 0.35, ease: 'power2.inOut' });
        gsap.to(media, { scale: 1, duration: 0.5, ease: 'power2.inOut' });
      });
    });
  }

  /* ── Animated counters ── */
  function counters() {
    document.querySelectorAll('.why__counter').forEach(function (el) {
      const numEl = el.querySelector('.num[data-target]');
      if (!numEl) return; /* skip text-only counters */
      const target = parseInt(numEl.dataset.target, 10);
      const obj    = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            snap: { val: 1 },
            onUpdate: function () { numEl.textContent = Math.round(obj.val); }
          });
        }
      });
    });
  }

  /* ── Why points ── */
  function whyPoints() {
    gsap.from('.why__point', {
      scrollTrigger: { trigger: '.why__points', start: 'top 80%' },
      opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out'
    });
  }

  /* ── Reviews Swiper ── */
  function initSwiper() {
    new Swiper('.reviews-swiper', {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        0:    { slidesPerView: 1,   spaceBetween: 16 },
        640:  { slidesPerView: 1.4, spaceBetween: 20 },
        768:  { slidesPerView: 2,   spaceBetween: 24 },
        1024: { slidesPerView: 3,   spaceBetween: 28 }
      }
    });
  }

  /* ── Service card: entire card is clickable ── */
  function serviceCardLinks() {
    document.querySelectorAll('.service-card').forEach(function (card) {
      var link = card.querySelector('.service-card__cta');
      if (!link) return;
      card.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        link.click();
      });
    });
  }

  /* ── Final CTA ── */
  function finalCTA() {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.final-cta', start: 'top 72%' }
    });
    tl.from('.final-cta__text-col', { opacity: 0, x: -50, duration: 0.9, ease: 'power3.out' })
      .from('.final-cta__media',    { opacity: 0, x:  50, duration: 0.9, ease: 'power3.out' }, '<');
  }

  /* ── Kick off ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
