# Changelog

Alle wichtigen Änderungen an der Camino-Packliste werden in dieser Datei
dokumentiert.

Der Changelog wurde am 29. Juli 2026 nachträglich anhand der Projekt-,
GitHub- und Bereitstellungshistorie rekonstruiert. Die Versionsnummern fassen
die bisherigen Entwicklungsschritte verständlich zusammen.

Das Format orientiert sich an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/).

## Noch nicht veröffentlicht

### Hinzugefügt

- Englischer Sprachmodus für Anmeldung, Packlisten-Oberfläche, alle
  Standardgegenstände und die animierte Packanleitung.
- Scrollgesteuerte Rucksack-Packanleitung mit Vorder- und Seitenansicht.
- Je 100 optimierte Einzelbilder für Desktop und Mobilgeräte.
- Fünf animierte Kapitel zu Orientierung, unterer Packzone, Schwerpunkt,
  Schnellzugriff und Abschlussprüfung.
- Deutsche und russische Texte für die vollständige Packanleitung.
- Statische, vollständig lesbare Darstellung bei aktivierter Einstellung
  „Bewegung reduzieren“.
- Standardpositionen und eigene Gegenstände können aus jeder der drei Listen
  gelöscht werden.
- Vor dem Löschen erscheint eine Bestätigung mit Gegenstands- und Listenname.
- Gelöschte Standardpositionen werden im gemeinsamen Speicher gesichert und
  auf allen angemeldeten Geräten ausgeblendet.

### Geändert

- Die Animation lädt nur wichtige Startbilder sofort und die übrigen Bilder
  anschließend in kleinen Paketen nach.
- Desktop und Mobilgeräte erhalten jeweils den passend zugeschnittenen
  Originalclip ohne automatische Tonwiedergabe.
- „Alles zurücksetzen“ stellt auch gelöschte Standardpositionen wieder her und
  erklärt vollständig, welche gemeinsamen Anpassungen entfernt werden.

## 0.4.0 – 29. Juli 2026

### Hinzugefügt

- Alle drei Packlisten können individuell umbenannt werden.
- Jeder Standardgegenstand und jeder eigene Gegenstand kann umbenannt werden.
- Selbst vergebene Namen werden im gemeinsamen Speicher gesichert und zwischen
  den Geräten synchronisiert.
- Eine leere Eingabe stellt den jeweiligen Standardnamen wieder her.

### Geändert

- Eigene Namen bleiben beim Wechsel zwischen Deutsch und Russisch unverändert.
- Die Auswahl für neue Gegenstände verwendet ebenfalls die selbst vergebenen
  Listennamen.

## 0.3.0 – 29. Juli 2026

### Hinzugefügt

- Sprachumschalter für Deutsch und Russisch auf der Anmeldeseite und in der
  Packliste.
- Vollständige russische Übersetzung der Bedienoberfläche.
- Russische Namen, Kategorien und Hinweise für alle 71 Standardgegenstände.
- Die gewählte Sprache wird pro Gerät gespeichert.

### Geändert

- Statusmeldungen, Filter, Formulare, Bestätigungsdialoge und Hilfetexte passen
  sich an die gewählte Sprache an.
- Die Sprache ist eine persönliche Geräteeinstellung und verändert den
  gemeinsamen Packlistenstand nicht.

## 0.2.1 – 29. Juli 2026

### Behoben

- Zeitstempel für die PostgreSQL-Synchronisation korrigiert.
- Gemeinsame Speicherung nach einem Deployment stabilisiert.

### Geändert

- Texte zur Synchronisation zwischen mehreren Geräten verständlicher formuliert.
- Offline- und Speicherstatus deutlicher dargestellt.

## 0.2.0 – 29. Juli 2026

### Hinzugefügt

- Öffentliche Bereitstellung über Coolify mit eigener Domain.
- Vorgeschaltete Anmeldung mit gemeinsamem Zugangscode.
- Sichere, 30 Tage gültige Sitzung nach erfolgreicher Anmeldung.
- Schutz vor zu vielen fehlgeschlagenen Anmeldeversuchen.
- Gemeinsamer PostgreSQL-Speicher für Häkchen, Gewichte und eigene Gegenstände.
- Docker-Compose-Konfiguration mit dauerhaftem Datenbank-Volume.
- Gesundheitsprüfung für Anwendung und Datenbank.
- Dokumentation für Installation und Betrieb in Coolify.

### Sicherheit

- Packlisteninhalt und Schnittstellen sind nur nach Anmeldung erreichbar.
- Suchmaschinen werden angewiesen, die Anwendung nicht zu indexieren.
- Sicherheits-Header und Größenbegrenzungen für gespeicherte Daten ergänzt.

## 0.1.0 – 16. Juli 2026

### Hinzugefügt

- Erste interaktive Camino-Packliste für zwei Personen.
- Getrennte Listen für beide Personen und gemeinsam getragene Gegenstände.
- 71 vorbereitete Standardgegenstände mit Kategorie, Gewicht, Priorität und
  Trageart.
- Fortschrittsanzeige und automatische Berechnung des Rucksackgewichts.
- Suche und Filter für Pflicht-, sinnvolle und optionale Gegenstände.
- Veränderbare Gewichte für jeden Gegenstand.
- Eigene Gegenstände mit Bezeichnung, Gewicht und Priorität.
- Druckansicht und Möglichkeit zum Zurücksetzen der Liste.
- Geräteinterne Speicherung als Grundlage der ersten Version.
