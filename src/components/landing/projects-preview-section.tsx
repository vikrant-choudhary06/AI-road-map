import * as React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Layers, Terminal } from "lucide-react";
import { LANDING_PROJECTS_PREVIEW } from "@/data/landing-content";
import { Section, SectionHeader } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PROJECT_SLUG_BY_PREVIEW_ID: Record<string, string> = {
  "matrix-operations-engine": "matrix-operations-engine",
  "linear-regression-from-scratch": "linear-regression-from-scratch",
  "automatic-differentiation-engine": "automatic-differentiation-engine",
  "neural-network-from-scratch": "neural-network-from-scratch",
  "mini-gpt-architecture": "mini-gpt-architecture",
  "your-own-pretrained-llm": "pretrained-mini-llm",
};

export function ProjectsPreviewSection() {
  const tier1Projects = LANDING_PROJECTS_PREVIEW.filter(
    (p) => p.complexityTier === 1
  );
  const tier2Projects = LANDING_PROJECTS_PREVIEW.filter(
    (p) => p.complexityTier === 2
  );
  const tier3Projects = LANDING_PROJECTS_PREVIEW.filter(
    (p) => p.complexityTier === 3
  );

  return (
    <Section id="projects-preview" spacing="lg" border="bottom">
      <FadeIn>
        <SectionHeader
          eyebrow="Practical Engineering Progression"
          title="Don't Just Learn AI. Build It."
          description="Every theoretical phase culminates in a hands-on implementation project. Progress from writing matrix multiplication in pure Python to pretraining your own language model from random weights."
          actions={
            <Button asChild variant="primary" size="md">
              <Link href="/projects">
                <span>Explore All Projects</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        <div className="flex flex-col gap-8">
          {/* Tier I: Foundational Mathematical & Optimization Projects */}
          <div>
            <div className="mb-3.5 flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <Code2 className="size-4 text-sage-deep" aria-hidden="true" />
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  Tier I · Foundational Mathematical &amp; Optimization Engines
                </h3>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                Phases 1 – 2
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {tier1Projects.map((project) => {
                const slug = PROJECT_SLUG_BY_PREVIEW_ID[project.id] ?? project.id;
                return (
                  <Card
                    key={project.id}
                    variant="default"
                    padding="md"
                    className="justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="phase">{project.phaseLabel}</Badge>
                        <Badge variant="sage">{project.difficultyLabel}</Badge>
                      </div>

                      <div className="mt-3 flex items-baseline gap-2.5">
                        <span className="font-mono text-xs font-semibold text-terracotta">
                          {project.number}
                        </span>
                        <h4 className="text-lg font-semibold tracking-tight text-foreground">
                          <Link
                            href={`/projects/${slug}`}
                            className="transition-colors hover:text-terracotta"
                          >
                            {project.title}
                          </Link>
                        </h4>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.learningObjective}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-border pt-3.5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {project.architectureNote}
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <Link
                          href={`/projects/${slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-terracotta hover:underline"
                        >
                          <span>Open Project Guide</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Tier II: Deep Learning & Autodiff Internals */}
          <div>
            <div className="mb-3.5 flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-terracotta" aria-hidden="true" />
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  Tier II · Computational Graphs &amp; Deep Learning Internals
                </h3>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                Phase 3
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {tier2Projects.map((project) => {
                const slug = PROJECT_SLUG_BY_PREVIEW_ID[project.id] ?? project.id;
                return (
                  <Card
                    key={project.id}
                    variant="sage"
                    padding="md"
                    className="justify-between border-sage-muted/70"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="phase">{project.phaseLabel}</Badge>
                        <Badge variant="outline" className="bg-card">
                          {project.difficultyLabel}
                        </Badge>
                      </div>

                      <div className="mt-3 flex items-baseline gap-2.5">
                        <span className="font-mono text-xs font-semibold text-sage-deep">
                          {project.number}
                        </span>
                        <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                          <Link
                            href={`/projects/${slug}`}
                            className="transition-colors hover:text-terracotta"
                          >
                            {project.title}
                          </Link>
                        </h4>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.learningObjective}
                      </p>
                    </div>

                    <div className="mt-5 rounded-lg border border-border bg-card/85 p-3 flex flex-col gap-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-[11px] font-medium text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-2 border-t border-border/70 pt-2">
                        <p className="font-mono text-[11px] text-sage-deep">
                          {project.architectureNote}
                        </p>
                        <Link
                          href={`/projects/${slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-terracotta hover:underline"
                        >
                          <span>Guide</span>
                          <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Tier III: Capstone Transformer & Pretrained LLM */}
          <div>
            <div className="mb-3.5 flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-2">
                <Cpu
                  className="size-4 text-terracotta-strong"
                  aria-hidden="true"
                />
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                  Tier III · Transformer Architecture &amp; LLM Pretraining Capstones
                </h3>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                Phases 5 – 6
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {tier3Projects.map((project) => {
                const slug = PROJECT_SLUG_BY_PREVIEW_ID[project.id] ?? project.id;
                return (
                  <Card
                    key={project.id}
                    variant="terracotta"
                    padding="lg"
                    className="border-terracotta/45 shadow-xs"
                  >
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                      <div className="lg:col-span-8">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="terracotta">
                            {project.number} · {project.difficultyLabel}
                          </Badge>
                          <Badge variant="phase">{project.phaseLabel}</Badge>
                        </div>

                        <h4 className="mt-3 font-display text-2xl sm:text-3xl font-normal text-foreground">
                          <Link
                            href={`/projects/${slug}`}
                            className="transition-colors hover:text-terracotta"
                          >
                            {project.title}
                          </Link>
                        </h4>
                        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl">
                          {project.learningObjective}
                        </p>

                        <div className="mt-4">
                          <Link
                            href={`/projects/${slug}`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface-soft"
                          >
                            <span>Open Milestone Guide &amp; Code</span>
                            <ArrowRight className="size-3.5 text-terracotta" />
                          </Link>
                        </div>
                      </div>

                      <div className="lg:col-span-4 rounded-xl border border-border-strong bg-card p-4">
                        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          <Terminal
                            className="size-3.5 text-terracotta"
                            aria-hidden="true"
                          />
                          <span>Primary Stack &amp; Spec</span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs font-medium text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <p className="mt-3 border-t border-border pt-2.5 font-mono text-[11px] text-terracotta-strong">
                          {project.architectureNote}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Note */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-muted/55 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-foreground">
              6 Featured Builds Shown · 14 Complete Projects Across All 9 Phases
            </p>
            <p className="text-xs text-muted-foreground">
              Explore the complete 14-project engineering platform with
              interactive checklists, code examples, testing suites, personal
              notes, and GitHub repository portfolio tracking.
            </p>
          </div>
          <Button asChild variant="outline" size="md">
            <Link href="/projects">
              <span>Explore All 14 Projects</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}
