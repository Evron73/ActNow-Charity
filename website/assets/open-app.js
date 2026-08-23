(function () {
  var APP_STORE = 'https://apps.apple.com/us/app/actnow-charity/id6778068435';
  var SCHEME = 'actnow://';

  function chainRef() {
    try {
      var ref = new URLSearchParams(window.location.search).get('ref');
      return ref && ref.trim() ? ref.trim().toUpperCase() : '';
    } catch (e) {
      return '';
    }
  }

  function openApp(key) {
    var ref = chainRef();
    var target = SCHEME + key + (ref ? '?ref=' + encodeURIComponent(ref) : '');
    var timer = setTimeout(function () {
      window.location.href = APP_STORE;
    }, 1600);
    window.addEventListener('pagehide', function () { clearTimeout(timer); }, { once: true });
    window.addEventListener('blur', function () { clearTimeout(timer); }, { once: true });
    window.location.href = target;
  }

  window.openActNowApp = openApp;

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-open-app]');
    if (!el) return;
    e.preventDefault();
    openApp(el.getAttribute('data-open-app'));
  });

  var auto = document.body && document.body.getAttribute('data-auto-open');
  if (auto) openApp(auto);
})();
