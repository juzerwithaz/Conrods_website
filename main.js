// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// CUSTOM CURSOR
const cursor = document.querySelector('.custom-cursor');
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    const hoverElements = document.querySelectorAll('button, a, .tier-card, .timeline-marker');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// BOOT SEQUENCE (Page Load Animation)
const bootSequence = () => {
    // Top loading bar
    gsap.to("#top-loading-bar", {
        width: "100%",
        duration: 4,
        ease: "power1.inOut"
    });

    // Rev gauge needle animation
    gsap.to(".gauge-needle", {
        rotation: 90,
        duration: 3,
        ease: "power4.in",
        onComplete: () => {
            // Jitter at redline
            gsap.to(".gauge-needle", {
                rotation: "random(85, 95)",
                duration: 0.05,
                repeat: 20,
                yoyo: true
            });
        }
    });

    // Typewriter effect
    const bootLines = [
        "SYSTEM BOOT — THE CONRODS v2025",
        "SCANNING CHASSIS... OK",
        "ENGINE STATUS: REBUILT FROM GROUND UP",
        "TEAM SPIRIT: MAXIMUM",
        "BAJA INDIA: LOCKED IN",
        "SPONSORS NEEDED: CONFIRM?"
    ];
    
    let currentText = "";
    let lineIndex = 0;
    const bootTextEl = document.getElementById("boot-text");
    
    const typeLine = () => {
        if (lineIndex < bootLines.length) {
            currentText += bootLines[lineIndex] + "\n";
            bootTextEl.innerText = currentText;
            lineIndex++;
            setTimeout(typeLine, 500);
        }
    };
    setTimeout(typeLine, 500);

    // Final Wipe and Reveal
    const tl = gsap.timeline({delay: 4.5});
    tl.to(".wipe-overlay", {
        x: "0%",
        duration: 0.5,
        ease: "power4.inOut"
    })
    .set("#loader", {display: "none"})
    .to(".wipe-overlay", {
        x: "100%",
        duration: 0.5,
        ease: "power4.inOut"
    })
    .fromTo(".hero-title span", 
        {y: 100, rotation: 10, opacity: 0}, 
        {y: 0, rotation: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "back.out(1.7)"},
        "-=0.2"
    )
    .fromTo(".atv-animation-container",
        {x: -200},
        {x: window.innerWidth, duration: 3, ease: "power1.inOut"},
        "-=0.5"
    );
};

window.addEventListener("load", bootSequence);

// TICKER ANIMATIONS
gsap.to(".ticker-content", {
    xPercent: -50,
    ease: "none",
    duration: 15,
    repeat: -1
});

// SCROLL ANIMATIONS

// 1. Sections entry bounce
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)"
    });
});

// 2. Number counting
gsap.utils.toArray('.stat-num').forEach(num => {
    const target = parseInt(num.getAttribute('data-target'));
    ScrollTrigger.create({
        trigger: num,
        start: "top 85%",
        onEnter: () => {
            gsap.to(num, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        },
        once: true
    });
});

// 3. Blueprint draw
gsap.from(".blueprint-line", {
    scrollTrigger: {
        trigger: ".wireframe-container",
        start: "top 70%",
    },
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
    duration: 3,
    ease: "power2.out"
});

// 4. BAJA Rotating Facts
const facts = document.querySelectorAll('.fact-card');
let currentFact = 0;
setInterval(() => {
    facts[currentFact].classList.remove('active');
    currentFact = (currentFact + 1) % facts.length;
    facts[currentFact].classList.add('active');
}, 3000);

// 5. Sponsorship Tiers Stagger
gsap.from(".tier-card", {
    scrollTrigger: {
        trigger: ".sponsor-tiers",
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.2)"
});

// 6. Sponsors Marquee
gsap.to(".previous-sponsors-marquee .marquee-content", {
    xPercent: -100,
    ease: "none",
    duration: 40,
    repeat: -1
});

// CTA Button loader
document.getElementById('sponsor-cta').addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('loading');
    setTimeout(() => {
        window.location.href = "mailto:conrods2025@gmail.com";
        this.classList.remove('loading');
    }, 1500);
});
