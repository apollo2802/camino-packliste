(() => {
  "use strict";

  const STORAGE_KEY = "camino-packliste-2026-v1";
  const LANGUAGE_KEY = "camino-language-v1";
  const translations = {
    de: {
      "page.title": "Unsere Camino-Packliste",
      "nav.main": "Hauptnavigation",
      "nav.home": "Camino-Packliste Startseite",
      "nav.print": "Drucken",
      "nav.diary": "Tagebuch",
      "nav.reset": "Zurücksetzen",
      "nav.logout": "Abmelden",
      "language.label": "Sprache auswählen",
      "hero.title1": "Leicht packen.",
      "hero.title2": "Weit gehen.",
      "hero.copy": "Eure gemeinsame Packliste für 12–13 Tage zwischen Atlantik, Albergues und dem Ziel vor der Kathedrale.",
      "route.label": "Reiseverlauf",
      "route.summer": "Spätsommer",
      "route.coast": "Küstenweg",
      "route.central": "Zentralroute",
      "route.days": "12–13 Tage",
      "weight.label": "Gewichtsziel",
      "weight.target": "Ziel pro Rucksack",
      "weight.base": "Grundgewicht – ohne Wasser, Essen und getragene Kleidung.",
      "weight.note": "Am Morgen etwa 6,8–8,2 kg. Möglichst unter 10 % des Körpergewichts bleiben.",
      "overview.label": "Euer Fortschritt",
      "overview.title": "Was schon im Rucksack ist",
      "overview.important": "Pflicht & sinnvoll",
      "overview.weight": "Aktuelles Gewicht",
      "overview.weightDetail": "Abgehakte Rucksackgegenstände",
      "overview.profile": "Reiseprofil",
      "overview.profileDetail": "Personen × maximale Wandertage",
      "overview.none": "Noch nichts abgehakt",
      "overview.detail": "{done} von {total} wichtigen Dingen abgehakt",
      "checklist.label": "Interaktive Liste",
      "checklist.title": "Packen ohne Doppeltes",
      "checklist.copy": "Die Häkchen, Gewichte und eigenen Gegenstände werden zwischen euren Geräten synchronisiert.",
      "profiles.label": "Packlisten auswählen",
      "profiles.p1": "Meine Liste",
      "profiles.p2": "Liste meiner Frau",
      "profiles.shared": "Gemeinsam",
      "profiles.sharedTitle": "Gemeinsam getragen",
      "profiles.meta": "{done} von {total}",
      "profiles.summary": "{done} von {total} wichtigen Dingen · {weight} eingepackt",
      "search.label": "Gegenstände suchen",
      "search.placeholder": "Gegenstand suchen …",
      "filters.label": "Priorität filtern",
      "filters.all": "Alle",
      "priority.must": "Pflicht",
      "priority.recommended": "Sinnvoll",
      "priority.optional": "Optional",
      "mode.pack": "Rucksack",
      "mode.worn": "getragen",
      "mode.consumable": "Verbrauch",
      "empty.title": "Nichts gefunden",
      "empty.copy": "Versucht einen anderen Suchbegriff oder Filter.",
      "item.uncheck": "Aus Packliste entfernen",
      "item.check": "Als eingepackt markieren",
      "item.custom": "Eigener Gegenstand",
      "item.weightTitle": "Gewicht anpassen",
      "item.weightAria": "Gewicht von {name} in Gramm",
      "item.delete": "{name} löschen",
      "item.deleteConfirm": "„{name}“ wirklich aus „{list}“ löschen?",
      "rename.profileAria": "Liste „{name}“ umbenennen",
      "rename.profilePrompt": "Neuer Name für diese Liste (leer lassen = Standardname):",
      "rename.itemAria": "„{name}“ umbenennen",
      "rename.itemPrompt": "Neuer Name für diesen Gegenstand (leer lassen = Standardname):",
      "custom.category": "Eigene Ergänzungen",
      "custom.title": "Eigenen Gegenstand ergänzen",
      "custom.copy": "Wird gemeinsam gespeichert und im Gesamtgewicht berücksichtigt.",
      "custom.selectList": "Liste auswählen",
      "custom.name": "Bezeichnung",
      "custom.namePlaceholder": "z. B. Kniebandage",
      "custom.gramsLabel": "Gewicht in Gramm",
      "custom.grams": "Gramm",
      "custom.priority": "Priorität",
      "custom.add": "Hinzufügen",
      "diary.label": "Unterwegs",
      "diary.title": "Unser Camino-Tagebuch",
      "diary.copy": "Jeden Wandertag mit Gedanken, Höhenmetern und der aufgezeichneten GPX-Route festhalten.",
      "diary.formLabel": "Neue Etappe",
      "diary.formTitle": "Was bleibt von heute?",
      "diary.date": "Datum",
      "diary.entryTitle": "Überschrift",
      "diary.titlePlaceholder": "z. B. Der erste Blick auf den Atlantik",
      "diary.from": "Von",
      "diary.to": "Nach",
      "diary.fromPlaceholder": "Porto",
      "diary.toPlaceholder": "Vila do Conde",
      "diary.note": "Tagesnotiz",
      "diary.notePlaceholder": "Wetter, Begegnungen, Gedanken und die kleinen Momente des Tages …",
      "diary.gpxTitle": "Komoot-GPX auswählen",
      "diary.gpxCopy": "Die Route wird im Browser ausgewertet und mit dem Eintrag gespeichert.",
      "diary.gpxEmpty": "Noch keine GPX ausgewählt.",
      "diary.gpxReady": "{name} · {distance} km · {ascent} m Aufstieg",
      "diary.gpxError": "Die GPX-Datei konnte nicht gelesen werden.",
      "diary.save": "Etappe speichern",
      "diary.emptyTitle": "Der Weg wartet auf seinen ersten Eintrag.",
      "diary.emptyCopy": "Nach jeder Etappe könnt ihr hier die Komoot-GPX und eure Erinnerungen gemeinsam festhalten.",
      "diary.noRoute": "Etappe ohne GPX-Aufzeichnung",
      "diary.route": "GPX-Route",
      "diary.play": "3D-Wanderung starten",
      "diary.pause": "Animation pausieren",
      "diary.replay": "Noch einmal wandern",
      "diary.animation": "Animierte 3D-Höhenkarte der Etappe",
      "diary.mapLoading": "3D-Topokarte wird aufgebaut …",
      "diary.mapError": "Die 3D-Karte konnte nicht geladen werden. Bitte Internetverbindung prüfen.",
      "diary.attribution": "© OpenStreetMap / OpenTopoMap · Höhen: Mapzen",
      "diary.follow": "Kamera folgt",
      "diary.export": "Social-Video exportieren",
      "diary.exporting": "Video wird erstellt …",
      "diary.exportReady": "Video herunterladen",
      "diary.exportError": "Videoexport wird von diesem Browser nicht unterstützt.",
      "diary.distance": "Kilometer",
      "diary.ascent": "Aufstieg",
      "diary.descent": "Abstieg",
      "diary.elevation": "Höhe",
      "diary.delete": "Tagebucheintrag löschen",
      "diary.deleteConfirm": "Diesen Tagebucheintrag wirklich löschen?",
      "film.label": "Animierte Packanleitung",
      "film.title": "So sitzt alles richtig im Rucksack",
      "film.intro": "Scrollt durch Vorder- und Seitenansicht. Die wichtigsten Packzonen werden genau dann erklärt, wenn sie sichtbar werden.",
      "film.canvas": "Animierte Vorder- und Seitenansicht eines richtig gepackten Wanderrucksacks",
      "film.loading": "Packansicht wird vorbereitet …",
      "film.error": "Die Packansicht konnte nicht geladen werden.",
      "film.scroll": "Scrollen",
      "film.chapter1Label": "Die Orientierung",
      "film.chapter1Title": "Vorne sehen. Seitlich verstehen.",
      "film.chapter1Copy": "Beim Scrollen öffnet und dreht sich der Rucksack – ohne Ton und in eurem Tempo.",
      "film.chapter2Label": "Untere Zone",
      "film.chapter2Title": "Leicht nach unten.",
      "film.chapter2Copy": "Schlafsachen und leichte Kleidung füllen den Boden und geben dem Rucksack eine stabile Basis.",
      "film.chapter3Label": "Schwerpunkt",
      "film.chapter3Title": "Schwer nah an den Rücken.",
      "film.chapter3Copy": "Wasser, Elektronik und dichte Packstücke gehören körpernah in die Mitte – nicht weit nach außen.",
      "film.chapter4Label": "Schneller Zugriff",
      "film.chapter4Title": "Wichtiges nach oben und außen.",
      "film.chapter4Copy": "Regenjacke, Sonnenschutz, Snacks und das Tages-Set bleiben erreichbar, ohne alles auszupacken.",
      "film.chapter5Label": "Der Abschluss",
      "film.chapter5Title": "Seitlich prüfen. Dann festziehen.",
      "film.chapter5Copy": "Der Schwerpunkt bleibt dicht am Körper, beide Seiten sind ausgeglichen und nichts baumelt außen.",
      "film.target": "Grundgewicht pro Person",
      "guide.label": "Das kleine System",
      "guide.title": "Drei Regeln für leichte Schritte",
      "guide.oneTitle": "Waschen statt schleppen",
      "guide.oneCopy": "Zwei Wander-Shirts, zwei Hosen und drei Paar Socken reichen mit regelmäßigem Waschen.",
      "guide.twoTitle": "Kritisches doppelt",
      "guide.twoCopy": "Dokumente, Medikamente, Regenzeug und Schlafsack trägt jede Person selbst.",
      "guide.threeTitle": "Komfort nur einmal",
      "guide.threeCopy": "Powerbank, Ladegerät, Apotheke und Waschset werden fair auf beide Rucksäcke verteilt.",
      "note.label": "Nicht vergessen",
      "note.title": "Zwei Credenciales, zwei Stempel täglich",
      "note.copy": "Auf den letzten 100 Kilometern sammelt jede Person mindestens zwei Stempel pro Tag – für die Compostela und als Erinnerung an euren Weg.",
      "footer.route": "Porto · Küste · Zentralroute · Santiago",
      "footer.copy": "Für eure Pilgerwanderung im Spätsommer 2026.",
      "sync.loading": "Gemeinsamer Speicher wird geladen …",
      "sync.saving": "Speichert …",
      "sync.saved": "Gemeinsam gespeichert",
      "sync.local": "Nur lokal gespeichert",
      "sync.offline": "Offline – Änderungen bleiben lokal",
      "reset.confirm": "Die gesamte Packliste auf den Standard zurücksetzen? Dabei werden Häkchen, angepasste Gewichte, eigene Gegenstände, Löschungen und Umbenennungen entfernt."
    },
    en: {
      "page.title": "Our Camino Packing List",
      "nav.main": "Main navigation",
      "nav.home": "Camino packing list home",
      "nav.print": "Print",
      "nav.diary": "Diary",
      "nav.reset": "Reset",
      "nav.logout": "Sign out",
      "language.label": "Choose language",
      "hero.title1": "Pack light.",
      "hero.title2": "Walk far.",
      "hero.copy": "Your shared packing list for 12–13 days between the Atlantic, albergues and the finish in front of the cathedral.",
      "route.label": "Travel route",
      "route.summer": "Late summer",
      "route.coast": "Coastal Route",
      "route.central": "Central Route",
      "route.days": "12–13 days",
      "weight.label": "Weight target",
      "weight.target": "Target per backpack",
      "weight.base": "Base weight — excluding water, food and worn clothing.",
      "weight.note": "Around 6.8–8.2 kg in the morning. Aim to stay below 10% of body weight.",
      "overview.label": "Your progress",
      "overview.title": "What is already in the backpack",
      "overview.important": "Essential & useful",
      "overview.weight": "Current weight",
      "overview.weightDetail": "Checked backpack items",
      "overview.profile": "Trip profile",
      "overview.profileDetail": "people × maximum walking days",
      "overview.none": "Nothing checked yet",
      "overview.detail": "{done} of {total} important items checked",
      "checklist.label": "Interactive list",
      "checklist.title": "Pack without duplicates",
      "checklist.copy": "Checkmarks, weights and custom items are synchronised across your devices.",
      "profiles.label": "Choose packing list",
      "profiles.p1": "My list",
      "profiles.p2": "My wife's list",
      "profiles.shared": "Shared",
      "profiles.sharedTitle": "Shared gear",
      "profiles.meta": "{done} of {total}",
      "profiles.summary": "{done} of {total} important items · {weight} packed",
      "search.label": "Search items",
      "search.placeholder": "Search for an item …",
      "filters.label": "Filter by priority",
      "filters.all": "All",
      "priority.must": "Essential",
      "priority.recommended": "Useful",
      "priority.optional": "Optional",
      "mode.pack": "backpack",
      "mode.worn": "worn",
      "mode.consumable": "consumable",
      "empty.title": "Nothing found",
      "empty.copy": "Try a different search term or filter.",
      "item.uncheck": "Remove packed mark",
      "item.check": "Mark as packed",
      "item.custom": "Custom item",
      "item.weightTitle": "Adjust weight",
      "item.weightAria": "Weight of {name} in grams",
      "item.delete": "Delete {name}",
      "item.deleteConfirm": "Really delete “{name}” from “{list}”?",
      "rename.profileAria": "Rename list “{name}”",
      "rename.profilePrompt": "New name for this list (leave blank for the default):",
      "rename.itemAria": "Rename “{name}”",
      "rename.itemPrompt": "New name for this item (leave blank for the default):",
      "custom.category": "Custom additions",
      "custom.title": "Add your own item",
      "custom.copy": "Saved for both of you and included in the total weight.",
      "custom.selectList": "Choose list",
      "custom.name": "Name",
      "custom.namePlaceholder": "e.g. knee support",
      "custom.gramsLabel": "Weight in grams",
      "custom.grams": "Grams",
      "custom.priority": "Priority",
      "custom.add": "Add",
      "diary.label": "On the way",
      "diary.title": "Our Camino diary",
      "diary.copy": "Keep every walking day together with thoughts, elevation and the recorded GPX route.",
      "diary.formLabel": "New stage",
      "diary.formTitle": "What will stay from today?",
      "diary.date": "Date",
      "diary.entryTitle": "Title",
      "diary.titlePlaceholder": "e.g. Our first view of the Atlantic",
      "diary.from": "From",
      "diary.to": "To",
      "diary.fromPlaceholder": "Porto",
      "diary.toPlaceholder": "Vila do Conde",
      "diary.note": "Day note",
      "diary.notePlaceholder": "Weather, encounters, thoughts and the small moments of the day …",
      "diary.gpxTitle": "Choose Komoot GPX",
      "diary.gpxCopy": "The route is analysed in your browser and saved with the entry.",
      "diary.gpxEmpty": "No GPX selected yet.",
      "diary.gpxReady": "{name} · {distance} km · {ascent} m ascent",
      "diary.gpxError": "The GPX file could not be read.",
      "diary.save": "Save stage",
      "diary.emptyTitle": "The road is waiting for its first entry.",
      "diary.emptyCopy": "After each stage, add your Komoot GPX and shared memories here.",
      "diary.noRoute": "Stage without GPX recording",
      "diary.route": "GPX route",
      "diary.play": "Start 3D walk",
      "diary.pause": "Pause animation",
      "diary.replay": "Walk again",
      "diary.animation": "Animated 3D elevation map of the stage",
      "diary.mapLoading": "Building 3D topographic map …",
      "diary.mapError": "The 3D map could not be loaded. Please check your internet connection.",
      "diary.attribution": "© OpenStreetMap / OpenTopoMap · elevation: Mapzen",
      "diary.follow": "Follow camera",
      "diary.export": "Export social video",
      "diary.exporting": "Creating video …",
      "diary.exportReady": "Download video",
      "diary.exportError": "Video export is not supported by this browser.",
      "diary.distance": "Kilometres",
      "diary.ascent": "Ascent",
      "diary.descent": "Descent",
      "diary.elevation": "Elevation",
      "diary.delete": "Delete diary entry",
      "diary.deleteConfirm": "Delete this diary entry?",
      "film.label": "Animated packing guide",
      "film.title": "How to pack your backpack properly",
      "film.intro": "Scroll through the front and side views. Each key packing zone is explained exactly when it appears.",
      "film.canvas": "Animated front and side view of a properly packed hiking backpack",
      "film.loading": "Preparing the packing view …",
      "film.error": "The packing view could not be loaded.",
      "film.scroll": "Scroll",
      "film.chapter1Label": "Orientation",
      "film.chapter1Title": "See the front. Understand the side.",
      "film.chapter1Copy": "As you scroll, the backpack opens and turns — silently and at your pace.",
      "film.chapter2Label": "Lower zone",
      "film.chapter2Title": "Light items go low.",
      "film.chapter2Copy": "Sleep gear and light clothing fill the bottom and create a stable base.",
      "film.chapter3Label": "Centre of gravity",
      "film.chapter3Title": "Keep heavy items close to your back.",
      "film.chapter3Copy": "Water, electronics and dense items belong close to your body in the middle — not near the outer wall.",
      "film.chapter4Label": "Quick access",
      "film.chapter4Title": "Keep essentials high and outside.",
      "film.chapter4Copy": "Rain jacket, sun protection, snacks and your daytime kit stay accessible without unpacking everything.",
      "film.chapter5Label": "Final check",
      "film.chapter5Title": "Check the side. Then tighten.",
      "film.chapter5Copy": "The centre of gravity stays close to your body, both sides are balanced and nothing dangles outside.",
      "film.target": "Base weight per person",
      "guide.label": "The simple system",
      "guide.title": "Three rules for lighter steps",
      "guide.oneTitle": "Wash instead of carry",
      "guide.oneCopy": "Two hiking shirts, two pairs of trousers and three pairs of socks are enough with regular washing.",
      "guide.twoTitle": "Critical gear for each person",
      "guide.twoCopy": "Documents, medication, rain gear and a sleeping bag are carried by each person.",
      "guide.threeTitle": "Comfort gear only once",
      "guide.threeCopy": "Share the power bank, charger, first-aid kit and laundry set fairly between both backpacks.",
      "note.label": "Do not forget",
      "note.title": "Two credenciales, two stamps per day",
      "note.copy": "During the final 100 kilometres, each person collects at least two stamps per day — for the Compostela and as a memory of your journey.",
      "footer.route": "Porto · Coast · Central Route · Santiago",
      "footer.copy": "For your late-summer pilgrimage in 2026.",
      "sync.loading": "Loading shared storage …",
      "sync.saving": "Saving …",
      "sync.saved": "Saved for both of you",
      "sync.local": "Saved on this device only",
      "sync.offline": "Offline — changes remain on this device",
      "reset.confirm": "Reset the entire packing list to its defaults? Checkmarks, adjusted weights, custom items, deletions and renamed entries will be removed."
    },
    ru: {
      "page.title": "Наш список вещей для Камино",
      "nav.main": "Главная навигация",
      "nav.home": "На главную списка вещей",
      "nav.print": "Печать",
      "nav.diary": "Дневник",
      "nav.reset": "Сбросить",
      "nav.logout": "Выйти",
      "language.label": "Выбрать язык",
      "hero.title1": "Легче рюкзак.",
      "hero.title2": "Дальше путь.",
      "hero.copy": "Ваш общий список вещей на 12–13 дней между Атлантикой, альберге и финишем у собора.",
      "route.label": "Маршрут путешествия",
      "route.summer": "Конец лета",
      "route.coast": "Прибрежный путь",
      "route.central": "Центральный путь",
      "route.days": "12–13 дней",
      "weight.label": "Целевой вес",
      "weight.target": "Цель на один рюкзак",
      "weight.base": "Базовый вес — без воды, еды и одежды на себе.",
      "weight.note": "Утром около 6,8–8,2 кг. По возможности не превышать 10 % массы тела.",
      "overview.label": "Ваш прогресс",
      "overview.title": "Что уже в рюкзаке",
      "overview.important": "Обязательное и полезное",
      "overview.weight": "Текущий вес",
      "overview.weightDetail": "Отмеченные вещи в рюкзаках",
      "overview.profile": "Профиль поездки",
      "overview.profileDetail": "человека × максимум дней пути",
      "overview.none": "Пока ничего не отмечено",
      "overview.detail": "Отмечено важных вещей: {done} из {total}",
      "checklist.label": "Интерактивный список",
      "checklist.title": "Собраться без повторов",
      "checklist.copy": "Отметки, вес и ваши вещи синхронизируются между устройствами.",
      "profiles.label": "Выбрать список вещей",
      "profiles.p1": "Мой список",
      "profiles.p2": "Список жены",
      "profiles.shared": "Общее",
      "profiles.sharedTitle": "Общие вещи",
      "profiles.meta": "{done} из {total}",
      "profiles.summary": "Важных вещей: {done} из {total} · упаковано {weight}",
      "search.label": "Искать вещи",
      "search.placeholder": "Найти вещь …",
      "filters.label": "Фильтр по важности",
      "filters.all": "Все",
      "priority.must": "Обязательно",
      "priority.recommended": "Полезно",
      "priority.optional": "По желанию",
      "mode.pack": "в рюкзаке",
      "mode.worn": "на себе",
      "mode.consumable": "расходник",
      "empty.title": "Ничего не найдено",
      "empty.copy": "Попробуйте другой запрос или фильтр.",
      "item.uncheck": "Убрать отметку",
      "item.check": "Отметить как упакованное",
      "item.custom": "Своя вещь",
      "item.weightTitle": "Изменить вес",
      "item.weightAria": "Вес «{name}» в граммах",
      "item.delete": "Удалить «{name}»",
      "item.deleteConfirm": "Удалить «{name}» из списка «{list}»?",
      "rename.profileAria": "Переименовать список «{name}»",
      "rename.profilePrompt": "Новое название списка (пусто = вернуть стандартное):",
      "rename.itemAria": "Переименовать «{name}»",
      "rename.itemPrompt": "Новое название вещи (пусто = вернуть стандартное):",
      "custom.category": "Свои дополнения",
      "custom.title": "Добавить свою вещь",
      "custom.copy": "Она сохранится для всех и войдёт в общий вес.",
      "custom.selectList": "Выбрать список",
      "custom.name": "Название",
      "custom.namePlaceholder": "например, наколенник",
      "custom.gramsLabel": "Вес в граммах",
      "custom.grams": "Граммы",
      "custom.priority": "Важность",
      "custom.add": "Добавить",
      "diary.label": "В пути",
      "diary.title": "Наш дневник Камино",
      "diary.copy": "Сохраняйте каждый день пути: мысли, набор высоты и записанный GPX-маршрут.",
      "diary.formLabel": "Новый этап",
      "diary.formTitle": "Что останется от сегодняшнего дня?",
      "diary.date": "Дата",
      "diary.entryTitle": "Заголовок",
      "diary.titlePlaceholder": "например, первый взгляд на Атлантику",
      "diary.from": "Откуда",
      "diary.to": "Куда",
      "diary.fromPlaceholder": "Порту",
      "diary.toPlaceholder": "Вила-ду-Конди",
      "diary.note": "Заметка дня",
      "diary.notePlaceholder": "Погода, встречи, мысли и маленькие моменты дня …",
      "diary.gpxTitle": "Выбрать GPX из Komoot",
      "diary.gpxCopy": "Маршрут будет обработан в браузере и сохранён вместе с записью.",
      "diary.gpxEmpty": "GPX ещё не выбран.",
      "diary.gpxReady": "{name} · {distance} км · набор {ascent} м",
      "diary.gpxError": "Не удалось прочитать GPX-файл.",
      "diary.save": "Сохранить этап",
      "diary.emptyTitle": "Путь ждёт первой записи.",
      "diary.emptyCopy": "После каждого этапа добавляйте сюда GPX из Komoot и ваши общие воспоминания.",
      "diary.noRoute": "Этап без GPX-записи",
      "diary.route": "GPX-маршрут",
      "diary.play": "Начать 3D-прогулку",
      "diary.pause": "Приостановить анимацию",
      "diary.replay": "Пройти ещё раз",
      "diary.animation": "Анимированная 3D-карта высот этапа",
      "diary.mapLoading": "Создаётся 3D-топографическая карта …",
      "diary.mapError": "Не удалось загрузить 3D-карту. Проверьте подключение к интернету.",
      "diary.attribution": "© OpenStreetMap / OpenTopoMap · высоты: Mapzen",
      "diary.follow": "Камера следует",
      "diary.export": "Экспорт видео",
      "diary.exporting": "Создаётся видео …",
      "diary.exportReady": "Скачать видео",
      "diary.exportError": "Этот браузер не поддерживает экспорт видео.",
      "diary.distance": "Километры",
      "diary.ascent": "Набор",
      "diary.descent": "Спуск",
      "diary.elevation": "Высота",
      "diary.delete": "Удалить запись дневника",
      "diary.deleteConfirm": "Удалить эту запись дневника?",
      "film.label": "Анимированная инструкция",
      "film.title": "Как правильно уложить рюкзак",
      "film.intro": "Прокручивайте страницу и изучайте рюкзак спереди и сбоку. Каждая зона объясняется именно тогда, когда появляется на экране.",
      "film.canvas": "Анимированный вид правильно уложенного туристического рюкзака спереди и сбоку",
      "film.loading": "Готовим схему укладки …",
      "film.error": "Не удалось загрузить схему укладки.",
      "film.scroll": "Листайте",
      "film.chapter1Label": "Ориентация",
      "film.chapter1Title": "Спереди видно. Сбоку понятно.",
      "film.chapter1Copy": "При прокрутке рюкзак открывается и поворачивается — без звука и в вашем темпе.",
      "film.chapter2Label": "Нижняя зона",
      "film.chapter2Title": "Лёгкое — вниз.",
      "film.chapter2Copy": "Спальные принадлежности и лёгкая одежда заполняют дно и создают устойчивую основу.",
      "film.chapter3Label": "Центр тяжести",
      "film.chapter3Title": "Тяжёлое — ближе к спине.",
      "film.chapter3Copy": "Воду, электронику и плотные вещи кладите ближе к телу в середину, а не к внешней стенке.",
      "film.chapter4Label": "Быстрый доступ",
      "film.chapter4Title": "Нужное — наверх и наружу.",
      "film.chapter4Copy": "Дождевик, защита от солнца, перекус и дневной набор доступны без полной распаковки.",
      "film.chapter5Label": "Финальная проверка",
      "film.chapter5Title": "Проверьте сбоку. Затем затяните.",
      "film.chapter5Copy": "Центр тяжести остаётся у тела, обе стороны сбалансированы, а снаружи ничего не болтается.",
      "film.target": "Базовый вес на человека",
      "guide.label": "Простая система",
      "guide.title": "Три правила лёгкого пути",
      "guide.oneTitle": "Стирать, а не нести",
      "guide.oneCopy": "При регулярной стирке хватит двух футболок, двух пар брюк и трёх пар носков.",
      "guide.twoTitle": "Критически важное — каждому",
      "guide.twoCopy": "Документы, лекарства, дождевик и спальник каждый несёт сам.",
      "guide.threeTitle": "Общее — в одном экземпляре",
      "guide.threeCopy": "Пауэрбанк, зарядку, аптечку и набор для стирки поровну распределите между рюкзаками.",
      "note.label": "Не забудьте",
      "note.title": "Два креденсиаля, две печати в день",
      "note.copy": "На последних 100 километрах каждый собирает не менее двух печатей в день — для Компостелы и на память о вашем пути.",
      "footer.route": "Порту · Побережье · Центральный путь · Сантьяго",
      "footer.copy": "Для вашего паломничества в конце лета 2026 года.",
      "sync.loading": "Загружаем общий список …",
      "sync.saving": "Сохраняем …",
      "sync.saved": "Общий список сохранён",
      "sync.local": "Сохранено только на устройстве",
      "sync.offline": "Нет связи — изменения останутся на устройстве",
      "reset.confirm": "Вернуть весь список к исходному состоянию? Отметки, изменённый вес, свои вещи, удаления и переименования будут удалены."
    }
  };

  const russianItems = {
    backpack: ["Рюкзак и порядок", "Рюкзак 32–38 л с поясным ремнём", "Заранее испытать с полным весом"],
    liner: ["Рюкзак и порядок", "Водонепроницаемый вкладыш в рюкзак", "Важнее обычного чехла от дождя"],
    packsacks: ["Рюкзак и порядок", "2 лёгких гермомешка / зип-пакета", "Разделить чистое и мокрое"],
    valuables: ["Рюкзак и порядок", "Небольшая сумка для ценностей", "Держать под рукой и ночью"],
    shoes: ["Обувь и стопы", "Разношенные трейловые или походные ботинки", "Не брать новую обувь прямо перед стартом"],
    sandals: ["Обувь и стопы", "Лёгкие сандалии для душа", "Для альберге и вечера"],
    socks: ["Обувь и стопы", "3 пары проверенных походных носков", "1 пара на себе, 2 в рюкзаке"],
    insoles: ["Обувь и стопы", "Проверенные стельки", "Только если вы уже ими пользуетесь"],
    shirts: ["Одежда", "2 лёгкие походные футболки", "1 на себе, 1 в рюкзаке"],
    "sleep-shirt": ["Одежда", "Лёгкая футболка для сна и вечера", "Сухая одежда для спальни"],
    pants: ["Одежда", "2 пары походных брюк", "Шорты плюс лёгкие длинные или брюки-трансформеры"],
    underwear: ["Одежда", "3 пары нижнего белья", "Быстросохнущее"],
    sportsbras: ["Одежда", "2 спортивных бюстгальтера, если нужны", "Заранее проверить, не натирают ли"],
    "sleep-shorts": ["Одежда", "Очень лёгкие шорты для сна", "Не нужны, если хватает походных брюк"],
    fleece: ["Одежда", "Тонкий флис / средний слой", "Для прохладных галисийских утр"],
    hat: ["Одежда", "Кепка или панама", "На побережье местами мало тени"],
    buff: ["Одежда", "Бафф / многофункциональная повязка", "От солнца, ветра и утренней прохлады"],
    "rain-jacket": ["Дождь и ветер", "Водонепроницаемая куртка", "С хорошо сидящим капюшоном"],
    "rain-bottom": ["Дождь и ветер", "Дождевые брюки или юбка", "Лёгкие и быстро надеваются"],
    sleepingbag: ["Сон", "Лёгкий спальный мешок", "Комфортная температура около 10–15 °C"],
    earplugs: ["Сон", "Беруши", "Несколько запасных пар"],
    sleepmask: ["Сон", "Маска для сна", "Для общих спален"],
    headlamp: ["Сон", "Небольшой налобный фонарь", "Красный свет не мешает соседям"],
    tooth: ["Гигиена", "Зубная щётка и маленькая паста", "Дорожный формат"],
    deodorant: ["Гигиена", "Небольшой дезодорант", "Не брать большую упаковку"],
    soap: ["Гигиена", "Небольшое твёрдое мыло", "В проветриваемой коробочке или сетке"],
    towel: ["Гигиена", "Полотенце из микрофибры", "Примерно 40 × 80 см"],
    lipbalm: ["Гигиена", "Бальзам для губ с SPF", "От солнца и прибрежного ветра"],
    "personal-hygiene": ["Гигиена", "Личные средства гигиены", "Только реалистичный объём"],
    sanitizer: ["Гигиена", "Маленький антисептик для рук", "Дорожный формат"],
    tissues: ["Гигиена", "Салфетки / запас бумаги", "Небольшое количество"],
    id: ["Документы и деньги", "Удостоверение личности или паспорт", "Всегда при себе или надёжно убран"],
    credential: ["Документы и деньги", "Официальный креденсиаль пилигрима", "На последних 100 км: 2 печати в день"],
    ehic: ["Документы и деньги", "Европейская карта медицинского страхования", "Плюс подтверждение страховки"],
    cards: ["Документы и деньги", "Банковская карта и отдельная запасная", "Разложить по двум рюкзакам"],
    cash: ["Документы и деньги", "50–100 € наличными", "Мелкими купюрами"],
    emergency: ["Документы и деньги", "Контакты на экстренный случай на бумаге", "Также цифровые копии документов"],
    phone: ["Техника", "Смартфон с офлайн-картой", "В защитном чехле"],
    cable: ["Техника", "Короткий кабель для зарядки", "Подходящий к общей зарядке"],
    "watch-cable": ["Техника", "Кабель для часов или устройства", "Только действительно нужные кабели"],
    bottles: ["Вода и дорога", "Ёмкости для 1–1,5 л воды", "Подбирать объём под дневной этап"],
    electrolytes: ["Вода и дорога", "2–4 порции электролитов", "Небольшой запас на жару"],
    foodbag: ["Вода и дорога", "Лёгкий пакет для еды на день", "Не нести еду на несколько дней"],
    poles: ["По желанию", "2 треккинговые палки", "Только после тренировки; проверить правила перелёта"],
    sunglasses: ["По желанию", "Солнцезащитные очки", "С надёжным футляром или шнурком"],
    swimwear: ["По желанию", "Купальная одежда", "Не нужна, если в походных шортах можно купаться"],
    shell: ["По желанию", "Ракушка пилигрима", "Знак пилигрима и память о пути"],
    charger: ["Зарядка", "USB-зарядка на 2 разъёма", "Достаточно 30–45 Вт"],
    powerbank: ["Зарядка", "Пауэрбанк 10 000 мА·ч", "Один на двоих"],
    sunscreen: ["Уход", "Солнцезащитный крем SPF 50", "Начать со 100–150 мл, затем докупить"],
    antichafe: ["Уход", "Стик от натирания / бальзам для стоп", "Заранее наносить на проблемные места"],
    repellent: ["Уход", "Небольшой репеллент", "Если вы чувствительны к укусам"],
    blister: ["Мини-аптечка", "Пластыри от мозолей разных размеров", "Гидроколлоидные"],
    tape: ["Мини-аптечка", "Проверенный спортивный тейп", "Для профилактики натирания"],
    dressings: ["Мини-аптечка", "Пластыри и стерильные салфетки", "Небольшой набор"],
    disinfectant: ["Мини-аптечка", "Антисептик для ран", "Дорожный формат"],
    tweezers: ["Мини-аптечка", "Пинцет", "Маленький и лёгкий"],
    bandage: ["Мини-аптечка", "Небольшой эластичный бинт", "Один на двоих"],
    "known-meds": ["Мини-аптечка", "Немного проверенных обычных лекарств", "Только то, что вы переносите; личные лекарства отдельно"],
    rehydration: ["Мини-аптечка", "2 порции раствора для регидратации", "На случай жары или проблем с желудком"],
    nailclipper: ["Мини-аптечка", "Книпсер / маленькая пилочка", "Удобнее для перелёта, чем ножницы"],
    laundrysoap: ["Стирка и ремонт", "Небольшое мыло или средство для стирки", "Для регулярной стирки"],
    pegs: ["Стирка и ремонт", "4–6 маленьких прищепок", "Или английские булавки"],
    line: ["Стирка и ремонт", "3–4 м тонкой бельевой верёвки", "Одна на двоих"],
    sewing: ["Стирка и ремонт", "Мини-набор для шитья", "Игла, нитка, 2 английские булавки"],
    "tape-repair": ["Стирка и ремонт", "Немного армированного скотча", "Намотать на старую карту"],
    zips: ["Стирка и ремонт", "Дополнительные зип-пакеты", "Для мокрых вещей, мусора и электроники"],
    tote: ["Полезные мелочи", "Лёгкая тканевая сумка", "Для покупок в конце этапа"],
    lock: ["Полезные мелочи", "Маленький навесной замок", "Если есть шкафчик"],
    pen: ["Полезные мелочи", "Шариковая ручка", "Для креденсиаля и анкет"],
    sporks: ["Полезные мелочи", "2 лёгкие ложки / спорка", "В кухнях муниципальных альберге часто нет посуды"]
  };

  const englishItems = {
    backpack: ["Backpack & organisation", "32–38 l backpack with hip belt", "Test it beforehand with the full load"],
    liner: ["Backpack & organisation", "Waterproof backpack liner", "More important than a simple rain cover"],
    packsacks: ["Backpack & organisation", "2 lightweight dry bags / zip bags", "Keep clean and wet items separate"],
    valuables: ["Backpack & organisation", "Small valuables pouch", "Keep it within reach, including at night"],
    shoes: ["Footwear & feet", "Broken-in trail or hiking shoes", "Do not start in brand-new shoes"],
    sandals: ["Footwear & feet", "Lightweight shower sandals", "For albergues and evenings"],
    socks: ["Footwear & feet", "3 pairs of tested hiking socks", "1 pair worn, 2 in the backpack"],
    insoles: ["Footwear & feet", "Tested insoles", "Only if you already use them"],
    shirts: ["Clothing", "2 lightweight hiking shirts", "1 worn, 1 in the backpack"],
    "sleep-shirt": ["Clothing", "Light sleep / evening shirt", "Dry clothing for the dormitory"],
    pants: ["Clothing", "2 pairs of hiking trousers", "Shorts plus light long trousers or zip-offs"],
    underwear: ["Clothing", "3 pairs of underwear", "Quick-drying"],
    sportsbras: ["Clothing", "2 sports bras, if needed", "Test for chafing beforehand"],
    "sleep-shorts": ["Clothing", "Very light sleep shorts", "Skip them if hiking trousers are enough"],
    fleece: ["Clothing", "Thin fleece / mid-layer", "For cool Galician mornings"],
    hat: ["Clothing", "Cap or sun hat", "Some coastal stretches offer little shade"],
    buff: ["Clothing", "Buff / multifunctional neckwear", "For sun, wind and cool mornings"],
    "rain-jacket": ["Rain & wind", "Waterproof rain jacket", "With a well-fitting hood"],
    "rain-bottom": ["Rain & wind", "Rain trousers or rain skirt", "Lightweight and quick to put on"],
    sleepingbag: ["Sleeping", "Lightweight sleeping bag", "Comfort range around 10–15 °C"],
    earplugs: ["Sleeping", "Earplugs", "Bring several spare pairs"],
    sleepmask: ["Sleeping", "Sleep mask", "For shared dormitories"],
    headlamp: ["Sleeping", "Small headlamp", "Red light is considerate to other sleepers"],
    tooth: ["Hygiene", "Toothbrush and small toothpaste", "Travel size"],
    deodorant: ["Hygiene", "Small deodorant", "No full-size container"],
    soap: ["Hygiene", "Small solid wash bar", "In a ventilated case or mesh bag"],
    towel: ["Hygiene", "Microfibre towel", "About 40 × 80 cm"],
    lipbalm: ["Hygiene", "Lip balm with SPF", "For sun and coastal wind"],
    "personal-hygiene": ["Hygiene", "Personal hygiene items", "Pack only a realistic amount"],
    sanitizer: ["Hygiene", "Small hand sanitiser", "Travel size"],
    tissues: ["Hygiene", "Tissues / emergency paper", "A small amount"],
    id: ["Documents & money", "ID card or passport", "Keep on your person or securely stored"],
    credential: ["Documents & money", "Official pilgrim credencial", "Final 100 km: 2 stamps per day"],
    ehic: ["Documents & money", "European Health Insurance Card", "Plus proof of insurance"],
    cards: ["Documents & money", "Bank card plus separate backup card", "Split them between both backpacks"],
    cash: ["Documents & money", "€50–100 in cash", "Use small notes"],
    emergency: ["Documents & money", "Emergency contacts on paper", "Plus digital copies of documents"],
    phone: ["Technology", "Smartphone with offline map", "In a protective case"],
    cable: ["Technology", "Short charging cable", "Compatible with the shared charger"],
    "watch-cable": ["Technology", "Watch / device cable as needed", "Only bring cables you actually need"],
    bottles: ["Water & on the way", "Bottles for 1–1.5 l of water", "Adjust capacity to the day's stage"],
    electrolytes: ["Water & on the way", "2–4 servings of electrolytes", "A small reserve for hot days"],
    foodbag: ["Water & on the way", "Light bag for daytime food", "Do not carry several days of food"],
    poles: ["Optional", "2 trekking poles", "Only if trained with them; check flight rules"],
    sunglasses: ["Optional", "Sunglasses", "With a secure case or strap"],
    swimwear: ["Optional", "Swimwear", "Skip it if your hiking shorts work for swimming"],
    shell: ["Optional", "Pilgrim shell", "Pilgrim symbol and keepsake"],
    charger: ["Charging", "Dual-port USB charger", "30–45 W is enough"],
    powerbank: ["Charging", "10,000 mAh power bank", "One for both of you"],
    sunscreen: ["Care", "SPF 50 sunscreen", "Start with 100–150 ml and buy more en route"],
    antichafe: ["Care", "Anti-chafe stick / foot balm", "Use early on known friction points"],
    repellent: ["Care", "Small insect repellent", "If you react strongly to bites"],
    blister: ["Mini first-aid kit", "Blister plasters in several sizes", "Hydrocolloid"],
    tape: ["Mini first-aid kit", "Tested sports tape", "Use preventively on friction points"],
    dressings: ["Mini first-aid kit", "Plasters and sterile dressings", "A small selection"],
    disinfectant: ["Mini first-aid kit", "Small wound disinfectant", "Travel size"],
    tweezers: ["Mini first-aid kit", "Tweezers", "Small and light"],
    bandage: ["Mini first-aid kit", "Small elastic bandage", "One shared between you"],
    "known-meds": ["Mini first-aid kit", "A few familiar standard medicines", "Only what you tolerate; keep personal medication separate"],
    rehydration: ["Mini first-aid kit", "2 servings of oral rehydration solution", "For heat or stomach problems"],
    nailclipper: ["Mini first-aid kit", "Nail clippers / small file", "More flight-friendly than scissors"],
    laundrysoap: ["Laundry & repairs", "Small laundry soap / travel detergent", "For regular washing"],
    pegs: ["Laundry & repairs", "4–6 small clothes pegs", "Or safety pins"],
    line: ["Laundry & repairs", "3–4 m thin clothesline", "One for both of you"],
    sewing: ["Laundry & repairs", "Mini sewing kit", "Needle, thread and 2 safety pins"],
    "tape-repair": ["Laundry & repairs", "A little duct tape", "Wrapped around an old card"],
    zips: ["Laundry & repairs", "Extra zip bags", "For wet items, rubbish and electronics"],
    tote: ["Everyday helpers", "Lightweight tote bag", "For shopping at the end of a stage"],
    lock: ["Everyday helpers", "Small padlock", "If a locker is available"],
    pen: ["Everyday helpers", "Ballpoint pen", "For the credencial and forms"],
    sporks: ["Everyday helpers", "2 lightweight spoons / sporks", "Municipal albergue kitchens often have no utensils"]
  };

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
    custom: { p1: [], p2: [], shared: [] },
    deleted: { p1: {}, p2: {}, shared: {} },
    diary: [],
    labels: {
      profiles: {},
      items: { p1: {}, p2: {}, shared: {} }
    }
  });

  let activeLanguage = loadLanguage();
  let state = loadState();
  let activeProfile = "p1";
  let activeFilter = "all";
  let searchTerm = "";
  let serverReady = false;
  let syncTimer = null;
  let pendingGpx = null;
  let diaryAnimationStops = [];
  let diaryAnimationGeneration = 0;
  let currentSyncStatus = { key: "sync.loading", isError: false };

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
    syncStatus: document.getElementById("sync-status"),
    diaryFeed: document.getElementById("diary-feed"),
    diaryForm: document.getElementById("diary-form"),
    diaryDate: document.getElementById("diary-date"),
    diaryTitle: document.getElementById("diary-entry-title"),
    diaryFrom: document.getElementById("diary-from"),
    diaryTo: document.getElementById("diary-to"),
    diaryNote: document.getElementById("diary-note"),
    diaryGpx: document.getElementById("diary-gpx"),
    gpxReadout: document.getElementById("gpx-readout")
  };

  function loadLanguage() {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      return ["de", "en", "ru"].includes(stored) ? stored : "de";
    } catch (_) {
      return "de";
    }
  }

  function t(key, values = {}) {
    const dictionary = translations[activeLanguage] || translations.de;
    const template = dictionary[key] || translations.de[key] || key;
    return Object.entries(values).reduce(
      (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
      template
    );
  }

  function profileName(profile, detailed = false) {
    const saved = state.labels.profiles[profile];
    if (typeof saved === "string" && saved.trim()) return saved.trim();
    if (profile === "shared" && detailed) return t("profiles.sharedTitle");
    return t(`profiles.${profile}`);
  }

  function localizedItem(profile, item) {
    let localized;
    if (item.custom === true) {
      localized = { ...item, category: t("custom.category"), note: t("item.custom") };
    } else if (activeLanguage === "en" && englishItems[item.id]) {
      const [category, name, note] = englishItems[item.id];
      localized = { ...item, category, name, note };
    } else if (activeLanguage === "ru" && russianItems[item.id]) {
      const [category, name, note] = russianItems[item.id];
      localized = { ...item, category, name, note };
    } else {
      localized = item;
    }
    const savedName = state.labels.items[profile][item.id];
    return typeof savedName === "string" && savedName.trim()
      ? { ...localized, name: savedName.trim() }
      : localized;
  }

  function applyStaticTranslations() {
    document.documentElement.lang = activeLanguage;
    document.title = t("page.title");
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === activeLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    setSyncStatus(currentSyncStatus.key, currentSyncStatus.isError);
  }

  function setLanguage(language) {
    activeLanguage = ["en", "ru"].includes(language) ? language : "de";
    try {
      localStorage.setItem(LANGUAGE_KEY, activeLanguage);
    } catch (_) {}
    searchTerm = els.search.value.trim().toLocaleLowerCase(languageLocale());
    applyStaticTranslations();
    render();
  }

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
      if (value.deleted?.[profile] && typeof value.deleted[profile] === "object") {
        normalized.deleted[profile] = value.deleted[profile];
      }
      if (value.labels?.items?.[profile] && typeof value.labels.items[profile] === "object") {
        normalized.labels.items[profile] = value.labels.items[profile];
      }
    });
    if (value.labels?.profiles && typeof value.labels.profiles === "object") {
      normalized.labels.profiles = value.labels.profiles;
    }
    if (Array.isArray(value.diary)) {
      normalized.diary = value.diary.slice(0, 40).filter((entry) => entry && typeof entry === "object").map((entry) => ({
        id: String(entry.id || `diary-${Date.now()}`),
        date: String(entry.date || "").slice(0, 10),
        title: String(entry.title || "").slice(0, 80),
        from: String(entry.from || "").slice(0, 60),
        to: String(entry.to || "").slice(0, 60),
        note: String(entry.note || "").slice(0, 2400),
        gpxName: String(entry.gpxName || "").slice(0, 140),
        stats: entry.stats && typeof entry.stats === "object" ? {
          distance: Number(entry.stats.distance) || 0,
          ascent: Number(entry.stats.ascent) || 0,
          descent: Number(entry.stats.descent) || 0,
          min: Number(entry.stats.min) || 0,
          max: Number(entry.stats.max) || 0
        } : null,
        track: Array.isArray(entry.track) ? entry.track.slice(0, 100).filter((point) => Array.isArray(point) && point.length >= 3).map((point) => [Number(point[0]), Number(point[1]), Number(point[2])]) : []
      }));
    }
    return normalized;
  }

  function writeLocalState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setSyncStatus(key, isError = false) {
    if (!els.syncStatus) return;
    currentSyncStatus = { key, isError };
    els.syncStatus.textContent = t(key);
    els.syncStatus.classList.toggle("error", isError);
  }

  async function pushState() {
    if (!serverReady) return;
    setSyncStatus("sync.saving");
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
      if (!response.ok) throw new Error("Save failed");
      setSyncStatus("sync.saved");
    } catch (_) {
      setSyncStatus("sync.local", true);
    }
  }

  function saveState() {
    writeLocalState();
    if (!serverReady) return;
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(pushState, 350);
  }

  async function loadSharedState() {
    setSyncStatus("sync.loading");
    try {
      const response = await fetch("/api/state", { credentials: "same-origin" });
      if (response.status === 401) {
        window.location.assign("/");
        return;
      }
      if (!response.ok) throw new Error("Load failed");
      const data = await response.json();
      serverReady = true;
      if (data.state && data.state.checked && data.state.weights && data.state.custom) {
        state = normalizeState(data.state);
        writeLocalState();
        render();
        setSyncStatus("sync.saved");
      } else {
        await pushState();
      }
    } catch (_) {
      setSyncStatus("sync.offline", true);
    }
  }

  function getItems(profile) {
    const base = profile === "shared" ? sharedItems : personalItems;
    return [...base, ...(state.custom[profile] || [])]
      .filter((item) => !state.deleted[profile][item.id]);
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
    return `${(grams / 1000).toLocaleString(languageLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 2 })} kg`;
  }

  function languageLocale() {
    if (activeLanguage === "ru") return "ru-RU";
    if (activeLanguage === "en") return "en-GB";
    return "de-DE";
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function formatDiaryDate(value) {
    const date = new Date(`${value || "1970-01-01"}T12:00:00`);
    return new Intl.DateTimeFormat(languageLocale(), { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(date);
  }

  function routePolyline(track, width = 640, height = 300, padding = 34) {
    if (!Array.isArray(track) || track.length < 2) return "";
    const lats = track.map((point) => point[0]);
    const lons = track.map((point) => point[1]);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const spanLon = Math.max(.00001, maxLon - minLon);
    const spanLat = Math.max(.00001, maxLat - minLat);
    const scale = Math.min((width - padding * 2) / spanLon, (height - padding * 2) / spanLat);
    const offsetX = (width - spanLon * scale) / 2;
    const offsetY = (height - spanLat * scale) / 2;
    return track.map((point) => `${(offsetX + (point[1] - minLon) * scale).toFixed(1)},${(offsetY + (maxLat - point[0]) * scale).toFixed(1)}`).join(" ");
  }

  function elevationPath(track, width = 640, height = 72) {
    if (!Array.isArray(track) || track.length < 2) return "";
    const elevations = track.map((point) => Number(point[2]) || 0);
    const min = Math.min(...elevations);
    const max = Math.max(...elevations);
    const span = Math.max(1, max - min);
    const points = elevations.map((elevation, index) => `${(index / (elevations.length - 1) * width).toFixed(1)},${(6 + (max - elevation) / span * (height - 14)).toFixed(1)}`);
    return `M0,${height} L${points.join(" L")} L${width},${height} Z`;
  }

  function initDiaryCanvasAnimations() {
    diaryAnimationStops.forEach((stop) => stop());
    diaryAnimationStops = [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    els.diaryFeed.querySelectorAll("[data-diary-tour]").forEach((tour) => {
      const entry = state.diary.find((item) => item.id === tour.dataset.diaryTour);
      const canvas = tour.querySelector("canvas");
      const button = tour.querySelector("[data-tour-play]");
      const progress = tour.querySelector("[data-tour-progress]");
      if (!entry || entry.track.length < 2 || !canvas || !button || !progress) return;

      const context = canvas.getContext("2d");
      let fraction = 0;
      let playing = false;
      let frame = 0;
      let startedAt = 0;
      let startFraction = 0;
      let stopped = false;

      function geometry(width, height) {
        const lats = entry.track.map((point) => point[0]);
        const lons = entry.track.map((point) => point[1]);
        const elevations = entry.track.map((point) => point[2]);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLon = Math.min(...lons);
        const maxLon = Math.max(...lons);
        const minEle = Math.min(...elevations);
        const maxEle = Math.max(...elevations);
        const lonSpan = Math.max(.00001, maxLon - minLon);
        const latSpan = Math.max(.00001, maxLat - minLat);
        const elevationSpan = Math.max(1, maxEle - minEle);
        const normalized = entry.track.map((point) => ({
          x: (point[1] - minLon) / lonSpan - .5,
          z: (maxLat - point[0]) / latSpan - .5,
          e: (point[2] - minEle) / elevationSpan
        }));
        const angle = -.44;
        const rotated = normalized.map((point) => ({
          x: point.x * Math.cos(angle) - point.z * Math.sin(angle),
          z: point.x * Math.sin(angle) + point.z * Math.cos(angle),
          e: point.e
        }));
        const xs = rotated.map((point) => point.x);
        const zs = rotated.map((point) => point.z);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minZ = Math.min(...zs);
        const maxZ = Math.max(...zs);
        const scale = Math.min((width - 92) / Math.max(.01, maxX - minX), (height - 96) / Math.max(.01, maxZ - minZ));
        return rotated.map((point) => ({
          x: width / 2 + (point.x - (minX + maxX) / 2) * scale,
          y: Math.max(42, Math.min(height - 64, height / 2 + (point.z - (minZ + maxZ) / 2) * scale * .62 - point.e * Math.min(58, height * .18))),
          e: point.e
        }));
      }

      function pointAt(points, value) {
        const scaled = Math.max(0, Math.min(1, value)) * (points.length - 1);
        const index = Math.min(points.length - 2, Math.floor(scaled));
        const mix = scaled - index;
        const left = points[index];
        const right = points[index + 1];
        return { x: left.x + (right.x - left.x) * mix, y: left.y + (right.y - left.y) * mix };
      }

      function strokeTrack(points, end, color, width) {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        const scaled = Math.max(0, Math.min(1, end)) * (points.length - 1);
        const last = Math.floor(scaled);
        for (let index = 1; index <= last; index += 1) context.lineTo(points[index].x, points[index].y);
        if (last < points.length - 1) {
          const partial = pointAt(points, end);
          context.lineTo(partial.x, partial.y);
        }
        context.strokeStyle = color;
        context.lineWidth = width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
      }

      function drawWalker(point, time) {
        const bob = Math.sin(time / 95) * 1.5;
        const swing = Math.sin(time / 80) * 3.2;
        context.save();
        context.translate(point.x, point.y - 10 + bob);
        context.shadowColor = "rgba(5,30,29,.34)";
        context.shadowBlur = 7;
        context.beginPath();
        context.ellipse(0, 12 - bob, 10, 3.5, 0, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,255,255,.82)";
        context.fill();
        context.shadowBlur = 0;
        context.lineWidth = 4;
        context.lineCap = "round";
        context.strokeStyle = "#243746";
        context.beginPath();
        context.moveTo(-2, 4); context.lineTo(-4 + swing, 13);
        context.moveTo(2, 4); context.lineTo(5 - swing, 13);
        context.stroke();
        context.fillStyle = "#b83b3b";
        context.fillRect(-7, -7, 5, 10);
        context.fillStyle = "#f2b134";
        context.beginPath(); context.roundRect(-4, -8, 9, 13, 3); context.fill();
        context.strokeStyle = "#c98c6b";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(-2, -4); context.lineTo(-7 - swing * .55, 3);
        context.moveTo(3, -4); context.lineTo(8 + swing * .55, 2);
        context.stroke();
        context.fillStyle = "#c98c6b";
        context.beginPath(); context.arc(1, -13, 4.5, 0, Math.PI * 2); context.fill();
        context.fillStyle = "#2d5b4c";
        context.fillRect(-5, -18, 12, 3);
        context.beginPath(); context.arc(1, -17, 5, Math.PI, 0); context.fill();
        context.restore();
      }

      function draw(time = 0) {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(2, window.devicePixelRatio || 1);
        const width = Math.max(280, Math.round(rect.width));
        const height = Math.max(230, Math.round(rect.height));
        if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
          canvas.width = width * ratio;
          canvas.height = height * ratio;
        }
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.clearRect(0, 0, width, height);
        const points = geometry(width, height);
        const gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#dcebf2");
        gradient.addColorStop(.48, "#b9d3be");
        gradient.addColorStop(1, "#6f9075");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        context.save();
        context.globalAlpha = .28;
        for (let band = 0; band < 9; band += 1) {
          context.beginPath();
          const baseY = height * (.24 + band * .075);
          context.moveTo(-20, baseY);
          for (let x = -20; x <= width + 20; x += 16) {
            const wave = Math.sin(x * .018 + band * .9) * (8 + band * .7) + Math.sin(x * .047 - band) * 4;
            context.lineTo(x, baseY + wave);
          }
          context.strokeStyle = band % 3 === 0 ? "#f7f3ea" : "#355f50";
          context.lineWidth = band % 3 === 0 ? 1.6 : 1;
          context.stroke();
        }
        context.restore();

        for (let layer = 12; layer >= 1; layer -= 1) strokeTrack(points.map((point) => ({ x: point.x, y: point.y + layer * 1.5 })), 1, `rgba(31,57,47,${.025 + layer * .008})`, 15);
        strokeTrack(points, 1, "rgba(255,247,232,.96)", 12);
        strokeTrack(points, 1, "rgba(117,96,49,.52)", 7);
        strokeTrack(points, fraction, "#ffcd30", 7);
        const walkerPoint = pointAt(points, fraction);
        drawWalker(walkerPoint, playing ? time : 0);

        const start = points[0];
        const end = points.at(-1);
        [[start, entry.from], [end, entry.to]].forEach(([point, label], index) => {
          context.beginPath(); context.arc(point.x, point.y, 5, 0, Math.PI * 2); context.fillStyle = index ? "#e84a2a" : "#fff7e8"; context.fill();
          if (label) {
            context.font = "600 12px Inter, sans-serif";
            context.lineWidth = 4; context.strokeStyle = "rgba(255,255,255,.9)"; context.strokeText(label, point.x + 9, point.y - 8);
            context.fillStyle = "#20313a"; context.fillText(label, point.x + 9, point.y - 8);
          }
        });
      }

      function tick(time) {
        if (stopped || !playing) return;
        if (!startedAt) startedAt = time;
        fraction = Math.min(1, startFraction + (time - startedAt) / 16000);
        progress.value = String(Math.round(fraction * 100));
        draw(time);
        if (fraction >= 1) {
          playing = false;
          button.textContent = t("diary.replay");
          button.classList.remove("playing");
          return;
        }
        frame = requestAnimationFrame(tick);
      }

      function toggle() {
        if (playing) {
          playing = false;
          cancelAnimationFrame(frame);
          button.textContent = t("diary.play");
          button.classList.remove("playing");
          return;
        }
        if (fraction >= 1) fraction = 0;
        playing = true;
        startFraction = fraction;
        startedAt = 0;
        button.textContent = t("diary.pause");
        button.classList.add("playing");
        frame = requestAnimationFrame(tick);
      }

      button.addEventListener("click", toggle);
      progress.addEventListener("input", () => {
        fraction = Number(progress.value) / 100;
        startFraction = fraction;
        startedAt = 0;
        draw(performance.now());
      });
      let resizeFrame = 0;
      const resize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => draw(performance.now()));
      };
      window.addEventListener("resize", resize, { passive: true });
      draw();
      diaryAnimationStops.push(() => {
        stopped = true;
        cancelAnimationFrame(frame);
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener("resize", resize);
      });
    });
  }

  function initDiaryAnimations() {
    diaryAnimationStops.forEach((stop) => stop());
    diaryAnimationStops = [];
    const generation = ++diaryAnimationGeneration;
    const tours = [...els.diaryFeed.querySelectorAll("[data-diary-tour]")];
    if (!tours.length) return;
    import("/diary-3d.js?v=15").then(({ mountDiaryTour }) => {
      if (generation !== diaryAnimationGeneration) return;
      tours.forEach((tour) => {
        const entry = state.diary.find((item) => item.id === tour.dataset.diaryTour);
        if (!entry || entry.track.length < 2) return;
        diaryAnimationStops.push(mountDiaryTour(tour, entry, {
          play: t("diary.play"),
          pause: t("diary.pause"),
          replay: t("diary.replay"),
          error: t("diary.mapError"),
          export: t("diary.export"),
          exporting: t("diary.exporting"),
          exportReady: t("diary.exportReady"),
          exportError: t("diary.exportError")
        }));
      });
    }).catch(() => {
      tours.forEach((tour) => {
        const loading = tour.querySelector("[data-tour-loading]");
        if (loading) {
          loading.textContent = t("diary.mapError");
          loading.classList.add("error");
        }
      });
    });
  }

  function renderDiary() {
    if (!els.diaryFeed) return;
    const entries = [...state.diary].sort((left, right) => String(right.date).localeCompare(String(left.date)));
    if (!entries.length) {
      els.diaryFeed.innerHTML = `<div class="diary-empty"><div><span aria-hidden="true">◒</span><h3>${escapeHTML(t("diary.emptyTitle"))}</h3><p>${escapeHTML(t("diary.emptyCopy"))}</p></div></div>`;
      return;
    }
    els.diaryFeed.innerHTML = entries.map((entry, index) => {
      const stats = entry.stats;
      const polyline = routePolyline(entry.track);
      const map = polyline
        ? `<div class="diary-tour" data-diary-tour="${escapeHTML(entry.id)}"><canvas class="diary-route-canvas" role="img" aria-label="${escapeHTML(t("diary.animation"))}"></canvas><div class="diary-map-loading" data-tour-loading role="status">${escapeHTML(t("diary.mapLoading"))}</div><div class="diary-tour-hint" aria-hidden="true">↻ 3D</div><div class="diary-tour-actions"><label><input type="checkbox" data-tour-follow checked><span>${escapeHTML(t("diary.follow"))}</span></label><button type="button" data-tour-export>${escapeHTML(t("diary.export"))}</button><a data-tour-download hidden>${escapeHTML(t("diary.exportReady"))}</a></div><small class="diary-map-attribution">${escapeHTML(t("diary.attribution"))}</small><div class="diary-tour-controls"><button type="button" data-tour-play>${escapeHTML(t("diary.play"))}</button><input type="range" min="0" max="1000" value="0" step="1" data-tour-progress aria-label="${escapeHTML(t("diary.animation"))}"></div></div>`
        : `<div class="diary-map-empty">${escapeHTML(t("diary.noRoute"))}</div>`;
      const places = [entry.from, entry.to].filter(Boolean).map(escapeHTML).join(" → ");
      const statMarkup = stats ? `<div class="diary-stats">
        <div class="diary-stat"><strong>${stats.distance.toLocaleString(languageLocale(), { maximumFractionDigits: 1 })}</strong><span>${escapeHTML(t("diary.distance"))}</span></div>
        <div class="diary-stat"><strong>${Math.round(stats.ascent)} m</strong><span>${escapeHTML(t("diary.ascent"))}</span></div>
        <div class="diary-stat"><strong>${Math.round(stats.descent)} m</strong><span>${escapeHTML(t("diary.descent"))}</span></div>
        <div class="diary-stat"><strong>${Math.round(stats.min)}–${Math.round(stats.max)} m</strong><span>${escapeHTML(t("diary.elevation"))}</span></div>
      </div>${entry.track.length > 1 ? `<svg class="diary-elevation" viewBox="0 0 640 72" preserveAspectRatio="none" aria-hidden="true"><path d="${elevationPath(entry.track)}"></path><circle class="diary-elevation-marker-halo" data-elevation-marker cx="0" cy="66" r="9"></circle><circle class="diary-elevation-marker" data-elevation-marker cx="0" cy="66" r="4.5"></circle></svg>` : ""}` : "";
      return `<article class="diary-entry">
        <div class="diary-map"><span class="diary-map-badge">${escapeHTML(entry.gpxName || `${t("diary.route")} ${entries.length - index}`)}</span>${map}</div>
        <div class="diary-entry-body">
          <div class="diary-entry-top"><div><time class="diary-date" datetime="${escapeHTML(entry.date)}">${escapeHTML(formatDiaryDate(entry.date))}</time><h3>${escapeHTML(entry.title)}</h3></div><button class="diary-delete" type="button" data-diary-delete="${escapeHTML(entry.id)}" aria-label="${escapeHTML(t("diary.delete"))}">×</button></div>
          ${places ? `<p class="diary-places">${places}</p>` : ""}
          ${entry.note ? `<p class="diary-note">${escapeHTML(entry.note)}</p>` : ""}
          ${statMarkup}
        </div>
      </article>`;
    }).join("");
    initDiaryAnimations();
  }

  function haversine(left, right) {
    const radius = 6371;
    const radians = (value) => value * Math.PI / 180;
    const lat = radians(right[0] - left[0]);
    const lon = radians(right[1] - left[1]);
    const a = Math.sin(lat / 2) ** 2 + Math.cos(radians(left[0])) * Math.cos(radians(right[0])) * Math.sin(lon / 2) ** 2;
    return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function parseGpx(text, name) {
    const documentNode = new DOMParser().parseFromString(text, "application/xml");
    if (documentNode.querySelector("parsererror")) throw new Error("Invalid GPX");
    const nodes = [...documentNode.getElementsByTagNameNS("*", "trkpt")];
    if (nodes.length < 2) throw new Error("No track");
    const points = nodes.map((node) => {
      const elevationNode = node.getElementsByTagNameNS("*", "ele")[0];
      return [Number(node.getAttribute("lat")), Number(node.getAttribute("lon")), Number(elevationNode?.textContent || 0)];
    }).filter((point) => point.every(Number.isFinite));
    if (points.length < 2) throw new Error("No points");
    let distance = 0;
    let ascent = 0;
    let descent = 0;
    for (let index = 1; index < points.length; index += 1) {
      distance += haversine(points[index - 1], points[index]);
      const difference = points[index][2] - points[index - 1][2];
      if (difference > 0) ascent += difference;
      else descent += Math.abs(difference);
    }
    const stride = Math.max(1, Math.ceil(points.length / 90));
    const sampled = points.filter((_, index) => index % stride === 0);
    if (sampled.at(-1) !== points.at(-1)) sampled.push(points.at(-1));
    const elevations = points.map((point) => point[2]);
    return {
      gpxName: name.slice(0, 140),
      stats: { distance: Number(distance.toFixed(2)), ascent: Math.round(ascent), descent: Math.round(descent), min: Math.round(Math.min(...elevations)), max: Math.round(Math.max(...elevations)) },
      track: sampled.map((point) => [Number(point[0].toFixed(5)), Number(point[1].toFixed(5)), Number(point[2].toFixed(1))])
    };
  }

  function render() {
    renderTabs();
    renderOverview();
    renderDiary();

    const stats = profileStats(activeProfile);
    els.profileTitle.textContent = profileName(activeProfile, true);
    els.profileSummary.textContent = t("profiles.summary", {
      done: stats.done,
      total: stats.total,
      weight: formatWeight(stats.packedWeight)
    });
    els.profileRing.style.setProperty("--progress", `${stats.percent * 3.6}deg`);
    els.profileRing.querySelector("span").textContent = `${stats.percent}%`;

    const filtered = getItems(activeProfile).map((item) => localizedItem(activeProfile, item)).filter((item) => {
      const filterMatch = activeFilter === "all" || item.priority === activeFilter;
      const haystack = `${item.name} ${item.note} ${item.category}`.toLocaleLowerCase(languageLocale());
      return filterMatch && haystack.includes(searchTerm);
    });

    const groups = filtered.reduce((acc, item) => {
      (acc[item.category] ||= []).push(item);
      return acc;
    }, {});

    if (!filtered.length) {
      els.list.innerHTML = `<div class="empty-state"><strong>${escapeHTML(t("empty.title"))}</strong><p>${escapeHTML(t("empty.copy"))}</p></div>`;
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
    return `
      <article class="pack-item ${checked ? "checked" : ""}">
        <label class="check-control">
          <input type="checkbox" data-check-id="${escapeHTML(item.id)}" ${checked ? "checked" : ""}>
          <span aria-hidden="true">✓</span>
          <span class="sr-only">${escapeHTML(t(checked ? "item.uncheck" : "item.check"))}: ${escapeHTML(item.name)}</span>
        </label>
        <div class="item-copy">
          <div class="item-title-row">
            <strong>${escapeHTML(item.name)}</strong>
            <button class="rename-button rename-item" type="button" data-rename-id="${escapeHTML(item.id)}" aria-label="${escapeHTML(t("rename.itemAria", { name: item.name }))}">✎</button>
            <span class="priority ${item.priority}">${escapeHTML(t(`priority.${item.priority}`))}</span>
          </div>
          <p>${escapeHTML(item.note || t("item.custom"))}</p>
        </div>
        <div class="item-meta">
          <label class="weight-input" title="${escapeHTML(t("item.weightTitle"))}">
            <input type="number" min="0" max="10000" step="1" value="${weightOf(activeProfile, item)}" data-weight-id="${escapeHTML(item.id)}" aria-label="${escapeHTML(t("item.weightAria", { name: item.name }))}">
            <span>g</span>
          </label>
          <small>${escapeHTML(t(`mode.${item.mode || "pack"}`))}</small>
        </div>
        <button class="delete-item" type="button" data-delete-id="${escapeHTML(item.id)}" aria-label="${escapeHTML(t("item.delete", { name: item.name }))}">×</button>
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
      const name = profileName(profile);
      const nameElement = document.querySelector(`[data-profile-name="${profile}"]`);
      const renameButton = document.querySelector(`[data-rename-profile="${profile}"]`);
      if (nameElement) nameElement.textContent = name;
      if (renameButton) {
        const label = t("rename.profileAria", { name });
        renameButton.setAttribute("aria-label", label);
        renameButton.setAttribute("title", label);
      }
      document.getElementById(`${profile}-tab-meta`).textContent = t("profiles.meta", { done: stats.done, total: stats.total });
      const customOption = els.customProfile?.querySelector(`option[value="${profile}"]`);
      if (customOption) customOption.textContent = name;
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
    els.overallDetail.textContent = done
      ? t("overview.detail", { done, total })
      : t("overview.none");
    els.currentWeight.textContent = formatWeight(weight);
  }

  document.querySelectorAll(".profile-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeProfile = tab.dataset.profile;
      if (els.customProfile) els.customProfile.value = activeProfile;
      render();
    });
  });

  document.querySelectorAll("[data-rename-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      const profile = button.dataset.renameProfile;
      const currentName = profileName(profile);
      const entered = window.prompt(t("rename.profilePrompt"), currentName);
      if (entered === null) return;
      const nextName = entered.trim().slice(0, 60);
      if (nextName) state.labels.profiles[profile] = nextName;
      else delete state.labels.profiles[profile];
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  document.querySelectorAll(".filter-pill").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-pill").forEach((pill) => pill.classList.toggle("active", pill === button));
      render();
    });
  });

  els.search.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLocaleLowerCase(languageLocale());
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
      els.profileSummary.textContent = t("profiles.summary", {
        done: stats.done,
        total: stats.total,
        weight: formatWeight(stats.packedWeight)
      });
    }
  });

  els.list.addEventListener("click", (event) => {
    const renameId = event.target.dataset.renameId;
    if (renameId) {
      const item = getItems(activeProfile).find((entry) => entry.id === renameId);
      if (!item) return;
      const currentName = localizedItem(activeProfile, item).name;
      const entered = window.prompt(t("rename.itemPrompt"), currentName);
      if (entered === null) return;
      const nextName = entered.trim().slice(0, 60);
      if (nextName) state.labels.items[activeProfile][renameId] = nextName;
      else delete state.labels.items[activeProfile][renameId];
      saveState();
      render();
      return;
    }
    const id = event.target.dataset.deleteId;
    if (!id) return;
    const item = getItems(activeProfile).find((entry) => entry.id === id);
    if (!item) return;
    const name = localizedItem(activeProfile, item).name;
    if (!window.confirm(t("item.deleteConfirm", {
      name,
      list: profileName(activeProfile)
    }))) return;
    if (item.custom === true) {
      state.custom[activeProfile] = state.custom[activeProfile].filter((entry) => entry.id !== id);
    } else {
      state.deleted[activeProfile][id] = true;
    }
    delete state.checked[activeProfile][id];
    delete state.weights[activeProfile][id];
    delete state.labels.items[activeProfile][id];
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

  if (els.diaryDate && !els.diaryDate.value) els.diaryDate.value = new Date().toISOString().slice(0, 10);

  els.diaryGpx?.addEventListener("change", async () => {
    const file = els.diaryGpx.files?.[0];
    pendingGpx = null;
    els.gpxReadout.classList.remove("ready", "error");
    if (!file) {
      els.gpxReadout.textContent = t("diary.gpxEmpty");
      return;
    }
    try {
      pendingGpx = parseGpx(await file.text(), file.name);
      els.gpxReadout.textContent = t("diary.gpxReady", {
        name: pendingGpx.gpxName,
        distance: pendingGpx.stats.distance.toLocaleString(languageLocale(), { maximumFractionDigits: 1 }),
        ascent: pendingGpx.stats.ascent
      });
      els.gpxReadout.classList.add("ready");
    } catch (_) {
      els.gpxReadout.textContent = t("diary.gpxError");
      els.gpxReadout.classList.add("error");
    }
  });

  els.diaryForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = els.diaryTitle.value.trim();
    if (!title) return;
    state.diary.push({
      id: `diary-${globalThis.crypto?.randomUUID?.() || Date.now()}`,
      date: els.diaryDate.value || new Date().toISOString().slice(0, 10),
      title: title.slice(0, 80),
      from: els.diaryFrom.value.trim().slice(0, 60),
      to: els.diaryTo.value.trim().slice(0, 60),
      note: els.diaryNote.value.trim().slice(0, 2400),
      gpxName: pendingGpx?.gpxName || "",
      stats: pendingGpx?.stats || null,
      track: pendingGpx?.track || []
    });
    saveState();
    els.diaryForm.reset();
    els.diaryDate.value = new Date().toISOString().slice(0, 10);
    pendingGpx = null;
    els.gpxReadout.textContent = t("diary.gpxEmpty");
    els.gpxReadout.classList.remove("ready", "error");
    renderDiary();
  });

  els.diaryFeed?.addEventListener("click", (event) => {
    const id = event.target.dataset.diaryDelete;
    if (!id || !window.confirm(t("diary.deleteConfirm"))) return;
    state.diary = state.diary.filter((entry) => entry.id !== id);
    saveState();
    renderDiary();
  });

  document.getElementById("print-button").addEventListener("click", () => window.print());
  document.getElementById("reset-button").addEventListener("click", () => {
    if (!window.confirm(t("reset.confirm"))) return;
    const diary = state.diary;
    state = freshState();
    state.diary = diary;
    saveState();
    render();
  });

  function initPackingFilm() {
    const sequence = document.getElementById("packing-sequence");
    const stage = document.getElementById("packing-stage");
    const canvas = document.getElementById("packing-canvas");
    if (!sequence || !stage || !canvas) return;

    const FRAME_COUNT = 100;
    const FRAME_PAD = 4;
    const LERP_FACTOR = 0.115;
    const DWELL_WIDTH = 0.042;
    const DWELL_PEAK = 2.55;
    const LUT_SIZE = 2000;
    const DWELL_CENTERS = [0.04, 0.25, 0.48, 0.71, 0.93];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileMedia = window.matchMedia("(max-width: 680px)");
    const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
    const loader = document.getElementById("packing-loader");
    const loaderFill = document.getElementById("packing-loader-fill");
    const loaderCount = document.getElementById("packing-loader-count");
    const loaderLabel = document.getElementById("packing-loader-label");
    const chapterLabel = document.getElementById("packing-chapter-label");
    const frameLabel = document.getElementById("packing-frame-label");
    const progressBar = document.getElementById("packing-progress");
    const chapters = Array.from(stage.querySelectorAll(".film-chapter"));
    const chapterVisibility = new WeakMap();
    const stores = {
      desktop: createStore("desktop"),
      mobile: createStore("mobile")
    };

    let useMobile = mobileMedia.matches;
    let activeStore = useMobile ? stores.mobile : stores.desktop;
    let currentFrame = 0;
    let targetFrame = 0;
    let lastDrawn = -1;
    let sequenceTop = 0;
    let sequenceDistance = 1;
    let animationFrame = 0;
    let pageVisible = !document.hidden;
    let sequenceVisible = false;

    function createStore(directory) {
      return {
        directory,
        images: new Array(FRAME_COUNT),
        loaded: new Uint8Array(FRAME_COUNT),
        promises: new Array(FRAME_COUNT)
      };
    }

    function frameUrl(index, store = activeStore) {
      return `/packing-sequence/${store.directory}/frame-${String(index + 1).padStart(FRAME_PAD, "0")}.webp`;
    }

    function setLoaderProgress(ratio) {
      const safe = Math.max(0, Math.min(1, ratio));
      loaderFill.style.transform = `scaleX(${safe})`;
      loaderCount.textContent = `${Math.round(safe * 100)} %`;
    }

    function loadFrame(index, store = activeStore, retries = 1) {
      if (store.loaded[index]) return Promise.resolve(store.images[index]);
      if (store.promises[index]) return store.promises[index];
      store.promises[index] = new Promise((resolve) => {
        const attempt = (remaining) => {
          const image = new Image();
          store.images[index] = image;
          image.decoding = "async";
          image.onload = () => {
            store.loaded[index] = 1;
            resolve(image);
          };
          image.onerror = () => {
            if (remaining > 0) {
              window.setTimeout(() => attempt(remaining - 1), 160);
            } else {
              store.images[index] = null;
              store.promises[index] = null;
              resolve(null);
            }
          };
          image.src = frameUrl(index, store);
        };
        attempt(retries);
      });
      return store.promises[index];
    }

    async function loadInBatches(indices, size = 8, store = activeStore) {
      for (let start = 0; start < indices.length; start += size) {
        await Promise.all(indices.slice(start, start + size).map((index) => loadFrame(index, store)));
      }
    }

    function nearestLoaded(index, store = activeStore) {
      if (store.loaded[index]) return index;
      for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
        const before = index - distance;
        const after = index + distance;
        if (before >= 0 && store.loaded[before]) return before;
        if (after < FRAME_COUNT && store.loaded[after]) return after;
      }
      return -1;
    }

    function resizeCanvas() {
      const bounds = reducedMotion ? canvas.getBoundingClientRect() : stage.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(bounds.width * ratio));
      const height = Math.max(1, Math.round(bounds.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        lastDrawn = -1;
      }
    }

    function drawFrame(index) {
      const resolved = nearestLoaded(Math.max(0, Math.min(FRAME_COUNT - 1, index)));
      if (resolved < 0 || resolved === lastDrawn) return;
      const image = activeStore.images[resolved];
      if (!image?.naturalWidth) return;
      const width = canvas.width;
      const height = canvas.height;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.fillStyle = "#062f2d";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      lastDrawn = resolved;
    }

    function updateMetrics() {
      const bounds = sequence.getBoundingClientRect();
      sequenceTop = window.scrollY + bounds.top;
      sequenceDistance = Math.max(1, bounds.height - window.innerHeight);
    }

    const rawAtEffective = new Float64Array(LUT_SIZE + 1);

    function buildDwellLookup() {
      let total = 0;
      const density = new Float64Array(LUT_SIZE + 1);
      for (let index = 0; index <= LUT_SIZE; index += 1) {
        const effective = index / LUT_SIZE;
        let value = 1;
        for (const center of DWELL_CENTERS) {
          const delta = (effective - center) / DWELL_WIDTH;
          value += DWELL_PEAK * Math.exp(-0.5 * delta * delta);
        }
        density[index] = value;
        if (index > 0) total += (density[index - 1] + value) * 0.5;
        rawAtEffective[index] = total;
      }
      for (let index = 0; index <= LUT_SIZE; index += 1) rawAtEffective[index] /= total;
    }

    function remapProgress(raw) {
      let low = 0;
      let high = LUT_SIZE;
      while (low < high) {
        const middle = (low + high) >> 1;
        if (rawAtEffective[middle] < raw) low = middle + 1;
        else high = middle;
      }
      const index = Math.max(1, low);
      const left = rawAtEffective[index - 1];
      const right = rawAtEffective[index];
      const mix = (raw - left) / (right - left || 1);
      return Math.max(0, Math.min(1, (index - 1 + mix) / LUT_SIZE));
    }

    function rawProgress() {
      return Math.max(0, Math.min(1, (window.scrollY - sequenceTop) / sequenceDistance));
    }

    function updateChapters(effective) {
      let active = chapters[0];
      let nearest = Infinity;
      for (const chapter of chapters) {
        const center = Number(chapter.dataset.center);
        const windowSize = Number(chapter.dataset.window);
        const distance = Math.abs(effective - center);
        const visible = distance <= windowSize;
        if (chapterVisibility.get(chapter) !== visible) {
          chapterVisibility.set(chapter, visible);
          chapter.classList.toggle("is-visible", visible);
          chapter.setAttribute("aria-hidden", String(!visible));
        }
        if (distance < nearest) {
          nearest = distance;
          active = chapter;
        }
      }
      chapterLabel.textContent = t(active.dataset.labelKey);
    }

    function updateInterface(raw, effective, frame) {
      progressBar.style.transform = `scaleX(${raw.toFixed(4)})`;
      frameLabel.textContent = `${String(frame + 1).padStart(3, "0")} / ${FRAME_COUNT}`;
      const edge = Math.min(effective, 1 - effective) / 0.08;
      stage.style.setProperty("--film-scrim", String(Math.min(0.82, 0.58 + edge * 0.16)));
    }

    function tick() {
      if (!pageVisible || !sequenceVisible || reducedMotion) return;
      const raw = rawProgress();
      const effective = remapProgress(raw);
      targetFrame = Math.round(effective * (FRAME_COUNT - 1));
      currentFrame += (targetFrame - currentFrame) * LERP_FACTOR;
      const frame = Math.round(currentFrame);
      drawFrame(frame);
      updateChapters(effective);
      updateInterface(raw, effective, frame);
      animationFrame = requestAnimationFrame(tick);
    }

    function startTick() {
      if (!pageVisible || !sequenceVisible || reducedMotion) return;
      cancelAnimationFrame(animationFrame);
      tick();
    }

    function dismissLoader() {
      setLoaderProgress(1);
      loader.classList.add("is-done");
      window.setTimeout(() => loader.remove(), 650);
    }

    function showLoadError() {
      loaderLabel.textContent = t("film.error");
      loaderCount.textContent = "!";
    }

    async function swapFrames(event) {
      useMobile = event.matches;
      activeStore = useMobile ? stores.mobile : stores.desktop;
      lastDrawn = -1;
      resizeCanvas();
      updateMetrics();
      const frame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentFrame)));
      if (!(await loadFrame(frame, activeStore))) return;
      drawFrame(frame);
      const byDistance = Array.from({ length: FRAME_COUNT }, (_, index) => index)
        .sort((left, right) => Math.abs(left - frame) - Math.abs(right - frame));
      loadInBatches(byDistance, 8, activeStore);
    }

    async function init() {
      buildDwellLookup();
      resizeCanvas();
      updateMetrics();
      setLoaderProgress(0.06);

      if (reducedMotion) {
        const posterFrame = 48;
        if (!(await loadFrame(posterFrame))) {
          showLoadError();
          return;
        }
        drawFrame(posterFrame);
        dismissLoader();
        chapters.forEach((chapter) => chapter.removeAttribute("aria-hidden"));
        return;
      }

      const critical = Array.from(new Set([
        0,
        ...DWELL_CENTERS.map((center) => Math.round(center * (FRAME_COUNT - 1))),
        FRAME_COUNT - 1
      ])).sort((left, right) => left - right);

      if (await loadFrame(0)) {
        drawFrame(0);
        setLoaderProgress(0.25);
      }

      let prepared = 0;
      await Promise.all(critical.filter((index) => index !== 0).map(async (index) => {
        const image = await loadFrame(index);
        prepared += 1;
        setLoaderProgress(0.25 + 0.7 * prepared / (critical.length - 1));
        return image;
      }));

      if (nearestLoaded(0) < 0) {
        showLoadError();
        return;
      }

      drawFrame(0);
      updateChapters(0);
      updateInterface(0, 0, 0);
      dismissLoader();
      startTick();
      const remaining = Array.from({ length: FRAME_COUNT }, (_, index) => index)
        .filter((index) => !critical.includes(index));
      loadInBatches(remaining);
    }

    window.addEventListener("resize", () => {
      resizeCanvas();
      updateMetrics();
      drawFrame(Math.round(currentFrame));
    }, { passive: true });
    mobileMedia.addEventListener("change", swapFrames);
    document.addEventListener("visibilitychange", () => {
      pageVisible = !document.hidden;
      if (pageVisible) startTick();
      else cancelAnimationFrame(animationFrame);
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        sequenceVisible = entry.isIntersecting;
        if (sequenceVisible) startTick();
        else cancelAnimationFrame(animationFrame);
      }, { rootMargin: "100% 0px" }).observe(sequence);
    } else {
      sequenceVisible = true;
    }

    init();
  }

  applyStaticTranslations();
  render();
  initPackingFilm();
  loadSharedState();
})();
