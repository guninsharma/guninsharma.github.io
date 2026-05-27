---
name: Technical Precision
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: '0'
  body-lg:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  mono-label:
    fontFamily: Geist Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1100px
  gutter: 16px
---

## Brand & Style
The design system is built for a technical portfolio that prioritizes clarity, efficiency, and professional restraint. It targets a developer and engineer audience, evoking an emotional response of competence and meticulous organization.

The design style is **Minimalist / Technical**. It avoids all decorative flourishes, relying on a strict geometric sans-serif aesthetic and a "functional-first" hierarchy. The interface mimics the density and precision of a code editor or a high-end technical dashboard, using whitespace and alignment rather than shadows or depth to create structure.

## Colors
The palette is monochromatic and functional. The light mode background is a sterile, clean `#fafafa`, ensuring a high-contrast environment for technical content. In dark mode, the background shifts to a deep charcoal `#111111`.

The primary color is reserved for text and structural lines. The secondary color is a muted indigo, used sparingly for status indicators or subtle interactive highlights. Surfaces are kept flat, utilizing subtle shifts in the neutral scale to differentiate sections without the need for borders or shadows.

## Typography
Typography is exclusively geometric and sans-serif using Geist. Headline sizes are intentionally reduced to maintain a modest, understated profile that doesn't overwhelm the content. 

Text is treated as data. Large headlines are capped at 24px to prevent a "marketing" feel. A monospaced variant is introduced for labels and technical metadata to reinforce the developer-centric narrative. All wordmarks and navigation items use sentence-case or lowercase; all-caps is strictly avoided.

## Layout & Spacing
The layout follows a tight, efficient vertical rhythm. Vertical spacing is reduced by approximately 25% compared to standard web patterns to achieve a high-density, "status-board" aesthetic.

The grid is a 12-column fixed system with a max-width of 1100px. Content is often organized into multi-column lists or dense grids that reflow into a single column on mobile. Margins and gutters are kept lean (16px) to maximize the utility of the available screen real estate.

## Elevation & Depth
This design system uses a strictly flat elevation model. There are no shadows, blurs, or neomorphic effects. Hierarchy is achieved through:
1. **Tonal Layers:** Using `#f5f5f5` (light) or `#1a1a1a` (dark) backgrounds to denote secondary containers.
2. **Minimal Borders:** 1px solid borders in a very low-contrast neutral (e.g., `#e5e5e5`) used only when absolutely necessary for structural separation.
3. **Flat Color Blocks:** Project thumbnails use solid color blocks with no depth, serving as a backdrop for high-contrast typography.

## Shapes
Shapes are disciplined and sharp. A "Soft" rounding (0.25rem) is applied to buttons and small UI elements to provide a hint of approachability, but the overall impression should remain architectural and precise. Containers and larger section backgrounds often use a `0` roundedness (sharp corners) to maintain a technical, modular look.

## Components
- **Buttons:** Flat, solid primary color with white/light text. No gradients. Small padding (8px 16px) and `label-md` typography.
- **Project Thumbnails:** Large solid-color background rectangles with `headline-md` text centered or bottom-aligned. No images unless strictly necessary; prefer text-based identifiers.
- **Status Pills:** Small, low-contrast background with a subtle accent color text. Used to indicate stack (e.g., "React", "TypeScript").
- **Lists:** Dense, row-based lists for experience and project archives. Uses `1px` top/bottom separators and `body-md` text.
- **Input Fields:** Minimalist design with only a bottom border or a very faint 4-side border. No focus shadows; use a color shift on the border.
- **Wordmark:** The user's name or initials in `headline-sm`, sentence-case, with tight letter spacing.
- **Footer:** A simple horizontal or vertical list of links (Email, GitHub, LinkedIn) using `body-md` styling, separated by small spacers or simple whitespace.