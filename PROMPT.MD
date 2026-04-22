Build a world-class, jaw-dropping website for THE CONRODS — SRM University's most legendary off-road racing team, now roaring back to life after a 4-year hiatus. This is not a college club page. This is a war cry in HTML.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONCEPT: "THE PIT WALL"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The entire website is a live race command centre. Visitors are engineers watching the race unfold in real time. Sponsorship tiers are mission-critical system statuses. Achievements are lap records. The team is a machine — and the machine has just been rebuilt. Every section uses the language and visual metaphors of off-road motorsport — tire tracks, rev counters, telemetry feeds, race flags, mud splatter, engine heat — but applied to The Conrods' identity and sponsorship pitch.
This is not a brochure. This is a live broadcast from the dirt.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL IDENTITY & AESTHETIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Color Palette:

Base: Deep matte black #0D0D0D
Primary accent: Burnt orange #E8590C (dominant — from The Conrods logo)
Secondary accent: Raw gold/amber #C9880A (for trophy moments, tier highlights)
Body text: Dusty white #F0EDE6
Danger/emphasis: Scarlet red #D42B2B (for "race on" moments, bold alerts)
Surface cards: #161616 (gunmetal dark)
Accent green: #2ECC71 (only for "GO GREEN" award moments)

Typography:

Headlines: Massive, aggressive condensed sans — Barlow Condensed Black or Bebas Neue — cinematic race-poster energy
UI / data: Clean technical sans — Inter or DM Sans — for telemetry and stats
Monospace: JetBrains Mono — for live feed, timestamps, race data
The visual tension between "RAW MOTORSPORT POSTER" and "PRECISION ENGINEERING DASHBOARD" IS the design

Texture:

Diagonal tire tread pattern as a subtle repeating overlay (SVG, 4% opacity) on hero and dark sections
Faint crosshair or grid reticle on background like an engineering drawing
Occasional red/orange light leak at section transitions — like a pit lane flare
Gritty, earned, mechanical. Zero polish. Maximum intent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMATIONS — THIS IS EVERYTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use GSAP + ScrollTrigger throughout. Every section must feel like the car just launched.

CURSOR: Custom cursor — a racing crosshair with a small orange circle. On hover over any CTA or card, it morphs into a checkered flag square with "SPONSOR" text rotating around it. Leaves a faint orange dust trail behind movement.
PAGE LOAD SEQUENCE (5 seconds):


Full black screen
A single rev gauge needle sweeps from 0 to redline — engine roar sound (optional, toggle off button)
Typewriter effect in JetBrains Mono:

SYSTEM BOOT — THE CONRODS v2025
SCANNING CHASSIS... OK
ENGINE STATUS: REBUILT FROM GROUND UP
TEAM SPIRIT: MAXIMUM
BAJA INDIA: LOCKED IN
SPONSORS NEEDED: CONFIRM?


Then a massive horizontal wipe — like a starting flag sweep — reveals the hero


HERO SECTION:


Giant stacked text: "THE" on line 1, "CONRODS" on line 2 — each letter animating in from the bottom with a hard slam + slight rotation. Staggered 60ms per letter.
Beneath it, a live scrolling ticker tape in orange monospace: "DIRT * GUTS * GLORY · BAJA SAE INDIA · SRM UNIVERSITY CHENNAI · NATIONAL CHAMPIONS 2012 · FMAE OVERALL CHAMPIONS 2019 · BACK FROM SILENCE · 2025–26 SEASON LIVE →"
Background: an animated ATV silhouette driving left-to-right across the viewport, kicking up an animated dust cloud (SVG particle burst) that fades
Subtle rev counter HUD element in top right corner — needle twitching as if idling


SCROLL ANIMATIONS:


Section entries: content slams upward with a spring bounce, as if the ATV just hit a ramp
Numbers always count up when scrolled into view — fast, like a lap timer
Section titles split into letters and crash in from alternating left/right
Dividers between sections animate as a racing flag wave


ABOUT SECTION — "THE MACHINE":


Left: Animated technical blueprint/wireframe of an ATV — SVG line-drawing that traces itself on scroll-entry
Right: Text block with team backstory — appears line by line as if typed on a race radio
Three animated stat pills count up: 15+ YEARS LEGACY · 10+ NATIONAL TROPHIES · 30+ MEMBER TEAM


ACHIEVEMENTS — "LAP RECORDS":


Horizontal scrolling timeline — like a race track viewed from above
Each year (2009, 2011, 2012, 2015, 2016, 2017, 2019) is a checkpoint flag marker
Click/hover a marker: it expands into a card with that year's results
2012: "NATIONAL CHAMPIONS" — card pulses with a gold shimmer
2019: "FMAE OVERALL CHAMPIONS · 1st Rock Climb · 1st Endurance" — card has a full green accent
Cards slide in from below with a spring animation, one by one as you scroll the timeline


ABOUT BAJA — "THE RACE":


Two-column split — left side: large animated text "BAJA" fills the column
Right side: three rotating fact cards (auto-carousel): "Conceptualize → Design → Build → Test → Race" / "FMAE & SAEINDIA certified" / "One of the world's toughest collegiate engineering events"
Background for this section: faint animated topographic map lines, scrolling slowly


