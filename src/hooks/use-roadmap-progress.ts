"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { useMounted } from "@/hooks/use-mounted";
import type {
  AchievementDefinition,
  ActiveStudyTimerState,
  CurriculumProject,
  LearnerPreferences,
  LearningActivityEvent,
  LearningActivityEventType,
  LearningInsightItem,
  PlannerTaskStatus,
  ProgressState,
  ProjectGithubSubmission,
  ProjectNoteRecord,
  RoadmapModule,
  RoadmapPhase,
  RoadmapProgressStoreV1,
  RoadmapTopic,
  StudyGoalConfig,
  StudyPacePreset,
  StudyPlannerTask,
  StudySessionRecord,
} from "@/types";
import {
  ALL_PRIMARY_MILESTONES,
  COMPLETE_ROADMAP_PHASES,
  ROADMAP_STATS,
  VALID_MILESTONE_IDS,
  VALID_MODULE_IDS,
  VALID_PHASE_IDS,
  VALID_READINESS_CHECK_IDS,
  VALID_TOPIC_IDS,
} from "@/data/roadmap";
import {
  ALL_COURSE_RESOURCES,
  getResourceById,
  VALID_RESOURCE_IDS,
} from "@/data/courses";
import {
  ALL_CURRICULUM_PROJECTS,
  getProjectById,
  PROJECT_CATALOG_STATS,
  VALID_PROJECT_IDS,
  VALID_PROJECT_TASK_IDS,
} from "@/data/projects";
import {
  computeLearningStreak,
  formatDurationMinutes,
  getStartOfLocalWeek,
  isoToLocalDateKey,
  isValidDateKey,
  toLocalDateKey,
} from "@/lib/date-utils";

export const ROADMAP_PROGRESS_STORAGE_KEY = "open-ai-roadmap-progress-v1";

const GITHUB_REPO_URL_REGEX =
  /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;

export function isValidGithubRepoUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  return GITHUB_REPO_URL_REGEX.test(url.trim());
}

const DEFAULT_LEARNER_PREFERENCES: LearnerPreferences = {
  displayName: "",
  onboardingCompleted: false,
  onboardingSkipped: false,
};

export const DEFAULT_STUDY_GOAL: StudyGoalConfig = {
  pacePreset: "steady",
  dailyMinutesTarget: 60,
  studyDaysPerWeek: 5,
  weeklyMinutesTarget: 300,
  targetCompletionDate: null,
  isPaused: false,
  isConfigured: false,
  updatedAtIso: "1970-01-01T00:00:00.000Z",
};

const DEFAULT_PROGRESS_STORE: RoadmapProgressStoreV1 = {
  schemaVersion: 1,
  completedTopicIds: [],
  completedReadinessCheckIds: [],
  completedMilestoneIds: [],
  lastVisitedPhaseId: null,
  lastVisitedModuleId: null,
  lastVisitedTopicId: null,
  bookmarkedResourceIds: [],
  resourceStatuses: {},
  resourceStatusUpdatedAt: {},
  recentlyViewedResourceIds: [],
  learnerPreferences: DEFAULT_LEARNER_PREFERENCES,
  studyGoal: DEFAULT_STUDY_GOAL,
  studySessions: [],
  activeTimerSession: null,
  plannerTasks: [],
  activityEvents: [],
  completedProjectTaskIds: [],
  startedProjectIds: [],
  bookmarkedProjectIds: [],
  projectUpdatedAt: {},
  projectGithubSubmissions: {},
  projectNotes: {},
  lastVisitedProjectId: null,
  updatedAtIso: "1970-01-01T00:00:00.000Z",
};

const TOPIC_METADATA_MAP: ReadonlyMap<
  string,
  { topic: RoadmapTopic; module: RoadmapModule; phase: RoadmapPhase }
> = new Map(
  COMPLETE_ROADMAP_PHASES.flatMap((phase) =>
    phase.modules.flatMap((module) =>
      module.topics.map((topic) => [topic.id, { topic, module, phase }] as const)
    )
  )
);

/**
 * In-memory cache & subscriber registry so all components using
 * `useRoadmapProgress()` share state seamlessly and survive environments
 * where `localStorage` is blocked or restricted.
 */
let memoryStore: RoadmapProgressStoreV1 = DEFAULT_PROGRESS_STORE;
let hasHydratedFromStorage = false;
let storageIsAvailable = true;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function isValidProgressState(val: unknown): val is ProgressState {
  return (
    val === "not_started" || val === "in_progress" || val === "completed"
  );
}

function isValidPacePreset(val: unknown): val is StudyPacePreset {
  return (
    val === "casual" ||
    val === "steady" ||
    val === "focused" ||
    val === "intensive" ||
    val === "custom"
  );
}

function isValidPlannerStatus(val: unknown): val is PlannerTaskStatus {
  return val === "planned" || val === "completed" || val === "postponed";
}

function isValidActivityType(val: unknown): val is LearningActivityEventType {
  return (
    val === "topic_completed" ||
    val === "phase_completed" ||
    val === "study_session_logged" ||
    val === "planner_task_completed" ||
    val === "course_in_progress" ||
    val === "course_completed" ||
    val === "milestone_completed" ||
    val === "project_started" ||
    val === "project_task_completed" ||
    val === "project_repo_linked"
  );
}

function sanitizeLearnerPreferences(raw: unknown): LearnerPreferences {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_LEARNER_PREFERENCES;
  }
  const cand = raw as Partial<LearnerPreferences>;
  return {
    displayName:
      typeof cand.displayName === "string"
        ? cand.displayName.trim().slice(0, 60)
        : "",
    onboardingCompleted: Boolean(cand.onboardingCompleted),
    onboardingSkipped: Boolean(cand.onboardingSkipped),
  };
}

function sanitizeStudyGoal(raw: unknown): StudyGoalConfig {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_STUDY_GOAL;
  }
  const cand = raw as Partial<StudyGoalConfig>;
  const dailyMinutesTarget =
    typeof cand.dailyMinutesTarget === "number" &&
    Number.isFinite(cand.dailyMinutesTarget) &&
    cand.dailyMinutesTarget >= 10 &&
    cand.dailyMinutesTarget <= 720
      ? Math.round(cand.dailyMinutesTarget)
      : DEFAULT_STUDY_GOAL.dailyMinutesTarget;

  const studyDaysPerWeek =
    typeof cand.studyDaysPerWeek === "number" &&
    Number.isFinite(cand.studyDaysPerWeek) &&
    cand.studyDaysPerWeek >= 1 &&
    cand.studyDaysPerWeek <= 7
      ? Math.round(cand.studyDaysPerWeek)
      : DEFAULT_STUDY_GOAL.studyDaysPerWeek;

  const weeklyMinutesTarget = dailyMinutesTarget * studyDaysPerWeek;

  return {
    pacePreset: isValidPacePreset(cand.pacePreset)
      ? cand.pacePreset
      : "steady",
    dailyMinutesTarget,
    studyDaysPerWeek,
    weeklyMinutesTarget,
    targetCompletionDate: isValidDateKey(cand.targetCompletionDate)
      ? cand.targetCompletionDate
      : null,
    isPaused: Boolean(cand.isPaused),
    isConfigured: Boolean(cand.isConfigured),
    updatedAtIso:
      typeof cand.updatedAtIso === "string"
        ? cand.updatedAtIso
        : DEFAULT_STUDY_GOAL.updatedAtIso,
  };
}

function sanitizeStudySessions(raw: unknown): StudySessionRecord[] {
  if (!Array.isArray(raw)) return [];
  const seenIds = new Set<string>();
  const valid: StudySessionRecord[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const cand = item as Partial<StudySessionRecord>;
    if (typeof cand.id !== "string" || !cand.id || seenIds.has(cand.id)) {
      continue;
    }
    if (
      typeof cand.durationMinutes !== "number" ||
      !Number.isFinite(cand.durationMinutes) ||
      cand.durationMinutes < 1 ||
      cand.durationMinutes > 1440
    ) {
      continue;
    }
    const phaseId =
      typeof cand.phaseId === "string" && VALID_PHASE_IDS.has(cand.phaseId)
        ? cand.phaseId
        : "phase-0";
    const moduleId =
      typeof cand.moduleId === "string" && VALID_MODULE_IDS.has(cand.moduleId)
        ? cand.moduleId
        : null;
    const startedAtIso =
      typeof cand.startedAtIso === "string"
        ? cand.startedAtIso
        : DEFAULT_PROGRESS_STORE.updatedAtIso;
    const endedAtIso =
      typeof cand.endedAtIso === "string" ? cand.endedAtIso : startedAtIso;
    const localDateKey = isValidDateKey(cand.localDateKey)
      ? cand.localDateKey
      : isoToLocalDateKey(endedAtIso);

    seenIds.add(cand.id);
    valid.push({
      id: cand.id,
      startedAtIso,
      endedAtIso,
      localDateKey,
      durationMinutes: Math.round(cand.durationMinutes),
      phaseId,
      moduleId,
      note: typeof cand.note === "string" ? cand.note.slice(0, 280) : "",
      entryMethod: cand.entryMethod === "manual" ? "manual" : "timer",
    });
  }

  return valid.slice(0, 500);
}

function sanitizeActiveTimer(raw: unknown): ActiveStudyTimerState | null {
  if (!raw || typeof raw !== "object") return null;
  const cand = raw as Partial<ActiveStudyTimerState>;
  if (typeof cand.sessionId !== "string" || !cand.sessionId) return null;
  if (cand.status !== "running" && cand.status !== "paused") return null;

  const accumulatedElapsedMs =
    typeof cand.accumulatedElapsedMs === "number" &&
    Number.isFinite(cand.accumulatedElapsedMs) &&
    cand.accumulatedElapsedMs >= 0
      ? cand.accumulatedElapsedMs
      : 0;

  const lastResumedAtEpochMs =
    cand.status === "running" &&
    typeof cand.lastResumedAtEpochMs === "number" &&
    Number.isFinite(cand.lastResumedAtEpochMs)
      ? cand.lastResumedAtEpochMs
      : null;

  return {
    sessionId: cand.sessionId,
    startedAtIso:
      typeof cand.startedAtIso === "string"
        ? cand.startedAtIso
        : new Date().toISOString(),
    status: cand.status,
    accumulatedElapsedMs,
    lastResumedAtEpochMs,
    phaseId:
      typeof cand.phaseId === "string" && VALID_PHASE_IDS.has(cand.phaseId)
        ? cand.phaseId
        : "phase-0",
    moduleId:
      typeof cand.moduleId === "string" && VALID_MODULE_IDS.has(cand.moduleId)
        ? cand.moduleId
        : null,
    note: typeof cand.note === "string" ? cand.note.slice(0, 280) : "",
  };
}

function sanitizePlannerTasks(raw: unknown): StudyPlannerTask[] {
  if (!Array.isArray(raw)) return [];
  const seenIds = new Set<string>();
  const valid: StudyPlannerTask[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const cand = item as Partial<StudyPlannerTask>;
    if (typeof cand.id !== "string" || !cand.id || seenIds.has(cand.id)) {
      continue;
    }
    if (typeof cand.title !== "string" || !cand.title.trim()) continue;
    if (!isValidDateKey(cand.dateKey)) continue;

    seenIds.add(cand.id);
    valid.push({
      id: cand.id,
      title: cand.title.trim().slice(0, 160),
      dateKey: cand.dateKey,
      phaseId:
        typeof cand.phaseId === "string" && VALID_PHASE_IDS.has(cand.phaseId)
          ? cand.phaseId
          : "phase-0",
      moduleId:
        typeof cand.moduleId === "string" && VALID_MODULE_IDS.has(cand.moduleId)
          ? cand.moduleId
          : null,
      estimatedMinutes:
        typeof cand.estimatedMinutes === "number" &&
        Number.isFinite(cand.estimatedMinutes) &&
        cand.estimatedMinutes >= 5 &&
        cand.estimatedMinutes <= 600
          ? Math.round(cand.estimatedMinutes)
          : 45,
      status: isValidPlannerStatus(cand.status) ? cand.status : "planned",
      completedAtIso:
        typeof cand.completedAtIso === "string" ? cand.completedAtIso : null,
      createdAtIso:
        typeof cand.createdAtIso === "string"
          ? cand.createdAtIso
          : DEFAULT_PROGRESS_STORE.updatedAtIso,
    });
  }

  return valid.slice(0, 300);
}

