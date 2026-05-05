Stop everything. Do not plan. Do not ask questions. Open index.html right now and make these exact edits.
EDIT 1 — Find this line:
html![The Conrods ATV](./images/photo2_edited.png)
or whatever the current img tag for photo2_edited.png looks like. Delete that entire line.
EDIT 2 — Find the about section — the block containing "A LEGACY BUILT ON DIRT" and the paragraph about SRM University. Delete that entire section.
EDIT 3 — In their place, paste this exact HTML block:
html<div style="position:relative; height:280vh; background:#080808;">
  <div style="position:sticky; top:0; height:100vh; overflow:hidden; display:flex; align-items:center; justify-content:center;">
    <img id="car-img" src="./images/photo2_edited.png" style="width:500px; max-width:48vw; will-change:transform; transform-origin:center bottom; filter:drop-shadow(0 40px 80px rgba(232,78,15,0.3));">
    <div id="ground-line" style="position:absolute; bottom:22vh; left:8%; width:84%; height:1px; background:linear-gradient(to right,transparent,#E84E0F 30%,#E84E0F 70%,transparent); opacity:0; transform:scaleX(0); transform-origin:left center;"></div>
  </div>
  <div style="position:absolute; bottom:0; left:0; width:100%; height:100vh; display:grid; grid-template-columns:1fr 1fr; align-items:center; padding:0 6vw; gap:60px;">
    <div></div>
    <div id="about-text" style="opacity:0; transform:translateY(50px);">
      <span style="display:block; font-family:Inter,sans-serif; font-size:11px; letter-spacing:0.3em; color:#E84E0F; text-transform:uppercase; margin-bottom:20px;">THE TEAM</span>
      <h2 style="font-family:'Bebas Neue',sans-serif; font-size:clamp(56px,6vw,100px); color:#F0EDE8; line-height:0.95; margin-bottom:28px;">A LEGACY BUILT<br>ON DIRT</h2>
      <p style="font-family:Inter,sans-serif; font-size:15px; line-height:1.9; color:#8A8880; max-width:460px;">The Conrods is one of the most well-established teams at SRM University, renowned for its strong presence and consistent performance in racing events over the years. With a legacy built on dedication and innovation, the team has earned a significant name in the BAJA community. Now, with a fresh start after four years, the team is focused on rebuilding its vehicle from the ground up, aiming to come back stronger and push the limits of engineering and performance.</p>
    </div>
  </div>
</div>
EDIT 4 — Find the closing </body> tag. Directly above it, paste this exact script block:
html<script>
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);

const carImg = document.getElementById('car-img');
const groundLine = document.getElementById('ground-line');
const aboutText = document.getElementById('about-text');
const transitionZone = carImg.closest('div[style*="280vh"]');

// Get the car's natural position on the hero background
// The car in photo1_edited.jpg sits on the right side mid-frame
// We position the cutout to match that exact spot then animate down
const heroSection = document.querySelector('.hero') || document.querySelector('section');
const heroRect = heroSection.getBoundingClientRect();

// Car starts matching its position in the hero background image
gsap.set(carImg, {
  x: window.innerWidth * 0.19,
  y: -(window.innerHeight * 0.52),
  rotation: -6,
  scale: 0.75
});

gsap.set(groundLine, { opacity: 0, scaleX: 0 });
gsap.set(aboutText, { opacity: 0, y: 50 });

gsap.timeline({
  scrollTrigger: {
    trigger: transitionZone,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 2
  }
})
.to(carImg, {
  x: -(window.innerWidth * 0.19),
  y: window.innerHeight * 0.06,
  rotation: 0,
  scale: 1,
  ease: 'power2.inOut',
  duration: 0.72
}, 0)
.to(groundLine, { opacity: 1, scaleX: 1, ease: 'power3.out', duration: 0.06 }, 0.68)
.to(groundLine, { opacity: 0.2, duration: 0.03 }, 0.74)
.to(groundLine, { opacity: 0.9, duration: 0.03 }, 0.77)
.to(groundLine, { opacity: 0.5, duration: 0.04 }, 0.80)
.to(aboutText, { opacity: 1, y: 0, ease: 'power3.out', duration: 0.28 }, 0.78);
</script>
Save the file. Deploy to Vercel. Do not change anything else.