SPONSORSHIP — "FUEL THE MACHINE":


Section headline: "YOUR BRAND. OUR DIRT. THEIR EYES." — slams in word by word
Four glowing sponsor tier cards, staggered entrance:
[DOMINAR — ₹1,50,000] gold glow, animated border pulse
[THROTTLE — ₹75,000] orange glow
[VELOCITY — ₹50,000] amber glow
[DRIFT — ₹30,000] white/grey glow
Each card on hover: lifts, shows full benefits checklist with animated checkmarks appearing one by one


SPONSORS WALL — "THOSE WHO FUELED US":


Current sponsors (ANSYS, SolidWorks, OnlyScrews) displayed in large lit-up badge style
Previous sponsors in a slower, faded horizontal scroll marquee below — like a wall of fame at a racetrack
Section title: "THE ONES WHO BELIEVED"


CONTACT — "JOIN THE PIT CREW":


Headline: "READY TO FUEL THE MACHINE?"
Contact cards for Y Harsha Vardan (Captain), Adhree Pradeep Nair (Secretary), Shreyas B (Corporate Director)
CTA button: "BECOME A SPONSOR →" with a tire-spin loading animation on click

━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTIONS IN ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━

LOAD SCREEN — Rev gauge boot sequence
HERO — "THE CONRODS" + ticker tape + ATV dust animation
ABOUT — "The Machine" — blueprint ATV + team backstory + 3 stats
ABOUT BAJA — "The Race" — what BAJA is + rotating facts
ACHIEVEMENTS — "Lap Records" — horizontal timeline 2009–2019
VISION — Fresh rebuild, youth leadership, what we seek in partners
SPONSORSHIP — "Fuel The Machine" — 4 tier cards + benefits
SPONSORS WALL — Current + past sponsors
CONTACT — "Join The Pit Crew" — 3 contact cards + CTA
FOOTER — Ticker tape loop + "THE CONRODS © 2025–26 · SRM UNIVERSITY · DIRT * GUTS * GLORY"

━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT — USE EXACTLY
━━━━━━━━━━━━━━━━━━━━━━━━━━
TEAM NAME: The Conrods
TAGLINE: Dirt * Guts * Glory
INSTITUTION: SRM Institute of Science & Technology, Chennai
COMPETITION: BAJA SAE India (FMAE & SAEINDIA)
INSTAGRAM: @THE_CONRODS
EMAIL: conrods2025@gmail.com
CONTACTS:

Y Harsha Vardan | Captain | +91 95001 35699 | yhv2006@gmail.com
Adhree Pradeep Nair | Secretary | +91 9043137135 | adhree@gmail.com
Shreyas B | Corporate Director | +91 8148117150 | shreyas.baiju.2006@gmail.com

ACHIEVEMENTS:
2009 — 3rd best cost report · 4th best manufacturing
2011 — Lightest dynamic vehicle · GO GREEN Award
2012 — OVERALL NATIONAL CHAMPIONS · 2nd Safe Vehicle · 2nd Manoeuvrability
2015 — 1st Manoeuvrability · GO GREEN Award · 1st Overall Dynamics · 3rd cost report · 9th overall BAJA SAE India · 30th Auburn International
2016 — 3rd BAJA SAE Overall · 5th Design
2017 — Enduro Student India · 3rd cost and design
2019 — FMAE OVERALL CHAMPIONS · 1st Design & CAE · 1st Acceleration · 1st Rock Climb · 1st Endurance
CURRENT SPONSORS: ANSYS · SolidWorks · OnlyScrews
PREVIOUS SPONSORS: Bharat Petroleum · Vega · State Bank of Mysore · Pankaj · LPS · ThinkDigital · Continental · Magod Laser · Veedol · IPETRONIK · CQC Alumni · Bellatrix Aerospace · Delta Gear · Aquila Mobitech · ProCAE · Lincoln Electric · KKMSoft · CADD Centre · Levi's · Scolarian Racing
SPONSORSHIP TIERS:

DOMINAR ₹1,50,000: Logo on car + T-shirt + banners + driver suit · Social media post + exclusive collab reel · Custom car colour scheme · Maximum reach package
THROTTLE ₹75,000: Logo on car + T-shirt + banners · Social post + collab reel · Strong motorsport visibility
VELOCITY ₹50,000: Logo on car + T-shirt · Social post · No collab reel, no banner
DRIFT ₹30,000: Logo on car only · Basic social shoutout · Entry-level association

━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNICAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━

Fully responsive — mobile-first
GSAP + ScrollTrigger for all scroll animations
GPU-accelerated transforms only (transform, opacity — no layout thrashing)
Smooth scroll via Lenis
Thin orange loading bar at top of viewport
Dark mode only — no toggle needed
Custom cursor (desktop only)
No stock photos — SVG illustrations, dot patterns, ATV wireframes, generative track visuals
Page meta: Title "THE CONRODS — Dirt * Guts * Glory" | Theme color #E8590C

Make this feel like the team rebuilt their car and their entire identity at the same time. Gritty. Earned. Mechanical. Every pixel has fought through mud to get there.