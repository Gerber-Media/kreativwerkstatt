// ============================================
// KREATIVWERKSTATT - Legal Pages i18n
// ============================================
(function () {
  var t = {
    de: {
      skip: 'Zum Inhalt springen',
      back: 'Zurück zur Startseite',
      contact: 'Kontakt',
      links: 'Links',
      legal: 'Rechtliches',
      cookies: 'Cookie- & Speicherrichtlinie',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
      rights: 'Alle Rechte vorbehalten.',
      project: 'Ein Projekt von Kreativgården Sydals',
      cvr: 'CVR'
    },
    en: {
      skip: 'Skip to content',
      back: 'Back to homepage',
      contact: 'Contact',
      links: 'Links',
      legal: 'Legal',
      cookies: 'Cookie & Storage Policy',
      imprint: 'Imprint',
      privacy: 'Privacy Policy',
      rights: 'All rights reserved.',
      project: 'A project by Kreativgården Sydals',
      cvr: 'CVR'
    },
    da: {
      skip: 'Gå til indhold',
      back: 'Tilbage til forsiden',
      contact: 'Kontakt',
      links: 'Links',
      legal: 'Juridisk',
      cookies: 'Cookie- & lagringspolitik',
      imprint: 'Kolofon',
      privacy: 'Privatlivspolitik',
      rights: 'Alle rettigheder forbeholdes.',
      project: 'Et projekt af Kreativgården Sydals',
      cvr: 'CVR'
    }
  };

  // Detect language: saved preference > browser language > default (de)
  var supportedLangs = ['de', 'en', 'da'];
  function detectLang() {
    var saved = localStorage.getItem('kreativwerkstatt_lang');
    if (saved && supportedLangs.indexOf(saved) !== -1) return saved;
    var browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
    for (var i = 0; i < browserLangs.length; i++) {
      var code = browserLangs[i].toLowerCase().split('-')[0];
      if (supportedLangs.indexOf(code) !== -1) return code;
    }
    return 'de';
  }
  var currentLang = detectLang();

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('kreativwerkstatt_lang', lang);
    document.documentElement.lang = lang;

    // Toggle content articles using hidden attribute
    supportedLangs.forEach(function (l) {
      var el = document.getElementById('content-' + l);
      if (el) {
        if (l === lang) {
          el.removeAttribute('hidden');
        } else {
          el.setAttribute('hidden', '');
        }
      }
    });

    // Update language switcher with aria-pressed
    document.querySelectorAll('.kw-lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update skip link
    var skipLink = document.querySelector('.kw-skip-link');
    if (skipLink) skipLink.textContent = t[lang].skip;

    // Update footer i18n elements
    document.querySelectorAll('[data-legal-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-legal-i18n');
      if (t[lang][key] !== undefined) {
        el.textContent = t[lang][key];
      }
    });
  }

  // Language switcher clicks
  document.querySelectorAll('.kw-lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(this.getAttribute('data-lang'));
    });
  });

  // Year
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Init
  setLang(currentLang);
})();
