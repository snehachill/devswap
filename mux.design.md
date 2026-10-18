---
version: alpha
name: Mux
website: "https://www.mux.com"
description: >-
  An inspired interpretation of Mux's design language — a video-API developer platform whose surface is a warm cream `#e2e4dd` canvas paired with an unexpected amber CTA (`#ffb200`) and a secondary brand green (`#1be349`), framed by 28px ultra-rounded cards and 9999px pill geometry, with display set in the wide-mouth grotesque Rotonto, body in Aeonik, and every section eyebrow in uppercase JetBrainsMono — a developer-platform that refuses the genre's default black-and-blue palette.

seo:
  title: "Mux Design System for React — Amber #ffb200, Rotonto, and 18+ components"
  metaDescription: "Mux's video-platform design language as a DESIGN.md file. Amber #ffb200, Rotonto display, Aeonik body, JetBrainsMono eyebrows, 18+ components. For React and AI tools."
  highlights:
    - "Amber as primary voltage — `#ffb200` paints the only Get started pill, never softened to a blue or a black"
    - "Two ultra-large radii — 28px for every card and 9999px for every CTA pill, with nothing between them"
    - "Three-typeface contract — Rotonto for display, Aeonik for body, JetBrainsMono uppercase for eyebrows"
    - "Cream canvas over white — `#e2e4dd` is the warm body tone, white is reserved for cards and the nav"
    - "Green as the second voice — `#1be349` carries dashboard accents, demo affordances, and the footer Talk-to-sales pill"
  tags:
    - "Web Infrastructure & Hosting"
    - "Developer Tools & IDEs"
  lastUpdated: "2026-05-13"
  author:
    name: "Dov Azencot"
    url: "https://x.com/dovazencot"
  opening: |
    Mux's marketing surface is the dashboard of a video-API developer platform, written for engineers who already build players and care what a 99th-percentile rebuffer rate looks like. The brand sits on a warm cream canvas (`#e2e4dd`) rather than the developer-genre default of pure-white-on-near-black — and breaks that calm with an amber Get-started pill (`#ffb200`) where most infra brands would default to a blue, an ink-black, or a saturated indigo. A secondary brand green (`#1be349`) handles dashboard accents and the footer Talk-to-sales CTA. Everywhere else — code panels, dark transcript surfaces, the customer-love testimonial band — the page drops to a near-black `#242628` ink layer. The decoration is the contrast: warm canvas, dark technical card, amber pill.

    This DESIGN.md packages the system into a single machine-readable file. Inside: 19 color tokens (cream canvas, amber primary, green secondary, near-black surface, four-step gray ladder), 14 typography styles across Rotonto display, Aeonik body, and JetBrainsMono mono, 5 corner radii (with the `28px` card radius doing most of the lifting and `9999px` reserved for pills), 9 spacing values built on a `14px / 28px / 56px` rhythm, and 18 components from `nav-bar` to `hero-band` to the polarity-flipped `dark-feature-card`. The format follows the Google Labs DESIGN.md spec — colors, typography, rounded, spacing, components, all token-referenced.

    Feed the file to Claude, Cursor, or Copilot when you need a React component that reads as a video-developer brand rather than as a generic shadcn theme. The agent picks up the moves — amber single-voltage CTAs, cream canvas, 28px card chrome, JetBrainsMono uppercase eyebrows above Rotonto display, Aeonik body with a tracked `0.32px` letter-spacing. Reference the tokens directly in Tailwind config, or audit existing UI against them. The system rewards study because of what it refuses: there is no blue primary, no second display weight beyond Rotonto's working `400`, and no card radius between `28px` and `9999px` — the brand commits to a wide-corner geometry and never blinks.
  related:
    - href: "/design"
      title: "Browse all design systems"
      description: "The full directory of DESIGN.md files on shadcn.io, with live mockups for each."
    - href: "https://www.mux.com"
      title: "Mux — official site"
      description: "Video API for developers — streaming, analytics, captions, and AI-ready video infrastructure."
    - href: "https://github.com/google-labs-code/design.md"
      title: "The DESIGN.md specification"
      description: "Google Labs' open spec for machine-readable design system files."
  questions:
    - id: "primary-color"
      title: "What is Mux's primary brand color?"
      answer: "Mux's primary brand voltage is amber `#ffb200` — the Get-started pill in the hero, the Start-building-for-free pill in the conversion band, and the small `Try Mux Data` chip near the footer. It is rare on the page (12 background fills, 70 text/border uses, total frequency 152) but it carries every primary CTA. The secondary voltage is a saturated brand green `#1be349` used for dashboard accents and the Talk-to-sales footer pill. Black `#000000` carries text; the cream `#e2e4dd` carries the canvas."
    - id: "typography"
      title: "What typography does Mux use, and what should I substitute if Rotonto is unavailable?"
      answer: "Display sets in Rotonto at weight 400 (the hero `Video for developers` headline lands at 66px / 75.9px line-height / 1.32px tracking). Body sets in Aeonik at weight 400 with a positive `0.32px` letter-spacing — paragraphs, links, button labels, nav. Section eyebrows and code labels set in JetBrainsMono 14px uppercase. The three faces never blend roles. If Rotonto is unavailable, `Söhne Breit` or `Editorial New` at weight 400 are the closest wide-mouth grotesque substitutes; `Inter` plus `font-feature-settings: 'ss01'` for Aeonik; `JetBrains Mono` open-source is exact for the mono."
    - id: "radii"
      title: "Why does Mux only use two card radii?"
      answer: "Mux runs an aggressive two-pole radius system. Every card, surface, transcript panel, code editor, and pricing block uses `28px` (the dominant value with 40 occurrences in the extracted CSS). Every CTA, every chip, every social-icon button, every Mux-Robots demo control uses `9999px`, a full pill (17 occurrences). The marketing surface deliberately avoids the `8px–16px` mid-range that most fintech and infra brands default to. Nothing about a Mux card is supposed to read as a square — the chrome itself is the voice."
    - id: "cream-canvas"
      title: "Why is Mux's background cream instead of white?"
      answer: "The cream `#e2e4dd` (18 background fills) and the slightly bluer `#d0d2c8` (5 background fills) act as the page's warm body tone — white `#ffffff` is reserved for cards floating on the cream. The result is a four-step ladder: cream body, white card, dark `#242628` technical surface, ink-black `#000000` text. Where most developer infra defaults to pure-white-on-near-black, Mux runs warm-cream-on-near-black. The cream tone gives the orange CTA somewhere to land without screaming."
    - id: "elevation"
      title: "How does Mux handle elevation?"
      answer: "There are no captured drop shadows on the page — no `box-shadow` tokens fire on either the cards or the pills. Cards earn elevation through surface contrast alone: a white card lifts off the cream canvas via the `#e2e4dd` → `#ffffff` color step; a dark `#242628` panel reads as an inset technical layer by inverting polarity. The 28px radius does the rest. This is shadow-as-absence — the spec for using it is to commit to flat surfaces and let the cream / white / dark trio carry the depth that shadows usually carry."
    - id: "use-in-project"
      title: "Can I use this DESIGN.md to build my own React project?"
      answer: "Yes — the file is structured for direct ingestion by Claude, Cursor, or any AI tool that reads token-based design specs. Feed it as context and the agent reproduces Mux's moves rather than inventing a generic shadcn theme: cream canvas instead of pure white, amber single-voltage CTA, 28px card chrome, 9999px pill geometry, three-typeface contract with JetBrainsMono uppercase eyebrows. Every color hex, typography size, radius, and spacing value is a quoted token you can paste straight into Tailwind config or CSS variables."

