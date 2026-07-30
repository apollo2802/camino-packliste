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
    ru: {
      "page.title": "Наш список вещей для Камино",
      "nav.main": "Главная навигация",
      "nav.home": "На главную списка вещей",
      "nav.print": "Печать",
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
    syncStatus: document.getElementById("sync-status")
  };

  function loadLanguage() {
    try {
      return localStorage.getItem(LANGUAGE_KEY) === "ru" ? "ru" : "de";
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
    activeLanguage = language === "ru" ? "ru" : "de";
    try {
      localStorage.setItem(LANGUAGE_KEY, activeLanguage);
    } catch (_) {}
    searchTerm = els.search.value.trim().toLocaleLowerCase(activeLanguage === "ru" ? "ru-RU" : "de-DE");
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
    const locale = activeLanguage === "ru" ? "ru-RU" : "de-DE";
    return `${(grams / 1000).toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 2 })} kg`;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  function render() {
    renderTabs();
    renderOverview();

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
      const locale = activeLanguage === "ru" ? "ru-RU" : "de-DE";
      const haystack = `${item.name} ${item.note} ${item.category}`.toLocaleLowerCase(locale);
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
    searchTerm = event.target.value.trim().toLocaleLowerCase(activeLanguage === "ru" ? "ru-RU" : "de-DE");
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

  document.getElementById("print-button").addEventListener("click", () => window.print());
  document.getElementById("reset-button").addEventListener("click", () => {
    if (!window.confirm(t("reset.confirm"))) return;
    state = freshState();
    saveState();
    render();
  });

  applyStaticTranslations();
  render();
  loadSharedState();
})();
