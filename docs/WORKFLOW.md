# WORKFLOW.md – Demo-Erstellung

Dieser Ablauf ergänzt die Regeln aus `CLAUDE.md` (die immer gelten). Hier steht
die konkrete Reihenfolge: von "Briefing einfügen" bis "Demo-Link". Der Ablauf
wird per Slash-Command `/demo` gestartet.

## Grundregeln für den ganzen Ablauf

- **Phasen nacheinander.** Keine Phase überspringen, keine vorziehen.
- **Plan Mode nutzen (Phase 0–2).** In den analysierenden Phasen im Plan Mode
  arbeiten (Shift+Tab in Claude Code): nur lesen, extrahieren, planen, Konzepte
  vorlegen – noch keine Dateien bauen. Nach dem Struktur-Kontrollpunkt (Ende
  Phase 2) in den Ausführungsmodus wechseln. Ab Phase 3 wird gebaut.
- **Kontrollpunkte (🛑) ernst nehmen.** An jedem 🛑: kurz Stand zeigen, auf
  Freigabe warten, erst dann weiter. (Anfangs mehr manuelle Freigaben; mit der
  Zeit übernimmt der `qa-reviewer` mehr – siehe CLAUDE.md, Abschnitt 7.)
- **Nichts erfinden.** Nur mit Infos aus Briefing, Scrape oder von Bruno arbeiten.
  Unsicherheiten offen benennen.
- **Transparenz.** Bei jeder Extraktion/Analyse zeigen, was verwendet und was
  bewusst weggelassen wurde.

---

## Phase 0 – Briefing-Analyse  ·  🧠 Plan Mode
**Agent:** `brief-analyst`

1. Bruno fügt das Briefing (aus Todoist, vom Vertrieb) ein.
2. `brief-analyst` extrahiert alle demo-relevanten Infos:
   - Hauptziel der Demo (z.B. Mitarbeitergewinnung vs. Kundengewinnung)
   - Branche, Unternehmensgröße, Leistungen
   - Geforderte Sektionen & Funktionen (z.B. Bewerbungs-Funnel, Projektanfrage)
   - Benefits / Argumente, Referenz-Anforderungen
   - Design-Wünsche, Hero-Vorgaben, Ton
   - URL der bestehenden Website (Scrape-Quelle)
3. Filtert Nicht-Relevantes heraus und **nennt es transparent** (z.B.
   Terminorganisation, Budget-Notizen, reine Sales-Gesprächsnotizen).
4. Stellt 3–5 gezielte Rückfragen – nur wo wirklich nötig, nicht auf Verdacht.
5. Gibt eine strukturierte **Demo-Spec** aus (Ziel, Sektionen, Funnels, Ton, Quelle).

🛑 **Kontrollpunkt:** Demo-Spec + Filterung bestätigen oder korrigieren.

---

## Phase 1 – Scrape & Analyse  ·  🧠 Plan Mode
**Agent:** `site-analyst` · **Tools:** Apify (Scrape), Higgsfield (Logo)

1. Bestehende Website scrapen (Apify).
2. **CI extrahieren:** Farben, Schriften, Logo.
3. **Logo aufbereiten (Higgsfield):** hochskalieren, freistellen/Hintergrund
   entfernen – für sauberen Einbau in Header/Footer.
4. **Sprache & Ton analysieren:** Wie schreibt der Kunde? Förmlich/locker,
   regional, fachlich? Was betont er (Menschen, Historie, Kultur, Qualität)?
5. **Werte-Analyse:** Worauf legt die alte Seite Wert – das übernehmen, aber
   besser machen (verkaufspsychologisch, SEO, modern).
6. **Original-Bilder markieren:** Gute vorhandene Bilder erkennen und Bruno aktiv
   vorschlagen ("Dieses Bild passt gut in Sektion X – Original holen?").

🛑 **Kontrollpunkt:** CI, Ton-/Werte-Erkenntnisse und Bild-Vorschläge bestätigen.

---

## Phase 2 – Struktur & Hero  ·  🧠 Plan Mode
**Agenten:** `structure-architect` + `hero-specialist`

1. `structure-architect` entwirft die **optimale Seitenstruktur für den
   konkreten Use-Case** – kein Schema-F. Sektions-Reihenfolge folgt dem Ziel
   (z.B. Karrierebereich dominant bei Mitarbeitergewinnung).