colors:
  primary: "#ffb200"
  primary-deep: "#ff6100"
  primary-fg: "#000000"
  accent-green: "#1be349"
  accent-green-deep: "#00be43"
  accent-pink: "#fa50b5"
  accent-blue: "#0091ff"
  focus-ring: "#0482ff"
  canvas: "#e2e4dd"
  canvas-warm: "#d0d2c8"
  surface: "#ffffff"
  surface-dark: "#242628"
  surface-deep: "#14141e"
  ink: "#000000"
  ink-muted: "#565e67"
  ink-soft: "#828c97"
  hairline: "#adb9c6"
  hairline-soft: "#d5dbe2"
  amber-border: "#bd8209"

typography:
  display-xl:
    fontFamily: "Rotonto, Helvetica, sans-serif"
    fontSize: 66px
    fontWeight: 400
    lineHeight: 75.9px
    letterSpacing: 1.32px
  display-lg:
    fontFamily: "Rotonto, Helvetica, sans-serif"
    fontSize: 50px
    fontWeight: 400
    lineHeight: 60px
    letterSpacing: 1px
  heading-md:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 27.6px
    letterSpacing: 0px
  heading-sm:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 21px
    fontWeight: 700
    lineHeight: 24.15px
    letterSpacing: 0px
  lead:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 27px
    letterSpacing: 0.36px
  body-md:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0.32px
  body-md-strong:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0.32px
  body-sm:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: 0.28px
  link-nav:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0px
  button-md:
    fontFamily: "Aeonik, Helvetica, sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 0.32px
  eyebrow-mono:
    fontFamily: "JetBrainsMono, monaco, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 16.8px
    letterSpacing: 0px
    textTransform: "uppercase"
  code-md:
    fontFamily: "JetBrainsMono, monaco, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22.4px
    letterSpacing: 0px
  label-mono:
    fontFamily: "JetBrainsMono, monaco, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: 0px
    textTransform: "uppercase"
  caption-mono:
    fontFamily: "JetBrainsMono, monaco, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 19.5px
    letterSpacing: 0px

