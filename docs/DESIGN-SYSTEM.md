# DESIGN SYSTEM IMPLEMENTATION GUIDE — "WARM KINETIC" — VPM INTERNATIONAL
**Supersedes all prior color/theme direction in this project.** This document replaces `docs/DESIGN-SYSTEM.md` in the repo — overwrite it with (or fully incorporate) the contents below. This is now the single source of truth for visual design across **every page in the repo**, not just the homepage.

**This is a living document.** As more reference images/mockups are provided in future sessions, this file should be updated/extended in place (new component patterns appended, new page translations added) rather than replaced with a disconnected new file. Antigravity should treat edits to this doc as part of its normal workflow when new visual direction is given.

---

## 0. CRITICAL RULE — WHAT THE REFERENCE MOCKUPS ARE FOR, AND WHAT THEY ARE NOT FOR

Four reference mockups were provided (Homepage, About, Media, Branches). **They define visual structure, spacing, component patterns, and layout rhythm only.** They do **not** define real content. Specifically:

- **Do not port any fictional data from the mockups into the live site**: invented statistics ("29+ years," "500+ Global Branches," "50k+ Members," "120 cities worldwide"), invented branch locations ("Nairobi Main Cathedral," "London City Hub," "Manhattan Fellowship," "Gauteng Regional Center," "VPM Middle East Hub"), invented leadership names/headshots ("Prophet Samuel V.," "Rev. Grace M.," "Pastor David K.," "Elder John S."), or invented testimonials ("Sister Mary O.," "Brother John D."). These are mockup placeholder content only.
- **Real content stays real**: the actual VPM branches, actual leadership (if/when the ministry supplies names — do not invent placeholder people), and actual verified statistics only — per the open-questions list already established earlier in this project (branch list accuracy, years-of-ministry figure, etc.). Where the mockup shows a content *type* the real site doesn't have yet (e.g. a Leadership grid, a Community Feed of member posts), build the **component and layout** so it's ready, but populate it with the real illustrated-placeholder system (no invented people/photos/quotes) until the ministry provides real data via the Admin Panel.
- **Branch data source of truth**: the branch list, names, addresses, phone numbers, and hours are the **original real data supplied earlier in this project** (from the old site: Kisumu Headquarters, Nairobi Branch, Kisumu Branch, Juja Branch, Siaya Branch, Machakos Branch — cleaned up per the earlier remediation pass). Do **not** substitute the mockup's invented branches (Nairobi Main Cathedral, London City Hub, Manhattan Fellowship, Gauteng Regional Center, VPM Middle East Hub) — those were mockup placeholder content only, confirmed not to be used.
- **Branches map — final decision (confirmed):** no embedded/live map component anywhere on `/branches` or the homepage preview, superseding the mockup's map section entirely. Instead, each `Branch` record carries `lat`/`lng` coordinates (already part of the schema defined earlier in this project), and clicking a branch card — or a small "View on Map" / pin-icon element on the card — opens Google Maps in a new tab, built as a direct coordinate link: `https://www.google.com/maps?q={lat},{lng}` (fall back to an address-text search link `https://maps.google.com/?q={encoded address}` only if a branch record has no lat/lng set yet). This replaces the earlier looser instruction to just link off the address text — coordinates are the preferred, more accurate link source now that the schema supports them.

---

## 1. VISUAL FOUNDATION & ART DIRECTION

Modern, high-contrast, kinetic aesthetic (Woodside Bible Church-inspired, per earlier reference analysis in this project — this guide is the fuller evolution of that direction). Core principles:
- **Dynamic asymmetry** — overlapping images and content blocks for depth and movement, not flat stacked rows.
- **Intentional whitespace** — generous breathing room; premium feel over dense packing.
- **Bold, sparing accent** — one vibrant color used **exclusively** for high-priority CTAs and small highlights, never as a large background fill behind body content.

## 2. THEME TOKENS — FOUR MOODS, ONE BASELINE

Four tonal variants share the same component structure. **Implement "Warm Kinetic" as the site-wide baseline theme.** The other three are documented here for reference/future use (e.g. a possible dark-mode toggle, or a future rebrand ask) but are **not** built as active alternate themes in this pass unless separately instructed.

