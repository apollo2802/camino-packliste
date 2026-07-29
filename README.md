# Camino-Packliste

Interaktive Packliste für zwei Personen auf dem Camino Portugués. Die Anwendung bietet:

- getrennte Listen für beide Personen und gemeinsam getragene Gegenstände
- eigene Ergänzungen mit Gewicht und Priorität
- automatische Berechnung von Fortschritt und Rucksackgewicht
- gemeinsame Speicherung auf mehreren Geräten
- eine vorgeschaltete Loginmaske mit gemeinsamem Zugangscode

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

Die Packliste wird in PostgreSQL gespeichert. Das Docker-Volume `camino_database` sorgt dafür, dass die Daten bei neuen Deployments erhalten bleiben. Für zusätzliche Sicherheit sollte in Coolify regelmäßig ein Datenbank-Backup eingerichtet werden.

Beim ersten Öffnen einer noch leeren Installation wird ein bereits im Browser vorhandener Packlistenstand automatisch in den gemeinsamen Speicher übernommen.

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
