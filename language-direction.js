// language-direction.js
// This script checks the page language and applies RTL if needed (e.g., for Arabic or Hebrew)
// It also works if the language is changed by Google Translate or similar tools
(function() {
  // List of RTL language codes
  var rtlLangs = ['ar', 'he', 'fa', 'ur'];

  // Helper to check if a language code is RTL
  function isRtl(lang) {
    if (!lang) return false;
    lang = lang.toLowerCase();
    // Check for full code (e.g., ar, ar-sa)
    return rtlLangs.some(function(rtl) {
      return lang === rtl || lang.startsWith(rtl + '-');
    });
  }

  // Function to update dir attribute and Bootstrap classes based on lang
  function updateDir() {
    var html = document.documentElement;
    var body = document.body;
    var lang = html.getAttribute('lang') || navigator.language || '';
    var isRtlLang = isRtl(lang);
    // Set dir attribute
    html.setAttribute('dir', isRtlLang ? 'rtl' : 'ltr');
    // Add or remove Bootstrap RTL class on body
    if (isRtlLang) {
      body.classList.add('rtl');
      body.classList.remove('ltr');
    } else {
      body.classList.remove('rtl');
      body.classList.add('ltr');
    }
  }

  // Run on page load
  updateDir();

  // Observe changes to the lang attribute (e.g., by Google Translate)
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'lang') {
        updateDir();
      }
    });
  });
  observer.observe(document.documentElement, { attributes: true });

  // Also check every 2 seconds in case of external changes
  setInterval(updateDir, 2000);
})();
