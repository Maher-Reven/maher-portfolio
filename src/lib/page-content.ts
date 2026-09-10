import type { Locale } from "@/lib/i18n";

/**
 * Long-form page copy that lives in TSX rather than MDX. Structured rather than
 * flat strings, because the experience entries and the colophon table are lists
 * whose shape is the same in every language.
 */

// Real build telemetry, not the hero's old hardcoded "v0.1.0" — baked in by
// next.config.ts at build time, since a static export has no server to ask at
// request time. NEXT_PUBLIC_* is inlined wherever it's referenced.
const GIT_SHA = process.env.NEXT_PUBLIC_GIT_SHA ?? "dev";
const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME
  ? `${process.env.NEXT_PUBLIC_BUILD_TIME.replace("T", " ").slice(0, 16)} UTC`
  : "dev";

const BUILD_ROW_LABELS: Record<Locale, [string, string]> = {
  en: ["Build", "Built"],
  fr: ["Build", "Généré"],
  nl: ["Build", "Gebouwd"],
  fy: ["Build", "Boud"],
  ru: ["Сборка", "Собрано"],
};

function buildRows(locale: Locale): [string, string][] {
  const [buildLabel, builtLabel] = BUILD_ROW_LABELS[locale];
  return [
    [buildLabel, GIT_SHA],
    [builtLabel, BUILD_TIME],
  ];
}

export type Role = {
  period: string;
  title: string;
  org: string;
  place: string;
  points: string[];
};

export type ReadmeSection = { heading: string; body: string };
export type TeamType = { type: string; description: string };

export type PageContent = {
  about: { intro: string[]; workHeading: string; work: string; nowHeading: string; now: string };
  aboutMeta: { role: string; interests: string };
  homeTeaser: string;
  roles: Role[];
  education: { degree: string; org: string; period: string; place: string; detail: string };
  colophon: [string, string][];
  readme: ReadmeSection[];
  teamTopologyIntro: string;
  teamTopology: TeamType[];
};

const en: PageContent = {
  about: {
    intro: [
      "Ten years writing software, the last five spent making other engineers faster instead of just myself. Somewhere between a computer science master's and a string of teams at very different scales — a psychology-assessment platform, a regulated investment app live in 37 markets, a healthcare analytics company untangling fifteen legacy systems — I stopped thinking of “engineering management” as a step away from building. It's a different unit of building: instead of a feature, you're shipping the conditions another engineer needs to ship well.",
      "That's the thread through everything below, including this site. It's a portfolio, but it's also a small proof of the same instinct — a shader, a scroll system, a content pipeline, built and wired by hand because the tooling around a thing is never separate from the thing itself.",
    ],
    workHeading: "How I work",
    work: "Treat internal platforms like products — with adoption, usability and an owner, not just an org chart. Build clarity before speed: teams ship predictably when priorities and dependencies are visible, not when they're told to move faster. Coach through feedback and pairing rather than process for its own sake. And stay close enough to the code and the incidents that the guardrails I set are ones I'd actually want to work inside.",
    nowHeading: "Currently",
    now: "Leading the mobile platform at StuDocu — React Native/Expo, authentication, monetization, and AI-powered learning features — and pushing AI-native engineering further than autocomplete: repo-context rules across GitHub, Linear and Sentry, LangGraph agents in production, Kestra pipelines generating content at scale, with real guardrails around what a tool is allowed to call and ship. Outside of that, still the same curiosities as ever: shaders, motion, and interfaces worth using.",
  },
  aboutMeta: {
    role: "Senior Engineering Manager, Mobile Platform",
    interests: "Motion · Shaders · AI · Developer Experience",
  },
  homeTeaser:
    "I lead engineering teams by day and build things that shouldn't quite be possible in a browser by night. This site is both a portfolio and a lab notebook — every effect here is open source.",
  roles: [
    {
      period: "07/2025 — Present",
      title: "Senior Engineering Manager, Mobile Platform",
      org: "StuDocu",
      place: "Amsterdam, Netherlands",
      points: [
        "Owns delivery for the mobile product platform, aligning Product, Design and Platform around shared OKRs across auth, monetization, AI learning features and the React Native/Expo foundation.",
        "Took over the mobile engineering function mid leadership-transition, re-establishing performance calibration, career development and team operating cadence.",
        "Drove AI-native engineering adoption — MCP integrations and repo-context rules across GitHub, Linear and Sentry — cutting ramp-up from months to weeks.",
        "Led production AI initiatives beyond coding assistance: LangGraph agents for mobile AI features, Kestra-orchestrated content pipelines, with guardrails on tool-calling and evaluation.",
        "Introduced automated verification gates in CI/CD through a core V1–V2 API overhaul, coordinating delivery across 6 mission owners with zero regressions.",
      ],
    },
    {
      period: "11/2022 — 06/2025",
      title: "Engineering Manager",
      org: "LOGEX Patient Engagement",
      place: "Amsterdam, Netherlands",
      points: [
        "Led cross-functional teams across backend and client platforms in a complex healthcare environment, coordinating design, development, legal, customer service and sales.",
        "Defined platform strategy and aligned architectural investment with business priorities, consolidating 15 fragmented legacy systems into a coherent platform.",
        "Drove domain observability and blameless retrospectives, sustaining zero-delay compliance with annual ISO and NEN 7510 audits.",
        "Balanced delivery speed, resilience and compliance across products and partner integrations requiring careful dependency management.",
      ],
    },
    {
      period: "11/2020 — 11/2022",
      title: "Engineering Manager / Senior Software Developer",
      org: "BOTS",
      place: "Haarlem, Netherlands",
      points: [
        "Led engineering for billing and transaction systems on an automated investment platform serving 150,000+ clients across 37 regulated markets.",
        "Partnered with Product, Finance and Security to align roadmap trade-offs where resilience, compliance and business outcomes had to move together.",
        "Established predictable bi-weekly release cycles and automated CI/CD checks for core billing engines, safeguarding transaction integrity and uptime.",
        "Mentored developers through code review and pair programming, raising technical standards across the team.",
      ],
    },
    {
      period: "07/2018 — 07/2020",
      title: "Lead Developer",
      org: "LTP Business Psychologists",
      place: "Amsterdam, Netherlands",
      points: [
        "Led frontend modernization of the flagship assessment platform, setting technical direction for a browser product used by 120+ consultants.",
        "Modernized legacy frontends into modular micro-frontends, improving maintainability, testing discipline and delivery consistency.",
        "Partnered with R&D to translate complex psychological models into intuitive, data-rich assessment experiences.",
        "Mentored junior developers through daily code review and pair programming.",
      ],
    },
  ],
  education: {
    degree: "MSc, Computer Science (Applied Sciences concentration)",
    org: "Leiden University",
    period: "09/2020 — 10/2021",
    place: "Leiden, Netherlands",
    detail: "GPA 8.8 / 10",
  },
  colophon: [
    ["Framework", "Next.js 16 · App Router · React 19 · TypeScript strict"],
    ["Styling", "Tailwind v4 with CSS-variable design tokens (globals.css)"],
    ["WebGL", "React Three Fiber · custom GLSL fluid shader on a single quad"],
    ["Scroll", "Lenis inertia scroll synced to GSAP ScrollTrigger"],
    ["UI motion", "GSAP for scroll & cursor, Motion (framer) for page transitions"],
    [
      "Content",
      "MDX files in /content, parsed with gray-matter, rendered via next-mdx-remote",
    ],
    ["Type", "Space Grotesk (display) · JetBrains Mono (HUD labels)"],
    ["A11y", "prefers-reduced-motion disables shader, smooth scroll, cursor and reveals"],
    ...buildRows("en"),
  ],
  readme: [
    {
      heading: "1:1s",
      body: "Every 1:1 has an agenda before it starts — yours, not mine. I keep a running doc per person so nothing gets lost between sessions, and I bring career conversations up proactively rather than waiting for a review cycle to make them official.",
    },
    {
      heading: "What I escalate",
      body: "Anything touching legal exposure, security, or a commitment made outside the team's control — immediately, not after trying to fix it quietly first. Everything else, I expect the team to own, and I'll back a decision made in good faith even if I'd have made a different one.",
    },
    {
      heading: "What I won't trade away",
      body: "Blameless retrospectives, a real ramp-up path for new engineers, and enough context that a decision can survive me being on vacation. Velocity is negotiable. Those aren't.",
    },
    {
      heading: "Feedback",
      body: "Tell me directly, close to when it happened, and expect the same back. I'd rather have an uncomfortable conversation on a Tuesday than a surprising one at review time.",
    },
  ],
  teamTopologyIntro:
    "Not a history of any specific org — a general approach, in Team Topologies' own vocabulary.",
  teamTopology: [
    { type: "Stream-aligned", description: "Owns a slice of the product end to end, from idea to production, with everything it needs to ship without waiting on another team." },
    { type: "Platform", description: "Builds the internal capabilities — CI/CD, shared infrastructure, tooling — that let stream-aligned teams move without reinventing the foundation each time." },
    { type: "Enabling", description: "Brings in specialist knowledge temporarily — security, performance, a new practice — to raise a team's own capability, then steps back out." },
  ],
};

