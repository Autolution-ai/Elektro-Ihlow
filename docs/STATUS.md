# PROJEKT-STATUS / MEMORY – Demo-Website Elektro Ihlow

> Interne Statusdatei (liegt im Repo-Root-Bereich `docs/`, wird NICHT mit-deployt,
> da Vercel nur `site/` ausliefert). Zweck: Kontext bündeln, damit nach dem
> Komprimieren nahtlos weitergearbeitet werden kann. Ergänzt den Umsetzungsplan
> in `/root/.claude/plans/prancy-foraging-kay.md`.
> Stand-Commit siehe zuletzt: `git log --oneline -1` (aktuell `d191e1d`).

## 1. Worum geht es
Demo-Website für den potenziellen Kunden **Elektro Ihlow GmbH** (Elektrotechnik,
Standorte Biesenthal & Berlin). Wird im Sales-Call gezeigt. Ziel laut Briefing:
**primär Mitarbeitergewinnung** (dominanter Karrierebereich), Kundengewinnung
sekundär aber überzeugend. Vorbild-Altseite: elektro-ihlow.de (veraltetes
WordPress ~2016). Regeln: `CLAUDE.md`, Ablauf: `docs/WORKFLOW.md`.

## 2. Repo- & Deploy-Struktur (WICHTIG)
- **GitHub:** `Autolution-ai/Elektro-Ihlow`, Entwicklungs-Branch **`claude/demo-v6milz`**.
  `main` == Branch (wir mergen jeden Stand per Fast-Forward auf `main`).
- **Website liegt in `site/`** (index.html, karriere.html, css/, js/, assets/).
  Der Claude-Baukasten (CLAUDE.md, `.claude/`, `docs/`) liegt im Repo-Root und
  wird NICHT deployt.
- **Vercel:** Projekt `elektro-ihlow` (ID `prj_qk3pFhM7MNPymI1Ijb6OOuxuADvt`,
  Team `team_qLi1B5pmpi7CPjTxx39CMAmL`). **Production Branch = `main`,
  Root Directory = `site`.** Jeder Push auf `main` deployt automatisch.
  Live: **https://elektro-ihlow.vercel.app**
  Hinweis: Deploy per Vercel-MCP ist gesperrt (keine Projekt-Anlage-Rechte) →
  Deploy läuft über GitHub→Vercel automatisch.
- **Arbeitsweise:** Änderungen in `site/` → commit → push Branch → FF-Merge auf
  `main` → push `main`. Git-Autor: `noreply@anthropic.com` / `Claude`.
- **Egress-Sperre in dieser Session:** CloudFront + Kundendomain sind geblockt,
  darum können externe Bilder/Fonts/CDN lokal nicht geladen werden. Lokale
  Playwright-Checks zeigen Layout/JS, aber keine echten Bilder/Fonts. Echte
  Optik nur im Vercel-Deploy sichtbar.

## 3. Design-System
- **Marken-Rot** ≈ `#D3362C` (aus Kunden-Swatch), oklch-Palette in
  `site/css/tokens.css`. Warmes Off-White + Anthrazit für dunkle Sektionen.
- **Fonts:** Archivo (Display) + Inter (Body), via Google Fonts.
- **Logo:** SVG „E + roter Blitz" (kein weißer Kreis), transparent. „E" adaptiv
  (dunkel auf hellem Header, hell auf dunklem Footer), Blitz immer rot. Auch als
  Favicon (data-URI). Blitz-Path: `M31 2 21 18h5l-8 16 4-13h-5z`, E aus 4 rects.
- **Ansprache:** Startseite „Sie", Karriere-Seite „Du".

## 4. Seitenstruktur (Ist-Zustand)
**index.html (Sie):** Header(Smart-Header + Mega-Menü) → Hero (André-Ihlow-
Portrait rechts, Doppel-CTA, Zähler-Kennzahlen) → Recruiting-Ribbon →
Auftragslage/Proof (mit „Projekt anfragen"-CTA) → **Karriere-Block (Top-of-Funnel,
dunkel, mit Bild 2 junge Monteure + Arbeitgeber-Argumente)** → Leistungen
(Bild-Text-Split Leitleistung + Karten + Hintergrund-Blitz) → Team-Bild-Band
(Parallax) → Projekte/Referenzen (3 Bilder + Textkacheln) → Heritage (André +
Generationen-Timeline unten links) → Standorte → Footer → Projektanfrage-Modal.

**karriere.html (Du):** Hero → Warum wir → Offene Stellen (Accordion:
Projektleiter, Assistenz/Büro + Initiativ) → Benefits → Kultur (+ Team-Bild) →
Bewerbungs-Funnel (7 Schritte inline). Diese Seite ist FERTIG.

**unternehmen.html (Über uns, Sie):** Subhero → Faktenleiste (1946 · 3. Gen ·
~30 · 2 Standorte + Innung/Meister-Note) → Heritage (André + Timeline + Story)
→ Wie wir arbeiten (3 Werte) → Team-Band → CTA-Band. Aus Scrape ueber-uns + Startseiten-Abschnitten.

**standorte.html (Sie):** Subhero → Standort-Detail (Biesenthal Hauptsitz +
Berlin, Adresse/Tel/Kurzinfo) → Einzugsgebiet (Barnim/Berlin/Größere Vorhaben) →
CTA-Band (Projekt-Modal + Anruf). Enthält das Projektanfrage-Modal.

