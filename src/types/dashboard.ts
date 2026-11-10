import type { PhaseNumber, TopicStatus } from "./roadmap";

/**
 * Complete domain types for the Stage 5 Interactive Learning Dashboard,
 * Study Goals, Session Timer, Weekly Planner, Activity History, Streaks,
 * and Deterministic Achievements.
 */

export type StudyPacePreset =
  | "casual"
  | "steady"
  | "focused"
  | "intensive"
  | "custom";

export interface LearnerPreferences {
  /** Optional locally stored display name; empty string when not set */
  displayName: string;
  /** Whether the user completed the dashboard onboarding wizard */
  onboardingCompleted: boolean;
  /** Whether the user dismissed/skipped the onboarding banner */
  onboardingSkipped: boolean;
}

export interface StudyGoalConfig {
  pacePreset: StudyPacePreset;
  /** Target study minutes on each active study day (e.g., 30, 60, 120, 180) */
  dailyMinutesTarget: number;
  /** Number of target study days per week (1–7) */
  studyDaysPerWeek: number;
  /** Total weekly target minutes (dailyMinutesTarget * studyDaysPerWeek) */
  weeklyMinutesTarget: number;
  /** Optional target completion date in local YYYY-MM-DD format */
  targetCompletionDate: string | null;
  /** Whether goal tracking is temporarily paused */
  isPaused: boolean;
  /** Whether the user has explicitly saved/configured their study goal */
  isConfigured: boolean;
  updatedAtIso: string;
}

export type StudySessionEntryMethod = "timer" | "manual";

export interface StudySessionRecord {
  id: string;
  startedAtIso: string;
  endedAtIso: string;
  /** Local calendar date key (YYYY-MM-DD) when the session was completed */
  localDateKey: string;
  /** Actual recorded duration in minutes (>= 1) */
  durationMinutes: number;
  /** Associated roadmap phase ID (e.g. "phase-0") */
  phaseId: string;
  /** Optional associated roadmap module ID (e.g. "p0-m1") */
  moduleId: string | null;
  /** Optional learner study note */
  note: string;
  /** Distinguishes live timer sessions from manual logs */
  entryMethod: StudySessionEntryMethod;
}

export interface ActiveStudyTimerState {
  sessionId: string;
  startedAtIso: string;
  status: "running" | "paused";
  /** Elapsed milliseconds accumulated prior to the current running interval */
  accumulatedElapsedMs: number;
  /** Epoch ms when the current running interval started (null if paused) */
  lastResumedAtEpochMs: number | null;
  phaseId: string;
  moduleId: string | null;
  note: string;
}

export type PlannerTaskStatus = "planned" | "completed" | "postponed";

export interface StudyPlannerTask {
  id: string;
  title: string;
  /** Local calendar date key (YYYY-MM-DD) */
  dateKey: string;
  /** Associated roadmap phase ID (e.g., "phase-0") */
  phaseId: string;
  /** Optional roadmap module ID (e.g., "p0-m1") */
  moduleId: string | null;
  /** Estimated duration in minutes */
  estimatedMinutes: number;
  status: PlannerTaskStatus;
  completedAtIso: string | null;
  createdAtIso: string;
}

export type LearningActivityEventType =
  | "topic_completed"
  | "phase_completed"
  | "study_session_logged"
  | "planner_task_completed"
  | "course_in_progress"
  | "course_completed"
  | "milestone_completed"
  | "project_started"
  | "project_task_completed"
  | "project_repo_linked";

export interface LearningActivityEvent {
  id: string;
  type: LearningActivityEventType;
  timestampIso: string;
  /** Local calendar date key (YYYY-MM-DD) used for streak & activity calendar */
  localDateKey: string;
  /** Stable ID of the topic, session, task, course, or milestone */
  entityId: string;
  phaseId?: string;
  label: string;
  detail?: string;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  conditionLabel: string;
  unlocked: boolean;
  progressText: string;
}

export interface LearningInsightItem {
  id: string;
  category: "progress" | "courses" | "study_time" | "next_step" | "planner";
  title: string;
  detail: string;
  href?: string;
  ctaLabel?: string;
}

/**
 * Legacy types retained for backwards compatibility.
 */
export interface MilestoneRecord {
  id: string;
  phase: PhaseNumber;
  title: string;
  completedAt?: string;
}

export interface LearnerProgressState {
  currentPhase: PhaseNumber;
  topicStatuses: Record<string, TopicStatus>;
  completedMilestones: string[];
  lastUpdatedIso: string;
}
