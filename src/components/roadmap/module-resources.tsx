"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui";
import { getResourcesForModule } from "@/data/courses";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";
import type { PhaseNumber } from "@/types";
import {
  BookmarkButton,
  CourseStatusSelector,
  ResourceTypeBadge,
} from "@/components/courses/course-primitives";

interface ModuleResourcesProps {
  moduleId: string;
  phase: PhaseNumber;
}

export function ModuleResources({ moduleId, phase }: ModuleResourcesProps) {
  const {
    isResourceBookmarked,
    getResourceStatus,
    toggleResourceBookmark,
    setResourceStatus,
  } = useRoadmapProgress();

  const { resources, isPhaseLevelFallback } = getResourcesForModule(
    moduleId,
    phase
  );

  if (resources.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-surface-subtle p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h5 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
          <BookOpen className="size-3.5 text-sage-strong" />
          <span>
            {isPhaseLevelFallback
              ? `Phase ${phase} Recommended Starting Resources`
              : "Recommended Module Courses & Resources"}
          </span>
        </h5>

        <Badge
          variant={isPhaseLevelFallback ? "muted" : "sage"}
          className="text-[10px]"
        >
          {isPhaseLevelFallback
            ? "Phase-Level Recommendation"
            : `${resources.length} Matched ${resources.length === 1 ? "Resource" : "Resources"}`}
        </Badge>
      </div>

      <ul className="mt-3 space-y-2.5">
        {resources.map(({ resource, placement, displayTitle }) => {
          const status = getResourceStatus(resource.id);
          const bookmarked = isResourceBookmarked(resource.id);

          return (
            <li
              key={`${moduleId}-${resource.id}`}
              className="rounded-lg border border-border bg-card p-3 transition-colors hover:border-border-strong"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[11px] font-semibold text-terracotta-strong">
                      {resource.provider}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <ResourceTypeBadge
                      type={resource.resourceType}
                      subtitle={resource.formatSubtitle}
                      className="px-1.5 py-0 text-[10px]"
                    />
                    {placement.isRecommendedStart ? (
                      <span className="inline-flex items-center gap-1 rounded bg-terracotta-subtle px-1.5 py-0.5 font-mono text-[10px] font-semibold text-terracotta-strong">
                        <Sparkles className="size-2.5" />
                        Start Here
                      </span>
                    ) : null}
                  </div>

                  <Link
                    href={`/courses/${resource.slug}`}
                    className="mt-1 block font-serif text-sm font-semibold text-foreground hover:text-terracotta-strong sm:text-base"
                  >
                    {displayTitle}
                  </Link>
                </div>

                <BookmarkButton
                  resourceTitle={resource.title}
                  isBookmarked={bookmarked}
                  onToggle={() => toggleResourceBookmark(resource.id)}
                />
              </div>

              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-2">
                <CourseStatusSelector
                  resourceTitle={resource.title}
                  status={status}
                  onChangeStatus={(nextStatus) =>
                    setResourceStatus(resource.id, nextStatus)
                  }
                />

                <div className="flex items-center gap-3 text-xs">
                  <Link
                    href={`/courses/${resource.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground"
                  >
                    <span>Details</span>
                    <ArrowRight className="size-3" />
                  </Link>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-terracotta-strong hover:underline"
                  >
                    <span>Open Course</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
