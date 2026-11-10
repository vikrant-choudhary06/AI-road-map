"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronsDownUp,
  ChevronsUpDown,
  FolderGit2,
  Search,
  X,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import {
  ALL_PRIMARY_MILESTONES,
  COMPLETE_ROADMAP_PHASES,
  resolvePhaseByAnchorOrId,
} from "@/data/roadmap";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";
import type { RoadmapPhase } from "@/types";
import { RoadmapHero } from "./roadmap-hero";
import { PhaseTimelineNav, type RoadmapViewMode } from "./phase-timeline-nav";
import { PhaseDetailSection } from "./phase-detail-section";
import { cn } from "@/lib/utils";

const INITIAL_EXPANDED_MODULES: ReadonlySet<string> = new Set([
  "p0-m1",
  "p1-m1",
  "p2-m1",
  "p3-m1",
  "p4-m1",
  "p5-m1",
  "p6-m1",
  "p7-m1",
  "p8-m1",
]);

export function RoadmapWorkspace() {
  const {
    isStoragePersistent,
    overallProgress,
    continueLearningTarget,
    isTopicCompleted,
    isReadinessChecked,
    isMilestoneCompleted,
    toggleTopic,
    setModuleTopicsCompleted,
    toggleReadinessCheck,
    toggleMilestone,
    recordVisitedLocation,
    resetProgress,
    getModuleProgress,
    getPhaseProgress,
    getPhaseReadinessProgress,
  } = useRoadmapProgress();

  const [activePhaseId, setActivePhaseId] = useState<string>("phase-0");
  const [viewMode, setViewMode] = useState<RoadmapViewMode>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedModuleIds, setExpandedModuleIds] = useState<Set<string>>(
    () => new Set(INITIAL_EXPANDED_MODULES)
  );
  const [highlightedTopicId, setHighlightedTopicId] = useState<string | null>(
    null
  );

  const scrollToElementById = useCallback((elementId: string) => {
    if (typeof window === "undefined") return;
    requestAnimationFrame(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, []);

  // Sync with URL hash on initial load and hashchange (e.g. from Landing Page phase links)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const matchedPhase = resolvePhaseByAnchorOrId(hash);
      if (matchedPhase) {
        setActivePhaseId(matchedPhase.id);
        setExpandedModuleIds((prev) => {
          const next = new Set(prev);
          if (matchedPhase.modules[0]) {
            next.add(matchedPhase.modules[0].id);
          }
          return next;
        });
        scrollToElementById(matchedPhase.slug);
      }
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);
    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, [scrollToElementById]);

  const handleSelectPhase = useCallback(
    (phase: RoadmapPhase) => {
      setActivePhaseId(phase.id);
      recordVisitedLocation(phase.id, phase.modules[0]?.id ?? null);
      setExpandedModuleIds((prev) => {
        const next = new Set(prev);
        if (phase.modules[0]) {
          next.add(phase.modules[0].id);
        }
        return next;
      });
      scrollToElementById(phase.slug);
    },
    [recordVisitedLocation, scrollToElementById]
  );

  const handleNavigateToPhaseId = useCallback(
    (phaseId: string) => {
      const targetPhase = resolvePhaseByAnchorOrId(phaseId);
      if (targetPhase) {
        handleSelectPhase(targetPhase);
      }
    },
    [handleSelectPhase]
  );

  const handleContinueLearning = useCallback(() => {
    const { phase, module, topic } = continueLearningTarget;
    setActivePhaseId(phase.id);
    setSearchQuery("");
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      next.add(module.id);
      return next;
    });
    setHighlightedTopicId(topic.id);
    recordVisitedLocation(phase.id, module.id);

    setTimeout(() => {
      const topicEl = document.getElementById(`topic-${topic.id}`);
      const moduleEl = document.getElementById(`module-${module.id}`);
      if (topicEl) {
        topicEl.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (moduleEl) {
        moduleEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        scrollToElementById(phase.slug);
      }
    }, 80);

    setTimeout(() => {
      setHighlightedTopicId(null);
    }, 3500);
  }, [continueLearningTarget, recordVisitedLocation, scrollToElementById]);

  const handleExploreAllPhases = useCallback(() => {
    setViewMode("all");
    scrollToElementById("roadmap-phase-navigator");
  }, [scrollToElementById]);

  const handleToggleModuleExpand = useCallback(
    (moduleId: string, phaseId: string) => {
      setActivePhaseId(phaseId);
      recordVisitedLocation(phaseId, moduleId);
      setExpandedModuleIds((prev) => {
        const next = new Set(prev);
        if (next.has(moduleId)) {
          next.delete(moduleId);
        } else {
          next.add(moduleId);
        }
        return next;
      });
    },
    [recordVisitedLocation]
  );

  const handleExpandAllPhaseModules = useCallback((phase: RoadmapPhase) => {
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      for (const mod of phase.modules) {
        next.add(mod.id);
      }
      return next;
    });
  }, []);

  const handleCollapseAllPhaseModules = useCallback((phase: RoadmapPhase) => {
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      for (const mod of phase.modules) {
        next.delete(mod.id);
      }
      return next;
    });
  }, []);

  const allCurriculumModuleIds = useMemo(
    () =>
      COMPLETE_ROADMAP_PHASES.flatMap((p) => p.modules.map((mod) => mod.id)),
    []
  );

  const areAllCurriculumModulesExpanded =
    expandedModuleIds.size >= allCurriculumModuleIds.length;

  const handleToggleAllCurriculumModules = useCallback(() => {
    if (areAllCurriculumModulesExpanded) {
      setExpandedModuleIds(new Set());
    } else {
      setExpandedModuleIds(new Set(allCurriculumModuleIds));
    }
  }, [allCurriculumModuleIds, areAllCurriculumModulesExpanded]);

  // Filter phases & auto-expand matching modules when search query is active
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const displayedPhases = useMemo(() => {
    if (normalizedSearch) {
      return COMPLETE_ROADMAP_PHASES.filter((phase) => {
        const phaseMatches =
          phase.title.toLowerCase().includes(normalizedSearch) ||
          phase.shortDescription.toLowerCase().includes(normalizedSearch);
        const moduleOrTopicMatches = phase.modules.some(
          (mod) =>
            mod.title.toLowerCase().includes(normalizedSearch) ||
            mod.description.toLowerCase().includes(normalizedSearch) ||
            mod.whatYouWillLearn.toLowerCase().includes(normalizedSearch) ||
            mod.keyConcepts.some((k) =>
              k.toLowerCase().includes(normalizedSearch)
            ) ||
            mod.topics.some(
              (t) =>
                t.title.toLowerCase().includes(normalizedSearch) ||
                t.explanation.toLowerCase().includes(normalizedSearch) ||
                t.learningOutcome.toLowerCase().includes(normalizedSearch) ||
                t.keyConcepts.some((c) =>
                  c.toLowerCase().includes(normalizedSearch)
                )
            )
        );
        return phaseMatches || moduleOrTopicMatches;
      });
    }

    if (viewMode === "focused") {
      const found = COMPLETE_ROADMAP_PHASES.find(
        (p) => p.id === activePhaseId
      );
      return found ? [found] : [COMPLETE_ROADMAP_PHASES[0]];
    }

    return COMPLETE_ROADMAP_PHASES;
  }, [activePhaseId, normalizedSearch, viewMode]);

  // Effective expanded modules (auto-expand modules matching search query)
  const effectiveExpandedModuleIds = useMemo(() => {
    if (!normalizedSearch) return expandedModuleIds;
    const searchExpanded = new Set(expandedModuleIds);
    for (const phase of displayedPhases) {
      for (const mod of phase.modules) {
        const matches =
          mod.title.toLowerCase().includes(normalizedSearch) ||
          mod.description.toLowerCase().includes(normalizedSearch) ||
          mod.keyConcepts.some((k) =>
            k.toLowerCase().includes(normalizedSearch)
          ) ||
          mod.topics.some(
            (t) =>
              t.title.toLowerCase().includes(normalizedSearch) ||
              t.explanation.toLowerCase().includes(normalizedSearch) ||
              t.learningOutcome.toLowerCase().includes(normalizedSearch) ||
              t.keyConcepts.some((c) =>
                c.toLowerCase().includes(normalizedSearch)
              )
          );
        if (matches) {
          searchExpanded.add(mod.id);
        }
      }
    }
    return searchExpanded;
  }, [displayedPhases, expandedModuleIds, normalizedSearch]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Roadmap Hero Section */}
      <RoadmapHero
        overallProgress={overallProgress}
        continueTarget={continueLearningTarget}
        isStoragePersistent={isStoragePersistent}
        onContinueLearning={handleContinueLearning}
        onExploreAllPhases={handleExploreAllPhases}
        onResetProgress={resetProgress}
      />

      {/* 2. Interactive Phase Timeline Navigation */}
      <section aria-label="Phase timeline navigation" className="pt-10 pb-6">
        <Container>
          <PhaseTimelineNav
            phases={COMPLETE_ROADMAP_PHASES}
            activePhaseId={activePhaseId}
            viewMode={viewMode}
            getPhaseProgress={getPhaseProgress}
            onSelectPhase={handleSelectPhase}
            onChangeViewMode={setViewMode}
          />
        </Container>
      </section>

      {/* 3. Sticky Curriculum Search, Mobile Phase Selector & Quick Jump Bar */}
      <div className="sticky top-16 z-30 border-y border-border bg-background/95 py-3 backdrop-blur-xs">
        <Container>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 370+ topics, formulas, or concepts (e.g., RoPE, Autograd, BPE, DPO)..."
                aria-label="Search roadmap modules and topics"
                className="h-9 w-full rounded-lg border border-border-strong bg-card pr-8 pl-9 text-xs text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:outline-none sm:text-sm"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              ) : null}
            </div>

            {/* Mobile Phase Dropdown + Desktop P0-P8 Quick Pills + Global Expand/Collapse */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Mobile Select Dropdown */}
              <div className="flex items-center gap-2 md:hidden">
                <label
                  htmlFor="mobile-phase-select"
                  className="font-mono text-xs font-medium text-muted-foreground"
                >
                  Phase:
                </label>
                <select
                  id="mobile-phase-select"
                  value={activePhaseId}
                  onChange={(e) => handleNavigateToPhaseId(e.target.value)}
                  className="h-8 rounded-md border border-border-strong bg-card px-2.5 text-xs font-medium text-foreground"
                >
                  {COMPLETE_ROADMAP_PHASES.map((p) => (
                    <option key={p.id} value={p.id}>
                      P{p.phase}: {p.title} ({getPhaseProgress(p).percent}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop P0 - P8 Quick Jump Pills */}
              <div
                className="hidden items-center gap-1 md:flex"
                role="navigation"
                aria-label="Quick phase jump"
              >
                {COMPLETE_ROADMAP_PHASES.map((p) => {
                  const pMetrics = getPhaseProgress(p);
                  const isCurrent = p.id === activePhaseId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPhase(p)}
                      title={`Phase ${p.phase}: ${p.title} (${pMetrics.percent}%)`}
                      className={cn(
                        "cursor-pointer rounded-md border px-2.5 py-1 font-mono text-xs font-semibold transition-colors",
                        isCurrent
                          ? "border-terracotta bg-terracotta text-accent-foreground"
                          : pMetrics.state === "completed"
                            ? "border-sage-muted bg-secondary text-secondary-foreground hover:border-foreground/40"
                            : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground"
                      )}
                    >
                      P{p.phase}
                    </button>
                  );
                })}
              </div>

              {/* Global Expand / Collapse All */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleToggleAllCurriculumModules}
                className="h-8 text-xs"
              >
                {areAllCurriculumModulesExpanded ? (
                  <>
                    <ChevronsDownUp className="size-3.5" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <ChevronsUpDown className="size-3.5" />
                    <span>Expand All 40 Modules</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* 4. Main Phase Curriculum Sections */}
      <div className="pt-8">
        <Container className="space-y-10">
          {displayedPhases.length === 0 ? (
            <div className="rounded-2xl border border-border-strong bg-card p-10 text-center">
              <p className="font-serif text-xl font-semibold text-foreground">
                No modules or topics match &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Your completion progress is untouched. Try searching for a
                broader concept such as &ldquo;matrix&rdquo;,
                &ldquo;attention&rdquo;, &ldquo;tokenizer&rdquo;, or
                &ldquo;LoRA&rdquo;.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="mt-4"
              >
                Clear Search Filter
              </Button>
            </div>
          ) : (
            displayedPhases.map((phase) => {
              const phaseIdx = COMPLETE_ROADMAP_PHASES.findIndex(
                (p) => p.id === phase.id
              );
              const previousPhase =
                phaseIdx > 0
                  ? COMPLETE_ROADMAP_PHASES[phaseIdx - 1]
                  : undefined;
              const nextPhase =
                phaseIdx >= 0 && phaseIdx < COMPLETE_ROADMAP_PHASES.length - 1
                  ? COMPLETE_ROADMAP_PHASES[phaseIdx + 1]
                  : undefined;

              return (
                <PhaseDetailSection
                  key={phase.id}
                  phase={phase}
                  previousPhase={previousPhase}
                  nextPhase={nextPhase}
                  phaseProgress={getPhaseProgress(phase)}
                  readinessProgress={getPhaseReadinessProgress(phase)}
                  expandedModuleIds={effectiveExpandedModuleIds}
                  highlightedTopicId={highlightedTopicId}
                  searchQuery={searchQuery}
                  getModuleProgress={getModuleProgress}
                  isTopicCompleted={isTopicCompleted}
                  isReadinessChecked={isReadinessChecked}
                  isMilestoneCompleted={isMilestoneCompleted}
                  onToggleModuleExpand={handleToggleModuleExpand}
                  onExpandAllPhaseModules={handleExpandAllPhaseModules}
                  onCollapseAllPhaseModules={handleCollapseAllPhaseModules}
                  onToggleTopic={toggleTopic}
                  onSetModuleTopicsCompleted={setModuleTopicsCompleted}
                  onToggleReadinessCheck={toggleReadinessCheck}
                  onToggleMilestone={toggleMilestone}
                  onNavigateToPhase={handleSelectPhase}
                  onNavigateToPhaseId={handleNavigateToPhaseId}
                />
              );
            })
          )}
        </Container>
      </div>

      {/* 5. Complete 14 Primary Project Milestones Summary Index */}
      <section
        id="primary-project-milestones"
        aria-labelledby="milestones-index-heading"
        className="mt-16 scroll-mt-24 border-t border-border pt-14"
      >
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Badge variant="terracotta">14 Canonical Hands-on Projects</Badge>
              <h2
                id="milestones-index-heading"
                className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                Complete Curriculum Project Milestones (1–14)
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Every core project across Phases 1 through 8 builds directly
                toward implementing, training, aligning, and serving your own
                language model from scratch.
              </p>
            </div>

            <div className="font-mono text-xs text-muted-foreground">
              Completed:{" "}
              <strong className="text-foreground">
                {overallProgress.completedMilestonesCount} /{" "}
                {overallProgress.totalMilestonesCount}
              </strong>{" "}
              milestones
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {ALL_PRIMARY_MILESTONES.map((milestone) => {
              const done = isMilestoneCompleted(milestone.id);
              const parentPhase = COMPLETE_ROADMAP_PHASES.find(
                (p) => p.phase === milestone.phase
              );

              return (
                <div
                  key={milestone.id}
                  className={cn(
                    "flex flex-col justify-between rounded-xl border p-4 transition-colors",
                    done
                      ? "border-sage-muted bg-secondary/25"
                      : "border-border bg-card hover:border-border-strong"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded border border-border-strong bg-surface-subtle px-2 py-0.5 font-mono text-xs font-semibold text-foreground">
                          #{String(milestone.milestoneNumber).padStart(2, "0")}
                        </span>
                        <Badge variant="muted" className="text-[11px]">
                          Phase {milestone.phase}
                        </Badge>
                      </div>

                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={done}
                        aria-label={`Mark Project Milestone ${milestone.milestoneNumber}: ${milestone.title} as ${done ? "incomplete" : "completed"}`}
                        onClick={() =>
                          toggleMilestone(
                            milestone.id,
                            `phase-${milestone.phase}`
                          )
                        }
                        className={cn(
                          "flex size-5 cursor-pointer items-center justify-center rounded border transition-colors",
                          done
                            ? "border-success bg-success text-white"
                            : "border-border-strong bg-surface-subtle hover:border-terracotta"
                        )}
                      >
                        {done ? <Check className="size-3.5 stroke-[2.5]" /> : null}
                      </button>
                    </div>

                    <h3 className="mt-2.5 font-serif text-base font-semibold text-foreground">
                      <FolderGit2 className="mr-1.5 inline size-4 text-terracotta" />
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {milestone.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-2.5 text-[11px]">
                    <span className="font-mono text-muted-foreground">
                      {milestone.difficultyLabel}
                    </span>
                    {parentPhase ? (
                      <button
                        type="button"
                        onClick={() => handleSelectPhase(parentPhase)}
                        className="cursor-pointer font-medium text-terracotta-strong hover:underline"
                      >
                        View in Phase {milestone.phase} →
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
