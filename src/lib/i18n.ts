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
  "nav.search": "Search",

  "search.placeholder": "Search case studies, decisions, the readme…",
  "search.noResults": "No results",
  "search.hint": "↑↓ navigate · ↵ select · esc close",

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
  "page.experience.downloadResume": "Download résumé (PDF)",

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

  "page.log.label": "log",
  "page.log.title": "Decision log",
  "page.log.intro":
    "Every case study's tradeoffs, reshaped as a commit history — options considered, what was chosen, what it cost.",
  "log.chosen": "chosen",

  "page.readme.label": "readme",
  "page.readme.title": "How to work with me",
  "page.readme.intro": "The operating manual — how I run 1:1s, what I escalate, what I won't trade away.",

  "topology.collaboration": "Collaboration",
  "topology.xAsAService": "X-as-a-Service",

  "entry.year": "year",
  "entry.role": "role",
  "entry.tags": "stack / tags",
  "entry.allWork": "All work",
  "entry.allExperiments": "All experiments",

  "tradeoff.options": "Options considered",
  "tradeoff.chosen": "Chosen",
  "tradeoff.cost": "Cost",
  "retro.kicker": "In hindsight",

  "collapse.systems": "Systems",
  "collapse.before": "Before",
  "collapse.after": "After",
  "collapse.repositories": "repositories",
  "collapse.platform": "platform",

  "mark.seed": "Seed",
  "mark.regenerate": "Regenerate",

  "audio.enable": "Enable microphone",
  "audio.requesting": "Requesting access…",
  "audio.denied": "Microphone access denied",
  "audio.unsupported": "Your browser doesn't support this",
  "audio.stop": "Stop",
  "audio.peak": "Peak",
  "audio.privacy": "Analyzed locally in your browser — nothing is recorded or sent anywhere.",

  "camera.enable": "Enable camera",
  "camera.requesting": "Requesting access…",
  "camera.denied": "Camera access denied",
  "camera.unsupported": "Your browser doesn't support this",
  "camera.stop": "Stop",
  "camera.privacy": "Reduced to brightness only, locally, in your browser — no color, no image is kept, nothing is sent anywhere.",

  "ladder.escalation": "Anything outside these bounds escalates to a person.",

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
  "nav.search": "Rechercher",

  "search.placeholder": "Rechercher des études de cas, des décisions, le readme…",
  "search.noResults": "Aucun résultat",
  "search.hint": "↑↓ naviguer · ↵ ouvrir · esc fermer",

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
  "page.experience.downloadResume": "Télécharger le CV (PDF)",

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

  "page.log.label": "journal",
  "page.log.title": "Journal des décisions",
  "page.log.intro":
    "Les arbitrages de chaque étude de cas, remis en forme comme un historique de commits — options considérées, ce qui a été choisi, ce que ça a coûté.",
  "log.chosen": "choisi",

  "page.readme.label": "readme",
  "page.readme.title": "Comment travailler avec moi",
  "page.readme.intro": "Le manuel d'utilisation — comment je mène les 1:1, ce que j'escalade, ce que je ne sacrifie pas.",

  "topology.collaboration": "Collaboration",
  "topology.xAsAService": "X-as-a-Service",

  "entry.year": "année",
  "entry.role": "rôle",
  "entry.tags": "stack / tags",
  "entry.allWork": "Tous les projets",
  "entry.allExperiments": "Toutes les expériences",

  "tradeoff.options": "Options considérées",
  "tradeoff.chosen": "Choisi",
  "tradeoff.cost": "Coût",
  "retro.kicker": "Avec le recul",

  "collapse.systems": "Systèmes",
  "collapse.before": "Avant",
  "collapse.after": "Après",
  "collapse.repositories": "dépôts",
  "collapse.platform": "plateforme",

  "mark.seed": "Graine",
  "mark.regenerate": "Régénérer",

  "audio.enable": "Activer le microphone",
  "audio.requesting": "Demande d'accès…",
  "audio.denied": "Accès au microphone refusé",
  "audio.unsupported": "Votre navigateur ne prend pas ça en charge",
  "audio.stop": "Arrêter",
  "audio.peak": "Crête",
  "audio.privacy": "Analysé localement dans votre navigateur — rien n'est enregistré ni envoyé.",

  "camera.enable": "Activer la caméra",
  "camera.requesting": "Demande d'accès…",
  "camera.denied": "Accès à la caméra refusé",
  "camera.unsupported": "Votre navigateur ne prend pas ça en charge",
  "camera.stop": "Arrêter",
  "camera.privacy": "Réduit à la seule luminosité, localement, dans votre navigateur — aucune couleur, aucune image conservée, rien n'est envoyé.",

  "ladder.escalation": "Tout ce qui sort de ces limites remonte à une personne.",

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
  "nav.search": "Zoeken",

  "search.placeholder": "Doorzoek case studies, beslissingen, de readme…",
  "search.noResults": "Geen resultaten",
  "search.hint": "↑↓ navigeren · ↵ openen · esc sluiten",

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
  "page.experience.downloadResume": "Cv downloaden (PDF)",

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

  "page.log.label": "log",
  "page.log.title": "Beslissingenlogboek",
  "page.log.intro":
    "De afwegingen van elke case study, hervormd tot een commit-geschiedenis — overwogen opties, wat gekozen is, wat het kostte.",
  "log.chosen": "gekozen",

  "page.readme.label": "readme",
  "page.readme.title": "Hoe met mij te werken",
  "page.readme.intro": "Het instructieboekje — hoe ik 1:1's doe, wat ik escaleer, wat ik niet inruil.",

  "topology.collaboration": "Samenwerking",
  "topology.xAsAService": "X-as-a-Service",

  "entry.year": "jaar",
  "entry.role": "rol",
  "entry.tags": "stack / tags",
  "entry.allWork": "Al het werk",
  "entry.allExperiments": "Alle experimenten",

  "tradeoff.options": "Opties overwogen",
  "tradeoff.chosen": "Gekozen",
  "tradeoff.cost": "Kosten",
  "retro.kicker": "Achteraf gezien",

  "collapse.systems": "Systemen",
  "collapse.before": "Voor",
  "collapse.after": "Na",
  "collapse.repositories": "repository's",
  "collapse.platform": "platform",

  "mark.seed": "Seed",
  "mark.regenerate": "Regenereer",

  "audio.enable": "Microfoon inschakelen",
  "audio.requesting": "Toegang aanvragen…",
  "audio.denied": "Microfoontoegang geweigerd",
  "audio.unsupported": "Je browser ondersteunt dit niet",
  "audio.stop": "Stoppen",
  "audio.peak": "Piek",
  "audio.privacy": "Lokaal geanalyseerd in je browser — er wordt niets opgenomen of verzonden.",

  "camera.enable": "Camera inschakelen",
  "camera.requesting": "Toegang aanvragen…",
  "camera.denied": "Cameratoegang geweigerd",
  "camera.unsupported": "Je browser ondersteunt dit niet",
  "camera.stop": "Stoppen",
  "camera.privacy": "Teruggebracht tot alleen helderheid, lokaal, in je browser — geen kleur, geen bewaard beeld, er wordt niets verzonden.",

  "ladder.escalation": "Alles buiten deze grenzen gaat naar een mens.",

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
  "nav.search": "Sykje",

  "search.placeholder": "Trochsykje case studies, beslissings, de readme…",
  "search.noResults": "Gjin resultaten",
  "search.hint": "↑↓ navigearje · ↵ iepenje · esc slute",

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
  "page.experience.downloadResume": "Cv downloade (PDF)",

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

  "page.log.label": "log",
  "page.log.title": "Beslissingslogboek",
  "page.log.intro":
    "De ôfwagings fan elke case study, omfoarme ta in commit-skiednis — oerwoegen opsjes, wat keazen is, wat it kostte.",
  "log.chosen": "keazen",

  "page.readme.label": "readme",
  "page.readme.title": "Hoe't mei my te wurkjen",
  "page.readme.intro": "It ynstruksjeboekje — hoe't ik 1:1's doch, wat ik eskalearje, wat ik net ynruilje.",

  "topology.collaboration": "Gearwurking",
  "topology.xAsAService": "X-as-a-Service",

  "entry.year": "jier",
  "entry.role": "rol",
  "entry.tags": "stack / tags",
  "entry.allWork": "Al it wurk",
  "entry.allExperiments": "Alle eksperiminten",

  "tradeoff.options": "Opsjes oerwoegen",
  "tradeoff.chosen": "Keazen",
  "tradeoff.cost": "Kosten",
  "retro.kicker": "Achterôf besjoen",

  "collapse.systems": "Systemen",
  "collapse.before": "Foar",
  "collapse.after": "Nei",
  "collapse.repositories": "repository's",
  "collapse.platform": "platfoarm",

  "mark.seed": "Seed",
  "mark.regenerate": "Regenerearje",

  "audio.enable": "Mikrofoan ynskeakelje",
  "audio.requesting": "Tagong oanfreegje…",
  "audio.denied": "Mikrofoantagong wegere",
  "audio.unsupported": "Dyn browser stipet dit net",
  "audio.stop": "Stopje",
  "audio.peak": "Piik",
  "audio.privacy": "Lokaal analysearre yn dyn browser — der wurdt neat opnommen of ferstjoerd.",

  "camera.enable": "Kamera ynskeakelje",
  "camera.requesting": "Tagong oanfreegje…",
  "camera.denied": "Kameratagong wegere",
  "camera.unsupported": "Dyn browser stipet dit net",
  "camera.stop": "Stopje",
  "camera.privacy": "Omset ta allinnich helderheid, lokaal, yn dyn browser — gjin kleur, gjin bewarre byld, der wurdt neat ferstjoerd.",

  "ladder.escalation": "Alles bûten dizze grinzen giet nei in minske.",

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
  "nav.search": "Поиск",

  "search.placeholder": "Поиск по кейсам, решениям, readme…",
  "search.noResults": "Ничего не найдено",
  "search.hint": "↑↓ навигация · ↵ открыть · esc закрыть",

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
  "page.experience.downloadResume": "Скачать резюме (PDF)",

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

  "page.log.label": "журнал",
  "page.log.title": "Журнал решений",
  "page.log.intro":
    "Компромиссы каждого кейса, переоформленные как история коммитов — рассмотренные варианты, что было выбрано, чего это стоило.",
  "log.chosen": "выбрано",

  "page.readme.label": "readme",
  "page.readme.title": "Как работать со мной",
  "page.readme.intro": "Инструкция по эксплуатации — как я веду 1:1, что я эскалирую, чем не жертвую.",

  "topology.collaboration": "Сотрудничество",
  "topology.xAsAService": "X-as-a-Service",

  "entry.year": "год",
  "entry.role": "роль",
  "entry.tags": "стек / теги",
  "entry.allWork": "Все работы",
  "entry.allExperiments": "Все эксперименты",

  "tradeoff.options": "Рассмотренные варианты",
  "tradeoff.chosen": "Выбрано",
  "tradeoff.cost": "Цена",
  "retro.kicker": "Оглядываясь назад",

  "collapse.systems": "Системы",
  "collapse.before": "До",
  "collapse.after": "После",
  "collapse.repositories": "репозитории",
  "collapse.platform": "платформа",

  "mark.seed": "Сид",
  "mark.regenerate": "Пересоздать",

  "audio.enable": "Включить микрофон",
  "audio.requesting": "Запрос доступа…",
  "audio.denied": "Доступ к микрофону запрещён",
  "audio.unsupported": "Ваш браузер это не поддерживает",
  "audio.stop": "Остановить",
  "audio.peak": "Пик",
  "audio.privacy": "Анализируется локально в браузере — ничего не записывается и не отправляется.",

  "camera.enable": "Включить камеру",
  "camera.requesting": "Запрос доступа…",
  "camera.denied": "Доступ к камере запрещён",
  "camera.unsupported": "Ваш браузер это не поддерживает",
  "camera.stop": "Остановить",
  "camera.privacy": "Сведено только к яркости, локально, в браузере — без цвета, без сохранённого изображения, ничего не отправляется.",

  "ladder.escalation": "Всё, что выходит за эти границы, передаётся человеку.",

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
