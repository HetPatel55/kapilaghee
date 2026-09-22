# Kapila Dairy Farm — Design System

Status: v2 — full public-site redesign.
Last updated: 2026-09-22

The source of truth for values is `src/app/globals.css` (`@theme` block). This document explains the intent behind them.

## 1. Design Direction

**Target feeling:** Modern Indian heritage + premium dairy — warm, calm, trustworthy, and specific to Kapila rather than a generic food template.

**Brand pillars the design is built around** (confirmed by the business):
1. **Pure — nothing added.** No additives, no preservatives.
2. **The Bilona method.** Curd hand-churned in a wooden bilona, then slow-heated.
3. **Proof, not promises.** FSSAI license and independent lab results, published with real figures.

**What we keep from the existing identity:** the maroon / label-yellow / cream palette, the geometric KAPILA wordmark, and the Gir cow.

**What we deliberately do not copy from the promotional graphics:** distressed display fonts, dense claim badges, photo collages with text baked in, and — importantly — the therapeutic claims printed on them ("improves immunity", "healing of wounds", etc.). Those need substantiation under FSSAI advertising rules and are never used on the site.

---

## 2. Color Tokens

```
--color-maroon        #861A14   primary brand colour — wordmark, headings, primary buttons
--color-maroon-dark   #5C100C   hover/pressed, announcement bar
--color-kapila-gold   #F2C23D   label yellow — accents on dark surfaces, the seal, highlights
--color-warm-gold     #C0831A   honey — eyebrow labels, small accents on light surfaces
--color-cream         #FBF6EC   default page background ("paper")
--color-sand          #F3E8D2   secondary panels, arches, image backgrounds
--color-dark-brown    #21150F   dark sections (lab results) and footer
--color-cocoa         #2E1E16   raised cards on dark sections
--color-ink           #23150F   body text
--color-muted         #6C5D50   secondary text
--color-border        #E4D4B8   hairlines
--color-success       #3F6F35   check marks, "Pass" chips, form success
--color-error         #B3261E   form errors
--color-whatsapp      #1F8F4E   the floating WhatsApp button only
```

**Rules**
- Cream, not white, is the default background; sections alternate cream → sand → white → dark to create rhythm without heavy decoration.
- Gold is an accent. `kapila-gold` is only used as text on dark backgrounds (it fails contrast on cream); on light backgrounds use `warm-gold`, and only for small uppercase labels.
- WhatsApp green is reserved for the floating chat button so it reads instantly as "WhatsApp"; every other WhatsApp action uses brand maroon with the WhatsApp icon.

---

## 3. Typography

```
--font-heading: Fraunces (variable, optical sizing)   headings, large figures, pull quotes
--font-body:    DM Sans                                body, UI, labels
```

- Fraunces gives warmth and heritage without the formality of a classic didone; its italic is used for one emphasised phrase per heading at most ("Made from curd, *churned by hand*").
- DM Sans is geometric, echoing the KAPILA wordmark.
- The KAPILA wordmark is an SVG (`src/components/shared/Logo.tsx`) redrawn from `images/KAPILALOGO.pdf` — never typeset in a web font.
- Eyebrow labels: 11px, uppercase, 0.28em tracking, preceded by a short rule.

## 4. Layout, Shape & Motion

- Content width 1240px with 20px (mobile) / 32px (desktop) gutters.
- Section rhythm: 64px mobile → 80px tablet → 96px desktop vertical padding.
- Shape language: large soft radii (24–32px) on cards and images, pill-shaped buttons, and the **arch** (`rounded-t-full`) — echoing jharokha/temple doorways — behind hero products and illustrations.
- Motion: a gentle rise-in on page load, and scroll-reveals implemented with pure CSS scroll-driven animations (no JavaScript; browsers without support simply show the content). All motion is disabled under `prefers-reduced-motion`.

## 5. Imagery

- **Product photos** are true background-removed PNG cutouts on a shared canvas, so they sit on any surface at a consistent scale.
- **Lifestyle photos** (`public/images/lifestyle/`) are cropped from the supplied promo images using only regions with no baked-in text or claims.
- **Illustrations** (`public/images/illustrations/`) are the hand-drawn bilona/Gir cow sketches from the promo artwork, converted to transparent single-colour maroon line art.
- **Icons** (`src/components/shared/Icons.tsx`): one thin-line set on a 24px grid — drop, churn, cow, curd, flame, flask, seal, etc.

## 6. Components

Shared: `Logo`, `Header` (announcement bar + sticky nav), `Footer`, `WhatsAppFloat`, `Button` / `LinkButton` / `ExternalButton`, `Section`, `SectionHeading` + `Eyebrow`, `PageIntro`, `Icons`, `EmptyState`.

Public: `HomeHero`, `PromiseBar`, `ProductRange`, `BilonaFeature`, `PurityProof`, `KitchenSection`, `BrandStatement`, `ProductPurchasePanel` (+ `ProductGallery`, `ProductVariantSelector`), `ProcessTimeline`, `DocumentCard`, `EnquiryForm`, `FaqAccordion`, `NotFoundContent`.

Lab figures shown in `PurityProof` and on `/quality` live in `src/lib/lab-report.ts`, transcribed from the actual report — update that file when a new report is issued.

## 7. What Admin Cannot Change

Per the Admin Content Principle in `requirements.md`: colours, typography, spacing, component structure, and navigation are fixed in code. Admin edits content (text, images, documents, FAQs, business settings) that flows into these components.
