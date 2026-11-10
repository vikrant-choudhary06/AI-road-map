"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Edit3,
  Layers,
  Play,
  Sparkles,
  Target,
  User,
  X,
} from "lucide-react";
import type {
  LearnerPreferences,
  RoadmapPhase,
  StudyGoalConfig,
  StudyPacePreset,
} from "@/types";
import type {
  ContinueLearningTarget,
  ModuleProgressMetrics,
  PhaseProgressMetrics,
} from "@/hooks/use-roadmap-progress";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDurationMinutes } from "@/lib/date-utils";

const PACE_PRESET_DETAILS: {
  id: Exclude<StudyPacePreset, "custom">;
  label: string;
  dailyMinutes: number;
  defaultDays: number;
  description: string;
}[] = [
  {
    id: "casual",
    label: "Casual",
    dailyMinutes: 30,
    defaultDays: 4,
    description: "Gentle daily momentum alongside a busy schedule.",
  },
  {
    id: "steady",
    label: "Steady",
    dailyMinutes: 60,
    defaultDays: 5,
    description: "Consistent 1-hour blocks for steady weekly progress.",
  },
  {
    id: "focused",
    label: "Focused",
    dailyMinutes: 120,
    defaultDays: 5,
    description: "Deep 2-hour implementation and math sessions.",
  },
  {
    id: "intensive",
    label: "Intensive",
    dailyMinutes: 180,
    defaultDays: 6,
    description: "Immersive bootcamp-style study and model building.",
  },
];

export interface DashboardHeaderProps {
  isFirstTimeLearner: boolean;
  preferences: LearnerPreferences;
  studyGoal: StudyGoalConfig;
  continueLearningTarget: ContinueLearningTarget;
  overallProgress: {
    completedTopicsCount: number;
    totalTopicsCount: number;
    remainingTopicsCount: number;
    percent: number;
    completedPhasesCount: number;
    inProgressPhasesCount: number;
    totalPhasesCount: number;
    completedModulesCount: number;
    totalModulesCount: number;
    completedMilestonesCount: number;
    totalMilestonesCount: number;
  };
  onUpdatePreferences: (patch: Partial<LearnerPreferences>) => void;
  onOpenOnboarding: () => void;
}