rounded:
  none: "0px"
  xs: "2px"
  sm: "7px"
  md: "14px"
  card: "28px"
  hero: "112px"
  full: "9999px"

spacing:
  xxs: "3.5px"
  xs: "7px"
  sm: "14px"
  md: "28px"
  lg: "32px"
  xl: "42px"
  2xl: "56px"
  3xl: "64px"
  hero: "112px"

components:
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.link-nav}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.md}"
    height: "64px"
  nav-link:
    textColor: "{colors.ink}"
    borderColor: "{colors.ink-soft}"
    typography: "{typography.body-md}"
    padding: "{spacing.md}"
    height: "43px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-fg}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.md}"
    height: "44px"
    border: "0"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.primary-fg}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.md}"
    border: "0"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.md}"
    height: "44px"
  button-green:
    backgroundColor: "{colors.accent-green}"
    textColor: "{colors.primary-fg}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.md}"
    border: "0"
  chip-mono:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.eyebrow-mono}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.sm}"
  text-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.md}"
    height: "44px"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: "{spacing.hero} {spacing.md}"
  feature-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.2xl} {spacing.md} {spacing.md}"
  dark-feature-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.2xl} {spacing.md} {spacing.md}"
  code-panel:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.surface}"
    typography: "{typography.code-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  pricing-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.xl} {spacing.md}"
  logo-strip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow-mono}"
    rounded: "{rounded.card}"
    padding: "{spacing.md}"
  eyebrow-label:
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow-mono}"
    padding: "0"
  cta-band:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.surface}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.card}"
    padding: "{spacing.md} {spacing.2xl}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.body-sm}"
    padding: "{spacing.3xl} {spacing.md}"
  testimonial-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.xl} {spacing.md}"
---

## Overview

Mux's marketing surface is the dashboard of a video-API developer platform, written for engineers who measure success in rebuffer-rate percentiles. It earns that posture without using the developer-genre's default chrome: instead of pure white on near-black with a blue primary, the page sits on a warm cream `{colors.canvas}` (`#e2e4dd`), floats white `{colors.surface}` (`#ffffff`) cards on top, drops to a near-black `{colors.surface-dark}` (`#242628`) for code panels and the testimonial band, and breaks the calm with an amber Get-started pill `{colors.primary}` (`#ffb200`). The brand-secondary is a saturated green `{colors.accent-green}` (`#1be349`) that carries dashboard markers and the footer Talk-to-sales CTA. Black `{colors.ink}` (`#000000`) carries every paragraph and headline.

**Amber-as-voltage**: where most developer infrastructure brands fall back on a saturated blue or an ink-black primary, Mux paints its single conversion CTA in `{colors.primary}` (`#ffb200`) — the same hue you'd find on a cassette label or a Sony Walkman power LED. The amber appears in only ~12 background fills on a 2647-element page; scarcity is the design move. Unlike the convention of using brand color as the dominant text and surface tone, Mux holds amber for the moment the reader is meant to click, and only that moment.

