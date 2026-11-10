"use client";

import Link from "next/link";
import {
  ArrowDown,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Play,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { COURSE_LIBRARY_STATS } from "@/data/courses";
import type {
  ContinueLearningTarget,
  CourseLibraryProgressMetrics,
} from "@/hooks/use-roadmap-progress";
import type { CourseResource } from "@/types";

interface CoursesPageHeaderProps {
  courseProgress: CourseLibraryProgressMetrics;
  continueTarget: ContinueLearningTarget;
  activeInProgressResource?: CourseResource;
  isStoragePersistent: boolean;
  onExploreResources: () => void;
  onSelectCollectionTab: (
    tab: "all" | "bookmarked" | "in_progress" | "completed"
  ) => void;
}

export function CoursesPageHeader({
  courseProgress,
  continueTarget,
  activeInProgressResource,
  isStoragePersistent,
  onExploreResources,
  onSelectCollectionTab,
}: CoursesPageHeaderProps) {
  const continueHref = activeInProgressResource
    ? `/courses/${activeInProgressResource.slug}`
    : `/roadmap#${continueTarget.phase.slug}`;

  const continueContextLabel = activeInProgressResource
    ? `Studying: ${activeInProgressResource.providerGroup}`
    : `${continueTarget.phase.code} · ${continueTarget.module.code}`;

  return (
    <section
      aria-labelledby="courses-hero-heading"
      className="relative border-b border-border bg-background pt-10 pb-12 sm:pt-14 sm:pb-16"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* Left Column: Editorial Introduction & CTAs */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="sage">Curated Open-Access Directory</Badge>
              <Badge variant="phase">Phase 0 – Phase 8</Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {COURSE_LIBRARY_STATS.totalUniqueResources} Canonical Resources ·{" "}
                {COURSE_LIBRARY_STATS.totalPhasePlacements} Phase Placements
              </span>
            </div>

            <div className="space-y-4">
              <h1
                id="courses-hero-heading"
                className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
              >
                Learn From the Best.{" "}
                <span className="text-terracotta-strong underline decoration-terracotta/35 decoration-2 underline-offset-6">
                  Completely Free.
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Explore carefully curated courses, tutorials, lectures,
                documentation, and research resources from leading universities,
                educators, and open-source communities — organized around your
                AI and LLM learning journey.
              </p>
            </div>

            {/* Dataset Statistics Grid (Strictly derived from actual dataset counts) */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-lg border border-border bg-card px-3.5 py-2.5">
                <div className="flex items-center gap-1.5 text-terracotta">
                  <BookOpen className="size-3.5" />
                  <span className="font-mono text-sm font-bold text-foreground">
                    {COURSE_LIBRARY_STATS.totalUniqueResources}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Canonical Resources
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card px-3.5 py-2.5">
                <div className="flex items-center gap-1.5 text-terracotta">
                  <Layers className="size-3.5" />
                  <span className="font-mono text-sm font-bold text-foreground">
                    9 Phases
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {COURSE_LIBRARY_STATS.totalPhasePlacements} Phase Recommendations
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card px-3.5 py-2.5">
                <div className="flex items-center gap-1.5 text-sage-strong">
                  <GraduationCap className="size-3.5" />
                  <span className="font-mono text-sm font-bold text-foreground">
                    {COURSE_LIBRARY_STATS.totalProvidersCount}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Universities &amp; Labs
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card px-3.5 py-2.5">
                <div className="flex items-center gap-1.5 text-sage-strong">
                  <Sparkles className="size-3.5" />
                  <span className="font-mono text-sm font-bold text-foreground">
                    10 Primary
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  &ldquo;Start Here&rdquo; Picks
                </p>
              </div>
            </div>

            {/* Study Guidance Note */}
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong className="font-medium text-foreground">
                How to Use This Library:
              </strong>{" "}
              You do not need to complete every resource listed here. Each phase
              highlights a primary{" "}
              <span className="font-medium text-terracotta-strong">
                Start Here
              </span>{" "}
              resource alongside optional lectures, technical documentation, and
              reference codebases so you can tailor your study depth.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                type="button"
                variant="terracotta"
                size="lg"
                onClick={onExploreResources}
              >
                <span>Explore Resources</span>
                <ArrowDown className="size-4" />
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href={continueHref}>
                  <Play className="size-4 fill-current text-terracotta" />
                  <span>Continue Learning</span>
                  <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-normal text-muted-foreground">
                    {continueContextLabel}
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Personal Learning Collection Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border-strong bg-card p-5 shadow-xs sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    My Learning Resources
                  </span>
                  <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
                    Personal Resource Collection
                  </h2>
                </div>
                <Badge variant="sage">Local-First Sync</Badge>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectCollectionTab("bookmarked")}
                  className="group cursor-pointer rounded-lg border border-border bg-surface-subtle p-3 text-left transition-colors hover:border-terracotta/50 hover:bg-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground uppercase">
                      Saved
                    </span>
                    <Bookmark className="size-3.5 text-terracotta" />
                  </div>
                  <p className="mt-1.5 font-mono text-lg font-bold text-foreground sm:text-xl">
                    {courseProgress.bookmarkedCount}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground group-hover:text-terracotta-strong">
                    Bookmarked →
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCollectionTab("in_progress")}
                  className="group cursor-pointer rounded-lg border border-border bg-surface-subtle p-3 text-left transition-colors hover:border-terracotta/50 hover:bg-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground uppercase">
                      Active
                    </span>
                    <Clock className="size-3.5 text-terracotta" />
                  </div>
                  <p className="mt-1.5 font-mono text-lg font-bold text-foreground sm:text-xl">
                    {courseProgress.inProgressCount}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground group-hover:text-terracotta-strong">
                    In Progress →
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectCollectionTab("completed")}
                  className="group cursor-pointer rounded-lg border border-border bg-surface-subtle p-3 text-left transition-colors hover:border-sage-strong/50 hover:bg-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted-foreground uppercase">
                      Done
                    </span>
                    <CheckCircle2 className="size-3.5 text-success" />
                  </div>
                  <p className="mt-1.5 font-mono text-lg font-bold text-foreground sm:text-xl">
                    {courseProgress.completedCount}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground group-hover:text-foreground">
                    Completed →
                  </p>
                </button>
              </div>

              {/* Active Resource or Recommended Next Resource Callout */}
              <div className="mt-4 rounded-lg border border-sage-muted/60 bg-secondary/45 p-3.5">
                {activeInProgressResource ? (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-secondary-foreground uppercase">
                        Currently Studying
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        Phase {activeInProgressResource.primaryPhase}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-foreground">
                      {activeInProgressResource.title}
                    </p>
                    <Link
                      href={`/courses/${activeInProgressResource.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-terracotta-strong underline-offset-4 hover:underline"
                    >
                      Open resource details &amp; notes →
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-secondary-foreground uppercase">
                        Independent Resource Tracking
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {courseProgress.notStartedCount} Not Started
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Bookmark courses and track your resource status (
                      <span className="font-medium text-foreground">
                        Not Started
                      </span>
                      ,{" "}
                      <span className="font-medium text-foreground">
                        In Progress
                      </span>
                      , or{" "}
                      <span className="font-medium text-foreground">
                        Completed
                      </span>
                      ) separately from your roadmap topic checklist.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">
                {isStoragePersistent
                  ? "Bookmarks & course statuses persist locally in your browser."
                  : "Session-only mode (browser storage restricted)."}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
