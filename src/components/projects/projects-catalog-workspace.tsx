"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Filter,
  FolderGit2,
  RotateCcw,
  Search,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { Container } from "@/components/layout";
import {
  ALL_CURRICULUM_PROJECTS,
  PROJECT_CATALOG_STATS,
} from "@/data/projects";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import type {
  PhaseNumber,
  ProgressState,
  ProjectDifficultyCategory,
} from "@/types";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";
import { ProjectsHero } from "./projects-hero";
import { ProjectCard } from "./project-card";

type ProjectSortOption =
  | "recommended"
  | "difficulty"
  | "phase"
  | "alphabetical"
  | "recent";

const DIFFICULTY_RANK: Record<ProjectDifficultyCategory, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Research: 4,
};

const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Understand Concept",
    detail: "Review the architectural goal and mathematical formulation.",
  },
  {
    step: 2,
    title: "Review Prerequisites",
    detail: "Verify linked roadmap modules and required math concepts.",
  },
  {
    step: 3,
    title: "Set Up Environment",
    detail: "Create a clean Python/PyTorch project structure and test runner.",
  },
  {
    step: 4,
    title: "Implement Step by Step",
    detail: "Follow each staged engineering task from core primitives upward.",
  },
  {
    step: 5,
    title: "Test Implementation",
    detail: "Run numerical gradient checks, shape assertions, and unit tests.",
  },
  {
    step: 6,
    title: "Document & Push to GitHub",
    detail: "Publish clean code, plots, and a README to your repository.",
  },
  {
    step: 7,
    title: "Mark Tasks Complete",
    detail: "Check off each verified implementation task as it passes tests.",
  },
  {
    step: 8,
    title: "Complete Milestone",
    detail: "Confirm project completion and unlock your curriculum milestone.",
  },
] as const;

