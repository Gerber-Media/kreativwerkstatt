// ============================================
// KREATIVWERKSTATT - Legal Pages i18n
// ============================================
(function () {
  var backLabels = { de: 'Zurück zur Startseite', en: 'Back to homepage', da: 'Tilbage til forsiden' };
  var skipLabels = { de: 'Zum Inhalt springen', en: 'Skip to content', da: 'Gå til indhold' };
  var currentLang = localStorage.getItem('kreativwerkstatt_lang') || 'de';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('kreativwerkstatt_lang', lang);
    document.documentElement.lang = lang;

    // Toggle content articles using hidden attribute
    ['de', 'en', 'da'].forEach(function (l) {
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

    // Update back link
    var backLink = document.querySelector('[data-i18n-back]');
    if (backLink) {
      backLink.textContent = backLabels[lang];
      backLink.setAttribute('aria-label', backLabels[lang]);
    }

    // Update skip link
    var skipLink = document.querySelector('.kw-skip-link');
    if (skipLink) skipLink.textContent = skipLabels[lang];
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
