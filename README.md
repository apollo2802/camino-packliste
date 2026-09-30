# Camino-Packliste

Interaktive Packliste für zwei Personen auf dem Camino Portugués. Die Anwendung bietet:

- getrennte Listen für beide Personen und gemeinsam getragene Gegenstände
- eigene Ergänzungen mit Gewicht und Priorität
- automatische Berechnung von Fortschritt und Rucksackgewicht
- gemeinsame Speicherung auf mehreren Geräten
- eine vorgeschaltete Loginmaske mit gemeinsamem Zugangscode
- vollständige Bedienung auf Deutsch und Russisch
- umbenennbare Listen und Gegenstände

Die bisherige Entwicklung ist im [Changelog](CHANGELOG.md) dokumentiert.

## In Coolify bereitstellen

1. In Coolify ein Projekt öffnen und **New Resource** wählen.
2. **Public Repository** auswählen und diese URL eintragen:
   `https://github.com/apollo2802/camino-packliste`
3. Als Build Pack **Docker Compose** auswählen.
4. Als Compose-Datei `/docker-compose.yml` verwenden.
5. Der Anwendung `app` eine Domain zuweisen und dabei den Container-Port `3000` auswählen.
6. In Coolify diese drei Variablen mit eigenen sicheren Werten anlegen:

   - `ACCESS_CODE` – gemeinsamer Code für euch beide, mindestens 10 Zeichen
   - `SESSION_SECRET` – langer zufälliger Wert mit mindestens 32 Zeichen
   - `POSTGRES_PASSWORD` – langes zufälliges Datenbankpasswort

7. Deployment starten.

Zugangscode und Passwörter gehören ausschließlich in die Coolify-Variablen und niemals in GitHub.

## Datenspeicherung

Die Packliste wird in PostgreSQL gespeichert. Das Docker-Volume `camino_database` sorgt dafür, dass die Daten bei neuen Deployments erhalten bleiben. Hochgeladene öffentliche Fotos liegen getrennt im Volume `camino_media`. Für zusätzliche Sicherheit sollten in Coolify beide Volumes regelmäßig gesichert werden.

Beim ersten Öffnen einer noch leeren Installation wird ein bereits im Browser vorhandener Packlistenstand automatisch in den gemeinsamen Speicher übernommen.

### Schutz vor automatisierten Anfragen

Die Anmeldung erlaubt gemeinsam höchstens 20 erfolglose Versuche innerhalb von 15 Minuten. Manipulierbare IP-Header ändern diese Grenze nicht. Erfolgreiche Anmeldungen setzen den Zähler zurück; fehlerhafte Anmeldeformate zählen ebenfalls als Versuch. Nach Ausschöpfen der Grenze müssen beide Personen bis zum Ende des Zeitfensters warten. Bereits angemeldete Sitzungen bleiben nutzbar.

Der öffentliche Besucherzähler akzeptiert höchstens 60 Statistik-Schreibzugriffe pro Minute und speichert insgesamt höchstens 10.000 Tages-Besucher-Datensätze. Wiederholte Aufrufe desselben Besuchers am selben Tag benötigen keinen weiteren Datensatz, unterliegen aber ebenfalls dem Minutenlimit. Vorhandene Daten werden nicht gelöscht. Bei ausgeschöpftem Limit werden neue Einträge mit HTTP 429 abgewiesen; die Webseite selbst bleibt verfügbar. Auch ein bekannter Besucher benötigt am nächsten Tag einen neuen Datensatz. Die Zähler können deshalb bei hoher Last oder voller Speicherung weniger Aufrufe anzeigen als tatsächlich erfolgt sind. Eine bereits größere Datenbank wird nicht automatisch verkleinert, wächst über diesen Endpunkt aber nicht weiter.

Die Grenzen werden in PostgreSQL gespeichert und gelten auch nach Neustarts sowie gemeinsam für mehrere App-Instanzen. Besucherzulassung und Speicherprüfung erfolgen in einer gemeinsamen `READ COMMITTED`-Transaktion.

## Lokal entwickeln

```bash
pnpm install
pnpm dev
```

Für einen vollständigen lokalen Docker-Test:

```bash
cp .env.example .env
docker compose up --build
```
