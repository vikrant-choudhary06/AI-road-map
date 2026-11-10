"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ChevronsDownUp,
  ChevronsUpDown,
  ClipboardCheck,
  Clock,
  Code2,
  FolderGit2,
  GitBranch,
  Layers,
  ListChecks,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { getProjectById } from "@/data/projects";
import type { RoadmapModule, RoadmapPhase } from "@/types";
import {
  useRoadmapProgress,
  type ModuleProgressMetrics,
  type PhaseProgressMetrics,
  type PhaseReadinessMetrics,
} from "@/hooks/use-roadmap-progress";
import { ModuleAccordionCard } from "./module-accordion-card";
import { cn } from "@/lib/utils";

interface PhaseDetailSectionProps {
  phase: RoadmapPhase;
  previousPhase?: RoadmapPhase;
  nextPhase?: RoadmapPhase;
  phaseProgress: PhaseProgressMetrics;
  readinessProgress: PhaseReadinessMetrics;
  expandedModuleIds: ReadonlySet<string>;
  highlightedTopicId?: string | null;
  searchQuery?: string;
  getModuleProgress: (mod: RoadmapModule) => ModuleProgressMetrics;
  isTopicCompleted: (topicId: string) => boolean;
  isReadinessChecked: (checkId: string) => boolean;
  isMilestoneCompleted: (milestoneId: string) => boolean;
  onToggleModuleExpand: (moduleId: string, phaseId: string) => void;
  onExpandAllPhaseModules: (phase: RoadmapPhase) => void;
  onCollapseAllPhaseModules: (phase: RoadmapPhase) => void;
  onToggleTopic: (topicId: string, phaseId: string, moduleId: string) => void;
  onSetModuleTopicsCompleted: (
    moduleId: string,
    phaseId: string,
    topicIds: string[],
    completed: boolean
  ) => void;
  onToggleReadinessCheck: (checkId: string, phaseId: string) => void;
  onToggleMilestone: (milestoneId: string, phaseId: string) => void;
  onNavigateToPhase: (phase: RoadmapPhase) => void;
  onNavigateToPhaseId: (phaseId: string) => void;
}

