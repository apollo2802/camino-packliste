import React from "react";

const pageMarkup = `
  <div class="site-shell">
    <header class="hero">
      <nav class="topbar" aria-label="Hauptnavigation" data-i18n-aria="nav.main">
        <a class="brand" href="#top" aria-label="Camino-Packliste Startseite" data-i18n-aria="nav.home">
          <span class="brand-mark" aria-hidden="true">✦</span>
          <span>CAMINHO · 2026</span>
        </a>
        <div class="top-actions">
          <span class="sync-status" id="sync-status" role="status">Gemeinsamer Speicher wird geladen …</span>
          <div class="language-switch" role="group" aria-label="Sprache auswählen" data-i18n-aria="language.label">
            <button class="language-button active" type="button" data-language="de" aria-pressed="true">DE</button>
            <button class="language-button" type="button" data-language="en" aria-pressed="false">EN</button>
            <button class="language-button" type="button" data-language="ru" aria-pressed="false">RU</button>
          </div>
          <button class="ghost-button" id="print-button" type="button" data-i18n="nav.print">Drucken</button>
          <a class="ghost-button diary-link" href="#tagebuch" data-i18n="nav.diary">Tagebuch</a>
          <button class="ghost-button danger-subtle" id="reset-button" type="button" data-i18n="nav.reset">Zurücksetzen</button>
          <a class="ghost-button" href="/logout" data-i18n="nav.logout">Abmelden</a>
        </div>
      </nav>

      <div class="hero-grid" id="top">
        <div class="hero-copy">
          <p class="eyebrow">PORTO → SANTIAGO DE COMPOSTELA</p>
          <h1><span data-i18n="hero.title1">Leicht packen.</span><br><em data-i18n="hero.title2">Weit gehen.</em></h1>
          <p class="hero-text" data-i18n="hero.copy">
            Eure gemeinsame Packliste für 12–13 Tage zwischen Atlantik,
            Albergues und dem Ziel vor der Kathedrale.
          </p>
          <div class="route-line" aria-label="Reiseverlauf" data-i18n-aria="route.label">
            <span><b data-i18n="route.summer">Spätsommer</b> Porto</span>
            <i aria-hidden="true"></i>
            <span data-i18n="route.coast">Küstenweg</span>
            <i aria-hidden="true"></i>
            <span data-i18n="route.central">Zentralroute</span>
            <i aria-hidden="true"></i>
            <span><b data-i18n="route.days">12–13 Tage</b> Santiago</span>
          </div>
        </div>

        <aside class="weight-card" aria-label="Gewichtsziel" data-i18n-aria="weight.label">
          <span class="card-kicker" data-i18n="weight.target">Ziel pro Rucksack</span>
          <strong>5,5–6,5 <small>kg</small></strong>
          <p data-i18n="weight.base">Grundgewicht – ohne Wasser, Essen und getragene Kleidung.</p>
          <div class="mini-rule"><span></span></div>
          <p class="small-note" data-i18n="weight.note">Am Morgen etwa 6,8–8,2 kg. Möglichst unter 10 % des Körpergewichts bleiben.</p>
        </aside>
      </div>
    </header>

    <main class="main-content">
      <section class="overview" aria-labelledby="overview-title">
        <div>
          <p class="section-label" data-i18n="overview.label">Euer Fortschritt</p>
          <h2 id="overview-title" data-i18n="overview.title">Was schon im Rucksack ist</h2>
        </div>
        <div class="overview-grid">
          <article class="stat-card">
            <span data-i18n="overview.important">Pflicht & sinnvoll</span>
            <strong id="overall-progress">0 %</strong>
            <small id="overall-detail">Noch nichts abgehakt</small>
          </article>
          <article class="stat-card accent-card">
            <span data-i18n="overview.weight">Aktuelles Gewicht</span>
            <strong id="current-weight">0,0 kg</strong>
            <small data-i18n="overview.weightDetail">Abgehakte Rucksackgegenstände</small>
          </article>
          <article class="stat-card">
            <span data-i18n="overview.profile">Reiseprofil</span>
            <strong>2 × 13</strong>
            <small data-i18n="overview.profileDetail">Personen × maximale Wandertage</small>
          </article>
        </div>
      </section>

      <section class="checklist-section" aria-labelledby="checklist-title">
        <div class="section-heading">
          <div>
            <p class="section-label" data-i18n="checklist.label">Interaktive Liste</p>
            <h2 id="checklist-title" data-i18n="checklist.title">Packen ohne Doppeltes</h2>
          </div>
          <p data-i18n="checklist.copy">Die Häkchen, Gewichte und eigenen Gegenstände werden zwischen euren Geräten synchronisiert.</p>
        </div>

        <div class="profile-tabs" role="tablist" aria-label="Packlisten auswählen" data-i18n-aria="profiles.label">
          <div class="profile-tab-shell">
            <button class="profile-tab active" data-profile="p1" role="tab" aria-selected="true">
              <span class="avatar">1</span><span class="tab-copy"><b data-profile-name="p1">Meine Liste</b><small id="p1-tab-meta">0 von 0</small></span>
            </button>
            <button class="rename-button rename-profile" data-rename-profile="p1" type="button" aria-label="Meine Liste umbenennen">✎</button>
          </div>
          <div class="profile-tab-shell">
            <button class="profile-tab" data-profile="p2" role="tab" aria-selected="false">
              <span class="avatar coral">2</span><span class="tab-copy"><b data-profile-name="p2">Liste meiner Frau</b><small id="p2-tab-meta">0 von 0</small></span>
            </button>
            <button class="rename-button rename-profile" data-rename-profile="p2" type="button" aria-label="Liste meiner Frau umbenennen">✎</button>
          </div>
          <div class="profile-tab-shell">
            <button class="profile-tab" data-profile="shared" role="tab" aria-selected="false">
              <span class="avatar gold">↔</span><span class="tab-copy"><b data-profile-name="shared">Gemeinsam</b><small id="shared-tab-meta">0 von 0</small></span>
            </button>
            <button class="rename-button rename-profile" data-rename-profile="shared" type="button" aria-label="Gemeinsam umbenennen">✎</button>
          </div>
        </div>

        <div class="toolbar">
          <label class="search-field">
            <span aria-hidden="true">⌕</span>
            <span class="sr-only" data-i18n="search.label">Gegenstände suchen</span>
            <input id="search-input" type="search" placeholder="Gegenstand suchen …" data-i18n-placeholder="search.placeholder" autocomplete="off">
          </label>
          <div class="filter-pills" aria-label="Priorität filtern" data-i18n-aria="filters.label">
            <button class="filter-pill active" data-filter="all" type="button" data-i18n="filters.all">Alle</button>
            <button class="filter-pill" data-filter="must" type="button" data-i18n="priority.must">Pflicht</button>
            <button class="filter-pill" data-filter="recommended" type="button" data-i18n="priority.recommended">Sinnvoll</button>
            <button class="filter-pill" data-filter="optional" type="button" data-i18n="priority.optional">Optional</button>
          </div>
        </div>

        <div class="list-summary" aria-live="polite">
          <div class="progress-ring" id="profile-ring"><span>0%</span></div>
          <div>
            <strong id="profile-title">Meine Liste</strong>
            <p id="profile-summary">0 Gegenstände · 0,0 kg eingepackt</p>
          </div>
          <div class="legend">
            <span><i class="dot must"></i><span data-i18n="priority.must">Pflicht</span></span>
            <span><i class="dot recommended"></i><span data-i18n="priority.recommended">Sinnvoll</span></span>
            <span><i class="dot optional"></i><span data-i18n="priority.optional">Optional</span></span>
          </div>
        </div>

        <div id="checklist" class="checklist" aria-live="polite"></div>

        <form class="add-item" id="add-item-form">
          <div>
            <span class="add-icon" aria-hidden="true">＋</span>
            <div><strong data-i18n="custom.title">Eigenen Gegenstand ergänzen</strong><small data-i18n="custom.copy">Wird gemeinsam gespeichert und im Gesamtgewicht berücksichtigt.</small></div>
          </div>
          <label><span class="sr-only" data-i18n="custom.selectList">Liste auswählen</span><select id="custom-profile" aria-label="Liste auswählen" data-i18n-aria="custom.selectList"><option value="p1" data-i18n="profiles.p1">Meine Liste</option><option value="p2" data-i18n="profiles.p2">Liste meiner Frau</option><option value="shared" data-i18n="profiles.shared">Gemeinsam</option></select></label>
          <label><span class="sr-only" data-i18n="custom.name">Bezeichnung</span><input id="custom-name" required maxlength="60" placeholder="z. B. Kniebandage" data-i18n-placeholder="custom.namePlaceholder"></label>
          <label><span class="sr-only" data-i18n="custom.gramsLabel">Gewicht in Gramm</span><input id="custom-weight" type="number" min="0" max="5000" step="1" placeholder="Gramm" data-i18n-placeholder="custom.grams"></label>
          <label><span class="sr-only" data-i18n="custom.priority">Priorität</span><select id="custom-priority" aria-label="Priorität" data-i18n-aria="custom.priority"><option value="must" data-i18n="priority.must">Pflicht</option><option value="recommended" selected data-i18n="priority.recommended">Sinnvoll</option><option value="optional" data-i18n="priority.optional">Optional</option></select></label>
          <button type="submit" data-i18n="custom.add">Hinzufügen</button>
        </form>
      </section>

      <section class="packing-film" id="packing-film" aria-labelledby="packing-film-title">
        <div class="packing-film__intro">
          <div>
            <p class="section-label" data-i18n="film.label">Animierte Packanleitung</p>
            <h2 id="packing-film-title" data-i18n="film.title">So sitzt alles richtig im Rucksack</h2>
          </div>
          <p data-i18n="film.intro">Scrollt durch Vorder- und Seitenansicht. Die wichtigsten Packzonen werden genau dann erklärt, wenn sie sichtbar werden.</p>
        </div>

        <div class="film-sequence" id="packing-sequence">
          <div class="film-stage" id="packing-stage">
            <canvas id="packing-canvas" role="img" aria-label="Animierte Vorder- und Seitenansicht eines richtig gepackten Wanderrucksacks" data-i18n-aria="film.canvas"></canvas>
            <div class="film-scrim" aria-hidden="true"></div>
            <div class="film-grid" aria-hidden="true"></div>

            <div class="film-loader" id="packing-loader" role="status" aria-live="polite">
              <span class="film-loader__label" id="packing-loader-label" data-i18n="film.loading">Packansicht wird vorbereitet …</span>
              <span class="film-loader__track" aria-hidden="true"><i id="packing-loader-fill"></i></span>
              <span id="packing-loader-count">0 %</span>
            </div>

            <div class="film-chapters">
              <article class="film-chapter film-chapter--hero" data-center="0.04" data-window="0.075" data-label-key="film.chapter1Label">
                <div class="film-chapter__copy">
                  <p class="film-kicker"><span>01</span><span data-i18n="film.chapter1Label">Die Orientierung</span></p>
                  <h3 data-i18n="film.chapter1Title">Vorne sehen. Seitlich verstehen.</h3>
                  <p data-i18n="film.chapter1Copy">Beim Scrollen öffnet und dreht sich der Rucksack – ohne Ton und in eurem Tempo.</p>
                </div>
              </article>

              <article class="film-chapter" data-center="0.25" data-window="0.07" data-label-key="film.chapter2Label">
                <div class="film-chapter__copy">
                  <p class="film-kicker"><span>02</span><span data-i18n="film.chapter2Label">Untere Zone</span></p>
                  <h3 data-i18n="film.chapter2Title">Leicht nach unten.</h3>
                  <p data-i18n="film.chapter2Copy">Schlafsachen und leichte Kleidung füllen den Boden und geben dem Rucksack eine stabile Basis.</p>
                </div>
              </article>

              <article class="film-chapter film-chapter--right" data-center="0.48" data-window="0.072" data-label-key="film.chapter3Label">
                <div class="film-chapter__copy">
                  <p class="film-kicker"><span>03</span><span data-i18n="film.chapter3Label">Schwerpunkt</span></p>
                  <h3 data-i18n="film.chapter3Title">Schwer nah an den Rücken.</h3>
                  <p data-i18n="film.chapter3Copy">Wasser, Elektronik und dichte Packstücke gehören körpernah in die Mitte – nicht weit nach außen.</p>
                </div>
              </article>

              <article class="film-chapter" data-center="0.71" data-window="0.072" data-label-key="film.chapter4Label">
                <div class="film-chapter__copy">
                  <p class="film-kicker"><span>04</span><span data-i18n="film.chapter4Label">Schneller Zugriff</span></p>
                  <h3 data-i18n="film.chapter4Title">Wichtiges nach oben und außen.</h3>
                  <p data-i18n="film.chapter4Copy">Regenjacke, Sonnenschutz, Snacks und das Tages-Set bleiben erreichbar, ohne alles auszupacken.</p>
                </div>
              </article>

              <article class="film-chapter film-chapter--right film-chapter--final" data-center="0.93" data-window="0.078" data-label-key="film.chapter5Label">
                <div class="film-chapter__copy">
                  <p class="film-kicker"><span>05</span><span data-i18n="film.chapter5Label">Der Abschluss</span></p>
                  <h3 data-i18n="film.chapter5Title">Seitlich prüfen. Dann festziehen.</h3>
                  <p data-i18n="film.chapter5Copy">Der Schwerpunkt bleibt dicht am Körper, beide Seiten sind ausgeglichen und nichts baumelt außen.</p>
                  <div class="film-target"><strong>5,5–6,5 kg</strong><span data-i18n="film.target">Grundgewicht pro Person</span></div>
                </div>
              </article>
            </div>

            <div class="film-telemetry" aria-hidden="true">
              <span id="packing-chapter-label">Die Orientierung</span>
              <span class="film-telemetry__track"><i id="packing-progress"></i></span>
              <span id="packing-frame-label">001 / 100</span>
              <span class="film-scroll-cue" data-i18n="film.scroll">Scrollen</span>
            </div>
          </div>
        </div>
      </section>

      <section class="diary-section" id="tagebuch" aria-labelledby="diary-title">
        <div class="section-heading diary-heading">
          <div>
            <p class="section-label" data-i18n="diary.label">Unterwegs</p>
            <h2 id="diary-title" data-i18n="diary.title">Unser Camino-Tagebuch</h2>
          </div>
          <p data-i18n="diary.copy">Jeden Wandertag mit Gedanken, Höhenmetern und der aufgezeichneten GPX-Route festhalten.</p>
        </div>

        <div class="diary-layout">
          <div class="diary-feed" id="diary-feed" aria-live="polite"></div>
          <form class="diary-form" id="diary-form">
            <div class="diary-form-intro">
              <span class="diary-day-mark" aria-hidden="true">✦</span>
              <div><p class="section-label" data-i18n="diary.formLabel">Neue Etappe</p><h3 data-i18n="diary.formTitle">Was bleibt von heute?</h3></div>
            </div>
            <label class="diary-field"><span data-i18n="diary.date">Datum</span><input id="diary-date" type="date" required></label>
            <label class="diary-field diary-field-wide"><span data-i18n="diary.entryTitle">Überschrift</span><input id="diary-entry-title" maxlength="80" required placeholder="z. B. Der erste Blick auf den Atlantik" data-i18n-placeholder="diary.titlePlaceholder"></label>
            <div class="diary-place-row">
              <label class="diary-field"><span data-i18n="diary.from">Von</span><input id="diary-from" maxlength="60" placeholder="Porto" data-i18n-placeholder="diary.fromPlaceholder"></label>
              <span aria-hidden="true">→</span>
              <label class="diary-field"><span data-i18n="diary.to">Nach</span><input id="diary-to" maxlength="60" placeholder="Vila do Conde" data-i18n-placeholder="diary.toPlaceholder"></label>
            </div>
            <label class="diary-field diary-field-wide"><span data-i18n="diary.note">Tagesnotiz</span><textarea id="diary-note" rows="5" maxlength="2400" placeholder="Wetter, Begegnungen, Gedanken und die kleinen Momente des Tages …" data-i18n-placeholder="diary.notePlaceholder"></textarea></label>
            <label class="gpx-drop" for="diary-gpx">
              <span class="gpx-icon" aria-hidden="true">⌁</span>
              <span><strong data-i18n="diary.gpxTitle">Komoot-GPX auswählen</strong><small data-i18n="diary.gpxCopy">Die Route wird im Browser ausgewertet und mit dem Eintrag gespeichert.</small></span>
              <input id="diary-gpx" type="file" accept=".gpx,application/gpx+xml,application/xml,text/xml">
            </label>
            <p class="gpx-readout" id="gpx-readout" role="status" data-i18n="diary.gpxEmpty">Noch keine GPX ausgewählt.</p>
            <button class="diary-submit" type="submit" data-i18n="diary.save">Etappe speichern</button>
          </form>
        </div>
      </section>

      <section class="quick-guide" aria-labelledby="guide-title">
        <div>
          <p class="section-label light" data-i18n="guide.label">Das kleine System</p>
          <h2 id="guide-title" data-i18n="guide.title">Drei Regeln für leichte Schritte</h2>
        </div>
        <div class="guide-grid">
          <article><span>01</span><h3 data-i18n="guide.oneTitle">Waschen statt schleppen</h3><p data-i18n="guide.oneCopy">Zwei Wander-Shirts, zwei Hosen und drei Paar Socken reichen mit regelmäßigem Waschen.</p></article>
          <article><span>02</span><h3 data-i18n="guide.twoTitle">Kritisches doppelt</h3><p data-i18n="guide.twoCopy">Dokumente, Medikamente, Regenzeug und Schlafsack trägt jede Person selbst.</p></article>
          <article><span>03</span><h3 data-i18n="guide.threeTitle">Komfort nur einmal</h3><p data-i18n="guide.threeCopy">Powerbank, Ladegerät, Apotheke und Waschset werden fair auf beide Rucksäcke verteilt.</p></article>
        </div>
      </section>

      <section class="camino-note">
        <div class="shell-symbol" aria-hidden="true">◒</div>
        <div>
          <p class="section-label" data-i18n="note.label">Nicht vergessen</p>
          <h2 data-i18n="note.title">Zwei Credenciales, zwei Stempel täglich</h2>
          <p data-i18n="note.copy">Auf den letzten 100 Kilometern sammelt jede Person mindestens zwei Stempel pro Tag – für die Compostela und als Erinnerung an euren Weg.</p>
        </div>
      </section>
    </main>

    <footer>
      <div><strong>Bom Caminho!</strong><span data-i18n="footer.route">Porto · Küste · Zentralroute · Santiago</span></div>
      <p data-i18n="footer.copy">Für eure Pilgerwanderung im Spätsommer 2026.</p>
    </footer>
  </div>
`;

export default function Page() {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: pageMarkup },
  });
}
