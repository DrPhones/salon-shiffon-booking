# Design implementation QA — 2026-10-17

final result: passed

No actionable P0/P1/P2 findings remain within the tested scope. This result covers the implementation and browser checks below; it does not certify performance or keyboard behavior on a physical iPhone.

## Findings and fixes

- **[P2, resolved] Mobile order panel inherited a desktop top offset.** The fixed sheet did not consistently sit against the viewport bottom. Mobile `.sheet { top: auto; }` now clears it. The panel also follows `visualViewport.height` and `offsetTop` when the keyboard reduces the visible area. Bottom alignment, simulated keyboard opening, and landscape layout passed. Evidence: `/workspace/salon-design/webkit-booking.png` and `tests/hero_smoke.py`.
- **[P2, resolved] Hero action and secondary copy were undersized.** Desktop CTA is now 306px wide with 28px text and a 72px minimum height; supporting copy is 24/21px and the location is 21px. Mobile retains its smaller explicit sizes. Evidence: `comparison-copy.png` in the evidence directory below.
- **[P2, resolved] Initial ribbon rendering had flat facets and intersecting layers.** The revised scene uses two flowing ribbon surfaces, continuous seam normals, physical folds, filtered fabric roughness, and a studio environment. Redundant overlapping strands were removed. Evidence: `desktop-v1.png`, `desktop-v2.png`, and the final full/art comparisons.
- **[P2, resolved] Updated artwork crossed the location text on narrow screens.** The first fix used 375px artwork and 395px of reserved space below the copy. The user then requested a more integrated mobile transition; the controlled, masked overlap described in the latest revision below supersedes that separation. Evidence: `mobile-before-art-spacing.png` versus `mobile-final.png`, plus the 11-viewport check.
- **[P2, resolved] Small supporting text and placeholders were too faint.** They now use the shared muted token, with measured contrast of 4.51:1 on the hero background, 4.87:1 on the catalogue background, and 4.75:1 on the sheet background.

## Source, state and evidence

Source visual truth: `/workspace/generated_images/exec-9e3f3a2c-40e5-47d1-ab5a-014cededa8b2.png`.

The user approved that composition, requested the headline “تفاصيلكِ تزهر هنا”, a full-width header/hero, actual Three.js 3D, and priority for iPhone Safari. The source is a generated still; the user explicitly requested a live three-dimensional scene. Thus the ribbon geometry is implemented in Three.js, with a generated poster used during loading, reduced motion, or WebGL failure.

Evidence directory: `/workspace/salon-design/`.

| Evidence | Viewport and state |
| --- | --- |
| `desktop-final.png` | Chromium; 1487 × 1058 CSS px; initial page, fonts ready, real WebGL paused for capture |
| `mobile-final.png` | Chromium; 390 × 844 CSS px; initial page, fonts ready, real WebGL paused without scrolling |
| `fallback-final.png` | Chromium; 1487 × 1058 CSS px; reduced motion, local poster |
| `desktop-final-services.png`, `mobile-final-services.png` | Catalogue, empty cart; same respective viewport sizes |
| `webkit-desktop.png` | WebKitGTK 2.52.6; 1440 × 1062 CSS px; real WebGL |
| `webkit-mobile.png`, `webkit-booking.png` | WebKitGTK; 447 × 892 CSS px; narrow layout and populated booking sheet |
| `comparison-final.png` | Source and desktop implementation side by side; source on left |
| `comparison-copy.png`, `comparison-art.png` | Matched crops of both artifacts for typography/actions and scene quality |
| `responsive-320.png`, `responsive-768.png`, `responsive-1024.png` | Additional responsive states using reduced motion |

Source and desktop implementation are both **1487 × 1058 pixels**, captured/compared at **1 CSS px per image pixel**, `deviceScaleFactor: 1`. No density rescaling or browser chrome is included. Mobile captures are 1:1 as well. The source contains no mobile design or catalogue/form states, so these were evaluated as responsive extensions, not as pixel matches to an unavailable source.

## Fidelity review