const fr: PageContent = {
  about: {
    intro: [
      "Dix ans à écrire du logiciel, dont les cinq derniers passés à rendre d'autres ingénieurs plus rapides plutôt que moi seul. Quelque part entre un master en informatique et une série d'équipes à des échelles très différentes — une plateforme d'évaluation psychologique, une application d'investissement régulée présente sur 37 marchés, une entreprise d'analyse de données de santé démêlant quinze systèmes hérités — j'ai cessé de voir le « management d'ingénierie » comme un pas en dehors de la construction. C'est une autre unité de construction : au lieu d'une fonctionnalité, on livre les conditions dont un autre ingénieur a besoin pour bien livrer.",
      "C'est le fil conducteur de tout ce qui suit, ce site compris. C'est un portfolio, mais aussi une petite preuve du même réflexe — un shader, un système de défilement, un pipeline de contenu, construits et câblés à la main parce que l'outillage autour d'une chose n'est jamais séparé de la chose elle-même.",
    ],
    workHeading: "Ma façon de travailler",
    work: "Traiter les plateformes internes comme des produits — avec une adoption, une ergonomie et un propriétaire, pas seulement un organigramme. Construire la clarté avant la vitesse : une équipe livre de façon prévisible quand les priorités et les dépendances sont visibles, pas quand on lui demande d'aller plus vite. Accompagner par le feedback et le pair programming plutôt que par le processus pour lui-même. Et rester assez proche du code et des incidents pour que les garde-fous que je pose soient ceux dans lesquels j'aurais envie de travailler.",
    nowHeading: "En ce moment",
    now: "Je dirige la plateforme mobile chez StuDocu — React Native/Expo, authentification, monétisation et fonctionnalités d'apprentissage assistées par IA — et je pousse l'ingénierie native IA plus loin que l'autocomplétion : règles de contexte de dépôt sur GitHub, Linear et Sentry, agents LangGraph en production, pipelines Kestra générant du contenu à grande échelle, avec de vrais garde-fous sur ce qu'un outil a le droit d'appeler et de livrer. En dehors de ça, les mêmes curiosités que toujours : shaders, mouvement et interfaces qui méritent d'être utilisées.",
  },
  aboutMeta: {
    role: "Senior Engineering Manager, plateforme mobile",
    interests: "Mouvement · Shaders · IA · Expérience développeur",
  },
  homeTeaser:
    "Je dirige des équipes d'ingénierie le jour et je construis la nuit des choses qui ne devraient pas tout à fait être possibles dans un navigateur. Ce site est à la fois un portfolio et un carnet de laboratoire — chaque effet ici est open source.",
  roles: [
    {
      period: "07/2025 — aujourd'hui",
      title: "Senior Engineering Manager, plateforme mobile",
      org: "StuDocu",
      place: "Amsterdam, Pays-Bas",
      points: [
        "Responsable de la livraison de la plateforme produit mobile, alignant Produit, Design et Plateforme autour d'OKR partagés couvrant l'authentification, la monétisation, les fonctionnalités d'apprentissage IA et la base React Native/Expo.",
        "Reprise de la fonction d'ingénierie mobile en pleine transition de direction, en rétablissant la calibration des performances, le développement de carrière et le rythme opérationnel de l'équipe.",
        "Adoption d'une ingénierie native IA — intégrations MCP et règles de contexte de dépôt sur GitHub, Linear et Sentry — réduisant la montée en compétence de plusieurs mois à quelques semaines.",
        "Initiatives IA en production au-delà de l'assistance au code : agents LangGraph pour les fonctionnalités mobiles, pipelines de contenu orchestrés par Kestra, avec des garde-fous sur l'appel d'outils et l'évaluation.",
        "Mise en place de contrôles de vérification automatisés dans la CI/CD lors d'une refonte majeure de l'API V1–V2, en coordonnant la livraison entre 6 responsables de mission sans aucune régression.",
      ],
    },
    {
      period: "11/2022 — 06/2025",
      title: "Engineering Manager",
      org: "LOGEX Patient Engagement",
      place: "Amsterdam, Pays-Bas",
      points: [
        "Direction d'équipes pluridisciplinaires sur le backend et les plateformes clientes dans un environnement de santé complexe, en coordonnant design, développement, juridique, service client et ventes.",
        "Définition de la stratégie de plateforme et alignement des investissements architecturaux sur les priorités métier, consolidant 15 systèmes hérités fragmentés en une plateforme cohérente.",
        "Mise en place de l'observabilité par domaine et de rétrospectives sans blâme, assurant une conformité sans retard aux audits annuels ISO et NEN 7510.",
        "Équilibre entre vitesse de livraison, résilience et conformité sur des produits et des intégrations partenaires exigeant une gestion fine des dépendances.",
      ],
    },
    {
      period: "11/2020 — 11/2022",
      title: "Engineering Manager / Développeur senior",
      org: "BOTS",
      place: "Haarlem, Pays-Bas",
      points: [
        "Direction de l'ingénierie des systèmes de facturation et de transactions d'une plateforme d'investissement automatisée servant plus de 150 000 clients sur 37 marchés régulés.",
        "Collaboration avec le Produit, la Finance et la Sécurité pour arbitrer une feuille de route où résilience, conformité et résultats métier devaient avancer ensemble.",
        "Instauration de cycles de release bimensuels prévisibles et de contrôles CI/CD automatisés pour les moteurs de facturation, préservant l'intégrité des transactions et la disponibilité.",
        "Accompagnement des développeurs par la revue de code et le pair programming, élevant le niveau technique de l'équipe.",
      ],
    },
    {
      period: "07/2018 — 07/2020",
      title: "Lead Developer",
      org: "LTP Business Psychologists",
      place: "Amsterdam, Pays-Bas",
      points: [
        "Direction de la modernisation frontend de la plateforme d'évaluation phare, en fixant la direction technique d'un produit navigateur utilisé par plus de 120 consultants.",
        "Transformation de frontends hérités en micro-frontends modulaires, améliorant la maintenabilité, la discipline de test et la régularité des livraisons.",
        "Collaboration avec la R&D pour traduire des modèles psychologiques complexes en expériences d'évaluation intuitives et riches en données.",
        "Accompagnement des développeurs juniors par la revue de code quotidienne et le pair programming.",
      ],
    },
  ],
  education: {
    degree: "Master en informatique (spécialité sciences appliquées)",
    org: "Université de Leyde",
    period: "09/2020 — 10/2021",
    place: "Leyde, Pays-Bas",
    detail: "Moyenne 8,8 / 10",
  },
  colophon: [
    ["Framework", "Next.js 16 · App Router · React 19 · TypeScript strict"],
    ["Styles", "Tailwind v4 avec des tokens de design en variables CSS (globals.css)"],
    ["WebGL", "React Three Fiber · shader fluide GLSL sur un seul quad"],
    ["Défilement", "Défilement inertiel Lenis synchronisé avec GSAP ScrollTrigger"],
    ["Motion UI", "GSAP pour le défilement et le curseur, Motion (framer) pour les transitions"],
    [
      "Contenu",
      "Fichiers MDX dans /content, analysés avec gray-matter, rendus via next-mdx-remote",
    ],
    ["Typographie", "Space Grotesk (titres) · JetBrains Mono (libellés HUD)"],
    [
      "Accessibilité",
      "prefers-reduced-motion désactive le shader, le défilement lissé, le curseur et les révélations",
    ],
    ...buildRows("fr"),
  ],
  readme: [
    {
      heading: "Les 1:1",
      body: "Chaque 1:1 a un ordre du jour avant de commencer — le vôtre, pas le mien. Je tiens un document courant par personne pour que rien ne se perde d'une séance à l'autre, et j'aborde les questions de carrière de façon proactive plutôt que d'attendre un cycle de revue pour les officialiser.",
    },
    {
      heading: "Ce que j'escalade",
      body: "Tout ce qui touche à une exposition juridique, à la sécurité, ou à un engagement pris en dehors du contrôle de l'équipe — immédiatement, pas après avoir essayé de le régler discrètement. Pour le reste, j'attends que l'équipe se l'approprie, et je défendrai une décision prise de bonne foi même si j'en aurais pris une autre.",
    },
    {
      heading: "Ce que je ne sacrifie pas",
      body: "Les rétrospectives sans blâme, un vrai parcours d'intégration pour les nouveaux ingénieurs, et assez de contexte pour qu'une décision survive à mon absence en vacances. La vélocité est négociable. Pas ça.",
    },
    {
      heading: "Feedback",
      body: "Dites-le-moi directement, près du moment où ça s'est produit, et attendez-vous à la même chose en retour. Je préfère une conversation inconfortable un mardi qu'une surprise en revue.",
    },
  ],
  teamTopologyIntro:
    "Pas l'historique d'une organisation en particulier — une approche générale, dans le vocabulaire propre à Team Topologies.",
  teamTopology: [
    { type: "Stream-aligned", description: "Possède une tranche du produit de bout en bout, de l'idée à la production, avec tout ce qu'il faut pour livrer sans attendre une autre équipe." },
    { type: "Platform", description: "Construit les capacités internes — CI/CD, infrastructure partagée, outillage — qui permettent aux équipes stream-aligned d'avancer sans réinventer les fondations à chaque fois." },
    { type: "Enabling", description: "Apporte une expertise spécialisée temporairement — sécurité, performance, une nouvelle pratique — pour élever la capacité propre d'une équipe, puis se retire." },
  ],
};