2. `hero-specialist` entwirft die **Startseiten-Logik** (above the fold):
   - Sofort klar: wer ist der Kunde, was bietet er, für wen?
   - Klare Botschaft + starke Headline/Typografie.
   - Eindeutiger Call-to-Action (ggf. zwei, nach Priorität).
   - Keine Verwirrung, keine Überladung.
3. Struktur als Übersicht darstellen (Sektionen + Zweck + grobe Reihenfolge).

🛑 **Kontrollpunkt:** Struktur & Hero-Konzept abnicken.

> 🔧 **Ab hier: Ausführungsmodus.** Plan Mode verlassen (Shift+Tab) – ab
> Phase 3 wird tatsächlich getextet und gebaut.

---

## Phase 3 – Copy
**Agent:** `copywriter` · **Skill:** `website-copy`

1. `copywriter` textet Sektion für Sektion über den `website-copy`-Skill
   (Verkaufspsychologie + SEO-Struktur + menschlicher, slop-freier Stil).
2. Rohtext aus dem Scrape wird nie 1:1 übernommen, sondern neu & besser formuliert.
3. Ton an die in Phase 1 analysierte Kundensprache anpassen.

🛑 **Auto-QA:** `qa-reviewer` prüft die Copy gegen Anti-Slop-Regeln und
   Verkaufslogik (Skill `anti-slop`), meldet Befunde.

🛑 **Kontrollpunkt:** Copy freigeben.

---

## Phase 4 – Bau & Effekte
**Agenten:** Haupt-Agent + `hero-specialist` · **Skill:** `motion-toolkit` ·
**Tool:** Higgsfield (Bilder)

1. HTML/CSS/JS **sektionsweise** aufbauen – von Anfang an responsive gedacht
   (mobile & desktop parallel, nicht nachträglich).
2. `hero-specialist` baut & prüft den Hero besonders sorgfältig.
3. **Effekte** nach `motion-toolkit`: leichtestes Werkzeug zuerst
   (CSS → Lenis → GSAP/ScrollTrigger → Anime.js → Three.js). Sparsam & gezielt.
4. **Bilder:** echte Original-Bilder (aus Phase 1) wo passend, sonst via
   Higgsfield generieren, sonst sauberer Platzhalter. Nie leere Löcher.
5. **Footer:** Impressum & Datenschutz als Links mit leerem Platzhalter-Inhalt.
6. Nach jedem größeren Abschnitt kurz Status melden.

🛑 **Kontrollpunkt:** visuelle Zwischenabnahme.

---

## Phase 5 – Finale QA & Deploy

### 5a – Inhalt & Struktur-QA
**Agent:** `qa-reviewer` · gegen `docs/CHECKLISTE.md`
- Sektionen vollständig & schlüssig, Struktur logisch
- Copy sauber (Anti-Slop, Verkaufslogik)
- SEO-Struktur (Überschriften-Hierarchie, Meta, Alt-Texte)
- Impressum/Datenschutz-Platzhalter vorhanden
- Logo sauber eingebunden

### 5b – Cross-Device-QA
**Agent:** `responsive-qa`
- iPhone/Safari + Android/Chrome + Desktop
- Breakpoints sauber, Touch-Targets groß genug
- Scroll-Animationen sauber & flüssig auf allen Geräten
- Keine Layout-Brüche, kein horizontales Scrollen

### 5c – Freigabe & Deploy
1. Befunde aus 5a & 5b beheben.
2. 🛑 **Finale Freigabe** durch Bruno.
3. Deploy auf Vercel (Root Directory = Repo-Root).
4. Demo-Link ausgeben.

---

## Übersicht: was greift wann

| Phase | Agent | Skill | Tool |
|-------|-------|-------|------|
| 0 Briefing | `brief-analyst` | – | – |
| 1 Scrape/Analyse | `site-analyst` | – | Apify, Higgsfield |
| 2 Struktur/Hero | `structure-architect`, `hero-specialist` | – | – |
| 3 Copy | `copywriter` | `website-copy`, `anti-slop` | – |
| 4 Bau/Effekte | Haupt-Agent, `hero-specialist` | `motion-toolkit` | Higgsfield |
| 5a Inhalt-QA | `qa-reviewer` | `anti-slop` | – |
| 5b Device-QA | `responsive-qa` | – | – |
| 5c Deploy | Haupt-Agent | – | Vercel |
