(function () {
  'use strict';

  const { site, typingRoles, skills, skillsTicker, projects, projectFilters, projectsCarousel, experience, services, testimonials, statistics } =
    PORTFOLIO;

  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    const footerNav = document.getElementById('footer-nav');
    if (footerNav) {
      footerNav.innerHTML = PORTFOLIO.nav.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('');
    }
    const bar = document.getElementById('loading-bar');
    if (bar) {
      requestAnimationFrame(() => {
        bar.style.width = '100%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    }

    renderNav();
    renderSkillsTicker();
    renderSkills();
    renderExperience();
    renderServices();
    renderTestimonials();
    renderStatistics();
    initLoading();
    initCursorGlow();
    initHeader();
    initTyping();
    initReveal();
    initSkillBars();
    initCounters();
    initProjectsCarousel();
    initProjectsReveal();
    initTestimonialSlider();
    initContactForm();
    initParallax();
    initMagnetic();
    if (window.lucide) lucide.createIcons();
  });

  function renderNav() {
    const desktop = document.getElementById('nav-links');
    const mobile = document.getElementById('nav-mobile-links');
    if (!desktop) return;
    const html = PORTFOLIO.nav
      .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
      .join('');
    desktop.innerHTML = html;
    if (mobile) mobile.innerHTML = html;
  }

  function renderSkillsTicker() {
    const track = document.getElementById('skills-ticker-track');
    if (!track || !skillsTicker) return;

    const card = (skill) => `
      <div class="skills-ticker__card">
        <img
          class="skills-ticker__icon"
          src="https://cdn.simpleicons.org/${skill.slug}/${skill.color}"
          alt="${skill.name} logo"
          width="40"
          height="40"
          loading="lazy"
          decoding="async"
        >
        <span class="skills-ticker__name">${skill.name}</span>
      </div>`;

    const items = skillsTicker.map(card).join('');
    track.innerHTML = items + items;
  }

  function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = skills
      .map(
        (cat) => `
      <div class="glass-card glass glass-card--hover reveal">
        <h3 class="skills__category">${cat.name}</h3>
        <ul class="skills__list">
          ${cat.items
            .map(
              (s) => `
            <li class="skills__item">
              <div class="skills__item-header">
                <span>${s.name}</span>
                <span class="skills__level">${s.level}%</span>
              </div>
              <div class="skills__bar">
                <div class="skills__bar-fill" data-progress="${s.level}" style="width:0"></div>
              </div>
            </li>`
            )
            .join('')}
        </ul>
      </div>`
      )
      .join('');
  }

  function renderExperience() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    timeline.innerHTML = experience
      .map(
        (item, i) => `
      <div class="timeline__item reveal ${i % 2 === 0 ? 'reveal-left' : ''}">
        <div class="timeline__marker" aria-hidden><span class="timeline__dot"></span></div>
        <div class="timeline__content glass">
          <span class="timeline__year">${item.year}</span>
          <h3 class="timeline__role">${item.role}</h3>
          <p class="timeline__company">${item.company}</p>
          <p class="timeline__desc">${item.description}</p>
        </div>
      </div>`
      )
      .join('');
  }

  function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = services
      .map(
        (s) => `
      <div class="glass-card glass glass-card--hover reveal">
        <div class="services__icon"><i data-lucide="${s.icon}"></i></div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>`
      )
      .join('');
  }

  function projectCardHTML(p) {
    const liveBtn = p.liveUrl
      ? `<a href="${p.liveUrl}" class="magnetic-btn magnetic-btn--primary projects__btn" target="_blank" rel="noopener noreferrer">
              <i data-lucide="external-link"></i> Live Demo
            </a>`
      : '';
    const githubBtn = p.githubUrl
      ? `<a href="${p.githubUrl}" class="magnetic-btn magnetic-btn--secondary projects__btn" target="_blank" rel="noopener noreferrer">
              <i data-lucide="github"></i> GitHub
            </a>`
      : '';
    return `
      <article class="projects__card glass" data-category="${p.category}" data-id="${p.id}">
        <div class="projects__image">
          <div class="lazy-image">
            <img class="lazy-image__img" src="${p.image}" alt="${p.title}" loading="lazy" decoding="async" onload="this.parentElement.classList.add('lazy-image--loaded')">
          </div>
          <div class="projects__overlay">
            ${liveBtn}
            ${githubBtn}
          </div>
        </div>
        <div class="projects__body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="projects__tags">${p.tags.map((t) => `<span class="projects__tag">${t}</span>`).join('')}</div>
        </div>
      </article>`;
  }

  function initProjectsCarousel() {
    const filtersEl = document.getElementById('projects-filters');
    const track = document.getElementById('projects-track');
    const viewport = document.getElementById('projects-viewport');
    const dotsEl = document.getElementById('projects-dots');
    const pagerEl = document.getElementById('projects-pager');
    const prevBtn = document.getElementById('projects-prev');
    const nextBtn = document.getElementById('projects-next');
    const autoplayBtn = document.getElementById('projects-autoplay');
    const slider = document.getElementById('projects-slider');
    if (!track || !viewport) return;

    const state = {
      filter: 'all',
      page: 0,
      autoplayTimer: null,
      autoplayEnabled: projectsCarousel?.autoplay !== false,
      isHovered: false,
      isInView: false,
    };

    function getPerView() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }

    function getFiltered() {
      if (state.filter === 'all') return projects;
      return projects.filter((p) => p.category === state.filter);
    }

    function getTotalPages() {
      const count = getFiltered().length;
      if (count === 0) return 0;
      return Math.ceil(count / getPerView());
    }

    function layoutCards() {
      const perView = getPerView();
      const cardWidth = viewport.offsetWidth / perView;
      track.querySelectorAll('.projects__card').forEach((card) => {
        card.style.width = cardWidth + 'px';
      });
    }

    function updateSlide(animate = true) {
      const totalPages = getTotalPages();
      if (totalPages === 0) {
        track.style.transform = 'translateX(0)';
        return;
      }
      state.page = ((state.page % totalPages) + totalPages) % totalPages;
      layoutCards();
      if (!animate) track.classList.add('is-dragging');
      track.style.transform = `translateX(-${state.page * viewport.offsetWidth}px)`;
      if (!animate) {
        track.offsetHeight;
        track.classList.remove('is-dragging');
      }
      renderDots();
      updatePager();
      updateArrows();
    }

    function renderDots() {
      if (!dotsEl) return;
      const total = getTotalPages();
      dotsEl.innerHTML = Array.from({ length: total }, (_, i) =>
        `<button type="button" role="tab" aria-selected="${i === state.page}" aria-label="Page ${i + 1}" data-page="${i}" class="${i === state.page ? 'active' : ''}"></button>`
      ).join('');
    }

    function updatePager() {
      if (!pagerEl) return;
      const total = getTotalPages();
      pagerEl.textContent = total ? `${state.page + 1} / ${total}` : '0 / 0';
    }

    function updateArrows() {
      const total = getTotalPages();
      const disabled = total <= 1;
      prevBtn?.toggleAttribute('disabled', disabled);
      nextBtn?.toggleAttribute('disabled', disabled);
    }

    function buildTrack() {
      const filtered = getFiltered();
      state.page = 0;
      if (filtered.length === 0) {
        track.innerHTML = '<p class="projects__empty">No projects in this category yet.</p>';
        renderDots();
        updatePager();
        updateArrows();
        stopAutoplay();
        return;
      }
      track.innerHTML = filtered.map(projectCardHTML).join('');
      if (window.lucide) lucide.createIcons();
      updateSlide(false);
      resetAutoplay();
    }

    function goTo(page) {
      state.page = page;
      updateSlide(true);
      resetAutoplay();
    }

    function nextPage() {
      goTo(state.page + 1);
    }

    function prevPage() {
      goTo(state.page - 1);
    }

    function stopAutoplay() {
      if (state.autoplayTimer) {
        clearInterval(state.autoplayTimer);
        state.autoplayTimer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (!state.autoplayEnabled || getTotalPages() <= 1) return;
      if (projectsCarousel?.pauseOnHover && state.isHovered) return;
      if (!state.isInView) return;
      const interval = projectsCarousel?.autoplayInterval || 4500;
      state.autoplayTimer = setInterval(nextPage, interval);
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    function setAutoplay(enabled) {
      state.autoplayEnabled = enabled;
      autoplayBtn?.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      autoplayBtn?.setAttribute('aria-label', enabled ? 'Pause auto-play' : 'Start auto-play');
      const icon = autoplayBtn?.querySelector('[data-lucide]');
      if (icon) icon.setAttribute('data-lucide', enabled ? 'pause' : 'play');
      if (window.lucide) lucide.createIcons();
      if (enabled) startAutoplay();
      else stopAutoplay();
    }

    if (filtersEl) {
      filtersEl.innerHTML = projectFilters
        .map(
          (f) =>
            `<button type="button" class="projects__filter ${f.id === 'all' ? 'projects__filter--active' : ''}" data-filter="${f.id}" role="tab">${f.label}</button>`
        )
        .join('');

      filtersEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.projects__filter');
        if (!btn) return;
        state.filter = btn.dataset.filter;
        filtersEl.querySelectorAll('.projects__filter').forEach((b) => b.classList.remove('projects__filter--active'));
        btn.classList.add('projects__filter--active');
        buildTrack();
      });
    }

    prevBtn?.addEventListener('click', prevPage);
    nextBtn?.addEventListener('click', nextPage);

    dotsEl?.addEventListener('click', (e) => {
      const dot = e.target.closest('button[data-page]');
      if (!dot) return;
      goTo(parseInt(dot.dataset.page, 10));
    });

    autoplayBtn?.addEventListener('click', () => setAutoplay(!state.autoplayEnabled));

    if (projectsCarousel?.pauseOnHover && slider) {
      slider.addEventListener('mouseenter', () => {
        state.isHovered = true;
        stopAutoplay();
      });
      slider.addEventListener('mouseleave', () => {
        state.isHovered = false;
        startAutoplay();
      });
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        state.isInView = entry.isIntersecting;
        if (entry.isIntersecting) startAutoplay();
        else stopAutoplay();
      },
      { threshold: 0.15 }
    );
    visibilityObserver.observe(slider || viewport);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const total = getTotalPages();
        if (total) state.page = Math.min(state.page, total - 1);
        updateSlide(false);
      }, 150);
    });

    buildTrack();
    setAutoplay(state.autoplayEnabled);
  }


  function renderTestimonials() {
    const container = document.getElementById('testimonials-slides');
    const dots = document.getElementById('testimonials-dots');
    if (!container) return;

    container.innerHTML = testimonials
      .map(
        (t, i) => `
      <blockquote class="testimonial-slide ${i === 0 ? 'is-active' : ''}" data-index="${i}">
        <div class="testimonials__stars" aria-label="${t.rating} out of 5 stars">
          ${'<i data-lucide="star"></i>'.repeat(t.rating)}
        </div>
        <p>&ldquo;${t.quote}&rdquo;</p>
        <footer class="testimonials__author">
          <img src="${t.avatar}" alt="" width="56" height="56" loading="lazy">
          <div><cite>${t.name}</cite><span>${t.role}</span></div>
        </footer>
      </blockquote>`
      )
      .join('');

    if (dots) {
      dots.innerHTML = testimonials
        .map((_, i) => `<button type="button" class="${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Testimonial ${i + 1}"></button>`)
        .join('');
    }
  }

  function renderStatistics() {
    const grid = document.getElementById('stats-grid');
    if (!grid) return;
    grid.innerHTML = statistics
      .map(
        (s) => `
      <div class="stats__item glass reveal" data-count="${s.value}" data-suffix="${s.suffix}">
        <span class="stats__value gradient-text"><span class="stats__number">0</span>${s.suffix}</span>
        <span class="stats__label">${s.label}</span>
      </div>`
      )
      .join('');
  }

  function initLoading() {
    const loader = document.getElementById('loading-screen');
    const LOADING_MS = 1700;

    setTimeout(() => {
      loader?.classList.add('is-hidden');
      document.body.classList.remove('loading');
      document.body.classList.add('is-ready');
      revealHero();
    }, LOADING_MS);
  }

  function revealHero() {
    document.querySelectorAll('#home .hero-animate').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || touch) {
      glow.remove();
      return;
    }
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.style.opacity = '1';
    });
    document.body.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  }

  function initHeader() {
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('nav-mobile');
    const sectionIds = PORTFOLIO.nav.map((n) => n.href.replace('#', ''));

    window.addEventListener(
      'scroll',
      () => {
        header?.classList.toggle('header--scrolled', window.scrollY > 40);
        updateActiveNav(sectionIds);
      },
      { passive: true }
    );

    menuBtn?.addEventListener('click', () => {
      const open = mobileNav?.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      const icon = menuBtn.querySelector('[data-lucide]');
      if (icon) icon.setAttribute('data-lucide', open ? 'x' : 'menu');
      if (window.lucide) lucide.createIcons();
    });

    mobileNav?.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        menuBtn?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function updateActiveNav(sectionIds) {
    let current = sectionIds[0];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top <= 200) current = id;
    });
    document.querySelectorAll('.header__links a, .header__mobile a').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  function initTyping() {
    const el = document.getElementById('typed-role');
    if (!el) return;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const word = typingRoles[wordIndex % typingRoles.length];
      if (!isDeleting) {
        el.textContent = word.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === word.length) {
          setTimeout(() => {
            isDeleting = true;
            tick();
          }, 2000);
          return;
        }
      } else {
        el.textContent = word.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex++;
        }
      }
      setTimeout(tick, isDeleting ? 40 : 80);
    }
    tick();
  }

  function initMagnetic() {
    document.body.addEventListener('mousemove', (e) => {
      const btn = e.target.closest('.magnetic-btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    document.body.addEventListener(
      'mouseout',
      (e) => {
        const btn = e.target.closest('.magnetic-btn');
        if (btn && !btn.contains(e.relatedTarget)) btn.style.transform = '';
      },
      true
    );
  }

  function initReveal() {
    const revealSelector = '.reveal, .reveal-left, .reveal-scale, .stagger-children';
    const observed = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('revealed');
          } else {
            el.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px 0px -50px 0px' }
    );

    function observeElements() {
      document.querySelectorAll(revealSelector).forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    }

    observeElements();
    const mo = new MutationObserver(observeElements);
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function initSkillBars() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const bars = entry.target.querySelectorAll('.skills__bar-fill');
          if (entry.isIntersecting) {
            bars.forEach((bar) => {
              const progress = bar.dataset.progress;
              requestAnimationFrame(() => {
                bar.style.width = progress + '%';
              });
            });
          } else {
            bars.forEach((bar) => {
              bar.style.width = '0';
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    document.getElementById('skills-grid')?.querySelectorAll('.glass-card').forEach((card) => {
      observer.observe(card);
    });
  }

  function initCounters() {
    const items = document.querySelectorAll('.stats__item[data-count]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cancelMap = new WeakMap();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target;
          const numEl = item.querySelector('.stats__number');
          const end = parseInt(item.dataset.count, 10);

          if (entry.isIntersecting) {
            if (reduced) {
              numEl.textContent = end;
            } else {
              cancelMap.get(item)?.();
              cancelMap.set(item, animateCount(numEl, end));
            }
          } else {
            cancelMap.get(item)?.();
            cancelMap.delete(item);
            numEl.textContent = '0';
          }
        });
      },
      { threshold: 0.3 }
    );
    items.forEach((item) => observer.observe(item));
  }

  function animateCount(el, end) {
    const duration = 2000;
    let start = null;
    let frameId = null;
    let cancelled = false;

    function step(ts) {
      if (cancelled) return;
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * end);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    }

    frameId = requestAnimationFrame(step);

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
    };
  }

  function initProjectsReveal() {
    const section = document.getElementById('projects');
    const slider = document.getElementById('projects-slider');
    if (!section || !slider) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const heading = section.querySelector('.section-heading');
          const filters = document.getElementById('projects-filters');
          if (entry.isIntersecting) {
            heading?.classList.add('revealed');
            filters?.classList.add('revealed');
            slider.classList.add('revealed', 'is-visible');
          } else {
            heading?.classList.remove('revealed');
            filters?.classList.remove('revealed');
            slider.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(section);
  }

  function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('#testimonials-dots button');
    let index = 0;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle('is-active', j === index));
      dots.forEach((d, j) => d.classList.toggle('active', j === index));
      if (window.lucide) lucide.createIcons();
    }

    document.getElementById('testimonial-prev')?.addEventListener('click', () => goTo(index - 1));
    document.getElementById('testimonial-next')?.addEventListener('click', () => goTo(index + 1));
    dots.forEach((d) => d.addEventListener('click', () => goTo(parseInt(d.dataset.index, 10))));
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('contact-success');
    if (!form) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
      };
      const errors = {};
      if (!data.name || data.name.length < 2) errors.name = 'Name is required (min 2 characters)';
      if (!data.email) errors.email = 'Email is required';
      else if (!emailRegex.test(data.email)) errors.email = 'Please enter a valid email';
      if (!data.subject) errors.subject = 'Subject is required';
      if (!data.message || data.message.length < 10) errors.message = 'Message must be at least 10 characters';

      form.querySelectorAll('.contact__error').forEach((el) => el.remove());
      form.querySelectorAll('.contact__field').forEach((f) => f.classList.remove('contact__field--error'));

      Object.entries(errors).forEach(([key, msg]) => {
        const field = form.querySelector(`[name="${key}"]`)?.closest('.contact__field');
        field?.classList.add('contact__field--error');
        const span = document.createElement('span');
        span.className = 'contact__error';
        span.setAttribute('role', 'alert');
        span.textContent = msg;
        field?.appendChild(span);
      });

      if (Object.keys(errors).length === 0) {
        form.reset();
        success?.classList.add('is-visible');
        setTimeout(() => success?.classList.remove('is-visible'), 5000);
      }
    });
  }

  function initParallax() {
    const visual = document.querySelector('.hero__visual');
    const content = document.querySelector('.hero__content');
    if (!visual) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          visual.style.transform = `translateY(${y * 0.15}px)`;
          if (content) content.style.transform = `translateY(${y * 0.08}px)`;
        }
      },
      { passive: true }
    );
  }
})();
