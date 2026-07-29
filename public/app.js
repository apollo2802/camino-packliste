(() => {
  "use strict";

  const STORAGE_KEY = "camino-packliste-2026-v1";
  const priorityLabels = { must: "Pflicht", recommended: "Sinnvoll", optional: "Optional" };
  const modeLabels = { pack: "Rucksack", worn: "getragen", consumable: "Verbrauch" };

  const personalItems = [
    { id: "backpack", category: "Rucksack & Ordnung", name: "Rucksack 32–38 l mit Hüftgurt", note: "Vorher mit vollem Gewicht testen", weight: 1000, priority: "must", mode: "pack" },
    { id: "liner", category: "Rucksack & Ordnung", name: "Wasserdichter Rucksackliner", note: "Wichtiger als eine reine Regenhülle", weight: 70, priority: "must", mode: "pack" },
    { id: "packsacks", category: "Rucksack & Ordnung", name: "2 leichte Packsäcke / Zip-Beutel", note: "Sauber und nass getrennt", weight: 70, priority: "recommended", mode: "pack" },
    { id: "valuables", category: "Rucksack & Ordnung", name: "Kleine Wertsachentasche", note: "Auch nachts griffbereit", weight: 70, priority: "recommended", mode: "pack" },

    { id: "shoes", category: "Schuhe & Füße", name: "Eingelaufene Trail- oder Wanderschuhe", note: "Keine neuen Schuhe kurz vor dem Start", weight: 750, priority: "must", mode: "worn" },
    { id: "sandals", category: "Schuhe & Füße", name: "Leichte, duschfeste Sandalen", note: "Für Albergue und Abend", weight: 220, priority: "must", mode: "pack" },
    { id: "socks", category: "Schuhe & Füße", name: "3 Paar getestete Wandersocken", note: "1 Paar getragen, 2 im Rucksack", weight: 120, priority: "must", mode: "pack" },
    { id: "insoles", category: "Schuhe & Füße", name: "Bewährte Einlegesohlen", note: "Nur wenn ohnehin genutzt", weight: 70, priority: "optional", mode: "worn" },

    { id: "shirts", category: "Kleidung", name: "2 leichte Wander-Shirts", note: "1 getragen, 1 im Rucksack", weight: 160, priority: "must", mode: "pack" },
    { id: "sleep-shirt", category: "Kleidung", name: "Leichtes Schlaf-/Abendshirt", note: "Trocken für den Schlafsaal", weight: 110, priority: "must", mode: "pack" },
    { id: "pants", category: "Kleidung", name: "2 Wanderhosen", note: "Shorts plus leichte lange oder Zip-off-Hose", weight: 330, priority: "must", mode: "pack" },
    { id: "underwear", category: "Kleidung", name: "3 Unterhosen", note: "Schnell trocknend", weight: 120, priority: "must", mode: "pack" },
    { id: "sportsbras", category: "Kleidung", name: "2 Sport-BHs, falls benötigt", note: "Vorher auf Scheuerstellen testen", weight: 140, priority: "recommended", mode: "pack" },
    { id: "sleep-shorts", category: "Kleidung", name: "Sehr leichte Schlafshorts", note: "Entfällt, wenn eine Wanderhose genügt", weight: 100, priority: "optional", mode: "pack" },
    { id: "fleece", category: "Kleidung", name: "Dünner Fleece / Midlayer", note: "Für kühle Morgen in Galicien", weight: 250, priority: "must", mode: "pack" },
    { id: "hat", category: "Kleidung", name: "Kappe oder Sonnenhut", note: "An der Küste teils wenig Schatten", weight: 70, priority: "must", mode: "worn" },
    { id: "buff", category: "Kleidung", name: "Buff / Multifunktionstuch", note: "Sonne, Wind und kühle Morgen", weight: 40, priority: "recommended", mode: "pack" },

    { id: "rain-jacket", category: "Regen & Wind", name: "Wasserdichte Regenjacke", note: "Mit gut sitzender Kapuze", weight: 300, priority: "must", mode: "pack" },
    { id: "rain-bottom", category: "Regen & Wind", name: "Regenhose oder Regenrock", note: "Leicht und schnell anzuziehen", weight: 180, priority: "must", mode: "pack" },

    { id: "sleepingbag", category: "Schlafen", name: "Leichter Schlafsack", note: "Komfortbereich ungefähr 10–15 °C", weight: 580, priority: "must", mode: "pack" },
    { id: "earplugs", category: "Schlafen", name: "Ohrstöpsel", note: "Mehrere Paar als Reserve", weight: 10, priority: "must", mode: "pack" },
    { id: "sleepmask", category: "Schlafen", name: "Schlafmaske", note: "Für Schlafsäle", weight: 20, priority: "recommended", mode: "pack" },
    { id: "headlamp", category: "Schlafen", name: "Kleine Stirnlampe", note: "Rotlicht schont Mitschlafende", weight: 60, priority: "recommended", mode: "pack" },

    { id: "tooth", category: "Hygiene", name: "Zahnbürste und kleine Zahnpasta", note: "Reisegröße", weight: 60, priority: "must", mode: "pack" },
    { id: "deodorant", category: "Hygiene", name: "Kleines Deodorant", note: "Keine große Originalgröße", weight: 60, priority: "recommended", mode: "pack" },
    { id: "soap", category: "Hygiene", name: "Kleines festes Waschstück", note: "In trocknender Dose oder Netz", weight: 65, priority: "must", mode: "pack" },
    { id: "towel", category: "Hygiene", name: "Mikrofaserhandtuch", note: "Etwa 40 × 80 cm", weight: 120, priority: "must", mode: "pack" },
    { id: "lipbalm", category: "Hygiene", name: "Lippenpflege mit LSF", note: "Sonne und Küstenwind", weight: 15, priority: "recommended", mode: "pack" },
    { id: "personal-hygiene", category: "Hygiene", name: "Persönliche Hygieneartikel", note: "Nur realistische Menge", weight: 120, priority: "must", mode: "pack" },
    { id: "sanitizer", category: "Hygiene", name: "Kleine Handdesinfektion", note: "Reisegröße", weight: 55, priority: "recommended", mode: "consumable" },
    { id: "tissues", category: "Hygiene", name: "Taschentücher / Papierreserve", note: "Kleine Menge", weight: 40, priority: "recommended", mode: "consumable" },

    { id: "id", category: "Dokumente & Geld", name: "Ausweis oder Reisepass", note: "Immer am Körper oder sicher verstaut", weight: 20, priority: "must", mode: "pack" },
    { id: "credential", category: "Dokumente & Geld", name: "Offizielle Pilger-Credencial", note: "Auf den letzten 100 km: 2 Stempel täglich", weight: 35, priority: "must", mode: "pack" },
    { id: "ehic", category: "Dokumente & Geld", name: "Europäische Krankenversicherungskarte", note: "Plus Versicherungsnachweis", weight: 10, priority: "must", mode: "pack" },
    { id: "cards", category: "Dokumente & Geld", name: "Bankkarte plus getrennte Ersatzkarte", note: "Auf beide Rucksäcke verteilen", weight: 12, priority: "must", mode: "pack" },
    { id: "cash", category: "Dokumente & Geld", name: "50–100 € Bargeld", note: "Kleine Scheine", weight: 15, priority: "must", mode: "pack" },
    { id: "emergency", category: "Dokumente & Geld", name: "Notfallkontakte auf Papier", note: "Zusätzlich digitale Dokumentkopien", weight: 5, priority: "must", mode: "pack" },

    { id: "phone", category: "Technik", name: "Smartphone mit Offline-Karte", note: "In Schutzhülle", weight: 210, priority: "must", mode: "worn" },
    { id: "cable", category: "Technik", name: "Kurzes Ladekabel", note: "Passend zum gemeinsamen Ladegerät", weight: 30, priority: "must", mode: "pack" },
    { id: "watch-cable", category: "Technik", name: "Uhr-/Gerätekabel nach Bedarf", note: "Nur tatsächlich benötigte Kabel", weight: 25, priority: "optional", mode: "pack" },

    { id: "bottles", category: "Wasser & unterwegs", name: "Flaschen für 1–1,5 l Wasser", note: "Kapazität an die Tagesetappe anpassen", weight: 100, priority: "must", mode: "pack" },
    { id: "electrolytes", category: "Wasser & unterwegs", name: "2–4 Portionen Elektrolyte", note: "Kleine Hitzereserve", weight: 40, priority: "recommended", mode: "consumable" },
    { id: "foodbag", category: "Wasser & unterwegs", name: "Leichter Beutel für Tagesproviant", note: "Kein Essen für mehrere Tage tragen", weight: 25, priority: "recommended", mode: "pack" },

    { id: "poles", category: "Optional", name: "2 Trekkingstöcke", note: "Nur vorher trainiert; Flugregeln prüfen", weight: 450, priority: "optional", mode: "worn" },
    { id: "sunglasses", category: "Optional", name: "Sonnenbrille", note: "Mit sicherem Etui oder Band", weight: 40, priority: "recommended", mode: "worn" },
    { id: "swimwear", category: "Optional", name: "Badebekleidung", note: "Entfällt bei badetauglicher Wanderhose", weight: 120, priority: "optional", mode: "pack" },
    { id: "shell", category: "Optional", name: "Pilgermuschel", note: "Pilgerzeichen und Erinnerung", weight: 35, priority: "optional", mode: "pack" }
  ];

  const sharedItems = [
    { id: "charger", category: "Laden", name: "USB-Ladegerät mit 2 Anschlüssen", note: "30–45 W reichen", weight: 100, priority: "must", mode: "pack" },
    { id: "powerbank", category: "Laden", name: "Powerbank 10.000 mAh", note: "Eine für euch beide", weight: 220, priority: "recommended", mode: "pack" },
    { id: "sunscreen", category: "Pflege", name: "Sonnencreme SPF 50", note: "100–150 ml starten, unterwegs nachkaufen", weight: 160, priority: "must", mode: "consumable" },
    { id: "antichafe", category: "Pflege", name: "Anti-Scheuer-Stick / Fußbalsam", note: "An bekannten Reibestellen früh nutzen", weight: 50, priority: "recommended", mode: "consumable" },
    { id: "repellent", category: "Pflege", name: "Kleines Insektenschutzmittel", note: "Wenn ihr empfindlich reagiert", weight: 60, priority: "optional", mode: "consumable" },

    { id: "blister", category: "Mini-Apotheke", name: "Blasenpflaster in mehreren Größen", note: "Hydrokolloid", weight: 35, priority: "must", mode: "pack" },
    { id: "tape", category: "Mini-Apotheke", name: "Bewährtes Sporttape", note: "Vorbeugend an Reibestellen", weight: 45, priority: "must", mode: "pack" },
    { id: "dressings", category: "Mini-Apotheke", name: "Pflaster und sterile Kompressen", note: "Kleine Auswahl", weight: 35, priority: "must", mode: "pack" },
    { id: "disinfectant", category: "Mini-Apotheke", name: "Kleine Wunddesinfektion", note: "Reisegröße", weight: 45, priority: "must", mode: "consumable" },
    { id: "tweezers", category: "Mini-Apotheke", name: "Pinzette", note: "Klein und leicht", weight: 15, priority: "recommended", mode: "pack" },
    { id: "bandage", category: "Mini-Apotheke", name: "Kleine elastische Binde", note: "Eine gemeinsame", weight: 55, priority: "recommended", mode: "pack" },
    { id: "known-meds", category: "Mini-Apotheke", name: "Wenige bewährte Standardmedikamente", note: "Nur was ihr vertragt; persönliche Medikamente getrennt", weight: 60, priority: "recommended", mode: "consumable" },
    { id: "rehydration", category: "Mini-Apotheke", name: "2 Portionen Rehydratationslösung", note: "Für Hitze oder Magen-Darm-Probleme", weight: 25, priority: "recommended", mode: "consumable" },
    { id: "nailclipper", category: "Mini-Apotheke", name: "Nagelknipser / kleine Feile", note: "Flugfreundlicher als eine Schere", weight: 25, priority: "recommended", mode: "pack" },

    { id: "laundrysoap", category: "Waschen & Reparieren", name: "Kleine Waschseife / Reisewaschmittel", note: "Für regelmäßiges Waschen", weight: 55, priority: "must", mode: "consumable" },
    { id: "pegs", category: "Waschen & Reparieren", name: "4–6 kleine Wäscheklammern", note: "Oder Sicherheitsnadeln", weight: 30, priority: "recommended", mode: "pack" },
    { id: "line", category: "Waschen & Reparieren", name: "3–4 m dünne Wäscheleine", note: "Eine für euch beide", weight: 35, priority: "recommended", mode: "pack" },
    { id: "sewing", category: "Waschen & Reparieren", name: "Mini-Nähset", note: "Nadel, Faden, 2 Sicherheitsnadeln", weight: 15, priority: "recommended", mode: "pack" },
    { id: "tape-repair", category: "Waschen & Reparieren", name: "Etwas Gewebeband", note: "Um eine alte Karte gewickelt", weight: 20, priority: "recommended", mode: "pack" },
    { id: "zips", category: "Waschen & Reparieren", name: "Zusätzliche Zip-Beutel", note: "Für Nasses, Müll und Elektronik", weight: 35, priority: "recommended", mode: "pack" },

    { id: "tote", category: "Alltagshelfer", name: "Leichter Stoffbeutel", note: "Für Einkäufe am Etappenziel", weight: 35, priority: "recommended", mode: "pack" },
    { id: "lock", category: "Alltagshelfer", name: "Kleines Vorhängeschloss", note: "Falls ein Schließfach vorhanden ist", weight: 35, priority: "optional", mode: "pack" },
    { id: "pen", category: "Alltagshelfer", name: "Kugelschreiber", note: "Für Credencial und Formulare", weight: 10, priority: "recommended", mode: "pack" },
    { id: "sporks", category: "Alltagshelfer", name: "2 leichte Löffel / Sporks", note: "Öffentliche Albergue-Küchen haben oft kein Geschirr", weight: 35, priority: "optional", mode: "pack" }
  ];

  const freshState = () => ({
    checked: { p1: {}, p2: {}, shared: {} },
    weights: { p1: {}, p2: {}, shared: {} },
    custom: { p1: [], p2: [], shared: [] }
  });

  let state = loadState();
  let activeProfile = "p1";
  let activeFilter = "all";
  let searchTerm = "";
  let serverReady = false;
  let syncTimer = null;

  const els = {
    list: document.getElementById("checklist"),
    search: document.getElementById("search-input"),
    profileTitle: document.getElementById("profile-title"),
    profileSummary: document.getElementById("profile-summary"),
    profileRing: document.getElementById("profile-ring"),
    overallProgress: document.getElementById("overall-progress"),
    overallDetail: document.getElementById("overall-detail"),
    currentWeight: document.getElementById("current-weight"),
    form: document.getElementById("add-item-form"),
    customProfile: document.getElementById("custom-profile"),
    customName: document.getElementById("custom-name"),
    customWeight: document.getElementById("custom-weight"),
    customPriority: document.getElementById("custom-priority"),
    syncStatus: document.getElementById("sync-status")
  };

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return normalizeState(parsed);
    } catch (_) {
      return freshState();
    }
  }

  function normalizeState(value) {
    const normalized = freshState();
    if (!value || typeof value !== "object") return normalized;
    ["p1", "p2", "shared"].forEach((profile) => {
      if (value.checked?.[profile] && typeof value.checked[profile] === "object") {
        normalized.checked[profile] = value.checked[profile];
      }
      if (value.weights?.[profile] && typeof value.weights[profile] === "object") {
        normalized.weights[profile] = value.weights[profile];
      }
      if (Array.isArray(value.custom?.[profile])) {
        normalized.custom[profile] = value.custom[profile];
      }
    });
    return normalized;
  }

  function writeLocalState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setSyncStatus(message, isError = false) {
    if (!els.syncStatus) return;
    els.syncStatus.textContent = message;
    els.syncStatus.classList.toggle("error", isError);
  }

  async function pushState() {
    if (!serverReady) return;
    setSyncStatus("Speichert …");
    try {
      const response = await fetch("/api/state", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ state })
      });
      if (response.status === 401) {
        window.location.assign("/");
        return;
      }
      if (!response.ok) throw new Error("Speichern fehlgeschlagen");
      setSyncStatus("Gemeinsam gespeichert");
    } catch (_) {
      setSyncStatus("Nur lokal gespeichert", true);
    }
  }

  function saveState() {
    writeLocalState();
    if (!serverReady) return;
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(pushState, 350);
  }

  async function loadSharedState() {
    setSyncStatus("Gemeinsamen Speicher laden …");
    try {
      const response = await fetch("/api/state", { credentials: "same-origin" });
      if (response.status === 401) {
        window.location.assign("/");
        return;
      }
      if (!response.ok) throw new Error("Laden fehlgeschlagen");
      const data = await response.json();
      serverReady = true;
      if (data.state && data.state.checked && data.state.weights && data.state.custom) {
        state = normalizeState(data.state);
        writeLocalState();
        render();
        setSyncStatus("Gemeinsam gespeichert");
      } else {
        await pushState();
      }
    } catch (_) {
      setSyncStatus("Offline – Änderungen bleiben lokal", true);
    }
  }

  function getItems(profile) {
    const base = profile === "shared" ? sharedItems : personalItems;
    return [...base, ...(state.custom[profile] || [])];
  }

  function weightOf(profile, item) {
    const saved = state.weights[profile][item.id];
    return Number.isFinite(saved) ? saved : item.weight;
  }

  function isChecked(profile, id) {
    return Boolean(state.checked[profile][id]);
  }

  function relevantItems(profile) {
    return getItems(profile).filter((item) => item.priority !== "optional");
  }

  function profileStats(profile) {
    const items = getItems(profile);
    const relevant = relevantItems(profile);
    const done = relevant.filter((item) => isChecked(profile, item.id)).length;
    const allChecked = items.filter((item) => isChecked(profile, item.id));
    const packedWeight = allChecked
      .filter((item) => item.mode !== "worn")
      .reduce((sum, item) => sum + weightOf(profile, item), 0);
    return { total: relevant.length, done, percent: relevant.length ? Math.round(done / relevant.length * 100) : 0, packedWeight };
  }

  function formatWeight(grams) {
    return `${(grams / 1000).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 2 })} kg`;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function render() {
    renderTabs();
    renderOverview();

    const names = { p1: "Meine Liste", p2: "Liste meiner Frau", shared: "Gemeinsam getragen" };
    const stats = profileStats(activeProfile);
    els.profileTitle.textContent = names[activeProfile];
    els.profileSummary.textContent = `${stats.done} von ${stats.total} wichtigen Dingen · ${formatWeight(stats.packedWeight)} eingepackt`;
    els.profileRing.style.setProperty("--progress", `${stats.percent * 3.6}deg`);
    els.profileRing.querySelector("span").textContent = `${stats.percent}%`;

    const filtered = getItems(activeProfile).filter((item) => {
      const filterMatch = activeFilter === "all" || item.priority === activeFilter;
      const haystack = `${item.name} ${item.note} ${item.category}`.toLocaleLowerCase("de-DE");
      return filterMatch && haystack.includes(searchTerm);
    });

    const groups = filtered.reduce((acc, item) => {
      (acc[item.category] ||= []).push(item);
      return acc;
    }, {});

    if (!filtered.length) {
      els.list.innerHTML = `<div class="empty-state"><strong>Nichts gefunden</strong><p>Versucht einen anderen Suchbegriff oder Filter.</p></div>`;
      return;
    }

    els.list.innerHTML = Object.entries(groups).map(([category, items]) => `
      <section class="item-group">
        <div class="group-heading"><h3>${escapeHTML(category)}</h3><span>${items.filter((item) => isChecked(activeProfile, item.id)).length}/${items.length}</span></div>
        <div class="item-list">
          ${items.map((item) => itemMarkup(item)).join("")}
        </div>
      </section>
    `).join("");
  }

  function itemMarkup(item) {
    const checked = isChecked(activeProfile, item.id);
    const isCustom = item.custom === true;
    return `
      <article class="pack-item ${checked ? "checked" : ""}">
        <label class="check-control">
          <input type="checkbox" data-check-id="${escapeHTML(item.id)}" ${checked ? "checked" : ""}>
          <span aria-hidden="true">✓</span>
          <span class="sr-only">${checked ? "Aus Packliste entfernen" : "Als eingepackt markieren"}: ${escapeHTML(item.name)}</span>
        </label>
        <div class="item-copy">
          <div class="item-title-row">
            <strong>${escapeHTML(item.name)}</strong>
            <span class="priority ${item.priority}">${priorityLabels[item.priority]}</span>
          </div>
          <p>${escapeHTML(item.note || "Eigener Gegenstand")}</p>
        </div>
        <div class="item-meta">
          <label class="weight-input" title="Gewicht anpassen">
            <input type="number" min="0" max="10000" step="1" value="${weightOf(activeProfile, item)}" data-weight-id="${escapeHTML(item.id)}" aria-label="Gewicht von ${escapeHTML(item.name)} in Gramm">
            <span>g</span>
          </label>
          <small>${modeLabels[item.mode] || "Rucksack"}</small>
        </div>
        ${isCustom ? `<button class="delete-item" type="button" data-delete-id="${escapeHTML(item.id)}" aria-label="${escapeHTML(item.name)} löschen">×</button>` : ""}
      </article>
    `;
  }

  function renderTabs() {
    document.querySelectorAll(".profile-tab").forEach((tab) => {
      const active = tab.dataset.profile === activeProfile;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    ["p1", "p2", "shared"].forEach((profile) => {
      const stats = profileStats(profile);
      document.getElementById(`${profile}-tab-meta`).textContent = `${stats.done} von ${stats.total}`;
    });
  }

  function renderOverview() {
    const profiles = ["p1", "p2", "shared"];
    const stats = profiles.map(profileStats);
    const total = stats.reduce((sum, entry) => sum + entry.total, 0);
    const done = stats.reduce((sum, entry) => sum + entry.done, 0);
    const weight = stats.reduce((sum, entry) => sum + entry.packedWeight, 0);
    const percent = total ? Math.round(done / total * 100) : 0;
    els.overallProgress.textContent = `${percent} %`;
    els.overallDetail.textContent = `${done} von ${total} wichtigen Dingen abgehakt`;
    els.currentWeight.textContent = formatWeight(weight);
  }

  document.querySelectorAll(".profile-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeProfile = tab.dataset.profile;
      if (els.customProfile) els.customProfile.value = activeProfile;
      render();
    });
  });

  document.querySelectorAll(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-pill").forEach((pill) => pill.classList.toggle("active", pill === button));
      render();
    });
  });

  els.search.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLocaleLowerCase("de-DE");
    render();
  });

  els.list.addEventListener("change", (event) => {
    const checkId = event.target.dataset.checkId;
    if (checkId) {
      state.checked[activeProfile][checkId] = event.target.checked;
      saveState();
      render();
    }
  });

  els.list.addEventListener("input", (event) => {
    const weightId = event.target.dataset.weightId;
    if (weightId) {
      const value = Math.max(0, Math.min(10000, Number(event.target.value) || 0));
      state.weights[activeProfile][weightId] = value;
      saveState();
      renderOverview();
      const stats = profileStats(activeProfile);
      els.profileSummary.textContent = `${stats.done} von ${stats.total} wichtigen Dingen · ${formatWeight(stats.packedWeight)} eingepackt`;
    }
  });

  els.list.addEventListener("click", (event) => {
    const id = event.target.dataset.deleteId;
    if (!id) return;
    state.custom[activeProfile] = state.custom[activeProfile].filter((item) => item.id !== id);
    delete state.checked[activeProfile][id];
    delete state.weights[activeProfile][id];
    saveState();
    render();
  });

  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = els.customName.value.trim();
    if (!name) return;
    const targetProfile = els.customProfile.value;
    const item = {
      id: `custom-${globalThis.crypto?.randomUUID?.() || Date.now()}`,
      category: "Eigene Ergänzungen",
      name,
      note: "Eigener Gegenstand",
      weight: Math.max(0, Math.min(5000, Number(els.customWeight.value) || 0)),
      priority: ["must", "recommended", "optional"].includes(els.customPriority.value) ? els.customPriority.value : "recommended",
      mode: "pack",
      custom: true
    };
    (state.custom[targetProfile] ||= []).push(item);
    activeProfile = targetProfile;
    saveState();
    els.form.reset();
    els.customProfile.value = activeProfile;
    activeFilter = "all";
    document.querySelectorAll(".filter-pill").forEach((pill) => pill.classList.toggle("active", pill.dataset.filter === "all"));
    render();
  });

  document.getElementById("print-button").addEventListener("click", () => window.print());
  document.getElementById("reset-button").addEventListener("click", () => {
    if (!window.confirm("Alle gemeinsamen Häkchen, Gewichte und eigenen Gegenstände löschen?")) return;
    state = freshState();
    saveState();
    render();
  });

  render();
  loadSharedState();
})();