const nl: PageContent = {
  about: {
    intro: [
      "Tien jaar software schrijven, de laatste vijf besteed aan andere engineers sneller maken in plaats van alleen mezelf. Ergens tussen een master informatica en een reeks teams op heel verschillende schaal — een platform voor psychologische assessments, een gereguleerde beleggingsapp in 37 markten, een healthcare-analyticsbedrijf dat vijftien legacysystemen ontwarde — ben ik “engineering management” niet langer gaan zien als een stap weg van bouwen. Het is een andere eenheid van bouwen: in plaats van een feature lever je de voorwaarden die een andere engineer nodig heeft om goed te leveren.",
      "Dat is de rode draad door alles hieronder, deze site inbegrepen. Het is een portfolio, maar ook een klein bewijs van datzelfde instinct — een shader, een scrollsysteem, een contentpipeline, met de hand gebouwd en aangesloten, omdat het gereedschap rond iets nooit los staat van dat iets zelf.",
    ],
    workHeading: "Hoe ik werk",
    work: "Behandel interne platformen als producten — met adoptie, bruikbaarheid en een eigenaar, niet alleen een organigram. Bouw duidelijkheid vóór snelheid: teams leveren voorspelbaar wanneer prioriteiten en afhankelijkheden zichtbaar zijn, niet wanneer ze te horen krijgen dat het sneller moet. Coach via feedback en samen programmeren in plaats van proces om het proces. En blijf dicht genoeg bij de code en de incidenten dat de kaders die ik stel er zijn waarin ik zelf zou willen werken.",
    nowHeading: "Op dit moment",
    now: "Ik leid het mobiele platform bij StuDocu — React Native/Expo, authenticatie, monetisatie en AI-gedreven leerfuncties — en duw AI-native engineering verder dan autocomplete: repo-contextregels over GitHub, Linear en Sentry, LangGraph-agents in productie, Kestra-pipelines die op schaal content genereren, met echte kaders rond wat een tool mag aanroepen en opleveren. Daarbuiten dezelfde nieuwsgierigheid als altijd: shaders, motion en interfaces die het gebruiken waard zijn.",
  },
  aboutMeta: {
    role: "Senior Engineering Manager, Mobile Platform",
    interests: "Motion · Shaders · AI · Developer Experience",
  },
  homeTeaser:
    "Overdag geef ik leiding aan engineeringteams, 's avonds bouw ik dingen die eigenlijk niet in een browser zouden moeten kunnen. Deze site is tegelijk portfolio en labjournaal — elk effect hier is open source.",
  roles: [
    {
      period: "07/2025 — heden",
      title: "Senior Engineering Manager, Mobile Platform",
      org: "StuDocu",
      place: "Amsterdam, Nederland",
      points: [
        "Verantwoordelijk voor de levering van het mobiele productplatform, met Product, Design en Platform uitgelijnd op gedeelde OKR's rond authenticatie, monetisatie, AI-leerfuncties en het React Native/Expo-fundament.",
        "De mobiele engineeringfunctie overgenomen midden in een leiderschapswissel, en performancecalibratie, loopbaanontwikkeling en het werkritme van het team opnieuw opgebouwd.",
        "AI-native engineering doorgevoerd — MCP-integraties en repo-contextregels over GitHub, Linear en Sentry — waardoor inwerken van maanden naar weken ging.",
        "AI-initiatieven in productie voorbij code-assistentie: LangGraph-agents voor mobiele AI-functies, door Kestra georkestreerde contentpipelines, met kaders rond tool-aanroepen en evaluatie.",
        "Geautomatiseerde verificatiepoorten in CI/CD ingevoerd tijdens een ingrijpende V1–V2 API-herziening, met levering afgestemd over 6 mission owners en zonder regressies.",
      ],
    },
    {
      period: "11/2022 — 06/2025",
      title: "Engineering Manager",
      org: "LOGEX Patient Engagement",
      place: "Amsterdam, Nederland",
      points: [
        "Leiding gegeven aan multidisciplinaire teams op backend- en clientplatformen in een complexe zorgomgeving, met afstemming tussen design, ontwikkeling, juridisch, klantenservice en sales.",
        "Platformstrategie bepaald en architectuurinvesteringen afgestemd op businessprioriteiten, waarbij 15 versnipperde legacysystemen tot één samenhangend platform werden gebracht.",
        "Domeinobservability en blameless retrospectives doorgevoerd, met steeds tijdige naleving van de jaarlijkse ISO- en NEN 7510-audits.",
        "Balans gehouden tussen snelheid, weerbaarheid en compliance over producten en partnerintegraties die zorgvuldig afhankelijkhedenbeheer vroegen.",
      ],
    },
    {
      period: "11/2020 — 11/2022",
      title: "Engineering Manager / Senior Software Developer",
      org: "BOTS",
      place: "Haarlem, Nederland",
      points: [
        "Leiding gegeven aan de engineering van facturatie- en transactiesystemen op een geautomatiseerd beleggingsplatform met meer dan 150.000 klanten in 37 gereguleerde markten.",
        "Samengewerkt met Product, Finance en Security om roadmapafwegingen te maken waar weerbaarheid, compliance en businessresultaten samen moesten bewegen.",
        "Voorspelbare tweewekelijkse releasecycli en geautomatiseerde CI/CD-controles voor de facturatiemotoren ingevoerd, wat transactie-integriteit en uptime beschermde.",
        "Ontwikkelaars begeleid via code review en samen programmeren, waarmee het technische niveau van het team omhoog ging.",
      ],
    },
    {
      period: "07/2018 — 07/2020",
      title: "Lead Developer",
      org: "LTP Business Psychologists",
      place: "Amsterdam, Nederland",
      points: [
        "Leiding gegeven aan de frontendmodernisering van het belangrijkste assessmentplatform, met technische richting voor een browserproduct dat door 120+ consultants werd gebruikt.",
        "Legacy frontends omgebouwd naar modulaire micro-frontends, wat onderhoudbaarheid, testdiscipline en leverbetrouwbaarheid verbeterde.",
        "Samengewerkt met R&D om complexe psychologische modellen te vertalen naar intuïtieve, datarijke assessmentervaringen.",
        "Junior ontwikkelaars begeleid via dagelijkse code review en samen programmeren.",
      ],
    },
  ],
  education: {
    degree: "MSc Informatica (richting toegepaste wetenschappen)",
    org: "Universiteit Leiden",
    period: "09/2020 — 10/2021",
    place: "Leiden, Nederland",
    detail: "Gemiddelde 8,8 / 10",
  },
  colophon: [
    ["Framework", "Next.js 16 · App Router · React 19 · TypeScript strict"],
    ["Styling", "Tailwind v4 met design tokens in CSS-variabelen (globals.css)"],
    ["WebGL", "React Three Fiber · eigen GLSL-fluidshader op één quad"],
    ["Scrollen", "Lenis inertiescroll gelijkgezet met GSAP ScrollTrigger"],
    ["UI-motion", "GSAP voor scroll en cursor, Motion (framer) voor paginaovergangen"],
    [
      "Content",
      "MDX-bestanden in /content, geparsed met gray-matter, gerenderd via next-mdx-remote",
    ],
    ["Typografie", "Space Grotesk (display) · JetBrains Mono (HUD-labels)"],
    [
      "Toegankelijkheid",
      "prefers-reduced-motion schakelt shader, smooth scroll, cursor en reveals uit",
    ],
    ...buildRows("nl"),
  ],
  readme: [
    {
      heading: "1:1's",
      body: "Elke 1:1 heeft een agenda voordat die begint — die van jou, niet die van mij. Ik houd per persoon een lopend document bij zodat er niets verloren gaat tussen sessies, en ik breng loopbaangesprekken proactief ter sprake in plaats van te wachten op een reviewcyclus om ze officieel te maken.",
    },
    {
      heading: "Wat ik escaleer",
      body: "Alles wat juridische blootstelling, beveiliging of een verplichting buiten de controle van het team raakt — meteen, niet nadat ik het eerst stilletjes probeer op te lossen. Al het andere verwacht ik dat het team zelf oppakt, en ik verdedig een beslissing die te goeder trouw is genomen, ook als ik zelf anders had gekozen.",
    },
    {
      heading: "Wat ik niet inruil",
      body: "Blameless retrospectives, een echt inwerkpad voor nieuwe engineers, en genoeg context dat een beslissing mijn vakantie overleeft. Snelheid is onderhandelbaar. Dat niet.",
    },
    {
      heading: "Feedback",
      body: "Zeg het me direct, dicht bij het moment dat het gebeurde, en verwacht hetzelfde terug. Ik heb liever een ongemakkelijk gesprek op een dinsdag dan een verrassing bij een review.",
    },
  ],
  teamTopologyIntro:
    "Geen geschiedenis van een specifieke organisatie — een algemene aanpak, in de eigen woordenschat van Team Topologies.",
  teamTopology: [
    { type: "Stream-aligned", description: "Bezit een deel van het product van begin tot eind, van idee tot productie, met alles wat nodig is om te leveren zonder op een ander team te wachten." },
    { type: "Platform", description: "Bouwt de interne mogelijkheden — CI/CD, gedeelde infrastructuur, tooling — waarmee stream-aligned teams verder kunnen zonder telkens het fundament opnieuw uit te vinden." },
    { type: "Enabling", description: "Brengt tijdelijk gespecialiseerde kennis binnen — security, performance, een nieuwe praktijk — om het eigen vermogen van een team te verhogen, en trekt zich dan weer terug." },
  ],
};

