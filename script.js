document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
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
    lbImg.src = '';
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