**Navigation (alle Seiten):** Startseite (nur Unterseiten) · Leistungen ▾ ·
Über uns · Standorte · Karriere · [Jetzt bewerben]. Aktiver Punkt via
`aria-current="page"` (rot). Alte Anker-Nav (Projekte/Unternehmen/Standorte→#anchor) ersetzt.

## 5. Features / Interaktion (`site/js/main.js`)
- **Smart-Header:** natives window-scroll + rAF + ticking + DELTA=6 +
  SHOW_HIDE_START=120. Runter = aus, hoch = ein. (Lenis wurde ENTFERNT, weil es
  das Scroll-Event abfing – siehe offene Punkte.)
- **Mega-Menü „Leistungen":** Hover (Desktop) / Tap (Mobil). 16 Leistungen aus
  dem Scrape der Altseite, 3 Spalten (Elektrotechnik / Sicherheit & Licht /
  Fernsehempfang). Links vorerst auf `#leistungen`; Detailseiten folgen.
- **Zwei Funnels:** Bewerbung (inline, karriere) + Projektanfrage (Modal, index).
  Mehrstufig, Validierung, Auto-Advance, Fortschritt, Modal resettet beim
  erneuten Öffnen, Fokus-Falle.
- **Zähler:** seit 1946 (statisch), rund 30, 2 Standorte, bis 3 Mio. € – Suffix
  erst am Ende (keine „1 Standorte"-Zwischenwerte).
- **Effekte (GSAP, kein Lenis mehr):** Reveals, Bild-Clip-Reveal, Parallax
  (Team-Band), Hover-Zoom Projektbilder, schwebendes Hero-Badge.
  `prefers-reduced-motion` respektiert.

## 6. Bilder (Higgsfield, als CloudFront-min.webp-URLs eingebunden)
Basis: `https://d8j0ntlcm91z4.cloudfront.net/user_3064uXRqZDhsfEEjgzVarJDAKP6/`
- Hero: André-Porträt (Original importiert + upscaled) `…hf_20260721_123213_59a10881…`
- Karriere-Bild „2 junge Monteure": `…hf_20260722_064936_baa19113…`
- Team-Band: `…hf_20260721_192623_cdb7cf81…`
- Leitleistung/Verteiler: `…hf_20260721_192625_c43e9b4d…`
- Ref Wohnsiedlung: `…hf_20260721_122228_f8e0e7b9…`
- Ref Gewerbe: `…hf_20260721_122230_dee936e3…`
- Smart-Home-Kachel: `…hf_20260721_192626_8e050218…`
- (Hero-Detail-Motiv `9fc01fc7…` wurde vom André-Porträt abgelöst.)
Für die Live-Version später self-hosten (nach `site/assets/images/`). Higgsfield:
~1095 Credits, Ultimate-Plan.

## 7. Abgenommene Kern-Entscheidungen
Team ~30 · Referenzen weich ohne Jahre · Hero-Headline Variante A · Projektanfrage
als Modal · Gendern raus (Hero „rund 30 Kollegen") · Karriere als eigene Seite +
Top-of-Funnel-Block auf Startseite · Hero-Bild = Inhaber André · Logo E+Blitz ·
Smart-Header · Mega-Menü Leistungen.

## 8. OFFENE PUNKTE / GERADE IN ARBEIT
1. **Header-Scroll (auto-hide/show) – geparkt.** Bruno berichtete zuletzt, es
   funktioniere im Deploy immer noch nicht; auf seinen Wunsch vorerst zurück-
   gestellt. Aktueller Stand: Lenis entfernt, bewährtes window-scroll-Muster
   (analog einer funktionierenden Referenzseite). Lokal getestet OK; Live-
   Bestätigung durch Bruno steht aus. **Wenn wieder aufgegriffen:** prüfen, ob
   scroll wirklich auf `window` läuft (kein innerer Scroll-Container), ob
   `html/body`-overflow o.ä. stört.
2. **Copy-Widerspruch – ERLEDIGT.** Zeile „Rauchmelder/Antenne nicht unser
   Geschäft" war faktenwidrig (Altseite listet beide als Leistung). Auf
   Gesamtprojekt-Positionierung umgeschrieben (Commit a03b339).
3. **Nav → echte Unterseiten – ERLEDIGT (Über uns, Standorte, Karriere).**
   `unternehmen.html` + `standorte.html` neu gebaut, Karriere verlinkt,
   „Startseite" im Header auf Unterseiten, aria-current. Noch offen/später:
   Leistungs-Detailseiten (16 Stück), evtl. eigene Projekte-Seite.
4. **Finale QA fehlt noch:** Cross-Device (iPhone/Safari, Android/Chrome,
   Desktop) via `responsive-qa`, dann Bruno-Freigabe. Inhalts-QA gegen
   `docs/CHECKLISTE.md` war bereits durch (keine kritischen Punkte).

## 9. Nächster sinnvoller Schritt
Bruno-Entscheidung zu Punkt 2 & 3 abwarten, dann umsetzen. Danach finale
Cross-Device-QA + Freigabe. Header-Scroll bei Bedarf wieder aufgreifen.