Type is a three-way contract. Rotonto carries display at weight `400` with positive `1.32px` tracking — a wide-mouth grotesque that gives the hero "Video for developers" headline its retro-broadcast feel. Aeonik carries body, navigation, buttons, and links at weight `400` with a deliberately positive `0.32px` letter-spacing (every paragraph runs slightly looser than CSS default — the brand's voice). JetBrainsMono uppercase carries every eyebrow, every chip label, every code snippet. The three faces never blend roles: you do not set body in Rotonto, you do not set a heading in mono, you do not set a button in Rotonto.

**Two-pole radius geometry**: the page commits to a `{rounded.card}` `28px` card radius (40 occurrences in extracted CSS) and a `{rounded.full}` `9999px` pill for every button, chip, and nav-bar container (17 occurrences) — and refuses everything between. There is no `8px` button, no `12px` card. The chrome itself is the brand, and the brand picks wide corners on cards and full corners on pills.

**Key Characteristics:**
- A single amber primary CTA `{colors.primary}` (`#ffb200`) carries every conversion target, paired with a white-outline `button-secondary` for the watch-the-demo action. The brand uses a `9999px` pill shape across every button context — marketing, nav, in-card.
- A green secondary voltage `{colors.accent-green}` (`#1be349`) carries the footer "Looking for standalone Mux Data?" CTA, analytics-card accents, and dashboard markers. Reserved — never a primary fill.
- A cream `{colors.canvas}` (`#e2e4dd`) body canvas instead of pure white. White `{colors.surface}` (`#ffffff`) is reserved for cards floating on the cream.
- Every section eyebrow ("DEPLOY", "TRUSTED BY TOP BRANDS", "EXPLORE OUR APIs") sets in JetBrainsMono `{typography.eyebrow-mono}` uppercase — a small technical signature above the wide-mouth Rotonto display.
- Flat-only elevation. There are no captured drop shadows; cards earn lift through the cream → white → dark `#242628` polarity ladder, not through blur.

## Colors

### Brand & Accent
- **Amber** (`{colors.primary}` — `#ffb200`) — frequency 152. Used as text (70), border (70), background (12). The single conversion voltage — `Get started` pill, `Start building for free` pill, the `Try Mux Data` chip. Reserved for primary CTAs.
- **Burnt Orange** (`{colors.primary-deep}` — `#ff6100`) — frequency 106. Used as text (51), border (51), background (4). The pressed / hover state of the amber pill, and a few inline link emphases.
- **Brand Green** (`{colors.accent-green}` — `#1be349`) — frequency 4. Used as text (1), bg (2), border (1). The secondary voltage — `Talk to sales` footer pill and analytics-chart accent dots. Layered as `brand` in the extraction.
- **Deep Green** (`{colors.accent-green-deep}` — `#00be43`) — frequency 2. Background-only. The pressed state of the green pill.
- **Pink** (`{colors.accent-pink}` — `#fa50b5`) — frequency 4. Used as text (2), border (2). Rare diagnostic color — appears in code-highlight tokens only.
- **Blue Link** (`{colors.accent-blue}` — `#0091ff`) — frequency 8. Used as text (4), border (4). Inline-link blue, scoped to body copy.

### Surface
- **Cream Canvas** (`{colors.canvas}` — `#e2e4dd`) — frequency 20. Used as bg (18), text (1), border (1). The warm page body — every marketing band sits on this tone.
- **Warm Stone** (`{colors.canvas-warm}` — `#d0d2c8`) — frequency 14. Used as bg (5), border (8), text (1). A slightly bluer-cream used for inset bands inside the cream canvas and as light-mode card chrome.
- **Pure White** (`{colors.surface}` — `#ffffff`) — frequency 1149. Used as text (593), border (528), bg (28). The card / dialog / input surface. White is the card tone, not the page tone.
- **Dark Surface** (`{colors.surface-dark}` — `#242628`) — frequency 50. Used as bg (46), gradient (4). The polarity-flipped technical surface — code panels, the Mux Robots demo card, the testimonial band, the conversion CTA band.
- **Deepest** (`{colors.surface-deep}` — `#14141e`) — frequency 1. Background-only. The ultra-dark variant for the very-final footer.

### Text
- **Ink** (`{colors.ink}` — `#000000`) — frequency 712. Used as text (364), border (319), bg (14). Every body paragraph and headline on light surfaces, and the footer background fill. Not gray-tinted — pure `#000000`.
- **Ink Muted** (`{colors.ink-muted}` — `#565e67`) — frequency 30. Used as border (19), bg (6), text (5). The mid-tone for secondary captions and divider strokes inside cards.
- **Ink Soft** (`{colors.ink-soft}` — `#828c97`) — frequency 93. Used as border (77), text (12), bg (4). The default nav-link separator color and the lowest-priority caption tone.

### Hairlines
- **Hairline** (`{colors.hairline}` — `#adb9c6`) — frequency 264. Used as text (133), border (131). The default 1px divider across nav, cards, inputs, logo strip. Carries border duty more than fill duty.
- **Hairline Soft** (`{colors.hairline-soft}` — `#d5dbe2`) — frequency 2. Border-only. A softer variant used inside dropdown menus.

### Semantic
- **Focus Ring** (`{colors.focus-ring}` — `#0482ff`) — frequency 2. Layered as `brand` via `--tw-ring-color`. The Tailwind ring color — every focused input picks this up.
- **Amber Border** (`{colors.amber-border}` — `#bd8209`) — frequency 15. Border-only. The pressed-state border on the amber pill — a darker pull from the same hue family.

## Typography

### Font Family
Three faces carry the entire system, with no overlap of role:

1. **Rotonto** — display, used at weight `400` only. The wide-mouth grotesque headline face. Renders the hero "Video for developers" at `66px / 75.9px / 1.32px tracking` and section headlines at `50px / 60px / 1px tracking`. Positive tracking is part of the voice — every display line is set looser than CSS default.
2. **Aeonik** — body, navigation, button labels, link text. Weight `400` for body and `700` for emphasis only. Body sets at `16px / 24px` with a deliberate positive `0.32px` letter-spacing.
3. **JetBrainsMono** — every eyebrow label, every code snippet, every chip caption. Weight `400` only. Uppercase for eyebrows and chip labels at `14px`; mixed-case for body code at `14px / 22.4px`.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 66px | 400 | 75.9px | 1.32px | Hero headline ("Video for developers"). Rotonto. |
| `{typography.display-lg}` | 50px | 400 | 60px | 1px | Section headlines ("The video infrastructure for…"). Rotonto. |
| `{typography.heading-md}` | 24px | 700 | 27.6px | 0px | Card-cluster headlines ("Mux Robots", "We speak your language"). Aeonik. |
| `{typography.heading-sm}` | 21px | 700 | 24.15px | 0px | Sub-card headings inside feature clusters. Aeonik. |
| `{typography.lead}` | 18px | 400 | 27px | 0.36px | Lead paragraphs under section headlines. Aeonik. |
| `{typography.body-md}` | 16px | 400 | 24px | 0.32px | Default body paragraph. Aeonik. |
| `{typography.body-md-strong}` | 16px | 700 | 24px | 0.32px | Bolded inline body and button labels. Aeonik. |
| `{typography.body-sm}` | 14px | 400 | 21px | 0.28px | Secondary captions and footer body. Aeonik. |
| `{typography.link-nav}` | 16px | 400 | 32px | 0px | Nav-link text and tabbed-row link rows. Aeonik. |
| `{typography.button-md}` | 16px | 700 | 24px | 0.32px | Pill-button labels (Get started, Talk to sales). Aeonik. |
| `{typography.eyebrow-mono}` | 14px | 400 | 16.8px | 0px (uppercase) | Section eyebrows and chip labels. JetBrainsMono. |
| `{typography.code-md}` | 14px | 400 | 22.4px | 0px | Inline code and code-panel body. JetBrainsMono. |
| `{typography.label-mono}` | 14px | 400 | 21px | 0px (uppercase) | Chip labels inside the dark Mux Robots demo. JetBrainsMono. |
| `{typography.caption-mono}` | 13px | 400 | 19.5px | 0px | Smallest mono caption — code-block footers and metadata pills. |

### Principles
- **Positive tracking is the voice.** Body sets at `+0.32px`, lead at `+0.36px`, hero display at `+1.32px`. The brand never tracks negative. Stripping the positive letter-spacing breaks the brand.
- **Three faces, three roles, no blending.** Rotonto never appears in body. Aeonik never appears in code. JetBrainsMono never appears in display.
- **Uppercase is exclusively for mono.** Every uppercase block on the page sets in JetBrainsMono — Aeonik never uppercases, Rotonto never uppercases. Where most brands let display uppercase for impact, Mux holds uppercase as a technical-label signal.
- **Display weight ceiling is 400.** Rotonto never appears at 600 or 700 on the page. The wide-mouth letterforms carry the impact on their own.

### Note on Font Substitutes
The two display + body faces are proprietary. Open-source substitutes:
- **Wide-mouth grotesque (Rotonto)** — `Editorial New` at weight `400` is the closest in spirit; `Söhne Breit` works if licensed; `Cabinet Grotesk` at weight `400` is a passable second.
- **Geometric sans (Aeonik)** — `Inter` at weight `400` / `700` with `font-feature-settings: 'ss01'` and `letter-spacing: 0.02em`. `General Sans` is the next-best option.
- **Monospace** — `JetBrains Mono` open-source is the exact face. `IBM Plex Mono` works as a second.

## Layout

### Spacing System
- **Base unit**: `14px`. The brand's rhythm is `14 / 28 / 56 / 112` — every captured spacing value is a multiple of `14` (it is not a `4px` or `8px` system). The hero band uses `112px` vertical padding.
- **Tokens**: `{spacing.xxs}` `3.5px` · `{spacing.xs}` `7px` · `{spacing.sm}` `14px` · `{spacing.md}` `28px` · `{spacing.lg}` `32px` · `{spacing.xl}` `42px` · `{spacing.2xl}` `56px` · `{spacing.3xl}` `64px` · `{spacing.hero}` `112px`.
- **Section padding**: marketing bands use `{spacing.2xl}` `56px` top/bottom inside cards (`56px 28px 28px` is the most common card-padding signature, 7 occurrences). Hero band stretches to `{spacing.hero}` `112px`.
- **Card interior padding**: `{spacing.md}` `28px` is the dominant horizontal padding (94 occurrences); `{spacing.sm}` `14px` is the inline gap (69 occurrences).
- **Inline gap**: button rows and chip rows sit at `{spacing.sm}` `14px` between siblings.

### Grid & Container
- **Max width**: ~1408px (`1440px` viewport minus the cream gutter). Content centers with `{spacing.md}` `28px` horizontal gutters on desktop.
- **Column patterns**:
  - Two-column feature row: `feature-card` left + dark `dark-feature-card` right ("Unlock the data" + "Mux Video" cluster).
  - Logo strip: 6-cell row of monochrome customer logos inside a single `{rounded.card}` `28px` white pill.
  - Code-cluster row: dark Mux Robots demo card (left, narrow) + dark "Caption translation / Ask questions" cards (right, paired).
  - Footer: 4-column nav with column eyebrow labels in `{typography.eyebrow-mono}`.

### Whitespace Philosophy
The cream canvas itself supplies decoration; whitespace separates the cards. Section spacing is generous — `{spacing.2xl}` `56px` between bands lets the cream breathe between white cards. Inside a card, headline / body stack is tight (`{spacing.xs}` `7px` gap), then a wider gap before the CTA pill. The page reads as engineered — large gaps between cards + tight interior, never the reverse.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No shadow, no border. | The cream canvas itself, the hero band, and the footer. |
| Level 1 — Polarity Contrast | No shadow — uses surface step from `{colors.canvas}` `#e2e4dd` to `{colors.surface}` `#ffffff`. | The default card chrome (`feature-card`, `pricing-card`, `logo-strip`). |
| Level 2 — Dark Inset | No shadow — uses surface step from `{colors.canvas}` `#e2e4dd` to `{colors.surface-dark}` `#242628`. | The technical-band chrome (`dark-feature-card`, `code-panel`, `cta-band`). |
| Level 3 — Footer Sink | No shadow — uses surface step from `{colors.canvas}` `#e2e4dd` to `{colors.ink}` `#000000`. | The final-footer band and `testimonial-band`. |

**Shadow-as-absence**: there are no `box-shadow` declarations captured on Mux's marketing surface. Cards earn elevation purely through the cream → white → dark `#242628` → black polarity ladder. Where most developer-infra brands stack 2–3 small offsets to fake material depth, Mux refuses the technique entirely. The 28px radius and the surface contrast carry the lift. This is a deliberate constraint — adopting Mux's chrome means committing to flat surfaces.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | `0px` | Full-bleed bands (hero, footer). |
| `{rounded.xs}` | `2px` | Tightest radius — applied to inline mono chips inside code snippets. |
| `{rounded.sm}` | `7px` | A single one-off — the `Mux Robots` demo's progress-rail container. |
| `{rounded.md}` | `14px` | Mid-scale chrome — inner code-block frames and chart containers inside `feature-card`. |
| `{rounded.card}` | `28px` | The dominant card radius — every white card, every dark surface, every logo-strip wrapper (40 occurrences). |
| `{rounded.hero}` | `112px` | Reserved for the hero-band corner softening (17 occurrences) — the cream block's giant rounded corners. |
| `{rounded.full}` | `9999px` | Every pill button, every chip, every social-icon container, the top-nav wrapper, the conversion-CTA pill (17 occurrences). |

### Photography Geometry
- **Hero illustration**: cream-on-cream small astronaut graphic, no frame, set above the headline.
- **Customer logos**: monochrome `{colors.ink}` SVGs at consistent height inside a single white `{rounded.card}` `28px` pill (the `logo-strip` component).
- **Dashboard mockups**: cropped UI screenshots inside `{rounded.card}` `28px` frames, paired with a dark `{colors.surface-dark}` `#242628` polarity-flipped neighbor.
- **Mux Robots demo card**: dark `#242628` card with a pixel-art `Mux Video` graphic, paired controls in `{rounded.full}` pills.

## Components

### Buttons & Chips

**`button-primary`** — the canonical amber pill.
- Background `{colors.primary}` (`#ffb200`), text `{colors.primary-fg}` (`#000000`), label set in `{typography.button-md}`, padding `{spacing.sm} {spacing.md}` (`14px 28px`), shape `{rounded.full}`, height `44px`. The single conversion target on every band.

**`button-primary-hover`** — the pressed state.
- Background `{colors.primary-deep}` (`#ff6100`), text `{colors.primary-fg}` (`#000000`), otherwise identical to `button-primary`.

**`button-secondary`** — the watch-the-demo white pill.
- Background `{colors.surface}` (`#ffffff`), text `{colors.ink}` (`#000000`), 1px border `{colors.hairline}` (`#adb9c6`), label `{typography.button-md}`, shape `{rounded.full}`.

**`button-green`** — the footer `Talk to sales` and Mux Data CTA.
- Background `{colors.accent-green}` (`#1be349`), text `{colors.primary-fg}` (`#000000`), label `{typography.button-md}`, shape `{rounded.full}`. The brand-secondary voltage — reserved for sales / data-product surfaces.

**`chip-mono`** — the small uppercase eyebrow chip.
- Background `{colors.surface}` (`#ffffff`), text `{colors.ink}` (`#000000`), border `{colors.hairline}` (`#adb9c6`), body set in `{typography.eyebrow-mono}` (JetBrainsMono uppercase), padding `{spacing.xs} {spacing.sm}`, shape `{rounded.full}`. Labels demo states ("INPUT", "OUTPUT", "DEPLOY").

### Inputs

**`text-input`** — the canonical text input.
- Background `{colors.surface}` (`#ffffff`), text `{colors.ink}` (`#000000`), border `{colors.hairline}` (`#adb9c6`), body in `{typography.body-md}`, padding `{spacing.xs} {spacing.md}` (`7px 28px`), shape `{rounded.full}`, height `44px`. Focus ring uses `{colors.focus-ring}` (`#0482ff`).

### Navigation

**`nav-bar`** — the sticky top nav.
- Background `{colors.surface}` (`#ffffff`), text `{colors.ink}` (`#000000`), `{typography.link-nav}`, padding `{spacing.sm} {spacing.md}`, height `64px`. The entire nav row sits inside a `{rounded.full}` `9999px` pill — the nav itself is a giant pill.

**`nav-link`** — the centered link row inside the nav-bar pill.
- Text `{colors.ink}` (`#000000`), border `{colors.ink-soft}` (`#828c97`), `{typography.body-md}`, padding `{spacing.md}` (`28px`), height `43px`. No hover background — links stay flat against the white nav fill.

### Cards & Surfaces

**`feature-card`** — the canonical white card.
- Background `{colors.surface}` (`#ffffff`), text `{colors.ink}` (`#000000`), padding `{spacing.2xl} {spacing.md} {spacing.md}` (`56px 28px 28px` — the dominant card-padding signature), shape `{rounded.card}` `28px`. Hosts the "Unlock the data in your video" / "Understand video analytics" cards.

**`dark-feature-card`** — the polarity-flipped technical card.
- Background `{colors.surface-dark}` (`#242628`), text `{colors.surface}` (`#ffffff`), padding `{spacing.2xl} {spacing.md} {spacing.md}`, shape `{rounded.card}` `28px`. Hosts the Mux-Robots demo, the Transcript block, the Caption Translation card.

**`code-panel`** — the dark code-preview surface.
- Background `{colors.surface-dark}` (`#242628`), text `{colors.surface}` (`#ffffff`), body in `{typography.code-md}` (JetBrainsMono `14px`), padding `{spacing.md}`, shape `{rounded.card}` `28px`.

**`pricing-card`** — the pricing-tier card on the standalone pricing band.
- Background `{colors.surface}` (`#ffffff`), text `{colors.ink}` (`#000000`), padding `{spacing.xl} {spacing.md}`, shape `{rounded.card}` `28px`. Inside: amount in `{typography.heading-md}`, included list in `{typography.body-md}` rows.

**`logo-strip`** — the customer-logo row inside a single white pill.
- Background `{colors.surface}` (`#ffffff`), text `{colors.ink}` (`#000000`), `{typography.eyebrow-mono}` for the "TRUSTED BY TOP BRANDS" eyebrow, padding `{spacing.md}`, shape `{rounded.card}` `28px`.

### Signature Bands

**`hero-band`** — the cream hero.
- Background `{colors.canvas}` (`#e2e4dd`), text `{colors.ink}` (`#000000`), padding `{spacing.hero} {spacing.md}` (`112px 28px`). Inside: small mono eyebrow chip above, hero display headline `{typography.display-xl}` ("Video for developers"), then the lead paragraph in `{typography.lead}`, then the `button-primary` + `button-secondary` row.

**`cta-band`** — the dark conversion band near the footer.
- Background `{colors.surface-dark}` (`#242628`), text `{colors.surface}` (`#ffffff`), display set in `{typography.display-lg}` ("Start building for free"), padding `{spacing.md} {spacing.2xl}`, shape `{rounded.card}` `28px`. Contains a centered amber `button-primary` pill.

**`testimonial-band`** — the black "Mux love from around the world" band.
- Background `{colors.ink}` (`#000000`), text `{colors.surface}` (`#ffffff`), padding `{spacing.xl} {spacing.md}`, shape `{rounded.card}` `28px`. Hosts ~4 testimonial quote cards in a flex row.

**`footer`** — the bottom 4-column nav.
- Background `{colors.ink}` (`#000000`), text `{colors.surface}` (`#ffffff`), padding `{spacing.3xl} {spacing.md}` (`64px 28px`). Column eyebrows in `{typography.eyebrow-mono}` (uppercase mono); link rows in `{typography.body-sm}`.

**`eyebrow-label`** — the inline uppercase mono label above headlines.
- Text `{colors.ink}` (`#000000`), `{typography.eyebrow-mono}`. Renders "DEPLOY", "INTEGRATIONS", "EXPLORE OUR APIs" above each section's `display-lg` headline.

## Do's and Don'ts

### Do
- **Hold amber for the click moment.** Use `{colors.primary}` (`#ffb200`) only on the single primary CTA per band — never as a fill on a card surface, never as a text color in body copy. Frequency 12 background fills across the entire page is the discipline.
- **Set the canvas in cream, not white.** Page-body bands sit on `{colors.canvas}` (`#e2e4dd`); white `{colors.surface}` (`#ffffff`) is reserved for cards that float on the cream.
- **Commit to two radii.** Cards at `{rounded.card}` `28px`, pills at `{rounded.full}` `9999px`. Nothing between unless you're matching a single Mux-Robots progress-rail one-off at `{rounded.sm}` `7px`.
- **Set every eyebrow in JetBrainsMono uppercase.** Section headers prepend a `{typography.eyebrow-mono}` label — "DEPLOY", "INTEGRATIONS", "TRUSTED BY TOP BRANDS". Aeonik never uppercases.
- **Track Aeonik positive.** Body at `+0.32px`, lead at `+0.36px`. Stripping the positive letter-spacing is the single fastest way to lose the brand voice.

### Don't
- **Don't use `{colors.primary}` (`#ffb200`) on a card background.** Amber is the CTA voltage; using it as a fill makes the card read as a banner ad. Use `{colors.surface}` (`#ffffff`) for cards on the cream canvas, or `{colors.surface-dark}` (`#242628`) for polarity-flipped panels.
- **Don't pick a card radius between `14px` and `28px`.** The dominant radius is `{rounded.card}` `28px` (40 occurrences). A `16px` or `20px` card breaks the chrome — the brand commits to wide corners and never compromises.
- **Don't stack drop shadows.** The page has zero captured `box-shadow` declarations. Adding a 2px-blur drop at 10% black opacity to a card breaks the flat-surface contract — Mux relies on the cream / white / dark polarity ladder for lift.
- **Don't blend typefaces across roles.** Rotonto never sets a body paragraph; Aeonik never sets an eyebrow; JetBrainsMono never sets a display headline. The three-face contract is the loudest part of the system.
- **Don't paint the green `{colors.accent-green}` (`#1be349`) as a primary CTA fill.** Green is reserved for the Mux-Data and Talk-to-sales surfaces (frequency 4 across the page). Promoting it to a marketing primary breaks the amber's single-voltage discipline.
- **Don't track Rotonto negative.** Display tracks `+1.32px` at the hero. Negative tracking on a wide-mouth grotesque collapses the letterforms into each other.

## Known Gaps

- **Hover states:** the amber `button-primary` darkens to `{colors.primary-deep}` (`#ff6100`) on press, but the exact transition timing and easing are not captured. The captured page renders only the static state.
- **Focus rings:** form inputs pick up `{colors.focus-ring}` (`#0482ff`) via Tailwind's `--tw-ring-color`, but ring width and offset are not directly captured.
- **Dark-mode tokens:** Mux serves a single light-mode marketing surface — no `prefers-color-scheme: dark` palette is captured. The `{colors.surface-dark}` (`#242628`) panels are not the dark-mode page; they are inset technical surfaces inside the light page.
- **Dashboard / in-product chrome:** this DESIGN.md covers the public marketing page. The Mux dashboard's denser inner surfaces — analytics tables, asset lists, live-stream monitors — likely use the same `{colors.surface-dark}` (`#242628`) vocabulary but with tighter spacing values not captured here.
- **Motion:** the Mux Robots demo and Caption Translation cards loop a short video on hover; motion tokens (duration, easing curves) are not captured.
