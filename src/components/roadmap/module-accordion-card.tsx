"use client";

import {
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Flag,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { PhaseNumber, RoadmapModule } from "@/types";
import type { ModuleProgressMetrics } from "@/hooks/use-roadmap-progress";
import { ModuleResources } from "./module-resources";
import { cn } from "@/lib/utils";

interface ModuleAccordionCardProps {
  phaseId: string;
  phaseNumber: PhaseNumber;
  phaseCode: string;
  module: RoadmapModule;
  isExpanded: boolean;
  progress: ModuleProgressMetrics;
  highlightedTopicId?: string | null;
  searchQuery?: string;
  isTopicCompleted: (topicId: string) => boolean;
  onToggleExpand: () => void;
  onToggleTopic: (topicId: string, phaseId: string, moduleId: string) => void;
  onSetAllTopics: (
    moduleId: string,
    phaseId: string,
    topicIds: string[],
    completed: boolean
  ) => void;
}

export function ModuleAccordionCard({
  phaseId,
  phaseNumber,
  phaseCode,
  module,
  isExpanded,
  progress,
  highlightedTopicId,
  searchQuery,
  isTopicCompleted,
  onToggleExpand,
  onToggleTopic,
  onSetAllTopics,
}: ModuleAccordionCardProps) {
  const allTopicIds = module.topics.map((t) => t.id);
  const isModuleComplete = progress.state === "completed";

  // Filter topics when a search query is active without mutating completion state
  const normalizedSearch = searchQuery?.trim().toLowerCase() ?? "";
  const matchingTopics = normalizedSearch
    ? module.topics.filter(
        (t) =>
          t.title.toLowerCase().includes(normalizedSearch) ||
          t.explanation.toLowerCase().includes(normalizedSearch) ||
          t.learningOutcome.toLowerCase().includes(normalizedSearch) ||
          t.keyConcepts.some((c) => c.toLowerCase().includes(normalizedSearch))
      )
    : module.topics;

  const displayedTopics =
    normalizedSearch && matchingTopics.length > 0
      ? matchingTopics
      : module.topics;

  return (
    <article
      id={`module-${module.id}`}
      className={cn(
        "scroll-mt-28 rounded-xl border transition-colors duration-150",
        isModuleComplete
          ? "border-sage-muted bg-card"
          : isExpanded
            ? "border-border-strong bg-card shadow-2xs"
            : "border-border bg-card/85 hover:border-border-strong hover:bg-card"
      )}
    >
      {/* Accordion Header */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <button
          type="button"
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
          aria-controls={`module-content-${module.id}`}
          className="flex flex-1 cursor-pointer items-start gap-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {/* Module Status Icon / Code */}
          <span
            className={cn(
              "mt-0.5 inline-flex shrink-0 items-center justify-center rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold",
              isModuleComplete
                ? "border-success/35 bg-success-subtle text-success-foreground"
                : progress.state === "in_progress"
                  ? "border-terracotta/40 bg-terracotta-subtle text-terracotta-strong"
                  : "border-border-strong bg-surface-subtle text-foreground"
            )}
          >
            {isModuleComplete ? (
              <CheckCircle2 className="mr-1 size-3.5 text-success" />
            ) : null}
            {module.code}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-serif text-lg font-semibold text-foreground sm:text-xl">
                {module.title}
              </h4>
              <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                <Clock className="size-3" />
                {module.estimatedEffort}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {module.description}
            </p>
          </div>
        </button>

        {/* Module Progress & Expand Control */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border/70 pt-2.5 sm:border-t-0 sm:pt-0">
          <div className="text-left sm:text-right">
            <div className="flex items-center gap-2 sm:justify-end">
              <span className="font-mono text-xs font-semibold text-foreground">
                {progress.completedCount}/{progress.totalCount} topics
              </span>
              <Badge
                variant={
                  isModuleComplete
                    ? "success"
                    : progress.state === "in_progress"
                      ? "terracotta"
                      : "muted"
                }
              >
                {progress.percent}%
              </Badge>
            </div>
            <div className="mt-1.5 h-1.5 w-28 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  isModuleComplete ? "bg-success" : "bg-terracotta"
                )}
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleExpand}
            aria-label={
              isExpanded
                ? `Collapse ${module.title}`
                : `Expand ${module.title}`
            }
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface-subtle text-foreground transition-colors hover:bg-muted"
          >
            {isExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Module Content */}
      {isExpanded ? (
        <div
          id={`module-content-${module.id}`}
          className="space-y-6 border-t border-border px-4 pt-5 pb-6 sm:px-6"
        >
          {/* 1. What You'll Learn & Why It Matters */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface-subtle p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                <BookOpen className="size-3.5 text-terracotta" />
                What You&apos;ll Learn
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {module.whatYouWillLearn}
              </p>
            </div>

            <div className="rounded-lg border border-sage-muted/60 bg-secondary/35 p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-secondary-foreground uppercase">
                <Lightbulb className="size-3.5 text-sage-strong" />
                Why It Matters for AI &amp; LLMs
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {module.whyItMatters}
              </p>
            </div>
          </div>

          {/* 2. Educational Formula / Mathematical Intuition Breakdown (if present) */}
          {module.educationalExample ? (
            <div className="rounded-xl border border-terracotta/35 bg-terracotta-subtle/40 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-terracotta-strong uppercase">
                  <Sparkles className="size-3.5" />
                  Core Mathematical &amp; Algorithmic Intuition
                </span>
                <span className="font-mono text-xs font-medium text-foreground">
                  {module.educationalExample.title}
                </span>
              </div>

              <div className="mt-3 overflow-x-auto rounded-lg border border-border-strong bg-card px-4 py-3 font-mono text-sm font-semibold text-foreground">
                {module.educationalExample.expression}
              </div>

              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {module.educationalExample.symbolBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-md border border-border/80 bg-card/85 px-3 py-2 text-xs"
                  >
                    <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono font-semibold text-terracotta-strong">
                      {item.symbol}
                    </code>
                    <span className="leading-relaxed text-muted-foreground">
                      {item.meaning}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-foreground">
                <strong className="font-semibold">Key Takeaway:</strong>{" "}
                {module.educationalExample.takeaway}
              </p>
            </div>
          ) : null}

          {/* 3. Learning Objectives & Key Concepts */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="space-y-2.5 lg:col-span-7">
              <h5 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                <Target className="size-3.5 text-terracotta" />
                Module Learning Objectives
              </h5>
              <ul className="space-y-1.5">
                {module.learningObjectives.map((objective, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5 lg:col-span-5">
              <h5 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                <Code2 className="size-3.5 text-sage-strong" />
                Key Concepts
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {module.keyConcepts.map((concept, idx) => (
                  <Badge key={idx} variant="muted" className="text-xs">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Interactive Topics to Master Checklist */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <ListChecks className="size-4 text-terracotta" />
                <h5 className="font-serif text-base font-semibold text-foreground">
                  Topics to Master ({progress.completedCount}/
                  {progress.totalCount})
                </h5>
                {normalizedSearch &&
                matchingTopics.length < module.topics.length ? (
                  <Badge variant="terracotta">
                    Showing {displayedTopics.length} matching search
                  </Badge>
                ) : null}
              </div>

              <Button
                type="button"
                variant="subtle"
                size="sm"
                onClick={() =>
                  onSetAllTopics(
                    module.id,
                    phaseId,
                    allTopicIds,
                    !isModuleComplete
                  )
                }
                className="h-8 text-xs"
              >
                <Check className="size-3.5" />
                <span>
                  {isModuleComplete
                    ? "Uncheck All Module Topics"
                    : "Mark All Module Topics Complete"}
                </span>
              </Button>
            </div>

            <ul className="space-y-2.5" role="list">
              {displayedTopics.map((topic, index) => {
                const checked = isTopicCompleted(topic.id);
                const isHighlighted = highlightedTopicId === topic.id;

                return (
                  <li
                    key={topic.id}
                    id={`topic-${topic.id}`}
                    className={cn(
                      "scroll-mt-32 rounded-lg border p-3.5 transition-all duration-150 sm:p-4",
                      isHighlighted
                        ? "border-terracotta bg-terracotta-subtle/30 ring-2 ring-terracotta/30"
                        : checked
                          ? "border-sage-muted/80 bg-secondary/25"
                          : "border-border bg-surface-subtle/60 hover:border-border-strong hover:bg-card"
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Accessible Checkbox Button */}
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        aria-label={`Mark topic "${topic.title}" as ${checked ? "incomplete" : "completed"}`}
                        onClick={() =>
                          onToggleTopic(topic.id, phaseId, module.id)
                        }
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          checked
                            ? "border-terracotta bg-terracotta text-accent-foreground"
                            : "border-border-strong bg-card hover:border-terracotta"
                        )}
                      >
                        {checked ? <Check className="size-3.5 stroke-[2.5]" /> : null}
                      </button>

                      {/* Topic Content */}
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <label
                            onClick={() =>
                              onToggleTopic(topic.id, phaseId, module.id)
                            }
                            className={cn(
                              "cursor-pointer font-serif text-base font-semibold transition-colors",
                              checked
                                ? "text-muted-foreground line-through decoration-muted-foreground/60"
                                : "text-foreground hover:text-terracotta-strong"
                            )}
                          >
                            <span className="mr-2 font-mono text-xs font-normal text-muted-foreground">
                              {phaseCode}.{index + 1}
                            </span>
                            {topic.title}
                          </label>

                          {checked ? (
                            <span className="font-mono text-[11px] font-medium text-success">
                              Mastered
                            </span>
                          ) : null}
                        </div>

                        {/* Beginner-clear explanation */}
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {topic.explanation}
                        </p>

                        {/* Formula or Code snippet if present */}
                        {topic.formulaOrCode ? (
                          <div className="overflow-x-auto rounded-md border border-border bg-card px-3 py-2 font-mono text-xs text-foreground">
                            <code>{topic.formulaOrCode}</code>
                          </div>
                        ) : null}

                        {/* Key Concepts & Learning Outcome */}
                        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {topic.keyConcepts.map((concept, cIdx) => (
                              <span
                                key={cIdx}
                                className="rounded border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>

                          <p className="text-xs text-foreground/90">
                            <span className="font-mono text-[11px] font-semibold text-terracotta-strong uppercase">
                              Outcome:{" "}
                            </span>
                            {topic.learningOutcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 5. Practice Exercises & Integrated Stage 4 Module Resources */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="rounded-lg border border-border bg-surface-subtle p-4 lg:col-span-6">
              <h5 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                <HelpCircle className="size-3.5 text-terracotta" />
                Practice Exercises
              </h5>
              <ul className="mt-2.5 space-y-2">
                {module.practicalExercises.map((exercise, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                  >
                    <span className="mt-0.5 font-mono text-xs font-semibold text-terracotta-strong">
                      {idx + 1}.
                    </span>
                    <span>{exercise}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <ModuleResources moduleId={module.id} phase={phaseNumber} />
            </div>
          </div>

          {/* 6. Module Completion Milestone */}
          <div className="flex items-start gap-3 rounded-lg border border-border-strong bg-card p-3.5 sm:items-center">
            <Flag className="mt-0.5 size-4 shrink-0 text-terracotta sm:mt-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                Module Completion Milestone:{" "}
              </span>
              <span className="text-muted-foreground">
                {module.completionMilestone}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
