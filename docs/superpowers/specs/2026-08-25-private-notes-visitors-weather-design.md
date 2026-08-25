# Private Notizen, Besucherstatistik und 24-Stunden-Wetter

## Ziel

Der geschützte Bereich erhält getrennte private Tagesnotizen auf Deutsch und Russisch sowie eine datensparsame Besucherstatistik für die öffentliche Seite. Die bestehende Standort-Wetteransicht wird von 12 auf 24 Stunden erweitert und markiert den Beginn des nächsten Kalendertages.

## 1. Private Tagesnotizen

### Datenmodell und Migration

Tagebucheinträge verwenden künftig das kanonische Feld:

```js
privateNotes: {
  de: "...",
  ru: "..."
}
```

Beim Laden eines Altbestands wird das bisherige Feld `note` nach `privateNotes.de` übernommen. `privateNotes.ru` beginnt leer. Neue Speichervorgänge verwenden ausschließlich `privateNotes`; bestehende Etappen, GPX-Daten und öffentliche Beschreibungen bleiben unverändert.

### Oberfläche

Das Formular für eine neue Etappe zeigt zwei klar beschriftete private Textfelder: Deutsch und Russisch. Das vorhandene Dialogfenster „Etappe bearbeiten“ erhält dieselben beiden Felder, damit beide Notizen nachträglich geändert werden können. Die Beschriftungen der Oberfläche bleiben in Deutsch, Englisch und Russisch übersetzt; die Inhalte werden ausschließlich manuell eingegeben und niemals automatisch übersetzt.

### Datenschutzgrenze

Die Transformation für `/api/public-diary` liefert weder `privateNotes` noch das alte `note` aus. Tests prüfen diese Grenze ausdrücklich für beide Sprachen und für migrierte Altbestände.

## 2. Besucherstatistik

### Zählweise

Die öffentliche Seite erzeugt beim ersten Besuch eine zufällige anonyme Geräte-ID und speichert sie in `localStorage`. Bei jedem neuen Laden der öffentlichen Seite sendet sie diese ID an `POST /api/public-visit`.

Der Server bildet mit dem stabilen `SESSION_SECRET` einen HMAC-SHA-256-Hash. Gespeichert werden ausschließlich:

- der Kalendertag in `Europe/Berlin`,
- der anonyme Hash,
- die Anzahl der Seitenaufrufe dieses Geräts an diesem Tag.

IP-Adresse, Standort, Referrer, User-Agent, Fingerprinting-Merkmale und die ursprüngliche Geräte-ID werden nicht gespeichert. Ein gelöschter Browserspeicher oder ein anderes Gerät zählt als neuer Besucher; „Besucher“ ist deshalb bewusst eine ungefähre Gerätezahl.

### Persistenz

Eine neue, SQLite/D1- und PostgreSQL-kompatible Tabelle wird über die bestehende Schema-Initialisierung vor der ersten Anfrage angelegt:

```sql
CREATE TABLE IF NOT EXISTS camino_visit_daily (
  day TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  page_views INTEGER NOT NULL,
  PRIMARY KEY (day, visitor_hash)
)
```

Der Zähl-Endpunkt akzeptiert nur eine syntaktisch gültige, begrenzte anonyme ID. Ein Upsert erhöht `page_views`; derselbe Hash erzeugt pro Tag nur eine Zeile. Fehler beim Zählen werden im Browser ignoriert und dürfen Darstellung oder Navigation der öffentlichen Seite nicht beeinflussen.

### Auswertung und Zugriff

`GET /api/visitor-stats` liegt hinter der bestehenden Sitzungsauthentifizierung. Es liefert zwei Kennzahlen für drei Zeiträume:

| Zeitraum | Besucher | Seitenaufrufe |
| --- | ---: | ---: |
| Heute | unterschiedliche Hashes heute | Summe heute |
| Letzte 7 Tage | unterschiedliche Hashes in heute plus sechs Vortagen | Summe dieses Zeitraums |
| Insgesamt | unterschiedliche Hashes über alle Tage | Gesamtsumme |

Der geschützte Bereich zeigt diese Werte in einer kompakten Karte nahe der Verwaltung der öffentlichen Seite. Ladefehler erscheinen als unaufdringlicher Status und beeinträchtigen das Tagebuch nicht.

### Grenzen

Die Lösung ist keine forensisch genaue Webanalyse. Browserdaten können gelöscht werden, mehrere Personen können ein Gerät teilen und automatisierte Browser können JavaScript ausführen. Externe Analyse-, Werbe- oder Trackingdienste werden nicht eingebunden.

## 3. Wetter für die nächsten 24 Stunden

Die bestehende Open-Meteo-Anfrage liefert bereits zwei Vorhersagetage und benötigt keinen zusätzlichen Dienst. Der Stundenverlauf rendert künftig 24 statt 12 aufeinanderfolgende Stunden ab der aktuellen Stunde.

Beim ersten Wechsel des Datums erhält die betreffende Stundenkarte:

- eine sichtbare vertikale Trennlinie,
- eine Beschriftung „Morgen“, „Tomorrow“ oder „Завтра“ entsprechend der aktiven Sprache,
- weiterhin die konkrete Uhrzeit, etwa `00:00`.

Wenn innerhalb der dargestellten 24 Karten kein Datumswechsel liegt, wird kein künstlicher Trenner eingefügt. Der vorhandene horizontale Scroll-Verlauf und die mobile Darstellung bleiben erhalten.

## 4. Fehlerbehandlung und Sicherheit

- Besucherzählung ist öffentlich schreibbar, aber streng auf das kleine erwartete JSON-Format und die gleiche Herkunft begrenzt.
- Statistikdaten sind ausschließlich authentifiziert lesbar.
- Private Notizen werden serverseitig aus öffentlichen Antworten entfernt, nicht nur in der Oberfläche versteckt.
- Wetter- und Trackingfehler werden getrennt behandelt; keiner der beiden Dienste blockiert die Hauptseite.
- Das bestehende Größenlimit für den gemeinsamen Zustand bleibt bestehen.

## 5. Tests und visuelle Prüfung

Automatisierte Tests decken ab:

1. Migration von `note` nach `privateNotes.de`.
2. Speicherung und Bearbeitung deutscher und russischer privater Notizen.
3. Ausschluss sämtlicher privater Notizen aus `/api/public-diary`.
4. Upsert-Verhalten für Seitenaufrufe und unterschiedliche Besucher.
5. Aggregation für heute, sieben Tage und insgesamt.
6. Authentifizierung des Statistik-Endpunkts und Validierung des öffentlichen Zähl-Endpunkts.
7. Rendering von 24 Stunden und Markierung des ersten Datumswechsels in allen drei Oberflächensprachen.

Nach der Testsuite werden der Notiz-Editor, die Statistik-Karte und der 24-Stunden-Verlauf im lokalen Browser auf Desktop- und Handybreite geprüft. Erst ein lesbares, nicht abgeschnittenes Ergebnis gilt als abgeschlossen.
