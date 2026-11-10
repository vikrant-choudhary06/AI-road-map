"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  History,
  Layers,
} from "lucide-react";
import type { CourseResource, ProgressState, RoadmapPhase } from "@/types";
import type {
  CourseLibraryProgressMetrics,
  PhaseProgressMetrics,
} from "@/hooks/use-roadmap-progress";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { ALL_COURSE_RESOURCES, getResourceById } from "@/data/courses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function getPhaseStatusBadge(state: ProgressState) {
  if (state === "completed") {
    return <Badge variant="sage">Completed</Badge>;
  }
  if (state === "in_progress") {
    return <Badge variant="terracotta">In Progress</Badge>;
  }
  return <Badge variant="outline">Not Started</Badge>;
}

export interface PhaseProgressListProps {
  currentPhaseId: string;
  getPhaseProgress: (phase: RoadmapPhase) => PhaseProgressMetrics;
}

export function PhaseProgressList({
  currentPhaseId,
  getPhaseProgress,
}: PhaseProgressListProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            9-Phase Curriculum Architecture
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Phase-by-Phase Progress
          </h2>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/roadmap">
            <Layers className="size-3.5" />
            <span>Open Full Interactive Roadmap</span>
          </Link>
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {COMPLETE_ROADMAP_PHASES.map((phase) => {
          const metrics = getPhaseProgress(phase);
          const isCurrent = phase.id === currentPhaseId;

          return (
            <div
              key={phase.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                isCurrent
                  ? "border-primary/60 bg-surface-soft/55 shadow-xs"
                  : "border-border/80 bg-background/60 hover:border-border hover:bg-card"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    PHASE 0{phase.phase}
                  </span>
                  {getPhaseStatusBadge(metrics.state)}
                </div>

                <div>
                  <h3 className="font-serif text-base font-semibold leading-snug text-foreground">
                    {phase.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3 shrink-0" />
                    <span>
                      Est. {phase.estimatedWeeks} weeks · {phase.difficultyLabel}
                    </span>
                  </p>
                </div>

                {/* Topic progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {metrics.completedCount} / {metrics.totalCount} topics
                    </span>
                    <span className="font-semibold text-foreground">
                      {metrics.percent}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={metrics.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Phase ${phase.phase} completion`}
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${metrics.percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                <span className="text-muted-foreground">
                  {metrics.completedModulesCount}/{metrics.totalModulesCount}{" "}
                  modules
                </span>
                <Link
                  href={`/roadmap#${phase.slug}`}
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  <span>
                    {metrics.state === "not_started"
                      ? `Start Phase ${phase.phase}`
                      : `Open Phase ${phase.phase}`}
                  </span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface ActiveCoursesProps {
  resourceStatuses: Record<string, ProgressState>;
  recentlyViewedResourceIds: string[];
  courseLibraryProgress: CourseLibraryProgressMetrics;
  isResourceBookmarked: (resourceId: string) => boolean;
  onSetResourceStatus: (resourceId: string, status: ProgressState) => void;
  onToggleBookmark: (resourceId: string) => void;
  onRecordResourceViewed: (resourceId: string) => void;
}

export function ActiveCourses({
  resourceStatuses,
  recentlyViewedResourceIds,
  courseLibraryProgress,
  isResourceBookmarked,
  onSetResourceStatus,
  onToggleBookmark,
  onRecordResourceViewed,
}: ActiveCoursesProps) {
  const [activeTab, setActiveTab] = useState<
    "in_progress" | "completed" | "recent"
  >("in_progress");

  const inProgressResources = ALL_COURSE_RESOURCES.filter(
    (r) => resourceStatuses[r.id] === "in_progress"
  );
  const completedResources = ALL_COURSE_RESOURCES.filter(
    (r) => resourceStatuses[r.id] === "completed"
  );
  const recentResources = recentlyViewedResourceIds
    .map((id) => getResourceById(id))
    .filter((r): r is CourseResource => Boolean(r));

  const displayedResources =
    activeTab === "in_progress"
      ? inProgressResources
      : activeTab === "completed"
        ? completedResources
        : recentResources;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Stage 4 Resource Library Sync
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              Course Learning Progress
            </h2>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href="/courses">
              <BookOpen className="size-3.5" />
              <span>Course Library</span>
            </Link>
          </Button>
        </div>

        {/* Status Summary Tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("in_progress")}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "in_progress"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>In Progress</span>
            <span className="rounded-full bg-background/20 px-1.5 py-0.5 text-[11px]">
              {inProgressResources.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "completed"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Completed</span>
            <span className="rounded-full bg-background/20 px-1.5 py-0.5 text-[11px]">
              {completedResources.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recent")}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "recent"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/80 bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="size-3.5" />
            <span>Recently Accessed</span>
            <span className="rounded-full bg-background/20 px-1.5 py-0.5 text-[11px]">
              {recentResources.length}
            </span>
          </button>
        </div>

        {/* Resource Cards List */}
        <div className="mt-4 space-y-3">
          {displayedResources.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface-soft/35 p-6 text-center">
              <p className="font-serif text-base font-medium text-foreground">
                {activeTab === "in_progress"
                  ? "No courses marked In Progress yet"
                  : activeTab === "completed"
                    ? "No completed courses recorded yet"
                    : "No recently opened resources yet"}
              </p>
              <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
                {activeTab === "in_progress"
                  ? "Explore the 44 verified free courses and mark any active lecture series, textbook, or repository as In Progress."
                  : activeTab === "completed"
                    ? "When you finish a course or textbook, mark its status as Completed to track it here."
                    : "Resources you inspect or launch from the Course Library or Roadmap will appear here."}
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/courses">
                    <span>Explore Free Courses Library</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            displayedResources.slice(0, 6).map((resource) => {
              const status = resourceStatuses[resource.id] ?? "not_started";
              const bookmarked = isResourceBookmarked(resource.id);

              return (
                <div
                  key={resource.id}
                  className="rounded-xl border border-border/80 bg-background/70 p-3.5 transition-colors hover:border-border"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline">
                          Phase {resource.primaryPhase}
                        </Badge>
                        <span className="text-xs font-medium text-muted-foreground">
                          {resource.provider} · {resource.resourceType}
                        </span>
                      </div>
                      <Link
                        href={`/courses/${resource.slug}`}
                        onClick={() => onRecordResourceViewed(resource.id)}
                        className="block font-serif text-base font-semibold text-foreground hover:text-primary"
                      >
                        {resource.title}
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleBookmark(resource.id)}
                      aria-label={
                        bookmarked ? "Remove bookmark" : "Bookmark resource"
                      }
                      className="rounded-lg border border-border/70 p-1.5 text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="size-4 text-primary" />
                      ) : (
                        <Bookmark className="size-4" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5">
                    <div className="flex items-center gap-1.5">
                      <label
                        htmlFor={`dash-course-status-${resource.id}`}
                        className="text-[11px] font-medium text-muted-foreground"
                      >
                        Status:
                      </label>
                      <select
                        id={`dash-course-status-${resource.id}`}
                        value={status}
                        onChange={(e) =>
                          onSetResourceStatus(
                            resource.id,
                            e.target.value as ProgressState
                          )
                        }
                        className="h-7 rounded-md border border-border bg-card px-2 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
                      >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <Link
                        href={`/courses/${resource.slug}`}
                        onClick={() => onRecordResourceViewed(resource.id)}
                        className="font-medium text-muted-foreground hover:text-foreground"
                      >
                        Guide
                      </Link>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onRecordResourceViewed(resource.id)}
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                      >
                        <span>Open Resource</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
        <span>
          Total Library: {courseLibraryProgress.completedCount} completed ·{" "}
          {courseLibraryProgress.inProgressCount} in progress ·{" "}
          {courseLibraryProgress.notStartedCount} not started
        </span>
        <span className="text-[11px]">
          Synced with /courses
        </span>
      </div>
    </div>
  );
}

export interface BookmarkedResourcesProps {
  bookmarkedResourceIds: string[];
  resourceStatuses: Record<string, ProgressState>;
  onToggleBookmark: (resourceId: string) => void;
  onSetResourceStatus: (resourceId: string, status: ProgressState) => void;
  onRecordResourceViewed: (resourceId: string) => void;
}

export function BookmarkedResources({
  bookmarkedResourceIds,
  resourceStatuses,
  onToggleBookmark,
  onSetResourceStatus,
  onRecordResourceViewed,
}: BookmarkedResourcesProps) {
  const bookmarkedResources = bookmarkedResourceIds
    .map((id) => getResourceById(id))
    .filter((r): r is CourseResource => Boolean(r));

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Saved Reading &amp; Lecture Queue
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              Bookmarked Resources ({bookmarkedResources.length})
            </h2>
          </div>
          <Badge variant="sage">
            <BookmarkCheck className="mr-1 size-3.5" />
            {bookmarkedResources.length} Saved
          </Badge>
        </div>

        <div className="mt-4 space-y-3">
          {bookmarkedResources.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface-soft/35 p-6 text-center">
              <p className="font-serif text-base font-medium text-foreground">
                Your saved reading &amp; course queue is empty
              </p>
              <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
                Bookmark courses, textbooks, papers, or repositories from the
                Course Library or Roadmap modules to keep them handy here.
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/courses">
                    <Bookmark className="size-3.5" />
                    <span>Browse &amp; Bookmark Courses</span>
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            bookmarkedResources.map((resource) => {
              const status = resourceStatuses[resource.id] ?? "not_started";
              return (
                <div
                  key={resource.id}
                  className="rounded-xl border border-border/80 bg-background/70 p-3.5 transition-colors hover:border-border"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline">
                          Phase {resource.primaryPhase}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {resource.provider} ·{" "}
                          {resource.estimatedDuration ?? resource.resourceType}
                        </span>
                      </div>
                      <Link
                        href={`/courses/${resource.slug}`}
                        onClick={() => onRecordResourceViewed(resource.id)}
                        className="block font-serif text-base font-semibold text-foreground hover:text-primary"
                      >
                        {resource.title}
                      </Link>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleBookmark(resource.id)}
                      className="h-7 shrink-0 px-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5">
                    <div className="flex items-center gap-1.5">
                      {status === "completed" ? (
                        <Badge variant="sage">
                          <CheckCircle2 className="mr-1 size-3" />
                          Completed
                        </Badge>
                      ) : status === "in_progress" ? (
                        <Badge variant="terracotta">In Progress</Badge>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            onSetResourceStatus(resource.id, "in_progress")
                          }
                          className="h-7 px-2.5 text-xs"
                        >
                          Mark In Progress
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <Link
                        href={`/courses/${resource.slug}`}
                        onClick={() => onRecordResourceViewed(resource.id)}
                        className="font-medium text-muted-foreground hover:text-foreground"
                      >
                        Study Guide
                      </Link>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onRecordResourceViewed(resource.id)}
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                      >
                        <span>Launch</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
        <span>One-click bookmark removal updates /courses immediately</span>
        <Link href="/courses" className="font-medium text-primary hover:underline">
          View All →
        </Link>
      </div>
    </div>
  );
}