const fy: PageContent = {
  about: {
    intro: [
      "Tsien jier software skriuwe, de lêste fiif dêrfan bestege oan oare ingenieurs flugger meitsje ynstee fan allinnich mysels. Earne tusken in master ynformatika en in rige teams op hiel ferskillende skaal — in platfoarm foar psychologyske assessments, in regulearre beleggings-app yn 37 merken, in soarchanalytysk bedriuw dat fyftjin âlde systemen ûntwaarde — bin ik “engineering management” net langer sjen gien as in stap fuort fan bouwen. It is in oare ienheid fan bouwen: ynstee fan in funksje leverest de betingsten dêr't in oare ingenieur goed mei leverje kin.",
      "Dat is de reade tried troch alles hjirûnder, dizze side dêrby. It is in portfolio, mar ek in lyts bewiis fan itselde ynstinkt — in shader, in scrollsysteem, in ynhâldspipeline, mei de hân boud en oanslúten, om't it ark om wat hinne noait los stiet fan dat wat sels.",
    ],
    workHeading: "Hoe't ik wurkje",
    work: "Behannelje ynterne platfoarms as produkten — mei oanname, brûkberens en in eigener, net allinnich in plakje yn it organigram. Bou dúdlikens foar snelheid: teams leverje foarsisber as prioriteiten en ôfhinklikheden sichtber binne, net as har ferteld wurdt dat it flugger moat. Coach fia weromkeppeling en tegearre programmearjen ynstee fan proses om it proses. En bliuw ticht genôch by de koade en de ynsidinten dat de kaders dy't ik set kaders binne dêr't ik sels yn wurkje wolle soe.",
    nowHeading: "Op dit stuit",
    now: "Ik lied it mobile platfoarm by StuDocu — React Native/Expo, autentikaasje, monetisaasje en learfunksjes op basis fan AI — en ik triuw AI-native engineering fierder as autocomplete: repo-kontekstregels oer GitHub, Linear en Sentry, LangGraph-aginten yn produksje, Kestra-pipelines dy't op skaal ynhâld generearje, mei echte kaders om wat in ark oanroppe en opleverje mei. Dêrbûten deselde nijsgjirrigens as altyd: shaders, motion en ynterfaces dy't it brûken wurdich binne.",
  },
  aboutMeta: {
    role: "Senior Engineering Manager, mobyl platfoarm",
    interests: "Motion · Shaders · AI · Developer Experience",
  },
  homeTeaser:
    "Oerdeis jou ik lieding oan engineeringteams, jûns bou ik dingen dy't eins net yn in browser kinne soene. Dizze side is tagelyk portfolio en labsjoernaal — elk effekt hjir is iepen boarne.",
  roles: [
    {
      period: "07/2025 — no",
      title: "Senior Engineering Manager, mobyl platfoarm",
      org: "StuDocu",
      place: "Amsterdam, Nederlân",
      points: [
        "Ferantwurdlik foar de oplevering fan it mobile produktplatfoarm, mei Product, Design en Platform op deselde OKR's om autentikaasje, monetisaasje, AI-learfunksjes en it React Native/Expo-fûnemint hinne.",
        "De mobile engineeringfunksje oernommen midden yn in wiksel fan lieding, en prestaasjekalibraasje, loopbaanûntwikkeling en it wurkritme fan it team opnij opboud.",
        "AI-native engineering ynfierd — MCP-yntegraasjes en repo-kontekstregels oer GitHub, Linear en Sentry — wêrtroch ynwurkjen fan moannen nei wiken gie.",
        "AI-inisjativen yn produksje foarby koadehelp: LangGraph-aginten foar mobile AI-funksjes, troch Kestra oanstjoerde ynhâldspipelines, mei kaders om ark-oanroppen en evaluaasje.",
        "Automatyske ferifikaasjepoarten yn CI/CD ynfierd by in yngripende V1–V2 API-herzjenning, mei oplevering ôfstimd oer 6 mission owners en sûnder regressies.",
      ],
    },
    {
      period: "11/2022 — 06/2025",
      title: "Engineering Manager",
      org: "LOGEX Patient Engagement",
      place: "Amsterdam, Nederlân",
      points: [
        "Lieding jûn oan multydissiplinêre teams op backend- en klientplatfoarms yn in komplekse soarchomjouwing, mei ôfstimming tusken design, ûntwikkeling, juridysk, klanteservice en ferkeap.",
        "Platfoarmstrategy bepaald en arsjitektuerynvestearrings ôfstimd op bedriuwsprioriteiten, wêrby't 15 fersnippere âlde systemen ta ien gearhingjend platfoarm brocht binne.",
        "Domeinobservabiliteit en blameless retrospektiven ynfierd, mei hieltyd tydlike neilibbing fan de jierlikse ISO- en NEN 7510-audits.",
        "Balâns hâlden tusken snelheid, wjerberens en neilibbing oer produkten en partneryntegraasjes dy't soarchfâldich behear fan ôfhinklikheden fregen.",
      ],
    },
    {
      period: "11/2020 — 11/2022",
      title: "Engineering Manager / Senior Software Developer",
      org: "BOTS",
      place: "Haarlem, Nederlân",
      points: [
        "Lieding jûn oan de engineering fan fakturaasje- en transaksjesystemen op in automatisearre beleggingsplatfoarm mei mear as 150.000 klanten yn 37 regulearre merken.",
        "Gearwurke mei Product, Finance en Security om ôfwagings yn de roadmap te meitsjen dêr't wjerberens, neilibbing en bedriuwsresultaat tegearre bewege moasten.",
        "Foarsisbere twawyklikse releasesyklusen en automatyske CI/CD-kontrôles foar de fakturaasjemotoren ynfierd, wat transaksje-yntegriteit en beskikberens beskerme.",
        "Ûntwikkelders begelaat fia koade-review en tegearre programmearjen, wêrmei't it technyske nivo fan it team omheech gie.",
      ],
    },
    {
      period: "07/2018 — 07/2020",
      title: "Lead Developer",
      org: "LTP Business Psychologists",
      place: "Amsterdam, Nederlân",
      points: [
        "Lieding jûn oan de frontendfernijing fan it wichtichste assessmentplatfoarm, mei technyske rjochting foar in browserprodukt dat troch 120+ konsulinten brûkt waard.",
        "Âlde frontends omboud ta modulêre micro-frontends, wat ûnderhâldberens, testdissipline en betrouberens fan oplevering ferbettere.",
        "Gearwurke mei R&D om komplekse psychologyske modellen te fertalen nei yntuïtive, datarike assessmentûnderfiningen.",
        "Junior ûntwikkelders begelaat fia deistige koade-review en tegearre programmearjen.",
      ],
    },
  ],
  education: {
    degree: "MSc Ynformatika (rjochting tapaste wittenskippen)",
    org: "Universiteit Leiden",
    period: "09/2020 — 10/2021",
    place: "Leiden, Nederlân",
    detail: "Gemiddelde 8,8 / 10",
  },
  colophon: [
    ["Framework", "Next.js 16 · App Router · React 19 · TypeScript strict"],
    ["Styling", "Tailwind v4 mei design tokens yn CSS-fariabelen (globals.css)"],
    ["WebGL", "React Three Fiber · eigen GLSL-fluidshader op ien quad"],
    ["Scrollen", "Lenis inersjescroll lykop set mei GSAP ScrollTrigger"],
    ["UI-motion", "GSAP foar scroll en cursor, Motion (framer) foar side-oergongen"],
    [
      "Ynhâld",
      "MDX-bestannen yn /content, parsed mei gray-matter, rendere fia next-mdx-remote",
    ],
    ["Typografy", "Space Grotesk (display) · JetBrains Mono (HUD-labels)"],
    [
      "Tagonklikheid",
      "prefers-reduced-motion skeakelt shader, smooth scroll, cursor en reveals út",
    ],
    ...buildRows("fy"),
  ],
  readme: [
    {
      heading: "1:1's",
      body: "Elke 1:1 hat in wurkoarder foardat er begjint — dyn, net myn. Ik hâld per persoan in rinnend dokumint by sadat der neat ferlern giet tusken sesjes, en ik bring loopbaanpetearen proaktyf op it aljemint ynstee fan te wachtsjen op in reviewsyklus om se offisjeel te meitsjen.",
    },
    {
      heading: "Wat ik eskalearje",
      body: "Alles wat juridyske bleatstelling, feiligens of in ferplichting bûten de kontrôle fan it team reitsje — daliks, net neidat ik it earst stikem besykje op te lossen. Al it oare ferwachtsje ik dat it team sels oppakt, en ik ferdigenje in beslút dat te goeder trou naam is, ek as ik sels oars keazen hie.",
    },
    {
      heading: "Wat ik net ynruilje",
      body: "Blameless retrospektiven, in echt ynwurkpaad foar nije ingenieurs, en genôch kontekst dat in beslút myn fakânsje oerlibbet. Snelheid is ûnderhannelber. Dat net.",
    },
    {
      heading: "Feedback",
      body: "Sis it my direkt, ticht by it momint dat it barde, en ferwachtsje itselde werom. Ik ha leaver in ûngemaklik petear op in tiisdei as in ferrassing by in review.",
    },
  ],
  teamTopologyIntro:
    "Gjin skiednis fan in spesifike organisaasje — in algemiene oanpak, yn de eigen wurdskat fan Team Topologies.",
  teamTopology: [
    { type: "Stream-aligned", description: "Hat in diel fan it produkt yn eigendom fan begjin oant ein, fan idee oant produksje, mei alles wat nedich is om te leverjen sûnder op in oar team te wachtsjen." },
    { type: "Platform", description: "Bout de ynterne mooglikheden — CI/CD, dielde ynfrastruktuer, ark — dy't stream-aligned teams fierder helpe sûnder it fûnemint hieltyd opnij út te finen." },
    { type: "Enabling", description: "Bringt tydlik spesjalisearre kennis yn — feiligens, prestaasje, in nije praktyk — om de eigen kapasiteit fan in team te fergrutsjen, en lûkt him dêrnei wer werom." },
  ],
};

