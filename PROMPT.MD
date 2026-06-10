You are a highly experienced senior frontend engineer specialising in GSAP scroll animations. You are precise, methodical, and do not make assumptions. You read the entire codebase before writing a single line.

## YOUR FIRST TASK — READ BEFORE TOUCHING ANYTHING

Open index.html and read it completely. Before making any changes, report back:
1. The exact selector (id or class) of the hero section wrapper
2. The exact selector of the car image element
3. The exact selector of the about section
4. The current CSS positioning of the car image — is it absolute, relative, fixed? What are its top/bottom/transform values?
5. All existing GSAP code — list every gsap.to(), gsap.from(), gsap.timeline(), and ScrollTrigger instance currently in the file
6. Is there a page-load entrance animation? If yes, does it have an onComplete callback?

Do not proceed until you have read and understood all of the above.

---

## THE PROBLEM — look at the screenshot context

The BAJA car image is anchored too low in the hero section. On a standard screen (1080p or laptop), when the page loads, the bottom half of the car is cut off or sitting in pure black. The car is barely visible.

When the user scrolls, the car snaps away with the hero section. There is no smooth travel. There is a blank gap between hero and about section. The whole thing feels broken.

---

## WHAT YOU MUST BUILD — in this exact order

---

### STEP 1 — Reposition the car vertically in the hero

Find the car image element in the CSS (it is likely absolutely positioned inside the hero).

Change its vertical position so the full car is visible on page load — all four wheels, the chassis, the roll cage — nothing cropped. The car should sit in roughly the lower-center-right of the hero, but HIGH ENOUGH that the entire vehicle is clearly visible above the fold.

Do this purely with CSS. Adjust `top`, `bottom`, or `transform: translateY()` as needed. Do not change width, horizontal position, or any other property.

Verify in the browser that the full car is visible before moving to Step 2.

---

### STEP 2 — Build the scroll-linked descent animation

This is the main feature. The goal: as the user scrolls down from the hero, the car smoothly travels downward on screen — as if it is driving down off the hero and into the next section. It must feel physical and smooth, not instant or snappy.

Implementation rules:

**A. Pin the hero section**
```javascript
ScrollTrigger.create({
  trigger: [hero section selector],
  start: "top top",
  end: "+=700",
  pin: true,
  pinSpacing: false,
  id: "hero-pin"
});
```

**B. Car descent — scrubbed to scroll**
```javascript
gsap.to([car image selector], {
  y: 300,
  x: -30,
  scale: 0.9,
  opacity: 0.8,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: [hero section selector],
    start: "top top",
    end: "+=700",
    scrub: 1.5,
    id: "car-descent"
  }
});
```

The car must NOT disappear. It drifts downward and slightly left, as if landing. opacity stays at 0.8 — never 0.

**C. Text exit — scrubbed to scroll**

Find the hero headline element (DIRT. GUTS. GLORY.) and the subtext (THE CONRODS). Animate them out:
```javascript
gsap.to([headline selector], {
  y: -50,
  opacity: 0,
  ease: "power2.in",
  scrollTrigger: {
    trigger: [hero section selector],
    start: "top top",
    end: "+=420",
    scrub: 1.5
  }
});
```
Apply the same animation to the subtext with a slightly shorter end value (+=350).

**D. "SCROLL TO EXPLORE" fade**

Find the scroll indicator element and fade it out quickly:
```javascript
gsap.to([scroll indicator selector], {
  opacity: 0,
  scrollTrigger: {
    trigger: [hero section selector],
    start: "top top",
    end: "+=140",
    scrub: 1
  }
});
```

**E. About section entrance**

Add a starting state to the about section and animate it in as the pin releases:
```javascript
gsap.set([about section selector], { y: 80, opacity: 0 });

gsap.to([about section selector], {
  y: 0,
  opacity: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: [about section selector],
    start: "top 95%",
    end: "top 60%",
    scrub: 1
  }
});
```

---

### STEP 3 — Handle existing animation conflicts

1. If a page-load entrance timeline already exists for the car (it likely animates the car flying in from off-screen on load), wrap ALL of the ScrollTrigger code above inside that timeline's `onComplete` callback. The scroll animations must only initialise AFTER the entrance animation finishes. If there is no onComplete, add `.eventCallback("onComplete", initScrollAnimations)` and put the ScrollTrigger setup inside `initScrollAnimations`.

2. If any existing ScrollTrigger instances are already targeting the hero or the car image, kill them first:
```javascript
ScrollTrigger.getById("hero-pin")?.kill();
ScrollTrigger.getById("car-descent")?.kill();
```

3. End with `ScrollTrigger.refresh()`.

---

## ACCEPTANCE CHECKLIST — verify every single one in the browser

- [ ] On fresh page load with zero scrolling: the complete car is visible. All wheels on screen. Nothing cropped.
- [ ] When scrolling down: the car smoothly drifts downward and slightly left. It feels like it is physically moving. No snap, no jump, no instant disappear.
- [ ] The hero background image stays fixed/pinned while the scroll animation plays — it does not scroll away.
- [ ] Hero headline and subtext fade out smoothly while scrolling — not instant.
- [ ] At NO point during scrolling is there a blank black or white gap between hero and about section.
- [ ] The about section slides up smoothly into view after the pin releases.
- [ ] The page-load car entrance animation still plays correctly on fresh load.
- [ ] Zero console errors. Zero GSAP conflict warnings.

---

## HARD CONSTRAINTS — do not touch these under any circumstances

- Background colour: #000000 — do not change
- Accent colour: #FF6A00 — do not change  
- Font: Bebas Neue — do not change
- All other sections (achievements, sponsors, contact, footer) — do not touch
- Do not add any new CDN links or script tags
- Do not convert this to React, Vue, or any framework
- This is a single index.html file — keep it that way

---

Take your time. Read fully first. Implement step by step. Verify in browser after each step. Do not move to the next step until the current one looks correct visually.