- **Fonts/typography:** Locally served Amiri provides the Arabic display face; IBM Plex Sans Arabic supplies readable interface text. The generated source does not provide a font file, so these are visual matches rather than an asserted font identification. Heading wraps to two lines, the action remains prominent, form fields use 16px text, and there is no truncation. Final focused comparison verifies the corrected action/copy hierarchy.
- **Spacing/layout:** Full-width ivory hero, artwork on the left and right-aligned copy on desktop, thin header divider and lower category navigation retain the source composition. Mobile stacks copy before the artwork. The sheet stays within the visible viewport. All tested widths have no horizontal overflow; the CTA remains within the viewport.
- **Colors/tokens:** Warm ivory `#f4f0e9`, plum `#302536`, lilac fabric, pale separators, and cream catalogue/sheet surfaces carry through. Supporting text contrast was corrected as noted above.
- **Image quality/assets:** Real-time fabric is deliberately simpler and more opaque than the source's photoreal translucent cloth; the background uses simpler lighting rather than the still's complex caustics. This is an explicit rendering adaptation for the requested live 3D/mobile implementation, not a claim of identical photography. The final scene retains fabric folds, lilac/pearl materials, floating pearls and the large left-side composition. The local WebP fallback retains the detailed generated artwork. Existing salon photography and brand asset are preserved; interface icons are original licensed library assets.
- **Copy/content:** Requested headline is present. Supporting copy, location and manual salon confirmation message match the selected direction. All 103 catalogue entries, prices and fee flags were compared with the original catalogue and preserved. Booking remains a WhatsApp request subject to salon confirmation.

## Comparison history

1. Initial `desktop-v1.png` / `mobile-v1.png`: scene was too sparse and the supporting type too small. Added the crossing fabric composition and adjusted its scale; `desktop-v2.png` records the next rendering.
2. Full source/render comparison: flat shading, intersecting fabric layers and CTA sizing remained actionable. Reworked material/folds, closed seam normals and strand paths; increased desktop copy/action sizes. The final combined full, copy and art evidence was opened and inspected.
3. Mobile and WebKit review: corrected inherited sheet offset and then artwork/text overlap. Reserved mobile art space and verified the 320–1920px layout range. The post-fix mobile and booking screenshots were inspected.
4. Final contrast/capture review: darkened supporting text/placeholders and captured the initial mobile viewport without the pause button scrolling the page. Final source/render comparisons were regenerated from the final captures.

## Validation

- `python3 tests/browser_smoke.py`: **4/4 passed** — desktop/mobile, fee/no-fee services, search, totals, missing-name and same-day rejection, tomorrow request generation, analytics without personal data, local draft restore and asset availability.
- `python3 tests/hero_smoke.py`: **4/4 passed** — actual WebGL2 rendering and animation, pause, no rendering when offscreen, context loss/restoration, changed motion preference, simulated mobile keyboard viewport, unsupported WebGL/module failure, usable booking fallback and landscape panel bounds. No unexpected JavaScript/console errors in the real-render scenarios.
- Native **WebKitGTK 2.52.6** WebDriver checks passed — real scene, 103 catalogue rows, responsive sheet, fee calculation, validation, WhatsApp URL and analytics. Used a fresh browser session after discovering stale development-cache assets; assertions verified the current mobile CSS. WebKit screenshots were captured after fonts were ready. The GTK window's minimum content width was 447px; it is not represented as a 390px iPhone.
- Responsive layout checks passed at widths **320, 375, 390, 430, 768, 899, 900, 1024, 1280, 1487 and 1920px**. Those checks preceded the user-requested masked mobile overlap described below; the new transition was separately checked at five narrow widths.
- `node --check` passed for the three application scripts; `git diff --check` passed. Vendored Three.js module hashes match the installed npm package files.
- Tests intercept WhatsApp navigation; no messages were sent. These checks were run before deployment.

WebKit's console observation starts before booking interactions; early rendering is additionally checked by scene state and screenshots. Chromium captures runtime errors from navigation onward. The official Playwright WebKit download was blocked by network policy, so the WebKit check used the signed Debian WebKitGTK package in an isolated local runtime.

