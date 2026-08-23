(function () {
  var SITE_URL = 'https://actnowcharity.com/';
  var SHARE_TEXT = 'Cselekedj most — átlátható jótékonyság az ActNow appban. Valódi ügyek, dokumentált hatás.';
  var openBtn = document.getElementById('shareOpen');
  var backdrop = document.getElementById('shareBackdrop');
  if (!openBtn || !backdrop) return;

  var closeBtn = backdrop.querySelector('.share-close');
  var copyBtn = backdrop.querySelector('[data-share="copy"]');
  var lastFocus = null;

  function openShare() {
    lastFocus = document.activeElement;
    backdrop.hidden = false;
    requestAnimationFrame(function () {
      backdrop.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeShare() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    window.setTimeout(function () {
      backdrop.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 220);
  }

  function shareUrl(platform) {
    var encodedUrl = encodeURIComponent(SITE_URL);
    var encodedText = encodeURIComponent(SHARE_TEXT);
    if (platform === 'facebook') {
      return 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl;
    }
    if (platform === 'x') {
      return 'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedText;
    }
    if (platform === 'whatsapp') {
      return 'https://wa.me/?text=' + encodeURIComponent(SHARE_TEXT + ' ' + SITE_URL);
    }
    return SITE_URL;
  }

  openBtn.addEventListener('click', openShare);
  if (closeBtn) closeBtn.addEventListener('click', closeShare);
  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeShare();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) closeShare();
  });

  backdrop.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var kind = btn.getAttribute('data-share');
      if (kind === 'copy') {
        var done = function () {
          btn.classList.add('copied');
          var label = btn.querySelector('span:last-child');
          if (label) label.textContent = 'Másolva!';
          window.setTimeout(function () {
            btn.classList.remove('copied');
            if (label) label.textContent = 'Link másolása';
          }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(SITE_URL).then(done).catch(function () {
            window.prompt('Másold ki a linket:', SITE_URL);
          });
        } else {
          window.prompt('Másold ki a linket:', SITE_URL);
        }
        return;
      }
      window.open(shareUrl(kind), '_blank', 'noopener,noreferrer,width=600,height=520');
    });
  });
})();
