# CLAUDE.md – Demo-Website

Diese Datei ist die Verfassung für dieses Repo. Sie gilt IMMER, in jedem
Arbeitsschritt. Der konkrete Ablauf einer Demo-Erstellung steht getrennt in
`docs/WORKFLOW.md` – bei einer neuen Demo folge diesem Workflow Schritt für Schritt.

---

## 1. Kontext – wer & was

Ich (Bruno) baue mit diesem Repo eine **Demo-Website** für einen potenziellen
Kunden. Zweck: Der Kunde bekommt vor Beauftragung eine überzeugende Vorschau,
die im Sales-Call gezeigt wird.

Ausgangslage fast immer:
- Der Kunde hat bereits eine bestehende Website (oft veraltet).
- Ich bekomme ein Briefing (aus Todoist, vom Vertrieb) mit allen Infos.
- Ziel: Die bestehende Seite scrapen, analysieren, und eine deutlich bessere,
  personalisierte Demo bauen – moderner, verkaufspsychologisch und technisch.

Eine Demo ist erst dann gut, wenn sie besser ist als das Original – nicht nur
optisch, sondern in Struktur, Text und Wirkung.

## 2. Sprache & Kommunikation

- **Sprache:** Immer Deutsch, außer ich wechsle explizit.
- **Bei Unklarheiten:** Immer nachfragen – nie raten, nie annehmen.
- **Keine Halluzinationen:** Nur mit Informationen arbeiten, die aus dem Briefing,
  dem Scrape oder von mir kommen. Unsicherheiten klar benennen ("Das ist unsicher").
- **Antwortstil:** Kurz, direkt, präzise. Aktionen vor Erklärungen.

## 3. Sicherheit – nicht verhandelbar

- **Niemals** API Keys, Tokens oder Secrets im Code, in Configs oder in Nachrichten.
- Zugänge laufen ausschließlich über MCP-Verbindungen (z.B. Apify) oder `.env`
  (lokal, niemals committed).
- `.env` und Secret-Dateien gehören immer in `.gitignore` (ist bereits eingerichtet).

## 4. Tech-Stack (fest für Demos)

- **Struktur:** HTML5, semantisch sauber.
- **Styling:** Vanilla CSS mit Custom Properties (Design-Tokens in `css/tokens.css`).
  Kein Inline-Style. Kein Bootstrap. Kein Tailwind.
- **JavaScript:** Vanilla JS. Kein Framework (kein React/Vue) für Demos.
- **Animation:** Nur diese Libraries, per CDN eingebunden – Details & Snippets in
  `docs/LIBRARIES.md`, professioneller Einsatz über den Skill `motion-toolkit`:
  - Natives CSS (erste Wahl bei Einfachem)
  - Lenis (sanftes Scroll-Gefühl, Basis pro Seite)
  - GSAP + ScrollTrigger (inszenierte Scroll-/Hero-Momente)
  - Anime.js v4 (gestaffelte Animationen, Zähler, SVG)
  - Three.js (nur für echtes 3D, sehr sparsam)
- **Prinzip bei Effekten:** Immer das leichteste Werkzeug, das den Job erledigt.
  Wenige, gezielte, saubere Effekte – nicht möglichst viele. Zurückhaltung ist
  ein Qualitätsmerkmal.
- **Deploy:** GitHub → Vercel (Root Directory = Repo-Root).

**Bild-, Logo- & Design-Assets (Higgsfield MCP):**
Für alles Visuelle, das nicht Code ist, wird der Higgsfield-MCP genutzt:
- Logo aufwerten / hochskalieren (upscale)
- Logo freistellen / Hintergrund entfernen (für sauberen Einbau in Header/Footer)
- Bilder generieren (Hero-Motive, Hintergründe, wo keine echten Kundenbilder da sind)
- 3D-Assets / Motive generieren, falls für den Look sinnvoll
Wichtig: Higgsfield erzeugt visuelle Assets (Bilder, Logo, Motive). Die
Interaktion/Bewegung auf der Seite selbst kommt aus den Code-Libraries oben
(GSAP, Lenis etc.) – beides nicht verwechseln.