## Remaining test gaps and polish

- **Physical iPhone:** Safari/iOS device testing remains unrun. Linux WebKit and viewport emulation do not establish iPhone GPU frame rate, memory pressure, actual keyboard/picker behavior, safe-area rendering or low-power mode behavior. Real hardware performance is not claimed.
- **[P3] Art detail:** Higher-fidelity fabric translucency and caustics could further approach the still, subject to measuring their cost on an iPhone. Current scene intentionally avoids transmission/postprocessing passes.
- **[P3] Brand treatment:** The existing square brand mark is retained, while the concept used a standalone dryer silhouette.

## Implementation checklist

- [x] Requested headline and full-width composition.
- [x] Actual Three.js geometry, local dependencies and graceful poster fallback.
- [x] Reduced motion, pause control, bounded pixel ratio/frame scheduling and offscreen suspension.
- [x] Existing catalogue and booking rules retained.
- [x] Mobile sheet, keyboard viewport and responsive layout fixes.
- [x] Source/render comparison, focused review, Chromium and WebKit checks.
- [ ] Physical iPhone Safari verification, separately identified above.

## Mobile transition refinement — latest user revision

**final result: passed**

The user requested a coordinated, overlapping transition between the upper header and the mobile hero. The prior capture showed a sharp horizontal edge where the artwork began. This P2 issue is resolved: mobile header and hero share an ivory/lilac wash; a fine divider fades at both ends; the 435px scene extends behind the lower copy area and fades in through a CSS mask. The same mask handles the static fallback. The initial overlap is nearly transparent, keeping the location and CTA readable. Location text uses the stronger accent token. Header and hero offsets include the iPhone top safe area. All CSS changes are inside the mobile media query.

Evidence, under `/workspace/salon-design/`:

- Before: `mobile-header-before.png`; after: `mobile-blend-390.png` (also saved as `mobile-final.png`). Both are 390 × 844 CSS/image px at density 1, initial page position and real Three.js paused for capture.
- `mobile-header-comparison.png` places the actual before/after captures together, before left and after right. `mobile-header-focus.png` compares the CTA/location/art boundary at the same crop. Both were opened and inspected.
- `mobile-blend-320.png`, `mobile-blend-375.png`, `mobile-blend-430.png`, `mobile-blend-768.png` show the same blend with the reduced-motion poster.
- `webkit-mobile-blend.png` records the updated prefixed mask and live scene in WebKitGTK at 447 × 892; fonts were ready, development CSS was cache-busted, and the fade was allowed to finish.

Checks passed at widths 320, 375, 390, 430 and 768: header/copy clearance, intentional masked overlap, no horizontal overflow, unobstructed CTA, and no runtime errors. The real-render 390px scenario also opened the catalogue, added a service and verified the booking sheet total. WebKit verified the current mask, artwork dimensions and layout. `git diff --check` passed. The rendered comparison confirms intact typography, spacing, palette, artwork and copy; no further P0/P1/P2 issues were found. The physical-iPhone test gap recorded above remains.

## Tomorrow-only booking refinement

Confirmed that the first bookable date is tomorrow in Asia/Riyadh and that same-day submission is rejected. Added date-limit refresh before opening/focusing the native picker and when returning to the page, so a tab left open across Riyadh midnight cannot retain yesterday's picker minimum. Existing draft restoration already drops dates that have become today or earlier.

`tests/booking_date_smoke.py` passed **3/3** scenarios in Asia/Riyadh, America/Los_Angeles and Asia/Tokyo, including a month boundary, updated picker minimum, same-day rejection, removal of an expired draft date, and acceptance of the following day. The original booking smoke suite passed **4/4** scenarios again. Its valid-date step now explicitly reselects a time after the intentionally rejected same-day attempt, since an elapsed time may have been cleared. JavaScript syntax and diff checks passed. No external WhatsApp messages were sent. Visual styling is unchanged in this refinement.
