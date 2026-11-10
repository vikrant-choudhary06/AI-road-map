"use client";

import {
  Bookmark,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  FileCode2,
  FileText,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type {
  ProgressState,
  ResourceAccessTier,
  ResourceRoleInPhase,
  ResourceType,
} from "@/types";
import { ROLE_LABELS } from "@/data/courses";
import { cn } from "@/lib/utils";

/**
 * Displays a semantic badge and icon for each canonical ResourceType.
 * Never mislabels documentation, repositories, or papers as full courses.
 */
export function ResourceTypeBadge({
  type,
  subtitle,
  className,
}: {
  type: ResourceType;
  subtitle?: string;
  className?: string;
}) {
  const getIcon = () => {
    switch (type) {
      case "Full Course":
        return <GraduationCap className="size-3.5 text-terracotta" />;
      case "Video Lecture":
      case "Video Series":
        return <PlayCircle className="size-3.5 text-terracotta" />;
      case "Interactive Course":
        return <Terminal className="size-3.5 text-sage-strong" />;
      case "Tutorial":
        return <Code2 className="size-3.5 text-sage-strong" />;
      case "Textbook":
        return <BookOpen className="size-3.5 text-terracotta" />;
      case "Documentation":
        return <FileCode2 className="size-3.5 text-muted-foreground" />;
      case "GitHub Repository":
        return <Code2 className="size-3.5 text-foreground" />;
      case "Research Paper":
        return <FileText className="size-3.5 text-terracotta-strong" />;
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-mono text-[11px] font-medium", className)}
    >
      {getIcon()}
      <span>{subtitle ?? type}</span>
    </Badge>
  );
}

/**
 * Displays a pedagogical role badge inside a roadmap phase ("Start Here",
 * "Additional Learning", "Practice & Reference", "Advanced Reading").
 */
export function ResourceRoleBadge({
  role,
  isRecommendedStart,
}: {
  role: ResourceRoleInPhase;
  isRecommendedStart?: boolean;
}) {
  if (isRecommendedStart || role === "start_here") {
    return (
      <Badge variant="terracotta" className="font-mono text-[11px]">
        <Sparkles className="size-3" />
        <span>Start Here · Recommended</span>
      </Badge>
    );
  }

  if (role === "additional_learning") {
    return (
      <Badge variant="sage" className="font-mono text-[11px]">
        <span>{ROLE_LABELS[role]}</span>
      </Badge>
    );
  }

  return (
    <Badge variant="muted" className="font-mono text-[11px]">
      <span>{ROLE_LABELS[role]}</span>
    </Badge>
  );
}

/**
 * Displays accurate free-access vs. mixed-catalog information.
 */
export function AccessTierBadge({
  accessTier,
}: {
  accessTier: ResourceAccessTier;
}) {
  if (accessTier === "mixed_free_and_paid") {
    return (
      <Badge variant="warning" className="text-[11px]">
        <span>Mixed Free / Paid Catalog</span>
      </Badge>
    );
  }

  return (
    <Badge variant="success" className="text-[11px]">
      <span>Free Learning Material</span>
    </Badge>
  );
}

/**
 * Restrained typographic/geometric provider label.
 */
export function ProviderLabel({
  provider,
  monogram,
  className,
}: {
  provider: string;
  monogram: string;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-border-strong bg-surface-subtle font-mono text-[10px] font-bold tracking-tight text-foreground"
      >
        {monogram}
      </span>
      <span className="font-mono text-xs font-medium text-terracotta-strong">
        {provider}
      </span>
    </div>
  );
}

/**
 * Accessible bookmark toggle button with persistent state.
 */
export function BookmarkButton({
  resourceTitle,
  isBookmarked,
  onToggle,
  size = "icon-sm",
  showLabel = false,
  className,
}: {
  resourceTitle: string;
  isBookmarked: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "icon-sm";
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant={isBookmarked ? "secondary" : "outline"}
      size={showLabel ? "sm" : size}
      aria-pressed={isBookmarked}
      aria-label={
        isBookmarked
          ? `Remove bookmark for ${resourceTitle}`
          : `Bookmark ${resourceTitle}`
      }
      title={isBookmarked ? "Bookmarked (click to remove)" : "Save to Bookmarks"}
      onClick={onToggle}
      className={cn(
        isBookmarked &&
          "border-terracotta/45 bg-terracotta-subtle/60 text-terracotta-strong hover:bg-terracotta-subtle",
        className
      )}
    >
      <Bookmark
        className={cn(
          "size-3.5 transition-transform",
          isBookmarked && "fill-current"
        )}
      />
      {showLabel ? (
        <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
      ) : null}
    </Button>
  );
}

const STATUS_OPTIONS: {
  value: ProgressState;
  label: string;
  shortLabel: string;
}[] = [
  {
    value: "not_started",
    label: "Not Started",
    shortLabel: "Not Started",
  },
  {
    value: "in_progress",
    label: "In Progress",
    shortLabel: "Studying",
  },
  {
    value: "completed",
    label: "Completed",
    shortLabel: "Completed",
  },
];

/**
 * Segmented or compact status control allowing learners to mark a resource
 * as Not Started, In Progress, or Completed.
 */
export function CourseStatusSelector({
  resourceTitle,
  status,
  onChangeStatus,
  variant = "compact",
  className,
}: {
  resourceTitle: string;
  status: ProgressState;
  onChangeStatus: (nextStatus: ProgressState) => void;
  variant?: "compact" | "segmented";
  className?: string;
}) {
  if (variant === "segmented") {
    return (
      <div
        role="group"
        aria-label={`Learning status for ${resourceTitle}`}
        className={cn(
          "inline-flex flex-wrap items-center gap-1 rounded-lg border border-border-strong bg-surface-subtle p-1",
          className
        )}
      >
        {STATUS_OPTIONS.map((opt) => {
          const active = status === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChangeStatus(opt.value)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active
                  ? opt.value === "completed"
                    ? "bg-success text-white shadow-2xs"
                    : opt.value === "in_progress"
                      ? "bg-terracotta text-accent-foreground shadow-2xs"
                      : "bg-card text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.value === "completed" ? (
                <CheckCircle2 className="size-3.5" />
              ) : opt.value === "in_progress" ? (
                <Clock className="size-3.5" />
              ) : (
                <Circle className="size-3" />
              )}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={`Learning status for ${resourceTitle}`}
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-surface-subtle p-0.5",
        className
      )}
    >
      {STATUS_OPTIONS.map((opt) => {
        const active = status === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChangeStatus(opt.value)}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
              active
                ? opt.value === "completed"
                  ? "bg-success-subtle text-success-foreground border border-success/30 font-semibold"
                  : opt.value === "in_progress"
                    ? "bg-terracotta-subtle text-terracotta-strong border border-terracotta/30 font-semibold"
                    : "bg-card text-foreground border border-border-strong font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.value === "completed" ? (
              <CheckCircle2 className="size-3 text-success" />
            ) : opt.value === "in_progress" ? (
              <Clock className="size-3 text-terracotta" />
            ) : (
              <Circle className="size-2.5" />
            )}
            <span>{opt.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Reusable empty state component for search results or personal collection tabs.
 */
export function CourseEmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border-strong bg-card px-6 py-12 text-center shadow-2xs">
      <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-border bg-surface-subtle text-terracotta">
        <BookOpen className="size-5" />
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {actionLabel && onAction ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAction}
          className="mt-5"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
