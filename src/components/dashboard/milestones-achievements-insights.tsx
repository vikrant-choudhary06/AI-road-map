"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Code2,
  Download,
  FileCheck,
  Lightbulb,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import type {
  AchievementDefinition,
  LearningInsightItem,
} from "@/types";
import { ALL_PRIMARY_MILESTONES, COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { getProjectById } from "@/data/projects";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toLocalDateKey } from "@/lib/date-utils";

export interface MilestoneOverviewProps {
  isMilestoneCompleted: (milestoneId: string) => boolean;
  onToggleMilestone: (milestoneId: string, phaseId?: string) => void;
}

export function MilestoneOverview({
  isMilestoneCompleted,
  onToggleMilestone,
}: MilestoneOverviewProps) {
  const { getProjectProgress, projectCatalogMetrics } =
    useRoadmapProgress();

  const [filterMode, setFilterMode] = useState<
    "all" | "in_progress" | "completed" | "planned"
  >("all");

  const completedCount = ALL_PRIMARY_MILESTONES.filter((m) =>
    isMilestoneCompleted(m.id)
  ).length;

  const filteredMilestones = ALL_PRIMARY_MILESTONES.filter((m) => {
    const fullProject = getProjectById(m.id);
    const metrics = fullProject ? getProjectProgress(fullProject) : null;
    const completed = isMilestoneCompleted(m.id);
    if (filterMode === "completed") return completed;
    if (filterMode === "in_progress")
      return metrics?.status === "in_progress";
    if (filterMode === "planned")
      return !completed && metrics?.status !== "in_progress";
    return true;
  });

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              14 Canonical Implementation Milestones
            </p>
            <Badge variant="outline">
              {projectCatalogMetrics.completedTasksCount} /{" "}
              {projectCatalogMetrics.totalTasksCount} Steps (
              {projectCatalogMetrics.overallTaskPercent}%)
            </Badge>
          </div>
          <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Project Milestones Overview ({completedCount} /{" "}
            {ALL_PRIMARY_MILESTONES.length} Completed)
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Track hands-on engineering progress across all 14 projects from
            Matrix Operations to Research Reproduction.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border/80 bg-background p-1">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterMode === "all"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({ALL_PRIMARY_MILESTONES.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("in_progress")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterMode === "in_progress"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            In Progress ({projectCatalogMetrics.inProgressCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("planned")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterMode === "planned"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Not Started ({projectCatalogMetrics.notStartedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("completed")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterMode === "completed"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filteredMilestones.map((milestone) => {
          const completed = isMilestoneCompleted(milestone.id);
          const fullProject = getProjectById(milestone.id);
          const metrics = fullProject ? getProjectProgress(fullProject) : null;
          const phaseObj = COMPLETE_ROADMAP_PHASES.find(
            (p) => p.phase === milestone.phase
          );
          const prereqText =
            milestone.phase === 0
              ? "None (Beginner entry point)"
              : `Phase ${milestone.phase - 1} foundations & ${milestone.skillsPracticed.slice(0, 2).join(", ")}`;

          const statusBadge =
            metrics?.status === "completed"
              ? "Completed"
              : metrics?.status === "in_progress"
                ? "In Progress"
                : "Not Started";

          return (
            <div
              key={milestone.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-colors ${
                completed
                  ? "border-primary/45 bg-surface-soft/50"
                  : metrics?.status === "in_progress"
                    ? "border-accent-terracotta/40 bg-surface-soft/30"
                    : "border-border/80 bg-background/60 hover:border-border"
              }`}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      MILESTONE #{String(milestone.milestoneNumber).padStart(2, "0")}
                    </span>
                    <Badge variant="outline">Phase {milestone.phase}</Badge>
                    {metrics?.hasGithubSubmission && (
                      <Badge variant="sage">Repo Linked</Badge>
                    )}
                  </div>
                  <Badge
                    variant={
                      statusBadge === "Completed"
                        ? "sage"
                        : statusBadge === "In Progress"
                          ? "terracotta"
                          : "outline"
                    }
                  >
                    {statusBadge}
                  </Badge>
                </div>

                <h3 className="font-serif text-base font-semibold text-foreground">
                  {fullProject ? (
                    <Link
                      href={`/projects/${fullProject.slug}`}
                      className="transition-colors hover:text-accent-terracotta"
                    >
                      {milestone.title}
                    </Link>
                  ) : (
                    milestone.title
                  )}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {milestone.shortDescription}
                </p>

                {/* Live Task Progress Bar */}
                {metrics && (
                  <div className="rounded-lg border border-border/70 bg-surface-subtle p-2.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">
                        Implementation Tasks
                      </span>
                      <span className="font-mono font-medium text-foreground">
                        {metrics.completedTaskCount} / {metrics.totalTaskCount}{" "}
                        steps ({metrics.percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-terracotta transition-all duration-300"
                        style={{ width: `${metrics.percent}%` }}
                      />
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-muted-foreground">
                  <strong className="font-medium text-foreground">
                    Prerequisites:
                  </strong>{" "}
                  {prereqText}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
                <Button
                  type="button"
                  variant={completed ? "outline" : "secondary"}
                  size="sm"
                  onClick={() =>
                    onToggleMilestone(
                      milestone.id,
                      phaseObj?.id ?? `phase-${milestone.phase}`
                    )
                  }
                  className="h-7 px-2.5 text-xs"
                >
                  <CheckCircle2 className="size-3.5 text-primary" />
                  <span>
                    {completed ? "Completed (Undo)" : "Mark Milestone Built"}
                  </span>
                </Button>

                {fullProject ? (
                  <Link
                    href={`/projects/${fullProject.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>
                      {metrics?.status === "in_progress"
                        ? "Continue Project"
                        : "Open Project Guide"}
                    </span>
                    <ArrowRight className="size-3" />
                  </Link>
                ) : (
                  <Link
                    href={`/roadmap#${phaseObj?.slug ?? `phase-${milestone.phase}`}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    <Code2 className="size-3.5" />
                    <span>Phase {milestone.phase} Spec</span>
                    <ArrowRight className="size-3" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface AchievementListProps {
  achievements: AchievementDefinition[];
}

export function AchievementList({ achievements }: AchievementListProps) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Deterministic Milestones
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              Learning Achievements ({unlockedCount} / {achievements.length})
            </h2>
          </div>
          <Badge variant="sage">
            <Award className="mr-1 size-3.5" />
            {unlockedCount} Unlocked
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`flex flex-col justify-between rounded-xl border p-3.5 transition-colors ${
                ach.unlocked
                  ? "border-primary/55 bg-surface-soft/65 shadow-2xs"
                  : "border-border/70 bg-background/50 opacity-85"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex size-7 items-center justify-center rounded-lg border ${
                      ach.unlocked
                        ? "border-primary/40 bg-primary text-primary-foreground"
                        : "border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    {ach.unlocked ? (
                      <Award className="size-4" />
                    ) : (
                      <Lock className="size-3.5" />
                    )}
                  </span>
                  <Badge variant={ach.unlocked ? "sage" : "outline"}>
                    {ach.unlocked ? "Unlocked" : ach.progressText}
                  </Badge>
                </div>

                <h3 className="font-serif text-sm font-semibold text-foreground">
                  {ach.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {ach.description}
                </p>
              </div>

              <div className="mt-2.5 border-t border-border/50 pt-2 text-[10px] text-muted-foreground">
                Condition:{" "}
                <strong className="font-medium text-foreground">
                  {ach.conditionLabel}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
        Unlocked strictly from verified roadmap, course, session, and streak
        actions.
      </div>
    </div>
  );
}

export interface LearningInsightsProps {
  insights: LearningInsightItem[];
}

export function LearningInsights({ insights }: LearningInsightsProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Data-Backed Curriculum Guidance
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              Helpful Learning Insights
            </h2>
          </div>
          <Badge variant="outline">
            <Lightbulb className="mr-1 size-3.5 text-accent" />
            Factual Summary
          </Badge>
        </div>

        <div className="mt-4 space-y-3">
          {insights.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border/80 bg-background/70 p-4"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                  {item.href && item.ctaLabel ? (
                    <div className="pt-1.5">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        <span>{item.ctaLabel}</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
        Insights are calculated deterministically from your stored progress—no
        speculative AI scoring.
      </div>
    </div>
  );
}

export interface DashboardDataControlsProps {
  isStoragePersistent: boolean;
  onResetStudyGoal: () => void;
  onClearStudySessions: () => void;
  onClearPlannerTasks: () => void;
  onResetDashboardPreferencesOnly: () => void;
  onResetAllProgress: () => void;
  onExportBackupJson: () => string;
  onImportBackupJson: (
    rawJson: string,
    mode: "merge" | "replace"
  ) => { ok: boolean; message: string };
}

interface PendingImportPreview {
  fileName: string;
  fileSizeBytes: number;
  schemaVersion: number;
  rawJson: string;
  metrics: {
    topicsCount: number;
    readinessCount: number;
    milestonesCount: number;
    coursesCount: number;
    projectTasksCount: number;
    linkedReposCount: number;
    notesCount: number;
    sessionsCount: number;
    plannerTasksCount: number;
  };
}

export function DashboardDataControls({
  isStoragePersistent,
  onResetStudyGoal,
  onClearStudySessions,
  onClearPlannerTasks,
  onResetDashboardPreferencesOnly,
  onResetAllProgress,
  onExportBackupJson,
  onImportBackupJson,
}: DashboardDataControlsProps) {
  const [confirmAction, setConfirmAction] = useState<
    | null
    | "goal"
    | "sessions"
    | "planner"
    | "preferences"
    | "all"
  >(null);
  const [importMode, setImportMode] = useState<"merge" | "replace">("merge");
  const [pendingImport, setPendingImport] =
    useState<PendingImportPreview | null>(null);
  const [replaceConfirmed, setReplaceConfirmed] = useState(false);
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDownloadBackup = () => {
    const jsonString = onExportBackupJson();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `open-ai-roadmap-backup-${toLocalDateKey()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setFeedback({
      ok: true,
      message: "Downloaded local JSON progress backup.",
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({
        ok: false,
        message: "File exceeds 2MB limit. Please upload a valid JSON backup.",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        (parsed as { schemaVersion?: unknown }).schemaVersion !== 1
      ) {
        setFeedback({
          ok: false,
          message:
            "Unsupported backup format: Expected AI Roadmap Schema v1 JSON.",
        });
        return;
      }

      const p = parsed as Record<string, unknown>;
      const topicsCount = Array.isArray(p.completedTopicIds)
        ? p.completedTopicIds.length
        : 0;
      const readinessCount = Array.isArray(p.completedReadinessCheckIds)
        ? p.completedReadinessCheckIds.length
        : 0;
      const milestonesCount = Array.isArray(p.completedMilestoneIds)
        ? p.completedMilestoneIds.length
        : 0;
      const coursesCount =
        p.resourceStatuses && typeof p.resourceStatuses === "object"
          ? Object.keys(p.resourceStatuses).length
          : 0;
      const projectTasksCount = Array.isArray(p.completedProjectTaskIds)
        ? p.completedProjectTaskIds.length
        : 0;
      const linkedReposCount =
        p.projectGithubSubmissions &&
        typeof p.projectGithubSubmissions === "object"
          ? Object.keys(p.projectGithubSubmissions).length
          : 0;
      const notesCount =
        p.projectNotes && typeof p.projectNotes === "object"
          ? Object.keys(p.projectNotes).length
          : 0;
      const sessionsCount = Array.isArray(p.studySessions)
        ? p.studySessions.length
        : 0;
      const plannerTasksCount = Array.isArray(p.plannerTasks)
        ? p.plannerTasks.length
        : 0;

      setPendingImport({
        fileName: file.name,
        fileSizeBytes: file.size,
        schemaVersion: (p.schemaVersion as number) ?? 1,
        rawJson: text,
        metrics: {
          topicsCount,
          readinessCount,
          milestonesCount,
          coursesCount,
          projectTasksCount,
          linkedReposCount,
          notesCount,
          sessionsCount,
          plannerTasksCount,
        },
      });
      setFeedback(null);
      setReplaceConfirmed(false);
    } catch {
      setFeedback({
        ok: false,
        message: "Failed to parse JSON file. Please ensure it is a valid backup.",
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleApplyImport = () => {
    if (!pendingImport) return;
    if (importMode === "replace" && !replaceConfirmed) {
      setFeedback({
        ok: false,
        message:
          "Please check the confirmation box before replacing all existing progress.",
      });
      return;
    }

    const result = onImportBackupJson(pendingImport.rawJson, importMode);
    setFeedback(result);
    setPendingImport(null);
    setReplaceConfirmed(false);
  };

  const executeConfirmedAction = () => {
    if (confirmAction === "goal") {
      onResetStudyGoal();
      setFeedback({
        ok: true,
        message: "Study goal reset to default Steady pace.",
      });
    } else if (confirmAction === "sessions") {
      onClearStudySessions();
      setFeedback({
        ok: true,
        message: "Study session history cleared. Roadmap & courses preserved.",
      });
    } else if (confirmAction === "planner") {
      onClearPlannerTasks();
      setFeedback({
        ok: true,
        message: "Study planner tasks cleared. Roadmap & courses preserved.",
      });
    } else if (confirmAction === "preferences") {
      onResetDashboardPreferencesOnly();
      setFeedback({
        ok: true,
        message: "Dashboard display preferences and study goal reset.",
      });
    } else if (confirmAction === "all") {
      onResetAllProgress();
      setFeedback({
        ok: true,
        message: "All roadmap, course, and dashboard data reset to clean state.",
      });
    }
    setConfirmAction(null);
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Local Persistence, Backup &amp; Scoped Controls
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Data Safety &amp; User Control
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Your progress is stored in your browser&apos;s{" "}
            <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[11px]">
              localStorage
            </code>
            . Export a portable JSON backup or reset individual dashboard
            sections without erasing your curriculum checklists.
          </p>
        </div>

        <Badge variant={isStoragePersistent ? "sage" : "terracotta"}>
          <ShieldCheck className="mr-1 size-3.5" />
          {isStoragePersistent
            ? "Browser Storage Active"
            : "In-Memory Fallback Mode"}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Backup Export & Import */}
        <div className="space-y-3.5 rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-6">
          <h3 className="font-serif text-base font-semibold text-foreground">
            Portable JSON Backup (Export / Import)
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Save a snapshot of your completed topics, course bookmarks, study
            sessions, and weekly tasks—or restore from a previous backup file.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadBackup}
            >
              <Download className="size-3.5" />
              <span>Export Progress JSON</span>
            </Button>

            <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-2 py-1 text-xs">
              <span className="text-muted-foreground">Import mode:</span>
              <button
                type="button"
                onClick={() => setImportMode("merge")}
                className={`rounded px-2 py-0.5 font-medium ${
                  importMode === "merge"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Merge
              </button>
              <button
                type="button"
                onClick={() => setImportMode("replace")}
                className={`rounded px-2 py-0.5 font-medium ${
                  importMode === "replace"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Replace
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="hidden"
              id="dashboard-backup-upload"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-3.5" />
              <span>Import Backup JSON</span>
            </Button>
          </div>

          {/* Pending Import Scope Preview */}
          {pendingImport && (
            <div className="mt-4 space-y-3 rounded-xl border border-accent-terracotta/40 bg-surface-soft/80 p-4">
              <div className="flex items-start justify-between gap-2 border-b border-border/70 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-accent-terracotta" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-terracotta">
                      Backup File Scope Preview
                    </span>
                  </div>
                  <h4 className="mt-1 font-serif text-sm font-semibold text-foreground">
                    {pendingImport.fileName}{" "}
                    <span className="font-mono text-xs font-normal text-muted-foreground">
                      ({Math.round(pendingImport.fileSizeBytes / 1024)} KB ·
                      Schema v{pendingImport.schemaVersion})
                    </span>
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingImport(null)}
                  className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Cancel import preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Topics Done</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.topicsCount}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Milestones</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.milestonesCount}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Project Tasks</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.projectTasksCount}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Linked Repos</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.linkedReposCount}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Courses</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.coursesCount}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Study Sessions</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.sessionsCount}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Planner Tasks</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.plannerTasksCount}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-card p-2">
                  <span className="text-muted-foreground">Saved Notes</span>
                  <p className="font-serif text-base font-semibold text-foreground">
                    {pendingImport.metrics.notesCount}
                  </p>
                </div>
              </div>

              {/* Import Mode Selector & Confirmation */}
              <div className="space-y-2.5 rounded-lg border border-border/70 bg-background/80 p-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-foreground">
                    Choose Restoration Mode:
                  </span>
                  <div className="inline-flex rounded-lg border border-border p-0.5">
                    <button
                      type="button"
                      onClick={() => setImportMode("merge")}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        importMode === "merge"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Merge (Recommended)
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportMode("replace")}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        importMode === "replace"
                          ? "bg-terracotta text-white"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Replace All
                    </button>
                  </div>
                </div>

                <p className="leading-relaxed text-muted-foreground">
                  {importMode === "merge"
                    ? "Merge Mode unions the incoming topics, milestones, and courses with your current browser state without erasing existing work."
                    : "Replace Mode will completely overwrite your current progress with this backup snapshot."}
                </p>

                {importMode === "replace" && (
                  <label className="flex items-center gap-2 pt-1 font-medium text-terracotta cursor-pointer">
                    <input
                      type="checkbox"
                      checked={replaceConfirmed}
                      onChange={(e) => setReplaceConfirmed(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span>
                      I understand this will overwrite my current device progress
                    </span>
                  </label>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPendingImport(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleApplyImport}
                  disabled={importMode === "replace" && !replaceConfirmed}
                  className="gap-1.5"
                >
                  <Check className="size-3.5" />
                  <span>
                    Apply Import (
                    {importMode === "merge" ? "Merge" : "Replace"})
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Scoped Reset Controls */}
        <div className="space-y-3.5 rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-6">
          <h3 className="font-serif text-base font-semibold text-foreground">
            Scoped Dashboard Reset Controls
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Resetting a dashboard tool below preserves all of your roadmap topic
            checklists and course bookmarks unless you choose a full reset.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setConfirmAction("goal")}
              className="h-8 text-xs"
            >
              <RotateCcw className="size-3" />
              <span>Reset Study Goal Only</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setConfirmAction("sessions")}
              className="h-8 text-xs"
            >
              <RotateCcw className="size-3" />
              <span>Clear Study Sessions</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setConfirmAction("planner")}
              className="h-8 text-xs"
            >
              <RotateCcw className="size-3" />
              <span>Clear Planner Tasks</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setConfirmAction("preferences")}
              className="h-8 text-xs"
            >
              <RotateCcw className="size-3" />
              <span>Reset Dashboard Preferences</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setConfirmAction("all")}
              className="h-8 text-xs text-accent hover:text-foreground"
            >
              <AlertTriangle className="size-3.5" />
              <span>Full Reset All Platform Data</span>
            </Button>
          </div>

          {confirmAction ? (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/50 bg-surface-soft p-3 text-xs">
              <span className="font-medium text-foreground">
                {confirmAction === "all"
                  ? "Confirm full reset? This will clear all roadmap topics, courses, sessions, and planner tasks."
                  : `Confirm scoped reset (${confirmAction})? Your roadmap checklists and course statuses will remain intact.`}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={executeConfirmedAction}
                  className="h-7 px-2.5 text-xs"
                >
                  Confirm
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmAction(null)}
                  className="h-7 px-2 text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {feedback ? (
        <div
          className={`mt-4 rounded-xl border px-3.5 py-2.5 text-xs font-medium ${
            feedback.ok
              ? "border-primary/40 bg-surface-soft text-foreground"
              : "border-accent/50 bg-accent/10 text-foreground"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}
    </div>
  );
}
