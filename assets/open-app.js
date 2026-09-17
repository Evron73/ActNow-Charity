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

  function dailyToken() {
    try {
      var params = new URLSearchParams(window.location.search);
      return params.get('t') || params.get('token') || '';
    } catch (e) {
      return '';
    }
  }

  function openApp(key) {
    var ref = chainRef();
    var token = dailyToken();
    var qs = [];
    if (ref) qs.push('ref=' + encodeURIComponent(ref));
    if (token && key === 'redeem') qs.push('t=' + encodeURIComponent(token));
    var target = SCHEME + key + (qs.length ? '?' + qs.join('&') : '');
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
