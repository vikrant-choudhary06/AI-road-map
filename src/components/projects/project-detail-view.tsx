"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  FlaskConical,
  FolderGit2,
  HelpCircle,
  Layers,
  Lightbulb,
  ListChecks,
  PlayCircle,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trash2,
  Trophy,
} from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";
import { Container } from "@/components/layout";
import { ALL_CURRICULUM_PROJECTS, getProjectById } from "@/data/projects";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { getResourceById } from "@/data/courses";
import type { CurriculumProject } from "@/types";
import {
  isValidGithubRepoUrl,
  useRoadmapProgress,
} from "@/hooks/use-roadmap-progress";

interface ProjectDetailViewProps {
  project: CurriculumProject;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const {
    todayDateKey,
    getProjectProgress,
    isProjectTaskCompleted,
    toggleProjectTask,
    startProject,
    completeProject,
    revertProjectToInProgress,
    resetSingleProjectProgress,
    toggleProjectBookmark,
    recordVisitedProject,
    saveProjectGithubSubmission,
    removeProjectGithubSubmission,
    saveProjectNote,
    clearProjectNote,
  } = useRoadmapProgress();

  const metrics = getProjectProgress(project);

  // Record visited project on mount
  useEffect(() => {
    recordVisitedProject(project.id);
  }, [project.id, recordVisitedProject]);

  // Expandable Hints state
  const [openHintIds, setOpenHintIds] = useState<Record<string, boolean>>({});
  const [openTaskHintIds, setOpenTaskHintIds] = useState<
    Record<string, boolean>
  >({});

  // Copy code feedback state
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  // Mobile sticky summary toggle
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Reset confirmation state
  const [confirmingReset, setConfirmingReset] = useState(false);

