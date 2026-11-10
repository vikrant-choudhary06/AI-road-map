"use client";

import {
  CheckCircle2,
  Circle,
  Clock,
  Eye,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { ProgressState, RoadmapPhase } from "@/types";
import type { PhaseProgressMetrics } from "@/hooks/use-roadmap-progress";
import { cn } from "@/lib/utils";

export type RoadmapViewMode = "all" | "focused";

interface PhaseTimelineNavProps {
  phases: RoadmapPhase[];
  activePhaseId: string;
  viewMode: RoadmapViewMode;
  getPhaseProgress: (phase: RoadmapPhase) => PhaseProgressMetrics;
  onSelectPhase: (phase: RoadmapPhase) => void;
  onChangeViewMode: (mode: RoadmapViewMode) => void;
}

function getStatusLabel(state: ProgressState): string {
  switch (state) {
    case "completed":
      return "Completed";
    case "in_progress":
      return "In Progress";
    default:
      return "Not Started";
  }
}

function getStatusBadgeVariant(
  state: ProgressState
): "success" | "terracotta" | "muted" {
  switch (state) {
    case "completed":
      return "success";
    case "in_progress":
      return "terracotta";
    default:
      return "muted";
  }
}

export function PhaseTimelineNav({
  phases,
  activePhaseId,
  viewMode,
  getPhaseProgress,
  onSelectPhase,
  onChangeViewMode,
}: PhaseTimelineNavProps) {
  return (
    <div id="roadmap-phase-navigator" className="scroll-mt-24 space-y-6">
      {/* Header bar with View Mode Toggle */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono text-xs font-semibold tracking-wider text-terracotta-strong uppercase">
            Connected 9-Phase Architecture
          </span>
          <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Interactive Phase Navigation
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All 9 phases are unlocked. Select any phase to jump directly to its
            modules, or switch between full curriculum overview and single-phase
            focus mode.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div
          role="group"
          aria-label="Roadmap exploration mode"
          className="inline-flex shrink-0 items-center rounded-lg border border-border-strong bg-card p-1"
        >
          <Button
            type="button"
            size="sm"
            variant={viewMode === "all" ? "primary" : "ghost"}
            onClick={() => onChangeViewMode("all")}
            className="h-8 px-3 text-xs"
          >
            <LayoutGrid className="size-3.5" />
            <span>All 9 Phases Overview</span>
          </Button>
          <Button
            type="button"
            size="sm"
            variant={viewMode === "focused" ? "primary" : "ghost"}
            onClick={() => onChangeViewMode("focused")}
            className="h-8 px-3 text-xs"
          >
            <Eye className="size-3.5" />
            <span>Focused Phase Mode</span>
          </Button>
        </div>
      </div>

      {/* Connected 9-Phase Card Grid */}
      <nav aria-label="Curriculum phases">
        <ol className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {phases.map((phase) => {
            const metrics = getPhaseProgress(phase);
            const isSelected = phase.id === activePhaseId;
            const statusLabel = getStatusLabel(metrics.state);

            return (
              <li key={phase.id} className="flex">
                <button
                  type="button"
                  onClick={() => onSelectPhase(phase)}
                  aria-current={isSelected ? "step" : undefined}
                  className={cn(
                    "group relative flex w-full cursor-pointer flex-col justify-between rounded-xl border p-4 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    isSelected
                      ? "border-terracotta bg-card shadow-sm ring-1 ring-terracotta/30"
                      : metrics.state === "completed"
                        ? "border-sage-muted bg-card/90 hover:border-foreground/30 hover:bg-card"
                        : "border-border bg-card/75 hover:border-border-strong hover:bg-card"
                  )}
                >
                  <div>
                    {/* Top Row: Phase Number + Status Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold",
                            isSelected
                              ? "border-terracotta bg-terracotta text-accent-foreground"
                              : metrics.state === "completed"
                                ? "border-sage-muted bg-secondary text-secondary-foreground"
                                : "border-border-strong bg-surface-subtle text-foreground"
                          )}
                        >
                          Phase {phase.phase}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {phase.estimatedWeeks}w
                        </span>
                      </div>

                      <Badge
                        variant={getStatusBadgeVariant(metrics.state)}
                        className="text-[11px]"
                      >
                        {metrics.state === "completed" ? (
                          <CheckCircle2 className="size-3" />
                        ) : metrics.state === "in_progress" ? (
                          <Sparkles className="size-3" />
                        ) : (
                          <Circle className="size-2.5" />
                        )}
                        {statusLabel}
                      </Badge>
                    </div>

                    {/* Phase Title & Short Description */}
                    <h3 className="mt-3 font-serif text-base font-semibold text-foreground group-hover:text-terracotta-strong">
                      {phase.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {phase.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Meta + Progress Bar */}
                  <div className="mt-4 space-y-2 border-t border-border/80 pt-3">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {phase.estimatedWeeks} weeks · {phase.difficultyLabel}
                      </span>
                      <span className="font-mono font-semibold text-foreground">
                        {metrics.percent}%
                      </span>
                    </div>

                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                      aria-hidden="true"
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          metrics.state === "completed"
                            ? "bg-success"
                            : "bg-terracotta"
                        )}
                        style={{ width: `${metrics.percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>
                        {phase.modules.length} modules ·{" "}
                        {metrics.completedCount}/{metrics.totalCount} topics
                      </span>
                      {phase.primaryProjects.length > 0 ? (
                        <span className="font-mono text-terracotta-strong">
                          {phase.primaryProjects.length}{" "}
                          {phase.primaryProjects.length === 1
                            ? "milestone"
                            : "milestones"}
                        </span>
                      ) : (
                        <span className="font-mono">Foundation</span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
