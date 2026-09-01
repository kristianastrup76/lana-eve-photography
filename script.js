document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-visible');
    window.setTimeout(function () { menu.classList.remove('is-open'); }, 180);
  }

  function openMenu() {
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { menu.classList.add('is-visible'); });
    });
  }

  function toggleMenu() {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', toggleMenu);
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});

// Gallery lightbox — works on any page with a .gallery-grid and a .lightbox
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.gallery-grid');
  var lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  var buttons = Array.prototype.slice.call(grid.querySelectorAll('button'));
  var lbImg = lightbox.querySelector('.lightbox-figure img');
  var lbCount = lightbox.querySelector('.lightbox-count');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var current = 0;
  var lastFocused = null;

  function show(index) {
    current = (index + buttons.length) % buttons.length;
    var img = buttons[current].querySelector('img');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt') || '';
    lbCount.textContent = (current + 1) + ' / ' + buttons.length;
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  buttons.forEach(function (btn, i) {
    btn.addEventListener('click', function () { open(i); });
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(current - 1); });
  nextBtn.addEventListener('click', function () { show(current + 1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
});

// Contact form success state — shows after FormSubmit.co redirects back with ?sent=true
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contact-form-success');
  if (!form || !success) return;
  if (new URLSearchParams(window.location.search).get('sent') === 'true') {
    form.style.display = 'none';
    success.classList.add('is-visible');
    // Drop ?sent=true from the URL so refreshing doesn't re-show the success state
    var url = new URL(window.location.href);
    url.searchParams.delete('sent');
    window.history.replaceState(null, '', url.pathname + url.hash);
  }
});