  // GitHub submission form state
  const [isEditingRepo, setIsEditingRepo] = useState(false);
  const [repoUrlInput, setRepoUrlInput] = useState(
    metrics.githubSubmission?.repoUrl ?? ""
  );
  const [repoNotesInput, setRepoNotesInput] = useState(
    metrics.githubSubmission?.notes ?? ""
  );
  const [repoDateInput, setRepoDateInput] = useState(
    metrics.githubSubmission?.completedDateKey ?? todayDateKey
  );
  const [prevSubmission, setPrevSubmission] = useState(
    metrics.githubSubmission
  );
  const [repoFeedback, setRepoFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Sync GitHub submission inputs when persisted submission updates
  if (metrics.githubSubmission !== prevSubmission) {
    setPrevSubmission(metrics.githubSubmission);
    if (metrics.githubSubmission) {
      setRepoUrlInput(metrics.githubSubmission.repoUrl);
      setRepoNotesInput(metrics.githubSubmission.notes);
      setRepoDateInput(
        metrics.githubSubmission.completedDateKey ?? todayDateKey
      );
    } else {
      setRepoUrlInput("");
      setRepoNotesInput("");
      setRepoDateInput(todayDateKey);
    }
  }

  // Personal implementation notes state
  const [prevNoteContent, setPrevNoteContent] = useState(
    metrics.note?.content
  );
  const [noteDraft, setNoteDraft] = useState(metrics.note?.content ?? "");
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  // Sync personal notes draft when persisted note content updates
  if (metrics.note?.content !== prevNoteContent) {
    setPrevNoteContent(metrics.note?.content);
    setNoteDraft(metrics.note?.content ?? "");
  }

  // Resolve Phase, Related Modules, Related Courses, Related Projects, Prev/Next
  const phaseObj = COMPLETE_ROADMAP_PHASES.find(
    (p) => p.phase === project.phase
  );

  const relatedModules =
    phaseObj?.modules.filter((m) => project.relatedModuleIds.includes(m.id)) ??
    [];

  const relatedCourses = project.relatedResourceIds
    .map((id) => getResourceById(id))
    .filter((res): res is NonNullable<typeof res> => Boolean(res));

  const relatedProjects = project.relatedProjectIds
    .map((id) => getProjectById(id))
    .filter((p): p is CurriculumProject => Boolean(p));

  const currentIdx = ALL_CURRICULUM_PROJECTS.findIndex(
    (p) => p.id === project.id
  );
  const prevProject =
    currentIdx > 0 ? ALL_CURRICULUM_PROJECTS[currentIdx - 1] : null;
  const nextProject =
    currentIdx >= 0 && currentIdx < ALL_CURRICULUM_PROJECTS.length - 1
      ? ALL_CURRICULUM_PROJECTS[currentIdx + 1]
      : null;

  const taskMap = new Map(project.tasks.map((t) => [t.id, t] as const));

  const handleCopyCode = async (code: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeIdx(idx);
      setTimeout(() => setCopiedCodeIdx(null), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSaveGithubRepo = (e: React.FormEvent) => {
    e.preventDefault();
    const res = saveProjectGithubSubmission(project.id, {
      repoUrl: repoUrlInput,
      notes: repoNotesInput,
      completedDateKey: repoDateInput || todayDateKey,
    });
    if (res.ok) {
      setRepoFeedback({ type: "success", message: res.message });
      setIsEditingRepo(false);
    } else {
      setRepoFeedback({ type: "error", message: res.message });
    }
  };

  const handleSaveNote = () => {
    saveProjectNote(project.id, noteDraft);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

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
    <div className="min-h-screen bg-background pb-20">
      {/* Top Project Header */}
      <section className="border-b border-border/70 bg-gradient-to-b from-surface-soft/55 via-background to-background pt-8 pb-10 sm:pt-12">
        <Container className="space-y-6">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-secondary">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent-terracotta"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>All 14 Projects</span>
              </Link>
              <span className="text-foreground-muted">/</span>
              {phaseObj && (
                <>
                  <Link
                    href={`/roadmap#${phaseObj.slug}`}
                    className="hover:text-foreground"
                  >
                    Phase {phaseObj.phase}: {phaseObj.title}
                  </Link>
                  <span className="text-foreground-muted">/</span>
                </>
              )}
              <span className="font-mono text-foreground-muted">
                Milestone #{project.milestoneNumber}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleProjectBookmark(project.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors ${
                  metrics.isBookmarked
                    ? "border-accent-terracotta bg-accent-terracotta/12 text-accent-terracotta"
                    : "border-border bg-surface-elevated text-foreground-secondary hover:text-foreground"
                }`}
              >
                <Bookmark
                  className="h-3.5 w-3.5"
                  fill={metrics.isBookmarked ? "currentColor" : "none"}
                />
                <span>{metrics.isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>
            </div>
          </div>

          {/* Title, Subtitle, Metadata & Quick Status */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="space-y-4 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-lg border border-border-strong bg-surface-soft px-2.5 py-1 font-mono text-xs font-semibold text-foreground">
                  Milestone #{String(project.milestoneNumber).padStart(2, "0")}
                </span>
                <Badge variant={statusBadgeVariant}>{statusLabel}</Badge>
                <Badge variant="outline">Phase {project.phase}</Badge>
                <Badge variant="muted">{project.difficultyLabel}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-foreground-secondary">
                  <Clock className="h-3.5 w-3.5" />
                  {project.estimatedEffort}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-foreground-secondary">
                  <ListChecks className="h-3.5 w-3.5 text-accent-terracotta" />
                  {project.tasks.length} required tasks
                </span>
              </div>

              <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p className="text-base leading-relaxed text-foreground-secondary sm:text-lg">
                {project.subtitle}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border/80 bg-surface-elevated px-2.5 py-1 font-mono text-xs text-foreground-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Status & Progress Card */}
            <div className="lg:col-span-4">
              <Card
                variant="default"
                padding="md"
                className="space-y-3.5 border-border-strong/80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-foreground-muted uppercase">
                    Build Progress
                  </span>
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {metrics.completedTaskCount} / {metrics.totalTaskCount}{" "}
                    tasks ({metrics.percent}%)
                  </span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-soft">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      metrics.status === "completed"
                        ? "bg-foreground"
                        : "bg-accent-terracotta"
                    }`}
                    style={{ width: `${metrics.percent}%` }}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {metrics.status === "not_started" && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() => startProject(project.id)}
                    >
                      <PlayCircle className="h-4 w-4" />
                      Start Project
                    </Button>
                  )}

