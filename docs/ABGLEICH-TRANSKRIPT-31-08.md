# Abgleich: Was André am 31.08. gesagt hat, was heute auf der Seite steht

> Grundlage: beide Mitschriften vom 31.08. (38 min + 8 min), Zeile für Zeile
> durchgegangen. Geprüft am Live-Stand vom 07.10. (Deployment `21e32c9`,
> identisch mit `main`, Zustand READY).
>
> ✅ erledigt und belegbar · 🟡 angefangen, nicht fertig · 🔴 nicht angefasst ·
> ⚪ nicht Website, sondern Angebot

---

## A. Was er konkret gefordert hat

| # | Sein O-Ton | Status | Heutiger Stand, nachprüfbar |
|---|---|---|---|
| 1 | „Die Seite, die muss einfach aktualisiert werden und die muss zeit[gemäß]" (2:39) | ✅ | Er hat das selbst bestätigt: „ist zeitgemäß" (12:31) und „die ist schon modern, definitiv" (2:54 im zweiten Teil). |
| 2 | „dass man dann auch von dort aus gleich auf Stellenausschreibung kommt" (2:39) | ✅ | Startseite: 6 Links zu den Stellen, 4 direkt in den Funnel, dazu Knopf im Kopfbereich jeder Seite und Band direkt unter dem Hero. Über uns und Standorte verlinken je 3 bzw. 2 mal in den Funnel. |
| 3 | „Wird man nicht, ehrlich gesagt. **Ich bin ein bisschen abgehoben.**" (5:49) | ✅ | Suche nach seinen Auslösern über alle 5 Seiten: „nicht erst seit gestern" 0, „jeden Auftrag" 0, „Auftragsbücher" 0, „ablehnen" 0, „bangen" 0, „übernächsten Jahr" 0, „Viele Betriebe reden" 0. Der Block heißt jetzt „Warum Kunden wiederkommen" und endet mit: „Wird es terminlich eng, sagen wir Ihnen das offen, statt Sie hinzuhalten." |
| 4 | Zum Funnel: „Ja, klar. Ist gut." (9:05) | ✅ | Unverändert geblieben und erweitert. Die doppelte Erfahrungsfrage, die Jonas im Gespräch zweimal durchklicken musste, ist zu einer geworden. |
| 5 | Jonas' Zusage: Freitextfeld für die Motivation, „vielleicht wie man auf Sie aufmerksam geworden ist", optionaler Lebenslauf (8:00 und 9:09) | ✅ | Alle drei da. Kanalfrage als eigener Schritt (Instagram, Google, Empfehlung, Fahrzeug oder Baustelle gesehen, Sonstiges). Freitext und Lebenslauf erst nach dem Absenden, damit der Kontakt vorher gesichert ist. |
| 6 | „der Instagram-Funnel, da würde ich auch Unterstützung haben. **Das müsste dann alles schon mit drin sein.**" (35:33) | ✅ | `bewerben.html`: eigene Seite ohne Navigation, startet direkt mit der ersten Frage. Ziel für Link-in-Bio und Anzeigen. Dazu sechs echte Beiträge von @elektro_ihlow in der Seite, Reels abspielbar. |
| 7 | „inhaltlich ist es noch nicht so, wie ich es mir vorstelle" (12:31) | 🟡 | Drei sachliche Fehler korrigiert: Rauchmelder und Antennen waren als „nicht unser Geschäft" bezeichnet (auf seiner Seite sind beides Leistungen mit eigener Seite), der Hauptsitz stand auf Biesenthal statt Berlin, und „Elektriker / Monteur" wurde beworben, war aber nicht als Stelle gelistet. Alles Erfundene ist jetzt sichtbar als Demo markiert. **Seine echten Inhalte fehlen weiter, die kann nur er liefern.** |
| 8 | „ich brauche selbst auch ein bisschen Zeit dafür, um mich damit auseinanderzusetzen, inhaltlich, Bilder etc." (28:15) | ✅ | Genau darauf ausgelegt: jeder Platzhalter ist im Design markiert und sagt, welches Motiv dort hingehört. Dazu eine fertige Aufnahmeliste (`docs/FOTO-SHOOTING.md`). Er muss nicht überlegen, was gebraucht wird, sondern nur abhaken. |
| 9 | „Ich muss mich natürlich schon ein bisschen catchen." (13:37) / „die muss mich kriegen irgendwie" (2:32) | 🟡 | Vier Elemente eingebaut, die nur zu ihm passen: „Die Leitung" (der Blitz aus seinem Logo zeichnet sich beim Scrollen), das Generationen-Band 1946 / 1979 / 2004 mit Gerhard, Jörg-Reinhard und André, das Format „Gefragt, geantwortet", der Blitz als Hintergrundmotiv. Ob das für ihn das „wow" ist, wissen wir nicht. Siehe Abschnitt B. |
| 10 | „**Noch ist es so wie jeder andere**, sag ich mal. Aber es geht schon besser wie unser." (13:46) | 🟡 | Siehe Punkt 9 und Abschnitt B1. |
| 11 | „der hat so ein Händchen dafür, **das Persönliche rauszukitzeln** … ich will es nicht nur wirken, sondern **es ist ja meins**" (32:00) | 🟡 | Die Formate stehen: O-Ton mit Porträt, drei Zitatplätze für Mitarbeiter, Instagram in der Seite. Gefüllt sind sie mit gekennzeichneten Entwürfen. Das Persönliche kann erst echt werden, wenn er zwanzig Minuten spricht. |
| 12 | Jonas' Zusage: „alles über die DSGVO geregelt", laufende Datenschutz-Konformität (14:00 und 20:19) | 🟡 | Der Bewerbungsweg sammelt nur, was nötig ist. **Aber:** Karte und Instagram laden in der Demo ohne Einwilligung. Siehe B3. |
| 13 | Jonas' Zusage: „suchmaschinenfreundliche Struktur", „Meta-Grundlagen, interne Verlinkungen, technische Auffindbarkeit" (22:00) | 🟡 | Titel und Beschreibung auf allen fünf Seiten gesetzt, eine H1 je Seite, Überschriftenhierarchie sauber, interne Verlinkung dicht. **Fehlt:** `sitemap.xml`, `robots.txt`, canonical-Angaben, Open-Graph-Bilder, LocalBusiness-Auszeichnung für die beiden Standorte. Siehe B4. |
| 14 | Jonas' Zusage: Responsive auf Desktop, Tablet und Smartphone (23:00) | ✅ | Auf 360, 390, 768, 1280, 1440 und 1920 Pixel geprüft. Kein horizontaler Überlauf, keine Skriptfehler, Bewerbungsweg bis zum Danke-Schritt durchgespielt. Vier kritische Fehler wurden dabei behoben. |

