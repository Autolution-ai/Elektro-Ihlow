# LIBRARIES.md – Animations-Bibliotheken

Nachschlagewerk: welche Library wann, mit den fertigen CDN-Snippets. Die
Einsatz-Logik lebt im Skill `motion-toolkit` – diese Datei ist die
Schnellreferenz beim Bauen.

## Grundprinzip

Leichtestes Werkzeug zuerst. Wenige, gezielte, saubere Effekte. Zurückhaltung
ist Qualität – Überladung sieht nach AI aus.

## Die Kaskade – wann was

| Library | Wann | Typische Effekte |
|---------|------|------------------|
| **Natives CSS** | Erste Wahl bei Einfachem | Hover, Fades, Übergänge, scroll-driven CSS |
| **Lenis** | Einmal pro Seite als Basis | Sanftes Momentum-Scrolling ("Agentur-Gefühl") |
| **GSAP + ScrollTrigger** | Inszenierte Momente | Scroll-Animationen, Hero-Sequenzen, Pinning, Text-Reveals, SVG |
| **Anime.js v4** | JS-Kontrolle ohne GSAP-Gewicht | Gestaffelte Animationen, Zähler, SVG-Linien |
| **Three.js** | Nur echtes 3D, sehr sparsam | 3D-Objekt im Hero, WebGL-Hintergrund |

Für die konkrete GSAP-Umsetzung: offizielle `gsap-skills` heranziehen.

## CDN-Snippets

Ins HTML vor `</body>`. Versionen bei Bedarf aktualisieren.

```html
<!-- GSAP + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>

<!-- Lenis (Smooth-Scroll) -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>

<!-- Anime.js v4 -->
<script src="https://cdn.jsdelivr.net/npm/animejs@4/lib/anime.iife.min.js"></script>

<!-- Three.js (nur wenn echtes 3D nötig) -->
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
```

## Minimale Start-Snippets

**Lenis (Basis-Setup):**
```js
const lenis = new Lenis();
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

**GSAP + ScrollTrigger (Reveal-Beispiel):**
```js
gsap.registerPlugin(ScrollTrigger);
gsap.from(".reveal", {
  y: 40, autoAlpha: 0, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: ".reveal", start: "top 80%" }
});
```

**Anime.js v4 (Zähler-Beispiel):**
```js
anime({ targets: "#counter", innerHTML: [0, 30], round: 1, duration: 1500, easing: "easeOutExpo" });
```

## Pflichtregeln (aus motion-toolkit)

- Nur transform & opacity animieren, nie Layout-Properties.
- `prefers-reduced-motion` respektieren (CSS-Block einbauen).
- Kein Scroll-Hijacking. `ScrollTrigger.refresh()` nach Layout-Änderungen.
- Auf Mobil UND Desktop prüfen.

## Hinweis GSAP-Lizenz

GSAP inkl. aller Plugins (ScrollSmoother, SplitText, MorphSVG …) ist seit der
Webflow-Übernahme 100% kostenlos, auch kommerziell. Kein Club-Account nötig.
