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

// Basic image-theft deterrents — stops casual right-click-save and drag-save
// on photos. Not foolproof (screenshots always work), but blocks the most
// common casual copying. Scoped to <img> only so links/buttons/nav still work.
document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', function (e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

// Contact form — submits to Formspree over AJAX (works on Formspree's free
// plan, which doesn't support a custom post-submit redirect) so the existing
// success card still shows without a full page reload; falls back to a
// plain POST (Formspree's own thank-you page) if JS doesn't run at all.
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var success = document.getElementById('contact-form-success');
  var error = document.getElementById('contact-form-error');
  if (!form || !success || !error) return;
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.textContent;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    error.classList.remove('is-visible');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('Form submission failed');
      form.style.display = 'none';
      success.classList.add('is-visible');
    }).catch(function () {
      error.classList.add('is-visible');
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    });
  });
});

// Session prep info popup — works on any page with .prep-info-btn buttons,
// a #prep-modal dialog, and a matching #prep-<session> <template>
document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('prep-modal');
  var buttons = document.querySelectorAll('.prep-info-btn');
  if (!modal || !buttons.length) return;

  var titleEl = document.getElementById('prep-modal-title');
  var bodyEl = document.getElementById('prep-modal-body');
  var closeBtn = modal.querySelector('.prep-modal-close');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var template = document.getElementById('prep-' + btn.getAttribute('data-session'));
      if (!template) return;
      titleEl.textContent = btn.getAttribute('data-title') || 'How to prepare';
      bodyEl.innerHTML = '';
      bodyEl.appendChild(template.content.cloneNode(true));
      modal.showModal();
    });
  });

  closeBtn.addEventListener('click', function () { modal.close(); });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.close();
  });
});