| Theme | Background strategy | Primary surface | Mood |
|---|---|---|---|
| **Warm Kinetic** (baseline — build this) | Warm off-white | `#F8FAF3` | Welcoming, organic, soft |
| Ethereal Slate (reference only) | Light gray wash | `#F7F9FB` | Airy, contemporary, open |
| Kinetic Slate (reference only) | Mid-tone slate | `#081425` | Approachable, professional, balanced |
| Lumina Faith (reference only) | Deep navy/dark | `#111415` | Bold, stable, high-impact |

### Warm Kinetic tokens (implement exactly)
```css
--color-surface:        #F8FAF3;   /* primary page background — warm off-white */
--color-surface-alt:    #F1F4EA;   /* alt section background, subtle step up from surface */
--color-white:          #FFFFFF;   /* card surfaces */
--color-ink:            #1A1F16;   /* primary text — dark slate/olive, not pure black */
--color-slate:          #5C6357;   /* body copy, warm-toned gray */
--color-line:           #E2E6D9;   /* hairline borders */
--color-accent:         #D1FF26;   /* vibrant lime — CTAs, active links, highlights ONLY */
--color-accent-ink:     #1A1F16;   /* text color when placed ON the lime accent (dark, for contrast) */
--color-anchor-olive:   #4B5320;   /* deep olive-green — full-bleed "Anchor" band background (Support/Donation section) — NOT the lime itself, a deep tonal olive that lime pops against */
--color-live:           #E24C4C;   /* live badge only */
--radius-eight:         8px;       /* ROUND_EIGHT — standard card/element radius, used everywhere for family consistency */
--radius-image:         12px;      /* R12 — hero/large image corners */
--radius-block:         48px;      /* R48 — large anchor-band container radius (the big rounded rect donation/support blocks) */
--shadow-xl:            0 20px 50px -12px rgba(26,31,22,0.18);  /* SHADOW-XL — used only on floating hero imagery and floating badges, never on flat cards */
--shadow-card:          0 1px 2px rgba(26,31,22,0.06);          /* minimal — most cards use --color-line border instead of shadow */
```

## 3. TYPOGRAPHY

- **Font family:** Hanken Grotesk (primary) with Montserrat as an acceptable alternate/fallback for headline weight if Hanken Grotesk's available weights don't cover a needed style. Load via `next/font/google`.
- **Headlines:** large, bold, tight letter-tracking (`tracking-tight`) — e.g. `text-headline-lg` / `text-headline-md` scale steps. Headlines command attention through size and weight, not color.
- **Body copy:** same font family, regular weight, generous line-height (1.6–1.7) for readability.
- **Accent/eyebrow labels:** all-caps, wide letter-tracking (`tracking-widest`), small size (11–12px), used above section headings and for small categorical tags — this is the "ARCHIVE & RESOURCES" / "GLOBAL NETWORK" / "SINCE 1994" style label seen throughout the mockups.
- Suggested scale (rem): 0.75 (eyebrow) / 0.9375 (body-sm) / 1 (body) / 1.125 / 1.5 / 2 / 2.75 / 3.5 (hero headline).

## 4. THE BLUEPRINT — EXACT STRUCTURAL SPEC FROM IMAGE 1

Image 1 (the annotated Homepage mockup) is the literal structural blueprint — every other page adapts this same system in its own way, but the measurements and grid logic below are exact and apply site-wide, not just to the homepage.

- **Nav bar height:** 72px (`H: 72PX`).
- **Grid:** 12-column grid, 24px gutter (`GUTTER: 24PX (12-COL)`).
- **Section spacing rule ("1.5x rule"):** the gap *between* two sections is 120px (`1.5X SPACING RULE: 120PX SECTION GAP`) — and per the earlier design-language spec in this project, this is 1.5× the gap used *between elements within* a section (so intra-section gaps run ~80px, inter-section gaps run 120px). This ratio is what creates clear scroll hierarchy — always maintain the 1.5× relationship, don't use arbitrary values.
- **Section header spacing:** 48px between an eyebrow/heading block and the content below it (`48PX HEADER SPACING`).
- **Card radius:** 8px, `ROUND_EIGHT`, applied to every card/small container site-wide for family consistency.
- **Hero image container:** 12px radius, `SHADOW-XL` elevation (`R12 / SHADOW-XL`) — this is one of the only elements allowed a strong shadow, since it's meant to visually float/lift off the page.
- **Floating badge pattern:** a small white pill/card (e.g. "24/7 Radio · Global Broadcast") positioned so it overlaps the top-left or bottom-left corner of the hero image — half on the image, half on the background — this is the "floating asset" signature detail called out explicitly in the design language: it must overlap, not sit neatly beside the image.
- **Anchor band radius:** 48px (`R48 RADIUS BLOCK`) — used specifically for the large full-bleed "Support the Mission" / donation-style band, which is NOT actually full-viewport-width bleed in this system — it's a large rounded-rect block inset within the page container, in the deep olive tone, with the lime CTA popping against it.
- **Primary CTA:** solid deep-olive/dark pill button with white text + arrow icon (e.g. "Primary CTA →").
- **Secondary CTA:** outline pill button, transparent fill, dark border/text (e.g. "Watch Trailer").
- **Nav CTA differentiation:** the "Give" button in the nav is solid lime, pill-shaped, clearly set apart from the rest of the (text-link-style) nav items — matches the earlier nav-bar spec already established in this project, now with the lime accent instead of gold.
- **Nav utility item:** a small "Live Radio" indicator/link in the nav bar itself (icon + label, e.g. a small radio-wave icon), separate from the Give button — direct continuity with the earlier requirement that radio be playable/accessible from anywhere on the site via the nav.

