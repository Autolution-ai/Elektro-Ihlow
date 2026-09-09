# Instagram-Feed

Konto: **https://www.instagram.com/elektro_ihlow/**

## Stand: eingebaut und aktiv

Die echten Beiträge sind eingebunden. Vor der Zustimmung stehen sechs lokale
Platzhalter-Kacheln, nach dem Klick werden drei echte Beiträge geladen.

| Seite | Eingebundene Beiträge |
|---|---|
| Startseite | `Cq7jhMJoiEa`, `CqhnwADIZB3`, `CILln1_FXR7` |
| Karriereseite | `CIGRjmoFssc`, `B-M6L28oeFf`, `B-J7Ospo2tS` |
| Reserve, nicht eingebaut | `B91g1CfphQY` |

## Datenschutz: Zwei-Klick-Lösung
Die Einbettung lädt Inhalte von Meta. Der iframe wird deshalb erst per
JavaScript erzeugt, wenn jemand auf "Echte Beiträge laden" klickt. Vorher
existiert kein Instagram-Element im DOM, es geht also keine Anfrage raus.
Gemessen: 0 Anfragen an instagram.com vor dem Klick, 3 danach.

Die Zustimmung gilt für die Sitzung (`sessionStorage`, gekapselt für den
privaten Modus). Gleiche Mechanik wie bei den Karten auf der Standorte-Seite.

## Warum nur drei statt sechs Beiträge
Instagrams Einbettung rendert unter etwa 330 px Breite unsauber. Bei sechs
Spalten wären es rund 220 px. Nach der Zustimmung schaltet das Raster deshalb
auf drei Spalten (zwei ab 1100 px, eine ab 760 px). Die Platzhalter-Ansicht
bleibt sechsspaltig, weil sie als Bildraster funktioniert.

## Beiträge austauschen
In `index.html` bzw. `karriere.html` das Attribut anpassen:
```html
<div class="feed__consent" data-embed-consent data-embed-posts="CODE1,CODE2,CODE3">
```
Der Code ist der Teil hinter `/p/` in der Beitragsadresse. Mehr als drei Codes
sind möglich, dann wird das Raster entsprechend länger.

## Für später: automatisch aktualisierender Feed
Wenn der Feed sich ohne unser Zutun aktualisieren soll, braucht es die Instagram
Basic Display API oder einen Feed-Dienst, jeweils mit Zugang vom Kundenkonto und
regelmäßiger Token-Erneuerung. Für die Demo und den Start nicht nötig.
