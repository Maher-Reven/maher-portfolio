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

  "harness.scrollHint": "Scroll to cross-section the loop.",
  "harness.layer.model.title": "Model",
  "harness.layer.model.desc":
    "Predicts the next tokens. No memory, no state — everything else on this page is what wraps it.",
  "harness.layer.loop.title": "Loop",
  "harness.layer.loop.desc": "Calls the model again with each tool's result until it stops asking for one.",
  "harness.layer.tools.title": "Tools",
  "harness.layer.tools.desc": "Typed functions the model can request — a file read, a shell command, a search.",
  "harness.layer.permissions.title": "Permissions",
  "harness.layer.permissions.desc": "Gates what a requested tool call is actually allowed to touch.",
  "harness.layer.context.title": "Context",
  "harness.layer.context.desc": "Decides what the model even sees next: system prompt, memory, compaction.",
  "harness.layer.subagents.title": "Sub-agents",
  "harness.layer.subagents.desc": "The same loop, spawned again, running in parallel or in isolation.",
  "harness.layer.environment.title": "Environment",
  "harness.layer.environment.desc": "The real filesystem, shell and APIs a tool call actually reaches.",

  "vectorSearch.rankCosine": "Cosine",
  "vectorSearch.rankDistance": "Distance",
  "vectorSearch.hint": "Drag to orbit.",
  "vectorSearch.caption":
    "Cosine only measures the angle to the query — magnitude doesn't matter. Distance measures actual position. Same five points, a different winner depending on which one you ask.",
  "vectorSearch.query": "Query",
  "vectorSearch.picked": "picked",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "dist",

  "leadershipNote.kicker": "Leadership note",

  "replay.simulated": "Simulated walkthrough",
  "replay.step": "Step",
  "replay.continue": "Continue",
  "replay.back": "Back to options",
  "replay.restart": "Start over",
  "replay.intro.title": "The room you're in",
  "replay.intro.body":
    "Mid leadership-transition on a mobile platform that ships continuously. Engineers already use AI assistants — without shared context, without a written answer to what an agent is allowed to call or ship.",
  "replay.fork.title": "How do you govern AI tooling?",
  "replay.fork.hint": "Same fork as the Beyond autocomplete case study — pick a path to see the consequence.",
  "replay.option.perEngineer.label": "Let every engineer configure their own AI tooling",
  "replay.option.perEngineer.desc":
    "Fastest to start. Every engineer ends up with different context, permissions, and no shared way to reason about risk.",
  "replay.option.mandated.label": "Mandate one fully-managed agent platform",
  "replay.option.mandated.desc":
    "Consistent by construction — but a vendor roadmap now caps what the team can adopt.",
  "replay.option.shared.label": "Shared context layer + per-team tool-calling policy",
  "replay.option.shared.desc":
    "One context picture from GitHub, Linear and Sentry; each team writes which autonomy tier its tools use.",
  "replay.outcome.perEngineer.title": "Six months later: invisible drift",
  "replay.outcome.perEngineer.body":
    "Two teams ship agent features the same week. One tool can open pull requests; another can only read. Incidents get harder to replay because nobody shares the same harness. Leadership sees adoption; you see ungoverned surface area.",
  "replay.outcome.mandated.title": "Six months later: compliance without leverage",
  "replay.outcome.mandated.body":
    "Permissions are consistent — and so is frustration. Engineers route around the platform for edge cases mobile needs. You spend reviews arguing with a vendor roadmap instead of tuning tiers for your own risk model.",
  "replay.outcome.shared.title": "Six months later: boring infrastructure, visible ramp-up",
  "replay.outcome.shared.body":
    "Nothing user-facing ships from the context layer alone. Engineers feel faster onboarding anyway — same picture in every session. Tier decisions move to written policy per team instead of hallway debate after an incident.",
  "replay.outcome.shared.cost":
    "Cost: defending infrastructure time before ramp-up gains were visible outside the team — the same cost logged in the case study.",
  "replay.end.title": "What actually shipped",
  "replay.leadership.body":
    "The replay compresses one tradeoff; the hard part was sequencing trust before autonomy and explaining guardrails in both engineering and leadership language. Writing tiers down early would have saved a week of cross-team negotiation — the case study says so explicitly.",
  "replay.link.caseStudy": "Full case study",
  "replay.link.log": "Decision log entry",

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

  "harness.scrollHint": "Faites défiler pour couper la boucle en coupe.",
  "harness.layer.model.title": "Modèle",
  "harness.layer.model.desc":
    "Prédit les prochains tokens. Aucune mémoire, aucun état — tout le reste ici l'enveloppe.",
  "harness.layer.loop.title": "Boucle",
  "harness.layer.loop.desc":
    "Rappelle le modèle avec le résultat de chaque outil jusqu'à ce qu'il n'en redemande plus.",
  "harness.layer.tools.title": "Outils",
  "harness.layer.tools.desc":
    "Des fonctions typées que le modèle peut demander — lire un fichier, exécuter une commande, chercher.",
  "harness.layer.permissions.title": "Permissions",
  "harness.layer.permissions.desc": "Contrôle ce qu'un appel d'outil demandé a réellement le droit de toucher.",
  "harness.layer.context.title": "Contexte",
  "harness.layer.context.desc": "Décide de ce que le modèle voit ensuite : prompt système, mémoire, compaction.",
  "harness.layer.subagents.title": "Sous-agents",
  "harness.layer.subagents.desc": "La même boucle, relancée, en parallèle ou isolément.",
  "harness.layer.environment.title": "Environnement",
  "harness.layer.environment.desc":
    "Le vrai système de fichiers, shell et API qu'un appel d'outil atteint réellement.",

  "vectorSearch.rankCosine": "Cosinus",
  "vectorSearch.rankDistance": "Distance",
  "vectorSearch.hint": "Faites glisser pour orbiter.",
  "vectorSearch.caption":
    "Le cosinus ne mesure que l'angle par rapport à la requête — la magnitude n'a pas d'importance. La distance mesure la position réelle. Les cinq mêmes points, un gagnant différent selon celui qu'on interroge.",
  "vectorSearch.query": "Requête",
  "vectorSearch.picked": "retenu",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "dist.",

  "leadershipNote.kicker": "Note de leadership",

  "replay.simulated": "Parcours simulé",
  "replay.step": "Étape",
  "replay.continue": "Continuer",
  "replay.back": "Revenir aux options",
  "replay.restart": "Recommencer",
  "replay.intro.title": "La situation",
  "replay.intro.body":
    "Transition de leadership en cours sur une plateforme mobile qui livre en continu. Les ingénieurs utilisent déjà des assistants IA — sans contexte partagé, sans réponse écrite sur ce qu'un agent a le droit d'appeler ou de livrer.",
  "replay.fork.title": "Comment gouverner les outils IA ?",
  "replay.fork.hint": "Le même embranchement que l'étude de cas Beyond autocomplete — choisissez une voie pour voir la conséquence.",
  "replay.option.perEngineer.label": "Laisser chaque ingénieur configurer ses propres outils IA",
  "replay.option.perEngineer.desc":
    "Le plus rapide au départ. Chacun finit avec un contexte, des permissions et une lecture du risque différents.",
  "replay.option.mandated.label": "Imposer une plateforme d'agents entièrement managée",
  "replay.option.mandated.desc":
    "Cohérent par construction — mais la roadmap d'un fournisseur plafonne désormais ce que l'équipe peut adopter.",
  "replay.option.shared.label": "Couche de contexte partagée + politique d'appels d'outils par équipe",
  "replay.option.shared.desc":
    "Une même image depuis GitHub, Linear et Sentry ; chaque équipe écrit le tier d'autonomie de ses outils.",
  "replay.outcome.perEngineer.title": "Six mois plus tard : dérive invisible",
  "replay.outcome.perEngineer.body":
    "Deux équipes livrent des fonctions agent la même semaine. Un outil peut ouvrir des PR, l'autre seulement lire. Les incidents se rejouent mal — personne ne partage le même harnais. Le leadership voit l'adoption ; vous voyez une surface non gouvernée.",
  "replay.outcome.mandated.title": "Six mois plus tard : conformité sans levier",
  "replay.outcome.mandated.body":
    "Les permissions sont cohérentes — tout comme la frustration. Les ingénieurs contournent la plateforme pour les cas limites du mobile. Vous passez les revues à discuter avec une roadmap fournisseur au lieu d'ajuster les tiers pour votre propre modèle de risque.",
  "replay.outcome.shared.title": "Six mois plus tard : infra ennuyeuse, montée en charge visible",
  "replay.outcome.shared.body":
    "Rien d'utilisateur ne sort de la couche de contexte seule. Les ingénieurs sentent quand même l'onboarding accélérer — la même image à chaque session. Les tiers deviennent une politique écrite par équipe au lieu d'un débat dans le couloir après un incident.",
  "replay.outcome.shared.cost":
    "Coût : défendre du temps infra avant que les gains de montée en charge soient visibles hors équipe — le même coût consigné dans l'étude de cas.",
  "replay.end.title": "Ce qui a réellement été livré",
  "replay.leadership.body":
    "Le parcours compresse un tradeoff ; la partie dure était de séquencer la confiance avant l'autonomie et d'expliquer les garde-fous dans le langage ingénierie et leadership. Écrire les tiers tôt aurait évité une semaine de négociation inter-équipes — l'étude de cas le dit explicitement.",
  "replay.link.caseStudy": "Étude de cas complète",
  "replay.link.log": "Entrée du journal de décisions",

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

  "harness.scrollHint": "Scroll om de lus in dwarsdoorsnede te zien.",
  "harness.layer.model.title": "Model",
  "harness.layer.model.desc":
    "Voorspelt de volgende tokens. Geen geheugen, geen status — al het andere hier omhult het.",
  "harness.layer.loop.title": "Lus",
  "harness.layer.loop.desc": "Roept het model opnieuw aan met elk toolresultaat, tot het er geen meer vraagt.",
  "harness.layer.tools.title": "Tools",
  "harness.layer.tools.desc":
    "Getypeerde functies die het model kan aanvragen — een bestand lezen, een shellcommando, een zoekopdracht.",
  "harness.layer.permissions.title": "Rechten",
  "harness.layer.permissions.desc": "Bepaalt wat een aangevraagde tool-aanroep werkelijk mag raken.",
  "harness.layer.context.title": "Context",
  "harness.layer.context.desc": "Bepaalt wat het model daarna te zien krijgt: systeemprompt, geheugen, compactie.",
  "harness.layer.subagents.title": "Subagenten",
  "harness.layer.subagents.desc": "Dezelfde lus, opnieuw gestart, parallel of geïsoleerd.",
  "harness.layer.environment.title": "Omgeving",
  "harness.layer.environment.desc":
    "Het echte bestandssysteem, de shell en de API's die een tool-aanroep werkelijk bereikt.",

  "vectorSearch.rankCosine": "Cosinus",
  "vectorSearch.rankDistance": "Afstand",
  "vectorSearch.hint": "Sleep om te draaien.",
  "vectorSearch.caption":
    "Cosinus meet alleen de hoek ten opzichte van de zoekopdracht — grootte maakt niet uit. Afstand meet de werkelijke positie. Dezelfde vijf punten, een andere winnaar afhankelijk van wat je vraagt.",
  "vectorSearch.query": "Zoekopdracht",
  "vectorSearch.picked": "gekozen",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "afst.",

  "leadershipNote.kicker": "Leadership-notitie",

  "replay.simulated": "Gesimuleerde walkthrough",
  "replay.step": "Stap",
  "replay.continue": "Doorgaan",
  "replay.back": "Terug naar opties",
  "replay.restart": "Opnieuw beginnen",
  "replay.intro.title": "De situatie",
  "replay.intro.body":
    "Midden in een leadership-overgang op een mobile platform dat continu shipt. Engineers gebruiken al AI-assistenten — zonder gedeelde context, zonder schriftelijk antwoord op wat een agent mag aanroepen of shippen.",
  "replay.fork.title": "Hoe beheer je AI-tooling?",
  "replay.fork.hint": "Dezelfde splitsing als in de Beyond autocomplete case study — kies een pad om het gevolg te zien.",
  "replay.option.perEngineer.label": "Laat elke engineer eigen AI-tooling configureren",
  "replay.option.perEngineer.desc":
    "Snelst van start. Iedereen eindigt met andere context, rechten en geen gedeelde manier om over risico te redeneren.",
  "replay.option.mandated.label": "Verplicht één volledig beheerd agentplatform",
  "replay.option.mandated.desc":
    "Consistent by design — maar een vendor-roadmap bepaalt nu wat het team kan adopteren.",
  "replay.option.shared.label": "Gedeelde contextlaag + tool-callingbeleid per team",
  "replay.option.shared.desc":
    "Eén beeld uit GitHub, Linear en Sentry; elk team schrijft op welke autonomietier zijn tools gebruiken.",
  "replay.outcome.perEngineer.title": "Zes maanden later: onzichtbare drift",
  "replay.outcome.perEngineer.body":
    "Twee teams shippen agentfeatures in dezelfde week. Eén tool mag PR's openen, de andere alleen lezen. Incidenten zijn moeilijker te herhalen — niemand deelt hetzelfde harnais. Leadership ziet adoptie; jij ziet onbeheerd oppervlak.",
  "replay.outcome.mandated.title": "Zes maanden later: compliance zonder hefboom",
  "replay.outcome.mandated.body":
    "Rechten zijn consistent — en frustratie ook. Engineers omzeilen het platform voor mobile edge cases. Je besteedt reviews aan een vendor-roadmap in plaats van tiers voor jullie eigen risicomodel.",
  "replay.outcome.shared.title": "Zes maanden later: saaie infra, zichtbare ramp-up",
  "replay.outcome.shared.body":
    "Er shipt niets user-facing alleen van de contextlaag. Engineers voelen toch snellere onboarding — hetzelfde beeld in elke sessie. Tier-beslissingen worden geschreven beleid per team in plaats of gangdebat na een incident.",
  "replay.outcome.shared.cost":
    "Kosten: tijd voor infra verdedigen voordat ramp-up winst buiten het team zichtbaar was — dezelfde kosten als in de case study.",
  "replay.end.title": "Wat er echt shipte",
  "replay.leadership.body":
    "De replay comprimeert één tradeoff; het moeilijke was vertrouwen vóór autonomie sequencen en guardrails uitleggen in engineering- én leadership-taal. Tiers vroeg opschrijven had een week cross-team onderhandeling bespaard — de case study zegt het expliciet.",
  "replay.link.caseStudy": "Volledige case study",
  "replay.link.log": "Decision log-entry",

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

  "harness.scrollHint": "Skrôlje om de lus yn trochsneed te sjen.",
  "harness.layer.model.title": "Model",
  "harness.layer.model.desc":
    "Foarspelt de folgjende tokens. Gjin ûnthâld, gjin steat — al it oare hjir omfiemet it.",
  "harness.layer.loop.title": "Lus",
  "harness.layer.loop.desc": "Ropt it model opnij oan mei it resultaat fan elk ark, oant it der gjin mear freget.",
  "harness.layer.tools.title": "Ark",
  "harness.layer.tools.desc":
    "Typeare funksjes dy't it model oanfreegje kin — in bestân lêze, in shell-kommando, in sykaksje.",
  "harness.layer.permissions.title": "Rjochten",
  "harness.layer.permissions.desc": "Bepaalt wat in oanfrege ark-oanrop wier reitsje mei.",
  "harness.layer.context.title": "Kontekst",
  "harness.layer.context.desc": "Bepaalt wat it model dernei sjocht: systeempromt, ûnthâld, kompaksje.",
  "harness.layer.subagents.title": "Subaginten",
  "harness.layer.subagents.desc": "Deselde lus, opnij spawn'e, parallel of isolearre.",
  "harness.layer.environment.title": "Omjouwing",
  "harness.layer.environment.desc": "It echte bestânssysteem, de shell en de API's dy't in ark-oanrop wier berikt.",

  "vectorSearch.rankCosine": "Kosinus",
  "vectorSearch.rankDistance": "Ofstân",
  "vectorSearch.hint": "Sleep om te draaien.",
  "vectorSearch.caption":
    "Kosinus mjit allinnich de hoeke ta de fraach — grutte docht der net ta. Ofstân mjit de wiere posysje. Deselde fiif punten, in oare winner ôfhinklik fan wat men freget.",
  "vectorSearch.query": "Fraach",
  "vectorSearch.picked": "keazen",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "ofst.",

  "leadershipNote.kicker": "Leiderskip-notysje",

  "replay.simulated": "Simulearre trochgean",
  "replay.step": "Stap",
  "replay.continue": "Trochgean",
  "replay.back": "Wer nei opsjes",
  "replay.restart": "Op 'e nij begjinne",
  "replay.intro.title": "De situaasje",
  "replay.intro.body":
    "Midden yn in leadership-oergong op in mobile platfoarm dat trochgeand shipped. Engineers brûke al AI-assistinten — sûnder dielde kontekst, sûnder skriftlik antwurd op wat in agent oproppen of shippen mei.",
  "replay.fork.title": "Hoe bestjoerst AI-tooling?",
  "replay.fork.hint": "Deselfde split as yn de Beyond autocomplete case study — kies in paad om it gefolch te sjen.",
  "replay.option.perEngineer.label": "Lit elke engineer eigen AI-tooling ynstelle",
  "replay.option.perEngineer.desc":
    "Fluchst fan start. Elkenien einiget mei oare kontekst, rjochten en gjin dielde manier om oer risiko te redenearjen.",
  "replay.option.mandated.label": "Ferplicht ien folslein behearre agentplatfoarm",
  "replay.option.mandated.desc":
    "Konsistent by design — mar in vendor-roadmap bepaalt no wat it team adoptearje kin.",
  "replay.option.shared.label": "Dielde kontekstlaach + tool-callingbelied per team",
  "replay.option.shared.desc":
    "Ien byld út GitHub, Linear en Sentry; elk team skriuwt op hokker autonomytier syn tools brûke.",
  "replay.outcome.perEngineer.title": "Seks moannen letter: ûnsichtbere drift",
  "replay.outcome.perEngineer.body":
    "Twa teams shippen agentfeatures yn deselfde wike. Ien tool mei PR's iepenje, de oare allinnich lêze. Ynsidinten binne minder te replayen — nimmen dielt deselfde harnais. Leadership sjocht adoptie; do sjochst ûnbehearre oppervlak.",
  "replay.outcome.mandated.title": "Seks moannen letter: compliance sûnder hefboom",
  "replay.outcome.mandated.body":
    "Rjochten binne konsistent — en frustraasje ek. Engineers omgean it platfoarm foar mobile edge cases. Do besteegst reviews oan in vendor-roadmap yn stee fan tiers foar jullie eigen risikomodel.",
  "replay.outcome.shared.title": "Seks moannen letter: saaie infra, sichtbere ramp-up",
  "replay.outcome.shared.body":
    "Der shipped neat user-facing allinnich fan de kontekstlaach. Engineers fiele dochs fluggere onboarding — deselfde byld yn elke sesje. Tier-beslissingen wurde skreaun belied per team yn stee fan keitdebat nei in ynsidint.",
  "replay.outcome.shared.cost":
    "Kosten: tiid foar infra ferdigigje foardat ramp-up winst bûten it team sichtber wie — deselfde kosten as yn de case study.",
  "replay.end.title": "Wat der echt shipte",
  "replay.leadership.body":
    "De replay komprimearret ien tradeoff; it drege wie fertrouwen foar autonomie sequencen en guardrails útlizze yn engineering- en leadership-taal. Tiers betiid opskriuwe hie in wike cross-team ûnderhanneling bespaard — de case study seit it eksplisyt.",
  "replay.link.caseStudy": "Folsleine case study",
  "replay.link.log": "Decision log-yngong",

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

  "harness.scrollHint": "Прокрутите, чтобы увидеть цикл в разрезе.",
  "harness.layer.model.title": "Модель",
  "harness.layer.model.desc":
    "Предсказывает следующие токены. Нет памяти, нет состояния — всё остальное здесь её оборачивает.",
  "harness.layer.loop.title": "Цикл",
  "harness.layer.loop.desc":
    "Снова вызывает модель с результатом каждого инструмента, пока она не перестанет их запрашивать.",
  "harness.layer.tools.title": "Инструменты",
  "harness.layer.tools.desc":
    "Типизированные функции, которые модель может запросить — чтение файла, команда shell, поиск.",
  "harness.layer.permissions.title": "Права доступа",
  "harness.layer.permissions.desc": "Определяет, к чему запрошенный вызов инструмента действительно может обратиться.",
  "harness.layer.context.title": "Контекст",
  "harness.layer.context.desc": "Определяет, что модель увидит дальше: системный промпт, память, сжатие.",
  "harness.layer.subagents.title": "Подагенты",
  "harness.layer.subagents.desc": "Тот же цикл, запущенный заново — параллельно или изолированно.",
  "harness.layer.environment.title": "Окружение",
  "harness.layer.environment.desc":
    "Настоящая файловая система, shell и API, которых реально достигает вызов инструмента.",

  "vectorSearch.rankCosine": "Косинус",
  "vectorSearch.rankDistance": "Расстояние",
  "vectorSearch.hint": "Перетащите, чтобы вращать.",
  "vectorSearch.caption":
    "Косинус измеряет только угол к запросу — величина не важна. Расстояние измеряет реальное положение. Те же пять точек, разный победитель в зависимости от того, что спрашиваешь.",
  "vectorSearch.query": "Запрос",
  "vectorSearch.picked": "выбран",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "расст.",

  "leadershipNote.kicker": "Заметка о лидерстве",

  "replay.simulated": "Симулированный сценарий",
  "replay.step": "Шаг",
  "replay.continue": "Далее",
  "replay.back": "Назад к вариантам",
  "replay.restart": "Сначала",
  "replay.intro.title": "Ситуация",
  "replay.intro.body":
    "Смена лидерства посреди непрерывных релизов мобильной платформы. Инженеры уже пользуются AI-ассистентами — без общего контекста и без письменного ответа, что агенту можно вызывать и выкатывать.",
  "replay.fork.title": "Как управлять AI-инструментами?",
  "replay.fork.hint": "Тот же развилка, что в кейсе Beyond autocomplete — выберите путь и посмотрите последствие.",
  "replay.option.perEngineer.label": "Пусть каждый инженер настраивает AI сам",
  "replay.option.perEngineer.desc":
    "Быстрый старт. У каждого свой контекст, права и нет общего языка риска.",
  "replay.option.mandated.label": "Обязать одну полностью управляемую платформу агентов",
  "replay.option.mandated.desc":
    "Единообразие по умолчанию — но roadmap вендора теперь ограничивает, что команда может внедрить.",
  "replay.option.shared.label": "Общий слой контекста + политика tool-calling по командам",
  "replay.option.shared.desc":
    "Одна картина из GitHub, Linear и Sentry; каждая команда фиксирует tier автономии своих инструментов.",
  "replay.outcome.perEngineer.title": "Через полгода: невидимый дрейф",
  "replay.outcome.perEngineer.body":
    "Две команды выкатывают agent-фичи на одной неделе. Один инструмент может открывать PR, другой — только читать. Инциденты сложнее воспроизвести — у всех разный harness. Руководство видит adoption; вы — неуправляемую поверхность.",
  "replay.outcome.mandated.title": "Через полгода: compliance без рычага",
  "replay.outcome.mandated.body":
    "Права согласованы — как и раздражение. Инженеры обходят платформу под edge cases мобилки. Ревью уходит на споры с roadmap вендора вместо настройки tiers под вашу модель риска.",
  "replay.outcome.shared.title": "Через полгода: скучная инфра, заметный ramp-up",
  "replay.outcome.shared.body":
    "От слоя контекста alone ничего user-facing не вышло. Инженеры всё равно чувствуют более быстрый onboarding — та же картина в каждой сессии. Tiers становятся письменной политикой команды, а не спором в коридоре после инцидента.",
  "replay.outcome.shared.cost":
    "Цена: отстаивать время на инфраструктуру, пока выигрыш ramp-up не был виден вне команды — та же цена в кейсе.",
  "replay.end.title": "Что реально выкатили",
  "replay.leadership.body":
    "Replay сжимает один tradeoff; сложнее было выстроить доверие до автономии и объяснить guardrails на языке и инженерии, и leadership. Записать tiers раньше сэкономило бы неделю межкомандных переговоров — в кейсе это сказано прямо.",
  "replay.link.caseStudy": "Полный кейс",
  "replay.link.log": "Запись в decision log",

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