## 5. SECTION ARRANGEMENT LOGIC — THE VERTICAL RHYTHM (apply to every page)

Every page follows this rhythm: high-density sections are always preceded and followed by low-density "heroic" sections, so the eye gets rest between complexity.

1. **The Entry (Hero)** — split layout, bold heading + eyebrow label on one side, a large floating image with `SHADOW-XL` and a `RADIUS-IMAGE` corner on the other, which visually breaks the grid by slightly overlapping into the section below it. A floating badge overlaps one corner of the image.
2. **The Transition (Feature Grid)** — small, clean icon-topped cards (`ROUND_EIGHT`, hairline border or minimal shadow) that "reset" the eye after the large hero image. 3–4 cards, consistent height.
3. **The Anchor (Impact/Support Section)** — a large rounded block (`RADIUS-BLOCK`, 48px) in the deep olive tone, full visual break from the surrounding off-white, containing a short bold statement + one or two CTAs (solid lime primary, outline secondary).
4. **The Context (Detail/Complexity Section)** — the densest section on the page: multi-column grids of detailed information (branch lists, document lists, community feed, leadership grid, etc.), placed toward the bottom of the page once the visual rhythm above has already established hierarchy and the user is ready for detail.
5. **Footer** — multi-column, consistent with the rest of the system (not a separate dark theme unless the page calls for it).

