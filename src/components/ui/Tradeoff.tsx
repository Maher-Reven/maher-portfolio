import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";

type OptionProps = { label: string; children: ReactNode };

/**
 * A single option row inside <Tradeoff>. Rendered by Tradeoff itself, not
 * standalone — MDX (via next-mdx-remote's serialize) strips any JSX attribute
 * that's a JS expression (arrays, objects, numbers), so structured data has to
 * travel as child elements with plain string attributes instead of a prop.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- props are read via option.props in Tradeoff, not through a call here
export function TradeoffOption(_props: OptionProps) {
  return null;
}

export function Tradeoff({
  chosen,
  cost,
  children,
}: {
  chosen: string;
  cost: string;
  children: ReactNode;
}) {
  const options = Children.toArray(children).filter(
    (child): child is ReactElement<OptionProps> => isValidElement(child)
  );

  return (
    <HudFrame className="my-10 p-6 sm:p-8">
      <div className="label mb-4 text-fg-dim">
        <Tr k="tradeoff.options" />
      </div>
      <div className="space-y-4">
        {options.map((option) => {
          const isChosen = option.props.label === chosen;
          return (
            <div
              key={option.props.label}
              className={`border-l-2 pl-4 ${isChosen ? "border-accent" : "border-transparent"}`}
            >
              <div className="mono flex flex-wrap items-center gap-2 text-xs text-fg">
                <span>{option.props.label}</span>
                {isChosen && (
                  <span className="label text-accent">
                    <Tr k="tradeoff.chosen" />
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm leading-relaxed text-fg-muted">{option.props.children}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 border-t border-line pt-6">
        <div className="label mb-2 text-fg-dim">
          <Tr k="tradeoff.cost" />
        </div>
        <div className="text-[1.05em] leading-[1.5] text-fg">{cost}</div>
      </div>
    </HudFrame>
  );
}