const ru: PageContent = {
  about: {
    intro: [
      "Десять лет пишу софт, последние пять — делаю быстрее не только себя, но и других инженеров. Где-то между магистратурой по информатике и чередой команд очень разного масштаба — платформа психологических оценок, регулируемое инвестиционное приложение в 37 рынках, компания медицинской аналитики, распутывающая пятнадцать унаследованных систем, — я перестал воспринимать «инженерный менеджмент» как шаг в сторону от разработки. Это просто другая единица работы: вместо фичи ты выпускаешь условия, в которых другой инженер сможет хорошо сделать свою.",
      "Это сквозная линия всего, что ниже, включая этот сайт. Это портфолио, но ещё и небольшое доказательство того же инстинкта — шейдер, система скролла, конвейер контента, собранные вручную, потому что инструменты вокруг вещи никогда не отделены от самой вещи.",
    ],
    workHeading: "Как я работаю",
    work: "Относиться к внутренним платформам как к продуктам — с внедрением, удобством и владельцем, а не просто строчкой в оргструктуре. Сначала ясность, потом скорость: команды выпускают предсказуемо, когда видны приоритеты и зависимости, а не когда им велят двигаться быстрее. Развивать людей через обратную связь и парную работу, а не через процесс ради процесса. И оставаться достаточно близко к коду и инцидентам, чтобы рамки, которые я задаю, были теми, в которых я сам хотел бы работать.",
    nowHeading: "Сейчас",
    now: "Веду мобильную платформу в StuDocu — React Native/Expo, аутентификация, монетизация и обучающие функции на базе ИИ — и продвигаю AI-native инженерию дальше автодополнения: правила репозиторного контекста в GitHub, Linear и Sentry, агенты LangGraph в проде, конвейеры Kestra, генерирующие контент в масштабе, с реальными ограничениями на то, что инструменту позволено вызывать и выпускать. Помимо этого — те же интересы, что и всегда: шейдеры, анимация и интерфейсы, которыми стоит пользоваться.",
  },
  aboutMeta: {
    role: "Старший инженерный менеджер, мобильная платформа",
    interests: "Анимация · Шейдеры · ИИ · Developer Experience",
  },
  homeTeaser:
    "Днём я руковожу инженерными командами, а ночью собираю вещи, которые в браузере вроде бы не должны работать. Этот сайт — одновременно портфолио и лабораторный журнал: каждый эффект здесь открыт.",
  roles: [
    {
      period: "07/2025 — по настоящее время",
      title: "Старший инженерный менеджер, мобильная платформа",
      org: "StuDocu",
      place: "Амстердам, Нидерланды",
      points: [
        "Отвечаю за поставку мобильной продуктовой платформы, согласуя Product, Design и Platform вокруг общих OKR по аутентификации, монетизации, обучающим ИИ-функциям и основе на React Native/Expo.",
        "Принял мобильную инженерную функцию в момент смены руководства, заново выстроив калибровку производительности, развитие карьеры и рабочий ритм команды.",
        "Внедрил AI-native инженерию — интеграции MCP и правила репозиторного контекста в GitHub, Linear и Sentry, — сократив выход на продуктивность с месяцев до недель.",
        "Вёл продакшн-инициативы с ИИ за пределами помощи в коде: агенты LangGraph для мобильных функций, конвейеры контента на Kestra, с ограничениями на вызовы инструментов и оценку качества.",
        "Ввёл автоматические проверки в CI/CD во время крупной переработки API V1–V2, согласовав поставку между 6 владельцами направлений без единой регрессии.",
      ],
    },
    {
      period: "11/2022 — 06/2025",
      title: "Инженерный менеджер",
      org: "LOGEX Patient Engagement",
      place: "Амстердам, Нидерланды",
      points: [
        "Руководил кросс-функциональными командами на бэкенде и клиентских платформах в сложной медицинской среде, согласуя дизайн, разработку, юристов, поддержку и продажи.",
        "Определил стратегию платформы и связал архитектурные вложения с бизнес-приоритетами, собрав 15 разрозненных унаследованных систем в цельную платформу.",
        "Развил доменную наблюдаемость и безобвинительные ретроспективы, обеспечив прохождение ежегодных аудитов ISO и NEN 7510 без задержек.",
        "Балансировал скорость поставки, устойчивость и соответствие требованиям в продуктах и партнёрских интеграциях, требовавших аккуратной работы с зависимостями.",
      ],
    },
    {
      period: "11/2020 — 11/2022",
      title: "Инженерный менеджер / Старший разработчик",
      org: "BOTS",
      place: "Харлем, Нидерланды",
      points: [
        "Руководил разработкой биллинговых и транзакционных систем автоматизированной инвестиционной платформы, обслуживающей более 150 000 клиентов в 37 регулируемых рынках.",
        "Работал с Product, Finance и Security над компромиссами дорожной карты, где устойчивость, соответствие требованиям и бизнес-результат должны были двигаться вместе.",
        "Наладил предсказуемые двухнедельные релизные циклы и автоматические проверки CI/CD для биллинговых движков, сохранив целостность транзакций и доступность.",
        "Развивал разработчиков через ревью кода и парное программирование, поднимая технический уровень команды.",
      ],
    },
    {
      period: "07/2018 — 07/2020",
      title: "Ведущий разработчик",
      org: "LTP Business Psychologists",
      place: "Амстердам, Нидерланды",
      points: [
        "Руководил модернизацией фронтенда ключевой платформы оценки, задавая техническое направление продукту, которым пользовались более 120 консультантов.",
        "Перевёл унаследованные фронтенды в модульные микрофронтенды, улучшив поддерживаемость, дисциплину тестирования и стабильность поставки.",
        "Работал с R&D, переводя сложные психологические модели в понятные, насыщенные данными сценарии оценки.",
        "Развивал младших разработчиков через ежедневное ревью кода и парное программирование.",
      ],
    },
  ],
  education: {
    degree: "Магистр информатики (прикладные науки)",
    org: "Лейденский университет",
    period: "09/2020 — 10/2021",
    place: "Лейден, Нидерланды",
    detail: "Средний балл 8,8 / 10",
  },
  colophon: [
    ["Фреймворк", "Next.js 16 · App Router · React 19 · строгий TypeScript"],
    ["Стили", "Tailwind v4 с дизайн-токенами в CSS-переменных (globals.css)"],
    ["WebGL", "React Three Fiber · собственный GLSL-шейдер жидкости на одном квадрате"],
    ["Скролл", "Инерционный скролл Lenis, синхронизированный с GSAP ScrollTrigger"],
    ["Анимация UI", "GSAP для скролла и курсора, Motion (framer) для переходов между страницами"],
    [
      "Контент",
      "MDX-файлы в /content, разбор через gray-matter, рендер через next-mdx-remote",
    ],
    ["Шрифты", "Space Grotesk (заголовки) · JetBrains Mono (HUD-подписи)"],
    [
      "Доступность",
      "prefers-reduced-motion отключает шейдер, плавный скролл, курсор и появления",
    ],
    ...buildRows("ru"),
  ],
  readme: [
    {
      heading: "Один на один",
      body: "У каждой встречи один на один есть повестка до её начала — ваша, не моя. Я веду текущий документ на каждого человека, чтобы ничего не терялось между сессиями, и поднимаю разговоры о карьере проактивно, а не жду цикла ревью, чтобы сделать их официальными.",
    },
    {
      heading: "Что я эскалирую",
      body: "Всё, что касается юридических рисков, безопасности или обязательства, взятого вне контроля команды — немедленно, а не после попытки тихо всё исправить. Всё остальное я жду, что команда возьмёт на себя, и поддержу решение, принятое добросовестно, даже если сам выбрал бы иначе.",
    },
    {
      heading: "Чем я не жертвую",
      body: "Безобвинительные ретроспективы, реальный путь адаптации для новых инженеров и достаточно контекста, чтобы решение пережило мой отпуск. Скорость — предмет переговоров. Это — нет.",
    },
    {
      heading: "Обратная связь",
      body: "Скажите мне прямо, близко к моменту, когда это произошло, и ждите того же в ответ. Я предпочту неловкий разговор во вторник неожиданности на ревью.",
    },
  ],
  teamTopologyIntro:
    "Не история конкретной организации — общий подход, в терминологии самой Team Topologies.",
  teamTopology: [
    { type: "Stream-aligned", description: "Владеет частью продукта от идеи до продакшна целиком, со всем необходимым, чтобы выпускать релизы, не дожидаясь другой команды." },
    { type: "Platform", description: "Строит внутренние возможности — CI/CD, общую инфраструктуру, инструменты — которые позволяют stream-aligned командам двигаться, не изобретая фундамент заново каждый раз." },
    { type: "Enabling", description: "Временно привносит специализированную экспертизу — безопасность, производительность, новую практику — чтобы поднять собственные возможности команды, а затем отходит в сторону." },
  ],
};

const CONTENT: Record<Locale, PageContent> = { en, fr, nl, fy, ru };

export function pageContent(locale: Locale): PageContent {
  return CONTENT[locale] ?? en;
}
