"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  FolderGit2,
  ListChecks,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Badge, Card } from "@/components/ui";
import type { CurriculumProject } from "@/types";
import type { ProjectProgressMetrics } from "@/hooks/use-roadmap-progress";

interface ProjectCardProps {
  project: CurriculumProject;
  metrics: ProjectProgressMetrics;
  isRecommended?: boolean;
  onToggleBookmark: (projectId: string) => void;
}

export function ProjectCard({
  project,
  metrics,
  isRecommended = false,
  onToggleBookmark,
}: ProjectCardProps) {
  const statusBadgeVariant =
    metrics.status === "completed"
      ? "sage"
      : metrics.status === "in_progress"
        ? "terracotta"
        : "outline";

  const statusLabel =
    metrics.status === "completed"
      ? "Completed"
      : metrics.status === "in_progress"
        ? "In Progress"
        : "Not Started";

  return (
    <Card
      variant="default"
      padding="lg"
      className="flex h-full flex-col justify-between gap-5 transition-all hover:border-border-strong"
    >
      <div className="space-y-4">
        {/* Top Metadata Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center rounded-lg border border-border-strong bg-surface-soft px-2.5 py-0.5 font-mono text-xs font-semibold text-foreground">
              #{String(project.milestoneNumber).padStart(2, "0")}
            </span>
            <Badge variant="outline">Phase {project.phase}</Badge>
            <Badge variant="muted">{project.difficultyFilter}</Badge>
            {isRecommended && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-sage/60 px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                <Sparkles className="h-3 w-3 text-accent-terracotta" />
                Recommended
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onToggleBookmark(project.id)}
            aria-label={
              metrics.isBookmarked
                ? `Remove ${project.title} from bookmarks`
                : `Bookmark ${project.title}`
            }
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              metrics.isBookmarked
                ? "border-accent-terracotta/50 bg-accent-terracotta/12 text-accent-terracotta"
                : "border-border/80 bg-background text-foreground-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            <Bookmark
              className="h-4 w-4"
              fill={metrics.isBookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <Link href={`/projects/${project.slug}`} className="group block">
            <h3 className="font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-accent-terracotta">
              {project.title}
            </h3>
          </Link>
          <p className="text-sm leading-relaxed text-foreground-secondary">
            {project.shortDescription}
          </p>
        </div>

        {/* Effort & Task Count */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-foreground-secondary" />
            {project.estimatedEffort}
          </span>
          <span className="inline-flex items-center gap-1">
            <ListChecks className="h-3.5 w-3.5 text-accent-terracotta" />
            {project.tasks.length} implementation steps
          </span>
          {metrics.hasGithubSubmission && (
            <span className="inline-flex items-center gap-1 rounded-md bg-accent-sage/50 px-2 py-0.5 font-medium text-foreground">
              <FolderGit2 className="h-3 w-3 text-accent-terracotta" />
              Repo Linked
            </span>
          )}
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/75 bg-surface-soft/50 px-2 py-0.5 font-mono text-[11px] text-foreground-secondary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md border border-border/60 bg-background px-2 py-0.5 font-mono text-[11px] text-foreground-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Progress & Action Row */}
      <div className="space-y-3.5 border-t border-border/70 pt-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Badge variant={statusBadgeVariant}>{statusLabel}</Badge>
              {metrics.isAllTasksCompleted &&
                !metrics.isConfirmedCompleted && (
                  <span className="text-[11px] font-medium text-accent-terracotta">
                    Ready to confirm
                  </span>
                )}
            </div>
            <span className="font-mono text-xs font-medium text-foreground-secondary">
              {metrics.completedTaskCount}/{metrics.totalTaskCount} (
              {metrics.percent}%)
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-soft">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                metrics.status === "completed"
                  ? "bg-foreground"
                  : "bg-accent-terracotta"
              }`}
              style={{ width: `${metrics.percent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/roadmap#phase-${project.phase}`}
            className="text-xs font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            View Phase {project.phase} Modules
          </Link>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border-strong bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface-soft"
          >
            {metrics.status === "completed" ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-terracotta" />
                <span>Review Build</span>
              </>
            ) : metrics.status === "in_progress" ? (
              <>
                <PlayCircle className="h-3.5 w-3.5 text-accent-terracotta" />
                <span>Continue Project</span>
              </>
            ) : (
              <span>Open Project Guide</span>
            )}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
