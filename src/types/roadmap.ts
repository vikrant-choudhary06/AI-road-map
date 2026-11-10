import type {
  ActiveStudyTimerState,
  LearnerPreferences,
  LearningActivityEvent,
  StudyGoalConfig,
  StudyPlannerTask,
  StudySessionRecord,
} from "./dashboard";
import type {
  ProjectGithubSubmission,
  ProjectNoteRecord,
} from "./project";

/**
 * Core domain types for the 9-Phase AI & LLM Learning Roadmap (Phase 0 – Phase 8).
 * Supports topic-level progress tracking, self-assessment readiness checks,
 * and the 14 primary project milestones.
 */

export type PhaseNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type DifficultyLevel =
  | "foundational"
  | "intermediate"
  | "advanced"
  | "research";

export type ProgressState = "not_started" | "in_progress" | "completed";

export type TopicStatus = ProgressState;

export interface RoadmapTopic {
  /** Stable unique identifier used for localStorage progress persistence */
  id: string;
  title: string;
  explanation: string;
  keyConcepts: string[];
  learningOutcome: string;
  formulaOrCode?: string;
}

export interface ModuleEducationalExample {
  title: string;
  expression: string;
  symbolBreakdown: { symbol: string; meaning: string }[];
  takeaway: string;
}

export interface ModuleResourceReference {
  title: string;
  provider: string;
  url: string;
}

export interface RoadmapModule {
  /** Stable unique identifier (e.g., "p0-m1") */
  id: string;
  code: string;
  title: string;
  description: string;
  estimatedEffort: string;
  whatYouWillLearn: string;
  whyItMatters: string;
  learningObjectives: string[];
  keyConcepts: string[];
  topics: RoadmapTopic[];
  practicalExercises: string[];
  completionMilestone: string;
  educationalExample?: ModuleEducationalExample;
  recommendedResources?: ModuleResourceReference[];
}

export interface PrimaryProjectMilestone {
  id: string;
  /** Canonical number 1 through 14 */
  milestoneNumber: number;
  title: string;
  phase: PhaseNumber;
  shortDescription: string;
  skillsPracticed: string[];
  expectedOutcome: string;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  deliverables?: string[];
}

export interface PhaseCompletionCheckItem {
  id: string;
  question: string;
  detail: string;
}

export interface PhasePrerequisiteRef {
  phaseNumber?: PhaseNumber;
  phaseId?: string;
  label: string;
}

export interface RoadmapPhase {
  /** Stable unique phase ID (e.g. "phase-0") */
  id: string;
  slug: string;
  phase: PhaseNumber;
  code: string;
  title: string;
  shortDescription: string;
  purpose: string;
  estimatedWeeks: number;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  prerequisites: PhasePrerequisiteRef[];
  learningObjectives: string[];
  modules: RoadmapModule[];
  assignments: string[];
  /** Primary curriculum milestones (subset of the 14 canonical projects) */
  primaryProjects: PrimaryProjectMilestone[];
  /** Optional/supplementary builds not counted toward the 14 primary milestones */
  supplementaryProjects?: {
    title: string;
    description: string;
  }[];
  completionCriteriaSummary: string;
  completionChecklist: PhaseCompletionCheckItem[];
}

/**
 * Lightweight summary used by landing page and footer previews.
 */
export interface RoadmapTopicSummary {
  id: string;
  title: string;
  summary: string;
  estimatedHours?: number;
  prerequisites?: string[];
}

export interface RoadmapPhaseSummary {
  phase: PhaseNumber;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  coreFocus: string;
}

/**
 * Persisted local-first learner progress schema (v1).
 * Stored separately from static curriculum definitions.
 * Extended in Stage 4 (courses) and Stage 5 (dashboard goals, study sessions,
 * weekly planner tasks, and activity log) with backwards-compatible defaults.
 */
export interface RoadmapProgressStoreV1 {
  schemaVersion: 1;
  completedTopicIds: string[];
  completedReadinessCheckIds: string[];
  completedMilestoneIds: string[];
  lastVisitedPhaseId: string | null;
  lastVisitedModuleId: string | null;
  lastVisitedTopicId: string | null;
  /** Canonical IDs of bookmarked courses/resources (Stage 4+) */
  bookmarkedResourceIds: string[];
  /** Per-resource learning status: "in_progress" | "completed" (omitted = "not_started") */
  resourceStatuses: Record<string, ProgressState>;
  /** ISO timestamps for when each resource status was last updated */
  resourceStatusUpdatedAt: Record<string, string>;
  /** Recently inspected resource IDs on `/courses/[slug]` */
  recentlyViewedResourceIds: string[];
  /** Learner display & onboarding preferences (Stage 5+) */
  learnerPreferences: LearnerPreferences;
  /** Personal study goal configuration (Stage 5+) */
  studyGoal: StudyGoalConfig;
  /** Completed study session logs (timer or manual, Stage 5+) */
  studySessions: StudySessionRecord[];
  /** Active or paused study timer state for crash/refresh recovery (Stage 5+) */
  activeTimerSession: ActiveStudyTimerState | null;
  /** Weekly study planner tasks (Stage 5+) */
  plannerTasks: StudyPlannerTask[];
  /** Recorded learning activity events for history & streak calculation (Stage 5+) */
  activityEvents: LearningActivityEvent[];
  /** Completed implementation task IDs across the 14 projects (Stage 6+) */
  completedProjectTaskIds: string[];
  /** Explicitly started project IDs (Stage 6+) */
  startedProjectIds: string[];
  /** Bookmarked project IDs (Stage 6+) */
  bookmarkedProjectIds: string[];
  /** Per-project last activity ISO timestamps (Stage 6+) */
  projectUpdatedAt: Record<string, string>;
  /** Self-reported GitHub repository submissions per project (Stage 6+) */
  projectGithubSubmissions: Record<string, ProjectGithubSubmission>;
  /** Personal implementation notes per project (Stage 6+) */
  projectNotes: Record<string, ProjectNoteRecord>;
  /** Last visited or worked-on project ID (Stage 6+) */
  lastVisitedProjectId: string | null;
  updatedAtIso: string;
}
