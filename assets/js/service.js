/* service.js — PartyMoments Berlin service page animations */
(function () {
  'use strict';

  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return setTimeout(init, 50);
    }
    gsap.registerPlugin(ScrollTrigger);
    heroAnimations();
    scrollReveal();
    initLightbox();
  }

  function heroAnimations() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero__tag',      { opacity: 0, y: 20, duration: 0.6 })
      .from('.hero__title',    { opacity: 0, y: 36, duration: 0.8 }, '-=0.3')
      .from('.hero__subtitle', { opacity: 0, y: 24, duration: 0.7 }, '-=0.5')
      .from('.hero__ctas',     { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from('.hero__scroll',   { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  function scrollReveal() {
    var grid = document.querySelector('.included__grid');
    if (grid) {
      gsap.from('.included__item', {
        scrollTrigger: { trigger: '.included__grid', start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power3.out'
      });
    }
    var steps = document.querySelector('.how__steps');
    if (steps) {
      gsap.from('.how__step', {
        scrollTrigger: { trigger: '.how__steps', start: 'top 80%' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power3.out'
      });
    }
    var galleryGrid = document.querySelector('.gallery__grid');
    if (galleryGrid) {
      gsap.from('.gallery__item', {
        scrollTrigger: { trigger: '.gallery__grid', start: 'top 85%' },
        opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.05, ease: 'power2.out'
      });
    }
    var faqList = document.querySelector('.faq__list');
    if (faqList) {
      gsap.from('.faq__item', {
        scrollTrigger: { trigger: '.faq__list', start: 'top 85%' },
        opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power3.out'
      });
    }
    var cta = document.querySelector('.service-cta__inner');
    if (cta) {
      gsap.from('.service-cta__inner', {
        scrollTrigger: { trigger: '.service-cta', start: 'top 72%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out'
      });
    }
  }

  function initLightbox() {
    var items = document.querySelectorAll('.gallery__item');
    if (!items.length) return;

    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Foto vergrößern');
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Schließen">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
          '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
        '</svg>' +
      '</button>' +
      '<img class="lightbox__img" src="" alt="">';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('.lightbox__img');
    var lbClose = lb.querySelector('.lightbox__close');

    function open(img) {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('.gallery__img');
        if (img) open(img);
      });
    });

    lbClose.addEventListener('click', close);
    lb.addEventListener('click', function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