export function PhaseDetailSection({
  phase,
  previousPhase,
  nextPhase,
  phaseProgress,
  readinessProgress,
  expandedModuleIds,
  highlightedTopicId,
  searchQuery,
  getModuleProgress,
  isTopicCompleted,
  isReadinessChecked,
  isMilestoneCompleted,
  onToggleModuleExpand,
  onExpandAllPhaseModules,
  onCollapseAllPhaseModules,
  onToggleTopic,
  onSetModuleTopicsCompleted,
  onToggleReadinessCheck,
  onToggleMilestone,
  onNavigateToPhase,
  onNavigateToPhaseId,
}: PhaseDetailSectionProps) {
  const { getProjectProgress } = useRoadmapProgress();
  const isPhaseCompleted = phaseProgress.state === "completed";
  const normalizedSearch = searchQuery?.trim().toLowerCase() ?? "";

  // Filter modules when search query is active
  const visibleModules = normalizedSearch
    ? phase.modules.filter((mod) => {
        const modMatches =
          mod.title.toLowerCase().includes(normalizedSearch) ||
          mod.description.toLowerCase().includes(normalizedSearch) ||
          mod.whatYouWillLearn.toLowerCase().includes(normalizedSearch) ||
          mod.keyConcepts.some((k) =>
            k.toLowerCase().includes(normalizedSearch)
          );
        const topicMatches = mod.topics.some(
          (t) =>
            t.title.toLowerCase().includes(normalizedSearch) ||
            t.explanation.toLowerCase().includes(normalizedSearch) ||
            t.learningOutcome.toLowerCase().includes(normalizedSearch) ||
            t.keyConcepts.some((c) =>
              c.toLowerCase().includes(normalizedSearch)
            )
        );
        return modMatches || topicMatches;
      })
    : phase.modules;

  const allVisibleExpanded =
    visibleModules.length > 0 &&
    visibleModules.every((m) => expandedModuleIds.has(m.id));

  return (
    <section
      id={phase.slug}
      data-phase-id={phase.id}
      aria-labelledby={`heading-${phase.id}`}
      className="scroll-mt-24 rounded-2xl border border-border-strong bg-card p-5 shadow-xs sm:p-8"
    >
      {/* Anchor alias for #phase-0, #phase-1, etc. */}
      <div id={phase.id} className="-mt-24 pt-24" aria-hidden="true" />

      {/* 1. Phase Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-border pb-6 lg:flex-row lg:items-start">
        <div className="space-y-3 lg:max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="phase">
              PHASE {phase.phase} · {phase.code}
            </Badge>
            <Badge variant="sage">
              <Clock className="size-3" />
              {phase.estimatedWeeks} Weeks
            </Badge>
            <Badge variant="outline">{phase.difficultyLabel}</Badge>
            <Badge
              variant={
                isPhaseCompleted
                  ? "success"
                  : phaseProgress.state === "in_progress"
                    ? "terracotta"
                    : "muted"
              }
            >
              {isPhaseCompleted
                ? "Completed"
                : phaseProgress.state === "in_progress"
                  ? "In Progress"
                  : "Not Started"}
            </Badge>
          </div>

          <h2
            id={`heading-${phase.id}`}
            className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Phase {phase.phase} — {phase.title}
          </h2>

          <p className="text-base leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">Purpose:</strong>{" "}
            {phase.purpose}
          </p>
        </div>

        {/* Phase Progress Meter Box */}
        <div className="w-full shrink-0 rounded-xl border border-border bg-surface-subtle p-4 lg:w-72">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
              Phase Progress
            </span>
            <span className="font-mono text-xl font-bold text-foreground">
              {phaseProgress.percent}%
            </span>
          </div>

          <div
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={phaseProgress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Phase ${phase.phase} topic completion percentage`}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                isPhaseCompleted ? "bg-success" : "bg-terracotta"
              )}
              style={{ width: `${phaseProgress.percent}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>
              {phaseProgress.completedCount} / {phaseProgress.totalCount} topics
            </span>
            <span>
              {phaseProgress.completedModulesCount} /{" "}
              {phaseProgress.totalModulesCount} modules
            </span>
          </div>
        </div>
      </div>

      {/* Restrained Phase Completion Confirmation Banner */}
      {isPhaseCompleted ? (
        <div
          role="status"
          className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-success/35 bg-success-subtle/60 p-4 sm:flex-row sm:items-center sm:px-5"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
            <div>
              <p className="font-serif text-base font-semibold text-foreground">
                Phase {phase.phase} Topic Curriculum Complete
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                You have checked all {phaseProgress.totalCount} topics in{" "}
                {phase.title}. Verify your mastery with the self-assessment
                readiness checklist below
                {nextPhase ? ` or continue to Phase ${nextPhase.phase}.` : "."}
              </p>
            </div>
          </div>

          {nextPhase ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onNavigateToPhase(nextPhase)}
              className="shrink-0"
            >
              <span>Continue to Phase {nextPhase.phase}</span>
              <ArrowRight className="size-3.5" />
            </Button>
          ) : null}
        </div>
      ) : null}

      {/* 2. Prerequisites & Phase Learning Objectives */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Prerequisites */}
        <div className="rounded-xl border border-border bg-surface-subtle p-4 sm:p-5 lg:col-span-5">
          <h3 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
            <GitBranch className="size-3.5 text-terracotta" />
            Recommended Prerequisites
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Phases are never locked—jump directly here if you already know these
            foundations:
          </p>
          <ul className="mt-3 space-y-2">
            {phase.prerequisites.map((prereq, idx) => (
              <li key={idx}>
                {prereq.phaseId ? (
                  <button
                    type="button"
                    onClick={() =>
                      prereq.phaseId && onNavigateToPhaseId(prereq.phaseId)
                    }
                    className="group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:border-terracotta/50 hover:text-terracotta-strong"
                  >
                    <span>{prereq.label}</span>
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground group-hover:text-terracotta-strong">
                      Jump →
                    </span>
                  </button>
                ) : (
                  <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                    {prereq.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Phase Learning Objectives */}
        <div className="rounded-xl border border-border bg-surface-subtle p-4 sm:p-5 lg:col-span-7">
          <h3 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
            <Target className="size-3.5 text-terracotta" />
            Phase {phase.phase} Learning Objectives
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {phase.learningObjectives.map((obj, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-lg border border-border/70 bg-card/85 p-3 text-xs leading-relaxed text-muted-foreground sm:text-sm"
              >
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-terracotta" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Expandable Modules & Topic Checklists */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <Layers className="size-4 text-terracotta" />
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Detailed Modules &amp; Topic Checklists ({visibleModules.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                allVisibleExpanded
                  ? onCollapseAllPhaseModules(phase)
                  : onExpandAllPhaseModules(phase)
              }
              className="h-8 text-xs"
            >
              {allVisibleExpanded ? (
                <>
                  <ChevronsDownUp className="size-3.5" />
                  <span>Collapse Modules</span>
                </>
              ) : (
                <>
                  <ChevronsUpDown className="size-3.5" />
                  <span>Expand All Modules</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-3.5">
          {visibleModules.map((mod) => (
            <ModuleAccordionCard
              key={mod.id}
              phaseId={phase.id}
              phaseNumber={phase.phase}
              phaseCode={phase.code}
              module={mod}
              isExpanded={expandedModuleIds.has(mod.id)}
              progress={getModuleProgress(mod)}
              highlightedTopicId={highlightedTopicId}
              searchQuery={searchQuery}
              isTopicCompleted={isTopicCompleted}
              onToggleExpand={() => onToggleModuleExpand(mod.id, phase.id)}
              onToggleTopic={onToggleTopic}
              onSetAllTopics={onSetModuleTopicsCompleted}
            />
          ))}
        </div>
      </div>

      {/* 4. Phase Assignments & Primary Project Milestones */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Phase Assignments */}
        <div className="rounded-xl border border-border bg-surface-subtle p-5 lg:col-span-5">
          <div className="flex items-center gap-2">
            <Code2 className="size-4 text-terracotta" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Phase {phase.phase} Practical Assignments
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Complete these focused coding exercises while progressing through
            the modules above:
          </p>

          <ol className="mt-4 space-y-2.5">
            {phase.assignments.map((assignment, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-xs leading-relaxed text-foreground sm:text-sm"
              >
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-muted font-mono text-xs font-semibold text-terracotta-strong">
                  {idx + 1}
                </span>
                <span>{assignment}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Hands-On Project Milestones (Canonical 14 + Supplementary) */}
        <div className="space-y-4 rounded-xl border border-border bg-surface-subtle p-5 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="size-4 text-terracotta" />
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Hands-On Project Milestones
              </h3>
            </div>
            {phase.primaryProjects.length > 0 ? (
              <Badge variant="terracotta">
                {phase.primaryProjects.length} Primary Curriculum{" "}
                {phase.primaryProjects.length === 1 ? "Milestone" : "Milestones"}
              </Badge>
            ) : (
              <Badge variant="sage">Foundational Preparation</Badge>
            )}
          </div>

          {/* Primary Milestones (Part of the 14 Canonical Projects) */}
          {phase.primaryProjects.length > 0 ? (
            <div className="space-y-3.5">
              {phase.primaryProjects.map((project) => {
                const milestoneDone = isMilestoneCompleted(project.id);
                const fullProject = getProjectById(project.id);
                const projectMetrics = fullProject
                  ? getProjectProgress(fullProject)
                  : null;

                return (
                  <div
                    key={project.id}
                    className={cn(
                      "rounded-xl border p-4 transition-colors sm:p-5",
                      milestoneDone
                        ? "border-sage-muted bg-secondary/25"
                        : "border-border-strong bg-card"
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="phase">
                            Milestone #{project.milestoneNumber} of 14
                          </Badge>
                          <Badge variant="outline">
                            {project.difficultyLabel}
                          </Badge>
                          {projectMetrics && (
                            <Badge
                              variant={
                                projectMetrics.status === "completed"
                                  ? "sage"
                                  : projectMetrics.status === "in_progress"
                                    ? "terracotta"
                                    : "outline"
                              }
                            >
                              {projectMetrics.status === "completed"
                                ? "Completed"
                                : projectMetrics.status === "in_progress"
                                  ? "In Progress"
                                  : "Not Started"}
                            </Badge>
                          )}
                        </div>
                        <h4 className="pt-1 font-serif text-lg font-semibold text-foreground">
                          {fullProject ? (
                            <Link
                              href={`/projects/${fullProject.slug}`}
                              className="transition-colors hover:text-accent-terracotta"
                            >
                              {project.title}
                            </Link>
                          ) : (
                            project.title
                          )}
                        </h4>
                      </div>

                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={milestoneDone}
                        onClick={() =>
                          onToggleMilestone(project.id, phase.id)
                        }
                        className={cn(
                          "inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                          milestoneDone
                            ? "border-success/40 bg-success-subtle text-success-foreground"
                            : "border-border-strong bg-surface-subtle text-foreground hover:border-terracotta"
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-4 items-center justify-center rounded border",
                            milestoneDone
                              ? "border-success bg-success text-white"
                              : "border-border-strong bg-card"
                          )}
                        >
                          {milestoneDone ? (
                            <Check className="size-3 stroke-[2.5]" />
                          ) : null}
                        </span>
                        <span>
                          {milestoneDone
                            ? "Milestone Completed"
                            : "Mark Milestone Built"}
                        </span>
                      </button>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {project.shortDescription}
                    </p>

                    {/* Live Task Progress Bar from Stage 6 Project Guide */}
                    {projectMetrics && fullProject && (
                      <div className="mt-3.5 rounded-lg border border-border/80 bg-surface-subtle p-3 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                            <ListChecks className="size-3.5 text-terracotta" />
                            Implementation Task Progress
                          </span>
                          <span className="font-mono font-semibold text-foreground">
                            {projectMetrics.completedTaskCount} /{" "}
                            {projectMetrics.totalTaskCount} steps (
                            {projectMetrics.percent}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-terracotta transition-all duration-300"
                            style={{ width: `${projectMetrics.percent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Skills Practiced */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.skillsPracticed.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded border border-border bg-surface-subtle px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Deliverables if present (e.g., MyLLM v1 in Phase 6) */}
                    {project.deliverables && project.deliverables.length > 0 ? (
                      <div className="mt-3.5 rounded-lg border border-border bg-surface-subtle p-3">
                        <p className="font-mono text-[11px] font-semibold text-foreground uppercase">
                          Required Project Deliverables:
                        </p>
                        <ul className="mt-1.5 grid grid-cols-1 gap-1 sm:grid-cols-2">
                          {project.deliverables.map((deliv, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                              <Sparkles className="size-3 shrink-0 text-terracotta" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {/* Expected Outcome & Direct Link to Project Guide */}
                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-3 text-xs text-foreground">
                      <div>
                        <span className="font-mono font-semibold text-terracotta-strong uppercase">
                          Expected Outcome:{" "}
                        </span>
                        <span className="text-muted-foreground">
                          {project.expectedOutcome}
                        </span>
                      </div>

                      {fullProject && (
                        <Link
                          href={`/projects/${fullProject.slug}`}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-strong bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-surface-soft"
                        >
                          <span>Open Project Guide</span>
                          <ArrowRight className="size-3.5 text-terracotta" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Supplementary / Optional Builds */}
          {phase.supplementaryProjects &&
          phase.supplementaryProjects.length > 0 ? (
            <div className="space-y-2.5">
              {phase.supplementaryProjects.map((supp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card/85 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-sage-strong uppercase">
                      <Wrench className="size-3.5" />
                      Supplementary Phase Build
                    </span>
                    <Badge variant="muted">Optional Practice</Badge>
                  </div>
                  <h4 className="mt-1 font-serif text-base font-semibold text-foreground">
                    {supp.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {supp.description}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* 5. Phase Completion Criteria & Self-Assessment Readiness Checklist */}
      <div className="mt-8 rounded-xl border border-border-strong bg-surface-subtle p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="size-4 text-terracotta" />
              <h3 className="font-serif text-lg font-semibold text-foreground sm:text-xl">
                Phase {phase.phase} Completion Criteria &amp; Self-Assessment
              </h3>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {phase.completionCriteriaSummary}
            </p>
          </div>

          <div className="shrink-0">
            <Badge
              variant={readinessProgress.allChecked ? "success" : "sage"}
            >
              <Award className="size-3.5" />
              Readiness Check: {readinessProgress.checkedCount} /{" "}
              {readinessProgress.totalCount}
            </Badge>
          </div>
        </div>

        <p className="mt-3 font-mono text-[11px] text-muted-foreground">
          Self-assessment readiness checks help you verify conceptual mastery
          before moving on (tracked separately from topic completion
          percentage):
        </p>

        <ul className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {phase.completionChecklist.map((item) => {
            const checked = isReadinessChecked(item.id);
            return (
              <li
                key={item.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3.5 transition-colors",
                  checked
                    ? "border-sage-muted bg-secondary/30"
                    : "border-border bg-card hover:border-border-strong"
                )}
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  aria-label={item.question}
                  onClick={() => onToggleReadinessCheck(item.id, phase.id)}
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    checked
                      ? "border-sage-strong bg-sage-strong text-white"
                      : "border-border-strong bg-surface-subtle hover:border-terracotta"
                  )}
                >
                  {checked ? <Check className="size-3.5 stroke-[2.5]" /> : null}
                </button>

                <div
                  onClick={() => onToggleReadinessCheck(item.id, phase.id)}
                  className="cursor-pointer space-y-1"
                >
                  <p
                    className={cn(
                      "text-xs font-semibold leading-snug sm:text-sm",
                      checked ? "text-muted-foreground line-through" : "text-foreground"
                    )}
                  >
                    {item.question}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 6. Previous / Next Phase Navigation Controls */}
      <div className="mt-8 flex flex-col items-stretch justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
        {previousPhase ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => onNavigateToPhase(previousPhase)}
            className="justify-start text-left"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span>
              Prev: Phase {previousPhase.phase} — {previousPhase.title}
            </span>
          </Button>
        ) : (
          <div />
        )}

        {nextPhase ? (
          <Button
            type="button"
            variant="terracotta"
            onClick={() => onNavigateToPhase(nextPhase)}
            className="justify-end text-right"
          >
            <span>
              Next: Phase {nextPhase.phase} — {nextPhase.title}
            </span>
            <ArrowRight className="size-4 shrink-0" />
          </Button>
        ) : null}
      </div>
    </section>
  );
}
