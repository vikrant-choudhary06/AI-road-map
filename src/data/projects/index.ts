import type { CurriculumProject, PhaseNumber } from "@/types";
import { PROJECTS_1_TO_5 } from "./projects-1-to-5";
import { PROJECTS_6_TO_10 } from "./projects-6-to-10";
import { PROJECTS_11_TO_14 } from "./projects-11-to-14";

/**
 * Complete catalog of all 14 canonical AI & LLM engineering projects
 * across Phases 0–8, ordered by milestoneNumber (1 through 14).
 */
export const ALL_CURRICULUM_PROJECTS: CurriculumProject[] = [
  ...PROJECTS_1_TO_5,
  ...PROJECTS_6_TO_10,
  ...PROJECTS_11_TO_14,
].sort((a, b) => a.milestoneNumber - b.milestoneNumber);

/**
 * Precomputed catalog statistics derived directly from the project dataset.
 */
export const PROJECT_CATALOG_STATS = {
  totalProjects: ALL_CURRICULUM_PROJECTS.length,
  totalPhasesCovered: new Set(ALL_CURRICULUM_PROJECTS.map((p) => p.phase)).size,
  totalTasks: ALL_CURRICULUM_PROJECTS.reduce(
    (sum, project) => sum + project.tasks.length,
    0
  ),
  totalOptionalChallenges: ALL_CURRICULUM_PROJECTS.reduce(
    (sum, project) => sum + project.optionalChallenges.length,
    0
  ),
  allTechnologies: Array.from(
    new Set(ALL_CURRICULUM_PROJECTS.flatMap((p) => p.technologies))
  ).sort(),
} as const;

/**
 * Fast lookup sets and maps for persistence validation and progress calculation.
 */
export const VALID_PROJECT_IDS: ReadonlySet<string> = new Set(
  ALL_CURRICULUM_PROJECTS.map((project) => project.id)
);

export const VALID_PROJECT_TASK_IDS: ReadonlySet<string> = new Set(
  ALL_CURRICULUM_PROJECTS.flatMap((project) =>
    project.tasks.map((task) => task.id)
  )
);

export const PROJECT_BY_ID: ReadonlyMap<string, CurriculumProject> = new Map(
  ALL_CURRICULUM_PROJECTS.map((project) => [project.id, project])
);

export const PROJECT_BY_SLUG: ReadonlyMap<string, CurriculumProject> = new Map(
  ALL_CURRICULUM_PROJECTS.map((project) => [project.slug, project])
);

export const PROJECT_ID_BY_TASK_ID: ReadonlyMap<string, string> = new Map(
  ALL_CURRICULUM_PROJECTS.flatMap((project) =>
    project.tasks.map((task) => [task.id, project.id] as const)
  )
);

export function getProjectBySlug(
  slug: string | null | undefined
): CurriculumProject | undefined {
  if (!slug) return undefined;
  return PROJECT_BY_SLUG.get(slug.trim().toLowerCase());
}

export function getProjectById(
  id: string | null | undefined
): CurriculumProject | undefined {
  if (!id) return undefined;
  return PROJECT_BY_ID.get(id.trim());
}

export function getProjectsForPhase(phase: PhaseNumber): CurriculumProject[] {
  return ALL_CURRICULUM_PROJECTS.filter((project) => project.phase === phase);
}
