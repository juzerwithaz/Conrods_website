Replace all stock images with the actual team photos I am dropping into the images folder right now. Do not touch any other part of the site — only fix the images and the car landing transition. Nothing else changes.
Image mapping — exact filenames:

photo_1.jpg → hero background (full bleed, background-position: center 35%, background-size: cover)
photo_2.png → the landing car (#car-img, apply mix-blend-mode: screen)
photo_3.jpg → reference only, do not place on page

The car landing transition — rebuild this from scratch. This is the only thing that matters right now.
The car in photo_2.png must behave exactly like the product object on https://terminal-industries.com — it descends from above the viewport and lands on a ground line, driven entirely by scroll position, frame perfect, no snapping, no jumping.
Exact implementation:
The outer section has height: 300vh. The inner container is position: sticky; top: 0; height: 100vh. This means as the user scrolls 300vh worth of distance, the sticky container stays pinned to the viewport the entire time — giving 300vh of scroll distance to drive the animation.
css.car-section {
  height: 300vh;
  position: relative;
  background: #080808;
}

.car-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#car-img {
  width: 580px;
  max-width: 88vw;
  display: block;
  mix-blend-mode: screen;
  will-change: transform;
  transform-origin: center bottom;
  filter: drop-shadow(0 60px 120px rgba(232, 78, 15, 0.2));
}

.ground-line {
  position: absolute;
  bottom: 18vh;
  left: 10%;
  width: 80%;
  height: 1px;
  background: linear-gradient(to right, transparent, #E84E0F, transparent);
  opacity: 0;
  will-change: opacity;
}
GSAP — this is the critical part. Copy this exactly:
jsgsap.registerPlugin(ScrollTrigger);

// Set initial state before any scroll
gsap.set('#car-img', {
  y: -580,
  rotation: -11,
  scale: 0.72
});

gsap.set('.ground-line', { opacity: 0 });

// Single timeline, scrub locked to scroll
gsap.timeline({
  scrollTrigger: {
    trigger: '.car-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 2,
  }
})
.to('#car-img', {
  y: 0,
  rotation: 0,
  scale: 1,
  ease: 'power1.inOut',
  duration: 1
})
.to('.ground-line', {
  opacity: 1,
  duration: 0.05
}, 0.9)
.to('.ground-line', {
  opacity: 0.4,
  duration: 0.05
}, 0.95)
.to('.ground-line', {
  opacity: 1,
  duration: 0.05
}, 1.0);
Critical rules:

Do NOT use pin: true inside ScrollTrigger. The sticky CSS already handles pinning. Using both will break it.
Do NOT use onUpdate callbacks for the main movement. The scrub: 2 handles smoothing.
The y: -580 initial value must be negative enough that the car starts fully above the visible viewport. If the car image renders taller than 580px at the user's screen size, increase this value to window.innerHeight * -1.
Make y dynamic so it always starts above viewport regardless of screen size:

jsconst carStartY = -(window.innerHeight * 1.1);
gsap.set('#car-img', {
  y: carStartY,
  rotation: -11,
  scale: 0.72
});
Lenis + ScrollTrigger must be wired together or scrub will stutter:
jsconst lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

lenis.on('scroll', ScrollTrigger.update);
Mobile — at max-width 768px, disable scroll animation entirely and use this instead:
css@media (max-width: 768px) {
  .car-section { height: auto; padding: 80px 20px; }
  .car-sticky { position: relative; height: auto; }
  #car-img {
    opacity: 0;
    transform: translateY(-40px) rotate(-5deg) scale(0.85);
    animation: carLand 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
  }
  @keyframes carLand {
    to { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
  }
}
jsif (window.innerWidth <= 768) {
  // Kill all ScrollTrigger instances for car section
  ScrollTrigger.getAll().forEach(t => {
    if (t.trigger && t.trigger.classList.contains('car-section')) t.kill();
  });
}
Accessibility:
css@media (prefers-reduced-motion: reduce) {
  #car-img { transform: none !important; animation: none !important; opacity: 1 !important; }
}
Deploy to Vercel when done.