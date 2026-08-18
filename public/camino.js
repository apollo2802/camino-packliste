(() => {
  "use strict";

  const copy = {
    de: { title: "Unser Camino · Porto bis Santiago", private: "Unser Bereich", kicker: "UNSER WEG ZU FUSS", titleHtml: "Porto bis<br><em>Santiago.</em>", intro: "Wir gehen den Camino Portugués – Schritt für Schritt, Etappe für Etappe.", coast: "KÜSTENWEG", central: "ZENTRALROUTE", heroNote: "Unser Reisetagebuch · Sommer 2026", latestKicker: "GERADE UNTERWEGS", latestTitle: "Die letzte Etappe", latestCopy: "Hier teilen wir die Etappen, die wir bewusst veröffentlicht haben.", stagesKicker: "UNSER TAGEBUCH", stagesTitle: "Etappen auf dem Weg", stageCount: "{count} veröffentlichte Etappe{suffix}", emptyTitle: "Der Weg beginnt bald.", emptyCopy: "Die erste Etappe erscheint hier, sobald wir sie nach dem Wandertag veröffentlichen.", km: "Kilometer", ascent: "Aufstieg", descent: "Abstieg", elevation: "Höhe", play: "Animation starten", pause: "Animation pausieren", replay: "Noch einmal ansehen", mapLoading: "3D-Karte wird aufgebaut …", mapError: "Die 3D-Karte konnte nicht geladen werden.", attribution: "© OpenStreetMap / OpenTopoMap · Höhen: Mapzen", weather: "Wetter auf der Etappe", temperature: "Temperatur", rain: "Niederschlag", wind: "Wind · Böen", humidity: "Luftfeuchte", weatherSource: "Historische Wetterdaten · Open-Meteo", clear: "Klar", cloudy: "Leicht bewölkt", overcast: "Bedeckt", fog: "Nebel", drizzle: "Nieselregen", rainCode: "Regen", snow: "Schnee", showers: "Schauer", thunder: "Gewitter" },
    en: { title: "Our Camino · Porto to Santiago", private: "Our area", kicker: "OUR WALKING JOURNEY", titleHtml: "Porto to<br><em>Santiago.</em>", intro: "We are walking the Portuguese Camino – one step and one stage at a time.", coast: "COASTAL ROUTE", central: "CENTRAL ROUTE", heroNote: "Our travel diary · Summer 2026", latestKicker: "ON THE ROAD", latestTitle: "Our latest stage", latestCopy: "Here we share the stages we have chosen to publish.", stagesKicker: "OUR DIARY", stagesTitle: "Stages along the way", stageCount: "{count} published stage{suffix}", emptyTitle: "The journey begins soon.", emptyCopy: "Our first stage will appear here once we publish it after a walking day.", km: "Kilometres", ascent: "Ascent", descent: "Descent", elevation: "Elevation", play: "Start animation", pause: "Pause animation", replay: "Watch again", mapLoading: "Building 3D map …", mapError: "The 3D map could not be loaded.", attribution: "© OpenStreetMap / OpenTopoMap · Elevation: Mapzen", weather: "Weather on the stage", temperature: "Temperature", rain: "Precipitation", wind: "Wind · gusts", humidity: "Humidity", weatherSource: "Historical weather · Open-Meteo", clear: "Clear", cloudy: "Partly cloudy", overcast: "Overcast", fog: "Fog", drizzle: "Drizzle", rainCode: "Rain", snow: "Snow", showers: "Showers", thunder: "Thunderstorm" },
    ru: { title: "Наш Камино · Порту — Сантьяго", private: "Наш раздел", kicker: "НАШ ПУТЬ ПЕШКОМ", titleHtml: "Порту до<br><em>Сантьяго.</em>", intro: "Мы идём по Португальскому Камино — шаг за шагом, этап за этапом.", coast: "ПРИБРЕЖНЫЙ ПУТЬ", central: "ЦЕНТРАЛЬНЫЙ ПУТЬ", heroNote: "Наш дневник путешествия · Лето 2026", latestKicker: "СЕЙЧАС В ПУТИ", latestTitle: "Последний этап", latestCopy: "Здесь мы делимся этапами, которые решили опубликовать.", stagesKicker: "НАШ ДНЕВНИК", stagesTitle: "Этапы на пути", stageCount: "Опубликовано этапов: {count}", emptyTitle: "Путь скоро начнётся.", emptyCopy: "Первый этап появится здесь после того, как мы опубликуем его по окончании дня.", km: "Километры", ascent: "Набор", descent: "Спуск", elevation: "Высота", play: "Запустить анимацию", pause: "Приостановить анимацию", replay: "Посмотреть ещё раз", mapLoading: "Создаётся 3D-карта …", mapError: "Не удалось загрузить 3D-карту.", attribution: "© OpenStreetMap / OpenTopoMap · Высоты: Mapzen", weather: "Погода на этапе", temperature: "Температура", rain: "Осадки", wind: "Ветер · порывы", humidity: "Влажность", weatherSource: "Историческая погода · Open-Meteo", clear: "Ясно", cloudy: "Переменная облачность", overcast: "Пасмурно", fog: "Туман", drizzle: "Морось", rainCode: "Дождь", snow: "Снег", showers: "Ливни", thunder: "Гроза" }
  };
  Object.assign(copy.de, { follow:"Kamera folgt dem Wanderer", fullscreen:"Karte maximieren", exitFullscreen:"Vollansicht beenden" });
  Object.assign(copy.en, { follow:"Camera follows the walker", fullscreen:"Maximise map", exitFullscreen:"Exit fullscreen" });
  Object.assign(copy.ru, { follow:"Камера следует за путником", fullscreen:"Развернуть карту", exitFullscreen:"Выйти из полноэкранного режима" });
  let language = "de";
  try { language = localStorage.getItem("camino-language-v1") || "de"; } catch (_) {}
  if (!copy[language]) language = "de";
  let entries = [];
  let publicPhoto = null;
  let publicTourStops = [];
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value || "").replace(/[&<>'\"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", "\"":"&quot;" }[char]));
  const t = (key, values = {}) => Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), copy[language][key] || key);
  const locale = () => ({ de:"de-DE", en:"en-GB", ru:"ru-RU" }[language]);
  const formatDate = (date) => new Intl.DateTimeFormat(locale(), { weekday:"long", day:"2-digit", month:"long", year:"numeric" }).format(new Date(`${date}T12:00:00`));
  const format = (value, digits = 0) => Number(value || 0).toLocaleString(locale(), { maximumFractionDigits:digits });

  function routePath(track) {
    if (!Array.isArray(track) || track.length < 2) return "";
    const lats = track.map((point) => point[0]); const lons = track.map((point) => point[1]);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats), minLon = Math.min(...lons), maxLon = Math.max(...lons);
    const width = 720, height = 360, pad = 38, lonSpan = Math.max(.00001, maxLon - minLon), latSpan = Math.max(.00001, maxLat - minLat);
    return track.map((point, index) => `${index ? "L" : "M"}${(pad + (point[1] - minLon) / lonSpan * (width - pad * 2)).toFixed(1)} ${(height - pad - (point[0] - minLat) / latSpan * (height - pad * 2)).toFixed(1)}`).join(" ");
  }
  function elevationPath(track) {
    if (!Array.isArray(track) || track.length < 2) return "";
    const elevations = track.map((point) => Number(point[2]) || 0);
    const min = Math.min(...elevations), max = Math.max(...elevations), span = Math.max(1,max - min);
    const points = elevations.map((elevation,index) => `${(index / (elevations.length - 1) * 640).toFixed(1)},${(6 + (max - elevation) / span * 58).toFixed(1)}`);
    return `M0,72 L${points.join(" L")} L640,72 Z`;
  }
  function map(entry) {
    const path = routePath(entry.track); if (!path) return "";
    return `<div class="public-route-panel"><div class="public-tour" data-public-tour="true" data-public-tour-id="${escape(entry.id)}"><canvas class="public-route-canvas" role="img" aria-label="${escape(entry.title)}"></canvas><div class="public-map-loading" data-tour-loading role="status">${escape(t("mapLoading"))}</div><small class="public-map-attribution">${escape(t("attribution"))}</small><div class="public-tour-controls"><button class="public-tour-play" type="button" data-tour-play aria-label="${escape(t("play"))}" title="${escape(t("play"))}"></button><input class="public-tour-progress" type="range" min="0" max="1000" value="0" step="1" data-tour-progress aria-label="${escape(t("play"))}"><label class="public-tour-action public-tour-follow" title="${escape(t("follow"))}"><input type="checkbox" data-tour-follow checked aria-label="${escape(t("follow"))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6 10 4h4l1.5 2H19a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h3.5ZM12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/></svg></label><button class="public-tour-action public-tour-fullscreen" type="button" data-tour-fullscreen aria-label="${escape(t("fullscreen"))}" title="${escape(t("fullscreen"))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="fullscreen-enter" d="M4 9V4h5v2H6v3H4Zm11-5h5v5h-2V6h-3V4ZM4 15h2v3h3v2H4v-5Zm14 0h2v5h-5v-2h3v-3Z"/><path class="fullscreen-exit" d="M9 4v5H4V7h3V4h2Zm6 0h2v3h3v2h-5V4ZM4 15h5v5H7v-3H4v-2Zm11 0h5v2h-3v3h-2v-5Z"/></svg><span class="public-visually-hidden" data-tour-fullscreen-label>${escape(t("fullscreen"))}</span></button></div></div></div>`;
  }
  function elevation(entry) {
    if (!Array.isArray(entry.track) || entry.track.length < 2) return "";
    return `<div class="public-elevation-wrap"><svg class="public-elevation" data-elevation-profile viewBox="0 0 640 72" preserveAspectRatio="none" role="slider" tabindex="0" aria-label="${escape(t("elevation"))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><path d="${elevationPath(entry.track)}"></path><circle class="public-elevation-marker-halo" data-elevation-marker cx="0" cy="66" r="9"></circle><circle class="public-elevation-marker" data-elevation-marker cx="0" cy="66" r="4.5"></circle></svg></div>`;
  }
  function stats(entry) {
    if (!entry.stats) return "";
    return `<div class="public-stats"><div class="public-stat"><strong>${format(entry.stats.distance,1)}</strong><span>${t("km")}</span></div><div class="public-stat"><strong>${format(entry.stats.ascent)} m</strong><span>${t("ascent")}</span></div><div class="public-stat"><strong>${format(entry.stats.descent)} m</strong><span>${t("descent")}</span></div><div class="public-stat"><strong>${format(entry.stats.min)}–${format(entry.stats.max)} m</strong><span>${t("elevation")}</span></div></div>`;
  }
  function weatherCondition(code) {
    if (code === 0) return ["☀️","clear"];
    if (code <= 2) return ["🌤️","cloudy"];
    if (code === 3) return ["☁️","overcast"];
    if (code <= 48) return ["🌫️","fog"];
    if (code <= 57) return ["🌦️","drizzle"];
    if (code <= 67) return ["🌧️","rainCode"];
    if (code <= 77) return ["🌨️","snow"];
    if (code <= 86) return ["🌦️","showers"];
    return ["⛈️","thunder"];
  }
  function weather(entry) {
    if (!entry.weather) return "";
    const [icon, condition] = weatherCondition(Number(entry.weather.code));
    return `<section class="public-weather"><div class="public-weather-head"><span aria-hidden="true">${icon}</span><div><small>${t("weather")}</small><strong>${t(condition)}</strong></div></div><div class="public-weather-grid"><div><strong>${format(entry.weather.temperatureMin)}–${format(entry.weather.temperatureMax)} °C</strong><span>${t("temperature")}</span></div><div><strong>${format(entry.weather.precipitation,1)} mm</strong><span>${t("rain")}</span></div><div><strong>${format(entry.weather.windMax)} · ${format(entry.weather.gustMax)} km/h</strong><span>${t("wind")}</span></div><div><strong>${format(entry.weather.humidityAverage)} %</strong><span>${t("humidity")}</span></div></div><small class="public-weather-source">${t("weatherSource")}</small></section>`;
  }
  function card(entry, feature = false) {
    const places = [entry.from, entry.to].filter(Boolean).map(escape).join(" → ");
    const mapMarkup = map(entry);
    return `<article class="${feature ? "public-feature" : "public-stage-card"}${mapMarkup ? "" : " no-map"}"><div class="public-feature-copy"><time class="public-date" datetime="${escape(entry.date)}">${escape(formatDate(entry.date))}</time><h3>${escape(entry.title)}</h3>${places ? `<p class="public-places">${places}</p>` : ""}${entry.publicNote ? `<p class="public-note">${escape(entry.publicNote)}</p>` : ""}${weather(entry)}${mapMarkup}${stats(entry)}${elevation(entry)}</div></article>`;
  }
  function render() {
    publicTourStops.forEach((stop) => stop());
    publicTourStops = [];
    document.documentElement.lang = language; document.title = t("title");
    document.querySelectorAll("[data-i18n]").forEach((element) => element.textContent = t(element.dataset.i18n));
    document.querySelectorAll("[data-i18n-html]").forEach((element) => element.innerHTML = t(`${element.dataset.i18nHtml}Html`));
    document.querySelectorAll("[data-language]").forEach((button) => { const active = button.dataset.language === language; button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active)); });
    const photoSection = $("#public-journey-photo");
    const photoImage = $("#public-journey-photo-image");
    if (publicPhoto?.url) photoImage.src = publicPhoto.url;
    else photoImage.removeAttribute("src");
    photoSection.hidden = !publicPhoto?.url;
    const ordered = [...entries].sort((left, right) => String(right.date).localeCompare(String(left.date)));
    const empty = `<div class="public-empty"><div><span aria-hidden="true">◒</span><h3>${escape(t("emptyTitle"))}</h3><p>${escape(t("emptyCopy"))}</p></div></div>`;
    $("#public-latest").innerHTML = ordered[0] ? card(ordered[0], true) : empty;
    $("#public-stage-list").innerHTML = ordered.length ? ordered.map((entry) => card(entry)).join("") : empty;
    $("#public-stage-count").textContent = t("stageCount", { count:ordered.length, suffix:language === "de" && ordered.length !== 1 ? "n" : language === "en" && ordered.length !== 1 ? "s" : "" });
    mountPublicTours();
  }
  function mountPublicTours() {
    const tours = [...document.querySelectorAll("[data-public-tour]")];
    if (!tours.length) return;
    import("/diary-3d.js?v=34").then(({ mountDiaryTour }) => {
      const mounted = new Map();
      const mount = (tour) => {
        if (mounted.has(tour) || !tour.isConnected) return;
        const entry = entries.find((item) => item.id === tour.dataset.publicTourId);
        if (!entry || entry.track.length < 2) return;
        const loading = tour.querySelector("[data-tour-loading]");
        if (loading) loading.hidden = false;
        mounted.set(tour, mountDiaryTour(tour, entry, { play:t("play"), pause:t("pause"), replay:t("replay"), error:t("mapError"), follow:t("follow"), fullscreen:t("fullscreen"), exitFullscreen:t("exitFullscreen") }));
      };
      const unmount = (tour) => {
        mounted.get(tour)?.();
        mounted.delete(tour);
      };
      if (!("IntersectionObserver" in window)) {
        tours.forEach(mount);
        publicTourStops.push(() => mounted.forEach((stop) => stop()));
        return;
      }
      const observer = new IntersectionObserver((items) => items.forEach((item) => item.isIntersecting ? mount(item.target) : unmount(item.target)), { rootMargin:"320px 0px" });
      tours.forEach((tour) => observer.observe(tour));
      publicTourStops.push(() => { observer.disconnect(); mounted.forEach((stop) => stop()); });
    }).catch(() => {
      tours.forEach((tour) => { const loading = tour.querySelector("[data-tour-loading]"); if (loading) { loading.textContent = t("mapError"); loading.classList.add("error"); } });
    });
  }
  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => {
    language = button.dataset.language;
    try { localStorage.setItem("camino-language-v1", language); } catch (_) {}
    render();
  }));
  fetch("/api/public-diary", { credentials:"omit" }).then((response) => response.ok ? response.json() : Promise.reject()).then((data) => { entries = Array.isArray(data.entries) ? data.entries : []; publicPhoto = data.photo || null; render(); }).catch(() => { entries = []; publicPhoto = null; render(); });
  render();
})();
