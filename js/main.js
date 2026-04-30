/* ==========================================================================
   AZASHOOTS — interactions v3
   - Lenis smooth scroll
   - GSAP ScrollTrigger (parallax, reveal)
   - Custom magnetic cursor
   - Focus trap mobile menu
   - prefers-reduced-motion live listener
   ========================================================================== */

(() => {
  'use strict';

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = motionQuery.matches;

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
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 50) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- MOBILE MENU + FOCUS TRAP ---------- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    let lastFocusedBeforeOpen = null;

    const getFocusables = () => Array.from(mobileMenu.querySelectorAll(focusableSelector));

    const trapFocus = (e) => {
      if (!mobileMenu.classList.contains('is-open') || e.key !== 'Tab') return;
      const focusables = getFocusables();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const setOpen = (open) => {
      mobileMenu.classList.toggle('is-open', open);
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
      document.body.style.overscrollBehavior = open ? 'contain' : '';

      if (open) {
        lastFocusedBeforeOpen = document.activeElement;
        const first = getFocusables()[0];
        if (first) setTimeout(() => first.focus(), 100);
        document.addEventListener('keydown', trapFocus);
      } else {
        document.removeEventListener('keydown', trapFocus);
        if (lastFocusedBeforeOpen && typeof lastFocusedBeforeOpen.focus === 'function') {
          lastFocusedBeforeOpen.focus();
        }
      }
    };

    burger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });
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
        lenis.scrollTo(target, { offset: 0, duration: 1.2 });
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
    counters.forEach(el => {
      el.textContent = (el.dataset.count || '0') + (el.dataset.suffix || '');
    });
  }

  /* ---------- TILE TILT (hover 3D subtil) via CSS vars — no inline clash --- */
  const tileHandlers = new WeakMap();
  const attachTilt = () => {
    document.querySelectorAll('.tile').forEach((tile) => {
      if (tileHandlers.has(tile)) return;
      let rafId = null;
      const onMove = (e) => {
        const r = tile.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          tile.style.setProperty('--tilt-x', `${x * -6}px`);
          tile.style.setProperty('--tilt-y', `${y * -6}px`);
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(rafId);
        tile.style.removeProperty('--tilt-x');
        tile.style.removeProperty('--tilt-y');
      };
      tile.addEventListener('mousemove', onMove);
      tile.addEventListener('mouseleave', onLeave);
      tileHandlers.set(tile, { onMove, onLeave });
    });
  };
  const detachTilt = () => {
    document.querySelectorAll('.tile').forEach((tile) => {
      const h = tileHandlers.get(tile);
      if (!h) return;
      tile.removeEventListener('mousemove', h.onMove);
      tile.removeEventListener('mouseleave', h.onLeave);
      tile.style.removeProperty('--tilt-x');
      tile.style.removeProperty('--tilt-y');
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

  /* ---------- MAGNETIC CURSOR — attract interactives ---------------------- */
  const magneticHandlers = new WeakMap();
  const attachMagnetic = () => {
    document.querySelectorAll('.btn, [data-magnetic]').forEach((el) => {
      if (magneticHandlers.has(el)) return;
      let rafId = null;
      const strength = parseFloat(el.dataset.magneticStrength) || 0.35;
      const maxDist = parseFloat(el.dataset.magneticMax) || 14;
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        const clampedX = Math.max(-maxDist, Math.min(maxDist, dx));
        const clampedY = Math.max(-maxDist, Math.min(maxDist, dy));
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.style.setProperty('--mag-x', `${clampedX}px`);
          el.style.setProperty('--mag-y', `${clampedY}px`);
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(rafId);
        el.style.setProperty('--mag-x', '0px');
        el.style.setProperty('--mag-y', '0px');
      };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      magneticHandlers.set(el, { onMove, onLeave });
    });
  };
  const detachMagnetic = () => {
    document.querySelectorAll('.btn, [data-magnetic]').forEach((el) => {
      const h = magneticHandlers.get(el);
      if (!h) return;
      el.removeEventListener('mousemove', h.onMove);
      el.removeEventListener('mouseleave', h.onLeave);
      el.style.removeProperty('--mag-x');
      el.style.removeProperty('--mag-y');
      magneticHandlers.delete(el);
    });
  };
  const magneticCheck = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024 && !reduceMotion) {
      attachMagnetic();
    } else {
      detachMagnetic();
    }
  };
  magneticCheck();

  /* ---------- GSAP PARALLAX ---------- */
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

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
  }

  /* ---------- CUSTOM CURSOR — real pointer ≥xl (1280px) --------------------- */
  const cursorEl = document.getElementById('cursor');
  const cursorDotEl = document.getElementById('cursorDot');
  let cursorActive = false;
  let cursorRaf = null;
  let cursorHoverCleanup = null;

  const bindCursorHover = () => {
    if (!cursorEl) return;
    // Clean up previous
    if (cursorHoverCleanup) cursorHoverCleanup();
    const targets = document.querySelectorAll('a, button, [data-cursor]');
    const enterFns = new WeakMap();
    const leaveFns = new WeakMap();
    targets.forEach(el => {
      const onEnter = () => cursorEl.classList.add('is-hover');
      const onLeave = () => cursorEl.classList.remove('is-hover');
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      enterFns.set(el, onEnter);
      leaveFns.set(el, onLeave);
    });
    cursorHoverCleanup = () => {
      targets.forEach(el => {
        if (enterFns.has(el)) el.removeEventListener('mouseenter', enterFns.get(el));
        if (leaveFns.has(el)) el.removeEventListener('mouseleave', leaveFns.get(el));
      });
    };
  };

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
      if (cursorHoverCleanup) cursorHoverCleanup();
    };

    bindCursorHover();
  };
  const disableCursor = () => {
    if (!cursorActive || !cursorEl) return;
    cursorActive = false;
    cursorEl._cleanup?.();
  };
  const cursorCheck = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1280 && !reduceMotion) {
      enableCursor();
    } else {
      disableCursor();
    }
  };
  cursorCheck();

  /* ---------- RESIZE — re-eval tilt + cursor + magnetic -------------------- */
  let resizeRaf;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      tiltCheck();
      cursorCheck();
      magneticCheck();
    });
  }, { passive: true });

  /* ---------- REDUCE MOTION LIVE LISTENER --------------------------------- */
  const onMotionChange = (e) => {
    reduceMotion = e.matches;
    // Toggle effects
    if (reduceMotion) {
      disableCursor();
      detachTilt();
      detachMagnetic();
    } else {
      tiltCheck();
      cursorCheck();
      magneticCheck();
    }
  };
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', onMotionChange);
  } else if (motionQuery.addListener) {
    motionQuery.addListener(onMotionChange);
  }

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==========================================================================
     HERO — word-mask reveal on name lines (editorial)
     ========================================================================== */
  const wordEls = document.querySelectorAll('[data-reveal-word]');
  if (wordEls.length) {
    if (reduceMotion) {
      wordEls.forEach((el) => el.classList.add('is-word-revealed'));
    } else {
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
        html += '<span class="' + (i <= n ? 'star-on' : 'star-off') + '" aria-hidden="true">★</span>';
      }
      html += '</div>';
      return html;
    };

    const renderAvatar = (t) => {
      if (t.avatar) {
        return `<img class="testimonial__avatar" src="${escapeHtml(t.avatar)}" alt="" loading="lazy" onerror="this.outerHTML='<div class=\\'testimonial__avatar--placeholder\\' aria-hidden=\\'true\\'>${escapeHtml(getInitials(t.name))}</div>'"/>`;
      }
      return `<div class="testimonial__avatar--placeholder" aria-hidden="true">${escapeHtml(getInitials(t.name))}</div>`;
    };

    testimonialsGrid.innerHTML = testimonials.map((t) => {
      const hasText = t.text && String(t.text).trim().length > 0;
      return `
      <article class="testimonial${hasText ? '' : ' testimonial--pending'}">
        ${hasText ? '<span class="testimonial__quote" aria-hidden="true">"</span>' : ''}
        ${renderRating(t.rating)}
        ${hasText
          ? `<p class="testimonial__text">${escapeHtml(t.text)}</p>`
          : '<p class="testimonial__text testimonial__text--pending">Avis à venir</p>'}
        <div class="testimonial__author">
          ${renderAvatar(t)}
          <div>
            <p class="testimonial__name">${escapeHtml(t.name)}</p>
            ${t.role ? `<p class="testimonial__role">${escapeHtml(t.role)}</p>` : ''}
          </div>
        </div>
      </article>`;
    }).join('');

    // Re-bind cursor hover on newly rendered testimonials
    if (cursorActive) bindCursorHover();

    /* Mobile carousel dots — buttons for a11y + tap target */
    if (testimonialsDots) {
      testimonialsDots.innerHTML = testimonials
        .map((_, i) => `<button type="button" class="dot${i === 0 ? ' is-active' : ''}" data-idx="${i}" aria-label="Témoignage ${i + 1}"></button>`)
        .join('');

      const dots = testimonialsDots.querySelectorAll('.dot');
      const cards = testimonialsGrid.querySelectorAll('.testimonial');
      let scrollRaf = null;

      const updateDots = () => {
        const scroll = testimonialsGrid.scrollLeft;
        const cardW = cards[0]?.getBoundingClientRect().width || 1;
        const gap = parseFloat(getComputedStyle(testimonialsGrid).columnGap) || 22;
        const idx = Math.round(scroll / (cardW + gap));
        dots.forEach((d, i) => {
          d.classList.toggle('is-active', i === idx);
          d.setAttribute('aria-current', i === idx ? 'true' : 'false');
        });
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
            const gridRect = testimonialsGrid.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const left = testimonialsGrid.scrollLeft + (cardRect.left - gridRect.left);
            testimonialsGrid.scrollTo({ left, behavior: 'smooth' });
          }
        });
      });
    }
  }

  /* ==========================================================================
     SPLIT CHAR REVEAL
     ========================================================================== */
  const splitEls = document.querySelectorAll('[data-split="chars"]');
  splitEls.forEach((el) => {
    if (el.dataset.splitDone) return;
    const text = el.textContent;
    el.textContent = '';
    const tokens = text.split(/(\s+)/);
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
    splitEls.forEach(el => el.classList.add('is-split-revealed'));
  }

})();