---

## B. Was offen ist, und was ich empfehle

### B1. 🔴 Der eine Satz, den wir nicht beantwortet haben

Jonas hat im zweiten Teil genau nachgefragt: „Waren das mehr so die Texte oder
der Aufbau der Seite?" Antwort:

> „**Nö, das ist der Aufbau einfach nur. So wie jedes Mal.** Seite halt
> aufgebaut ist, ja, die ist schon modern, definitiv. Also nicht so wie meine.
> Ja, das ist schon richtig, aber es ist jetzt nicht so, wow. **Ich will schon
> mich ein bisschen abheben.**" (2:54)

Er sagt damit ausdrücklich: es sind **nicht** die Texte, es ist der Aufbau.
Unsere Arbeit seit dem Gespräch ging überwiegend in Tonalität und Inhalte. Am
Aufbau haben wir ergänzt (Trennelemente, Generationen-Band, breiteres Raster,
Instagram weit oben), aber die Reihenfolge der Startseite ist immer noch die
übliche: Hero, Vertrauen, Karriere, Leistungen, Projekte, Instagram,
Geschichte, Standorte.

**Das ist die größte Lücke vor dem Termin.** Wenn wir nur die Textänderungen
zeigen, antworten wir auf eine Frage, die er nicht gestellt hat.