                  {metrics.status === "in_progress" && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() => completeProject(project.id)}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {metrics.isAllTasksCompleted
                        ? "Confirm Project Completion"
                        : "Complete All Tasks & Finish Project"}
                    </Button>
                  )}

                  {metrics.status === "completed" && (
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent-terracotta" />
                        Project Milestone Completed
                      </span>
                      <button
                        type="button"
                        onClick={() => revertProjectToInProgress(project.id)}
                        className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-foreground-secondary hover:bg-surface-soft hover:text-foreground"
                      >
                        Mark In Progress
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Special Educational Scale or Security Banners (Projects 11 & 13) */}
          {project.educationalScaleNote && (
            <div className="flex items-start gap-3 rounded-2xl border border-accent-terracotta/40 bg-accent-terracotta/8 p-4">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent-terracotta" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-foreground">
                  Hardware-Matched Educational Model Scales (MyLLM v1)
                </p>
                <p className="leading-relaxed text-foreground-secondary">
                  {project.educationalScaleNote}
                </p>
              </div>
            </div>
          )}

          {project.securityRequirementsNote && (
            <div className="flex items-start gap-3 rounded-2xl border border-border-strong bg-surface-soft/70 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-terracotta" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-foreground">
                  Production Inference Security &amp; Reliability Requirements
                </p>
                <p className="leading-relaxed text-foreground-secondary">
                  {project.securityRequirementsNote}
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Mobile Collapsible Progress & Section Jump Bar */}
      <div className="sticky top-16 z-20 border-b border-border bg-surface-elevated/95 backdrop-blur-md lg:hidden">
        <Container className="py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <span className="font-mono font-semibold text-accent-terracotta">
                {metrics.percent}%
              </span>
              <span>
                ({metrics.completedTaskCount}/{metrics.totalTaskCount} steps)
              </span>
              <Badge variant={statusBadgeVariant}>{statusLabel}</Badge>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-foreground-secondary"
            >
              <span>Sections</span>
              {mobileNavOpen ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {mobileNavOpen && (
            <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-border/70 pt-2.5 text-xs">
              {[
                { href: "#overview", label: "Overview & Math" },
                { href: "#tasks", label: "Task Checklist" },
                { href: "#code-examples", label: "Starter Code" },
                { href: "#testing-guide", label: "Testing Guide" },
                { href: "#hints", label: "Hints" },
                { href: "#stretch-challenges", label: "Stretch Challenges" },
                { href: "#github-submission", label: "GitHub Submission" },
                { href: "#personal-notes", label: "My Notes" },
              ].map((sec) => (
                <a
                  key={sec.href}
                  href={sec.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1 text-foreground-secondary hover:text-foreground"
                >
                  {sec.label}
                </a>
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* Main Content Layout: 8-col Documentation + 4-col Sticky Sidebar */}
      <Container className="pt-8 sm:pt-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 8 Columns: Full Project Specification & Interactive Workspace */}
          <div className="space-y-10 lg:col-span-8">
            {/* 1. Overview, Why It Matters, Objectives, Prerequisites & Math */}
            <section id="overview" className="scroll-mt-24 space-y-6">
              <Card variant="default" padding="lg" className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                    <BookOpen className="h-4 w-4" />
                    <span>Project Specification &amp; Architecture</span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    What You Will Build
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
                    {project.detailedOverview}
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-surface-soft/55 p-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    Why This Project Matters in the AI/LLM Stack
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-secondary">
                    {project.whyThisProjectMatters}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Learning Objectives */}
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-semibold text-foreground">
                      Learning Objectives
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground-secondary">
                      {project.learningObjectives.map((obj) => (
                        <li key={obj} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-terracotta" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prerequisites & Math Concepts */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        Prerequisites
                      </h3>
                      <ul className="space-y-1.5 text-xs text-foreground-secondary">
                        {project.prerequisites.map((prereq) => (
                          <li key={prereq} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-terracotta" />
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        Required Mathematical Concepts
                      </h3>
                      <ul className="space-y-1.5">
                        {project.requiredMathConcepts.map((mathItem) => (
                          <li
                            key={mathItem}
                            className="rounded-lg border border-border/75 bg-background px-2.5 py-1.5 font-mono text-xs text-foreground-secondary"
                          >
                            {mathItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* 2. Interactive Implementation Stages & Step-by-Step Task Checklist */}
            <section id="tasks" className="scroll-mt-24 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                    <ListChecks className="h-4 w-4" />
                    <span>Interactive Engineering Checklist</span>
                  </div>
                  <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                    Step-by-Step Implementation Tasks ({project.tasks.length}{" "}
                    Steps)
                  </h2>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    Check off each engineering task as your code passes its
                    acceptance criteria. Progress is saved automatically in your
                    browser.
                  </p>
                </div>

                {/* Reset single project progress */}
                {(metrics.completedTaskCount > 0 ||
                  metrics.isStartedManually ||
                  metrics.isConfirmedCompleted) && (
                  <div>
                    {!confirmingReset ? (
                      <button
                        type="button"
                        onClick={() => setConfirmingReset(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground-secondary hover:text-foreground"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Reset Checklist</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 rounded-xl border border-accent-terracotta/50 bg-accent-terracotta/10 px-3 py-1.5 text-xs">
                        <span className="font-medium text-foreground">
                          Reset all {project.tasks.length} tasks?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            resetSingleProjectProgress(project.id);
                            setConfirmingReset(false);
                          }}
                          className="rounded-md bg-accent-terracotta px-2 py-0.5 font-semibold text-white"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingReset(false)}
                          className="text-foreground-secondary hover:text-foreground"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Confirmation Callout when 100% of tasks are checked */}
              {metrics.isAllTasksCompleted && !metrics.isConfirmedCompleted && (
                <Card
                  variant="muted"
                  padding="md"
                  className="flex flex-col justify-between gap-4 border-accent-terracotta/50 sm:flex-row sm:items-center"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      All {project.tasks.length} implementation tasks are
                      checked!
                    </p>
                    <p className="text-xs text-foreground-secondary">
                      Confirm project completion to unlock Milestone #
                      {project.milestoneNumber} on your Roadmap and Learning
                      Dashboard.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => completeProject(project.id)}
                    className="shrink-0 gap-1.5"
                  >
                    <Trophy className="h-4 w-4" />
                    Confirm Project Completion
                  </Button>
                </Card>
              )}

              {/* Stages Loop */}
              <div className="space-y-6">
                {project.implementationStages.map((stage) => {
                  const stageTasks = stage.taskIds
                    .map((id) => taskMap.get(id))
                    .filter(
                      (t): t is NonNullable<typeof t> => t !== undefined
                    );
                  const stageCompletedCount = stageTasks.filter((t) =>
                    isProjectTaskCompleted(t.id)
                  ).length;

                  return (
                    <Card
                      key={stage.stageNumber}
                      variant="default"
                      padding="lg"
                      className="space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              Stage {stage.stageNumber} of{" "}
                              {project.implementationStages.length}
                            </Badge>
                            <span className="font-mono text-xs text-foreground-muted">
                              {stageCompletedCount}/{stageTasks.length} tasks
                              complete
                            </span>
                          </div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {stage.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-foreground-secondary sm:text-sm">
                            {stage.summary}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {stageTasks.map((task) => {
                          const checked = isProjectTaskCompleted(task.id);
                          const taskHintOpen = Boolean(
                            openTaskHintIds[task.id]
                          );

                          return (
                            <div
                              key={task.id}
                              className={`rounded-xl border p-4 transition-colors ${
                                checked
                                  ? "border-border bg-surface-soft/45"
                                  : "border-border/80 bg-background hover:border-border-strong"
                              }`}
                            >
                              <div className="flex items-start gap-3.5">
                                <button
                                  type="button"
                                  role="checkbox"
                                  aria-checked={checked}
                                  onClick={() =>
                                    toggleProjectTask(project.id, task.id)
                                  }
                                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                    checked
                                      ? "border-accent-terracotta bg-accent-terracotta text-white"
                                      : "border-border-strong bg-surface-elevated hover:border-accent-terracotta"
                                  }`}
                                >
                                  {checked && <Check className="h-3.5 w-3.5" />}
                                </button>

                                <div className="min-w-0 flex-1 space-y-2.5">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        toggleProjectTask(project.id, task.id)
                                      }
                                      className="text-left"
                                    >
                                      <span className="mr-2 font-mono text-xs font-semibold text-accent-terracotta">
                                        Step {task.stepNumber}.
                                      </span>
                                      <span
                                        className={`text-sm font-semibold sm:text-base ${
                                          checked
                                            ? "line-through text-foreground-secondary"
                                            : "text-foreground"
                                        }`}
                                      >
                                        {task.title}
                                      </span>
                                    </button>

                                    {task.difficulty && (
                                      <Badge variant="outline">
                                        {task.difficulty}
                                      </Badge>
                                    )}
                                  </div>

                                  <p className="text-xs leading-relaxed text-foreground-secondary sm:text-sm">
                                    {task.explanation}
                                  </p>

                                  <div className="rounded-lg border border-border/70 bg-surface-elevated/90 p-3 text-xs space-y-1.5">
                                    <div>
                                      <span className="font-semibold text-foreground">
                                        Implementation:{" "}
                                      </span>
                                      <span className="text-foreground-secondary">
                                        {task.instructions}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-foreground">
                                        Expected Outcome:{" "}
                                      </span>
                                      <span className="text-foreground-secondary">
                                        {task.expectedOutcome}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-accent-terracotta">
                                        Acceptance Check:{" "}
                                      </span>
                                      <span className="font-mono text-[11px] text-foreground">
                                        {task.acceptanceCriteria}
                                      </span>
                                    </div>
                                  </div>

                                  {task.hint && (
                                    <div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setOpenTaskHintIds((prev) => ({
                                            ...prev,
                                            [task.id]: !prev[task.id],
                                          }))
                                        }
                                        className="inline-flex items-center gap-1 text-xs font-medium text-accent-terracotta hover:underline"
                                      >
                                        <Lightbulb className="h-3.5 w-3.5" />
                                        <span>
                                          {taskHintOpen
                                            ? "Hide Step Hint"
                                            : "Show Step Hint"}
                                        </span>
                                      </button>
                                      {taskHintOpen && (
                                        <p className="mt-1.5 rounded-lg border border-accent-terracotta/30 bg-accent-terracotta/8 p-2.5 text-xs text-foreground-secondary">
                                          {task.hint}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 3. Starter / Reference Code Examples */}
            <section id="code-examples" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                <Terminal className="h-4 w-4" />
                <span>Reference Architecture &amp; Verification Code</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Starter &amp; Verification Code Examples
              </h2>

              <div className="space-y-4">
                {project.codeExamples.map((example, idx) => (
                  <Card
                    key={example.title}
                    variant="default"
                    padding="none"
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-soft/60 px-4 py-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {example.title}
                        </h3>
                        <p className="text-xs text-foreground-secondary">
                          {example.purpose}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(example.code, idx)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-soft"
                      >
                        {copiedCodeIdx === idx ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-accent-terracotta" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="overflow-x-auto bg-charcoal p-4 font-mono text-xs leading-relaxed text-ivory">
                      <code>{example.code}</code>
                    </pre>
                  </Card>
                ))}
              </div>
            </section>

            {/* 4. Testing & Verification Guide */}
            <section id="testing-guide" className="scroll-mt-24 space-y-4">
              <Card variant="default" padding="lg" className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                    <FlaskConical className="h-4 w-4" />
                    <span>Verification &amp; Acceptance Suite</span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    How to Test Your Implementation
                  </h2>
                  <p className="text-sm text-foreground-secondary">
                    {project.testingGuide.summary}
                  </p>
                </div>

                {project.testingGuide.verificationCommand && (
                  <div className="flex items-center justify-between rounded-xl border border-border-strong bg-surface-soft/60 px-4 py-2.5 font-mono text-xs text-foreground">
                    <span>$ {project.testingGuide.verificationCommand}</span>
                    <Badge variant="outline">Test Runner</Badge>
                  </div>
                )}

                <div className="grid gap-3.5 md:grid-cols-3">
                  {project.testingGuide.testCases.map((tc) => (
                    <div
                      key={tc.title}
                      className="rounded-xl border border-border/80 bg-background p-4 space-y-2"
                    >
                      <h3 className="text-sm font-semibold text-foreground">
                        {tc.title}
                      </h3>
                      <p className="text-xs text-foreground-secondary">
                        {tc.purpose}
                      </p>
                      <div className="border-t border-border/60 pt-2 text-xs space-y-1">
                        <p className="text-foreground-secondary">
                          <strong className="text-foreground">Steps: </strong>
                          {tc.verificationSteps}
                        </p>
                        <p className="text-foreground-secondary">
                          <strong className="text-accent-terracotta">
                            Pass Criteria:{" "}
                          </strong>
                          {tc.expectedResult}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Project-level Acceptance Criteria */}
                <div className="rounded-xl border border-border/80 bg-surface-soft/45 p-4 space-y-2">
                  <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                    Overall Project Acceptance Criteria
                  </h3>
                  <ul className="space-y-1.5 text-xs text-foreground-secondary sm:text-sm">
                    {project.acceptanceCriteria.map((crit) => (
                      <li key={crit} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-terracotta" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </section>

            {/* 5. Expandable Hints & Debugging Guidance */}
            <section id="hints" className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                <HelpCircle className="h-4 w-4" />
                <span>Progressive Spoiler-Free Guidance</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Expandable Hints &amp; Debugging Tips
              </h2>
              <p className="text-sm text-foreground-secondary">
                Try implementing each stage on your own first. Expand a hint
                below if you want to verify tensor shapes, mathematical
                identities, or common edge cases.
              </p>

              <div className="space-y-3">
                {project.hints.map((hint) => {
                  const isOpen = Boolean(openHintIds[hint.id]);
                  return (
                    <Card
                      key={hint.id}
                      variant="default"
                      padding="md"
                      className="space-y-2"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenHintIds((prev) => ({
                            ...prev,
                            [hint.id]: !prev[hint.id],
                          }))
                        }
                        className="flex w-full items-center justify-between gap-3 text-left"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="muted">{hint.category}</Badge>
                          <span className="text-sm font-semibold text-foreground">
                            {hint.title}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-foreground-muted" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-foreground-muted" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="border-t border-border/70 pt-3 text-sm leading-relaxed text-foreground-secondary">
                          {hint.content}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 6. Optional Stretch Challenges (Do Not Block Completion) */}
            <section id="stretch-challenges" className="scroll-mt-24 space-y-4">
              <Card variant="muted" padding="lg" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                      <Sparkles className="h-4 w-4" />
                      <span>Optional Bonus Extensions</span>
                    </div>
                    <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                      Optional Stretch Challenges
                    </h2>
                  </div>
                  <Badge variant="outline">
                    Optional · Does Not Block Completion
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.optionalChallenges.map((ch) => (
                    <div
                      key={ch.id}
                      className="rounded-xl border border-border/80 bg-surface-elevated p-4 space-y-2"
                    >
                      <h3 className="text-sm font-semibold text-foreground">
                        {ch.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-foreground-secondary">
                        {ch.description}
                      </p>
                      <p className="text-xs text-foreground">
                        <strong className="text-accent-terracotta">
                          What You Learn:{" "}
                        </strong>
                        {ch.whatYouLearn}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 7. Expected Deliverables & Learning Outcomes */}
            <section id="deliverables" className="scroll-mt-24 space-y-6">
              <Card variant="default" padding="lg" className="space-y-6">
                <div className="space-y-2">
                  <Badge variant="terracotta">Expected Deliverable</Badge>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    What Your Completed Repository Should Contain
                  </h2>
                  <p className="text-sm text-foreground-secondary">
                    {project.expectedDeliverable}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-semibold text-foreground">
                      Deliverable Artifacts
                    </h3>
                    <ul className="space-y-2 text-xs text-foreground-secondary sm:text-sm">
                      {project.deliverablesList.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-terracotta" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-sm font-semibold text-foreground">
                      After Completing This Project, You Should Be Able To...
                    </h3>
                    <ul className="space-y-2 text-xs text-foreground-secondary sm:text-sm">
                      {project.learningOutcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-terracotta" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* 8. Self-Reported GitHub Repository Submission Section */}
            <section id="github-submission" className="scroll-mt-24">
              <Card variant="default" padding="lg" className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="h-4 w-4 text-accent-terracotta" />
                      <span className="text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                        Portfolio &amp; Repository Tracking
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground">
                      GitHub Repository Submission
                    </h2>
                    <p className="text-xs text-foreground-secondary sm:text-sm">
                      Link your public or private GitHub repository URL to keep
                      a structured portfolio of your from-scratch AI builds.
                      Stored locally in your browser (self-reported; no GitHub
                      tokens or remote code execution).
                    </p>
                  </div>

                  <Badge
                    variant={metrics.hasGithubSubmission ? "sage" : "outline"}
                  >
                    Status:{" "}
                    {metrics.hasGithubSubmission ? "Linked" : "Not Linked"}
                  </Badge>
                </div>

                {/* Recommended Repo Structure & README Checklist */}
                <div className="grid gap-4 rounded-xl border border-border/80 bg-surface-soft/45 p-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground">
                      Suggested Repository:{" "}
                      <code className="rounded bg-background px-1.5 py-0.5 font-mono text-accent-terracotta">
                        {project.githubSubmissionGuidance.suggestedRepoName}
                      </code>
                    </p>
                    <p className="text-xs font-medium text-foreground-secondary">
                      Recommended Directory Layout:
                    </p>
                    <pre className="rounded-lg border border-border/70 bg-background p-2.5 font-mono text-[11px] leading-relaxed text-foreground-secondary">
                      {project.githubSubmissionGuidance.recommendedStructure.join(
                        "\n"
                      )}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground">
                      Recommended README Documentation Checklist
                    </p>
                    <ul className="space-y-1.5 text-xs text-foreground-secondary">
                      {project.githubSubmissionGuidance.readmeChecklist.map(
                        (item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-terracotta" />
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Display Linked Repo OR Submission Form */}
                {metrics.githubSubmission && !isEditingRepo ? (
                  <div className="rounded-xl border border-border-strong bg-surface-soft/60 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <a
                        href={metrics.githubSubmission.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-accent-terracotta hover:underline"
                      >
                        <FolderGit2 className="h-4 w-4" />
                        <span>{metrics.githubSubmission.repoUrl}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      {metrics.githubSubmission.completedDateKey && (
                        <span className="font-mono text-xs text-foreground-muted">
                          Completed: {metrics.githubSubmission.completedDateKey}
                        </span>
                      )}
                    </div>

                    {metrics.githubSubmission.notes && (
                      <p className="text-xs leading-relaxed text-foreground-secondary">
                        {metrics.githubSubmission.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingRepo(true);
                          setRepoFeedback(null);
                        }}
                        className="rounded-lg border border-border-strong bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-soft"
                      >
                        Edit Repository Link
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          removeProjectGithubSubmission(project.id);
                          setRepoFeedback({
                            type: "success",
                            message: "Removed linked GitHub repository.",
                          });
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-secondary hover:text-foreground"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveGithubRepo} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2 space-y-1.5">
                        <label
                          htmlFor="github-repo-url"
                          className="block text-xs font-semibold text-foreground"
                        >
                          GitHub Repository URL
                        </label>
                        <input
                          id="github-repo-url"
                          type="url"
                          value={repoUrlInput}
                          onChange={(e) => {
                            setRepoUrlInput(e.target.value);
                            setRepoFeedback(null);
                          }}
                          placeholder={`https://github.com/your-username/${project.githubSubmissionGuidance.suggestedRepoName}`}
                          required
                          className="h-10 w-full rounded-xl border border-border bg-background px-3.5 font-mono text-xs text-foreground placeholder:text-foreground-muted focus:border-accent-terracotta focus:outline-none"
                        />
                        {repoUrlInput.trim().length > 0 &&
                          !isValidGithubRepoUrl(repoUrlInput) && (
                            <p className="flex items-center gap-1 text-[11px] text-accent-terracotta">
                              <AlertTriangle className="h-3 w-3" />
                              Format must be{" "}
                              <code>https://github.com/owner/repository</code>
                            </p>
                          )}
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="github-repo-date"
                          className="block text-xs font-semibold text-foreground"
                        >
                          Completion Date (Optional)
                        </label>
                        <input
                          id="github-repo-date"
                          type="date"
                          value={repoDateInput}
                          onChange={(e) => setRepoDateInput(e.target.value)}
                          className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-accent-terracotta focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="github-repo-notes"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Implementation Summary / Benchmark Notes (Optional)
                      </label>
                      <textarea
                        id="github-repo-notes"
                        rows={2}
                        value={repoNotesInput}
                        onChange={(e) => setRepoNotesInput(e.target.value)}
                        placeholder="e.g., Passed all pytest gradient checks; achieved 98.1% test accuracy / 2.14 validation perplexity."
                        className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-foreground-muted focus:border-accent-terracotta focus:outline-none"
                      />
                    </div>

                    {repoFeedback && (
                      <p
                        className={`text-xs font-medium ${
                          repoFeedback.type === "error"
                            ? "text-accent-terracotta"
                            : "text-foreground"
                        }`}
                      >
                        {repoFeedback.message}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="gap-1.5"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Repository Link</span>
                      </Button>
                      {isEditingRepo && (
                        <button
                          type="button"
                          onClick={() => setIsEditingRepo(false)}
                          className="rounded-xl border border-border px-3 py-1.5 text-xs font-medium text-foreground-secondary hover:text-foreground"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </Card>
            </section>

            {/* 9. Personal Implementation Notes */}
            <section id="personal-notes" className="scroll-mt-24">
              <Card variant="default" padding="lg" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-terracotta uppercase">
                      <FileText className="h-4 w-4" />
                      <span>Local Engineering Notebook</span>
                    </div>
                    <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                      Personal Implementation Notes
                    </h2>
                  </div>
                  {metrics.note && (
                    <span className="font-mono text-[11px] text-foreground-muted">
                      Saved locally in browser
                    </span>
                  )}
                </div>

                <textarea
                  rows={5}
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Record your tensor shape calculations, hyperparameter experiments, loss curves, or debugging notes for this project..."
                  aria-label="Personal implementation notes"
                  className="w-full rounded-xl border border-border bg-background p-3.5 text-sm leading-relaxed text-foreground placeholder:text-foreground-muted focus:border-accent-terracotta focus:outline-none"
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleSaveNote}
                      className="gap-1.5"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Notes</span>
                    </Button>
                    {metrics.note && (
                      <button
                        type="button"
                        onClick={() => {
                          clearProjectNote(project.id);
                          setNoteDraft("");
                        }}
                        className="inline-flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-secondary hover:text-foreground"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Clear</span>
                      </button>
                    )}
                  </div>

                  {noteSavedFeedback && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-terracotta">
                      <Check className="h-3.5 w-3.5" />
                      Notes saved to localStorage
                    </span>
                  )}
                </div>
              </Card>
            </section>

            {/* 10. Related Roadmap Modules, Free Courses & Related Projects */}
            <section className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Related Roadmap Modules */}
                <Card variant="muted" padding="md" className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-foreground uppercase">
                    <Layers className="h-4 w-4 text-accent-terracotta" />
                    <span>Related Phase {project.phase} Modules</span>
                  </div>
                  <div className="space-y-2">
                    {relatedModules.map((mod) => (
                      <Link
                        key={mod.id}
                        href={`/roadmap#phase-${project.phase}`}
                        className="block rounded-xl border border-border/80 bg-surface-elevated p-3 transition-colors hover:border-border-strong"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-semibold text-accent-terracotta">
                            Module {mod.code}
                          </span>
                          <span className="text-foreground-muted">
                            {mod.topics.length} topics
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {mod.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </Card>

                {/* Related Stage 4 Courses */}
                <Card variant="muted" padding="md" className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-foreground uppercase">
                    <BookOpen className="h-4 w-4 text-accent-terracotta" />
                    <span>Recommended Free Courses &amp; Papers</span>
                  </div>
                  <div className="space-y-2">
                    {relatedCourses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/courses/${course.slug}`}
                        className="block rounded-xl border border-border/80 bg-surface-elevated p-3 transition-colors hover:border-border-strong"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground-secondary">
                            {course.provider}
                          </span>
                          <Badge variant="outline">{course.resourceType}</Badge>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {course.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <Card variant="default" padding="md" className="space-y-3">
                  <h3 className="text-xs font-semibold tracking-wider text-foreground-muted uppercase">
                    Connected Projects in the Curriculum
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedProjects.map((rel) => {
                      const relMetrics = getProjectProgress(rel);
                      return (
                        <Link
                          key={rel.id}
                          href={`/projects/${rel.slug}`}
                          className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-elevated p-3.5 transition-colors hover:border-border-strong"
                        >
                          <div>
                            <span className="font-mono text-xs text-accent-terracotta">
                              Project #{rel.milestoneNumber} · Phase {rel.phase}
                            </span>
                            <p className="text-sm font-semibold text-foreground">
                              {rel.title}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-foreground-secondary">
                            {relMetrics.percent}%
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              )}

              {/* Previous / Next Project Navigation */}
              <div className="grid gap-4 border-t border-border/70 pt-6 sm:grid-cols-2">
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface-elevated p-4 transition-colors hover:border-border-strong"
                  >
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1 text-xs text-foreground-muted">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Previous Project (#{prevProject.milestoneNumber})
                      </span>
                      <p className="font-serif text-base font-semibold text-foreground group-hover:text-accent-terracotta">
                        {prevProject.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface-elevated p-4 text-right transition-colors hover:border-border-strong"
                  >
                    <div className="ml-auto space-y-1">
                      <span className="inline-flex items-center gap-1 text-xs text-foreground-muted">
                        Next Project (#{nextProject.milestoneNumber})
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                      <p className="font-serif text-base font-semibold text-foreground group-hover:text-accent-terracotta">
                        {nextProject.title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </section>
          </div>

          {/* Right 4 Columns: Sticky Desktop Progress & Navigation Sidebar */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 space-y-5">
              {/* Live Checklist Summary Card */}
              <Card variant="default" padding="md" className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-foreground-muted uppercase">
                    Project Telemetry
                  </span>
                  <Badge variant={statusBadgeVariant}>{statusLabel}</Badge>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground-secondary">
                      Completed Steps
                    </span>
                    <span className="font-mono font-semibold text-foreground">
                      {metrics.completedTaskCount} / {metrics.totalTaskCount} (
                      {metrics.percent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-soft">
                    <div
                      className="h-full rounded-full bg-accent-terracotta transition-all duration-300"
                      style={{ width: `${metrics.percent}%` }}
                    />
                  </div>
                </div>

                {/* Stage breakdown mini-list */}
                <div className="space-y-1.5 border-t border-border/70 pt-3">
                  {project.implementationStages.map((st) => {
                    const done = st.taskIds.filter((id) =>
                      isProjectTaskCompleted(id)
                    ).length;
                    return (
                      <div
                        key={st.stageNumber}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="truncate text-foreground-secondary">
                          Stage {st.stageNumber}: {st.title}
                        </span>
                        <span className="ml-2 shrink-0 font-mono text-[11px] text-foreground">
                          {done}/{st.taskIds.length}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border/70 pt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground-secondary">
                      GitHub Repository
                    </span>
                    <span className="font-medium text-foreground">
                      {metrics.hasGithubSubmission ? "Linked" : "Not Linked"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground-secondary">
                      Personal Notes
                    </span>
                    <span className="font-medium text-foreground">
                      {metrics.note ? "Saved" : "None"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* On-Page Section Navigation */}
              <Card variant="muted" padding="md" className="space-y-2.5">
                <span className="text-xs font-semibold tracking-wider text-foreground-muted uppercase">
                  On This Project Page
                </span>
                <nav className="flex flex-col space-y-1 text-xs">
                  {[
                    {
                      href: "#overview",
                      label: "1. Overview, Prerequisites & Math",
                    },
                    {
                      href: "#tasks",
                      label: `2. Step-by-Step Checklist (${project.tasks.length})`,
                    },
                    {
                      href: "#code-examples",
                      label: "3. Starter & Verification Code",
                    },
                    {
                      href: "#testing-guide",
                      label: "4. Testing & Acceptance Guide",
                    },
                    {
                      href: "#hints",
                      label: `5. Expandable Hints (${project.hints.length})`,
                    },
                    {
                      href: "#stretch-challenges",
                      label: `6. Stretch Challenges (${project.optionalChallenges.length})`,
                    },
                    {
                      href: "#deliverables",
                      label: "7. Deliverables & Outcomes",
                    },
                    {
                      href: "#github-submission",
                      label: "8. GitHub Repo Submission",
                    },
                    {
                      href: "#personal-notes",
                      label: "9. Personal Implementation Notes",
                    },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-2.5 py-1.5 font-medium text-foreground-secondary transition-colors hover:bg-background hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
