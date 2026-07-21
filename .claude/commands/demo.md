---
description: Startet die Demo-Erstellung – führt durch alle Phasen des Workflows.
---

# /demo – Demo-Erstellung starten

Du startest jetzt die Erstellung einer Demo-Website. Folge strikt dem Ablauf in
`docs/WORKFLOW.md` und den Regeln in `CLAUDE.md`.

## Sofort zu Beginn

1. Weise Bruno darauf hin, jetzt den **Plan Mode** zu aktivieren (Shift+Tab),
   falls nicht ohnehin Default. Phase 0–2 laufen im Plan Mode.
2. Bitte Bruno, das **Briefing aus Todoist** einzufügen.

## Dann Phase für Phase

Arbeite den Workflow der Reihe nach ab und halte an jedem Kontrollpunkt (🛑) an:

- **Phase 0 – Briefing-Analyse** → Subagent `brief-analyst`
  Briefing extrahieren, filtern, 3–5 Rückfragen, Demo-Spec. 🛑 bestätigen lassen.

- **Phase 1 – Scrape & Analyse** → Subagent `site-analyst`
  Apify-Scrape, CI, Logo (Higgsfield), Ton, Werte, Bildvorschläge. 🛑 bestätigen.

- **Phase 2 – Struktur & Hero** → `structure-architect` + `hero-specialist`
  Struktur nach Ziel, Hero-Konzept. 🛑 abnicken lassen.
  Danach: Bruno erinnern, in den Ausführungsmodus zu wechseln (Shift+Tab).

- **Phase 3 – Copy** → Subagent `copywriter` (Skills: website-copy, anti-slop)
  Sektionsweise texten, Keyword-Notizen nach docs/SEO-NOTIZEN.md.
  🛑 Auto-QA durch `qa-reviewer`, dann 🛑 Freigabe.

- **Phase 4 – Bau & Effekte** → Haupt-Agent + `hero-specialist` (Skill: motion-toolkit)
  HTML/CSS/JS sektionsweise, responsive von Anfang an, Effekte sparsam,
  Bilder (Original/Higgsfield/Platzhalter), Footer mit Impressum/Datenschutz-
  Platzhaltern. 🛑 visuelle Zwischenabnahme.

- **Phase 5 – Finale QA & Deploy**
  5a `qa-reviewer` gegen docs/CHECKLISTE.md ·
  5b `responsive-qa` (iPhone/Safari, Android/Chrome, Desktop) ·
  5c Befunde beheben → 🛑 finale Freigabe → Deploy auf Vercel → Demo-Link.

## Grundhaltung (aus CLAUDE.md)

- Kontrollpunkte ernst nehmen, nie ungefragt durchbauen.
- Nichts erfinden, Unsicherheiten benennen.
- Deutsch, kurz, direkt.
- Kein AI-Slop (Text & Design).
