# Öffentliche Fotokarte im Hero

## Ziel

Das unabhängig hochgeladene öffentliche Camino-Foto wird innerhalb des grünen Hero-Bereichs angezeigt. Der bisherige große Fotoblock zwischen Hero und Tagebuch entfällt.

## Desktop-Layout

- Der vorhandene Hero-Inhalt wird in ein zweispaltiges Layout überführt.
- Überschrift, Einleitung und Routenleiste bleiben links.
- Das Foto sitzt rechts in der vom Nutzer markierten Fläche.
- Die Fotokarte ist ungefähr 360 × 250 Pixel groß, behält jedoch flexible Maximalbreiten für kleinere Desktopfenster.
- Sie erhält abgerundete Ecken, einen feinen hellen Rahmen, einen zurückhaltenden Schatten und einen kleinen goldenen Akzent.
- Das Bild nutzt `object-fit: cover`; der Fokus liegt leicht oberhalb der Mitte, damit die Gesichter sichtbar bleiben.

## Mobil-Layout

- Der Hero bleibt einspaltig.
- Die Fotokarte erscheint innerhalb des grünen Hero-Bereichs nach der Überschrift und vor dem Einführungstext.
- Sie nutzt die verfügbare Breite und ein kompaktes Querformat.
- Der bisherige große Fotoblock unterhalb des Hero wird auch mobil nicht mehr ausgegeben.

## Zustände und Datenfluss

- Die bestehende öffentliche Foto-API und Uploadlogik bleiben unverändert.
- Ist ein Foto vorhanden, wird die Fotokarte eingeblendet.
- Ist kein Foto vorhanden, bleibt sie vollständig verborgen und der Hero nutzt weiterhin den verfügbaren Platz ohne leere rechte Spalte.
- Die vorhandenen Sprachvarianten und alle Tagebuchfunktionen bleiben unverändert.

## Prüfung

- Automatischer Test stellt sicher, dass die Fotosektion innerhalb des Hero liegt und kein separater Fotoblock im Hauptinhalt verbleibt.
- Produktions-Build und vorhandene Tests müssen erfolgreich sein.
- Visuelle Prüfung erfolgt auf Desktop und Mobil mit dem aktuell hochgeladenen Foto.
