The photo2_edited.png image is rendering as a static image, not a scroll-animated element. The .transition-zone and .car-sticky-wrap sticky structure was not implemented. Fix this now.
Open index.html. Find the <img> tag for photo2_edited.png and the surrounding about section. Replace that entire block with exactly this:
html<div class="transition-zone" id="transition-zone">
  <div class="car-sticky-wrap">
    <img id="car-img" src="./images/photo2_edited.png" alt="The Conrods ATV">
    <div class="ground-line"></div>
  </div>
  <div class="about-content">
    <div class="about-left"></div>
    <div class="about-right">
      <span class="about-label">THE TEAM</span>
      <h2>A LEGACY BUILT<br>ON DIRT</h2>
      <p>The Conrods is one of the most well-established teams at SRM University, renowned for its strong presence and consistent performance in racing events over the years. With a legacy built on dedication and innovation, the team has earned a significant name in the BAJA community. Now, with a fresh start after four years, the team is focused on rebuilding its vehicle from the ground up, aiming to come back stronger and push the limits of engineering and performance.</p>
    </div>
  </div>
</div>
Then in the CSS file, add these rules. Do not remove any existing rules — just add these:
css.transition-zone {
  position: relative;
  height: 280vh;
  background: #080808;
}
.car-sticky-wrap {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  z-index: 10;
}
#car-img {
  width: 520px;
  max-width: 48vw;
  display: block;
  will-change: transform;
  transform-origin: center bottom;
  filter: drop-shadow(0 40px 80px rgba(232,78,15,0.3));
}
.ground-line {
  position: absolute;
  bottom: 22vh;
  left: 8%;
  width: 84%;
  height: 1px;
  background: linear-gradient(to right, transparent, #E84E0F 30%, #E84E0F 70%, transparent);
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left center;
  will-change: opacity, transform;
}
.about-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 6vw;
  gap: 60px;
}
.about-right {
  opacity: 0;
  transform: translateY(50px);
}
.about-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.3em;
  color: #E84E0F;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.about-right h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(56px, 6vw, 100px);
  color: #F0EDE8;
  line-height: 0.95;
  margin-bottom: 28px;
}
.about-right p {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.9;
  color: #8A8880;
  max-width: 460px;
}
Then in the JS file, find any existing GSAP car animation code and delete it completely. Replace with exactly this — do not modify a single value:
jsgsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);

if (window.innerWidth > 768) {
  gsap.set('#car-img', {
    x: window.innerWidth * 0.2,
    y: -(window.innerHeight * 0.55),
    rotation: -8,
    scale: 0.72
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
  .to('#car-img', {
    x: -(window.innerWidth * 0.2),
    y: window.innerHeight * 0.08,
    rotation: 0,
    scale: 1,
    ease: 'power2.inOut',
    duration: 0.72
  }, 0)
  .to('.ground-line', { opacity: 1, scaleX: 1, transformOrigin: 'left center', ease: 'power3.out', duration: 0.06 }, 0.68)
  .to('.ground-line', { opacity: 0.2, duration: 0.03 }, 0.74)
  .to('.ground-line', { opacity: 0.9, duration: 0.03 }, 0.77)
  .to('.ground-line', { opacity: 0.5, duration: 0.04 }, 0.80)
  .to('.about-right', { opacity: 1, y: 0, ease: 'power3.out', duration: 0.28 }, 0.78);
}
Deploy to Vercel when done.
