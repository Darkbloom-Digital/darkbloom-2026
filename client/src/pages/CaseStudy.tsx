import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/ProjectCard";
import NotFound from "@/pages/not-found";
import { Copy, isPlaceholder } from "@/components/Placeholder";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote as QuoteIcon } from "lucide-react";
import { getProject, projects } from "@/data/projects";

function SectionHeading({ children }: { children: string }) {
  return <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3 font-sans">{children}</h2>;
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return <NotFound />;

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-5xl">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-white/50 hover:text-[#e61e50] text-sm transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> All work
          </Link>

          <header className="mb-10">
            <p className="text-[#e61e50] font-mono text-sm uppercase tracking-wider mb-3">Case Study · {project.category}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-5" data-testid="text-casestudy-heading">{project.title}</h1>
            <p className="text-white/60 text-lg max-w-3xl">
              <span className="text-white/40">Client: </span>
              <Copy text={project.client} />
            </p>
          </header>

          <div className="rounded-xl overflow-hidden border border-white/10 aspect-video mb-6 relative bg-black">
            {project.image ? (
              <img src={project.image} alt={`${project.title} website`} className="w-full h-full object-contain" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#e61e50]/40 via-zinc-900 to-black flex flex-col items-center justify-center gap-4">
                <span className="text-5xl md:text-7xl font-heading font-bold text-white/25 tracking-tight">{project.title}</span>
                <Copy text={`[[ROBBIE: ${project.title} screenshot or photo]]`} />
              </div>
            )}
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#e61e50] hover:text-white text-sm font-medium transition-colors mb-16"
            >
              Visit {project.url.replace(/^https?:\/\//, "")} <ArrowUpRight className="w-4 h-4" />
            </a>
          )}

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-10 mt-10">
            <div className="md:col-span-2 space-y-10">
              <section>
                <SectionHeading>The Problem</SectionHeading>
                <p className="text-white/60 leading-relaxed"><Copy text={project.problem} /></p>
              </section>
              <section>
                <SectionHeading>What We Built</SectionHeading>
                <p className="text-white/60 leading-relaxed"><Copy text={project.built} /></p>
              </section>
              <section>
                <SectionHeading>Results</SectionHeading>
                {project.stats && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 border-y border-white/10 py-8 mb-3">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-2xl md:text-3xl font-bold text-[#e61e50] mb-1 tabular-nums">{stat.value}</p>
                        <p className="text-sm text-white/50">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                {project.statsNote && <p className="text-xs text-white/30 mb-6">{project.statsNote}</p>}
                <p className="text-white/60 leading-relaxed"><Copy text={project.results} /></p>
              </section>
            </div>
            {project.highlights && (
              <aside>
                <SectionHeading>Highlights</SectionHeading>
                <ul className="space-y-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e61e50] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>

          {project.quote && (
            <figure className="mt-20 border-t border-white/10 pt-12">
              <QuoteIcon className="w-8 h-8 text-[#e61e50] mb-6" aria-hidden="true" />
              <blockquote className="space-y-5 text-white/80 text-lg md:text-xl leading-relaxed font-light max-w-3xl">
                {project.quote.text.map((para, i) => (
                  <p key={i}>{isPlaceholder(para) ? <Copy text={para} /> : para}</p>
                ))}
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold"><Copy text={project.quote.name} /></p>
                <p className="text-white/50 text-sm"><Copy text={project.quote.role} /></p>
              </figcaption>
            </figure>
          )}

          <div className="text-center mt-24">
            <p className="text-white/60 text-lg mb-6">Want results like these?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
            >
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </article>

        <section className="container mx-auto px-6 max-w-5xl mt-28 border-t border-white/10 pt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">More <span className="text-[#e61e50]">Work</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} showSummary={false} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
