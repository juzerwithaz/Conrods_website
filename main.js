// ===== GSAP + LENIS SMOOTH SCROLL =====
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
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
if (window.innerWidth > 768) {

  // Car starts on the RIGHT side of hero, nose already tilted down
  // matching the angle in photo1_edited.jpg
  gsap.set('#car-img', {
    x: window.innerWidth * 0.2,
    y: -(window.innerHeight * 0.55),
    rotation: -8,
    scale: 0.72,
  });

  gsap.set('.about-right', { opacity: 0, y: 50 });
  gsap.set('.ground-line', { opacity: 0, scaleX: 0 });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.transition-zone',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
    }
  })
  // Car descends diagonally — right side of hero → left side of about section
  .to('#car-img', {
    x: -(window.innerWidth * 0.2),
    y: window.innerHeight * 0.08,
    rotation: 0,
    scale: 1,
    ease: 'power2.inOut',
    duration: 0.72
  }, 0)

  // Ground line shoots in left to right on landing
  .to('.ground-line', {
    opacity: 1,
    scaleX: 1,
    transformOrigin: 'left center',
    ease: 'power3.out',
    duration: 0.06
  }, 0.68)

  // Ground line flash — landing impact
  .to('.ground-line', { opacity: 0.2, duration: 0.03 }, 0.74)
  .to('.ground-line', { opacity: 0.9, duration: 0.03 }, 0.77)
  .to('.ground-line', { opacity: 0.5, duration: 0.04 }, 0.80)

  // About text reveals after car lands
  .to('.about-right', {
    opacity: 1,
    y: 0,
    ease: 'power3.out',
    duration: 0.28
  }, 0.78);

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
