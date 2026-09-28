import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Copy } from "@/components/Placeholder";
import type { Project } from "@/data/projects";

// Grid card that opens the project's case study page.
export default function ProjectCard({ project, showSummary = true }: { project: Project; showSummary?: boolean }) {
  const testId = project.slug;
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block" data-testid={`card-project-${testId}`}>
      <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video border border-white/5 group-hover:border-[#e61e50]/30 transition-all">
        {project.image ? (
          <div
            className="absolute inset-0 transition-all duration-700 scale-[1.5] group-hover:scale-100"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#e61e50]/40 via-zinc-900 to-black flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-heading font-bold text-white/25 tracking-tight">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all duration-500" />
        {project.featured && (
          <span className="absolute top-4 left-4 z-10 bg-[#e61e50] text-white text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-sm">
            Featured
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          <span className="w-12 h-12 rounded-full bg-[#e61e50] flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-white" />
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-1 group-hover:text-[#e61e50] transition-colors">{project.title}</h3>
      <p className="text-white/40 font-mono text-sm uppercase tracking-wider mb-2">{project.category}</p>
      {showSummary && (
        <p className="text-white/60 text-sm leading-relaxed">
          <Copy text={project.summary} />
        </p>
      )}
    </Link>
  );
}
