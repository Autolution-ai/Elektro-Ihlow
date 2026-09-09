# Instagram-Feed: was noch fehlt und wie er live geht

Konto: **https://www.instagram.com/elektro_ihlow/**

## Stand jetzt
Die Feed-Sektion ist auf **Startseite** und **Karriereseite** gebaut. Sie zeigt
sechs quadratische Kacheln, die auf das Profil verlinken, mit Hover-Zoom und
rotem Overlay. Jede Kachel trägt im Markup `data-insta-slot` — das sind die
Stellen, an denen später die echten Beiträge stehen.

## Was gebraucht wird, um echte Beiträge zu zeigen

**Variante A (empfohlen, kein Zugang nötig): Beitragslinks.**
Sechs Links auf öffentliche Beiträge oder Reels aus dem Konto, Format:
```
https://www.instagram.com/p/XXXXXXXXXXX/
https://www.instagram.com/reel/XXXXXXXXXXX/
```
Einfach im Browser den Beitrag öffnen und die Adresse kopieren. Damit lässt sich
Instagrams offizielle Einbettung nutzen, ganz ohne API-Zugang und ohne Passwort.
Einbau dauert wenige Minuten.

**Variante B (automatisch aktualisierend): API-Zugang.**
Instagram Basic Display API oder ein Feed-Dienst. Braucht einen Zugang vom
Kundenkonto und ist laufend zu erneuern. Nur sinnvoll, wenn der Feed sich ohne
unser Zutun aktualisieren soll. Für die Demo nicht nötig.

## Datenschutz
Die Instagram-Einbettung lädt Inhalte von Meta und setzt dabei Daten ab. Sie
bekommt deshalb dieselbe **Zwei-Klick-Lösung** wie die Karten auf der
Standorte-Seite: Vor der Zustimmung wird kein iframe erzeugt, also geht auch
keine Anfrage raus. Der Mechanismus liegt in `js/main.js` (`[data-map]`) und
lässt sich eins zu eins übernehmen.

Solange Platzhalter-Kacheln stehen, ist nichts zu tun: Sie sind lokale Bilder
und laden nichts von Dritten.

## Einbau, wenn die Links da sind
1. Je `<li data-insta-slot>` durch die Einbettung ersetzen:
   `https://www.instagram.com/p/<SHORTCODE>/embed/captioned/` im iframe.
2. Zwei-Klick-Muster davorschalten (Attribute `data-map`, `data-map-src`,
   `data-map-label` wiederverwenden oder auf `data-embed` umbenennen).
3. Seitenverhältnis der Kachel auf die Einbettung anpassen, Instagram liefert
   höher als quadratisch.
