import type { ReactNode } from "react";

// [[ROBBIE: ...]] markers are content Robbie still needs to supply. They show
// as amber boxes in dev (`npm run dev`) and are hidden in production builds,
// along with any section whose only content is a placeholder. Set
// VITE_SHOW_PLACEHOLDERS=true to show them in a production/preview build.
export const SHOW_PLACEHOLDERS =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === "true";

export default function Placeholder({ children }: { children: ReactNode }) {
  if (!SHOW_PLACEHOLDERS) return null;
  return (
    <span className="inline-block rounded-sm border border-dashed border-amber-400/60 bg-amber-400/10 px-1.5 py-0.5 font-mono text-xs text-amber-300">
      {children}
    </span>
  );
}

export function isPlaceholder(text: string | undefined): boolean {
  return !!text && text.includes("[[ROBBIE:");
}

/** True when this text should be rendered (real content, or placeholders are visible). */
export function hasContent(text: string | undefined): boolean {
  return !!text && (!isPlaceholder(text) || SHOW_PLACEHOLDERS);
}

/** Renders plain text, or a Placeholder if the text is a [[ROBBIE: ...]] marker. */
export function Copy({ text }: { text: string }) {
  return isPlaceholder(text) ? <Placeholder>{text}</Placeholder> : <>{text}</>;
}
