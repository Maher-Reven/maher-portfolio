export type Theme = "dark" | "light";

export const THEME_KEY = "mk-theme";

/**
 * Runs synchronously as the first thing in <body>, before the browser paints,
 * so the right palette is on <html> from the very first frame. A theme applied
 * in an effect instead would flash the wrong one on every single load.
 *
 * Dark is the default rather than the system preference: the dark HUD look is
 * the site's identity, and light is opt-in.
 *
 * This module holds constants only — no React import — because the root layout
 * is a server component, and importing anything that touches hooks from there
 * is a build error even when the import itself is just a string.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");document.documentElement.dataset.theme=(t==="light")?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;
