"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  GitBranch,
  Layers,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { getResourceById } from "@/data/courses";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";
import type { CourseResource } from "@/types";
import {
  AccessTierBadge,
  BookmarkButton,
  CourseStatusSelector,
  ProviderLabel,
  ResourceRoleBadge,
  ResourceTypeBadge,
} from "./course-primitives";
import { CourseCard } from "./course-card";

interface CourseDetailViewProps {
  resource: CourseResource;
}

export function CourseDetailView({ resource }: CourseDetailViewProps) {
  const {
    isResourceBookmarked,
    getResourceStatus,
    toggleResourceBookmark,
    setResourceStatus,
    recordResourceViewed,
  } = useRoadmapProgress();

  useEffect(() => {
    recordResourceViewed(resource.id);
  }, [recordResourceViewed, resource.id]);

  const status = getResourceStatus(resource.id);
  const isBookmarked = isResourceBookmarked(resource.id);

  const primaryPhaseObj =
    COMPLETE_ROADMAP_PHASES.find((p) => p.phase === resource.primaryPhase) ??
    COMPLETE_ROADMAP_PHASES[0];

  const relatedResources = resource.relatedResourceIds
    .map((id) => getResourceById(id))
    .filter((r): r is CourseResource => Boolean(r));

  // Resolve full RoadmapModule records for all relevantModuleIds
  const linkedRoadmapModules = COMPLETE_ROADMAP_PHASES.flatMap((phase) =>
    phase.modules
      .filter((mod) => resource.relevantModuleIds.includes(mod.id))
      .map((mod) => ({ phase, mod }))
  );

  return (
    <div className="min-h-screen bg-background pt-8 pb-20 sm:pt-12">
      <Container className="space-y-10">
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/courses">
              <ArrowLeft className="size-4" />
              <span>Back to Courses Library</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <span>/</span>
            <Link
              href={`/roadmap#${primaryPhaseObj.slug}`}
              className="hover:text-foreground"
            >
              Phase {primaryPhaseObj.phase}
            </Link>
            <span>/</span>
            <span className="text-foreground">{resource.providerGroup}</span>
          </div>
        </div>

        {/* Hero / Header Card */}
        <section
          aria-labelledby="resource-detail-title"
          className="rounded-2xl border border-border-strong bg-card p-6 shadow-xs sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Core Metadata, Description & Primary CTAs */}
            <div className="space-y-5 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="phase">
                  Primary: Phase {resource.primaryPhase}
                </Badge>
                {resource.phases.length > 1 ? (
                  <Badge variant="sage">
                    Used in Phases {resource.phases.join(", ")}
                  </Badge>
                ) : null}
                <ResourceTypeBadge
                  type={resource.resourceType}
                  subtitle={resource.formatSubtitle}
                />
                <Badge variant="muted">{resource.difficultyLabel}</Badge>
                <AccessTierBadge accessTier={resource.accessTier} />
              </div>

              <div className="space-y-2">
                <ProviderLabel
                  provider={resource.provider}
                  monogram={resource.providerMonogram}
                />
                <h1
                  id="resource-detail-title"
                  className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
                >
                  {resource.title}
                </h1>
              </div>

              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                {resource.description}
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {resource.detailedDescription}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild variant="terracotta" size="lg">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Open Original Resource</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link href={`/roadmap#${primaryPhaseObj.slug}`}>
                    <span>View Related Roadmap Phase</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Personal Tracking, Bookmark & Access Verification Box */}
            <div className="space-y-4 rounded-xl border border-border bg-surface-subtle p-5 lg:col-span-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                  Resource Tracking
                </span>
                <BookmarkButton
                  resourceTitle={resource.title}
                  isBookmarked={isBookmarked}
                  onToggle={() => toggleResourceBookmark(resource.id)}
                  showLabel
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[11px] font-medium text-muted-foreground uppercase">
                  Your Learning Status
                </label>
                <CourseStatusSelector
                  resourceTitle={resource.title}
                  status={status}
                  onChangeStatus={(nextStatus) =>
                    setResourceStatus(resource.id, nextStatus)
                  }
                  variant="segmented"
                  className="w-full justify-between"
                />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Course status is tracked independently from roadmap topic
                  checkboxes so you can mark external courses without altering
                  your topic mastery percentage.
                </p>
              </div>

              {/* Suggested Position & Duration */}
              <div className="space-y-2.5 border-t border-border pt-3.5 text-xs">
                <div>
                  <span className="font-mono text-[11px] font-semibold text-terracotta-strong uppercase">
                    Suggested Learning Position
                  </span>
                  <p className="mt-0.5 font-medium text-foreground">
                    {resource.suggestedLearningPosition}
                  </p>
                </div>

                {resource.estimatedDuration ? (
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="size-3.5" />
                      Documented Duration:
                    </span>
                    <span className="font-mono font-medium text-foreground">
                      {resource.estimatedDuration}
                    </span>
                  </div>
                ) : null}

                {resource.language ? (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language:</span>
                    <span className="font-mono font-medium text-foreground">
                      {resource.language}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Accurate Free-Access & Verification Disclosure */}
              <div className="space-y-2 rounded-lg border border-border bg-card p-3.5 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-foreground uppercase">
                  <ShieldCheck className="size-3.5 text-sage-strong" />
                  Access &amp; Link Verification
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  {resource.accessNote}
                </p>
                {resource.certificateCostNote ? (
                  <p className="border-t border-border/70 pt-2 text-[11px] leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">
                      Certificate Note:
                    </strong>{" "}
                    {resource.certificateCostNote}
                  </p>
                ) : null}
                <p className="border-t border-border/70 pt-2 font-mono text-[11px] text-muted-foreground">
                  Status:{" "}
                  <span className="text-foreground">
                    {resource.verification.status === "unverified"
                      ? "Unverified"
                      : `Verified (${resource.verification.checkedDate})`}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Objectives & Prerequisites Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Learning Objectives */}
          <section
            aria-labelledby="detail-objectives-heading"
            className="rounded-2xl border border-border bg-card p-6 lg:col-span-7"
          >
            <h2
              id="detail-objectives-heading"
              className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground"
            >
              <Target className="size-5 text-terracotta" />
              What You Will Learn from This Resource
            </h2>
            <ul className="mt-4 space-y-3">
              {resource.learningObjectives.map((obj, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-border/80 bg-surface-subtle p-3.5 text-sm leading-relaxed text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sage-strong" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Recommended Prerequisites & Tags */}
          <section
            aria-labelledby="detail-prereqs-heading"
            className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 lg:col-span-5"
          >
            <div>
              <h2
                id="detail-prereqs-heading"
                className="flex items-center gap-2 font-serif text-xl font-semibold text-foreground"
              >
                <GitBranch className="size-5 text-terracotta" />
                Recommended Prerequisites
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Review these foundations before starting so you get the most out
                of this material:
              </p>
              <ul className="mt-4 space-y-2.5">
                {resource.prerequisites.map((prereq, idx) => (
                  <li
                    key={idx}
                    className="rounded-lg border border-border bg-surface-subtle px-3.5 py-2.5 text-xs leading-relaxed text-foreground sm:text-sm"
                  >
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Topics &amp; Keywords
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="muted" className="font-mono text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Roadmap Integration: Phase Placements & Associated Stage 3 Modules */}
        <section
          aria-labelledby="detail-roadmap-integration-heading"
          className="rounded-2xl border border-border-strong bg-card p-6 sm:p-8"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-border pb-5 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider text-terracotta-strong uppercase">
                Curriculum Integration
              </span>
              <h2
                id="detail-roadmap-integration-heading"
                className="mt-1 font-serif text-2xl font-semibold text-foreground"
              >
                How This Resource Fits Into Your AI &amp; LLM Roadmap
              </h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href={`/roadmap#${primaryPhaseObj.slug}`}>
                <span>Open Interactive Roadmap</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          {/* Phase-by-Phase Study Guidance */}
          <div className="mt-6 space-y-4">
            <h3 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
              <Compass className="size-4 text-terracotta" />
              Phase-Specific Study Recommendations ({resource.phasePlacements.length})
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {resource.phasePlacements.map((placement) => {
                const phaseObj = COMPLETE_ROADMAP_PHASES.find(
                  (p) => p.phase === placement.phase
                );
                return (
                  <div
                    key={placement.catalogCode}
                    className="flex flex-col justify-between rounded-xl border border-border bg-surface-subtle p-4 sm:p-5"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="phase">
                          Phase {placement.phase} · Resource{" "}
                          {placement.catalogCode}
                        </Badge>
                        <ResourceRoleBadge
                          role={placement.role}
                          isRecommendedStart={placement.isRecommendedStart}
                        />
                      </div>

                      <h4 className="mt-3 font-serif text-lg font-semibold text-foreground">
                        {placement.phaseSpecificTitle ?? resource.title}
                      </h4>
                      {phaseObj ? (
                        <p className="font-mono text-xs text-muted-foreground">
                          In Phase {phaseObj.phase}: {phaseObj.title}
                        </p>
                      ) : null}

                      <p className="mt-2.5 text-xs leading-relaxed text-foreground/90 sm:text-sm">
                        {placement.phaseGuidance}
                      </p>
                    </div>

                    {phaseObj ? (
                      <div className="mt-4 border-t border-border/80 pt-3">
                        <Link
                          href={`/roadmap#${phaseObj.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-strong hover:underline"
                        >
                          <span>
                            Jump to Phase {phaseObj.phase} ({phaseObj.title})
                          </span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Directly Mapped Stage 3 Modules */}
          {linkedRoadmapModules.length > 0 ? (
            <div className="mt-8 space-y-3 border-t border-border pt-6">
              <h3 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                <Layers className="size-4 text-sage-strong" />
                Directly Associated Roadmap Modules ({linkedRoadmapModules.length})
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {linkedRoadmapModules.map(({ phase, mod }) => (
                  <Link
                    key={mod.id}
                    href={`/roadmap#${phase.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-border bg-surface-subtle p-3.5 transition-colors hover:border-terracotta/50 hover:bg-card"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-card px-2 py-0.5 font-mono text-xs font-semibold text-terracotta-strong">
                          Module {mod.code}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          Phase {phase.phase}
                        </span>
                      </div>
                      <h4 className="mt-2 font-serif text-base font-semibold text-foreground group-hover:text-terracotta-strong">
                        {mod.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {mod.description}
                      </p>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-terracotta-strong">
                      Inspect module checklist →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* Related Resources Section */}
        {relatedResources.length > 0 ? (
          <section
            aria-labelledby="related-resources-heading"
            className="space-y-5 pt-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Continue Exploring
                </span>
                <h2
                  id="related-resources-heading"
                  className="mt-1 font-serif text-2xl font-semibold text-foreground"
                >
                  Related Courses &amp; Learning Materials
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/courses">
                  <BookOpen className="size-4" />
                  <span>Browse Full Library</span>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedResources.map((rel) => (
                <CourseCard
                  key={rel.id}
                  resource={rel}
                  status={getResourceStatus(rel.id)}
                  isBookmarked={isResourceBookmarked(rel.id)}
                  onToggleBookmark={toggleResourceBookmark}
                  onChangeStatus={setResourceStatus}
                />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
