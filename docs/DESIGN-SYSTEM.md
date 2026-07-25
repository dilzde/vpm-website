# VPM International Design System: "Final Definitive Blended Palette"

> **Direction name: "Warm Blended Editorial."** A rich, confident, editorial church site — generous parchment whitespace, structural deep navy bands, glowing warm gold primary accents, terracotta detail tags, and a high-drama charcoal & plum mood band for Live Media and Radio.

---

## 🎨 1. Blended Color Palette

```css
/* Base neutrals — warm parchment */
--color-cream:       #F7F1E6;   /* primary page background — warm parchment */
--color-white:       #FFFFFF;   /* card surfaces only */
--color-ink:         #191410;   /* near-black warm ink — body headings */

/* Deep tones */
--color-navy-900:    #101B2D;   /* deep navy — full-bleed structural bands, nav bar, footer */
--color-navy-700:    #1D2B45;   /* secondary navy surface */
--color-charcoal-950:#15110F;   /* near-black warm charcoal — Live & Radio high-drama band */

/* Warm accent family */
--color-gold-500:    #D9A441;   /* primary warm accent — buttons, highlight-blocks, active states */
--color-gold-700:    #B8822A;   /* hover/pressed gold state */
--color-terracotta:  #A8532E;   /* secondary warm accent — small tags, date badges */
--color-plum:        #4A2E4F;   /* used ONLY inside Live & Radio charcoal band */

/* Functional */
--color-line:        #E4DAC5;   /* hairline borders on cream/white */
--color-line-dark:   rgba(255,255,255,0.14);
--color-slate:       #6B5E4E;   /* body copy on cream/white */
--color-live:        #E24C4C;   /* live status badge */
```

### Color Blending Rules
- **Page Background:** `var(--color-cream)` (`#F7F1E6`), not stark white or cool blue.
- **Nav & Footer:** `var(--color-navy-900)` deep navy with gold accents.
- **Live & Radio Band:** `var(--color-charcoal-950)` with `var(--color-plum)` gradient and gold player CTA.
- **Detail Accents:** `var(--color-terracotta)` on date badges and small category pills.

---

## ✒️ 2. Typography

- **Display / Heading Font:** `Fraunces` via `next/font/google` (variable font, opsz axis).
  - Weight `600`: Bold serif word emphasis in headline pairing.
  - Weight `400`: Regular serif companion word in same headline.
- **Body / UI Font:** `Inter` (weights 400 / 500 / 600).
