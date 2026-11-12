# 02 · Brand identity

## Name: Sound & Stone

**Meaning.** Connecticut's two defining textures: Long Island Sound (the shoreline, light, romance) and the fieldstone walls that run through every town from Greenwich to the Litchfield Hills (structure, steadiness, craft). The brand promise lives in the name: *we carry the structure so you can enjoy the romance.*

**Why it works**
- Pronounceable, two syllables + ampersand, easy to say on the phone and remember after a venue tour.
- Place-rooted without being a town name — scales to New England (Block Island Sound, Nantucket Sound, Vineyard Sound; stone walls everywhere).
- Distinct from personal-name planners; can outlive any one planner.
- Strong visual hook: the mark (a stone resting on the horizon line, with ripples) and an italic ampersand.

**Caveats (honest):** "___ & Stone Events" is a common naming pattern elsewhere in the U.S. (e.g., Cedar and Stone, Ember & Stone). No wedding business named "Sound & Stone" was found in searches on Nov 12, 2026.

**Availability — verified vs. not**
| Item | Status |
|---|---|
| soundandstoneweddings.com | Shown **available** in a Vercel registry lookup on 2026-11-12. **Not registered.** Register only with your authorization. |
| soundandstone.com, soundandstone.co | Taken. |
| soundandstonect.com, soundandstone.events, soundandstoneevents.com | Shown available (backup / redirect candidates). |
| USPTO trademark | **Not searched** (no access from this environment). Have an attorney run a clearance search in Class 35/41/45 (event planning is commonly Class 41) before printing materials. |
| Connecticut trade name | File a trade name certificate ("doing business as") for New England Event Planners LLC with the town clerk where the business is located. Confirm the requirement with your attorney/accountant. |
| Social handles | Not checked. Reserve @soundandstone / @soundandstoneweddings on Instagram, Pinterest and TikTok. |

## Identity system (implemented in `src/app/globals.css`)

**Palette — New England materials, not wedding clichés**
| Token | Hex | Use |
|---|---|---|
| paper | `#f5f2ec` | Page background (sea-salt white) |
| linen | `#ece6db` | Alternate sections, panels |
| stone | `#d6cdbf` | Borders, quiet fills |
| granite | `#66625a` | Secondary text (AA on paper) |
| ink | `#1a2229` | Text, primary buttons |
| harbor / harbor-deep | `#1f2b34` / `#172028` | Dark editorial sections, footer |
| cranberry | `#7b3b35` | The single accent: italics, numerals, focus rings, hover |
| sea glass / mist | `#b7c2b9` / `#c9d0cc` | Accents on dark |

**Typography**
- *Newsreader* (Production Type, OFL) — display and editorial body. Light weights with optical sizing at display sizes for a magazine feel; italics used sparingly as accents.
- *Jost* (OFL) — small caps labels, navigation, buttons, form labels; tracked uppercase.
- Self-hosted, subset and weight-clamped (`scripts/subset-fonts.py`) for performance.

**Logo.** `Mark` in `src/components/Logo.tsx`: a filled circle (stone) sitting on a horizon line with two ripples beneath; wordmark in Newsreader with a cranberry italic ampersand. Favicon/app icon in `src/app/icon.svg`. *A professional designer should refine the mark into final vector artwork before print.*

**Layout & components.** 12-column grid, generous section spacing (6–8rem), hairline rules, magazine folios ("No. 03 — The difference"), numbered editorial lists instead of icon grids, rectangular buttons, underline-style form fields, horizon-line timeline. Motion: subtle reveal-on-scroll, image hover zoom, header that hides on scroll down — all disabled for `prefers-reduced-motion`.

**Voice.** Calm, specific, quietly confident. Concrete over superlative ("two planners, one written run of show") — never "unforgettable memories" or "dream wedding." Honest about being new.

## Photography: current state and acquisition spec

**Current.** 20 photographs from Unsplash (Unsplash License: free commercial use, no attribution required; images may not be sold unmodified or used to build a competing photo service). Each is graded with one house look in `scripts/process-images.mjs` so the set reads as a single body of work. Source IDs are listed in that script. **Footer and About page state that imagery is licensed inspiration, not Sound & Stone weddings.** Some Unsplash images contain identifiable people; Unsplash does not guarantee model releases — replace people-forward images (hero, couple shots) with commissioned or properly released work before scaling paid advertising.

**Commission next (priority order)**
1. **Hero (vertical 4:5 + horizontal 3:2 crops):** couple on a Connecticut shoreline at golden or overcast light; natural, unposed, editorial. 
2. **Planner-at-work set (8–12 images):** hands on a run-of-show, a walkie-talkie at a ceremony, steaming a dress, directing a processional, a vendor huddle — real proof of the service.
3. **Estate & coastal settings (6):** shingle houses, stone walls, harbors, a tented lawn at dusk.
4. **Details (10):** tablescapes, stationery, florals in a muted palette (ivory, green, stone, soft blush — avoid saturated pinks/golds).
5. **Real weddings** as they happen, with signed couple and photographer permission (model + usage release).

Style rules: natural light, soft contrast, muted greens and neutrals, no heavy filters or HDR, no obviously staged smiles, consistent warm-matte grade. Deliver ≥3000px on the long edge.
