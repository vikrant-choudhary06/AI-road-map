"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type {
  CourseResource,
  PhaseResourcePlacement,
  ProgressState,
} from "@/types";
import {
  AccessTierBadge,
  BookmarkButton,
  CourseStatusSelector,
  ProviderLabel,
  ResourceRoleBadge,
  ResourceTypeBadge,
} from "./course-primitives";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  resource: CourseResource;
  /** Optional phase placement when rendered inside a specific phase group */
  placement?: PhaseResourcePlacement;
  status: ProgressState;
  isBookmarked: boolean;
  onToggleBookmark: (resourceId: string) => void;
  onChangeStatus: (resourceId: string, status: ProgressState) => void;
  variant?: "default" | "featured-start";
}

export function CourseCard({
  resource,
  placement,
  status,
  isBookmarked,
  onToggleBookmark,
  onChangeStatus,
  variant = "default",
}: CourseCardProps) {
  const displayTitle = placement?.phaseSpecificTitle ?? resource.title;
  const isFeaturedStart =
    variant === "featured-start" ||
    Boolean(placement?.isRecommendedStart) ||
    (!placement && resource.isRecommended);

  const phasesLabel =
    resource.phases.length === 1
      ? `Phase ${resource.phases[0]}`
      : `Phases ${resource.phases.join(", ")}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-150",
        status === "completed"
          ? "border-sage-muted bg-card"
          : isFeaturedStart
            ? "border-terracotta/55 bg-card shadow-xs ring-1 ring-terracotta/20"
            : "border-border bg-card/90 hover:border-border-strong hover:bg-card"
      )}
    >
      <div>
        {/* Top Metadata Row: Catalog Code / Phase + Role + Bookmark */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {placement ? (
              <Badge variant="phase">Resource {placement.catalogCode}</Badge>
            ) : (
              <Badge variant="phase">{phasesLabel}</Badge>
            )}

            {placement ? (
              <ResourceRoleBadge
                role={placement.role}
                isRecommendedStart={placement.isRecommendedStart}
              />
            ) : resource.isRecommended ? (
              <Badge variant="terracotta" className="font-mono text-[11px]">
                <Sparkles className="size-3" />
                <span>Recommended Start</span>
              </Badge>
            ) : null}

            <ResourceTypeBadge
              type={resource.resourceType}
              subtitle={resource.formatSubtitle}
            />
          </div>

          <BookmarkButton
            resourceTitle={resource.title}
            isBookmarked={isBookmarked}
            onToggle={() => onToggleBookmark(resource.id)}
          />
        </div>

        {/* Provider & Title */}
        <div className="mt-3.5 space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <ProviderLabel
              provider={resource.provider}
              monogram={resource.providerMonogram}
            />
            <div className="flex items-center gap-1.5">
              <Badge variant="muted" className="text-[11px]">
                {resource.difficultyLabel}
              </Badge>
              <AccessTierBadge accessTier={resource.accessTier} />
            </div>
          </div>

          <h3 className="font-serif text-lg font-semibold leading-snug tracking-tight text-foreground group-hover:text-terracotta-strong sm:text-xl">
            <Link
              href={`/courses/${resource.slug}`}
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {displayTitle}
            </Link>
          </h3>

          {placement?.phaseSpecificTitle &&
          placement.phaseSpecificTitle !== resource.title ? (
            <p className="font-mono text-[11px] text-muted-foreground">
              Canonical Series: {resource.title}
            </p>
          ) : null}
        </div>

        {/* Description */}
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {resource.description}
        </p>

        {/* Phase-Specific Guidance Note when inside a phase group */}
        {placement ? (
          <div className="mt-3.5 rounded-lg border border-border bg-surface-subtle p-3 text-xs leading-relaxed">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-terracotta-strong uppercase">
              Phase {placement.phase} Study Focus:{" "}
            </span>
            <span className="text-foreground/90">{placement.phaseGuidance}</span>
          </div>
        ) : resource.phases.length > 1 ? (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[11px] text-muted-foreground">
              Used across:
            </span>
            {resource.phasePlacements.map((p) => (
              <span
                key={p.catalogCode}
                className="rounded border border-border bg-surface-subtle px-2 py-0.5 font-mono text-[11px] text-foreground"
              >
                Phase {p.phase} ({p.catalogCode})
              </span>
            ))}
          </div>
        ) : null}

        {/* Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded border border-border/80 bg-surface-subtle px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Controls: Status Selector + Detail Link + External URL */}
      <div className="mt-5 space-y-3 border-t border-border pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[11px] text-muted-foreground">
            Your Status:
          </span>
          <CourseStatusSelector
            resourceTitle={resource.title}
            status={status}
            onChangeStatus={(nextStatus) =>
              onChangeStatus(resource.id, nextStatus)
            }
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <Button asChild variant="ghost" size="sm" className="h-8 px-2.5 text-xs">
            <Link href={`/courses/${resource.slug}`}>
              <span>Resource Details</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant={isFeaturedStart ? "terracotta" : "outline"}
            size="sm"
            className="h-8 text-xs"
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit original resource: ${resource.title} (${resource.provider})`}
            >
              <span>Visit Resource</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
