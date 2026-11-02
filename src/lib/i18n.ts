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
  "log.from": "From:",
  "log.viewCaseStudy": "View case study",
  "log.copyHash": "copy",
  "log.copied": "copied",

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

  "leadershipNote.label": "Leadership note",

  "warRoom.simulatedBadge": "Simulated incident — no live systems, no agents, client state only.",
  "warRoom.incident.id": "INC-2847",
  "warRoom.incident.severity": "SEV-2 · checkout webhooks",
  "warRoom.incident.summary":
    "Error rate on payment webhook handler jumped 14× after deploy ac9f2. Carts complete but settlement events stall. No data loss reported yet.",
  "warRoom.prompt": "Three responders disagree. Your call.",
  "warRoom.agent.alpha.name": "Agent α · scale",
  "warRoom.agent.alpha.fix":
    "Double HPA max for webhook workers and drain the stuck partition — throughput first, root cause later.",
  "warRoom.agent.beta.name": "Agent β · revert",
  "warRoom.agent.beta.fix": "Rollback ac9f2 now — null guard on idempotency key is wrong under retries.",
  "warRoom.agent.gamma.name": "Agent γ · blend",
  "warRoom.agent.gamma.fix":
    "Ship a hybrid: revert the guard, re-deploy behind a 5% shadow validator, keep traffic otherwise.",
  "warRoom.action.merge": "Merge proposals",
  "warRoom.action.escalate": "Escalate to humans",
  "warRoom.action.rollback": "Rollback deploy",
  "warRoom.outcome.merge.title": "Outcome · blended mitigations",
  "warRoom.outcome.merge.body":
    "Shadow validator catches duplicate keys on 5% traffic while revert removes the bad guard. Error rate falls in fifteen minutes; full postmortem still pending.",
  "warRoom.outcome.merge.leadership":
    "When automation disagrees, synthesis beats picking a favorite — but only if you name who owns the residual risk until the postmortem lands.",
  "warRoom.outcome.escalate.title": "Outcome · automation paused",
  "warRoom.outcome.escalate.body":
    "Agents frozen at proposal stage. Incident commander joins bridge; on-call keeps manual settlement queue draining. No deploy or scale change until humans align.",
  "warRoom.outcome.escalate.leadership":
    "Escalation is not failure — it's the guardrail that keeps velocity from outrunning judgment when the blast radius is still fuzzy.",
  "warRoom.outcome.rollback.title": "Outcome · deploy reversed",
  "warRoom.outcome.rollback.body":
    "ac9f2 rolled back in four minutes. Webhooks green; retry backlog clears overnight. Forward fix rescheduled behind proper staging coverage.",
  "warRoom.outcome.rollback.leadership":
    "Reversible moves are leadership infrastructure — rollback first when certainty is low and every minute of ambiguity compounds customer trust.",
  "warRoom.replay": "Run again",

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

  "contextGraph.simulated": "Simulated · no live APIs",
  "contextGraph.toggleConnected": "Context layer: connected",
  "contextGraph.toggleBroken": "Context layer: broken",
  "contextGraph.statusConnected": "One picture — GitHub, Linear, and Sentry feed the same hub before the agent session runs.",
  "contextGraph.statusBroken": "Three silos — every session rebuilds partial context from scratch.",
  "contextGraph.node.github": "GitHub",
  "contextGraph.node.linear": "Linear",
  "contextGraph.node.sentry": "Sentry",
  "contextGraph.node.contextLayer": "Context layer",
  "contextGraph.node.agentSession": "Agent session",
  "contextGraph.hint": "Toggle the layer to see edges connect or fragment.",
  "contextGraph.ariaSummary":
    "Diagram of GitHub, Linear, and Sentry connecting through a shared context layer into an agent session.",

  "builder.simulatedBadge": "Simulated run — no network, no live APIs.",
  "builder.toolsHeading": "Tools enabled",
  "builder.tool.issueReader": "Issue reader",
  "builder.tool.prOpener": "PR opener",
  "builder.tool.paymentApi": "Payment API",
  "builder.tierHeading": "Autonomy tier",
  "builder.tier.readOnly": "Read-only",
  "builder.tier.propose": "Propose",
  "builder.tier.gatedAutomatic": "Gated automatic",
  "builder.scenarioHeading": "Scenario",
  "builder.scenario.readIssue": "Read issue #142",
  "builder.scenario.openPr": "Open pull request",
  "builder.scenario.paymentApi": "Call payment API",
  "builder.run": "Run scenario",
  "builder.logHeading": "Harness log",
  "builder.logEmpty": "Pick tools, tier, and scenario — then run.",
  "builder.outcome.success": "SUCCESS",
  "builder.outcome.blocked": "BLOCKED",
  "builder.outcome.awaiting": "AWAITING HUMAN",
  "builder.log.harnessStart": "harness: scenario accepted (simulated)",
  "builder.log.contextLoaded": "context: GitHub + Linear snapshot hydrated",
  "builder.log.toolIssueReaderMissing": "tools: issue reader disabled — cannot satisfy request",
  "builder.log.toolPrOpenerMissing": "tools: PR opener disabled — cannot satisfy request",
  "builder.log.toolPaymentMissing": "tools: payment API disabled — cannot satisfy request",
  "builder.log.haltTools": "loop: halted at tools layer",
  "builder.log.tierAllowsRead": "permissions: tier allows read-only fetch",
  "builder.log.permIssueReadPass": "permissions: issue #142 read approved",
  "builder.log.toolIssueReaderCall": "tools: issue_reader → GET /issues/142",
  "builder.log.loopIdle": "loop: model stop — no further tool calls",
  "builder.log.doneReadIssue": "result: issue body returned to context",
  "builder.log.tierReadOnlyWrite": "permissions: tier read-only — write tools rejected",
  "builder.log.permPrDenied": "permissions: pr_opener denied (write)",
  "builder.log.haltPermissions": "loop: halted at permissions gate",
  "builder.log.tierProposeWrite": "permissions: tier propose — draft writes allowed",
  "builder.log.permPrDraftOnly": "permissions: pr_opener limited to draft + label",
  "builder.log.toolPrOpenerCall": "tools: pr_opener → POST /pulls (draft=true)",
  "builder.log.prDraftCreated": "environment: draft PR #891 opened on branch cursor/fix-142",
  "builder.log.awaitingHuman": "harness: awaiting human review before merge",
  "builder.log.tierPaymentInsufficient": "permissions: tier lacks gated-automatic for payment",
  "builder.log.permPaymentDenied": "permissions: payment_api denied — escalate to person",
  "builder.log.tierGatedPayment": "permissions: tier gated-automatic — payment namespace open",
  "builder.log.permPaymentPass": "permissions: payment_api allowed within CI bounds",
  "builder.log.evalGatePass": "eval: regression gate passed (fixture replay)",
  "builder.log.toolPaymentCall": "tools: payment_api → POST /charges (idempotent key)",
  "builder.log.auditLogged": "audit: charge intent logged, reversible window 15m",
  "builder.log.donePayment": "result: payment simulated — no funds moved",


  "vectorSearch.rankCosine": "Cosine",
  "vectorSearch.rankDistance": "Distance",
  "vectorSearch.hint": "Drag to orbit.",
  "vectorSearch.caption":
    "Cosine only measures the angle to the query — magnitude doesn't matter. Distance measures actual position. Same five points, a different winner depending on which one you ask.",
  "vectorSearch.query": "Query",
  "vectorSearch.picked": "picked",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "dist",

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
  "askSite.governanceTitle": "Governance (visible by design)",
  "askSite.tierBadge": "Autonomy tier: read-only",
  "askSite.webBadge": "Web: off",
  "askSite.toolsBadge": "Tools: none",
  "askSite.governanceBody":
    "This assistant only reads the prebuilt site index — work, lab, readme, and decision log. It cannot browse, call APIs, or change anything. The tier badge is the product contract, not fine print.",
  "askSite.placeholder": "Ask about a case study, harness, or decision on this site…",
  "askSite.ask": "Ask",
  "askSite.loading": "Searching the index…",
  "askSite.noResults": "Nothing in the index matched — try different words or open Search (⌘K).",
  "askSite.answerLabel": "Answer (extractive, from citations)",
  "askSite.retrievalNote":
    "No LLM in the default path — BM25 over the same static index as site search. Optional embedding APIs are not required for production.",
  "askSite.promptHint": "Try a sample question above, or type your own. Every sentence should trace to a citation below.",
  "askSite.citations": "Citations",
  "askSite.example1": "What is the harness in agentic systems?",
  "askSite.example2": "How does cosine similarity differ from distance?",
  "askSite.example3": "What decisions were logged for beyond autocomplete?",

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
  "log.from": "Projet :",
  "log.viewCaseStudy": "Voir l'étude de cas",
  "log.copyHash": "copier",
  "log.copied": "copié",

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

  "leadershipNote.label": "Note leadership",

  "warRoom.simulatedBadge": "Incident simulé — aucun système live, aucun agent, état client uniquement.",
  "warRoom.incident.id": "INC-2847",
  "warRoom.incident.severity": "SEV-2 · webhooks checkout",
  "warRoom.incident.summary":
    "Le taux d'erreur du handler webhook paiement a été multiplié par 14 après le déploiement ac9f2. Les paniers se finalisent mais les règlements restent bloqués. Aucune perte de données signalée.",
  "warRoom.prompt": "Trois répondeurs ne sont pas d'accord. À vous de trancher.",
  "warRoom.agent.alpha.name": "Agent α · scale",
  "warRoom.agent.alpha.fix":
    "Doubler le max HPA des workers webhook et vider la partition bloquée — débit d'abord, cause racine ensuite.",
  "warRoom.agent.beta.name": "Agent β · revert",
  "warRoom.agent.beta.fix":
    "Rollback ac9f2 maintenant — le garde null sur la clé d'idempotence est faux sous retries.",
  "warRoom.agent.gamma.name": "Agent γ · blend",
  "warRoom.agent.gamma.fix":
    "Hybride : revert du garde, redéploiement derrière un validateur shadow à 5 %, trafic inchangé sinon.",
  "warRoom.action.merge": "Fusionner les propositions",
  "warRoom.action.escalate": "Escalader vers des humains",
  "warRoom.action.rollback": "Rollback du déploiement",
  "warRoom.outcome.merge.title": "Résultat · atténuations combinées",
  "warRoom.outcome.merge.body":
    "Le validateur shadow détecte les clés dupliquées sur 5 % du trafic pendant que le revert supprime le mauvais garde. Le taux d'erreur baisse en quinze minutes ; postmortem complet en attente.",
  "warRoom.outcome.merge.leadership":
    "Quand l'automatisation diverge, la synthèse bat le favori — à condition de nommer qui porte le risque résiduel jusqu'au postmortem.",
  "warRoom.outcome.escalate.title": "Résultat · automatisation en pause",
  "warRoom.outcome.escalate.body":
    "Agents figés au stade proposition. Le commandant d'incident rejoint le bridge ; l'astreinte vide la file de règlement manuellement. Aucun déploiement ni scale tant que les humains ne sont pas alignés.",
  "warRoom.outcome.escalate.leadership":
    "Escalader n'est pas un échec — c'est le garde-fou qui empêche la vélocité de dépasser le jugement quand le rayon d'impact reste flou.",
  "warRoom.outcome.rollback.title": "Résultat · déploiement annulé",
  "warRoom.outcome.rollback.body":
    "ac9f2 rollback en quatre minutes. Webhooks au vert ; backlog de retries vidé dans la nuit. Correctif reprogrammé avec une couverture staging sérieuse.",
  "warRoom.outcome.rollback.leadership":
    "Les mouvements réversibles sont une infrastructure de leadership — rollback d'abord quand la certitude est basse et que chaque minute d'ambiguïté érode la confiance client.",
  "warRoom.replay": "Rejouer",

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

  "contextGraph.simulated": "Simulé · pas d'API live",
  "contextGraph.toggleConnected": "Couche contexte : connectée",
  "contextGraph.toggleBroken": "Couche contexte : cassée",
  "contextGraph.statusConnected":
    "Une seule image — GitHub, Linear et Sentry alimentent le même hub avant la session agent.",
  "contextGraph.statusBroken": "Trois silos — chaque session reconstruit un contexte partiel depuis zéro.",
  "contextGraph.node.github": "GitHub",
  "contextGraph.node.linear": "Linear",
  "contextGraph.node.sentry": "Sentry",
  "contextGraph.node.contextLayer": "Couche contexte",
  "contextGraph.node.agentSession": "Session agent",
  "contextGraph.hint": "Basculez la couche pour voir les liens se connecter ou se fragmenter.",
  "contextGraph.ariaSummary":
    "Schéma de GitHub, Linear et Sentry passant par une couche de contexte partagée vers une session agent.",

  "builder.simulatedBadge": "Exécution simulée — pas de réseau, pas d'API réelle.",
  "builder.toolsHeading": "Outils activés",
  "builder.tool.issueReader": "Lecteur d'issues",
  "builder.tool.prOpener": "Ouverture de PR",
  "builder.tool.paymentApi": "API paiement",
  "builder.tierHeading": "Niveau d'autonomie",
  "builder.tier.readOnly": "Lecture seule",
  "builder.tier.propose": "Proposition",
  "builder.tier.gatedAutomatic": "Automatique sous contrôle",
  "builder.scenarioHeading": "Scénario",
  "builder.scenario.readIssue": "Lire l'issue #142",
  "builder.scenario.openPr": "Ouvrir une pull request",
  "builder.scenario.paymentApi": "Appeler l'API paiement",
  "builder.run": "Lancer le scénario",
  "builder.logHeading": "Journal du harnais",
  "builder.logEmpty": "Choisissez outils, niveau et scénario — puis lancez.",
  "builder.outcome.success": "SUCCÈS",
  "builder.outcome.blocked": "BLOQUÉ",
  "builder.outcome.awaiting": "EN ATTENTE HUMAINE",
  "builder.log.harnessStart": "harnais : scénario accepté (simulé)",
  "builder.log.contextLoaded": "contexte : instantané GitHub + Linear chargé",
  "builder.log.toolIssueReaderMissing": "outils : lecteur d'issues désactivé — requête impossible",
  "builder.log.toolPrOpenerMissing": "outils : ouverture PR désactivée — requête impossible",
  "builder.log.toolPaymentMissing": "outils : API paiement désactivée — requête impossible",
  "builder.log.haltTools": "boucle : arrêt à la couche outils",
  "builder.log.tierAllowsRead": "permissions : niveau autorise la lecture seule",
  "builder.log.permIssueReadPass": "permissions : lecture issue #142 approuvée",
  "builder.log.toolIssueReaderCall": "outils : issue_reader → GET /issues/142",
  "builder.log.loopIdle": "boucle : modèle arrêté — plus d'appels d'outils",
  "builder.log.doneReadIssue": "résultat : corps de l'issue renvoyé au contexte",
  "builder.log.tierReadOnlyWrite": "permissions : niveau lecture seule — écritures refusées",
  "builder.log.permPrDenied": "permissions : pr_opener refusé (écriture)",
  "builder.log.haltPermissions": "boucle : arrêt au contrôle des permissions",
  "builder.log.tierProposeWrite": "permissions : niveau proposition — brouillons autorisés",
  "builder.log.permPrDraftOnly": "permissions : pr_opener limité au brouillon + label",
  "builder.log.toolPrOpenerCall": "outils : pr_opener → POST /pulls (draft=true)",
  "builder.log.prDraftCreated": "environnement : brouillon PR #891 sur branche cursor/fix-142",
  "builder.log.awaitingHuman": "harnais : en attente de revue humaine avant merge",
  "builder.log.tierPaymentInsufficient": "permissions : niveau insuffisant pour paiement automatique",
  "builder.log.permPaymentDenied": "permissions : payment_api refusé — escalade humaine",
  "builder.log.tierGatedPayment": "permissions : niveau automatique sous contrôle — paiement ouvert",
  "builder.log.permPaymentPass": "permissions : payment_api autorisé dans les bornes CI",
  "builder.log.evalGatePass": "eval : porte de régression passée (replay fixture)",
  "builder.log.toolPaymentCall": "outils : payment_api → POST /charges (clé idempotente)",
  "builder.log.auditLogged": "audit : intention de charge journalisée, fenêtre réversible 15 min",
  "builder.log.donePayment": "résultat : paiement simulé — aucun fonds déplacé",


  "vectorSearch.rankCosine": "Cosinus",
  "vectorSearch.rankDistance": "Distance",
  "vectorSearch.hint": "Faites glisser pour orbiter.",
  "vectorSearch.caption":
    "Le cosinus ne mesure que l'angle par rapport à la requête — la magnitude n'a pas d'importance. La distance mesure la position réelle. Les cinq mêmes points, un gagnant différent selon celui qu'on interroge.",
  "vectorSearch.query": "Requête",
  "vectorSearch.picked": "retenu",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "dist.",

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
  "askSite.governanceTitle": "Gouvernance (visible par design)",
  "askSite.tierBadge": "Niveau d'autonomie : lecture seule",
  "askSite.webBadge": "Web : désactivé",
  "askSite.toolsBadge": "Outils : aucun",
  "askSite.governanceBody":
    "Cet assistant ne lit que l'index statique du site — projets, labo, readme et journal de décisions. Il ne peut ni naviguer, ni appeler des API, ni rien modifier. Le badge de niveau est le contrat produit, pas la fine print.",
  "askSite.placeholder": "Posez une question sur un case study, un harness ou une décision de ce site…",
  "askSite.ask": "Demander",
  "askSite.loading": "Recherche dans l'index…",
  "askSite.noResults": "Rien dans l'index ne correspond — essayez d'autres mots ou ouvrez Rechercher (⌘K).",
  "askSite.answerLabel": "Réponse (extractive, depuis les citations)",
  "askSite.retrievalNote":
    "Pas de LLM dans le chemin par défaut — BM25 sur le même index statique que la recherche du site. Aucune API d'embedding requise en production.",
  "askSite.promptHint": "Essayez une question exemple ci-dessus, ou saisissez la vôtre. Chaque phrase doit remonter à une citation ci-dessous.",
  "askSite.citations": "Citations",
  "askSite.example1": "Qu'est-ce que le harness dans les systèmes agentiques ?",
  "askSite.example2": "En quoi la similarité cosinus diffère-t-elle de la distance ?",
  "askSite.example3": "Quelles décisions ont été consignées pour beyond autocomplete ?",

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
  "log.from": "Uit:",
  "log.viewCaseStudy": "Case study bekijken",
  "log.copyHash": "kopiëren",
  "log.copied": "gekopieerd",

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

  "leadershipNote.label": "Leadership-notitie",

  "warRoom.simulatedBadge": "Gesimuleerd incident — geen live systemen, geen agents, alleen client state.",
  "warRoom.incident.id": "INC-2847",
  "warRoom.incident.severity": "SEV-2 · checkout-webhooks",
  "warRoom.incident.summary":
    "Foutpercentage op payment-webhook-handler steeg 14× na deploy ac9f2. Winkelwagens ronden af maar settlement-events blijven hangen. Nog geen dataverlies gemeld.",
  "warRoom.prompt": "Drie responders zijn het oneens. Jouw beslissing.",
  "warRoom.agent.alpha.name": "Agent α · scale",
  "warRoom.agent.alpha.fix":
    "Verdubbel HPA-max voor webhook-workers en leeg de vastzittende partition — throughput eerst, root cause later.",
  "warRoom.agent.beta.name": "Agent β · revert",
  "warRoom.agent.beta.fix": "Rollback ac9f2 nu — null-guard op idempotency key klopt niet bij retries.",
  "warRoom.agent.gamma.name": "Agent γ · blend",
  "warRoom.agent.gamma.fix":
    "Hybride: guard terugdraaien, opnieuw deployen achter 5% shadow-validator, verder normaal verkeer.",
  "warRoom.action.merge": "Voorstellen samenvoegen",
  "warRoom.action.escalate": "Escaleren naar mensen",
  "warRoom.action.rollback": "Deploy rollback",
  "warRoom.outcome.merge.title": "Uitkomst · gecombineerde mitigaties",
  "warRoom.outcome.merge.body":
    "Shadow-validator vangt dubbele keys op 5% verkeer terwijl revert de foute guard verwijdert. Foutpercentage daalt in vijftien minuten; volledige postmortem volgt.",
  "warRoom.outcome.merge.leadership":
    "Als automatisering het oneens is, wint synthese boven een favoriet — mits je benoemt wie het resterende risico draagt tot de postmortem.",
  "warRoom.outcome.escalate.title": "Uitkomst · automatisering gepauzeerd",
  "warRoom.outcome.escalate.body":
    "Agents bevroren bij voorstelstadium. Incident commander op bridge; on-call leegt settlement-queue handmatig. Geen deploy of scale tot mensen aligned zijn.",
  "warRoom.outcome.escalate.leadership":
    "Escaleren is geen falen — het is de guardrail die voorkomt dat snelheid het oordeel voorbij rent als de blast radius nog vaag is.",
  "warRoom.outcome.rollback.title": "Uitkomst · deploy teruggedraaid",
  "warRoom.outcome.rollback.body":
    "ac9f2 in vier minuten teruggedraaid. Webhooks groen; retry-backlog 's nachts weg. Forward fix opnieuw gepland met echte staging-dekking.",
  "warRoom.outcome.rollback.leadership":
    "Omkeerbare zetten zijn leadership-infrastructuur — eerst rollback als zekerheid laag is en elke minuut ambiguïteit klantvertrouwen kost.",
  "warRoom.replay": "Opnieuw",

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

  "contextGraph.simulated": "Gesimuleerd · geen live API's",
  "contextGraph.toggleConnected": "Contextlaag: verbonden",
  "contextGraph.toggleBroken": "Contextlaag: kapot",
  "contextGraph.statusConnected":
    "Eén beeld — GitHub, Linear en Sentry voeden dezelfde hub voordat de agentsessie draait.",
  "contextGraph.statusBroken": "Drie silo's — elke sessie bouwt gedeeltelijke context vanaf nul op.",
  "contextGraph.node.github": "GitHub",
  "contextGraph.node.linear": "Linear",
  "contextGraph.node.sentry": "Sentry",
  "contextGraph.node.contextLayer": "Contextlaag",
  "contextGraph.node.agentSession": "Agentsessie",
  "contextGraph.hint": "Schakel de laag om verbindingen of fragmentatie te zien.",
  "contextGraph.ariaSummary":
    "Diagram van GitHub, Linear en Sentry via een gedeelde contextlaag naar een agentsessie.",

  "builder.simulatedBadge": "Gesimuleerde run — geen netwerk, geen live API's.",
  "builder.toolsHeading": "Tools ingeschakeld",
  "builder.tool.issueReader": "Issue-lezer",
  "builder.tool.prOpener": "PR-opener",
  "builder.tool.paymentApi": "Betaal-API",
  "builder.tierHeading": "Autonomieniveau",
  "builder.tier.readOnly": "Alleen-lezen",
  "builder.tier.propose": "Voorstellen",
  "builder.tier.gatedAutomatic": "Automatisch onder controle",
  "builder.scenarioHeading": "Scenario",
  "builder.scenario.readIssue": "Issue #142 lezen",
  "builder.scenario.openPr": "Pull request openen",
  "builder.scenario.paymentApi": "Betaal-API aanroepen",
  "builder.run": "Scenario uitvoeren",
  "builder.logHeading": "Harness-log",
  "builder.logEmpty": "Kies tools, niveau en scenario — voer daarna uit.",
  "builder.outcome.success": "GELUKT",
  "builder.outcome.blocked": "GEBLOKKEERD",
  "builder.outcome.awaiting": "WACHT OP MENS",
  "builder.log.harnessStart": "harness: scenario geaccepteerd (gesimuleerd)",
  "builder.log.contextLoaded": "context: GitHub + Linear snapshot geladen",
  "builder.log.toolIssueReaderMissing": "tools: issue-lezer uit — verzoek niet mogelijk",
  "builder.log.toolPrOpenerMissing": "tools: PR-opener uit — verzoek niet mogelijk",
  "builder.log.toolPaymentMissing": "tools: betaal-API uit — verzoek niet mogelijk",
  "builder.log.haltTools": "loop: gestopt bij tool-laag",
  "builder.log.tierAllowsRead": "permissions: niveau staat alleen-lezen toe",
  "builder.log.permIssueReadPass": "permissions: issue #142 lezen goedgekeurd",
  "builder.log.toolIssueReaderCall": "tools: issue_reader → GET /issues/142",
  "builder.log.loopIdle": "loop: model stopt — geen verdere toolcalls",
  "builder.log.doneReadIssue": "resultaat: issue-body terug in context",
  "builder.log.tierReadOnlyWrite": "permissions: alleen-lezen — schrijftools geweigerd",
  "builder.log.permPrDenied": "permissions: pr_opener geweigerd (schrijven)",
  "builder.log.haltPermissions": "loop: gestopt bij permission-gate",
  "builder.log.tierProposeWrite": "permissions: voorstelniveau — concepten toegestaan",
  "builder.log.permPrDraftOnly": "permissions: pr_opener beperkt tot concept + label",
  "builder.log.toolPrOpenerCall": "tools: pr_opener → POST /pulls (draft=true)",
  "builder.log.prDraftCreated": "environment: concept-PR #891 op branch cursor/fix-142",
  "builder.log.awaitingHuman": "harness: wacht op menselijke review vóór merge",
  "builder.log.tierPaymentInsufficient": "permissions: niveau onvoldoend voor automatische betaling",
  "builder.log.permPaymentDenied": "permissions: payment_api geweigerd — escaleer naar mens",
  "builder.log.tierGatedPayment": "permissions: automatisch onder controle — betaling open",
  "builder.log.permPaymentPass": "permissions: payment_api toegestaan binnen CI-grenzen",
  "builder.log.evalGatePass": "eval: regressiepoort geslaagd (fixture replay)",
  "builder.log.toolPaymentCall": "tools: payment_api → POST /charges (idempotente sleutel)",
  "builder.log.auditLogged": "audit: charge-intent gelogd, omkeerbaar venster 15 min",
  "builder.log.donePayment": "resultaat: betaling gesimuleerd — geen geld verplaatst",


  "vectorSearch.rankCosine": "Cosinus",
  "vectorSearch.rankDistance": "Afstand",
  "vectorSearch.hint": "Sleep om te draaien.",
  "vectorSearch.caption":
    "Cosinus meet alleen de hoek ten opzichte van de zoekopdracht — grootte maakt niet uit. Afstand meet de werkelijke positie. Dezelfde vijf punten, een andere winnaar afhankelijk van wat je vraagt.",
  "vectorSearch.query": "Zoekopdracht",
  "vectorSearch.picked": "gekozen",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "afst.",

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
  "askSite.governanceTitle": "Governance (bewust zichtbaar)",
  "askSite.tierBadge": "Autonomieniveau: alleen-lezen",
  "askSite.webBadge": "Web: uit",
  "askSite.toolsBadge": "Tools: geen",
  "askSite.governanceBody":
    "Deze assistent leest alleen de voorgebouwde site-index — work, lab, readme en beslissingslog. Geen browsen, geen API's, geen wijzigingen. Het tier-badge is het productcontract, geen kleine lettertjes.",
  "askSite.placeholder": "Vraag over een case study, harness of beslissing op deze site…",
  "askSite.ask": "Vraag",
  "askSite.loading": "Index doorzoeken…",
  "askSite.noResults": "Niets in de index komt overeen — probeer andere woorden of open Zoeken (⌘K).",
  "askSite.answerLabel": "Antwoord (extractief, uit citaties)",
  "askSite.retrievalNote":
    "Geen LLM in het standaardpad — BM25 over dezelfde statische index als site search. Embedding-API's zijn niet vereist in productie.",
  "askSite.promptHint": "Probeer een voorbeeldvraag hierboven, of typ je eigen vraag. Elke zin moet terug te leiden zijn naar een citatie hieronder.",
  "askSite.citations": "Citaties",
  "askSite.example1": "Wat is de harness in agentische systemen?",
  "askSite.example2": "Hoe verschilt cosinusgelijkheid van afstand?",
  "askSite.example3": "Welke beslissingen staan gelogd voor beyond autocomplete?",

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
  "log.from": "Ut:",
  "log.viewCaseStudy": "Case study besjen",
  "log.copyHash": "kopiearje",
  "log.copied": "kopiearre",

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

  "leadershipNote.label": "Leadership-notysje",

  "warRoom.simulatedBadge": "Simulearre ynsidint — gjin live systemen, gjin agents, allinnich client state.",
  "warRoom.incident.id": "INC-2847",
  "warRoom.incident.severity": "SEV-2 · checkout-webhooks",
  "warRoom.incident.summary":
    "Flaterpercentaach op payment-webhook-handler stie 14× nei deploy ac9f2. Winkelweinen rûne ôf mar settlement-events bliuwe hangjen. Noch gjin dataferlies meld.",
  "warRoom.prompt": "Trije responders binne it net iens. Dyn beslissing.",
  "warRoom.agent.alpha.name": "Agent α · scale",
  "warRoom.agent.alpha.fix":
    "Ferdubbelje HPA-max foar webhook-workers en leegje de fêstsitten partition — throughput earst, root cause letter.",
  "warRoom.agent.beta.name": "Agent β · revert",
  "warRoom.agent.beta.fix": "Rollback ac9f2 no — null-guard op idempotency key kloppet net by retries.",
  "warRoom.agent.gamma.name": "Agent γ · blend",
  "warRoom.agent.gamma.fix":
    "Hybride: guard weromdraaie, opnij deploye efter 5% shadow-validator, oars normaal ferkear.",
  "warRoom.action.merge": "Foarstellen gearfoegje",
  "warRoom.action.escalate": "Eskalearje nei minsken",
  "warRoom.action.rollback": "Deploy rollback",
  "warRoom.outcome.merge.title": "Resultaat · kombinearre mitigaasjes",
  "warRoom.outcome.merge.body":
    "Shadow-validator fangt dûbele keys op 5% ferkear wylst revert de ferkearde guard fuorthellet. Flaterpercentaach saket yn fyftjin minuten; folsleine postmortem folget.",
  "warRoom.outcome.merge.leadership":
    "As automatisearring it net iens is, wint synthese boppe in favorite — mits jo neame wa't it resterende risiko draacht oant de postmortem.",
  "warRoom.outcome.escalate.title": "Resultaat · automatisearring pause",
  "warRoom.outcome.escalate.body":
    "Agents bevroren by foarstelfaze. Incident commander op bridge; on-call leecht settlement-queue mei de hân. Gjin deploy of scale oant minsken aligned binne.",
  "warRoom.outcome.escalate.leadership":
    "Eskalearje is gjin mislearring — it is de guardrail dy't foarkomt dat snelheid it oardiel foarby rint as de blast radius noch vaach is.",
  "warRoom.outcome.rollback.title": "Resultaat · deploy weromdraaid",
  "warRoom.outcome.rollback.body":
    "ac9f2 yn fjouwer minuten weromdraaid. Webhooks grien; retry-backlog 's nachts fuort. Forward fix opnij pland mei echte staging-dekking.",
  "warRoom.outcome.rollback.leadership":
    "Omkeerbere setten binne leadership-yngripen — earst rollback as wisheid leech is en elke minút ambiguïteit klantfertrouwen kostet.",
  "warRoom.replay": "Op 'e nij",

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

  "contextGraph.simulated": "Simulearre · gjin live API's",
  "contextGraph.toggleConnected": "Kontekstlaach: ferbûn",
  "contextGraph.toggleBroken": "Kontekstlaach: stikken",
  "contextGraph.statusConnected":
    "Ien byld — GitHub, Linear en Sentry voedzje deselde hub foardat de agintsesje rint.",
  "contextGraph.statusBroken": "Trije silo's — elke sesje bouwt partiele kontekst opnij op.",
  "contextGraph.node.github": "GitHub",
  "contextGraph.node.linear": "Linear",
  "contextGraph.node.sentry": "Sentry",
  "contextGraph.node.contextLayer": "Kontekstlaach",
  "contextGraph.node.agentSession": "Agintsesje",
  "contextGraph.hint": "Skakel de laach om ferbinings of fragmentaasje te sjen.",
  "contextGraph.ariaSummary":
    "Diagram fan GitHub, Linear en Sentry fia in dielde kontekstlaach nei in agintsesje.",

  "builder.simulatedBadge": "Simulearre run — gjin netwurk, gjin live API's.",
  "builder.toolsHeading": "Arken ynskeakele",
  "builder.tool.issueReader": "Issue-lêzer",
  "builder.tool.prOpener": "PR-opener",
  "builder.tool.paymentApi": "Betellings-API",
  "builder.tierHeading": "Autonomynivo",
  "builder.tier.readOnly": "Allinnich-lêze",
  "builder.tier.propose": "Foarstelle",
  "builder.tier.gatedAutomatic": "Automatysk ûnder kontrôle",
  "builder.scenarioHeading": "Senario",
  "builder.scenario.readIssue": "Issue #142 lêze",
  "builder.scenario.openPr": "Pull request iepenje",
  "builder.scenario.paymentApi": "Betellings-API oproppe",
  "builder.run": "Senario útfiere",
  "builder.logHeading": "Harness-log",
  "builder.logEmpty": "Kies ark, nivo en senario — run dêrnei.",
  "builder.outcome.success": "SLAGGE",
  "builder.outcome.blocked": "BLOCKEARRE",
  "builder.outcome.awaiting": "WACHT OP MINSKE",
  "builder.log.harnessStart": "harness: senario akseptearre (simulearre)",
  "builder.log.contextLoaded": "kontekst: GitHub + Linear snapshot laden",
  "builder.log.toolIssueReaderMissing": "ark: issue-lêzer út — oanfraach net mooglik",
  "builder.log.toolPrOpenerMissing": "ark: PR-opener út — oanfraach net mooglik",
  "builder.log.toolPaymentMissing": "ark: betellings-API út — oanfraach net mooglik",
  "builder.log.haltTools": "lus: stoppe by ark-laach",
  "builder.log.tierAllowsRead": "rjochten: nivo stiet allinnich-lêze ta",
  "builder.log.permIssueReadPass": "rjochten: issue #142 lêze goedkard",
  "builder.log.toolIssueReaderCall": "ark: issue_reader → GET /issues/142",
  "builder.log.loopIdle": "lus: model stop — gjin mear ark-oanropen",
  "builder.log.doneReadIssue": "resultaat: issue-body wer yn kontekst",
  "builder.log.tierReadOnlyWrite": "rjochten: allinnich-lêze — skriftools wegere",
  "builder.log.permPrDenied": "rjochten: pr_opener wegere (skriuwe)",
  "builder.log.haltPermissions": "lus: stoppe by rjochtenpoort",
  "builder.log.tierProposeWrite": "rjochten: foarstelnivo — koncepten tastien",
  "builder.log.permPrDraftOnly": "rjochten: pr_opener beperke ta koncept + label",
  "builder.log.toolPrOpenerCall": "ark: pr_opener → POST /pulls (draft=true)",
  "builder.log.prDraftCreated": "omjouwing: koncept-PR #891 op branch cursor/fix-142",
  "builder.log.awaitingHuman": "harness: wacht op minsklike review foardat merge",
  "builder.log.tierPaymentInsufficient": "rjochten: nivo te leech foar automatyske betelling",
  "builder.log.permPaymentDenied": "rjochten: payment_api wegere — eskalearje nei minske",
  "builder.log.tierGatedPayment": "rjochten: automatysk ûnder kontrôle — betelling iepen",
  "builder.log.permPaymentPass": "rjochten: payment_api tastien binnen CI-grinzen",
  "builder.log.evalGatePass": "eval: regressypoort slagge (fixture replay)",
  "builder.log.toolPaymentCall": "ark: payment_api → POST /charges (idempotente kaai)",
  "builder.log.auditLogged": "audit: charge-intent logge, omkearber finster 15 min",
  "builder.log.donePayment": "resultaat: betelling simulearre — gjin jild ferpleatst",


  "vectorSearch.rankCosine": "Kosinus",
  "vectorSearch.rankDistance": "Ofstân",
  "vectorSearch.hint": "Sleep om te draaien.",
  "vectorSearch.caption":
    "Kosinus mjit allinnich de hoeke ta de fraach — grutte docht der net ta. Ofstân mjit de wiere posysje. Deselde fiif punten, in oare winner ôfhinklik fan wat men freget.",
  "vectorSearch.query": "Fraach",
  "vectorSearch.picked": "keazen",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "ofst.",

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
  "askSite.governanceTitle": "Governance (bewust sichtber)",
  "askSite.tierBadge": "Autonomienivo: allinnich lêze",
  "askSite.webBadge": "Web: út",
  "askSite.toolsBadge": "Ark: gjin",
  "askSite.governanceBody":
    "Dizze assistent lêst allinnich de foarôfboude site-yndeks — work, lab, readme en beslissingslog. Gjin browsen, gjin API's, gjin feroarings. It tier-badge is it produktkontrakt, gjin lytse print.",
  "askSite.placeholder": "Freegje oer in case study, harness of beslissing op dizze site…",
  "askSite.ask": "Freegje",
  "askSite.loading": "Yndeks trochsykje…",
  "askSite.noResults": "Neat yn de yndeks komt oerien — probearje oare wurden of iepenje Sykje (⌘K).",
  "askSite.answerLabel": "Antwurd (extractyf, út sitaten)",
  "askSite.retrievalNote":
    "Gjin LLM yn it standertpaad — BM25 oer deselde statyske yndeks as site search. Embedding-API's binne net fereaske yn produksje.",
  "askSite.promptHint": "Probean in foarbyldfreechje hjirboppe, of typ dyn eigen. Elke sin moat werom te lêzen wêze nei in sitaat hjirûnder.",
  "askSite.citations": "Sitaten",
  "askSite.example1": "Wat is de harness yn agentyske systemen?",
  "askSite.example2": "Hoe ferskilt cosinus-oerienkomst fan ôfstân?",
  "askSite.example3": "Hokker beslissingen binne logge foar beyond autocomplete?",

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
  "log.from": "Из:",
  "log.viewCaseStudy": "Открыть кейс",
  "log.copyHash": "копировать",
  "log.copied": "скопировано",

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

  "leadershipNote.label": "Заметка для лидерства",

  "warRoom.simulatedBadge": "Симулированный инцидент — без live-систем, без агентов, только состояние клиента.",
  "warRoom.incident.id": "INC-2847",
  "warRoom.incident.severity": "SEV-2 · checkout webhooks",
  "warRoom.incident.summary":
    "Частота ошибок обработчика payment webhook выросла в 14 раз после деплоя ac9f2. Корзины завершаются, но события settlement зависают. Потери данных пока не зафиксированы.",
  "warRoom.prompt": "Три ответчика не согласны. Решение за вами.",
  "warRoom.agent.alpha.name": "Agent α · scale",
  "warRoom.agent.alpha.fix":
    "Удвоить max HPA для webhook workers и осушить застрявшую partition — сначала пропускная способность, root cause потом.",
  "warRoom.agent.beta.name": "Agent β · revert",
  "warRoom.agent.beta.fix": "Rollback ac9f2 сейчас — null guard на idempotency key неверен при retries.",
  "warRoom.agent.gamma.name": "Agent γ · blend",
  "warRoom.agent.gamma.fix":
    "Гибрид: откат guard, redeploy за shadow-validator на 5% трафика, остальной трафик без изменений.",
  "warRoom.action.merge": "Объединить предложения",
  "warRoom.action.escalate": "Эскалировать людям",
  "warRoom.action.rollback": "Откатить деплой",
  "warRoom.outcome.merge.title": "Исход · комбинированные меры",
  "warRoom.outcome.merge.body":
    "Shadow-validator ловит дубликаты ключей на 5% трафика, пока revert убирает плохой guard. Ошибки падают за пятнадцать минут; полный postmortem позже.",
  "warRoom.outcome.merge.leadership":
    "Когда автоматизация спорит, синтез лучше любимчика — если назначить, кто несёт остаточный риск до postmortem.",
  "warRoom.outcome.escalate.title": "Исход · автоматизация на паузе",
  "warRoom.outcome.escalate.body":
    "Агенты заморожены на стадии предложений. Incident commander на bridge; on-call вручную разгребает очередь settlement. Ни deploy, ни scale, пока люди не согласуются.",
  "warRoom.outcome.escalate.leadership":
    "Эскалация — не провал, а предохранитель, когда радиус поражения ещё размыт и скорость обгоняет суждение.",
  "warRoom.outcome.rollback.title": "Исход · деплой откатан",
  "warRoom.outcome.rollback.body":
    "ac9f2 откатан за четыре минуты. Webhooks зелёные; backlog retries сходит за ночь. Forward fix перенесён с нормальным staging.",
  "warRoom.outcome.rollback.leadership":
    "Обратимые шаги — инфраструктура лидерства: сначала rollback, когда уверенность низкая, а каждая минута неясности бьёт по доверию клиентов.",
  "warRoom.replay": "Снова",

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

  "contextGraph.simulated": "Симуляция · без живых API",
  "contextGraph.toggleConnected": "Слой контекста: подключён",
  "contextGraph.toggleBroken": "Слой контекста: разорван",
  "contextGraph.statusConnected":
    "Одна картина — GitHub, Linear и Sentry питают один хаб до запуска сессии агента.",
  "contextGraph.statusBroken": "Три изолированных источника — каждая сессия заново собирает частичный контекст.",
  "contextGraph.node.github": "GitHub",
  "contextGraph.node.linear": "Linear",
  "contextGraph.node.sentry": "Sentry",
  "contextGraph.node.contextLayer": "Слой контекста",
  "contextGraph.node.agentSession": "Сессия агента",
  "contextGraph.hint": "Переключите слой, чтобы увидеть связи или фрагментацию.",
  "contextGraph.ariaSummary":
    "Схема GitHub, Linear и Sentry через общий слой контекста к сессии агента.",

  "builder.simulatedBadge": "Симуляция — без сети и живых API.",
  "builder.toolsHeading": "Включённые инструменты",
  "builder.tool.issueReader": "Чтение issue",
  "builder.tool.prOpener": "Открытие PR",
  "builder.tool.paymentApi": "Платёжный API",
  "builder.tierHeading": "Уровень автономии",
  "builder.tier.readOnly": "Только чтение",
  "builder.tier.propose": "Предложение",
  "builder.tier.gatedAutomatic": "Автоматика под контролем",
  "builder.scenarioHeading": "Сценарий",
  "builder.scenario.readIssue": "Прочитать issue #142",
  "builder.scenario.openPr": "Открыть pull request",
  "builder.scenario.paymentApi": "Вызвать платёжный API",
  "builder.run": "Запустить сценарий",
  "builder.logHeading": "Журнал harness",
  "builder.logEmpty": "Выберите инструменты, уровень и сценарий — затем запустите.",
  "builder.outcome.success": "УСПЕХ",
  "builder.outcome.blocked": "ЗАБЛОКИРОВАНО",
  "builder.outcome.awaiting": "ОЖИДАНИЕ ЧЕЛОВЕКА",
  "builder.log.harnessStart": "harness: сценарий принят (симуляция)",
  "builder.log.contextLoaded": "context: снимок GitHub + Linear загружен",
  "builder.log.toolIssueReaderMissing": "tools: чтение issue выключено — запрос невозможен",
  "builder.log.toolPrOpenerMissing": "tools: открытие PR выключено — запрос невозможен",
  "builder.log.toolPaymentMissing": "tools: платёжный API выключен — запрос невозможен",
  "builder.log.haltTools": "loop: остановка на слое tools",
  "builder.log.tierAllowsRead": "permissions: уровень разрешает только чтение",
  "builder.log.permIssueReadPass": "permissions: чтение issue #142 одобрено",
  "builder.log.toolIssueReaderCall": "tools: issue_reader → GET /issues/142",
  "builder.log.loopIdle": "loop: модель остановилась — больше вызовов инструментов нет",
  "builder.log.doneReadIssue": "result: тело issue возвращено в context",
  "builder.log.tierReadOnlyWrite": "permissions: только чтение — запись запрещена",
  "builder.log.permPrDenied": "permissions: pr_opener отклонён (запись)",
  "builder.log.haltPermissions": "loop: остановка на gate permissions",
  "builder.log.tierProposeWrite": "permissions: уровень propose — черновики разрешены",
  "builder.log.permPrDraftOnly": "permissions: pr_opener ограничен черновиком + label",
  "builder.log.toolPrOpenerCall": "tools: pr_opener → POST /pulls (draft=true)",
  "builder.log.prDraftCreated": "environment: черновик PR #891 на ветке cursor/fix-142",
  "builder.log.awaitingHuman": "harness: ожидание человеческого review перед merge",
  "builder.log.tierPaymentInsufficient": "permissions: уровень недостаточен для автоматического платежа",
  "builder.log.permPaymentDenied": "permissions: payment_api отклонён — эскалация человеку",
  "builder.log.tierGatedPayment": "permissions: автоматика под контролем — платёжный namespace открыт",
  "builder.log.permPaymentPass": "permissions: payment_api разрешён в пределах CI",
  "builder.log.evalGatePass": "eval: регрессионный gate пройден (fixture replay)",
  "builder.log.toolPaymentCall": "tools: payment_api → POST /charges (идемпотентный ключ)",
  "builder.log.auditLogged": "audit: намерение списания залогировано, окно отмены 15 мин",
  "builder.log.donePayment": "result: платёж симулирован — средства не двигались",


  "vectorSearch.rankCosine": "Косинус",
  "vectorSearch.rankDistance": "Расстояние",
  "vectorSearch.hint": "Перетащите, чтобы вращать.",
  "vectorSearch.caption":
    "Косинус измеряет только угол к запросу — величина не важна. Расстояние измеряет реальное положение. Те же пять точек, разный победитель в зависимости от того, что спрашиваешь.",
  "vectorSearch.query": "Запрос",
  "vectorSearch.picked": "выбран",
  "vectorSearch.cosineLabel": "cos θ",
  "vectorSearch.distanceLabel": "расст.",

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
  "askSite.governanceTitle": "Управление (намеренно на виду)",
  "askSite.tierBadge": "Уровень автономии: только чтение",
  "askSite.webBadge": "Web: выкл.",
  "askSite.toolsBadge": "Инструменты: нет",
  "askSite.governanceBody":
    "Этот помощник читает только заранее собранный индекс сайта — work, lab, readme и журнал решений. Не может ходить в сеть, вызывать API или что-то менять. Бейдж уровня — это продуктовый контракт, а не мелкий шрифт.",
  "askSite.placeholder": "Спросите о кейсе, harness или решении на этом сайте…",
  "askSite.ask": "Спросить",
  "askSite.loading": "Поиск по индексу…",
  "askSite.noResults": "В индексе нет совпадений — попробуйте другие слова или откройте Поиск (⌘K).",
  "askSite.answerLabel": "Ответ (экстрактивный, из цитат)",
  "askSite.retrievalNote":
    "Без LLM в пути по умолчанию — BM25 по тому же статическому индексу, что и поиск сайта. Embedding API для продакшена не требуются.",
  "askSite.promptHint": "Попробуйте пример выше или введите свой вопрос. Каждое предложение должно вести к цитате ниже.",
  "askSite.citations": "Цитаты",
  "askSite.example1": "Что такое harness в агентных системах?",
  "askSite.example2": "Чем косинусное сходство отличается от расстояния?",
  "askSite.example3": "Какие решения залогированы для beyond autocomplete?",

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
