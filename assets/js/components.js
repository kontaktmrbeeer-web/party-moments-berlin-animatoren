/* ============================================================
   PartyMoments Berlin — Shared Components
   Injects navbar + footer, wires all interaction.

   Usage: load SYNCHRONOUSLY (no defer) right after
   <div id="navbar-placeholder"></div> in each page.

   Each <body> must have:
     data-lang="de"  (or "ru" / "ua")
     data-url-de="../de/"  (relative path to German version)
     data-url-ru="../ru/"  (relative path to Russian version)
     data-url-ua="../ua/"  (relative path to Ukrainian version)
   ============================================================ */
;(function () {
  'use strict';

  /* ── Page meta ────────────────────────────────────────────── */
  const body   = document.body;
  const lang = body.dataset.lang || 'de';
  const urls = {
    de: body.dataset.urlDe || '../de/',
    ru: body.dataset.urlRu || '../ru/',
    ua: body.dataset.urlUa || '../ua/',
  };

  const WA = 'https://wa.me/4917620488050?text=Hallo%20PartyMoments%20Berlin%2C%20ich%20m%C3%B6chte%20eine%20Anfrage%20stellen.';

  /* ── SVG icons (inline, no external deps) ─────────────────── */
  const IC = {
    sparkle: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M14 3 L16.5 10.5 L24 8 L19.5 14 L27 16 L19.5 18.5 L22 26 L15.5 21.5 L14 28 L12.5 21.5 L6 26 L8.5 18.5 L1 16 L8.5 14 L4 8 L11.5 10.5 Z" fill="currentColor" opacity="0.9"/><circle cx="14" cy="16" r="3.5" fill="#121212"/></svg>`,

    chevron: `<svg class="chevron" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M2.5 4.5L6.5 8.5L10.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,

    instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,

    tiktok: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,

    phone: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 10.82 19.79 19.79 0 01.04 2.18a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,

    mask: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="5"/><path d="M3 21v-1a9 9 0 0118 0v1"/></svg>`,

    gift: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>`,

    costume: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>`,
  };

  /* ── Content (i18n) ───────────────────────────────────────── */
  const T = {
    de: {
      navAriaLabel:    'Hauptnavigation',
      logoAriaLabel:   'PartyMoments Berlin – Startseite',
      servicesLabel:   'Leistungen',
      aboutLabel:      'Über uns',
      contactLabel:    'Kontakt',
      waLabel:         'WhatsApp Anfrage senden',
      menuLabel:       'Menü öffnen / schließen',
      activeLang:      'DE',
      altLang:         'RU',
      langNavLabel:    'Sprache wählen',
      aboutHref:       './index.html#ueber-uns',
      services: [
        { href: './animatoren-berlin.html',                          icon: 'mask',    text: 'Animatoren',              desc: 'Maskottchen & Animation' },
        { href: './suesse-straeusse-geschenkboxen-berlin.html',      icon: 'gift',    text: 'Süße Sträuße & Boxen',    desc: 'Handgemachte Geschenke' },
        { href: './kostuemverleih-berlin.html',                      icon: 'costume', text: 'Kostümverleih',           desc: 'Kostüme & Maskottchen mieten' },
      ],
      /* Footer */
      tagline:          'Unvergessliche Party-Momente in Berlin und Umgebung.',
      servicesColHead:  'Leistungen',
      legalColHead:     'Rechtliches',
      contactColHead:   'Kontakt',
      impressumHref:    './impressum.html',
      datenschutzHref:  './datenschutz.html',
      instagramLabel:   'PartyMoments Berlin auf Instagram',
      tiktokLabel:      'PartyMoments Berlin auf TikTok',
      phoneLabel:       'Anrufen: +49 176 20488050',
      copy:             '© 2026 PartyMoments Berlin Animatoren',
      madeby:           'Made by A.R. Local Growth & Automation',
      legalNavLabel:    'Rechtliche Links',
      langFooterLabel:  'Sprache wechseln',
    },
    ru: {
      navAriaLabel:    'Главное меню',
      logoAriaLabel:   'PartyMoments Berlin – главная страница',
      servicesLabel:   'Услуги',
      aboutLabel:      'О нас',
      contactLabel:    'Контакт',
      waLabel:         'Написать в WhatsApp',
      menuLabel:       'Открыть / закрыть меню',
      activeLang:      'RU',
      altLang:         'DE',
      langNavLabel:    'Выбор языка',
      aboutHref:       './index.html#o-nas',
      services: [
        { href: './animatory-berlin.html',                                      icon: 'mask',    text: 'Аниматоры',            desc: 'Ростовые куклы и анимация' },
        { href: './sladkie-bukety-podarochnye-boksy-berlin.html',               icon: 'gift',    text: 'Сладкие букеты',       desc: 'Ручные подарочные боксы' },
        { href: './arenda-kostyumov-berlin.html',                               icon: 'costume', text: 'Аренда костюмов',      desc: 'Костюмы и ростовые куклы' },
      ],
      /* Footer */
      tagline:          'Незабываемые праздники в Берлине и окрестностях.',
      servicesColHead:  'Услуги',
      legalColHead:     'Правовая информация',
      contactColHead:   'Контакт',
      impressumHref:    './impressum.html',
      datenschutzHref:  './datenschutz.html',
      instagramLabel:   'PartyMoments Berlin в Instagram',
      tiktokLabel:      'PartyMoments Berlin в TikTok',
      phoneLabel:       'Позвонить: +49 176 20488050',
      copy:             '© 2026 PartyMoments Berlin Animatoren',
      madeby:           'Made by A.R. Local Growth & Automation',
      legalNavLabel:    'Правовые ссылки',
      langFooterLabel:  'Сменить язык',
    },
    ua: {
      navAriaLabel:    'Головна навігація',
      logoAriaLabel:   'PartyMoments Berlin – головна сторінка',
      servicesLabel:   'Послуги',
      aboutLabel:      'Про нас',
      contactLabel:    'Контакт',
      waLabel:         'Написати у WhatsApp',
      menuLabel:       'Відкрити / закрити меню',
      activeLang:      'UA',
      altLang:         'DE',
      langNavLabel:    'Вибір мови',
      aboutHref:       './index.html#pro-nas',
      services: [
        { href: './animatory-berlin.html',        icon: 'mask',    text: 'Аніматори',        desc: 'Ростові ляльки та анімація' },
        { href: './solodki-bukety-berlin.html',   icon: 'gift',    text: 'Солодкі букети',   desc: 'Подарункові бокси ручної роботи' },
        { href: './orenda-kostyumiv-berlin.html', icon: 'costume', text: 'Оренда костюмів',  desc: 'Костюми та ростові ляльки' },
      ],
      tagline:          'Незабутні свята в Берліні та окрузі.',
      servicesColHead:  'Послуги',
      legalColHead:     'Правова інформація',
      contactColHead:   'Контакт',
      impressumHref:    './impressum.html',
      datenschutzHref:  './datenschutz.html',
      instagramLabel:   'PartyMoments Berlin в Instagram',
      tiktokLabel:      'PartyMoments Berlin в TikTok',
      phoneLabel:       'Зателефонувати: +49 176 20488050',
      copy:             '© 2026 PartyMoments Berlin Animatoren',
      madeby:           'Made by A.R. Local Growth & Automation',
      legalNavLabel:    'Правові посилання',
      langFooterLabel:  'Змінити мову',
    },
  };

  const t = T[lang] || T.de;

  /* ── Language switcher HTML ───────────────────────────────── */
  function buildLangSwitch(ariaLabel) {
    var order = [
      { code: 'de', label: 'DE', hreflang: 'de' },
      { code: 'ua', label: 'UA', hreflang: 'uk' },
      { code: 'ru', label: 'RU', hreflang: 'ru' },
    ];
    var parts = [];
    order.forEach(function (l, i) {
      if (l.code === lang) {
        parts.push('<span class="navbar__lang is-active" aria-current="true">' + l.label + '</span>');
      } else {
        parts.push('<a href="' + urls[l.code] + '" class="navbar__lang" hreflang="' + l.hreflang + '">' + l.label + '</a>');
      }
      if (i < order.length - 1) {
        parts.push('<span class="navbar__lang-sep" aria-hidden="true">|</span>');
      }
    });
    return '<nav class="navbar__lang-switch" aria-label="' + ariaLabel + '">' + parts.join('') + '</nav>';
  }

  /* ── Build navbar ─────────────────────────────────────────── */
  function buildNavbar() {
    const dropdownItems = t.services.map(s => `
      <li>
        <a href="${s.href}" class="navbar__dropdown-link">
          <span class="navbar__dropdown-icon">${IC[s.icon]}</span>
          <span>
            <span class="dropdown-link-title">${s.text}</span>
            <span class="dropdown-link-desc">${s.desc}</span>
          </span>
        </a>
      </li>`).join('');

    const mobileServiceLinks = t.services.map(s =>
      `<a href="${s.href}" class="navbar__mobile-link navbar__mobile-sublink">${s.text}</a>`
    ).join('');

    return `
<a href="#main-content" class="skip-link">${lang === 'de' ? 'Zum Hauptinhalt springen' : lang === 'ua' ? 'Перейти до основного вмісту' : 'Перейти к основному содержимому'}</a>

<nav class="navbar" id="site-navbar" role="navigation" aria-label="${t.navAriaLabel}">
  <div class="navbar__inner">

    <a href="./index.html" class="navbar__logo" aria-label="${t.logoAriaLabel}">
      <span class="navbar__logo-icon">${IC.sparkle}</span>
      <span class="navbar__logo-text">PartyMoments<span class="navbar__logo-city"> Berlin</span></span>
    </a>

    <ul class="navbar__links" role="list">
      <li class="navbar__item navbar__item--dropdown" id="nav-dropdown">
        <button class="navbar__link navbar__dropdown-trigger"
                aria-expanded="false" aria-haspopup="true"
                aria-controls="services-dropdown" id="services-btn">
          ${t.servicesLabel} ${IC.chevron}
        </button>
        <ul class="navbar__dropdown" id="services-dropdown" role="list" aria-label="${t.servicesLabel}">
          ${dropdownItems}
        </ul>
      </li>
      <li class="navbar__item">
        <a href="${t.aboutHref}" class="navbar__link">${t.aboutLabel}</a>
      </li>
      <li class="navbar__item">
        <a href="${WA}" class="navbar__link" target="_blank" rel="noopener noreferrer" aria-label="${t.waLabel}">${t.contactLabel}</a>
      </li>
    </ul>

    <div class="navbar__actions">
      ${buildLangSwitch(t.langNavLabel)}

      <a href="${WA}" class="btn btn--whatsapp navbar__wa-btn"
         target="_blank" rel="noopener noreferrer" aria-label="${t.waLabel}">
        ${IC.whatsapp}<span>WhatsApp</span>
      </a>

      <a href="${WA}" class="navbar__wa-icon"
         target="_blank" rel="noopener noreferrer" aria-label="${t.waLabel}">
        ${IC.whatsapp}
      </a>

      <button class="navbar__hamburger" id="hamburger-btn"
              aria-label="${t.menuLabel}"
              aria-expanded="false"
              aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <div class="navbar__mobile-menu" id="mobile-menu">
    <div class="navbar__mobile-inner">
      <div class="navbar__mobile-links">
        <button class="navbar__mobile-link navbar__mobile-toggle"
                id="mobile-services-btn" aria-expanded="false">
          ${t.servicesLabel} ${IC.chevron}
        </button>
        <div class="navbar__mobile-submenu" id="mobile-services" aria-hidden="true">
          ${mobileServiceLinks}
        </div>
        <a href="${t.aboutHref}" class="navbar__mobile-link">${t.aboutLabel}</a>
        <a href="${WA}" class="navbar__mobile-link"
           target="_blank" rel="noopener noreferrer" aria-label="${t.waLabel}">${t.contactLabel}</a>
      </div>
      <div class="navbar__mobile-foot">
        ${buildLangSwitch(t.langNavLabel)}
        <a href="${WA}" class="btn btn--whatsapp btn--block"
           target="_blank" rel="noopener noreferrer" aria-label="${t.waLabel}">
          ${IC.whatsapp}<span>WhatsApp</span>
        </a>
      </div>
    </div>
  </div>
</nav>`;
  }

  /* ── Build footer ─────────────────────────────────────────── */
  function buildFooter() {
    const serviceLinks = t.services.map(s =>
      `<li><a href="${s.href}" class="footer__col-link">${s.text}</a></li>`
    ).join('');

    return `
<footer class="footer" role="contentinfo">
  <div class="footer__inner">
    <div class="footer__top">

      <div class="footer__brand">
        <a href="./index.html" class="footer__logo" aria-label="${t.logoAriaLabel}">
          <span class="footer__logo-icon">${IC.sparkle}</span>
          <span class="footer__logo-text">PartyMoments<span class="footer__logo-city"> Berlin</span></span>
        </a>
        <p class="footer__tagline">${t.tagline}</p>
        <div class="footer__social">
          <a href="https://wa.me/4917620488050" class="footer__social-link"
             target="_blank" rel="noopener noreferrer" aria-label="${t.waLabel}">${IC.whatsapp}</a>
          <a href="https://www.instagram.com/" class="footer__social-link"
             target="_blank" rel="noopener noreferrer" aria-label="${t.instagramLabel}">${IC.instagram}</a>
          <a href="https://www.tiktok.com/" class="footer__social-link"
             target="_blank" rel="noopener noreferrer" aria-label="${t.tiktokLabel}">${IC.tiktok}</a>
        </div>
      </div>

      <div class="footer__col">
        <h3 class="footer__col-heading">${t.servicesColHead}</h3>
        <ul class="footer__col-links" role="list">
          ${serviceLinks}
          <li><a href="${t.aboutHref}" class="footer__col-link">${t.aboutLabel}</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__col-heading">${t.contactColHead}</h3>
        <a href="${WA}" class="footer__contact-btn"
           target="_blank" rel="noopener noreferrer" aria-label="${t.waLabel}">
          ${IC.whatsapp}<span>WhatsApp</span>
        </a>
        <div class="footer__phone">
          ${IC.phone}
          <a href="tel:+4917620488050" class="footer__phone-link" aria-label="${t.phoneLabel}">+49 176 20488050</a>
        </div>
      </div>

    </div>

    <div class="footer__bottom">
      <p class="footer__copy">${t.copy}</p>
      <nav class="footer__legal" aria-label="${t.legalNavLabel}">
        <a href="${t.impressumHref}"    class="footer__legal-link">Impressum</a>
        <a href="${t.datenschutzHref}"  class="footer__legal-link">Datenschutz</a>
      </nav>
      ${buildLangSwitch(t.langFooterLabel)}
      <p class="footer__made-by">${t.madeby}</p>
    </div>
  </div>
</footer>`;
  }

  /* ── Inject navbar (immediately – no DOM needed beyond placeholder) */
  var navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = buildNavbar();

  /* ── Init behavior (waits for DOM) ──────────────────────────── */
  function initBehavior() {
    var navbar          = document.getElementById('site-navbar');
    var hamburgerBtn    = document.getElementById('hamburger-btn');
    var mobileMenu      = document.getElementById('mobile-menu');
    var dropdownItem    = document.getElementById('nav-dropdown');
    var dropdownBtn     = document.getElementById('services-btn');
    var mobileServBtn   = document.getElementById('mobile-services-btn');
    var mobileServsMenu = document.getElementById('mobile-services');

    /* Navbar scroll class */
    if (navbar) {
      function onScroll() {
        navbar.classList.toggle('is-scrolled', window.scrollY > 20);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Hamburger */
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('is-open');
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
      });

      /* Close mobile menu on any link click inside it */
      mobileMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          mobileMenu.classList.remove('is-open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        }
      });
    }

    /* Desktop dropdown */
    if (dropdownItem && dropdownBtn) {
      dropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdownItem.classList.toggle('is-open');
        dropdownBtn.setAttribute('aria-expanded', String(isOpen));
      });

      document.addEventListener('click', function () {
        dropdownItem.classList.remove('is-open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && dropdownItem.classList.contains('is-open')) {
          dropdownItem.classList.remove('is-open');
          dropdownBtn.setAttribute('aria-expanded', 'false');
          dropdownBtn.focus();
        }
      });
    }

    /* Mobile services sub-menu */
    if (mobileServBtn && mobileServsMenu) {
      mobileServBtn.addEventListener('click', function () {
        var isOpen = mobileServsMenu.classList.toggle('is-open');
        mobileServBtn.classList.toggle('is-expanded', isOpen);
        mobileServBtn.setAttribute('aria-expanded', String(isOpen));
        mobileServsMenu.setAttribute('aria-hidden', String(!isOpen));
      });
    }
  }

  /* ── Inject footer + init behavior after DOM ready ─────────── */
  function onReady() {
    var footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.outerHTML = buildFooter();
    initBehavior();
    initCookieConsent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  /* ── Cookie Consent (Google Fonts) ───────────────────────────── */
  var CONSENT_KEY = 'pm_cookie_consent';

  function loadGoogleFonts() {
    if (document.getElementById('pm-gfonts')) return;
    var link = document.createElement('link');
    link.id   = 'pm-gfonts';
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap';
    document.head.appendChild(link);
  }

  function initCookieConsent() {
    var stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') { loadGoogleFonts(); return; }
    if (stored === 'declined') { return; }
    showCookieBanner();
  }

  function showCookieBanner() {
    var isDE = lang === 'de';
    var isUA = lang === 'ua';
    var privacyUrl = './datenschutz.html';
    var text = isDE
      ? 'Diese Website nutzt <a href="' + privacyUrl + '">Google&nbsp;Fonts</a> von externen Servern. Dabei wird Ihre IP-Adresse an Google übertragen. Bitte stimmen Sie zu oder lehnen Sie ab.'
      : isUA
        ? 'Цей сайт використовує <a href="' + privacyUrl + '">Google&nbsp;Fonts</a> із зовнішніх серверів. При цьому ваша IP-адреса передається Google. Погодьтесь або відмовтесь.'
        : 'Этот сайт использует <a href="' + privacyUrl + '">Google&nbsp;Fonts</a> с внешних серверов. При этом ваш IP-адрес передаётся Google. Примите или откажитесь.';
    var acceptLabel  = isDE ? 'Zustimmen'  : isUA ? 'Погодитись'  : 'Принять';
    var declineLabel = isDE ? 'Ablehnen'   : isUA ? 'Відхилити'   : 'Отказаться';
    var dialogLabel  = isDE ? 'Cookie-Einstellungen' : isUA ? 'Налаштування cookies' : 'Настройки cookies';

    var banner = document.createElement('div');
    banner.className = 'pm-cookie-banner';
    banner.id = 'pm-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', dialogLabel);
    banner.innerHTML =
      '<div class="pm-cookie-inner">' +
        '<p class="pm-cookie-text">' + text + '</p>' +
        '<div class="pm-cookie-actions">' +
          '<button class="pm-cookie-btn pm-cookie-btn--accept" id="pm-accept">' + acceptLabel + '</button>' +
          '<button class="pm-cookie-btn pm-cookie-btn--decline" id="pm-decline">' + declineLabel + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    document.getElementById('pm-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      loadGoogleFonts();
      banner.remove();
    });
    document.getElementById('pm-decline').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      banner.remove();
    });
  }

})();