Mein Vorschlag, in der Reihenfolge der Wirkung:
1. **Ein inszenierter Einstieg statt Bild plus Text daneben.** Zum Beispiel der
   Blitz, der sich über die volle Breite zieht und die Jahreszahl 1946 freilegt,
   bevor der Inhalt kommt. Ein Moment, nicht die ganze Seite.
2. **Die Startseite um sein Ziel herum bauen, nicht um die Firma.** Recruiting
   ist sein Flaschenhals. Denkbar: der Karriere-Teil nicht als Abschnitt in der
   Mitte, sondern als tragende Hälfte der Startseite, gleichwertig neben dem
   Kundenweg. Zwei Wege, sichtbar getrennt, ab der ersten Bildschirmhöhe.
3. **Weg von der Abschnittsliste.** Mindestens zwei Stellen, an denen Inhalt
   nicht als nächster Block untereinander kommt, sondern seitlich läuft oder
   stehen bleibt, während sich daneben etwas ändert.

Das ist Arbeit an der Struktur, nicht Kosmetik. Vor einem Termin nächste Woche
schaffen wir eins bis zwei davon seriös, nicht alle drei.

**Stand 07.10.: Punkt 1 umgesetzt, anders als oben skizziert.** Statt eines
Vorspanns vor dem Inhalt ersetzt eine Leitung die Kennzahlen-Reihe im Hero.
Sie läuft vom Fensterrand durch 1946 (Gerhard), 1979 (Jörg-Reinhard) und 2004
(André) bis zu einem roten Blitz bei „heute" und endet gestrichelt im Offenen,
mit dem Link zu den offenen Stellen. Damit wird die Überschrift „Jetzt suchen
wir die nächste Generation" sichtbar eingelöst. Die Linie zeichnet sich nach
dem Hero-Text Punkt für Punkt, nichts blockiert das Lesen. Jahreszahlen und
Rollen gegen die „Über uns"-Seite der Altseite geprüft.

**Stand 07.10.: Punkt 3 umgesetzt, an zwei Stellen.**
- *Leistungen als stehendes Schaltfeld:* Links bleibt das Bild stehen, ein
  Index markiert in Rot den Bereich, der gerade die Fenstermitte kreuzt.
  Rechts laufen die fünf Bereiche vorbei, die nicht aktiven treten zurück.
  Jeder Bereich nennt jetzt seine Einzelleistungen aus dem Menü der Altseite,
  damit stehen alle 15 Leistungen auch im Inhalt, nicht nur im Menü.
- *Projekte als seitliche Fahrt:* Die Projektarten laufen in einer Spur
  rechts aus dem Fenster, mit Pfeilen, Wischen auf dem Telefon und einer
  Leitung darunter als Fortschritt. Natives Scrollen, das Mausrad wird
  nicht umgelenkt.

Punkt 2 (zwei getrennte Wege ab der ersten Bildschirmhöhe) offen, berührt
die Entscheidung „Projekt anfragen" als Hauptweg.

### B2. 🔴 Sein eigener Aufhänger liegt ungenutzt da

Er hat beiläufig erzählt, warum er dem Wettbewerber vertraut:

> „der ist ja nun mal im Vorstand vom Sportverein, **den wir sponsoren**" (31:16)

Elektro Ihlow sponsert also einen Sportverein. Auf der Seite steht dazu kein
Wort. Regionales Engagement ist genau das „Persönliche", das er vermisst, und
es ist nachprüfbar wahr, nicht erfunden. Welcher Verein es ist, wissen wir
nicht, das müsste er sagen.