## 5. Design-Qualität & Anti-AI-Slop

Der Output soll aussehen wie von einem professionellen Design-Team, nie wie
generischer AI-Output. Design ist immer projektspezifisch – kein Einheitslook.

**Anti-Slop bei Text (streng):**
- Keine Gedankenstriche als Stilmittel (—).
- Keine Aneinanderreihung extrem kurzer Stakkato-Sätze.
- Keine typischen AI-Floskeln ("In der heutigen schnelllebigen Welt", "Es ist
  wichtig zu beachten", "Tauchen Sie ein", "Heben Sie sich ab", "Das gewisse
  Etwas", leere Superlative).
- Kein aufgeblähtes Füllmaterial. Jeder Satz muss etwas leisten.
- Menschlich, konkret, natürlich schreiben – Ton an Kunde & Branche angepasst.

**Anti-Slop bei Design:**
- **Nicht alles in gleichförmige Boxen/Karten packen.** Der typische
  AI-Look ist ein uniformes 2×3- oder 3×3-Kachelraster (Icon + Überschrift +
  drei Zeilen Text, x-mal identisch). Das vermeiden. Stattdessen: Inhalte
  unterschiedlich gewichten, Layout-Rhythmus variieren, Weißraum nutzen,
  echte Hierarchie schaffen. Karten nur wo sie inhaltlich Sinn ergeben.
- Kein Purple-Gradient als Default.
- Kein generisches Hero mit rundem Avatar.
- Keine nummerierten Schritte (01/02/03) ohne echten sequenziellen Grund.
- Typografie bewusst einsetzen. oklch für harmonische Farbpaletten bevorzugen.

## 6. Text & Copy – Prinzip

Jeglicher Website-Text wird über den Skill `website-copy` erstellt. Der Skill
vereint drei Ziele gleichzeitig: Verkaufspsychologie, SEO-Struktur und
menschlicher, slop-freier Stil. Rohtext vom Kunden (aus dem Scrape) wird nie
1:1 übernommen, sondern neu und besser formuliert.

## 7. Kontrollpunkt-Prinzip

Zwei Arten von Kontrolle, die zusammenspielen:

1. **Automatische QA (Review-Agent):** Der Subagent `qa-reviewer` prüft an
   festen Stellen selbstständig gegen klare Kriterien (Anti-Slop, Struktur,
   Verkaufslogik, SEO, Vollständigkeit) und meldet Befunde. Das ist das Ziel:
   ein System, das selbst weiß, was gut und was schlecht ist, und Fehler
   findet, bevor ich sie sehe.

2. **Manuelle Freigabe (ich):** An den Phasengrenzen zeige ich kurz den Stand
   und warte auf mein OK, bevor es weitergeht.

Entwicklungsrichtung: Anfangs mehr manuelle Freigaben (bis das System kalibriert
ist). Mit der Zeit übernimmt der `qa-reviewer` mehr, und meine manuellen Checks
werden seltener – bis ich am Ende idealerweise nur noch das fertige Ergebnis
abnehme. Nie ungefragt die ganze Demo ohne jeden Kontrollpunkt durchbauen.

## 8. Recht (Demo-Stand)

Footer enthält immer Links zu Impressum & Datenschutz, aber mit leerem
Platzhalter-Inhalt (z.B. "Wird im Rahmen der Zusammenarbeit eingerichtet").
Kein Aufwand/Tokens für echte Rechtstexte in der Demo-Phase.

## 9. Die Bausteine dieses Repos

- `docs/WORKFLOW.md` – der Schritt-für-Schritt-Ablauf (Phase 0–5, Kontrollpunkte)
- `docs/LIBRARIES.md` – Animations-Libraries: wann was, mit CDN-Snippets
- `docs/CHECKLISTE.md` – finale Pre-Deploy-Kontrolle
- `.claude/commands/demo.md` – Slash-Command, startet den Ablauf
- `.claude/agents/` – spezialisierte Subagenten (Briefing, Analyse, Struktur, Copy, QA)
- `.claude/skills/` – wiederverwendbare Fähigkeiten (website-copy, anti-slop, motion-toolkit)
