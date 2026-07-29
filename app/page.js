import React from "react";

const pageMarkup = `
  <div class="site-shell">
    <header class="hero">
      <nav class="topbar" aria-label="Hauptnavigation">
        <a class="brand" href="#top" aria-label="Camino-Packliste Startseite">
          <span class="brand-mark" aria-hidden="true">✦</span>
          <span>CAMINHO · 2026</span>
        </a>
        <div class="top-actions">
          <span class="sync-status" id="sync-status" role="status">Gemeinsamer Speicher wird geladen …</span>
          <button class="ghost-button" id="print-button" type="button">Drucken</button>
          <button class="ghost-button danger-subtle" id="reset-button" type="button">Zurücksetzen</button>
          <a class="ghost-button" href="/logout">Abmelden</a>
        </div>
      </nav>

      <div class="hero-grid" id="top">
        <div class="hero-copy">
          <p class="eyebrow">PORTO → SANTIAGO DE COMPOSTELA</p>
          <h1>Leicht packen.<br><em>Weit gehen.</em></h1>
          <p class="hero-text">
            Eure gemeinsame Packliste für 12–13 Tage zwischen Atlantik,
            Albergues und dem Ziel vor der Kathedrale.
          </p>
          <div class="route-line" aria-label="Reiseverlauf">
            <span><b>Spätsommer</b> Porto</span>
            <i aria-hidden="true"></i>
            <span>Küstenweg</span>
            <i aria-hidden="true"></i>
            <span>Zentralroute</span>
            <i aria-hidden="true"></i>
            <span><b>12–13 Tage</b> Santiago</span>
          </div>
        </div>

        <aside class="weight-card" aria-label="Gewichtsziel">
          <span class="card-kicker">Ziel pro Rucksack</span>
          <strong>5,5–6,5 <small>kg</small></strong>
          <p>Grundgewicht – ohne Wasser, Essen und getragene Kleidung.</p>
          <div class="mini-rule"><span></span></div>
          <p class="small-note">Am Morgen etwa 6,8–8,2 kg. Möglichst unter 10 % des Körpergewichts bleiben.</p>
        </aside>
      </div>
    </header>

    <main class="main-content">
      <section class="overview" aria-labelledby="overview-title">
        <div>
          <p class="section-label">Euer Fortschritt</p>
          <h2 id="overview-title">Was schon im Rucksack ist</h2>
        </div>
        <div class="overview-grid">
          <article class="stat-card">
            <span>Pflicht & sinnvoll</span>
            <strong id="overall-progress">0 %</strong>
            <small id="overall-detail">Noch nichts abgehakt</small>
          </article>
          <article class="stat-card accent-card">
            <span>Aktuelles Gewicht</span>
            <strong id="current-weight">0,0 kg</strong>
            <small>Abgehakte Rucksackgegenstände</small>
          </article>
          <article class="stat-card">
            <span>Reiseprofil</span>
            <strong>2 × 13</strong>
            <small>Personen × maximale Wandertage</small>
          </article>
        </div>
      </section>

      <section class="checklist-section" aria-labelledby="checklist-title">
        <div class="section-heading">
          <div>
            <p class="section-label">Interaktive Liste</p>
            <h2 id="checklist-title">Packen ohne Doppeltes</h2>
          </div>
          <p>Die Häkchen und eure Gewichte bleiben auf diesem Gerät gespeichert.</p>
        </div>

        <div class="profile-tabs" role="tablist" aria-label="Packlisten auswählen">
          <button class="profile-tab active" data-profile="p1" role="tab" aria-selected="true">
            <span class="avatar">1</span><span class="tab-copy"><b>Meine Liste</b><small id="p1-tab-meta">0 von 0</small></span>
          </button>
          <button class="profile-tab" data-profile="p2" role="tab" aria-selected="false">
            <span class="avatar coral">2</span><span class="tab-copy"><b>Liste meiner Frau</b><small id="p2-tab-meta">0 von 0</small></span>
          </button>
          <button class="profile-tab" data-profile="shared" role="tab" aria-selected="false">
            <span class="avatar gold">↔</span><span class="tab-copy"><b>Gemeinsam</b><small id="shared-tab-meta">0 von 0</small></span>
          </button>
        </div>

        <div class="toolbar">
          <label class="search-field">
            <span aria-hidden="true">⌕</span>
            <span class="sr-only">Gegenstände suchen</span>
            <input id="search-input" type="search" placeholder="Gegenstand suchen …" autocomplete="off">
          </label>
          <div class="filter-pills" aria-label="Priorität filtern">
            <button class="filter-pill active" data-filter="all" type="button">Alle</button>
            <button class="filter-pill" data-filter="must" type="button">Pflicht</button>
            <button class="filter-pill" data-filter="recommended" type="button">Sinnvoll</button>
            <button class="filter-pill" data-filter="optional" type="button">Optional</button>
          </div>
        </div>

        <div class="list-summary" aria-live="polite">
          <div class="progress-ring" id="profile-ring"><span>0%</span></div>
          <div>
            <strong id="profile-title">Meine Liste</strong>
            <p id="profile-summary">0 Gegenstände · 0,0 kg eingepackt</p>
          </div>
          <div class="legend">
            <span><i class="dot must"></i>Pflicht</span>
            <span><i class="dot recommended"></i>Sinnvoll</span>
            <span><i class="dot optional"></i>Optional</span>
          </div>
        </div>

        <div id="checklist" class="checklist" aria-live="polite"></div>

        <form class="add-item" id="add-item-form">
          <div>
            <span class="add-icon" aria-hidden="true">＋</span>
            <div><strong>Eigenen Gegenstand ergänzen</strong><small>Wird gemeinsam gespeichert und im Gesamtgewicht berücksichtigt.</small></div>
          </div>
          <label><span class="sr-only">Liste auswählen</span><select id="custom-profile" aria-label="Liste auswählen"><option value="p1">Meine Liste</option><option value="p2">Liste meiner Frau</option><option value="shared">Gemeinsam</option></select></label>
          <label><span class="sr-only">Bezeichnung</span><input id="custom-name" required maxlength="60" placeholder="z. B. Kniebandage"></label>
          <label><span class="sr-only">Gewicht in Gramm</span><input id="custom-weight" type="number" min="0" max="5000" step="1" placeholder="Gramm"></label>
          <label><span class="sr-only">Priorität</span><select id="custom-priority" aria-label="Priorität"><option value="must">Pflicht</option><option value="recommended" selected>Sinnvoll</option><option value="optional">Optional</option></select></label>
          <button type="submit">Hinzufügen</button>
        </form>
      </section>

      <section class="quick-guide" aria-labelledby="guide-title">
        <div>
          <p class="section-label light">Das kleine System</p>
          <h2 id="guide-title">Drei Regeln für leichte Schritte</h2>
        </div>
        <div class="guide-grid">
          <article><span>01</span><h3>Waschen statt schleppen</h3><p>Zwei Wander-Shirts, zwei Hosen und drei Paar Socken reichen mit regelmäßigem Waschen.</p></article>
          <article><span>02</span><h3>Kritisches doppelt</h3><p>Dokumente, Medikamente, Regenzeug und Schlafsack trägt jede Person selbst.</p></article>
          <article><span>03</span><h3>Komfort nur einmal</h3><p>Powerbank, Ladegerät, Apotheke und Waschset werden fair auf beide Rucksäcke verteilt.</p></article>
        </div>
      </section>

      <section class="camino-note">
        <div class="shell-symbol" aria-hidden="true">◒</div>
        <div>
          <p class="section-label">Nicht vergessen</p>
          <h2>Zwei Credenciales, zwei Stempel täglich</h2>
          <p>Auf den letzten 100 Kilometern sammelt jede Person mindestens zwei Stempel pro Tag – für die Compostela und als Erinnerung an euren Weg.</p>
        </div>
      </section>
    </main>

    <footer>
      <div><strong>Bom Caminho!</strong><span>Porto · Küste · Zentralroute · Santiago</span></div>
      <p>Für eure Pilgerwanderung im Spätsommer 2026.</p>
    </footer>
  </div>
`;

export default function Page() {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: pageMarkup },
  });
}