function sanitizeActivityEvents(raw: unknown): LearningActivityEvent[] {
  if (!Array.isArray(raw)) return [];
  const seenIds = new Set<string>();
  const valid: LearningActivityEvent[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const cand = item as Partial<LearningActivityEvent>;
    if (typeof cand.id !== "string" || !cand.id || seenIds.has(cand.id)) {
      continue;
    }
    if (!isValidActivityType(cand.type)) continue;
    if (typeof cand.label !== "string" || !cand.label.trim()) continue;
    if (typeof cand.entityId !== "string" || !cand.entityId) continue;

    const timestampIso =
      typeof cand.timestampIso === "string"
        ? cand.timestampIso
        : DEFAULT_PROGRESS_STORE.updatedAtIso;
    const localDateKey = isValidDateKey(cand.localDateKey)
      ? cand.localDateKey
      : isoToLocalDateKey(timestampIso);

    seenIds.add(cand.id);
    valid.push({
      id: cand.id,
      type: cand.type,
      timestampIso,
      localDateKey,
      entityId: cand.entityId,
      phaseId:
        typeof cand.phaseId === "string" && VALID_PHASE_IDS.has(cand.phaseId)
          ? cand.phaseId
          : undefined,
      label: cand.label.trim().slice(0, 200),
      detail:
        typeof cand.detail === "string" ? cand.detail.slice(0, 200) : undefined,
    });
  }

  return valid.slice(0, 250);
}

/**
 * Validates and sanitizes raw parsed JSON into a guaranteed-valid
 * `RoadmapProgressStoreV1` object, filtering out any stale/unknown IDs
 * while preserving all existing Stage 3, Stage 4, and Stage 5 progress.
 */
export function sanitizeProgressStore(raw: unknown): RoadmapProgressStoreV1 {
  if (!raw || typeof raw !== "object") {
    return DEFAULT_PROGRESS_STORE;
  }

  const candidate = raw as Partial<RoadmapProgressStoreV1>;
  if (candidate.schemaVersion !== 1) {
    return DEFAULT_PROGRESS_STORE;
  }

  const completedTopicIds = Array.isArray(candidate.completedTopicIds)
    ? Array.from(
        new Set(
          candidate.completedTopicIds.filter(
            (id): id is string =>
              typeof id === "string" && VALID_TOPIC_IDS.has(id)
          )
        )
      )
    : [];

  const completedReadinessCheckIds = Array.isArray(
    candidate.completedReadinessCheckIds
  )
    ? Array.from(
        new Set(
          candidate.completedReadinessCheckIds.filter(
            (id): id is string =>
              typeof id === "string" && VALID_READINESS_CHECK_IDS.has(id)
          )
        )
      )
    : [];

  const completedMilestoneIds = Array.isArray(candidate.completedMilestoneIds)
    ? Array.from(
        new Set(
          candidate.completedMilestoneIds.filter(
            (id): id is string =>
              typeof id === "string" && VALID_MILESTONE_IDS.has(id)
          )
        )
      )
    : [];

  const lastVisitedPhaseId =
    typeof candidate.lastVisitedPhaseId === "string" &&
    VALID_PHASE_IDS.has(candidate.lastVisitedPhaseId)
      ? candidate.lastVisitedPhaseId
      : null;

  const lastVisitedModuleId =
    typeof candidate.lastVisitedModuleId === "string" &&
    VALID_MODULE_IDS.has(candidate.lastVisitedModuleId)
      ? candidate.lastVisitedModuleId
      : null;

  const lastVisitedTopicId =
    typeof candidate.lastVisitedTopicId === "string" &&
    VALID_TOPIC_IDS.has(candidate.lastVisitedTopicId)
      ? candidate.lastVisitedTopicId
      : null;

  const bookmarkedResourceIds = Array.isArray(candidate.bookmarkedResourceIds)
    ? Array.from(
        new Set(
          candidate.bookmarkedResourceIds.filter(
            (id): id is string =>
              typeof id === "string" && VALID_RESOURCE_IDS.has(id)
          )
        )
      )
    : [];

  const resourceStatuses: Record<string, ProgressState> = {};
  if (
    candidate.resourceStatuses &&
    typeof candidate.resourceStatuses === "object"
  ) {
    for (const [resId, status] of Object.entries(candidate.resourceStatuses)) {
      if (
        VALID_RESOURCE_IDS.has(resId) &&
        isValidProgressState(status) &&
        status !== "not_started"
      ) {
        resourceStatuses[resId] = status;
      }
    }
  }

  const resourceStatusUpdatedAt: Record<string, string> = {};
  if (
    candidate.resourceStatusUpdatedAt &&
    typeof candidate.resourceStatusUpdatedAt === "object"
  ) {
    for (const [resId, iso] of Object.entries(
      candidate.resourceStatusUpdatedAt
    )) {
      if (VALID_RESOURCE_IDS.has(resId) && typeof iso === "string") {
        resourceStatusUpdatedAt[resId] = iso;
      }
    }
  }

  const recentlyViewedResourceIds = Array.isArray(
    candidate.recentlyViewedResourceIds
  )
    ? Array.from(
        new Set(
          candidate.recentlyViewedResourceIds.filter(
            (id): id is string =>
              typeof id === "string" && VALID_RESOURCE_IDS.has(id)
          )
        )
      ).slice(0, 8)
    : [];

  const rawTaskSet = new Set<string>(
    Array.isArray(candidate.completedProjectTaskIds)
      ? candidate.completedProjectTaskIds.filter(
          (id): id is string =>
            typeof id === "string" && VALID_PROJECT_TASK_IDS.has(id)
        )
      : []
  );

  // Ensure any project already in completedMilestoneIds has all its required tasks checked
  for (const milestoneId of completedMilestoneIds) {
    const project = getProjectById(milestoneId);
    if (project) {
      for (const task of project.tasks) {
        rawTaskSet.add(task.id);
      }
    }
  }

  const completedProjectTaskIds = Array.from(rawTaskSet);

  const startedProjectIds = Array.isArray(candidate.startedProjectIds)
    ? Array.from(
        new Set(
          candidate.startedProjectIds.filter(
            (id): id is string =>
              typeof id === "string" && VALID_PROJECT_IDS.has(id)
          )
        )
      )
    : [];

  const bookmarkedProjectIds = Array.isArray(candidate.bookmarkedProjectIds)
    ? Array.from(
        new Set(
          candidate.bookmarkedProjectIds.filter(
            (id): id is string =>
              typeof id === "string" && VALID_PROJECT_IDS.has(id)
          )
        )
      )
    : [];

  const projectUpdatedAt: Record<string, string> = {};
  if (
    candidate.projectUpdatedAt &&
    typeof candidate.projectUpdatedAt === "object"
  ) {
    for (const [projId, iso] of Object.entries(candidate.projectUpdatedAt)) {
      if (VALID_PROJECT_IDS.has(projId) && typeof iso === "string") {
        projectUpdatedAt[projId] = iso;
      }
    }
  }

  const projectGithubSubmissions: Record<string, ProjectGithubSubmission> = {};
  if (
    candidate.projectGithubSubmissions &&
    typeof candidate.projectGithubSubmissions === "object"
  ) {
    for (const [projId, sub] of Object.entries(
      candidate.projectGithubSubmissions
    )) {
      if (!VALID_PROJECT_IDS.has(projId) || !sub || typeof sub !== "object") {
        continue;
      }
      const candSub = sub as Partial<ProjectGithubSubmission>;
      if (
        typeof candSub.repoUrl === "string" &&
        isValidGithubRepoUrl(candSub.repoUrl)
      ) {
        projectGithubSubmissions[projId] = {
          repoUrl: candSub.repoUrl.trim().replace(/\/+$/, ""),
          notes:
            typeof candSub.notes === "string"
              ? candSub.notes.trim().slice(0, 600)
              : "",
          completedDateKey: isValidDateKey(candSub.completedDateKey)
            ? candSub.completedDateKey
            : null,
          updatedAtIso:
            typeof candSub.updatedAtIso === "string"
              ? candSub.updatedAtIso
              : DEFAULT_PROGRESS_STORE.updatedAtIso,
        };
      }
    }
  }

  const projectNotes: Record<string, ProjectNoteRecord> = {};
  if (candidate.projectNotes && typeof candidate.projectNotes === "object") {
    for (const [projId, noteObj] of Object.entries(candidate.projectNotes)) {
      if (
        !VALID_PROJECT_IDS.has(projId) ||
        !noteObj ||
        typeof noteObj !== "object"
      ) {
        continue;
      }
      const candNote = noteObj as Partial<ProjectNoteRecord>;
      if (typeof candNote.content === "string" && candNote.content.trim()) {
        projectNotes[projId] = {
          content: candNote.content.slice(0, 8000),
          updatedAtIso:
            typeof candNote.updatedAtIso === "string"
              ? candNote.updatedAtIso
              : DEFAULT_PROGRESS_STORE.updatedAtIso,
        };
      }
    }
  }

  const lastVisitedProjectId =
    typeof candidate.lastVisitedProjectId === "string" &&
    VALID_PROJECT_IDS.has(candidate.lastVisitedProjectId)
      ? candidate.lastVisitedProjectId
      : null;

  const updatedAtIso =
    typeof candidate.updatedAtIso === "string"
      ? candidate.updatedAtIso
      : DEFAULT_PROGRESS_STORE.updatedAtIso;

  return {
    schemaVersion: 1,
    completedTopicIds,
    completedReadinessCheckIds,
    completedMilestoneIds,
    lastVisitedPhaseId,
    lastVisitedModuleId,
    lastVisitedTopicId,
    bookmarkedResourceIds,
    resourceStatuses,
    resourceStatusUpdatedAt,
    recentlyViewedResourceIds,
    learnerPreferences: sanitizeLearnerPreferences(candidate.learnerPreferences),
    studyGoal: sanitizeStudyGoal(candidate.studyGoal),
    studySessions: sanitizeStudySessions(candidate.studySessions),
    activeTimerSession: sanitizeActiveTimer(candidate.activeTimerSession),
    plannerTasks: sanitizePlannerTasks(candidate.plannerTasks),
    activityEvents: sanitizeActivityEvents(candidate.activityEvents),
    completedProjectTaskIds,
    startedProjectIds,
    bookmarkedProjectIds,
    projectUpdatedAt,
    projectGithubSubmissions,
    projectNotes,
    lastVisitedProjectId,
    updatedAtIso,
  };
}

