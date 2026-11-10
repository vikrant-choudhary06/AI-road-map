"use client";

import { useState } from "react";
import {
  ArrowDown,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  Compass,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { ROADMAP_STATS } from "@/data/roadmap";
import type { ContinueLearningTarget } from "@/hooks/use-roadmap-progress";

interface RoadmapHeroProps {
  overallProgress: {
    completedTopicsCount: number;
    totalTopicsCount: number;
    percent: number;
    completedPhasesCount: number;
    inProgressPhasesCount: number;
    totalPhasesCount: number;
    completedModulesCount: number;
    totalModulesCount: number;
    completedMilestonesCount: number;
    totalMilestonesCount: number;
  };
  continueTarget: ContinueLearningTarget;
  isStoragePersistent: boolean;
  onContinueLearning: () => void;
  onExploreAllPhases: () => void;
  onResetProgress: () => void;
}

export function RoadmapHero({
  overallProgress,
  continueTarget,
  isStoragePersistent,
  onContinueLearning,
  onExploreAllPhases,
  onResetProgress,
}: RoadmapHeroProps) {
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <section
      aria-labelledby="roadmap-hero-heading"
      className="relative border-b border-border bg-background pt-10 pb-12 sm:pt-14 sm:pb-16"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Column: Editorial Introduction & Actions */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="sage">Interactive Curriculum & Tracker</Badge>
              <Badge variant="phase">Phase 0 – Phase 8</Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {ROADMAP_STATS.totalModules} Modules ·{" "}
                {ROADMAP_STATS.totalTopics} Topics
              </span>
            </div>

            <div className="space-y-4">
              <h1
                id="roadmap-hero-heading"
                className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
              >
                Your Complete Journey Into{" "}
                <span className="text-terracotta-strong underline decoration-terracotta/35 decoration-2 underline-offset-6">
                  AI &amp; LLM Development
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Start with Python and mathematics, master machine learning and
                neural networks, understand Transformers, and eventually build
                and train your own language models from scratch.
              </p>
            </div>

            {/* 5 Curriculum Summary Pills */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5">
                <Layers className="mt-0.5 size-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    9 Structured Learning Phases
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Prerequisite-ordered progression
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5">
                <Calendar className="mt-0.5 size-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    ~78 Weeks of Planned Study
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Est. at ~15–20 hrs/wk focused study
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5">
                <Code2 className="mt-0.5 size-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    14 Hands-on Projects
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Across the complete curriculum
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5">
                <Compass className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Beginner to Advanced
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Zero prerequisites to LLM research
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5 sm:col-span-2 xl:col-span-1">
                <BookOpen className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Free Learning Resources
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Open university lectures &amp; guides
                  </p>
                </div>
              </div>
            </div>

            {/* Study Pace Clarification Note */}
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong className="font-medium text-foreground">
                Study Pace Estimate:
              </strong>{" "}
              The ~78-week duration is an estimate assuming roughly 15–20 hours
              of focused study and coding per week. All phases are unlocked so
              experienced programmers or mathematicians can move faster or jump
              directly to later phases.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                variant="terracotta"
                size="lg"
                onClick={onContinueLearning}
                className="group"
              >
                <Play className="size-4 fill-current" />
                <span>Continue Learning</span>
                <span className="rounded bg-black/15 px-2 py-0.5 font-mono text-xs font-normal text-accent-foreground">
                  {continueTarget.hasAnyProgress
                    ? `${continueTarget.phase.code} · ${continueTarget.module.code}`
                    : "Start P0 · 0.1"}
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onExploreAllPhases}
              >
                <span>Explore All Phases</span>
                <ArrowDown className="size-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Live Overall Learning Progress Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border-strong bg-card p-5 shadow-xs sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Overall Learning Progress
                  </span>
                  <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
                    Curriculum Mastery Ledger
                  </h2>
                </div>
                <div className="text-right">
                  <span
                    className="font-mono text-2xl font-bold text-foreground sm:text-3xl"
                    aria-label={`Overall topic completion ${overallProgress.percent} percent`}
                  >
                    {overallProgress.percent}%
                  </span>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Topics Mastered
                  </p>
                </div>
              </div>

              {/* Primary Topic Progress Bar */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">
                    Topic Checklist Completion
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {overallProgress.completedTopicsCount} /{" "}
                    {overallProgress.totalTopicsCount} topics
                  </span>
                </div>
                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={overallProgress.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Overall roadmap topic completion percentage"
                >
                  <div
                    className="h-full rounded-full bg-terracotta transition-all duration-300"
                    style={{ width: `${overallProgress.percent}%` }}
                  />
                </div>
              </div>

              {/* Three Breakdown Metrics */}
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                <div className="rounded-lg border border-border bg-surface-subtle p-3">
                  <p className="font-mono text-[11px] text-muted-foreground uppercase">
                    Phases
                  </p>
                  <p className="mt-1 font-mono text-base font-semibold text-foreground sm:text-lg">
                    {overallProgress.completedPhasesCount}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{overallProgress.totalPhasesCount}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {overallProgress.inProgressPhasesCount > 0
                      ? `${overallProgress.inProgressPhasesCount} in progress`
                      : "Completed"}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-surface-subtle p-3">
                  <p className="font-mono text-[11px] text-muted-foreground uppercase">
                    Modules
                  </p>
                  <p className="mt-1 font-mono text-base font-semibold text-foreground sm:text-lg">
                    {overallProgress.completedModulesCount}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{overallProgress.totalModulesCount}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    100% checked
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-surface-subtle p-3">
                  <p className="font-mono text-[11px] text-muted-foreground uppercase">
                    Milestones
                  </p>
                  <p className="mt-1 font-mono text-base font-semibold text-foreground sm:text-lg">
                    {overallProgress.completedMilestonesCount}
                    <span className="text-xs font-normal text-muted-foreground">
                      /{overallProgress.totalMilestonesCount}
                    </span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Core projects
                  </p>
                </div>
              </div>

              {/* Next Up / Current Focus Pointer */}
              <div className="mt-4 rounded-lg border border-sage-muted/60 bg-secondary/45 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-secondary-foreground uppercase">
                    {continueTarget.isAllCompleted ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-success" />
                        Curriculum Completed
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-3.5 text-terracotta" />
                        Recommended Next Topic
                      </>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {continueTarget.phase.code} · Module{" "}
                    {continueTarget.module.code}
                  </span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-foreground">
                  {continueTarget.module.title}: {continueTarget.topic.title}
                </p>
                <button
                  type="button"
                  onClick={onContinueLearning}
                  className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-terracotta-strong underline-offset-4 hover:underline"
                >
                  Jump to module &amp; expand checklist →
                </button>
              </div>

              {/* Footer: Persistence indicator + Reset option */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground">
                <span>
                  {isStoragePersistent
                    ? "Saved automatically in your browser (localStorage)"
                    : "Session-only mode (browser storage restricted)"}
                </span>

                {overallProgress.completedTopicsCount > 0 ||
                overallProgress.completedMilestonesCount > 0 ? (
                  confirmingReset ? (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-error">
                        Reset all progress?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onResetProgress();
                          setConfirmingReset(false);
                        }}
                        className="cursor-pointer rounded bg-error px-2 py-0.5 font-medium text-white hover:opacity-90"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingReset(false)}
                        className="cursor-pointer rounded border border-border px-2 py-0.5 text-foreground hover:bg-muted"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingReset(true)}
                      className="inline-flex cursor-pointer items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <RotateCcw className="size-3" />
                      Reset Progress
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
