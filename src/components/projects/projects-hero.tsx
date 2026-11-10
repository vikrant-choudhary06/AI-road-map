"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  FolderGit2,
  Layers,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { Container } from "@/components/layout";
import { PROJECT_CATALOG_STATS } from "@/data/projects";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";

export function ProjectsHero() {
  const {
    projectCatalogMetrics,
    featuredRecommendedProject,
    continueProjectTarget,
    getProjectProgress,
  } = useRoadmapProgress();

  const featuredMetrics = getProjectProgress(featuredRecommendedProject);
  const featuredPhaseObj = COMPLETE_ROADMAP_PHASES.find(
    (p) => p.phase === featuredRecommendedProject.phase
  );

  const handleScrollToCatalog = () => {
    const el = document.getElementById("project-catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-surface-soft/55 via-background to-background pt-10 pb-12 sm:pt-14 sm:pb-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Core Hero Copy, CTAs & Dataset Metrics */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="terracotta">
                Hands-On AI &amp; LLM Engineering Platform
              </Badge>
              <Badge variant="outline">
                {PROJECT_CATALOG_STATS.totalProjects} Primary Milestones · Phases 0–8
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.12]">
                Learn by Building. Master AI from the Inside.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
                Every major phase of the AI Roadmap ends with a real
                engineering project. Build mathematical engines, neural
                networks, tokenizers, attention mechanisms, and your own
                GPT-style language model from scratch.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                onClick={handleScrollToCatalog}
                className="gap-2"
              >
                <Compass className="h-4 w-4" />
                Explore Projects
                <ArrowDown className="h-4 w-4" />
              </Button>

              <Link
                href={`/projects/${continueProjectTarget.project.slug}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface-elevated px-5 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-soft"
              >
                <Code2 className="h-4 w-4 text-accent-terracotta" />
                <span>Continue My Project</span>
                <span className="rounded-md bg-surface-soft px-2 py-0.5 font-mono text-xs text-foreground-secondary">
                  #{continueProjectTarget.project.milestoneNumber}{" "}
                  {continueProjectTarget.isInProgress
                    ? `(${continueProjectTarget.metrics.percent}%)`
                    : ""}
                </span>
                <ArrowRight className="h-4 w-4 text-foreground-muted" />
              </Link>
            </div>

            {/* Dataset-Derived & Live Progress Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              <div className="rounded-xl border border-border/80 bg-surface-elevated/90 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted">
                  <Code2 className="h-3.5 w-3.5 text-accent-terracotta" />
                  <span>Primary Projects</span>
                </div>
                <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
                  {PROJECT_CATALOG_STATS.totalProjects}
                </p>
                <p className="mt-0.5 text-xs text-foreground-secondary">
                  {projectCatalogMetrics.completedCount} completed ·{" "}
                  {projectCatalogMetrics.inProgressCount} active
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-elevated/90 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted">
                  <Layers className="h-3.5 w-3.5 text-foreground-secondary" />
                  <span>Learning Phases</span>
                </div>
                <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
                  {PROJECT_CATALOG_STATS.totalPhasesCovered}
                </p>
                <p className="mt-0.5 text-xs text-foreground-secondary">
                  Phase 0 through Phase 8
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-elevated/90 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted">
                  <ListChecks className="h-3.5 w-3.5 text-accent-terracotta" />
                  <span>Engineering Tasks</span>
                </div>
                <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
                  {PROJECT_CATALOG_STATS.totalTasks}
                </p>
                <p className="mt-0.5 text-xs text-foreground-secondary">
                  {projectCatalogMetrics.completedTasksCount} steps checked (
                  {projectCatalogMetrics.overallTaskPercent}%)
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface-elevated/90 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted">
                  <FolderGit2 className="h-3.5 w-3.5 text-foreground-secondary" />
                  <span>Linked GitHub Repos</span>
                </div>
                <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
                  {projectCatalogMetrics.linkedReposCount}
                </p>
                <p className="mt-0.5 text-xs text-foreground-secondary">
                  Self-reported builds
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Recommended Project Card */}
          <div className="lg:col-span-5">
            <Card
              variant="default"
              padding="lg"
              className="relative space-y-4 border-border-strong/80"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-sage/55 px-3 py-1 text-xs font-semibold text-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent-terracotta" />
                  <span>Recommended Next Build</span>
                </div>
                <Badge variant="outline">
                  Milestone #{featuredRecommendedProject.milestoneNumber} · Phase{" "}
                  {featuredRecommendedProject.phase}
                </Badge>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/projects/${featuredRecommendedProject.slug}`}
                  className="group block"
                >
                  <h2 className="font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-accent-terracotta">
                    {featuredRecommendedProject.title}
                  </h2>
                </Link>
                <p className="text-sm leading-relaxed text-foreground-secondary">
                  {featuredRecommendedProject.shortDescription}
                </p>
              </div>

              {featuredPhaseObj && (
                <div className="rounded-xl border border-border/70 bg-surface-soft/55 px-3.5 py-2.5 text-xs text-foreground-secondary">
                  <span className="font-semibold text-foreground">
                    Why Recommended Now:{" "}
                  </span>
                  Aligned with your current curriculum focus in{" "}
                  <Link
                    href={`/roadmap#${featuredPhaseObj.slug}`}
                    className="font-medium text-accent-terracotta underline-offset-2 hover:underline"
                  >
                    Phase {featuredPhaseObj.phase}: {featuredPhaseObj.title}
                  </Link>
                  .
                </div>
              )}

              {/* Technologies & Effort */}
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="muted">
                  {featuredRecommendedProject.difficultyFilter}
                </Badge>
                <Badge variant="outline">
                  {featuredRecommendedProject.estimatedEffort}
                </Badge>
                <Badge variant="outline">
                  {featuredRecommendedProject.tasks.length} implementation steps
                </Badge>
                {featuredRecommendedProject.technologies
                  .slice(0, 3)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/70 bg-background px-2 py-0.5 font-mono text-[11px] text-foreground-secondary"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              {/* Progress bar for Featured Project */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground-secondary">
                    Task Checklist Progress
                  </span>
                  <span className="font-mono font-semibold text-foreground">
                    {featuredMetrics.completedTaskCount} /{" "}
                    {featuredMetrics.totalTaskCount} steps (
                    {featuredMetrics.percent}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-soft">
                  <div
                    className="h-full rounded-full bg-accent-terracotta transition-all duration-300"
                    style={{ width: `${featuredMetrics.percent}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-foreground-secondary">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-terracotta" />
                  <span>
                    Status:{" "}
                    <strong className="text-foreground">
                      {featuredMetrics.status === "completed"
                        ? "Completed"
                        : featuredMetrics.status === "in_progress"
                          ? "In Progress"
                          : "Not Started"}
                    </strong>
                  </span>
                </div>

                <Link
                  href={`/projects/${featuredRecommendedProject.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
                >
                  <span>
                    {featuredMetrics.status === "in_progress"
                      ? "Continue Building"
                      : "Start Project Guide"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
