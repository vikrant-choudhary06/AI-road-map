import type { PrimaryProjectMilestone, RoadmapPhase } from "@/types";
import { PHASES_0_TO_2 } from "./phases-0-to-2";
import { PHASE_3_DEEP_LEARNING } from "./phase-3";
import { PHASE_4_NLP_LANGUAGE_MODELING } from "./phase-4";
import { PHASE_5_TRANSFORMERS_FROM_SCRATCH } from "./phase-5";
import { PHASE_6_TRAIN_YOUR_OWN_LLM } from "./phase-6";
import { PHASE_7_POST_TRAINING_ALIGNMENT } from "./phase-7";
import { PHASE_8_ADVANCED_SYSTEMS_RESEARCH } from "./phase-8";

/**
 * Complete 9-Phase AI & LLM Learning Roadmap (Phase 0 – Phase 8).
 * Ordered strictly by prerequisite sequence.
 */
export const COMPLETE_ROADMAP_PHASES: RoadmapPhase[] = [
  ...PHASES_0_TO_2,
  PHASE_3_DEEP_LEARNING,
  PHASE_4_NLP_LANGUAGE_MODELING,
  PHASE_5_TRANSFORMERS_FROM_SCRATCH,
  PHASE_6_TRAIN_YOUR_OWN_LLM,
  PHASE_7_POST_TRAINING_ALIGNMENT,
  PHASE_8_ADVANCED_SYSTEMS_RESEARCH,
];

/**
 * All 14 canonical primary project milestones across the curriculum,
 * ordered by milestoneNumber (1 through 14).
 */
export const ALL_PRIMARY_MILESTONES: PrimaryProjectMilestone[] =
  COMPLETE_ROADMAP_PHASES.flatMap((phase) => phase.primaryProjects).sort(
    (a, b) => a.milestoneNumber - b.milestoneNumber
  );

/**
 * Precomputed curriculum statistics used by the Roadmap Hero, Phase Navigation,
 * and Progress Tracking store.
 */
export const ROADMAP_STATS = {
  totalPhases: COMPLETE_ROADMAP_PHASES.length,
  totalWeeks: COMPLETE_ROADMAP_PHASES.reduce(
    (sum, phase) => sum + phase.estimatedWeeks,
    0
  ),
  weeklyHoursEstimate: "15–20 hours/week",
  totalModules: COMPLETE_ROADMAP_PHASES.reduce(
    (sum, phase) => sum + phase.modules.length,
    0
  ),
  totalTopics: COMPLETE_ROADMAP_PHASES.reduce(
    (sum, phase) =>
      sum +
      phase.modules.reduce(
        (moduleSum, mod) => moduleSum + mod.topics.length,
        0
      ),
    0
  ),
  totalPrimaryProjects: ALL_PRIMARY_MILESTONES.length,
  totalAssignments: COMPLETE_ROADMAP_PHASES.reduce(
    (sum, phase) => sum + phase.assignments.length,
    0
  ),
} as const;

/**
 * Lookup sets for validating persisted localStorage progress IDs.
 */
export const VALID_TOPIC_IDS: ReadonlySet<string> = new Set(
  COMPLETE_ROADMAP_PHASES.flatMap((phase) =>
    phase.modules.flatMap((mod) => mod.topics.map((topic) => topic.id))
  )
);

export const VALID_READINESS_CHECK_IDS: ReadonlySet<string> = new Set(
  COMPLETE_ROADMAP_PHASES.flatMap((phase) =>
    phase.completionChecklist.map((item) => item.id)
  )
);

export const VALID_MILESTONE_IDS: ReadonlySet<string> = new Set(
  ALL_PRIMARY_MILESTONES.map((milestone) => milestone.id)
);

export const VALID_PHASE_IDS: ReadonlySet<string> = new Set(
  COMPLETE_ROADMAP_PHASES.map((phase) => phase.id)
);

export const VALID_MODULE_IDS: ReadonlySet<string> = new Set(
  COMPLETE_ROADMAP_PHASES.flatMap((phase) =>
    phase.modules.map((mod) => mod.id)
  )
);

/**
 * Resolves a phase by its ID ("phase-0"), slug ("phase-0-programming-foundations"),
 * or phase number string/number. Also handles partial prefix matches so landing
 * page anchors always resolve cleanly.
 */
export function resolvePhaseByAnchorOrId(
  query: string | null | undefined
): RoadmapPhase | undefined {
  if (!query) return undefined;
  const normalized = query.replace(/^#/, "").trim().toLowerCase();
  if (!normalized) return undefined;

  const exactMatch = COMPLETE_ROADMAP_PHASES.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      p.slug.toLowerCase() === normalized ||
      `phase-${p.phase}` === normalized
  );
  if (exactMatch) return exactMatch;

  const prefixMatch = COMPLETE_ROADMAP_PHASES.find((p) =>
    normalized.startsWith(`phase-${p.phase}`)
  );
  return prefixMatch;
}
