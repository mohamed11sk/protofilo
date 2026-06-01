(function initCustomCursor() {
  'use strict';

  const LERP = 0.50;
  const HOVER_SELECTOR = [
    'a',
    'button',
    '.magnetic-btn',
    '.glass-card',
    '.skills-ticker__card',
    '.projects__card',
    '.hero__social-link',
    '.projects__filter',
    '.timeline__content',
    '.stats__item',
    '.testimonials__slider',
    '.testimonials__nav button',
    '.testimonials__dots button',
    '.header__theme-btn',
    '.header__menu-btn',
    '.footer__top',
    '.footer__social a',
    '.hero__scroll',
    '.contact__info-item',
    'input',
    'textarea',
    'select',
    'label',
  ].join(', ');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(pointer: coarse)').matches;
  if (reduced || touch) return;

  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !dot || !ring) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let visible = false;

  function enable() {
    document.body.classList.add('custom-cursor-active');
    cursor.style.opacity = '1';
    visible = true;
  }

  function setDotPosition(x, y) {
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
  }

  function setRingPosition(x, y) {
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
  }

  window.addEventListener(
    'mousemove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      setDotPosition(mx, my);
      if (!visible) enable();
    },
    { passive: true }
  );

  function tick() {
    rx += (mx - rx) * LERP;
    ry += (my - ry) * LERP;
    setRingPosition(rx, ry);
    requestAnimationFrame(tick);
  }

  setDotPosition(mx, my);
  setRingPosition(rx, ry);
  requestAnimationFrame(tick);

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SELECTOR)) {
      cursor.classList.add('is-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const from = e.target.closest(HOVER_SELECTOR);
    if (!from) return;
    const to = e.relatedTarget;
    if (!to || !to.closest(HOVER_SELECTOR)) {
      cursor.classList.remove('is-hover');
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-hover');
  });

  window.addEventListener('blur', () => {
    cursor.style.opacity = '0';
  });

  window.addEventListener('focus', () => {
    if (visible) cursor.style.opacity = '1';
  });
})();