Every individual page (`/about`, `/media`, `/branches`, and all others) restates this same Entry → Transition → Anchor → Context rhythm in its own way, per the mockups:
- **About** = Entry (voice-of-prophetic hero) → Transition (Vision/Foundation cards, one of which is filled solid-lime as a highlighted "featured" card) → a secondary editorial "story" block (journey narrative + verified stats, once confirmed — see §0) → Context (Leadership grid — placeholder people until real ones supplied, per §0) → Anchor (Global Presence band) → closing CTA row.
- **Media** = Entry (Archive/search header, not a big photo hero — a utility-style entry since this page is about *finding* things) → Transition/Context blended (large featured video card + Live Radio widget side-by-side) → Context (feature-type grid: Video/Audio/Publications/Testimonies) → Context (Recent Documents list + Community Feed — **Community Feed must use real member-submitted content via the Admin Panel only, never invented posts/names**, per §0).
- **Branches** = Entry (Our Local Branches hero, search bar) → featured branch card (large photo + status/hours) paired with a secondary branch highlight card → **no map component** — a clean 3-column branch card grid instead (real branch data per §0), each card's pin icon/"View on Map" element linking out to Google Maps via the branch's stored coordinates → Anchor (Can't-find-a-branch / online campus CTA band, olive + lime).

## 6. BLENDING TECHNIQUES BETWEEN SECTIONS (apply everywhere, not just at page transitions already listed)

- **Backdrop blur:** the nav bar uses `backdrop-blur-md` over a semi-transparent background, so section colors scrolling underneath it show through softly — implement as a sticky nav with `bg-surface/80 backdrop-blur-md` (Tailwind arbitrary or equivalent).
- **Consistent roundness:** every container — card, image, button, anchor band — pulls its radius from the same small token set (`--radius-eight`, `--radius-image`, `--radius-block`). Never introduce a one-off radius value; this repetition is what makes visually different sections feel like one family.
- **The 1.5× whitespace rule:** restated from §4 — inter-section gap is always 1.5× the intra-section element gap. Encode both as actual spacing tokens (e.g. `--space-section: 120px`, `--space-element: 80px`) rather than leaving it to per-component judgment.
- **Visual bridge shapes:** small geometric dot-patterns or thin lines at the very top/bottom edge of a section, used sparingly (the mockups show this subtly, e.g. faint dot texture near a hero) — optional per section, not mandatory everywhere, and never busy/dense (this project has previously and explicitly rejected "dotted background clutter" — keep any dot/line bridge extremely subtle, low-opacity, small area only).

## 7. SHARED COMPONENTS — EXACT SPEC

- **Top navigation:** sticky, `backdrop-blur-md`, 72px height, logo left, text nav links center-right (underline active-state indicator), "Live Radio" utility item + solid-lime pill "Give" button grouped at the far right, clearly set apart from the plain text links.
- **Cards:** `ROUND_EIGHT` (8px) radius, white or `--color-surface-alt` background, hairline `--color-line` border OR minimal `--shadow-card` — not both stacked on the same card, pick one per card type and stay consistent.
- **CTAs:** pill-shaped (`rounded-full`), high-saturation lime for primary actions, hover state scales up slightly (`hover:scale-105`) with a smooth transition — this hover-scale behavior applies to all pill CTAs site-wide.
- **Floating badges:** small white rounded-rect chips that overlap hero/feature imagery corners, `--shadow-xl`, containing an icon + two-line text (bold label + small subtext) — reusable pattern, not homepage-exclusive (e.g. usable on About's hero photo, Branches' featured branch photo).
- **Feature icon cards:** icon in a small soft-tinted square/circle, bold title, one short line of body copy, small text-link with arrow ("Learn More →") — icon color uses `--color-ink` or a muted tone, never the lime accent as an icon fill (lime stays reserved for actionable elements only, per §8).
- **Anchor band:** large `RADIUS-BLOCK` (48px) rounded container, `--color-anchor-olive` background, white text, primary lime CTA + secondary outline CTA side-by-side or stacked.

## 8. COLOR DISTRIBUTION RULE (do not violate)

The lime accent (`--color-accent`) is **never** used as a background fill behind text-heavy sections. It is reserved strictly for: buttons, active nav-link indicators, small icon highlights, and thin accent underlines/highlights on key words in a headline. This is what keeps "Warm Kinetic" feeling warm and organic rather than loud — the lime should feel rare and purposeful every time it appears, not decorative wallpaper.

## 9. PAGE-BY-PAGE TRANSLATION NOTES (beyond the rhythm already given in §5)

- **Home:** implement literally per Image 1's blueprint annotations (§4) — this is the reference page, closest to 1:1.
- **About:** the Vision/Foundation feature row includes one **solid-lime-filled card** among otherwise white cards (per Image 2) — this is an intentional single-card emphasis technique (draw the eye to one item in a row by giving it the accent fill instead of white) — reusable elsewhere sparingly (e.g. could highlight one Branch, one Value, or one Media category the same way), but never more than one card per row done this way, or it stops reading as emphasis.
- **Media:** the "Media Vault" entry is a utility hero (search bar + filter button) rather than a photo hero — correctly different from Home's photo hero because the page's job is finding content, not welcoming — keep this distinction; do not force a big photo hero onto a utility-first page. The Live Radio widget appearing again here (in a compact list-style card rather than the big Entry-band player from the homepage) shows the same underlying player/audio state can be represented differently per context — reuse the same global player logic, different visual treatment per page.
- **Branches:** per §0, no live map — otherwise adopt the featured-branch-plus-grid layout, search bar in the entry, and the olive Anchor band for the "online campus" CTA. Each card links out to Google Maps via its stored lat/lng coordinates, not an embedded map view.

## 10. CARRY FORWARD FROM EARLIER PASSES (still required, now re-skinned to this system)

- Real logo, real About/Branches/Contact ministry data (not mockup placeholders — §0).
- In-place YouTube video playback + the `YOUTUBE_API_KEY` env-var bug fix + `channels.list`/`playlistItems.list` efficient pattern + live-check against both channels.
- Zeno.fm radio stream wired to a global player, accessible from the nav bar utility item and from a fuller player treatment on `/radio`.
- No Booking/Services/Special-Services/prophecy content from the old site.
- No real/stock internet human photography or invented people — illustrated placeholders (recolored to Warm Kinetic tones) until real assets are supplied via Admin Panel.
- Every page in the repo restyled to this system — not just Home.
- Mobile QA at 375/390/768px.
