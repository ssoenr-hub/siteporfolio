/* ==========================================================================
   AZASHOOTS — interactions
   - Lenis smooth scroll
   - GSAP ScrollTrigger (parallax, reveal)
   - Custom cursor
   ========================================================================== */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LENIS SMOOTH SCROLL ---------- */
  let lenis;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ---------- NAV SCROLL STATE ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 50) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE MENU ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    const setOpen = (open) => {
      mobileMenu.classList.toggle('is-open', open);
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      document.body.style.overscrollBehavior = open ? 'contain' : '';
    };
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'mobileMenu');
    burger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });
    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ---------- ANCHOR SMOOTH SCROLL (via Lenis) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------- REVEAL ON SCROLL (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const stagger = reduceMotion ? 0 : 80;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          if (stagger) {
            setTimeout(() => entry.target.classList.add('is-visible'), i * stagger);
          } else {
            entry.target.classList.add('is-visible');
          }
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- GALLERY FIGURES — reveal indépendant de GSAP ---------- */
  const galleryFigs = document.querySelectorAll('.project-gallery__grid figure');
  if (galleryFigs.length && 'IntersectionObserver' in window) {
    const galleryIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          galleryIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    galleryFigs.forEach(fig => galleryIO.observe(fig));
  } else {
    galleryFigs.forEach(fig => fig.classList.add('is-visible'));
  }

  /* ---------- STATS COUNTER (0 → target en vue) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    const animateCount = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      // easing expo-out pour décélération cinéma
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const val = Math.round(target * ease(p));
        el.textContent = val + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countIO.observe(el));
  } else if (counters.length) {
    // fallback : affiche direct target+suffix
    counters.forEach(el => {
      el.textContent = (el.dataset.count || '0') + (el.dataset.suffix || '');
    });
  }

  /* ---------- TILE TILT (hover 3D subtil) — attach/detach on viewport change --- */
  const tileHandlers = new WeakMap();
  const attachTilt = () => {
    document.querySelectorAll('.tile').forEach((tile) => {
      if (tileHandlers.has(tile)) return;
      const media = tile.querySelector('.tile__media');
      if (!media) return;
      let rafId = null;
      const onMove = (e) => {
        const r = tile.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          media.style.transform = `scale(1.04) translate3d(${x * -8}px, ${y * -8}px, 0)`;
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(rafId);
        media.style.transform = '';
      };
      tile.addEventListener('mousemove', onMove);
      tile.addEventListener('mouseleave', onLeave);
      tileHandlers.set(tile, { onMove, onLeave, media });
    });
  };
  const detachTilt = () => {
    document.querySelectorAll('.tile').forEach((tile) => {
      const h = tileHandlers.get(tile);
      if (!h) return;
      tile.removeEventListener('mousemove', h.onMove);
      tile.removeEventListener('mouseleave', h.onLeave);
      h.media.style.transform = '';
      tileHandlers.delete(tile);
    });
  };
  const tiltCheck = () => {
    if (window.matchMedia('(hover: hover)').matches && window.innerWidth > 1024 && !reduceMotion) {
      attachTilt();
    } else {
      detachTilt();
    }
  };
  tiltCheck();

  /* ---------- GSAP PARALLAX ---------- */
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Connecte Lenis à ScrollTrigger
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Hero: Ken Burns drives media (CSS). Subtle hero__name fade on exit (no transform clash).
    gsap.to('.hero__name, .hero__footer, .hero__topbar', {
      opacity: 0.15,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Parallax sur les cards portfolio
    document.querySelectorAll('[data-parallax] .card__media, [data-parallax] img').forEach((el) => {
      gsap.to(el, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('[data-parallax]'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    });

    // Parallax doux portrait "Derrière l'objectif"
    const aboutImg = document.querySelector('.about__visual img');
    if (aboutImg) {
      gsap.to(aboutImg, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }

    // Statement — animation lettre par section
    gsap.utils.toArray('.statement__text span').forEach((el, i) => {
      gsap.from(el, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.statement',
          start: 'top 75%',
        },
      });
    });

    // BTS — scroll horizontal accéléré au scroll vertical
    const btsTrack = document.querySelector('.bts__track');
    const btsScroller = document.querySelector('.bts__scroller');
    if (btsTrack && btsScroller && window.innerWidth > 900) {
      const getAmount = () => btsTrack.scrollWidth - btsScroller.clientWidth;
      gsap.to(btsTrack, {
        x: () => -getAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.bts',
          start: 'top 20%',
          end: () => `+=${getAmount()}`,
          scrub: 1,
          pin: false,
        },
      });
    }
  }

  /* ---------- CUSTOM CURSOR — only real pointer devices ≥1200px --------------- */
  const cursorEl = document.getElementById('cursor');
  const cursorDotEl = document.getElementById('cursorDot');
  let cursorActive = false;
  let cursorRaf = null;

  const enableCursor = () => {
    if (cursorActive || !cursorEl) return;
    cursorActive = true;
    let mx = 0, my = 0, cx = 0, cy = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cursorDotEl) {
        cursorDotEl.style.left = mx + 'px';
        cursorDotEl.style.top = my + 'px';
      }
    };
    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursorEl.style.left = cx + 'px';
      cursorEl.style.top = cy + 'px';
      cursorRaf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    cursorRaf = requestAnimationFrame(loop);
    cursorEl._cleanup = () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(cursorRaf);
    };

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('is-hover'));
    });
  };
  const disableCursor = () => {
    if (!cursorActive || !cursorEl) return;
    cursorActive = false;
    cursorEl._cleanup?.();
  };
  const cursorCheck = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1200) {
      enableCursor();
    } else {
      disableCursor();
    }
  };
  cursorCheck();

  /* ---------- RESIZE — re-evaluate tilt + cursor ----------------------------- */
  let resizeRaf;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      tiltCheck();
      cursorCheck();
    });
  }, { passive: true });

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- FORM HINT ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      // mailto: fallback — pour un vrai backend, remplacer par fetch() vers un endpoint
      // (Formspree, Resend, Getform, etc.)
    });
  }

  /* ==========================================================================
     HERO v4 — word-mask reveal on name lines (editorial)
     ========================================================================== */
  const wordEls = document.querySelectorAll('[data-reveal-word]');
  if (wordEls.length) {
    if (reduceMotion) {
      wordEls.forEach((el) => el.classList.add('is-word-revealed'));
    } else {
      // Hero above fold: trigger immediately with staggered delay for cinema entrance
      wordEls.forEach((el, i) => {
        setTimeout(() => el.classList.add('is-word-revealed'), 250 + i * 150);
      });
    }
  }

  /* ---------- RIPPLE ON SERVICE CTA ---------- */
  document.querySelectorAll('.service__cta').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - r.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ==========================================================================
     TESTIMONIALS RENDERER — data-driven from window.AZA_TESTIMONIALS
     Édite data/testimonials.js pour modifier les avis
     ========================================================================== */
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  const testimonialsDots = document.getElementById('testimonialsDots');
  const testimonials = Array.isArray(window.AZA_TESTIMONIALS) ? window.AZA_TESTIMONIALS : [];

  if (testimonialsGrid && testimonials.length) {
    const escapeHtml = (str) => String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const getInitials = (name) => {
      const parts = String(name || '').trim().split(/\s+/);
      return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
    };

    const renderRating = (rating) => {
      if (!rating || rating < 1) return '';
      const n = Math.max(1, Math.min(5, Math.round(rating)));
      let html = '<div class="testimonial__rating" aria-label="Note ' + n + ' sur 5">';
      for (let i = 1; i <= 5; i++) {
        html += '<span class="' + (i <= n ? 'star-on' : 'star-off') + '">★</span>';
      }
      html += '</div>';
      return html;
    };

    const renderAvatar = (t) => {
      if (t.avatar) {
        return `<img class="testimonial__avatar" src="${escapeHtml(t.avatar)}" alt="${escapeHtml(t.name)}" loading="lazy" onerror="this.outerHTML='<div class=\\'testimonial__avatar--placeholder\\'>${escapeHtml(getInitials(t.name))}</div>'"/>`;
      }
      return `<div class="testimonial__avatar--placeholder" aria-hidden="true">${escapeHtml(getInitials(t.name))}</div>`;
    };

    testimonialsGrid.innerHTML = testimonials.map((t) => `
      <article class="testimonial">
        <span class="testimonial__quote" aria-hidden="true">"</span>
        ${renderRating(t.rating)}
        <p class="testimonial__text">${escapeHtml(t.text)}</p>
        <div class="testimonial__author">
          ${renderAvatar(t)}
          <div>
            <p class="testimonial__name">${escapeHtml(t.name)}</p>
            ${t.role ? `<p class="testimonial__role">${escapeHtml(t.role)}</p>` : ''}
          </div>
        </div>
      </article>
    `).join('');

    /* Mobile carousel dots — sync with scroll position */
    if (testimonialsDots) {
      testimonialsDots.innerHTML = testimonials
        .map((_, i) => `<span class="dot${i === 0 ? ' is-active' : ''}" data-idx="${i}"></span>`)
        .join('');

      const dots = testimonialsDots.querySelectorAll('.dot');
      const cards = testimonialsGrid.querySelectorAll('.testimonial');
      let scrollRaf = null;

      const updateDots = () => {
        const scroll = testimonialsGrid.scrollLeft;
        const cardW = cards[0]?.getBoundingClientRect().width || 1;
        const gap = parseFloat(getComputedStyle(testimonialsGrid).columnGap) || 22;
        const idx = Math.round(scroll / (cardW + gap));
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
      };

      testimonialsGrid.addEventListener('scroll', () => {
        cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(updateDots);
      }, { passive: true });

      dots.forEach((d) => {
        d.addEventListener('click', () => {
          const idx = parseInt(d.dataset.idx, 10);
          const card = cards[idx];
          if (card) {
            testimonialsGrid.scrollTo({ left: card.offsetLeft - testimonialsGrid.offsetLeft, behavior: 'smooth' });
          }
        });
      });
    }
  }

  /* ==========================================================================
     RADICAL DA v3 — split char reveal / marquee seamless
     ========================================================================== */

  /* ---------- SPLIT CHAR REVEAL ---------- */
  // Wrap chars per WORD to prevent mid-word line-break.
  // Structure: <span class="char-word"><span class="char"><span>c</span></span>…</span>
  // Spaces between words are real text nodes → allow wrap at word boundaries only.
  const splitEls = document.querySelectorAll('[data-split="chars"]');
  splitEls.forEach((el) => {
    if (el.dataset.splitDone) return;
    const text = el.textContent;
    el.textContent = '';
    const tokens = text.split(/(\s+)/); // keep whitespace as separator tokens
    for (const token of tokens) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        el.appendChild(document.createTextNode(' '));
        continue;
      }
      const word = document.createElement('span');
      word.className = 'char-word';
      for (const ch of token) {
        const outer = document.createElement('span');
        outer.className = 'char';
        const inner = document.createElement('span');
        inner.textContent = ch;
        outer.appendChild(inner);
        word.appendChild(outer);
      }
      el.appendChild(word);
    }
    el.dataset.splitDone = '1';
  });

  if (splitEls.length && 'IntersectionObserver' in window && !reduceMotion) {
    const splitIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chars = entry.target.querySelectorAll('.char > span');
          chars.forEach((c, idx) => {
            c.style.transitionDelay = (idx * 0.02) + 's';
          });
          entry.target.classList.add('is-split-revealed');
          splitIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    splitEls.forEach(el => splitIO.observe(el));
  } else {
    // fallback: reveal immediately
    splitEls.forEach(el => el.classList.add('is-split-revealed'));
  }

})();
