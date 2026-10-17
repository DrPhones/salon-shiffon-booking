# Local runtime assets

All runtime assets are served from this repository; no npm command or third-party CDN is needed to run the page.

| Asset | Version / source | License |
| --- | --- | --- |
| Three.js | npm `three@0.180.0`, original `build/three.module.min.js` and `build/three.core.min.js` | `assets/vendor/THREE-LICENSE.txt` (MIT) |
| Amiri | npm `@fontsource/amiri@5.3.0`, Arabic and Latin regular WOFF2 | `assets/fonts/amiri-LICENSE.txt` (OFL) |
| IBM Plex Sans Arabic | npm `@fontsource/ibm-plex-sans-arabic@5.3.0`, Arabic and Latin 400/600 WOFF2 | `assets/fonts/ibm-plex-sans-arabic-LICENSE.txt` (OFL) |
| UI icons | npm `bootstrap-icons@1.13.2`, original SVG files | `assets/icons/LICENSE.txt` (MIT) |
| Brand mark | Existing repository `favicon.svg` | Existing project brand asset |
| Hero poster | Image Gen asset made from the approved design; WebP encoding | Project artwork |

The package manager verified npm registry integrity during acquisition. Vendored Three.js files are unmodified. The real-time ribbon geometry, lighting, interaction and lifecycle are implemented in `assets/hero-3d.js`; the poster is a fallback, not the WebGL scene.