export function ProjectsCatalogWorkspace() {
  const {
    getProjectProgress,
    toggleProjectBookmark,
    featuredRecommendedProject,
    projectCatalogMetrics,
  } = useRoadmapProgress();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<PhaseNumber | "all">(
    "all"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    ProjectDifficultyCategory | "all"
  >("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<ProgressState | "all">(
    "all"
  );
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<ProjectSortOption>("recommended");

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedPhase !== "all" ||
    selectedDifficulty !== "all" ||
    selectedTech !== "all" ||
    selectedStatus !== "all" ||
    bookmarkedOnly ||
    sortBy !== "recommended";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedPhase("all");
    setSelectedDifficulty("all");
    setSelectedTech("all");
    setSelectedStatus("all");
    setBookmarkedOnly(false);
    setSortBy("recommended");
  };

  const filteredAndSortedProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matching = ALL_CURRICULUM_PROJECTS.filter((project) => {
      const metrics = getProjectProgress(project);

      if (selectedPhase !== "all" && project.phase !== selectedPhase) {
        return false;
      }

      if (
        selectedDifficulty !== "all" &&
        project.difficultyFilter !== selectedDifficulty
      ) {
        return false;
      }

      if (
        selectedTech !== "all" &&
        !project.technologies.includes(selectedTech)
      ) {
        return false;
      }

      if (selectedStatus !== "all" && metrics.status !== selectedStatus) {
        return false;
      }

      if (bookmarkedOnly && !metrics.isBookmarked) {
        return false;
      }

      if (query) {
        const phaseTitle =
          COMPLETE_ROADMAP_PHASES.find((p) => p.phase === project.phase)
            ?.title ?? "";
        const searchableText = [
          project.title,
          project.subtitle,
          project.shortDescription,
          `phase ${project.phase}`,
          phaseTitle,
          project.difficultyFilter,
          ...project.technologies,
          ...project.skillsPracticed,
          ...project.requiredMathConcepts,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    const sorted = [...matching].sort((a, b) => {
      if (sortBy === "recommended") {
        return a.milestoneNumber - b.milestoneNumber;
      }
      if (sortBy === "phase") {
        if (a.phase !== b.phase) return a.phase - b.phase;
        return a.milestoneNumber - b.milestoneNumber;
      }
      if (sortBy === "difficulty") {
        const diffA = DIFFICULTY_RANK[a.difficultyFilter];
        const diffB = DIFFICULTY_RANK[b.difficultyFilter];
        if (diffA !== diffB) return diffA - diffB;
        return a.milestoneNumber - b.milestoneNumber;
      }
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "recent") {
        const timeA = getProjectProgress(a).updatedAtIso ?? "";
        const timeB = getProjectProgress(b).updatedAtIso ?? "";
        if (timeA !== timeB) return timeB.localeCompare(timeA);
        return a.milestoneNumber - b.milestoneNumber;
      }
      return a.milestoneNumber - b.milestoneNumber;
    });

    return sorted;
  }, [
    bookmarkedOnly,
    getProjectProgress,
    searchQuery,
    selectedDifficulty,
    selectedPhase,
    selectedStatus,
    selectedTech,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Hero Section */}
      <ProjectsHero />

      {/* 2. 8-Step Engineering Workflow Strip */}
      <section className="border-b border-border/70 bg-surface-soft/35 py-8">
        <Container>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-accent-terracotta" />
              <h2 className="font-serif text-lg font-semibold text-foreground">
                8-Step Hands-On Engineering Workflow
              </h2>
            </div>
            <p className="text-xs text-foreground-secondary">
              Every project follows a structured from-scratch implementation
              methodology
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-xl border border-border/75 bg-surface-elevated/85 p-3"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-sage/65 font-mono text-xs font-semibold text-foreground">
                  {item.step}
                </span>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-foreground-secondary">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Interactive Project Catalog */}
      <section id="project-catalog" className="scroll-mt-20 pt-10 sm:pt-12">
        <Container className="space-y-7">
          {/* Catalog Header & Quick Status Summary */}
          <div className="flex flex-col justify-between gap-4 border-b border-border/70 pb-5 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Complete Curriculum Catalog</Badge>
                <span className="font-mono text-xs text-foreground-muted">
                  Showing {filteredAndSortedProjects.length} of{" "}
                  {ALL_CURRICULUM_PROJECTS.length} projects
                </span>
              </div>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                14 From-Scratch AI &amp; LLM Projects
              </h2>
            </div>

            {/* Status Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  {
                    value: "all",
                    label: `All (${projectCatalogMetrics.totalProjectsCount})`,
                  },
                  {
                    value: "not_started",
                    label: `Not Started (${projectCatalogMetrics.notStartedCount})`,
                  },
                  {
                    value: "in_progress",
                    label: `In Progress (${projectCatalogMetrics.inProgressCount})`,
                  },
                  {
                    value: "completed",
                    label: `Completed (${projectCatalogMetrics.completedCount})`,
                  },
                ] as const
              ).map((pill) => {
                const active = selectedStatus === pill.value;
                return (
                  <button
                    key={pill.value}
                    type="button"
                    onClick={() => setSelectedStatus(pill.value)}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-surface-elevated text-foreground-secondary hover:bg-surface-soft hover:text-foreground"
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search, Phase, Difficulty, Tech, Bookmarked & Sort Controls */}
          <Card variant="muted" padding="md" className="space-y-4">
            <div className="grid gap-3 md:grid-cols-12">
              {/* Search Box */}
              <div className="relative md:col-span-5">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by project title, math concept, PyTorch, BPE, KV-cache..."
                  aria-label="Search projects"
                  className="h-10 w-full rounded-xl border border-border bg-background pr-9 pl-10 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent-terracotta focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search query"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-foreground-muted hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Difficulty Select */}
              <div className="md:col-span-2">
                <select
                  value={selectedDifficulty}
                  onChange={(e) =>
                    setSelectedDifficulty(
                      e.target.value as ProjectDifficultyCategory | "all"
                    )
                  }
                  aria-label="Filter by difficulty"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-accent-terracotta focus:outline-none"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              {/* Technology Select */}
              <div className="md:col-span-2">
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  aria-label="Filter by technology"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-accent-terracotta focus:outline-none"
                >
                  <option value="all">All Technologies</option>
                  {PROJECT_CATALOG_STATS.allTechnologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Select */}
              <div className="md:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as ProjectSortOption)
                  }
                  aria-label="Sort projects"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-accent-terracotta focus:outline-none"
                >
                  <option value="recommended">
                    Sort: Recommended Order (#1–#14)
                  </option>
                  <option value="phase">Sort: Roadmap Phase (P0–P8)</option>
                  <option value="difficulty">
                    Sort: Difficulty (Beginner → Research)
                  </option>
                  <option value="alphabetical">
                    Sort: Alphabetical (A–Z)
                  </option>
                  <option value="recent">Sort: Recently Worked On</option>
                </select>
              </div>
            </div>

            {/* Phase Filter Bar + Bookmarked Only + Clear Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 inline-flex items-center gap-1 text-xs font-medium text-foreground-muted">
                  <Filter className="h-3.5 w-3.5" />
                  Phase:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPhase("all")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    selectedPhase === "all"
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  All Phases
                </button>
                {COMPLETE_ROADMAP_PHASES.map((phase) => {
                  const isSelected = selectedPhase === phase.phase;
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setSelectedPhase(phase.phase)}
                      title={`Phase ${phase.phase}: ${phase.title}`}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                        isSelected
                          ? "bg-accent-terracotta text-white"
                          : "bg-background text-foreground-secondary hover:text-foreground"
                      }`}
                    >
                      P{phase.phase}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBookmarkedOnly((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
                    bookmarkedOnly
                      ? "border-accent-terracotta bg-accent-terracotta/12 text-accent-terracotta"
                      : "border-border bg-background text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  <Bookmark
                    className="h-3.5 w-3.5"
                    fill={bookmarkedOnly ? "currentColor" : "none"}
                  />
                  <span>
                    Bookmarked ({projectCatalogMetrics.bookmarkedCount})
                  </span>
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-soft"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>
            </div>
          </Card>

          {/* Project Cards Grid or Empty State */}
          {filteredAndSortedProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  metrics={getProjectProgress(project)}
                  isRecommended={project.id === featuredRecommendedProject.id}
                  onToggleBookmark={toggleProjectBookmark}
                />
              ))}
            </div>
          ) : (
            <Card
              variant="default"
              padding="lg"
              className="mx-auto max-w-xl space-y-4 text-center"
            >
              <p className="font-serif text-xl font-semibold text-foreground">
                No projects match your current filters
              </p>
              <p className="text-sm text-foreground-secondary">
                Try clearing your search query or resetting the phase,
                difficulty, or status filters to view all 14 curriculum
                projects.
              </p>
              <div className="pt-1">
                <Button variant="primary" size="md" onClick={clearAllFilters}>
                  <RotateCcw className="mr-1.5 h-4 w-4" />
                  Clear All Filters
                </Button>
              </div>
            </Card>
          )}

          {/* Cross-Platform Integration Footer Card */}
          <Card
            variant="muted"
            padding="lg"
            className="mt-8 flex flex-col justify-between gap-6 border-border-strong/80 lg:flex-row lg:items-center"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="sage">Integrated Curriculum</Badge>
                <span className="text-xs text-foreground-secondary">
                  Synced with Roadmap, Courses &amp; Learning Dashboard
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Every project connects directly to your roadmap modules and
                dashboard milestones
              </h3>
              <p className="max-w-2xl text-sm text-foreground-secondary">
                As you check off implementation tasks or link your GitHub
                repositories, your progress updates automatically across your
                9-phase roadmap and learning analytics dashboard.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-surface-elevated px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-surface-soft"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent-terracotta" />
                <span>Explore 9-Phase Roadmap</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold text-background hover:opacity-90"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Open Learning Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground-secondary hover:text-foreground"
              >
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>Free Courses Library</span>
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}