export function DashboardHeader({
  isFirstTimeLearner,
  preferences,
  studyGoal,
  continueLearningTarget,
  overallProgress,
  onUpdatePreferences,
  onOpenOnboarding,
}: DashboardHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(preferences.displayName);

  const handleSaveName = () => {
    onUpdatePreferences({ displayName: draftName.trim() });
    setIsEditingName(false);
  };

  const paceLabel = studyGoal.isPaused
    ? "Goal Paused"
    : studyGoal.isConfigured
      ? `${studyGoal.pacePreset.charAt(0).toUpperCase() + studyGoal.pacePreset.slice(1)} · ${studyGoal.dailyMinutesTarget}m/day (${studyGoal.studyDaysPerWeek}d/wk)`
      : `Default Steady · ${studyGoal.dailyMinutesTarget}m/day`;

  return (
    <section className="border-b border-border/70 bg-gradient-to-b from-surface-soft/55 via-background to-background pt-8 pb-10 sm:pt-12 sm:pb-12">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="sage">
                <Compass className="mr-1.5 size-3.5" />
                Stage 5 · Personal Learning Workspace
              </Badge>
              <Badge variant="outline">
                Phase {continueLearningTarget.phase.phase} Active
              </Badge>
              {isFirstTimeLearner &&
              (preferences.onboardingSkipped || preferences.onboardingCompleted) ? (
                <button
                  type="button"
                  onClick={onOpenOnboarding}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <Sparkles className="size-3 text-accent" />
                  Pace &amp; Goal Setup
                </button>
              ) : null}
            </div>

            {isFirstTimeLearner ? (
              <>
                <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                  Your Learning Journey Starts Here.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Track your progress across all nine roadmap phases, save
                  courses, plan study sessions, and build toward your own AI and
                  LLM models.
                </p>
              </>
            ) : (
              <>
                <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                  {preferences.displayName
                    ? `Welcome Back, ${preferences.displayName}. Ready to Keep Learning?`
                    : "Welcome Back. Ready to Keep Learning?"}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  You have completed{" "}
                  <span className="font-semibold text-foreground">
                    {overallProgress.completedTopicsCount} of{" "}
                    {overallProgress.totalTopicsCount}
                  </span>{" "}
                  curriculum topics ({overallProgress.percent}%) across{" "}
                  <span className="font-semibold text-foreground">
                    Phase {continueLearningTarget.phase.phase}:{" "}
                    {continueLearningTarget.phase.title}
                  </span>
                  .
                </p>
              </>
            )}

            {/* Optional Local Display Name Control */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
              {!isEditingName ? (
                <button
                  type="button"
                  onClick={() => {
                    setDraftName(preferences.displayName);
                    setIsEditingName(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card/80 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                >
                  <User className="size-3.5" />
                  <span>
                    {preferences.displayName
                      ? `Learner profile: ${preferences.displayName}`
                      : "Add optional display name (stored locally)"}
                  </span>
                  <Edit3 className="size-3 opacity-70" />
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-1.5">
                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="Your first name or handle..."
                    maxLength={48}
                    aria-label="Learner display name"
                    className="h-7 rounded-md border border-border/70 bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveName();
                      if (e.key === "Escape") setIsEditingName(false);
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSaveName}
                    className="h-7 px-2.5 text-xs"
                  >
                    Save
                  </Button>
                  {preferences.displayName ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onUpdatePreferences({ displayName: "" });
                        setDraftName("");
                        setIsEditingName(false);
                      }}
                      className="h-7 px-2 text-xs text-muted-foreground"
                    >
                      Clear
                    </Button>
                  ) : null}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingName(false)}
                    className="h-7 px-2 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Primary & Secondary Header CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="shadow-xs">
              <Link href={`/roadmap#${continueLearningTarget.phase.slug}`}>
                <span>Continue Learning</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/roadmap">
                <Layers className="size-4" />
                <span>View Roadmap</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Status Snapshot Strip */}
        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border/80 bg-card/90 p-3.5">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Current Roadmap Phase
            </p>
            <p className="mt-1 font-medium text-foreground">
              Phase {continueLearningTarget.phase.phase}:{" "}
              {continueLearningTarget.phase.title}
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/90 p-3.5">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Active Module
            </p>
            <p className="mt-1 truncate font-medium text-foreground">
              {continueLearningTarget.module.code} ·{" "}
              {continueLearningTarget.module.title}
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/90 p-3.5">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Current Study Goal
            </p>
            <p className="mt-1 font-medium text-foreground">{paceLabel}</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/90 p-3.5">
            <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Overall Curriculum Progress
            </p>
            <p className="mt-1 font-medium text-foreground">
              {overallProgress.percent}% ({overallProgress.completedTopicsCount}{" "}
              / {overallProgress.totalTopicsCount} topics)
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export interface DashboardOnboardingProps {
  preferences: LearnerPreferences;
  studyGoal: StudyGoalConfig;
  onSaveOnboarding: (
    prefsPatch: Partial<LearnerPreferences>,
    goalPatch: Partial<StudyGoalConfig>
  ) => void;
  onSkipOnboarding: () => void;
}

export function DashboardOnboarding({
  preferences,
  studyGoal,
  onSaveOnboarding,
  onSkipOnboarding,
}: DashboardOnboardingProps) {
  const [selectedPreset, setSelectedPreset] = useState<
    Exclude<StudyPacePreset, "custom">
  >(
    studyGoal.pacePreset === "custom" ? "steady" : studyGoal.pacePreset
  );
  const [studyDays, setStudyDays] = useState<number>(
    studyGoal.studyDaysPerWeek || 5
  );
  const [displayName, setDisplayName] = useState<string>(
    preferences.displayName
  );
  const [targetDate, setTargetDate] = useState<string>(
    studyGoal.targetCompletionDate ?? ""
  );

  const activePresetInfo =
    PACE_PRESET_DETAILS.find((p) => p.id === selectedPreset) ??
    PACE_PRESET_DETAILS[1];

  const handlePresetClick = (
    preset: (typeof PACE_PRESET_DETAILS)[number]
  ) => {
    setSelectedPreset(preset.id);
    setStudyDays(preset.defaultDays);
  };

  const handleCompleteSetup = () => {
    const dailyMinutesTarget = activePresetInfo.dailyMinutes;
    onSaveOnboarding(
      {
        displayName: displayName.trim(),
        onboardingCompleted: true,
        onboardingSkipped: false,
      },
      {
        pacePreset: selectedPreset,
        dailyMinutesTarget,
        studyDaysPerWeek: studyDays,
        weeklyMinutesTarget: dailyMinutesTarget * studyDays,
        targetCompletionDate: targetDate.trim() || null,
        isPaused: false,
        isConfigured: true,
      }
    );
  };

  return (
    <div className="rounded-2xl border border-accent/35 bg-surface-soft/75 p-5 shadow-xs sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="terracotta">Optional First-Visit Setup</Badge>
            <span className="text-xs text-muted-foreground">
              Takes 20 seconds · Stored 100% locally in your browser
            </span>
          </div>
          <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Personalize Your Study Pace &amp; Learning Workspace
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Your dashboard tracks your completed roadmap topics, saved courses,
            study sessions, weekly planner tasks, and 14 implementation
            milestones—without accounts or cloud tracking.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onSkipOnboarding}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
          <span>Skip Setup</span>
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Step 1: Choose Preferred Learning Pace */}
        <div className="space-y-3 lg:col-span-7">
          <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            1. Choose Your Preferred Learning Pace
          </label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {PACE_PRESET_DETAILS.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-card shadow-xs ring-1 ring-primary/25"
                      : "border-border/80 bg-card/60 hover:border-border hover:bg-card"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-semibold text-foreground">
                      {preset.label}
                    </span>
                    <Badge variant={isSelected ? "sage" : "outline"}>
                      {preset.dailyMinutes} min / day
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Days per week + optional name & target date */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-5">
          <div className="space-y-3.5">
            <div>
              <label
                htmlFor="onboarding-study-days"
                className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
              >
                2. Target Study Days Per Week ({studyDays} days ·{" "}
                {formatDurationMinutes(activePresetInfo.dailyMinutes * studyDays)}
                /wk)
              </label>
              <div className="mt-2 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((dayCount) => (
                  <button
                    key={dayCount}
                    type="button"
                    onClick={() => setStudyDays(dayCount)}
                    className={`flex h-8 flex-1 items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${
                      studyDays === dayCount
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/80 bg-background text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {dayCount}d
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="onboarding-name"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Optional Display Name
                </label>
                <input
                  id="onboarding-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g., Alex"
                  maxLength={48}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="onboarding-target-date"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Optional Target Date
                </label>
                <input
                  id="onboarding-target-date"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3.5">
            <Button
              type="button"
              onClick={handleCompleteSetup}
              className="flex-1 sm:flex-initial"
            >
              <CheckCircle2 className="size-4" />
              <span>Save Study Pace</span>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/roadmap#phase-0-programming-foundations">
                <span>Start at Phase 0</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface ContinueLearningCardProps {
  continueLearningTarget: ContinueLearningTarget;
  phaseProgress: PhaseProgressMetrics;
  moduleProgress: ModuleProgressMetrics;
  onToggleTopic: (topicId: string, phaseId: string, moduleId: string) => void;
}

export function ContinueLearningCard({
  continueLearningTarget,
  phaseProgress,
  moduleProgress,
  onToggleTopic,
}: ContinueLearningCardProps) {
  const { phase, module, topic, hasAnyProgress, isAllCompleted } =
    continueLearningTarget;

  const primaryObjective =
    module.learningObjectives[0] ??
    phase.learningObjectives[0] ??
    phase.purpose;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={hasAnyProgress ? "terracotta" : "sage"}>
              {isAllCompleted
                ? "Curriculum Complete"
                : hasAnyProgress
                  ? "Continue Learning"
                  : "Recommended Starting Point"}
            </Badge>
            <span className="text-xs font-medium text-muted-foreground">
              Phase {phase.phase} · Module {module.code}
            </span>
          </div>
          <span className="text-xs font-semibold text-foreground">
            Phase {phase.phase}: {phaseProgress.percent}%
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Phase {phase.phase}: {phase.title}
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Module {module.code}: {module.title}
          </h2>
        </div>

        {/* Next Incomplete Topic Highlight Box */}
        <div className="rounded-xl border border-border/80 bg-surface-soft/55 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-accent uppercase">
              {isAllCompleted
                ? "All 9 Phases Completed"
                : "Next Incomplete Topic"}
            </span>
            <span className="text-xs text-muted-foreground">
              Module progress: {moduleProgress.completedCount}/
              {moduleProgress.totalCount} topics
            </span>
          </div>
          <p className="mt-1.5 text-base font-semibold text-foreground">
            {topic.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {topic.explanation}
          </p>
          <div className="mt-3 flex items-start gap-2 border-t border-border/60 pt-2.5 text-xs text-muted-foreground">
            <Target className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span>
              <strong className="font-medium text-foreground">
                Learning Objective:
              </strong>{" "}
              {primaryObjective}
            </span>
          </div>
        </div>
      </div>

      {/* Phase Progress Bar & Direct Actions */}
      <div className="mt-5 space-y-4 border-t border-border/70 pt-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              Phase {phase.phase} Topic Progress
            </span>
            <span className="font-semibold text-foreground">
              {phaseProgress.completedCount} / {phaseProgress.totalCount} topics
              ({phaseProgress.percent}%)
            </span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={phaseProgress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Phase ${phase.phase} completion`}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${phaseProgress.percent}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <Button asChild size="sm" className="flex-1 sm:flex-initial">
            <Link href={`/roadmap#${phase.slug}`}>
              <Play className="size-3.5" />
              <span>
                {hasAnyProgress
                  ? `Resume Phase ${phase.phase} on Roadmap`
                  : "Start Phase 0: Python Foundations"}
              </span>
            </Link>
          </Button>

          {!isAllCompleted ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onToggleTopic(topic.id, phase.id, module.id)}
            >
              <CheckCircle2 className="size-3.5 text-primary" />
              <span>Mark Topic Complete</span>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export interface RoadmapProgressSummaryProps {
  overallProgress: {
    completedTopicsCount: number;
    totalTopicsCount: number;
    remainingTopicsCount: number;
    percent: number;
    completedPhasesCount: number;
    inProgressPhasesCount: number;
    totalPhasesCount: number;
    completedModulesCount: number;
    totalModulesCount: number;
    completedMilestonesCount: number;
    totalMilestonesCount: number;
  };
  currentPhase: RoadmapPhase;
  courseLibraryProgress: {
    bookmarkedCount: number;
    inProgressCount: number;
    completedCount: number;
    totalResourcesCount: number;
  };
}

export function RoadmapProgressSummary({
  overallProgress,
  currentPhase,
  courseLibraryProgress,
}: RoadmapProgressSummaryProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Overall Roadmap Progress
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Curriculum Mastery Overview
            </h2>
          </div>
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-surface-soft text-center">
            <span className="font-serif text-lg font-bold text-foreground">
              {overallProgress.percent}%
            </span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Validated Topic Checklists Completed
            </span>
            <span className="font-semibold text-foreground">
              {overallProgress.completedTopicsCount} of{" "}
              {overallProgress.totalTopicsCount} topics
            </span>
          </div>
          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={overallProgress.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall roadmap completion percentage"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${overallProgress.percent}%` }}
            />
          </div>
        </div>

        {/* 2x3 Metric Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Completed Topics
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-foreground">
              {overallProgress.completedTopicsCount}{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                / {overallProgress.totalTopicsCount}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Remaining Topics
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-foreground">
              {overallProgress.remainingTopicsCount}
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Completed Phases
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-foreground">
              {overallProgress.completedPhasesCount}{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                / {overallProgress.totalPhasesCount}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Completed Modules
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-foreground">
              {overallProgress.completedModulesCount}{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                / {overallProgress.totalModulesCount}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Project Milestones
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-foreground">
              {overallProgress.completedMilestonesCount}{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                / {overallProgress.totalMilestonesCount}
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Courses Completed
            </p>
            <p className="mt-1 font-serif text-lg font-semibold text-foreground">
              {courseLibraryProgress.completedCount}{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                ({courseLibraryProgress.inProgressCount} active)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
        <span>
          Current Focus:{" "}
          <strong className="font-medium text-foreground">
            Phase {currentPhase.phase} ({currentPhase.title})
          </strong>
        </span>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          <BookOpen className="size-3.5" />
          <span>Browse {courseLibraryProgress.totalResourcesCount} Free Courses</span>
        </Link>
      </div>
    </div>
  );
}