Nebenbei ist es das stärkste Argument gegen den Wettbewerber, das er uns selbst
geliefert hat: seine Nähe zu dem Mann kommt aus dem Verein, nicht aus der
Arbeit.

### B3. 🟡 Datenschutz widerspricht gerade dem Verkaufsargument

Jonas hat Datenschutz im Gespräch ausführlich als Leistung verkauft. Seit
letzter Woche laden Karte und Instagram in der Demo ohne Einwilligung, weil du
entschieden hast, das über das Cookie-Banner zu lösen. Für die Live-Seite ist
das richtig. Für einen Termin, in dem Datenschutz ein Argument war, ist es
angreifbar, falls er oder der Wettbewerber draufschaut.

Zwei Möglichkeiten: entweder das Banner vor dem Termin einbauen, oder den Punkt
aktiv ansprechen, bevor er auffällt. Beides ist vertretbar, aber es sollte eine
Entscheidung sein und kein Zufall.

### B4. 🟡 SEO ist zugesagt, aber nur halb da

Titel, Beschreibungen, Überschriften und interne Verlinkung stehen. Was fehlt,
ist in wenigen Stunden machbar und im Termin zeigbar:

- **LocalBusiness-Auszeichnung** für Biesenthal und Berlin, mit Adresse,
  Telefon und Öffnungszeiten. Für einen Handwerksbetrieb mit zwei Standorten
  der direkteste Hebel bei Google.
- **Open-Graph-Bild.** Wenn er `bewerben.html` in einer Instagram-Story oder
  per WhatsApp teilt, erscheint im Moment ein nackter Link ohne Vorschaubild.
  Das fällt sofort auf und wirkt unfertig, gerade beim Instagram-Weg.
- `sitemap.xml`, `robots.txt`, canonical-Angaben.
- **Eigene Seiten für die 15 Leistungen.** Der große Hebel, aber nicht in einer
  Woche.

### B5. ⚪ Was nicht die Website löst

Diese Punkte gehören ins Angebot, nicht in den Code. Sie stehen hier, damit sie
im Termin nicht untergehen:

- **„Das muss als Team zur Verfügung stehen"** (0:37 im zweiten Teil). Er nennt
  Videos, Fotos, Mindsetting, Website-Aufbau als vier Rollen. Er kauft kein
  Werkzeug, er kauft eine Mannschaft.
- **Video.** Was ihn beim Wettbewerber überzeugt hat, war nicht eine Website,
  sondern dessen Instagram-Aktivität und Videos („ich hab die ja ein bisschen
  gestalkt", 31:46). Unsere Instagram-Einbettung spielt seine eigenen Reels,
  das ist ein Anfang. Eigene Videoproduktion ist es nicht.
- **Fotoshooting.** Er hat es als Vorteil des Wettbewerbers genannt, Jonas hat
  500 Euro angeboten. Die Aufnahmeliste liegt fertig vor, das macht das Angebot
  konkret.
- **Vertrauen und Zeit.** „Das ist einfach ein Gefühl, kannst du einfach nicht
  sagen" (37:04) und „nicht vor vier bis acht Wochen". Der Termin am 12.10.
  liegt in genau diesem Fenster.

---

## C. Ehrliches Fazit

**Belegbar erledigt:** Tonalität, Weg zu den Stellen, Funnel samt Zusagen,
Instagram-Funnel, Faktenfehler, Responsive, der minimale Aufwand für ihn.

**Teilweise:** Inhalte (seine fehlen), Persönlichkeit (Formate stehen, Stimmen
fehlen), SEO, Datenschutz.

**Nicht angefasst:** der Aufbau, obwohl er genau das als seinen einzigen
Kritikpunkt benannt hat. Und sein Sponsoring, das er selbst ins Gespräch
gebracht hat.

Wenn wir vor dem 12.10. noch etwas bauen, dann B1 und B2, nicht mehr Text.
