# CHECKLISTE.md – Pre-Deploy-Kontrolle

Gegen diese Liste prüft der `qa-reviewer` (5a) und `responsive-qa` (5b) vor dem
Deploy. Nichts geht live, solange kritische Punkte offen sind.

## 5a – Inhalt & Struktur (qa-reviewer)

### Copy & Verkaufslogik
- [ ] Kein AI-Slop (Gedankenstriche, Stakkato-Ketten, AI-Floskeln) – anti-slop bestanden
- [ ] "Sie/Ihr" dominiert über "wir/uns" (Richtung 2–3:1)
- [ ] Jede Sektion hat etwas Konkretes/Zahlen, keine leeren Adjektive
- [ ] Klarer CTA je relevanter Sektion, Verb + Nutzen
- [ ] Ton passt zur analysierten Kundensprache
- [ ] Nichts erfunden (keine erdachten Zahlen, Referenzen, Auszeichnungen)

### Struktur
- [ ] Sektionen vollständig laut Demo-Spec, sinnvolle Reihenfolge
- [ ] Struktur folgt dem Hauptziel (nicht Schema-F)
- [ ] Keine gleichförmige Kachel-Wüste, echte Hierarchie
- [ ] Hero klar: wer, was, für wen, CTA

### SEO-Grundstruktur
- [ ] Genau eine H1, logische H2/H3-Hierarchie
- [ ] Meta-Title & -Description (Platzhalter ok)
- [ ] Alt-Texte an allen Bildern
- [ ] docs/SEO-NOTIZEN.md mit Keyword-Notizen befüllt

### Assets & Recht
- [ ] Logo sauber eingebunden (freigestellt, scharf, richtig platziert)
- [ ] Keine leeren Bild-Löcher (Original/Higgsfield/sauberer Platzhalter)
- [ ] Footer: Impressum & Datenschutz als Links mit Platzhalter-Inhalt

## 5b – Cross-Device (responsive-qa)

- [ ] iPhone/Safari: Layout & Scroll sauber
- [ ] Android/Chrome: Layout & Scroll sauber
- [ ] Desktop (mehrere Breiten): kein Bruch
- [ ] Kein horizontales Scrollen
- [ ] Touch-Targets groß genug
- [ ] Scroll-Animationen flüssig auf allen Geräten (kein Jank)
- [ ] prefers-reduced-motion greift
- [ ] Bilder/Logo scharf und richtig skaliert
- [ ] Text lesbar (Größen, Kontrast, Zeilenlänge)

## 5c – Deploy
- [ ] Kritische Befunde behoben
- [ ] Finale Freigabe durch Bruno
- [ ] Deploy auf Vercel (Root Directory = Repo-Root)
- [ ] Demo-Link funktioniert und ist erreichbar
