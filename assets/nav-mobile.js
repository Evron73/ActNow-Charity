/**
 * Mobile hamburger — uses existing .nav-burger if present, else creates one.
 * Clones .nav-links into a drawer under 1100px.
 */
(function () {
  var nav = document.querySelector('.nav-links');
  var row = document.querySelector('.hdr-row');
  if (!nav || !row) return;

  var btn = document.querySelector('.nav-burger');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-burger';
    btn.setAttribute('aria-label', 'Menü');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'navDrawer');
    btn.innerHTML = '<span></span><span></span><span></span>';
    var actions = row.querySelector('.hdr-actions');
    if (actions) actions.appendChild(btn);
    else row.appendChild(btn);
  } else {
    btn.setAttribute('aria-controls', 'navDrawer');
    if (!btn.getAttribute('aria-label')) btn.setAttribute('aria-label', 'Menü');
    if (!btn.getAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
  }

  if (document.getElementById('navDrawer')) return;

  var backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.hidden = true;

  var drawer = document.createElement('nav');
  drawer.id = 'navDrawer';
  drawer.className = 'nav-drawer';
  drawer.setAttribute('aria-label', 'Mobil menü');
  drawer.hidden = true;

  var title = document.createElement('p');
  title.className = 'nav-drawer-title';
  title.textContent = 'Menü';
  drawer.appendChild(title);

  var list = document.createElement('div');
  list.className = 'nav-drawer-list';

  nav.querySelectorAll('a').forEach(function (a) {
    var link = document.createElement('a');
    link.href = a.getAttribute('href') || '#';
    link.textContent = a.textContent.trim();
    if (a.classList.contains('is-active')) link.classList.add('is-active');
    if (a.hasAttribute('data-i18n')) {
      link.setAttribute('data-i18n', a.getAttribute('data-i18n'));
    }
    link.addEventListener('click', close);
    list.appendChild(link);
  });

  drawer.appendChild(list);
  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  function open() {
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('is-open');
    drawer.hidden = false;
    backdrop.hidden = false;
    document.body.classList.add('nav-open');
  }

  function close() {
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('is-open');
    drawer.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove('nav-open');
  }

  function toggle() {
    if (btn.getAttribute('aria-expanded') === 'true') close();
    else open();
  }

  btn.addEventListener('click', toggle);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 1100px)').matches) close();
  });
})();
