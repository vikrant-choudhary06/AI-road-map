"use client";

import Link from "next/link";
import { ArrowRight, Clock, Compass, Sparkles } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { CourseResource, ProgressState, RoadmapPhase } from "@/types";
import type { PhaseContextualResource } from "@/data/courses";
import { CourseCard } from "./course-card";

interface PhaseResourceGroupProps {
  phase: RoadmapPhase;
  entries: PhaseContextualResource[];
  getResourceStatus: (resourceId: string) => ProgressState;
  isResourceBookmarked: (resourceId: string) => boolean;
  onToggleBookmark: (resourceId: string) => void;
  onChangeStatus: (resourceId: string, status: ProgressState) => void;
}

export function PhaseResourceGroup({
  phase,
  entries,
  getResourceStatus,
  isResourceBookmarked,
  onToggleBookmark,
  onChangeStatus,
}: PhaseResourceGroupProps) {
  if (entries.length === 0) return null;

  const startHereEntries = entries.filter(
    (e) => e.placement.isRecommendedStart || e.placement.role === "start_here"
  );
  const supportingEntries = entries.filter(
    (e) => !e.placement.isRecommendedStart && e.placement.role !== "start_here"
  );

  return (
    <section
      id={`courses-phase-${phase.phase}`}
      aria-labelledby={`courses-phase-heading-${phase.phase}`}
      className="scroll-mt-28 rounded-2xl border border-border-strong bg-card p-5 shadow-xs sm:p-8"
    >
      {/* Phase Group Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 lg:flex-row lg:items-end">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="phase">
              PHASE {phase.phase} · {phase.code}
            </Badge>
            <Badge variant="sage">
              <Clock className="size-3" />
              {phase.estimatedWeeks} Weeks in Roadmap
            </Badge>
            <Badge variant="outline">{phase.difficultyLabel}</Badge>
            <span className="font-mono text-xs text-muted-foreground">
              {entries.length}{" "}
              {entries.length === 1 ? "curated resource" : "curated resources"}
            </span>
          </div>

          <h2
            id={`courses-phase-heading-${phase.phase}`}
            className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Phase {phase.phase} — {phase.title}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {phase.shortDescription}
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="shrink-0 self-start lg:self-auto">
          <Link href={`/roadmap#${phase.slug}`}>
            <span>View Phase {phase.phase} Modules &amp; Checklists</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      {/* Primary "Start Here" Recommendation Section */}
      {startHereEntries.length > 0 ? (
        <div className="mt-6 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-terracotta" />
              <h3 className="font-mono text-xs font-semibold tracking-wider text-terracotta-strong uppercase">
                Primary Starting {startHereEntries.length > 1 ? "Resources" : "Resource"} for Phase {phase.phase}
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              Begin with {startHereEntries.length > 1 ? "these foundational picks" : "this foundational pick"} before exploring optional references
            </span>
          </div>

          <div
            className={
              startHereEntries.length === 1
                ? "grid grid-cols-1 gap-4"
                : "grid grid-cols-1 gap-4 lg:grid-cols-2"
            }
          >
            {startHereEntries.map(({ resource, placement }) => (
              <CourseCard
                key={`${phase.phase}-${placement.catalogCode}-${resource.id}`}
                resource={resource}
                placement={placement}
                status={getResourceStatus(resource.id)}
                isBookmarked={isResourceBookmarked(resource.id)}
                onToggleBookmark={onToggleBookmark}
                onChangeStatus={onChangeStatus}
                variant="featured-start"
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* Supporting Courses, Tutorials, Documentation & Reference Papers */}
      {supportingEntries.length > 0 ? (
        <div className="mt-7 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/80 pt-5">
            <div className="flex items-center gap-2">
              <Compass className="size-4 text-sage-strong" />
              <h3 className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                Additional Learning, Practice &amp; Reference Materials ({supportingEntries.length})
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              Select selectively based on the specific modules you are studying
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {supportingEntries.map(({ resource, placement }) => (
              <CourseCard
                key={`${phase.phase}-${placement.catalogCode}-${resource.id}`}
                resource={resource}
                placement={placement}
                status={getResourceStatus(resource.id)}
                isBookmarked={isResourceBookmarked(resource.id)}
                onToggleBookmark={onToggleBookmark}
                onChangeStatus={onChangeStatus}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

/**
 * Flat grid view of unique canonical resources (used in "All Unique Catalog"
 * mode or when viewing personal Bookmarked / In Progress / Completed tabs).
 */
export function CourseList({
  resources,
  getResourceStatus,
  isResourceBookmarked,
  onToggleBookmark,
  onChangeStatus,
}: {
  resources: CourseResource[];
  getResourceStatus: (resourceId: string) => ProgressState;
  isResourceBookmarked: (resourceId: string) => boolean;
  onToggleBookmark: (resourceId: string) => void;
  onChangeStatus: (resourceId: string, status: ProgressState) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <CourseCard
          key={resource.id}
          resource={resource}
          status={getResourceStatus(resource.id)}
          isBookmarked={isResourceBookmarked(resource.id)}
          onToggleBookmark={onToggleBookmark}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
}
