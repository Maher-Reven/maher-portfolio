import clsx from "clsx";
import type { HTMLAttributes } from "react";

/** Bordered panel with corner brackets — the basic HUD container. */
export function HudFrame({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "bracket border border-line bg-[var(--bg-panel)] transition-colors duration-500 hover:border-line-strong",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
