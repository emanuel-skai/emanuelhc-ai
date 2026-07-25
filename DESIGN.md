---
version: alpha
name: emanuelhc-design-system
description: Design language for emanuelhc.ai — Emanuel Hernández Castillo, co-founder & CTO of Skillful AI and AI systems architect. A true-black canvas with a single emerald accent family, technical monospace detailing, and sacred-geometry linework used as a framing motif. The brand reads as quietly powerful engineering — cinematic atmosphere at the edges, surgical calm where the message lives. Emerald is an event, not a wash.
colors:
  canvas: "#000000"
  canvas-soft: "#030303"
  surface-1: "#080808"
  surface-2: "#0f0f0f"
  surface-3: "#161616"
  ink: "#FAFAFA"
  ink-secondary: "#E5E5E5"
  ink-muted: "#8A8A8A"
  ink-subtle: "#666666"
  hairline: "rgba(255,255,255,0.06)"
  hairline-strong: "rgba(255,255,255,0.10)"
  hairline-bright: "rgba(255,255,255,0.15)"
  primary: "#10B981"
  primary-hover: "#34D399"
  primary-bright: "#6EE7B7"
  primary-deep: "#064E3B"
  primary-glow: "rgba(16,185,129,0.15)"
  primary-glow-strong: "rgba(16,185,129,0.25)"
  danger: "#EF4444"
  warning: "#F59E0B"

typography:
  display-xl:
    fontFamily: "Sora, -apple-system, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: -0.04em
  display-lg:
    fontFamily: "Sora, -apple-system, sans-serif"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.035em
  heading-md:
    fontFamily: "Sora, -apple-system, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.015em
  body-lg:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.18em
  micro-label:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: 10px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.2em
  button:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.0

rounded:
  sm: 10px
  md: 12px
  lg: 16px
  xl: 20px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section: "clamp(80px, 12vw, 140px)"

components:
  button-primary:
    background: "linear-gradient(135deg, #10B981 0%, #0D9668 100%)"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 14px 32px
    note: "Hover: -1px lift + soft emerald glow shadow. The main chromatic event on any screen."
  button-secondary:
    background: "rgba(255,255,255,0.03)"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline-strong}"
    rounded: "{rounded.md}"
    padding: 14px 32px
  card:
    background: "linear-gradient(180deg, #080808 0%, #030303 100%)"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.xl}"
    padding: 32px
    note: "Hover: brighter hairline, -2px lift, deep soft shadow. Never emerald-tinted at rest."
  chip:
    background: "rgba(255,255,255,0.02)"
    textColor: "{colors.ink-muted}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.sm}"
    padding: 10px 18px
  eyebrow-label:
    typography: "{typography.eyebrow}"
    textColor: "{colors.primary}"
    note: "Uppercase mono section marker preceded by a 28px emerald dash. Opens every section."
  status-dot:
    size: 8px
    color: "{colors.primary}"
    note: "Glowing pulse. Reserved for genuine live/available status only."

---

## Overview

Personal brand site of an AI systems architect (agentic AI in production, enterprise clients, LATAM/EU/US). The system is **true black + one emerald family + monospace detailing**. Depth comes from a surface ladder (#000 → #080808 → #0f0f0f → #161616) and hairlines, never from colored washes. The voice is confident, technical, unhyped.

## The motif: sacred geometry, disciplined

The brand mark is a 12-ellipse spirograph; the wider motif is sacred geometry (concentric rings, flower-of-life, fine interference linework) drawn as **thin luminous threads on black**.

Non-negotiable composition rules, learned the hard way:

- **Calm center.** Geometry frames the message from the edges and wings; it never tiles the full screen and never sits behind body text. Text zones live on near-black.
- **Dense but framed.** When linework appears, it should be finely woven and layered (interference density reads as premium) — but confined: wings, rings, cropped edges. A sparse floating line-art element reads cheap; a full-bleed pattern wall reads nauseating.
- **Light from within.** Luminosity comes from a soft glow tracing the geometry or a low horizon — layered falloffs, tonal ladder from deep sea-green (#064E3B) through emerald to near-white mint highlights. Never oversized blurred glow blobs.
- **Never figurative.** No faces, no bodies, no literal imagery built from particles.
- **Emerald < 10% of any viewport.** Reserved for: primary CTA, eyebrow labels, status dots, focus rings, rare accent nodes in linework, and the logo dot.

## Typography

Sora carries display (700, tight negative tracking, line-height ≈ 1.02). Inter carries body. **Geist Mono is a signature element**, not a fallback: eyebrows, micro-labels (PROBLEM / SOLUTION / OUTCOMES), timelines, metrics, and any real data render in mono uppercase with wide tracking. Type hierarchy does the heavy lifting on an otherwise dark, quiet canvas.

## Motion

- Scroll-reveal: fade + 20–30px rise, ~0.7s ease-out, staggered ~80–100ms. One system sitewide.
- One orchestrated moment per page maximum (e.g., a hero element drawing itself in on load). Everything else is hover micro-interaction scale.
- Film grain overlay at 2–4% opacity is welcome; it warms the black.
- `prefers-reduced-motion` always gets a complete, beautiful static state.
- No scroll-jacking, no pinning.

## Anti-patterns (hard bans)

- Full-screen pattern walls or effect-soup backgrounds
- Oversized blurred radial glow blobs as "background interest"
- Figurative particle art
- Sparse floating line diagrams as decoration
- Emerald-tinted icon boxes, emerald washes, rainbow or purple/cyan gradients
- Plain minimalism with no atmosphere at all — the brand needs its cinematic edge, held at the frame
