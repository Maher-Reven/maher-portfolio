"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/lib/use-locale";
import type { Locale } from "@/lib/i18n";

/**
 * Picks one of several pre-rendered trees by locale.
 *
 * MDX is compiled on the server and the locale only exists in the browser, so
 * every language is rendered at build time and the active one chosen here. That
 * costs payload — an entry page carries all four translations — which is the
 * trade for switching language without a navigation on a statically exported
 * site.
 */
export function LocaleSwitch({ nodes }: { nodes: Record<Locale, ReactNode> }) {
  const { locale } = useLocale();
  return <>{nodes[locale] ?? nodes.en}</>;
}
