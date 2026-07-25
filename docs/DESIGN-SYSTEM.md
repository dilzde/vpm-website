# VPM International Design System — "Navy Editorial Ministry"

This document establishes the official visual identity, spatial architecture, and interaction discipline for VPM International (`vpm-web`). All frontend components and page layouts must strictly adhere to the guidelines set forth below.

---

## 1. Architectural Foundation: Alternating Full-Bleed Bands
Instead of relying on a flat, single background color or repetitive floating cards on gray backgrounds, the primary structural rhythm of the VPM website is built upon **alternating full-bleed horizontal bands**:
- **Deep Navy Bands** (`bg-[var(--color-navy-900)]`, `#0A1128` or `#101F42`): Used for foundational anchoring elements including the Header, Hero section, Live/Now broadcast strips, dedicated donation/support bands, featured media embeds, and Footer.
- **Bright White & Clean Light Bands** (`bg-white`, `bg-[var(--color-mist)]` `#F8FAFC`): Used for high-readability content sections such as sermon grids, branch directories, and detailed ministry copy.

---

## 2. Color Palette & Accent Discipline
To maintain an elevated, modern editorial aesthetic that remains warm, trustworthy, and appropriate for an international ministry and media broadcast organization:
- **Primary Anchors**: Deep Navy (`--color-navy-900: #0A1128`, `--color-navy-800: #142340`, `--color-navy-700: #1E335E`) and Pure White (`#FFFFFF`).
- **Single Warm Accent Color**: Warm Amber / Gold (`--color-accent: #D97706`, `--color-accent-hover: #F59E0B`, `--color-accent-light: #FEF3C7`).
- **Strict Accent Rule**: The Warm Amber accent color must **NEVER** be scattered decoratively or used as generic backgrounds for text blocks or random headings. It is strictly reserved for:
  1. Primary actionable CTA buttons (e.g., "Give", "Watch Live").
  2. The signature headline highlight-block treatment (solid block behind a key phrase).
  3. Underlines on active tabs in tabbed sub-navigation.
  4. Concise, high-priority status indicators (e.g., streaming status badges).

---

## 3. Typography Discipline
- **Display Typography (`Outfit` Sans-Serif)**: Respecting the standing rule of *no serif heading treatments*, all hero headlines, major section headings, and impactful statements utilize **Outfit** — a characterful, modern, and commanding sans-serif typeface.
- **Body & Functional Typography (`Inter`)**: All editorial paragraphs, descriptive text, metadata, and form inputs utilize **Inter** to ensure optimal legibility across all viewport sizes.

---

## 4. Signature Layout Devices
1. **Headline Highlight-Block Treatment**: For impactful hero headings, use a bold two-line structure where the second key phrase sits inside a solid Warm Amber accent highlight box with crisp white text. This creates an ownable, recognizable brand signature.
2. **Staggered & Overlapping Photo Collages**: In visual sections such as About, Events, and Branches, group imagery into asymmetric, staggered multi-card collages with slight offset positioning rather than plain side-by-side grids. Use VPM's illustrated placeholder components until authentic ministry photography is provided. Never substitute stock internet photography.
3. **Dedicated Support Band**: The "Support the Mission" section is rendered as a standalone, full-bleed dark navy band with centered editorial copy and a single prominent Warm Amber accent button. It is never compressed into an ordinary carousel card.
4. **Tab-Style Sub-Navigation**: Used primarily on the `/media` hub to seamlessly switch between general broadcasts, Asriel TV (Channel A), and auxiliary media streams (Channel B) using clear typography with a solid Warm Amber bottom underline indicating the active tab.
5. **Asymmetric Bento Grids**: For mixed content like sermons and media exhibits, utilize structured bento-box layouts where featured broadcasts command a large primary cell while recent archive videos populate well-proportioned secondary grid cells.
