// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ===== GSAP + SCROLLTRIGGER =====
gsap.registerPlugin(ScrollTrigger);

// Connect Lenis to GSAP
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
if (cursor && cursorDot && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
  });

  // Hover effects on interactive elements
  document.querySelectorAll('a, button, .tier-card, .nav-cta, .year-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2.2, borderColor: 'rgba(232,78,15,0.3)', duration: 0.3 });
      gsap.to(cursorDot, { scale: 0, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, borderColor: '#E84E0F', duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, duration: 0.2 });
    });
  });
}

// ===== HERO ANIMATIONS =====
gsap.from('.hero-headline .line', {
  y: 120, opacity: 0, duration: 1.2,
  stagger: 0.12, ease: 'power4.out', delay: 0.3
});
gsap.from('.hero-eyebrow, .hero-sub', {
  y: 30, opacity: 0, duration: 1,
  stagger: 0.1, ease: 'power3.out', delay: 0.8
});
gsap.from('.scroll-cta', {
  opacity: 0, y: 20, duration: 1, delay: 1.2, ease: 'power2.out'
});
gsap.from('nav', {
  y: -40, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out'
});

// Hero parallax
gsap.to('.hero', {
  backgroundPositionY: '60%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// ===== CAR LANDING ANIMATION =====
const isMobile = window.innerWidth < 768;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!isMobile && !prefersReduced) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Start: right side of hero, tilted, in flight
  gsap.set('#car-container', {
    x: vw * 0.48,
    y: vh * 0.18,
    rotation: -6,
    scale: 0.88
  });

  // End: left side of about section, landed level
  // Target: horizontally centered in left half, vertically centered in about section
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
      onLeave: () => {
        // Car has landed — reveal the about text
        gsap.to('.about-right', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
        gsap.to('.ground-line', {
          opacity: 1, duration: 0.1,
          yoyo: true, repeat: 3
        });
      }
    }
  });

  tl.to('#car-container', {
    x: vw * 0.04,           // lands on left side
    y: vh * 0.28,           // vertically centered
    rotation: 0,            // levels out
    scale: 1.0,             // full size
    ease: 'power2.inOut'
  });

  // Set initial about-right state
  gsap.set('.about-right', { opacity: 0, y: 30 });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
} else if (isMobile) {
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger && t.trigger.classList.contains('car-section')) t.kill();
  });
}

// ===== SECTION REVEALS =====
// About cards
gsap.from('.about-card', {
  y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.about-section', start: 'top 80%', once: true }
});

// Achievements header
gsap.from('.achievements-header', {
  y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.achievements-section', start: 'top 80%', once: true }
});

// Timeline line fill
ScrollTrigger.create({
  trigger: '.timeline-line',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    document.querySelector('.timeline-line-fill').style.width = '100%';
  }
});

// Year cards stagger
gsap.from('.year-card', {
  y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
  scrollTrigger: { trigger: '.timeline-track', start: 'top 85%', once: true }
});

// Sponsor cards
gsap.from('.tier-card', {
  y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
  scrollTrigger: { trigger: '.tiers-grid', start: 'top 80%', once: true }
});

// Footer
gsap.from('.footer-person', {
  y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: 'footer', start: 'top 90%', once: true }
});
