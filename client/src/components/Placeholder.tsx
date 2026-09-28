import type { ReactNode } from "react";

// Visibly marks content Robbie still needs to supply. Search the codebase for
// "[[ROBBIE:" to find every one; none should ship to production.
export default function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-sm border border-dashed border-amber-400/60 bg-amber-400/10 px-1.5 py-0.5 font-mono text-xs text-amber-300">
      {children}
    </span>
  );
}