function appendActivityEvents(
  existingEvents: LearningActivityEvent[],
  newEvents: Omit<LearningActivityEvent, "id" | "timestampIso" | "localDateKey">[]
): LearningActivityEvent[] {
  if (newEvents.length === 0) return existingEvents;

  const now = new Date();
  const timestampIso = now.toISOString();
  const localDateKey = toLocalDateKey(now);

  const created: LearningActivityEvent[] = [];

  for (let i = 0; i < newEvents.length; i += 1) {
    const item = newEvents[i];
    // Prevent duplicate same-day event spam for the same entity + type (except study sessions)
    const isDuplicateToday =
      item.type !== "study_session_logged" &&
      existingEvents.some(
        (ev) =>
          ev.type === item.type &&
          ev.entityId === item.entityId &&
          ev.localDateKey === localDateKey
      );

    if (!isDuplicateToday) {
      created.push({
        ...item,
        id: `act-${now.getTime()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
        timestampIso,
        localDateKey,
      });
    }
  }

  return [...created, ...existingEvents].slice(0, 250);
}

function hydrateFromLocalStorageOnce(): void {
  if (hasHydratedFromStorage || typeof window === "undefined") {
    return;
  }
  hasHydratedFromStorage = true;

  try {
    const testKey = "__open_ai_roadmap_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    storageIsAvailable = true;
  } catch {
    storageIsAvailable = false;
    return;
  }

  try {
    const rawJson = window.localStorage.getItem(ROADMAP_PROGRESS_STORAGE_KEY);
    if (!rawJson) {
      memoryStore = DEFAULT_PROGRESS_STORE;
      return;
    }
    const parsed: unknown = JSON.parse(rawJson);
    const sanitized = sanitizeProgressStore(parsed);
    memoryStore = sanitized;
  } catch {
    memoryStore = DEFAULT_PROGRESS_STORE;
    try {
      window.localStorage.setItem(
        ROADMAP_PROGRESS_STORAGE_KEY,
        JSON.stringify(DEFAULT_PROGRESS_STORE)
      );
    } catch {
      // Ignore write error in restricted mode
    }
  }
}

function persistStore(nextStore: RoadmapProgressStoreV1): void {
  memoryStore = nextStore;
  if (typeof window !== "undefined" && storageIsAvailable) {
    try {
      window.localStorage.setItem(
        ROADMAP_PROGRESS_STORAGE_KEY,
        JSON.stringify(nextStore)
      );
    } catch {
      storageIsAvailable = false;
    }
  }
  emitChange();
}

function subscribe(listener: () => void): () => void {
  hydrateFromLocalStorageOnce();
  listeners.add(listener);

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === ROADMAP_PROGRESS_STORAGE_KEY) {
      if (!event.newValue) {
        memoryStore = DEFAULT_PROGRESS_STORE;
      } else {
        try {
          memoryStore = sanitizeProgressStore(JSON.parse(event.newValue));
        } catch {
          memoryStore = DEFAULT_PROGRESS_STORE;
        }
      }
      emitChange();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorageEvent);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorageEvent);
    }
  };
}

function getClientSnapshot(): RoadmapProgressStoreV1 {
  hydrateFromLocalStorageOnce();
  return memoryStore;
}

function getServerSnapshot(): RoadmapProgressStoreV1 {
  return DEFAULT_PROGRESS_STORE;
}

export interface ModuleProgressMetrics {
  completedCount: number;
  totalCount: number;
  percent: number;
  state: ProgressState;
}

export interface PhaseProgressMetrics {
  completedCount: number;
  totalCount: number;
  percent: number;
  state: ProgressState;
  completedModulesCount: number;
  totalModulesCount: number;
}

export interface PhaseReadinessMetrics {
  checkedCount: number;
  totalCount: number;
  allChecked: boolean;
}

export interface ContinueLearningTarget {
  phase: RoadmapPhase;
  module: RoadmapModule;
  topic: RoadmapTopic;
  hasAnyProgress: boolean;
  isAllCompleted: boolean;
}

export interface CourseLibraryProgressMetrics {
  bookmarkedCount: number;
  inProgressCount: number;
  completedCount: number;
  notStartedCount: number;
  totalResourcesCount: number;
}

export interface ProjectProgressMetrics {
  projectId: string;
  completedTaskCount: number;
  totalTaskCount: number;
  percent: number;
  status: ProgressState;
  isAllTasksCompleted: boolean;
  isConfirmedCompleted: boolean;
  isStartedManually: boolean;
  isBookmarked: boolean;
  hasGithubSubmission: boolean;
  githubSubmission: ProjectGithubSubmission | null;
  note: ProjectNoteRecord | null;
  updatedAtIso: string | null;
}

export interface ProjectCatalogProgressMetrics {
  totalProjectsCount: number;
  notStartedCount: number;
  inProgressCount: number;
  completedCount: number;
  bookmarkedCount: number;
  completedTasksCount: number;
  totalTasksCount: number;
  overallTaskPercent: number;
  linkedReposCount: number;
}

export function deriveProgressState(
  completedCount: number,
  totalCount: number
): ProgressState {
  if (completedCount <= 0 || totalCount <= 0) return "not_started";
  if (completedCount >= totalCount) return "completed";
  return "in_progress";
}

function computeContinueLearningTarget(
  completedTopicsSet: ReadonlySet<string>,
  lastVisitedModuleId: string | null,
  lastVisitedPhaseId: string | null
): ContinueLearningTarget {
  const hasAnyProgress =
    completedTopicsSet.size > 0 || lastVisitedPhaseId !== null;

  if (lastVisitedModuleId) {
    for (const phase of COMPLETE_ROADMAP_PHASES) {
      for (const mod of phase.modules) {
        if (mod.id === lastVisitedModuleId) {
          const firstIncomplete = mod.topics.find(
            (t) => !completedTopicsSet.has(t.id)
          );
          if (firstIncomplete) {
            return {
              phase,
              module: mod,
              topic: firstIncomplete,
              hasAnyProgress,
              isAllCompleted: false,
            };
          }
        }
      }
    }
  }

  if (lastVisitedPhaseId) {
    const visitedPhase = COMPLETE_ROADMAP_PHASES.find(
      (p) => p.id === lastVisitedPhaseId
    );
    if (visitedPhase) {
      for (const mod of visitedPhase.modules) {
        const firstIncomplete = mod.topics.find(
          (t) => !completedTopicsSet.has(t.id)
        );
        if (firstIncomplete) {
          return {
            phase: visitedPhase,
            module: mod,
            topic: firstIncomplete,
            hasAnyProgress,
            isAllCompleted: false,
          };
        }
      }
    }
  }

  for (const phase of COMPLETE_ROADMAP_PHASES) {
    for (const mod of phase.modules) {
      const firstIncomplete = mod.topics.find(
        (t) => !completedTopicsSet.has(t.id)
      );
      if (firstIncomplete) {
        return {
          phase,
          module: mod,
          topic: firstIncomplete,
          hasAnyProgress,
          isAllCompleted: false,
        };
      }
    }
  }

  const finalPhase =
    COMPLETE_ROADMAP_PHASES[COMPLETE_ROADMAP_PHASES.length - 1];
  const finalModule = finalPhase.modules[finalPhase.modules.length - 1];
  const finalTopic = finalModule.topics[finalModule.topics.length - 1];

  return {
    phase: finalPhase,
    module: finalModule,
    topic: finalTopic,
    hasAnyProgress: true,
    isAllCompleted: true,
  };
}

function computeCourseLibraryMetrics(
  bookmarkedSet: ReadonlySet<string>,
  statuses: Record<string, ProgressState>
): CourseLibraryProgressMetrics {
  const totalResourcesCount = ALL_COURSE_RESOURCES.length;
  let inProgressCount = 0;
  let completedCount = 0;

  for (const resource of ALL_COURSE_RESOURCES) {
    const status = statuses[resource.id] ?? "not_started";
    if (status === "in_progress") {
      inProgressCount += 1;
    } else if (status === "completed") {
      completedCount += 1;
    }
  }

  const notStartedCount = Math.max(
    0,
    totalResourcesCount - inProgressCount - completedCount
  );

  return {
    bookmarkedCount: bookmarkedSet.size,
    inProgressCount,
    completedCount,
    notStartedCount,
    totalResourcesCount,
  };
}

function didPhaseJustComplete(
  phaseId: string,
  prevCompletedIds: string[],
  nextCompletedIds: string[]
): RoadmapPhase | undefined {
  const phase = COMPLETE_ROADMAP_PHASES.find((p) => p.id === phaseId);
  if (!phase) return undefined;
  const phaseTopicIds = phase.modules.flatMap((m) => m.topics.map((t) => t.id));
  if (phaseTopicIds.length === 0) return undefined;

  const prevSet = new Set(prevCompletedIds);
  const nextSet = new Set(nextCompletedIds);
  const wasComplete = phaseTopicIds.every((id) => prevSet.has(id));
  const isNowComplete = phaseTopicIds.every((id) => nextSet.has(id));

  return !wasComplete && isNowComplete ? phase : undefined;
}

export function useRoadmapProgress() {
  const mounted = useMounted();
  const todayDateKey = mounted ? toLocalDateKey() : "2026-01-05";

  const store = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const completedTopicsSet = useMemo(
    () => new Set(store.completedTopicIds),
    [store.completedTopicIds]
  );

  const completedReadinessSet = useMemo(
    () => new Set(store.completedReadinessCheckIds),
    [store.completedReadinessCheckIds]
  );

  const completedMilestonesSet = useMemo(
    () => new Set(store.completedMilestoneIds),
    [store.completedMilestoneIds]
  );

  const bookmarkedResourcesSet = useMemo(
    () => new Set(store.bookmarkedResourceIds),
    [store.bookmarkedResourceIds]
  );

  const completedProjectTasksSet = useMemo(
    () => new Set(store.completedProjectTaskIds),
    [store.completedProjectTaskIds]
  );

  const startedProjectsSet = useMemo(
    () => new Set(store.startedProjectIds),
    [store.startedProjectIds]
  );

  const bookmarkedProjectsSet = useMemo(
    () => new Set(store.bookmarkedProjectIds),
    [store.bookmarkedProjectIds]
  );

  const isTopicCompleted = useCallback(
    (topicId: string) => completedTopicsSet.has(topicId),
    [completedTopicsSet]
  );

  const isReadinessChecked = useCallback(
    (checkId: string) => completedReadinessSet.has(checkId),
    [completedReadinessSet]
  );

  const isMilestoneCompleted = useCallback(
    (milestoneId: string) => completedMilestonesSet.has(milestoneId),
    [completedMilestonesSet]
  );

  const isResourceBookmarked = useCallback(
    (resourceId: string) => bookmarkedResourcesSet.has(resourceId),
    [bookmarkedResourcesSet]
  );

  const isProjectTaskCompleted = useCallback(
    (taskId: string) => completedProjectTasksSet.has(taskId),
    [completedProjectTasksSet]
  );

  const isProjectBookmarked = useCallback(
    (projectId: string) => bookmarkedProjectsSet.has(projectId),
    [bookmarkedProjectsSet]
  );

  const getResourceStatus = useCallback(
    (resourceId: string): ProgressState => {
      return store.resourceStatuses[resourceId] ?? "not_started";
    },
    [store.resourceStatuses]
  );

  const toggleTopic = useCallback(
    (topicId: string, phaseId: string, moduleId: string) => {
      if (!VALID_TOPIC_IDS.has(topicId)) return;
      const current = getClientSnapshot();
      const exists = current.completedTopicIds.includes(topicId);
      const nextCompleted = exists
        ? current.completedTopicIds.filter((id) => id !== topicId)
        : [...current.completedTopicIds, topicId];

      let nextActivity = current.activityEvents;
      if (!exists) {
        const meta = TOPIC_METADATA_MAP.get(topicId);
        const eventsToAdd: Omit<
          LearningActivityEvent,
          "id" | "timestampIso" | "localDateKey"
        >[] = [
          {
            type: "topic_completed",
            entityId: topicId,
            phaseId: meta?.phase.id ?? phaseId,
            label: meta
              ? `Completed topic: ${meta.topic.title}`
              : `Completed topic (${topicId})`,
            detail: meta
              ? `Phase ${meta.phase.phase} · Module ${meta.module.code}`
              : undefined,
          },
        ];

        const completedPhase = didPhaseJustComplete(
          phaseId,
          current.completedTopicIds,
          nextCompleted
        );
        if (completedPhase) {
          eventsToAdd.unshift({
            type: "phase_completed",
            entityId: completedPhase.id,
            phaseId: completedPhase.id,
            label: `Completed Phase ${completedPhase.phase}: ${completedPhase.title}`,
            detail: `All ${completedPhase.modules.length} modules mastered`,
          });
        }

        nextActivity = appendActivityEvents(current.activityEvents, eventsToAdd);
      }

      persistStore({
        ...current,
        completedTopicIds: nextCompleted,
        activityEvents: nextActivity,
        lastVisitedPhaseId: VALID_PHASE_IDS.has(phaseId)
          ? phaseId
          : current.lastVisitedPhaseId,
        lastVisitedModuleId: VALID_MODULE_IDS.has(moduleId)
          ? moduleId
          : current.lastVisitedModuleId,
        lastVisitedTopicId: topicId,
        updatedAtIso: new Date().toISOString(),
      });
    },
    []
  );

  const setModuleTopicsCompleted = useCallback(
    (
      moduleId: string,
      phaseId: string,
      topicIds: string[],
      completed: boolean
    ) => {
      const validIds = topicIds.filter((id) => VALID_TOPIC_IDS.has(id));
      if (validIds.length === 0) return;

      const current = getClientSnapshot();
      const currentSet = new Set(current.completedTopicIds);
      if (completed) {
        for (const id of validIds) currentSet.add(id);
      } else {
        for (const id of validIds) currentSet.delete(id);
      }
      const nextCompleted = Array.from(currentSet);

      let nextActivity = current.activityEvents;
      if (completed) {
        const phaseObj = COMPLETE_ROADMAP_PHASES.find((p) => p.id === phaseId);
        const modObj = phaseObj?.modules.find((m) => m.id === moduleId);
        const eventsToAdd: Omit<
          LearningActivityEvent,
          "id" | "timestampIso" | "localDateKey"
        >[] = [
          {
            type: "topic_completed",
            entityId: moduleId,
            phaseId,
            label: modObj
              ? `Completed all topics in Module ${modObj.code}: ${modObj.title}`
              : `Completed module ${moduleId}`,
            detail: `${validIds.length} topics checked`,
          },
        ];

        const completedPhase = didPhaseJustComplete(
          phaseId,
          current.completedTopicIds,
          nextCompleted
        );
        if (completedPhase) {
          eventsToAdd.unshift({
            type: "phase_completed",
            entityId: completedPhase.id,
            phaseId: completedPhase.id,
            label: `Completed Phase ${completedPhase.phase}: ${completedPhase.title}`,
            detail: `All ${completedPhase.modules.length} modules mastered`,
          });
        }
        nextActivity = appendActivityEvents(current.activityEvents, eventsToAdd);
      }

      persistStore({
        ...current,
        completedTopicIds: nextCompleted,
        activityEvents: nextActivity,
        lastVisitedPhaseId: VALID_PHASE_IDS.has(phaseId)
          ? phaseId
          : current.lastVisitedPhaseId,
        lastVisitedModuleId: VALID_MODULE_IDS.has(moduleId)
          ? moduleId
          : current.lastVisitedModuleId,
        lastVisitedTopicId: validIds[validIds.length - 1] ?? null,
        updatedAtIso: new Date().toISOString(),
      });
    },
    []
  );

  const toggleReadinessCheck = useCallback(
    (checkId: string, phaseId?: string) => {
      if (!VALID_READINESS_CHECK_IDS.has(checkId)) return;
      const current = getClientSnapshot();
      const exists = current.completedReadinessCheckIds.includes(checkId);
      const nextChecked = exists
        ? current.completedReadinessCheckIds.filter((id) => id !== checkId)
        : [...current.completedReadinessCheckIds, checkId];

      persistStore({
        ...current,
        completedReadinessCheckIds: nextChecked,
        lastVisitedPhaseId:
          phaseId && VALID_PHASE_IDS.has(phaseId)
            ? phaseId
            : current.lastVisitedPhaseId,
        updatedAtIso: new Date().toISOString(),
      });
    },
    []
  );

  const toggleMilestone = useCallback(
    (milestoneId: string, phaseId?: string) => {
      if (!VALID_MILESTONE_IDS.has(milestoneId)) return;
      const current = getClientSnapshot();
      const nowIso = new Date().toISOString();
      const exists = current.completedMilestoneIds.includes(milestoneId);
      const nextMilestones = exists
        ? current.completedMilestoneIds.filter((id) => id !== milestoneId)
        : [...current.completedMilestoneIds, milestoneId];

      const projectObj = getProjectById(milestoneId);
      const nextTaskSet = new Set(current.completedProjectTaskIds);
      const nextStartedSet = new Set(current.startedProjectIds);

      if (!exists && projectObj) {
        // Marking completed ensures all project tasks are checked so progress is 100%
        for (const task of projectObj.tasks) {
          nextTaskSet.add(task.id);
        }
        nextStartedSet.add(milestoneId);
      }

      let nextActivity = current.activityEvents;
      if (!exists) {
        const milestoneObj = ALL_PRIMARY_MILESTONES.find(
          (m) => m.id === milestoneId
        );
        nextActivity = appendActivityEvents(current.activityEvents, [
          {
            type: "milestone_completed",
            entityId: milestoneId,
            phaseId:
              phaseId ??
              (milestoneObj ? `phase-${milestoneObj.phase}` : undefined),
            label: milestoneObj
              ? `Completed Project #${milestoneObj.milestoneNumber}: ${milestoneObj.title}`
              : `Completed project milestone (${milestoneId})`,
            detail: milestoneObj
              ? `Phase ${milestoneObj.phase} Hands-On Project`
              : undefined,
          },
        ]);
      }

      persistStore({
        ...current,
        completedMilestoneIds: nextMilestones,
        completedProjectTaskIds: Array.from(nextTaskSet),
        startedProjectIds: Array.from(nextStartedSet),
        projectUpdatedAt: {
          ...current.projectUpdatedAt,
          [milestoneId]: nowIso,
        },
        activityEvents: nextActivity,
        lastVisitedPhaseId:
          phaseId && VALID_PHASE_IDS.has(phaseId)
            ? phaseId
            : current.lastVisitedPhaseId,
        updatedAtIso: nowIso,
      });
    },
    []
  );

  const toggleResourceBookmark = useCallback((resourceId: string) => {
    if (!VALID_RESOURCE_IDS.has(resourceId)) return;
    const current = getClientSnapshot();
    const exists = current.bookmarkedResourceIds.includes(resourceId);
    const nextBookmarks = exists
      ? current.bookmarkedResourceIds.filter((id) => id !== resourceId)
      : [...current.bookmarkedResourceIds, resourceId];

    persistStore({
      ...current,
      bookmarkedResourceIds: nextBookmarks,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const setResourceStatus = useCallback(
    (resourceId: string, status: ProgressState) => {
      if (!VALID_RESOURCE_IDS.has(resourceId) || !isValidProgressState(status)) {
        return;
      }
      const current = getClientSnapshot();
      const nextStatuses = { ...current.resourceStatuses };
      const nextTimestamps = { ...current.resourceStatusUpdatedAt };
      const nowIso = new Date().toISOString();

      if (status === "not_started") {
        delete nextStatuses[resourceId];
      } else {
        nextStatuses[resourceId] = status;
      }
      nextTimestamps[resourceId] = nowIso;

      let nextActivity = current.activityEvents;
      if (status === "in_progress" || status === "completed") {
        const resourceObj = getResourceById(resourceId);
        nextActivity = appendActivityEvents(current.activityEvents, [
          {
            type:
              status === "completed"
                ? "course_completed"
                : "course_in_progress",
            entityId: resourceId,
            phaseId: resourceObj
              ? `phase-${resourceObj.primaryPhase}`
              : undefined,
            label:
              status === "completed"
                ? `Completed course resource: ${resourceObj?.title ?? resourceId}`
                : `Started studying resource: ${resourceObj?.title ?? resourceId}`,
            detail: resourceObj
              ? `${resourceObj.provider} · ${resourceObj.resourceType}`
              : undefined,
          },
        ]);
      }

      persistStore({
        ...current,
        resourceStatuses: nextStatuses,
        resourceStatusUpdatedAt: nextTimestamps,
        activityEvents: nextActivity,
        updatedAtIso: nowIso,
      });
    },
    []
  );

  const recordResourceViewed = useCallback((resourceId: string) => {
    if (!VALID_RESOURCE_IDS.has(resourceId)) return;
    const current = getClientSnapshot();
    if (current.recentlyViewedResourceIds[0] === resourceId) {
      return;
    }
    const nextRecent = [
      resourceId,
      ...current.recentlyViewedResourceIds.filter((id) => id !== resourceId),
    ].slice(0, 8);

    persistStore({
      ...current,
      recentlyViewedResourceIds: nextRecent,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const recordVisitedLocation = useCallback(
    (phaseId: string, moduleId?: string | null) => {
      const current = getClientSnapshot();
      const validPhaseId = VALID_PHASE_IDS.has(phaseId)
        ? phaseId
        : current.lastVisitedPhaseId;
      const validModuleId =
        moduleId && VALID_MODULE_IDS.has(moduleId)
          ? moduleId
          : current.lastVisitedModuleId;

      if (
        validPhaseId === current.lastVisitedPhaseId &&
        validModuleId === current.lastVisitedModuleId
      ) {
        return;
      }

      persistStore({
        ...current,
        lastVisitedPhaseId: validPhaseId,
        lastVisitedModuleId: validModuleId,
        updatedAtIso: new Date().toISOString(),
      });
    },
    []
  );

  // ==========================================================================
  // STAGE 5 ACTIONS: PREFERENCES, GOALS, STUDY TIMER, SESSIONS & PLANNER
  // ==========================================================================

  const updateLearnerPreferences = useCallback(
    (patch: Partial<LearnerPreferences>) => {
      const current = getClientSnapshot();
      const nextPrefs = sanitizeLearnerPreferences({
        ...current.learnerPreferences,
        ...patch,
      });
      persistStore({
        ...current,
        learnerPreferences: nextPrefs,
        updatedAtIso: new Date().toISOString(),
      });
    },
    []
  );

  const saveStudyGoal = useCallback((patch: Partial<StudyGoalConfig>) => {
    const current = getClientSnapshot();
    const nowIso = new Date().toISOString();
    const nextGoal = sanitizeStudyGoal({
      ...current.studyGoal,
      ...patch,
      isConfigured: true,
      updatedAtIso: nowIso,
    });
    persistStore({
      ...current,
      studyGoal: nextGoal,
      updatedAtIso: nowIso,
    });
  }, []);

  const resetStudyGoal = useCallback(() => {
    const current = getClientSnapshot();
    persistStore({
      ...current,
      studyGoal: {
        ...DEFAULT_STUDY_GOAL,
        updatedAtIso: new Date().toISOString(),
      },
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const startTimerSession = useCallback(
    (phaseId: string, moduleId: string | null = null, note: string = "") => {
      const current = getClientSnapshot();
      const now = new Date();
      const validPhase = VALID_PHASE_IDS.has(phaseId) ? phaseId : "phase-0";
      const validModule =
        moduleId && VALID_MODULE_IDS.has(moduleId) ? moduleId : null;

      const timerState: ActiveStudyTimerState = {
        sessionId: `timer-${now.getTime()}`,
        startedAtIso: now.toISOString(),
        status: "running",
        accumulatedElapsedMs: 0,
        lastResumedAtEpochMs: now.getTime(),
        phaseId: validPhase,
        moduleId: validModule,
        note: note.trim().slice(0, 280),
      };

      persistStore({
        ...current,
        activeTimerSession: timerState,
        updatedAtIso: now.toISOString(),
      });
    },
    []
  );

  const pauseTimerSession = useCallback(() => {
    const current = getClientSnapshot();
    const timer = current.activeTimerSession;
    if (!timer || timer.status !== "running") return;

    const nowMs = Date.now();
    const deltaMs = timer.lastResumedAtEpochMs
      ? Math.max(0, nowMs - timer.lastResumedAtEpochMs)
      : 0;

    persistStore({
      ...current,
      activeTimerSession: {
        ...timer,
        status: "paused",
        accumulatedElapsedMs: timer.accumulatedElapsedMs + deltaMs,
        lastResumedAtEpochMs: null,
      },
      updatedAtIso: new Date(nowMs).toISOString(),
    });
  }, []);

  const resumeTimerSession = useCallback(() => {
    const current = getClientSnapshot();
    const timer = current.activeTimerSession;
    if (!timer || timer.status !== "paused") return;

    const nowMs = Date.now();
    persistStore({
      ...current,
      activeTimerSession: {
        ...timer,
        status: "running",
        lastResumedAtEpochMs: nowMs,
      },
      updatedAtIso: new Date(nowMs).toISOString(),
    });
  }, []);

  const updateActiveTimerMeta = useCallback(
    (patch: {
      phaseId?: string;
      moduleId?: string | null;
      note?: string;
    }) => {
      const current = getClientSnapshot();
      const timer = current.activeTimerSession;
      if (!timer) return;

      persistStore({
        ...current,
        activeTimerSession: {
          ...timer,
          phaseId:
            patch.phaseId && VALID_PHASE_IDS.has(patch.phaseId)
              ? patch.phaseId
              : timer.phaseId,
          moduleId:
            patch.moduleId !== undefined
              ? patch.moduleId && VALID_MODULE_IDS.has(patch.moduleId)
                ? patch.moduleId
                : null
              : timer.moduleId,
          note:
            patch.note !== undefined
              ? patch.note.slice(0, 280)
              : timer.note,
        },
        updatedAtIso: new Date().toISOString(),
      });
    },
    []
  );

  const finishTimerSession = useCallback((overrideNote?: string) => {
    const current = getClientSnapshot();
    const timer = current.activeTimerSession;
    if (!timer) return null;

    const now = new Date();
    const nowMs = now.getTime();
    const runningDeltaMs =
      timer.status === "running" && timer.lastResumedAtEpochMs
        ? Math.max(0, nowMs - timer.lastResumedAtEpochMs)
        : 0;
    const totalElapsedMs = timer.accumulatedElapsedMs + runningDeltaMs;
    const durationMinutes = Math.max(
      1,
      Math.min(1440, Math.round(totalElapsedMs / 60000))
    );

    const finalNote = (overrideNote ?? timer.note).trim().slice(0, 280);
    const localDateKey = toLocalDateKey(now);

    const newSession: StudySessionRecord = {
      id: `sess-${nowMs}-${Math.random().toString(36).slice(2, 6)}`,
      startedAtIso: timer.startedAtIso,
      endedAtIso: now.toISOString(),
      localDateKey,
      durationMinutes,
      phaseId: timer.phaseId,
      moduleId: timer.moduleId,
      note: finalNote,
      entryMethod: "timer",
    };

    const phaseObj = COMPLETE_ROADMAP_PHASES.find(
      (p) => p.id === timer.phaseId
    );
    const modObj = phaseObj?.modules.find((m) => m.id === timer.moduleId);

    const nextActivity = appendActivityEvents(current.activityEvents, [
      {
        type: "study_session_logged",
        entityId: newSession.id,
        phaseId: timer.phaseId,
        label: `Completed ${formatDurationMinutes(durationMinutes)} timed study session`,
        detail: modObj
          ? `Phase ${phaseObj?.phase} · Module ${modObj.code}: ${modObj.title}`
          : phaseObj
            ? `Phase ${phaseObj.phase}: ${phaseObj.title}`
            : undefined,
      },
    ]);

    persistStore({
      ...current,
      studySessions: [newSession, ...current.studySessions].slice(0, 500),
      activeTimerSession: null,
      activityEvents: nextActivity,
      updatedAtIso: now.toISOString(),
    });

    return newSession;
  }, []);

  const discardTimerSession = useCallback(() => {
    const current = getClientSnapshot();
    if (!current.activeTimerSession) return;
    persistStore({
      ...current,
      activeTimerSession: null,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const logManualStudySession = useCallback(
    (input: {
      dateKey: string;
      durationMinutes: number;
      phaseId: string;
      moduleId: string | null;
      note: string;
    }) => {
      const current = getClientSnapshot();
      const now = new Date();
      const safeDuration = Math.max(
        1,
        Math.min(1440, Math.round(input.durationMinutes || 30))
      );
      const safeDateKey = isValidDateKey(input.dateKey)
        ? input.dateKey
        : toLocalDateKey(now);
      const validPhase = VALID_PHASE_IDS.has(input.phaseId)
        ? input.phaseId
        : "phase-0";
      const validModule =
        input.moduleId && VALID_MODULE_IDS.has(input.moduleId)
          ? input.moduleId
          : null;

      const newSession: StudySessionRecord = {
        id: `sess-manual-${now.getTime()}-${Math.random().toString(36).slice(2, 6)}`,
        startedAtIso: now.toISOString(),
        endedAtIso: now.toISOString(),
        localDateKey: safeDateKey,
        durationMinutes: safeDuration,
        phaseId: validPhase,
        moduleId: validModule,
        note: input.note.trim().slice(0, 280),
        entryMethod: "manual",
      };

      const phaseObj = COMPLETE_ROADMAP_PHASES.find((p) => p.id === validPhase);
      const modObj = phaseObj?.modules.find((m) => m.id === validModule);

      const nextActivity = appendActivityEvents(current.activityEvents, [
        {
          type: "study_session_logged",
          entityId: newSession.id,
          phaseId: validPhase,
          label: `Logged ${formatDurationMinutes(safeDuration)} study session (Manual Log)`,
          detail: modObj
            ? `Phase ${phaseObj?.phase} · Module ${modObj.code} · ${safeDateKey}`
            : phaseObj
              ? `Phase ${phaseObj.phase}: ${phaseObj.title} · ${safeDateKey}`
              : safeDateKey,
        },
      ]);

      persistStore({
        ...current,
        studySessions: [newSession, ...current.studySessions].slice(0, 500),
        activityEvents: nextActivity,
        updatedAtIso: now.toISOString(),
      });

      return newSession;
    },
    []
  );

  const deleteStudySession = useCallback((sessionId: string) => {
    const current = getClientSnapshot();
    persistStore({
      ...current,
      studySessions: current.studySessions.filter((s) => s.id !== sessionId),
      activityEvents: current.activityEvents.filter(
        (ev) => ev.entityId !== sessionId
      ),
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const clearStudySessions = useCallback(() => {
    const current = getClientSnapshot();
    persistStore({
      ...current,
      studySessions: [],
      activeTimerSession: null,
      activityEvents: current.activityEvents.filter(
        (ev) => ev.type !== "study_session_logged"
      ),
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const addPlannerTask = useCallback(
    (input: {
      title: string;
      dateKey: string;
      phaseId: string;
      moduleId: string | null;
      estimatedMinutes: number;
    }) => {
      const trimmedTitle = input.title.trim();
      if (!trimmedTitle) return null;
      const current = getClientSnapshot();
      const now = new Date();
      const safeDateKey = isValidDateKey(input.dateKey)
        ? input.dateKey
        : toLocalDateKey(now);
      const validPhase = VALID_PHASE_IDS.has(input.phaseId)
        ? input.phaseId
        : "phase-0";
      const validModule =
        input.moduleId && VALID_MODULE_IDS.has(input.moduleId)
          ? input.moduleId
          : null;
      const safeMinutes = Math.max(
        5,
        Math.min(600, Math.round(input.estimatedMinutes || 45))
      );

      const newTask: StudyPlannerTask = {
        id: `task-${now.getTime()}-${Math.random().toString(36).slice(2, 6)}`,
        title: trimmedTitle.slice(0, 160),
        dateKey: safeDateKey,
        phaseId: validPhase,
        moduleId: validModule,
        estimatedMinutes: safeMinutes,
        status: "planned",
        completedAtIso: null,
        createdAtIso: now.toISOString(),
      };

      persistStore({
        ...current,
        plannerTasks: [newTask, ...current.plannerTasks].slice(0, 300),
        updatedAtIso: now.toISOString(),
      });

      return newTask;
    },
    []
  );

  const updatePlannerTask = useCallback(
    (
      taskId: string,
      patch: Partial<
        Pick<
          StudyPlannerTask,
          | "title"
          | "dateKey"
          | "phaseId"
          | "moduleId"
          | "estimatedMinutes"
          | "status"
        >
      >
    ) => {
      const current = getClientSnapshot();
      const existing = current.plannerTasks.find((t) => t.id === taskId);
      if (!existing) return;

      const now = new Date();
      const nextStatus =
        patch.status && isValidPlannerStatus(patch.status)
          ? patch.status
          : existing.status;

      const updatedTask: StudyPlannerTask = {
        ...existing,
        title:
          typeof patch.title === "string" && patch.title.trim()
            ? patch.title.trim().slice(0, 160)
            : existing.title,
        dateKey:
          patch.dateKey && isValidDateKey(patch.dateKey)
            ? patch.dateKey
            : existing.dateKey,
        phaseId:
          patch.phaseId && VALID_PHASE_IDS.has(patch.phaseId)
            ? patch.phaseId
            : existing.phaseId,
        moduleId:
          patch.moduleId !== undefined
            ? patch.moduleId && VALID_MODULE_IDS.has(patch.moduleId)
              ? patch.moduleId
              : null
            : existing.moduleId,
        estimatedMinutes:
          typeof patch.estimatedMinutes === "number" &&
          Number.isFinite(patch.estimatedMinutes)
            ? Math.max(5, Math.min(600, Math.round(patch.estimatedMinutes)))
            : existing.estimatedMinutes,
        status: nextStatus,
        completedAtIso:
          nextStatus === "completed"
            ? existing.completedAtIso ?? now.toISOString()
            : null,
      };

      let nextActivity = current.activityEvents;
      if (existing.status !== "completed" && nextStatus === "completed") {
        const phaseObj = COMPLETE_ROADMAP_PHASES.find(
          (p) => p.id === updatedTask.phaseId
        );
        nextActivity = appendActivityEvents(current.activityEvents, [
          {
            type: "planner_task_completed",
            entityId: updatedTask.id,
            phaseId: updatedTask.phaseId,
            label: `Completed study task: ${updatedTask.title}`,
            detail: phaseObj
              ? `Phase ${phaseObj.phase} · Est. ${formatDurationMinutes(updatedTask.estimatedMinutes)}`
              : undefined,
          },
        ]);
      }

      persistStore({
        ...current,
        plannerTasks: current.plannerTasks.map((t) =>
          t.id === taskId ? updatedTask : t
        ),
        activityEvents: nextActivity,
        updatedAtIso: now.toISOString(),
      });
    },
    []
  );

  const deletePlannerTask = useCallback((taskId: string) => {
    const current = getClientSnapshot();
    persistStore({
      ...current,
      plannerTasks: current.plannerTasks.filter((t) => t.id !== taskId),
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const clearPlannerTasks = useCallback(() => {
    const current = getClientSnapshot();
    persistStore({
      ...current,
      plannerTasks: [],
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const resetDashboardPreferencesOnly = useCallback(() => {
    const current = getClientSnapshot();
    persistStore({
      ...current,
      learnerPreferences: DEFAULT_LEARNER_PREFERENCES,
      studyGoal: DEFAULT_STUDY_GOAL,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  // ==========================================================================
  // STAGE 6 ACTIONS: PROJECTS, TASKS, GITHUB SUBMISSIONS & IMPLEMENTATION NOTES
  // ==========================================================================

  const toggleProjectTask = useCallback((projectId: string, taskId: string) => {
    if (
      !VALID_PROJECT_IDS.has(projectId) ||
      !VALID_PROJECT_TASK_IDS.has(taskId)
    ) {
      return;
    }
    const project = getProjectById(projectId);
    if (!project) return;

    const current = getClientSnapshot();
    const nowIso = new Date().toISOString();
    const taskSet = new Set(current.completedProjectTaskIds);
    const wasChecked = taskSet.has(taskId);

    if (wasChecked) {
      taskSet.delete(taskId);
    } else {
      taskSet.add(taskId);
    }

    // Count how many tasks of this project are now checked
    let projectCheckedCount = 0;
    for (const t of project.tasks) {
      if (taskSet.has(t.id)) {
        projectCheckedCount += 1;
      }
    }

    // If unchecking a task on a completed project, revert confirmed completion to in_progress
    let nextCompletedMilestones = current.completedMilestoneIds;
    const nextStartedSet = new Set(current.startedProjectIds);
    if (projectCheckedCount > 0) {
      nextStartedSet.add(projectId);
    }
    if (
      wasChecked &&
      projectCheckedCount < project.tasks.length &&
      current.completedMilestoneIds.includes(projectId)
    ) {
      nextCompletedMilestones = current.completedMilestoneIds.filter(
        (id) => id !== projectId
      );
      nextStartedSet.add(projectId);
    }

    let nextActivity = current.activityEvents;
    if (!wasChecked) {
      const taskObj = project.tasks.find((t) => t.id === taskId);
      nextActivity = appendActivityEvents(current.activityEvents, [
        {
          type: "project_task_completed",
          entityId: taskId,
          phaseId: `phase-${project.phase}`,
          label: `Completed Step ${taskObj?.stepNumber ?? ""}: ${taskObj?.title ?? taskId}`,
          detail: `Project #${project.milestoneNumber}: ${project.title} (${projectCheckedCount}/${project.tasks.length} steps)`,
        },
      ]);
    }

    persistStore({
      ...current,
      completedProjectTaskIds: Array.from(taskSet),
      startedProjectIds: Array.from(nextStartedSet),
      completedMilestoneIds: nextCompletedMilestones,
      projectUpdatedAt: {
        ...current.projectUpdatedAt,
        [projectId]: nowIso,
      },
      lastVisitedProjectId: projectId,
      activityEvents: nextActivity,
      updatedAtIso: nowIso,
    });
  }, []);

  const startProject = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const project = getProjectById(projectId);
    if (!project) return;

    const current = getClientSnapshot();
    const nowIso = new Date().toISOString();
    const alreadyStarted = current.startedProjectIds.includes(projectId);
    const nextStarted = alreadyStarted
      ? current.startedProjectIds
      : [...current.startedProjectIds, projectId];

    let nextActivity = current.activityEvents;
    if (!alreadyStarted && !current.completedMilestoneIds.includes(projectId)) {
      nextActivity = appendActivityEvents(current.activityEvents, [
        {
          type: "project_started",
          entityId: projectId,
          phaseId: `phase-${project.phase}`,
          label: `Started Project #${project.milestoneNumber}: ${project.title}`,
          detail: `Phase ${project.phase} · ${project.tasks.length} implementation steps`,
        },
      ]);
    }

    persistStore({
      ...current,
      startedProjectIds: nextStarted,
      projectUpdatedAt: {
        ...current.projectUpdatedAt,
        [projectId]: nowIso,
      },
      lastVisitedProjectId: projectId,
      activityEvents: nextActivity,
      updatedAtIso: nowIso,
    });
  }, []);

  const completeProject = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const project = getProjectById(projectId);
    if (!project) return;

    const current = getClientSnapshot();
    const nowIso = new Date().toISOString();
    const taskSet = new Set(current.completedProjectTaskIds);
    for (const t of project.tasks) {
      taskSet.add(t.id);
    }

    const nextMilestones = current.completedMilestoneIds.includes(projectId)
      ? current.completedMilestoneIds
      : [...current.completedMilestoneIds, projectId];

    const nextStarted = current.startedProjectIds.includes(projectId)
      ? current.startedProjectIds
      : [...current.startedProjectIds, projectId];

    const nextActivity = appendActivityEvents(current.activityEvents, [
      {
        type: "milestone_completed",
        entityId: projectId,
        phaseId: `phase-${project.phase}`,
        label: `Completed Project #${project.milestoneNumber}: ${project.title}`,
        detail: `All ${project.tasks.length} engineering steps verified`,
      },
    ]);

    persistStore({
      ...current,
      completedProjectTaskIds: Array.from(taskSet),
      completedMilestoneIds: nextMilestones,
      startedProjectIds: nextStarted,
      projectUpdatedAt: {
        ...current.projectUpdatedAt,
        [projectId]: nowIso,
      },
      lastVisitedProjectId: projectId,
      activityEvents: nextActivity,
      updatedAtIso: nowIso,
    });
  }, []);

  const revertProjectToInProgress = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const current = getClientSnapshot();
    const nowIso = new Date().toISOString();

    const nextMilestones = current.completedMilestoneIds.filter(
      (id) => id !== projectId
    );
    const nextStarted = current.startedProjectIds.includes(projectId)
      ? current.startedProjectIds
      : [...current.startedProjectIds, projectId];

    persistStore({
      ...current,
      completedMilestoneIds: nextMilestones,
      startedProjectIds: nextStarted,
      projectUpdatedAt: {
        ...current.projectUpdatedAt,
        [projectId]: nowIso,
      },
      lastVisitedProjectId: projectId,
      updatedAtIso: nowIso,
    });
  }, []);

  const resetSingleProjectProgress = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const project = getProjectById(projectId);
    if (!project) return;

    const current = getClientSnapshot();
    const nowIso = new Date().toISOString();
    const projectTaskIds = new Set(project.tasks.map((t) => t.id));

    const nextTasks = current.completedProjectTaskIds.filter(
      (id) => !projectTaskIds.has(id)
    );
    const nextStarted = current.startedProjectIds.filter(
      (id) => id !== projectId
    );
    const nextMilestones = current.completedMilestoneIds.filter(
      (id) => id !== projectId
    );

    persistStore({
      ...current,
      completedProjectTaskIds: nextTasks,
      startedProjectIds: nextStarted,
      completedMilestoneIds: nextMilestones,
      projectUpdatedAt: {
        ...current.projectUpdatedAt,
        [projectId]: nowIso,
      },
      updatedAtIso: nowIso,
    });
  }, []);

  const toggleProjectBookmark = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const current = getClientSnapshot();
    const exists = current.bookmarkedProjectIds.includes(projectId);
    const nextBookmarks = exists
      ? current.bookmarkedProjectIds.filter((id) => id !== projectId)
      : [...current.bookmarkedProjectIds, projectId];

    persistStore({
      ...current,
      bookmarkedProjectIds: nextBookmarks,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const recordVisitedProject = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const current = getClientSnapshot();
    if (current.lastVisitedProjectId === projectId) return;

    persistStore({
      ...current,
      lastVisitedProjectId: projectId,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const saveProjectGithubSubmission = useCallback(
    (
      projectId: string,
      input: {
        repoUrl: string;
        notes?: string;
        completedDateKey?: string | null;
      }
    ): { ok: boolean; message: string } => {
      if (!VALID_PROJECT_IDS.has(projectId)) {
        return { ok: false, message: "Unknown project ID." };
      }
      const trimmedUrl = input.repoUrl.trim().replace(/\/+$/, "");
      if (!isValidGithubRepoUrl(trimmedUrl)) {
        return {
          ok: false,
          message:
            "Please enter a valid GitHub repository URL formatted as https://github.com/owner/repository",
        };
      }

      const project = getProjectById(projectId);
      const current = getClientSnapshot();
      const nowIso = new Date().toISOString();
      const safeDateKey = isValidDateKey(input.completedDateKey)
        ? input.completedDateKey
        : toLocalDateKey(new Date());

      const submission: ProjectGithubSubmission = {
        repoUrl: trimmedUrl,
        notes: (input.notes ?? "").trim().slice(0, 600),
        completedDateKey: safeDateKey,
        updatedAtIso: nowIso,
      };

      const nextActivity = appendActivityEvents(current.activityEvents, [
        {
          type: "project_repo_linked",
          entityId: projectId,
          phaseId: project ? `phase-${project.phase}` : undefined,
          label: `Linked GitHub repository for ${project?.title ?? projectId}`,
          detail: trimmedUrl,
        },
      ]);

      persistStore({
        ...current,
        projectGithubSubmissions: {
          ...current.projectGithubSubmissions,
          [projectId]: submission,
        },
        projectUpdatedAt: {
          ...current.projectUpdatedAt,
          [projectId]: nowIso,
        },
        activityEvents: nextActivity,
        updatedAtIso: nowIso,
      });

      return {
        ok: true,
        message: "GitHub repository link saved locally.",
      };
    },
    []
  );

  const removeProjectGithubSubmission = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const current = getClientSnapshot();
    if (!current.projectGithubSubmissions[projectId]) return;

    const nextSubs = { ...current.projectGithubSubmissions };
    delete nextSubs[projectId];

    persistStore({
      ...current,
      projectGithubSubmissions: nextSubs,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const saveProjectNote = useCallback((projectId: string, content: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const current = getClientSnapshot();
    const nowIso = new Date().toISOString();
    const nextNotes = { ...current.projectNotes };

    if (!content.trim()) {
      delete nextNotes[projectId];
    } else {
      nextNotes[projectId] = {
        content: content.slice(0, 8000),
        updatedAtIso: nowIso,
      };
    }

    persistStore({
      ...current,
      projectNotes: nextNotes,
      projectUpdatedAt: {
        ...current.projectUpdatedAt,
        [projectId]: nowIso,
      },
      updatedAtIso: nowIso,
    });
  }, []);

  const clearProjectNote = useCallback((projectId: string) => {
    if (!VALID_PROJECT_IDS.has(projectId)) return;
    const current = getClientSnapshot();
    if (!current.projectNotes[projectId]) return;

    const nextNotes = { ...current.projectNotes };
    delete nextNotes[projectId];

    persistStore({
      ...current,
      projectNotes: nextNotes,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const exportProgressBackupJson = useCallback((): string => {
    const current = getClientSnapshot();
    return JSON.stringify(current, null, 2);
  }, []);

  const importProgressBackupJson = useCallback(
    (
      rawJson: string,
      mode: "merge" | "replace"
    ): { ok: boolean; message: string } => {
      try {
        const parsed: unknown = JSON.parse(rawJson);
        if (
          !parsed ||
          typeof parsed !== "object" ||
          (parsed as { schemaVersion?: unknown }).schemaVersion !== 1
        ) {
          return {
            ok: false,
            message:
              "Invalid backup file: expected schemaVersion 1 Open AI Roadmap JSON.",
          };
        }

        const incoming = sanitizeProgressStore(parsed);
        const nowIso = new Date().toISOString();

        if (mode === "replace") {
          persistStore({
            ...incoming,
            updatedAtIso: nowIso,
          });
          return {
            ok: true,
            message: "Progress backup restored (replaced current state).",
          };
        }

        // Merge mode: non-destructively union IDs and combine unique records
        const current = getClientSnapshot();
        const mergedTopics = Array.from(
          new Set([
            ...current.completedTopicIds,
            ...incoming.completedTopicIds,
          ])
        );
        const mergedReadiness = Array.from(
          new Set([
            ...current.completedReadinessCheckIds,
            ...incoming.completedReadinessCheckIds,
          ])
        );
        const mergedMilestones = Array.from(
          new Set([
            ...current.completedMilestoneIds,
            ...incoming.completedMilestoneIds,
          ])
        );
        const mergedBookmarks = Array.from(
          new Set([
            ...current.bookmarkedResourceIds,
            ...incoming.bookmarkedResourceIds,
          ])
        );

        const mergedStatuses: Record<string, ProgressState> = {
          ...incoming.resourceStatuses,
          ...current.resourceStatuses,
        };
        const mergedStatusTimes: Record<string, string> = {
          ...incoming.resourceStatusUpdatedAt,
          ...current.resourceStatusUpdatedAt,
        };

        const mergedSessions = sanitizeStudySessions([
          ...current.studySessions,
          ...incoming.studySessions,
        ]);
        const mergedTasks = sanitizePlannerTasks([
          ...current.plannerTasks,
          ...incoming.plannerTasks,
        ]);
        const mergedEvents = sanitizeActivityEvents([
          ...current.activityEvents,
          ...incoming.activityEvents,
        ]);

        const mergedProjectTasks = Array.from(
          new Set([
            ...current.completedProjectTaskIds,
            ...incoming.completedProjectTaskIds,
          ])
        );
        const mergedStartedProjects = Array.from(
          new Set([
            ...current.startedProjectIds,
            ...incoming.startedProjectIds,
          ])
        );
        const mergedBookmarkedProjects = Array.from(
          new Set([
            ...current.bookmarkedProjectIds,
            ...incoming.bookmarkedProjectIds,
          ])
        );
        const mergedProjectUpdatedAt: Record<string, string> = {
          ...incoming.projectUpdatedAt,
          ...current.projectUpdatedAt,
        };
        const mergedProjectGithubSubmissions: Record<
          string,
          ProjectGithubSubmission
        > = {
          ...incoming.projectGithubSubmissions,
          ...current.projectGithubSubmissions,
        };
        const mergedProjectNotes: Record<string, ProjectNoteRecord> = {
          ...incoming.projectNotes,
          ...current.projectNotes,
        };

        persistStore({
          ...current,
          completedTopicIds: mergedTopics,
          completedReadinessCheckIds: mergedReadiness,
          completedMilestoneIds: mergedMilestones,
          bookmarkedResourceIds: mergedBookmarks,
          resourceStatuses: mergedStatuses,
          resourceStatusUpdatedAt: mergedStatusTimes,
          studySessions: mergedSessions,
          plannerTasks: mergedTasks,
          activityEvents: mergedEvents,
          completedProjectTaskIds: mergedProjectTasks,
          startedProjectIds: mergedStartedProjects,
          bookmarkedProjectIds: mergedBookmarkedProjects,
          projectUpdatedAt: mergedProjectUpdatedAt,
          projectGithubSubmissions: mergedProjectGithubSubmissions,
          projectNotes: mergedProjectNotes,
          lastVisitedProjectId:
            current.lastVisitedProjectId ?? incoming.lastVisitedProjectId,
          learnerPreferences: {
            displayName:
              current.learnerPreferences.displayName ||
              incoming.learnerPreferences.displayName,
            onboardingCompleted:
              current.learnerPreferences.onboardingCompleted ||
              incoming.learnerPreferences.onboardingCompleted,
            onboardingSkipped:
              current.learnerPreferences.onboardingSkipped ||
              incoming.learnerPreferences.onboardingSkipped,
          },
          studyGoal: current.studyGoal.isConfigured
            ? current.studyGoal
            : incoming.studyGoal,
          updatedAtIso: nowIso,
        });

        return {
          ok: true,
          message: "Progress backup merged with your existing browser data.",
        };
      } catch {
        return {
          ok: false,
          message: "Could not parse JSON file. Please select a valid backup.",
        };
      }
    },
    []
  );

  const resetProgress = useCallback(() => {
    persistStore({
      ...DEFAULT_PROGRESS_STORE,
      updatedAtIso: new Date().toISOString(),
    });
  }, []);

  const getProjectProgress = useCallback(
    (projectOrId: CurriculumProject | string): ProjectProgressMetrics => {
      const project =
        typeof projectOrId === "string"
          ? getProjectById(projectOrId)
          : projectOrId;
      if (!project) {
        return {
          projectId: typeof projectOrId === "string" ? projectOrId : "",
          completedTaskCount: 0,
          totalTaskCount: 0,
          percent: 0,
          status: "not_started",
          isAllTasksCompleted: false,
          isConfirmedCompleted: false,
          isStartedManually: false,
          isBookmarked: false,
          hasGithubSubmission: false,
          githubSubmission: null,
          note: null,
          updatedAtIso: null,
        };
      }

      const totalTaskCount = project.tasks.length;
      let completedTaskCount = 0;
      for (const task of project.tasks) {
        if (completedProjectTasksSet.has(task.id)) {
          completedTaskCount += 1;
        }
      }

      const isConfirmedCompleted = completedMilestonesSet.has(project.id);
      if (isConfirmedCompleted && totalTaskCount > 0) {
        completedTaskCount = totalTaskCount;
      }

      const isAllTasksCompleted =
        totalTaskCount > 0 && completedTaskCount >= totalTaskCount;
      const isStartedManually = startedProjectsSet.has(project.id);

      const percent =
        totalTaskCount > 0
          ? Math.round((completedTaskCount / totalTaskCount) * 100)
          : 0;

      let status: ProgressState = "not_started";
      if (isConfirmedCompleted) {
        status = "completed";
      } else if (completedTaskCount > 0 || isStartedManually) {
        status = "in_progress";
      }

      const githubSubmission =
        store.projectGithubSubmissions[project.id] ?? null;
      const note = store.projectNotes[project.id] ?? null;

      return {
        projectId: project.id,
        completedTaskCount,
        totalTaskCount,
        percent,
        status,
        isAllTasksCompleted,
        isConfirmedCompleted,
        isStartedManually,
        isBookmarked: bookmarkedProjectsSet.has(project.id),
        hasGithubSubmission: Boolean(githubSubmission),
        githubSubmission,
        note,
        updatedAtIso: store.projectUpdatedAt[project.id] ?? null,
      };
    },
    [
      bookmarkedProjectsSet,
      completedMilestonesSet,
      completedProjectTasksSet,
      startedProjectsSet,
      store.projectGithubSubmissions,
      store.projectNotes,
      store.projectUpdatedAt,
    ]
  );

  const projectCatalogMetrics = useMemo((): ProjectCatalogProgressMetrics => {
    let notStartedCount = 0;
    let inProgressCount = 0;
    let completedCount = 0;
    let completedTasksCount = 0;

    for (const project of ALL_CURRICULUM_PROJECTS) {
      const m = getProjectProgress(project);
      completedTasksCount += m.completedTaskCount;
      if (m.status === "completed") {
        completedCount += 1;
      } else if (m.status === "in_progress") {
        inProgressCount += 1;
      } else {
        notStartedCount += 1;
      }
    }

    const totalTasksCount = PROJECT_CATALOG_STATS.totalTasks;
    const overallTaskPercent =
      totalTasksCount > 0
        ? Math.round((completedTasksCount / totalTasksCount) * 100)
        : 0;

    return {
      totalProjectsCount: ALL_CURRICULUM_PROJECTS.length,
      notStartedCount,
      inProgressCount,
      completedCount,
      bookmarkedCount: bookmarkedProjectsSet.size,
      completedTasksCount,
      totalTasksCount,
      overallTaskPercent,
      linkedReposCount: Object.keys(store.projectGithubSubmissions).length,
    };
  }, [
    bookmarkedProjectsSet.size,
    getProjectProgress,
    store.projectGithubSubmissions,
  ]);

  const getModuleProgress = useCallback(
    (mod: RoadmapModule): ModuleProgressMetrics => {
      const totalCount = mod.topics.length;
      if (totalCount === 0) {
        return {
          completedCount: 0,
          totalCount: 0,
          percent: 0,
          state: "not_started",
        };
      }
      let completedCount = 0;
      for (const topic of mod.topics) {
        if (completedTopicsSet.has(topic.id)) {
          completedCount += 1;
        }
      }
      const percent = Math.round((completedCount / totalCount) * 100);
      return {
        completedCount,
        totalCount,
        percent,
        state: deriveProgressState(completedCount, totalCount),
      };
    },
    [completedTopicsSet]
  );

  const getPhaseProgress = useCallback(
    (phase: RoadmapPhase): PhaseProgressMetrics => {
      let completedCount = 0;
      let totalCount = 0;
      let completedModulesCount = 0;

      for (const mod of phase.modules) {
        let modCompleted = 0;
        for (const topic of mod.topics) {
          totalCount += 1;
          if (completedTopicsSet.has(topic.id)) {
            completedCount += 1;
            modCompleted += 1;
          }
        }
        if (mod.topics.length > 0 && modCompleted === mod.topics.length) {
          completedModulesCount += 1;
        }
      }

      const percent =
        totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      return {
        completedCount,
        totalCount,
        percent,
        state: deriveProgressState(completedCount, totalCount),
        completedModulesCount,
        totalModulesCount: phase.modules.length,
      };
    },
    [completedTopicsSet]
  );

  const getPhaseReadinessProgress = useCallback(
    (phase: RoadmapPhase): PhaseReadinessMetrics => {
      const totalCount = phase.completionChecklist.length;
      let checkedCount = 0;
      for (const item of phase.completionChecklist) {
        if (completedReadinessSet.has(item.id)) {
          checkedCount += 1;
        }
      }
      return {
        checkedCount,
        totalCount,
        allChecked: totalCount > 0 && checkedCount === totalCount,
      };
    },
    [completedReadinessSet]
  );

  const overallProgress = useMemo(() => {
    const completedTopicsCount = completedTopicsSet.size;
    const totalTopicsCount = ROADMAP_STATS.totalTopics;
    const percent =
      totalTopicsCount > 0
        ? Math.round((completedTopicsCount / totalTopicsCount) * 100)
        : 0;

    let completedPhasesCount = 0;
    let inProgressPhasesCount = 0;
    let completedModulesCount = 0;

    for (const phase of COMPLETE_ROADMAP_PHASES) {
      const phaseMetrics = getPhaseProgress(phase);
      if (phaseMetrics.state === "completed") {
        completedPhasesCount += 1;
      } else if (phaseMetrics.state === "in_progress") {
        inProgressPhasesCount += 1;
      }
      completedModulesCount += phaseMetrics.completedModulesCount;
    }

    return {
      completedTopicsCount,
      totalTopicsCount,
      remainingTopicsCount: Math.max(0, totalTopicsCount - completedTopicsCount),
      percent,
      state: deriveProgressState(completedTopicsCount, totalTopicsCount),
      completedPhasesCount,
      inProgressPhasesCount,
      totalPhasesCount: ROADMAP_STATS.totalPhases,
      completedModulesCount,
      totalModulesCount: ROADMAP_STATS.totalModules,
      completedMilestonesCount: completedMilestonesSet.size,
      totalMilestonesCount: ROADMAP_STATS.totalPrimaryProjects,
    };
  }, [completedTopicsSet, completedMilestonesSet, getPhaseProgress]);

  const continueLearningTarget = useMemo(
    () =>
      computeContinueLearningTarget(
        completedTopicsSet,
        store.lastVisitedModuleId,
        store.lastVisitedPhaseId
      ),
    [completedTopicsSet, store]
  );

  const courseLibraryProgress = useMemo(
    () =>
      computeCourseLibraryMetrics(bookmarkedResourcesSet, store.resourceStatuses),
    [bookmarkedResourcesSet, store]
  );

  const featuredRecommendedProject = useMemo((): CurriculumProject => {
    const activePhaseNum = continueLearningTarget.phase.phase;
    const phaseMatch = ALL_CURRICULUM_PROJECTS.find(
      (proj) =>
        proj.phase === activePhaseNum && !completedMilestonesSet.has(proj.id)
    );
    if (phaseMatch) return phaseMatch;

    const firstUnfinished = ALL_CURRICULUM_PROJECTS.find(
      (proj) => !completedMilestonesSet.has(proj.id)
    );
    return firstUnfinished ?? ALL_CURRICULUM_PROJECTS[0];
  }, [completedMilestonesSet, continueLearningTarget.phase.phase]);

  const continueProjectTarget = useMemo((): {
    project: CurriculumProject;
    isInProgress: boolean;
    metrics: ProjectProgressMetrics;
  } => {
    // 1. If lastVisitedProjectId is currently in progress, prioritize it
    if (store.lastVisitedProjectId) {
      const visited = getProjectById(store.lastVisitedProjectId);
      if (visited) {
        const m = getProjectProgress(visited);
        if (m.status === "in_progress") {
          return { project: visited, isInProgress: true, metrics: m };
        }
      }
    }

    // 2. Otherwise pick the most recently updated in-progress project
    const inProgressList = ALL_CURRICULUM_PROJECTS.map((project) => ({
      project,
      metrics: getProjectProgress(project),
    })).filter((entry) => entry.metrics.status === "in_progress");

    if (inProgressList.length > 0) {
      inProgressList.sort((a, b) => {
        const timeA = a.metrics.updatedAtIso ?? "";
        const timeB = b.metrics.updatedAtIso ?? "";
        if (timeA !== timeB) return timeB.localeCompare(timeA);
        return a.project.milestoneNumber - b.project.milestoneNumber;
      });
      return {
        project: inProgressList[0].project,
        isInProgress: true,
        metrics: inProgressList[0].metrics,
      };
    }

    // 3. Fallback to featured recommended project
    return {
      project: featuredRecommendedProject,
      isInProgress: false,
      metrics: getProjectProgress(featuredRecommendedProject),
    };
  }, [
    featuredRecommendedProject,
    getProjectProgress,
    store.lastVisitedProjectId,
  ]);

  // ==========================================================================
  // DERIVED STAGE 5 & 6 SELECTORS: STREAKS, STUDY TIME, ACHIEVEMENTS & INSIGHTS
  // ==========================================================================

  const activeStudyDateKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const session of store.studySessions) {
      if (isValidDateKey(session.localDateKey)) {
        keys.add(session.localDateKey);
      }
    }
    for (const ev of store.activityEvents) {
      if (isValidDateKey(ev.localDateKey)) {
        keys.add(ev.localDateKey);
      }
    }
    for (const task of store.plannerTasks) {
      if (task.status === "completed" && task.completedAtIso) {
        keys.add(isoToLocalDateKey(task.completedAtIso, task.dateKey));
      }
    }
    return keys;
  }, [store]);

  const studyTimeMetrics = useMemo(() => {
    const minutesByDate: Record<string, number> = {};
    let totalAllTimeMinutes = 0;

    for (const session of store.studySessions) {
      totalAllTimeMinutes += session.durationMinutes;
      minutesByDate[session.localDateKey] =
        (minutesByDate[session.localDateKey] ?? 0) + session.durationMinutes;
    }

    return {
      minutesByDate,
      totalAllTimeMinutes,
      totalSessionsCount: store.studySessions.length,
    };
  }, [store]);

  const achievements = useMemo((): AchievementDefinition[] => {
    const streak = computeLearningStreak(activeStudyDateKeys, todayDateKey);
    const startedOrCompletedProjectsCount =
      projectCatalogMetrics.inProgressCount +
      projectCatalogMetrics.completedCount;

    return [
      {
        id: "first-topic-completed",
        title: "First Topic Completed",
        description:
          "Check off your first roadmap curriculum topic.",
        conditionLabel: "Complete 1 roadmap topic",
        unlocked: overallProgress.completedTopicsCount >= 1,
        progressText: `${Math.min(1, overallProgress.completedTopicsCount)} / 1 topic`,
      },
      {
        id: "first-module-completed",
        title: "First Module Mastered",
        description:
          "Complete 100% of the topics inside any curriculum module.",
        conditionLabel: "Complete 1 full module",
        unlocked: overallProgress.completedModulesCount >= 1,
        progressText: `${Math.min(1, overallProgress.completedModulesCount)} / 1 module`,
      },
      {
        id: "first-phase-completed",
        title: "First Phase Completed",
        description:
          "Complete every module and topic across an entire roadmap phase.",
        conditionLabel: "Complete 1 full phase",
        unlocked: overallProgress.completedPhasesCount >= 1,
        progressText: `${overallProgress.completedPhasesCount} / 9 phases`,
      },
      {
        id: "first-course-completed",
        title: "First Course Completed",
        description:
          "Finish and mark complete a resource from the Free Courses Library.",
        conditionLabel: "Mark 1 course resource Completed",
        unlocked: courseLibraryProgress.completedCount >= 1,
        progressText: `${Math.min(1, courseLibraryProgress.completedCount)} / 1 resource`,
      },
      {
        id: "first-study-session",
        title: "First Recorded Study Session",
        description:
          "Record a focused study session using the timer or manual study log.",
        conditionLabel: "Log 1 study session",
        unlocked: store.studySessions.length >= 1,
        progressText: `${Math.min(1, store.studySessions.length)} / 1 session`,
      },
      {
        id: "first-project-started",
        title: "First Project Started",
        description:
          "Start building or check off your first implementation step in any hands-on project.",
        conditionLabel: "Start 1 curriculum project",
        unlocked: startedOrCompletedProjectsCount >= 1,
        progressText: `${Math.min(1, startedOrCompletedProjectsCount)} / 1 project started`,
      },
      {
        id: "first-project-milestone",
        title: "First Project Completed",
        description:
          "Complete all implementation steps and confirm your first curriculum project.",
        conditionLabel: "Complete 1 primary project",
        unlocked: overallProgress.completedMilestonesCount >= 1,
        progressText: `${overallProgress.completedMilestonesCount} / 14 projects`,
      },
      {
        id: "first-github-repo-linked",
        title: "First GitHub Repository Linked",
        description:
          "Link your first self-reported GitHub implementation repository to a project.",
        conditionLabel: "Link 1 GitHub repository URL",
        unlocked: projectCatalogMetrics.linkedReposCount >= 1,
        progressText: `${Math.min(1, projectCatalogMetrics.linkedReposCount)} / 1 repository`,
      },
      {
        id: "five-projects-completed",
        title: "Five Projects Completed",
        description:
          "Build and complete 5 hands-on AI & LLM engineering projects across the roadmap.",
        conditionLabel: "Complete 5 primary projects",
        unlocked: overallProgress.completedMilestonesCount >= 5,
        progressText: `${Math.min(5, overallProgress.completedMilestonesCount)} / 5 projects`,
      },
      {
        id: "all-fourteen-projects-completed",
        title: "All 14 Projects Completed",
        description:
          "Complete every hands-on project from the Matrix Operations Engine to Research Reproduction.",
        conditionLabel: "Complete all 14 curriculum projects",
        unlocked:
          overallProgress.completedMilestonesCount ===
          overallProgress.totalMilestonesCount,
        progressText: `${overallProgress.completedMilestonesCount} / ${overallProgress.totalMilestonesCount} projects`,
      },
      {
        id: "seven-day-streak",
        title: "Seven-Day Study Rhythm",
        description:
          "Record learning activity across 7 consecutive local calendar days.",
        conditionLabel: "Reach a 7-day learning streak",
        unlocked: streak.longestStreak >= 7,
        progressText: `Best: ${streak.longestStreak} / 7 days`,
      },
      {
        id: "all-nine-phases-completed",
        title: "Complete AI & LLM Architect",
        description:
          "Master all topics across all nine roadmap phases from Python to Advanced LLM Systems.",
        conditionLabel: "Complete all 9 phases",
        unlocked:
          overallProgress.completedPhasesCount ===
          overallProgress.totalPhasesCount,
        progressText: `${overallProgress.completedPhasesCount} / ${overallProgress.totalPhasesCount} phases`,
      },
    ];
  }, [
    activeStudyDateKeys,
    courseLibraryProgress.completedCount,
    overallProgress.completedMilestonesCount,
    overallProgress.completedModulesCount,
    overallProgress.completedPhasesCount,
    overallProgress.completedTopicsCount,
    overallProgress.totalMilestonesCount,
    overallProgress.totalPhasesCount,
    projectCatalogMetrics.completedCount,
    projectCatalogMetrics.inProgressCount,
    projectCatalogMetrics.linkedReposCount,
    store,
    todayDateKey,
  ]);

  const learningInsights = useMemo((): LearningInsightItem[] => {
    const items: LearningInsightItem[] = [];
    const currentPhase = continueLearningTarget.phase;
    const currentPhaseMetrics = getPhaseProgress(currentPhase);

    // 1. Current Phase Topic Insight
    items.push({
      id: "insight-phase-topics",
      category: "progress",
      title: `You've completed ${currentPhaseMetrics.completedCount} of ${currentPhaseMetrics.totalCount} topics in Phase ${currentPhase.phase} (${currentPhase.title}).`,
      detail:
        currentPhaseMetrics.completedCount === 0
          ? `Start with Module ${continueLearningTarget.module.code}: ${continueLearningTarget.module.title}.`
          : `${currentPhaseMetrics.totalCount - currentPhaseMetrics.completedCount} topics remaining in this phase (${currentPhaseMetrics.percent}% complete).`,
      href: `/roadmap#${currentPhase.slug}`,
      ctaLabel: `Open Phase ${currentPhase.phase}`,
    });

    // 2. Active or Recommended Project Insight
    const activeProj = continueProjectTarget.project;
    const activeProjMetrics = continueProjectTarget.metrics;
    items.push({
      id: "insight-active-project",
      category: "next_step",
      title: continueProjectTarget.isInProgress
        ? `Project #${activeProj.milestoneNumber} (${activeProj.title}) is In Progress (${activeProjMetrics.completedTaskCount}/${activeProjMetrics.totalTaskCount} steps).`
        : `Recommended Phase ${activeProj.phase} Build: Project #${activeProj.milestoneNumber} — ${activeProj.title}.`,
      detail: continueProjectTarget.isInProgress
        ? `${activeProjMetrics.percent}% of required implementation tasks completed.`
        : activeProj.shortDescription,
      href: `/projects/${activeProj.slug}`,
      ctaLabel: continueProjectTarget.isInProgress
        ? "Continue Project"
        : "Open Project Guide",
    });

    // 3. Active Courses Insight (only when supported by actual data)
    if (courseLibraryProgress.inProgressCount > 0) {
      items.push({
        id: "insight-active-courses",
        category: "courses",
        title: `You have ${courseLibraryProgress.inProgressCount} ${courseLibraryProgress.inProgressCount === 1 ? "course" : "courses"} marked In Progress.`,
        detail:
          courseLibraryProgress.completedCount > 0
            ? `Plus ${courseLibraryProgress.completedCount} completed ${courseLibraryProgress.completedCount === 1 ? "resource" : "resources"} in your library.`
            : "Continue working through your active learning resources alongside your current phase.",
        href: "/courses",
        ctaLabel: "View Courses",
      });
    }

    // 4. Weekly Study Time Insight (when sessions exist)
    if (store.studySessions.length > 0) {
      const weekMonday = getStartOfLocalWeek(todayDateKey);
      let weekMinutes = 0;
      for (const s of store.studySessions) {
        if (s.localDateKey >= weekMonday && s.localDateKey <= todayDateKey) {
          weekMinutes += s.durationMinutes;
        }
      }
      items.push({
        id: "insight-weekly-time",
        category: "study_time",
        title: `You logged ${formatDurationMinutes(weekMinutes)} of study this week across ${store.studySessions.length} total recorded ${store.studySessions.length === 1 ? "session" : "sessions"}.`,
        detail: store.studyGoal.isConfigured
          ? `Weekly target: ${formatDurationMinutes(store.studyGoal.weeklyMinutesTarget)} (${store.studyGoal.dailyMinutesTarget}m × ${store.studyGoal.studyDaysPerWeek} days).`
          : "Configure a weekly study goal to compare your logged sessions against a target pace.",
      });
    }

    return items;
  }, [
    continueLearningTarget,
    continueProjectTarget,
    courseLibraryProgress.completedCount,
    courseLibraryProgress.inProgressCount,
    getPhaseProgress,
    store,
    todayDateKey,
  ]);

  return {
    store,
    todayDateKey,
    isStoragePersistent: storageIsAvailable,
    overallProgress,
    continueLearningTarget,
    courseLibraryProgress,
    projectCatalogMetrics,
    featuredRecommendedProject,
    continueProjectTarget,
    activeStudyDateKeys,
    studyTimeMetrics,
    achievements,
    learningInsights,
    isTopicCompleted,
    isReadinessChecked,
    isMilestoneCompleted,
    isResourceBookmarked,
    isProjectTaskCompleted,
    isProjectBookmarked,
    getResourceStatus,
    getProjectProgress,
    toggleTopic,
    setModuleTopicsCompleted,
    toggleReadinessCheck,
    toggleMilestone,
    toggleResourceBookmark,
    setResourceStatus,
    recordResourceViewed,
    recordVisitedLocation,
    updateLearnerPreferences,
    saveStudyGoal,
    resetStudyGoal,
    startTimerSession,
    pauseTimerSession,
    resumeTimerSession,
    updateActiveTimerMeta,
    finishTimerSession,
    discardTimerSession,
    logManualStudySession,
    deleteStudySession,
    clearStudySessions,
    addPlannerTask,
    updatePlannerTask,
    deletePlannerTask,
    clearPlannerTasks,
    resetDashboardPreferencesOnly,
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
    exportProgressBackupJson,
    importProgressBackupJson,
    resetProgress,
    getModuleProgress,
    getPhaseProgress,
    getPhaseReadinessProgress,
  };
}
