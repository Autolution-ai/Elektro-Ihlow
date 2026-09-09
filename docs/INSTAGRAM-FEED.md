# Instagram-Feed

Konto: **https://www.instagram.com/elektro_ihlow/**

## Stand: eingebaut und direkt sichtbar

Die echten Beiträge sind ohne Zwischenschritt eingebunden. Sie laden beim
Scrollen (`loading="lazy"`) und lassen sich direkt in der Kachel abspielen.

| Seite | Position | Eingebundene Beiträge |
|---|---|---|
| Startseite | nach den Projekten, vor der Firmengeschichte | `Cq7jhMJoiEa`, `CqhnwADIZB3`, `CILln1_FXR7` |
| Karriereseite | nach den Team-Stimmen, vor dem Bewerbungs-Funnel | `CIGRjmoFssc`, `B-M6L28oeFf`, `B-J7Ospo2tS` |
| Reserve, nicht eingebaut | – | `B91g1CfphQY` |

Der Abschnitt steht bewusst weit oben und nicht am Seitenende: Bewegtbild von
echten Baustellen wirkt als Beleg, nicht als Deko.

## Abspielen
Die iframes bekommen `allow="autoplay; clipboard-write; encrypted-media;
picture-in-picture; web-share"` und `allowfullscreen`. Damit laufen Reels und
Videos in der Kachel, inklusive Ton-Steuerung und Vollbild.

## Datenschutz: offener Punkt für die Live-Seite
Die Einbettung lädt Inhalte von Meta, sobald der Beitrag in den Sichtbereich
kommt. Für die Demo ist das so gewollt (Entscheidung Bruno: "das machen wir
später auf jeden Fall mit den Cookies"). Vor dem Livegang gehört das in ein
Consent-Banner: Instagram erst nach Zustimmung laden.

Die vorherige Zwei-Klick-Lösung ist entfernt. **Die Karten auf der
Standorte-Seite haben sie weiterhin** – vor dem Livegang beides gleich
behandeln, entweder beides über das Cookie-Banner oder beides über zwei Klicks.

## Warum drei statt sechs Beiträge
Instagrams Einbettung rendert unter etwa 330 px Breite unsauber. Bei sechs
Spalten wären es rund 220 px. Das Raster läuft deshalb dreispaltig
(zwei ab 1100 px, eine ab 760 px).

## Beiträge austauschen
In `site/index.html` bzw. `site/karriere.html` im Block `.feed__grid--live`
den Code in der Adresse ersetzen:
```html
<iframe src="https://www.instagram.com/p/CODE/embed/captioned/" ...>
```
Der Code ist der Teil hinter `/p/` in der Beitragsadresse. Weitere Beiträge
einfach als zusätzliches `<li>` ergänzen.

## Für später: automatisch aktualisierender Feed
Wenn der Feed sich ohne unser Zutun aktualisieren soll, braucht es die Instagram
Basic Display API oder einen Feed-Dienst, jeweils mit Zugang vom Kundenkonto und
regelmäßiger Token-Erneuerung. Für die Demo und den Start nicht nötig.
