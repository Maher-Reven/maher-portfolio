export const LOCALES = ["en", "fr", "nl", "fy", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_KEY = "mk-locale";

/** Short code for the toggle, full endonym for the menu. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  nl: "NL",
  fy: "FY",
  ru: "RU",
};
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  nl: "Nederlands",
  fy: "Frysk",
  ru: "Русский",
};

/**
 * Runs before first paint, like the theme script, so the stored locale is on
 * <html> from the first frame rather than flashing English and swapping.
 * Also sets `lang`, which screen readers and search engines actually read.
 *
 * Constants only in this module — no React import — because the root layout is
 * a server component and needs the script string from here.
 */
export const LOCALE_INIT_SCRIPT = `(function(){try{var l=localStorage.getItem("${LOCALE_KEY}");if(["en","fr","nl","fy","ru"].indexOf(l)<0)l="en";document.documentElement.dataset.locale=l;document.documentElement.lang=l;}catch(e){document.documentElement.dataset.locale="en";document.documentElement.lang="en";}})();`;

const en = {
  "site.role": "Engineering Manager · Creative Technologist",
  "site.tagline":
    "Engineering manager exploring the edge of design, motion and emerging tech.",

  "nav.work": "Work",
  "nav.experience": "Experience",
  "nav.lab": "Lab",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.language": "Language",
  "nav.themeToLight": "Switch to light theme",
  "nav.themeToDark": "Switch to dark theme",

  "hero.line1": "Engineering",
  "hero.line2": "that moves.",
  "hero.ctaWork": "Selected work",
  "hero.ctaLab": "Enter the lab",

  "home.workLabel": "selected work",
  "home.workTitle": "Outcomes, not deliverables.",
  "home.allWork": "All work",
  "home.labLabel": "lab",
  "home.labTitle": "Experiments in motion, shaders and interface.",
  "home.aboutLabel": "about",
  "home.aboutMore": "More about me",

  "page.work.label": "work",
  "page.work.title": "Selected work",
  "page.work.intro":
    "Team outcomes and personal projects, framed the same way: problem, approach, result, and what I'd change.",

  "page.experience.label": "experience",
  "page.experience.title": "Ten years building, five leading",
  "page.experience.intro":
    "Engineering management across fintech, healthcare and edtech — always staying close to the code, the incidents, and the people shipping both.",
  "page.experience.education": "Education",

  "page.lab.label": "lab",
  "page.lab.title": "Experiment log",
  "page.lab.intro":
    "Shaders, motion studies and interface ideas. Everything here runs live in this site and is open source.",

  "page.about.label": "about",
  "page.about.title": "I build the platform underneath the platform",
  "page.about.basedIn": "based in",
  "page.about.role": "role",
  "page.about.interests": "interests",

  "page.contact.label": "contact",
  "page.contact.title": "Let's talk",
  "page.contact.intro":
    "Open to conversations about engineering leadership, creative tech, and ambitious side quests.",

  "page.colophon.label": "colophon",
  "page.colophon.title": "How this site is built",
  "page.colophon.intro":
    "The engineering behind the motion — every effect, its cost, and why it's there.",

  "entry.year": "year",
  "entry.role": "role",
  "entry.tags": "stack / tags",
  "entry.allWork": "All work",
  "entry.allExperiments": "All experiments",

  "footer.contact": "contact",
  "footer.elsewhere": "elsewhere",
  "footer.system": "system",
  "footer.colophon": "How this site is built",
} as const;

export type TKey = keyof typeof en;

const fr: Record<TKey, string> = {
  "site.role": "Engineering Manager · Technologue créatif",
  "site.tagline":
    "Engineering manager explorant les frontières du design, du mouvement et des technologies émergentes.",

  "nav.work": "Projets",
  "nav.experience": "Parcours",
  "nav.lab": "Labo",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "nav.menu": "Menu",
  "nav.close": "Fermer",
  "nav.language": "Langue",
  "nav.themeToLight": "Passer au thème clair",
  "nav.themeToDark": "Passer au thème sombre",

  "hero.line1": "L'ingénierie",
  "hero.line2": "qui bouge.",
  "hero.ctaWork": "Projets choisis",
  "hero.ctaLab": "Entrer dans le labo",

  "home.workLabel": "projets choisis",
  "home.workTitle": "Des résultats, pas des livrables.",
  "home.allWork": "Tous les projets",
  "home.labLabel": "labo",
  "home.labTitle": "Expériences en mouvement, shaders et interface.",
  "home.aboutLabel": "à propos",
  "home.aboutMore": "En savoir plus",

  "page.work.label": "projets",
  "page.work.title": "Projets choisis",
  "page.work.intro":
    "Résultats d'équipe et projets personnels, présentés de la même façon : problème, approche, résultat, et ce que je changerais.",

  "page.experience.label": "parcours",
  "page.experience.title": "Dix ans à construire, cinq à diriger",
  "page.experience.intro":
    "Management d'ingénierie dans la fintech, la santé et l'edtech — toujours proche du code, des incidents et des équipes qui livrent les deux.",
  "page.experience.education": "Formation",

  "page.lab.label": "labo",
  "page.lab.title": "Journal d'expériences",
  "page.lab.intro":
    "Shaders, études de mouvement et idées d'interface. Tout ici tourne en direct sur ce site et est open source.",

  "page.about.label": "à propos",
  "page.about.title": "Je construis la plateforme sous la plateforme",
  "page.about.basedIn": "basé à",
  "page.about.role": "rôle",
  "page.about.interests": "intérêts",

  "page.contact.label": "contact",
  "page.contact.title": "Parlons-en",
  "page.contact.intro":
    "Ouvert aux échanges sur le leadership technique, la tech créative et les projets parallèles ambitieux.",

  "page.colophon.label": "colophon",
  "page.colophon.title": "Comment ce site est construit",
  "page.colophon.intro":
    "L'ingénierie derrière le mouvement — chaque effet, son coût, et pourquoi il est là.",

  "entry.year": "année",
  "entry.role": "rôle",
  "entry.tags": "stack / tags",
  "entry.allWork": "Tous les projets",
  "entry.allExperiments": "Toutes les expériences",

  "footer.contact": "contact",
  "footer.elsewhere": "ailleurs",
  "footer.system": "système",
  "footer.colophon": "Comment ce site est construit",
};

const nl: Record<TKey, string> = {
  "site.role": "Engineering Manager · Creatief technoloog",
  "site.tagline":
    "Engineering manager die de grens van design, motion en opkomende technologie verkent.",

  "nav.work": "Werk",
  "nav.experience": "Ervaring",
  "nav.lab": "Lab",
  "nav.about": "Over mij",
  "nav.contact": "Contact",
  "nav.menu": "Menu",
  "nav.close": "Sluiten",
  "nav.language": "Taal",
  "nav.themeToLight": "Wissel naar licht thema",
  "nav.themeToDark": "Wissel naar donker thema",

  "hero.line1": "Engineering",
  "hero.line2": "die beweegt.",
  "hero.ctaWork": "Geselecteerd werk",
  "hero.ctaLab": "Ga naar het lab",

  "home.workLabel": "geselecteerd werk",
  "home.workTitle": "Resultaten, geen deliverables.",
  "home.allWork": "Al het werk",
  "home.labLabel": "lab",
  "home.labTitle": "Experimenten in motion, shaders en interface.",
  "home.aboutLabel": "over mij",
  "home.aboutMore": "Meer over mij",

  "page.work.label": "werk",
  "page.work.title": "Geselecteerd werk",
  "page.work.intro":
    "Teamresultaten en persoonlijke projecten, steeds op dezelfde manier opgebouwd: probleem, aanpak, resultaat, en wat ik anders zou doen.",

  "page.experience.label": "ervaring",
  "page.experience.title": "Tien jaar bouwen, vijf jaar leiden",
  "page.experience.intro":
    "Engineering management in fintech, zorg en edtech — altijd dicht bij de code, de incidenten en de mensen die beide opleveren.",
  "page.experience.education": "Opleiding",

  "page.lab.label": "lab",
  "page.lab.title": "Experimentenlogboek",
  "page.lab.intro":
    "Shaders, motion studies en interface-ideeën. Alles hier draait live op deze site en is open source.",

  "page.about.label": "over mij",
  "page.about.title": "Ik bouw het platform onder het platform",
  "page.about.basedIn": "gevestigd in",
  "page.about.role": "rol",
  "page.about.interests": "interesses",

  "page.contact.label": "contact",
  "page.contact.title": "Laten we praten",
  "page.contact.intro":
    "Open voor gesprekken over engineering leadership, creatieve tech en ambitieuze zijprojecten.",

  "page.colophon.label": "colofon",
  "page.colophon.title": "Hoe deze site is gebouwd",
  "page.colophon.intro":
    "De engineering achter de motion — elk effect, wat het kost, en waarom het er is.",

  "entry.year": "jaar",
  "entry.role": "rol",
  "entry.tags": "stack / tags",
  "entry.allWork": "Al het werk",
  "entry.allExperiments": "Alle experimenten",

  "footer.contact": "contact",
  "footer.elsewhere": "elders",
  "footer.system": "systeem",
  "footer.colophon": "Hoe deze site is gebouwd",
};

const fy: Record<TKey, string> = {
  "site.role": "Engineering Manager · Kreatyf technolooch",
  "site.tagline":
    "Engineering manager dy't de grinzen fan design, motion en opkommende technology ferkent.",

  "nav.work": "Wurk",
  "nav.experience": "Ûnderfining",
  "nav.lab": "Lab",
  "nav.about": "Oer my",
  "nav.contact": "Kontakt",
  "nav.menu": "Menu",
  "nav.close": "Slute",
  "nav.language": "Taal",
  "nav.themeToLight": "Nei it ljochte tema",
  "nav.themeToDark": "Nei it tsjustere tema",

  "hero.line1": "Engineering",
  "hero.line2": "dy't beweecht.",
  "hero.ctaWork": "Selektearre wurk",
  "hero.ctaLab": "Nei it lab",

  "home.workLabel": "selektearre wurk",
  "home.workTitle": "Útkomsten, gjin oplevering.",
  "home.allWork": "Al it wurk",
  "home.labLabel": "lab",
  "home.labTitle": "Eksperiminten yn motion, shaders en ynterface.",
  "home.aboutLabel": "oer my",
  "home.aboutMore": "Mear oer my",

  "page.work.label": "wurk",
  "page.work.title": "Selektearre wurk",
  "page.work.intro":
    "Teamresultaten en persoanlike projekten, hieltyd op deselde wize opboud: probleem, oanpak, resultaat, en wat ik oars dwaan soe.",

  "page.experience.label": "ûnderfining",
  "page.experience.title": "Tsien jier bouwe, fiif jier liede",
  "page.experience.intro":
    "Engineering management yn fintech, soarch en edtech — altyd tichtby de koade, de ynsidinten en de minsken dy't beide oplevere.",
  "page.experience.education": "Oplieding",

  "page.lab.label": "lab",
  "page.lab.title": "Logboek fan eksperiminten",
  "page.lab.intro":
    "Shaders, motion studies en ynterface-ideeën. Alles hjir draait live op dizze side en is iepen boarne.",

  "page.about.label": "oer my",
  "page.about.title": "Ik bou it platfoarm ûnder it platfoarm",
  "page.about.basedIn": "festige yn",
  "page.about.role": "rol",
  "page.about.interests": "ynteresses",

  "page.contact.label": "kontakt",
  "page.contact.title": "Litte wy prate",
  "page.contact.intro":
    "Iepen foar petearen oer engineering leadership, kreative tech en ambisjeuze sideprojekten.",

  "page.colophon.label": "kolofon",
  "page.colophon.title": "Hoe't dizze side boud is",
  "page.colophon.intro":
    "De engineering achter de motion — elk effekt, wat it kostet, en wêrom't it der is.",

  "entry.year": "jier",
  "entry.role": "rol",
  "entry.tags": "stack / tags",
  "entry.allWork": "Al it wurk",
  "entry.allExperiments": "Alle eksperiminten",

  "footer.contact": "kontakt",
  "footer.elsewhere": "earne oars",
  "footer.system": "systeem",
  "footer.colophon": "Hoe't dizze side boud is",
};

const ru: Record<TKey, string> = {
  "site.role": "Инженерный менеджер · Креативный технолог",
  "site.tagline":
    "Инженерный менеджер, исследующий границы дизайна, анимации и новых технологий.",

  "nav.work": "Работы",
  "nav.experience": "Опыт",
  "nav.lab": "Лаборатория",
  "nav.about": "Обо мне",
  "nav.contact": "Контакты",
  "nav.menu": "Меню",
  "nav.close": "Закрыть",
  "nav.language": "Язык",
  "nav.themeToLight": "Переключить на светлую тему",
  "nav.themeToDark": "Переключить на тёмную тему",

  "hero.line1": "Инженерия",
  "hero.line2": "в движении.",
  "hero.ctaWork": "Избранные работы",
  "hero.ctaLab": "В лабораторию",

  "home.workLabel": "избранные работы",
  "home.workTitle": "Результаты, а не артефакты.",
  "home.allWork": "Все работы",
  "home.labLabel": "лаборатория",
  "home.labTitle": "Эксперименты с анимацией, шейдерами и интерфейсом.",
  "home.aboutLabel": "обо мне",
  "home.aboutMore": "Подробнее обо мне",

  "page.work.label": "работы",
  "page.work.title": "Избранные работы",
  "page.work.intro":
    "Командные результаты и личные проекты в одном формате: проблема, подход, результат и что я бы изменил.",

  "page.experience.label": "опыт",
  "page.experience.title": "Десять лет разработки, пять — руководства",
  "page.experience.intro":
    "Инженерный менеджмент в финтехе, здравоохранении и edtech — всегда рядом с кодом, инцидентами и людьми, которые их разбирают.",
  "page.experience.education": "Образование",

  "page.lab.label": "лаборатория",
  "page.lab.title": "Журнал экспериментов",
  "page.lab.intro":
    "Шейдеры, эксперименты с анимацией и идеи интерфейсов. Всё работает прямо на этом сайте и открыто.",

  "page.about.label": "обо мне",
  "page.about.title": "Я строю платформу под платформой",
  "page.about.basedIn": "город",
  "page.about.role": "роль",
  "page.about.interests": "интересы",

  "page.contact.label": "контакты",
  "page.contact.title": "Давайте поговорим",
  "page.contact.intro":
    "Открыт к разговорам об инженерном лидерстве, креативных технологиях и амбициозных сайд-проектах.",

  "page.colophon.label": "колофон",
  "page.colophon.title": "Как устроен этот сайт",
  "page.colophon.intro":
    "Инженерия за анимацией — каждый эффект, его цена и зачем он нужен.",

  "entry.year": "год",
  "entry.role": "роль",
  "entry.tags": "стек / теги",
  "entry.allWork": "Все работы",
  "entry.allExperiments": "Все эксперименты",

  "footer.contact": "контакты",
  "footer.elsewhere": "ссылки",
  "footer.system": "система",
  "footer.colophon": "Как устроен этот сайт",
};

const DICT: Record<Locale, Record<TKey, string>> = { en, fr, nl, fy, ru };

/** Falls back to English for any key a locale hasn't covered. */
export function translate(locale: Locale, key: TKey): string {
  return DICT[locale]?.[key] ?? en[key];
}
