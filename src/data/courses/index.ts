import type {
  CourseResource,
  PhaseNumber,
  PhaseResourcePlacement,
  ResourceRoleInPhase,
  ResourceType,
} from "@/types";
import { RESOURCES_PHASES_0_TO_4 } from "./resources-phases-0-to-4";
import { RESOURCES_PHASES_5_TO_8 } from "./resources-phases-5-to-8";

/**
 * Single source of truth for all canonical learning resources across Phases 0–8.
 * Shared multi-phase resources (D2L, Karpathy Zero to Hero, Stanford CS336,
 * nanoGPT, Full Stack Deep Learning) appear once here with multi-phase
 * `phasePlacements`.
 */
export const ALL_COURSE_RESOURCES: CourseResource[] = [
  ...RESOURCES_PHASES_0_TO_4,
  ...RESOURCES_PHASES_5_TO_8,
].sort((a, b) => a.recommendedOrder - b.recommendedOrder);

export const VALID_RESOURCE_IDS: ReadonlySet<string> = new Set(
  ALL_COURSE_RESOURCES.map((r) => r.id)
);

const RESOURCE_BY_ID_MAP: ReadonlyMap<string, CourseResource> = new Map(
  ALL_COURSE_RESOURCES.map((r) => [r.id, r])
);

const RESOURCE_BY_SLUG_MAP: ReadonlyMap<string, CourseResource> = new Map(
  ALL_COURSE_RESOURCES.map((r) => [r.slug, r])
);

export function getResourceById(
  id: string | null | undefined
): CourseResource | undefined {
  if (!id) return undefined;
  return RESOURCE_BY_ID_MAP.get(id);
}

export function getResourceBySlug(
  slug: string | null | undefined
): CourseResource | undefined {
  if (!slug) return undefined;
  return RESOURCE_BY_SLUG_MAP.get(slug);
}

export interface PhaseContextualResource {
  resource: CourseResource;
  placement: PhaseResourcePlacement;
  displayTitle: string;
}

/**
 * Returns all resources associated with a specific roadmap phase (0–8),
 * ordered by their curriculum catalog code (e.g., 0.1, 0.2 ... 8.8).
 */
export function getPhaseResourceEntries(
  phase: PhaseNumber
): PhaseContextualResource[] {
  const entries: PhaseContextualResource[] = [];

  for (const resource of ALL_COURSE_RESOURCES) {
    const placement = resource.phasePlacements.find((p) => p.phase === phase);
    if (placement) {
      entries.push({
        resource,
        placement,
        displayTitle: placement.phaseSpecificTitle ?? resource.title,
      });
    }
  }

  return entries.sort((a, b) =>
    a.placement.catalogCode.localeCompare(b.placement.catalogCode, undefined, {
      numeric: true,
    })
  );
}

export interface ModuleResourceMappingResult {
  resources: PhaseContextualResource[];
  isPhaseLevelFallback: boolean;
}

/**
 * Returns canonical resources mapped directly to a Stage 3 module ID.
 * If no direct module mapping exists, returns the phase's primary recommended
 * starting resources and sets `isPhaseLevelFallback: true`.
 */
export function getResourcesForModule(
  moduleId: string,
  phase: PhaseNumber
): ModuleResourceMappingResult {
  const phaseEntries = getPhaseResourceEntries(phase);
  const directMatches = phaseEntries.filter(
    (entry) =>
      entry.placement.moduleIds.includes(moduleId) ||
      entry.resource.relevantModuleIds.includes(moduleId)
  );

  if (directMatches.length > 0) {
    return {
      resources: directMatches,
      isPhaseLevelFallback: false,
    };
  }

  const phaseRecommended = phaseEntries.filter(
    (entry) =>
      entry.placement.isRecommendedStart ||
      entry.placement.role === "start_here"
  );

  return {
    resources:
      phaseRecommended.length > 0
        ? phaseRecommended
        : phaseEntries.slice(0, 2),
    isPhaseLevelFallback: true,
  };
}

/**
 * Derived provider groups from actual resource data for the Provider filter.
 */
export const AVAILABLE_PROVIDER_GROUPS: string[] = Array.from(
  new Set(ALL_COURSE_RESOURCES.map((r) => r.providerGroup))
).sort((a, b) => a.localeCompare(b));

/**
 * Resource Type filter groups matching Section 6.
 */
export const RESOURCE_TYPE_FILTER_GROUPS: {
  id: string;
  label: string;
  types: ResourceType[];
}[] = [
  {
    id: "full-courses",
    label: "Full Courses",
    types: ["Full Course"],
  },
  {
    id: "video-lectures-series",
    label: "Video Lectures / Series",
    types: ["Video Lecture", "Video Series"],
  },
  {
    id: "interactive-courses",
    label: "Interactive Courses",
    types: ["Interactive Course"],
  },
  {
    id: "tutorials",
    label: "Tutorials",
    types: ["Tutorial"],
  },
  {
    id: "textbooks",
    label: "Textbooks",
    types: ["Textbook"],
  },
  {
    id: "documentation",
    label: "Documentation",
    types: ["Documentation"],
  },
  {
    id: "github-repositories",
    label: "GitHub Repositories",
    types: ["GitHub Repository"],
  },
  {
    id: "research-papers",
    label: "Research Papers",
    types: ["Research Paper"],
  },
];

export const ROLE_LABELS: Record<ResourceRoleInPhase, string> = {
  start_here: "Start Here",
  additional_learning: "Additional Learning",
  practice_and_reference: "Practice & Reference",
  advanced_reading: "Advanced Reading",
};

/**
 * Precomputed statistics derived strictly from the real dataset.
 */
export const COURSE_LIBRARY_STATS = {
  totalUniqueResources: ALL_COURSE_RESOURCES.length,
  totalPhasePlacements: ALL_COURSE_RESOURCES.reduce(
    (sum, r) => sum + r.phasePlacements.length,
    0
  ),
  freeOpenAccessCount: ALL_COURSE_RESOURCES.filter(
    (r) => r.isFreeLearningMaterial
  ).length,
  recommendedStartCount: ALL_COURSE_RESOURCES.filter((r) => r.isRecommended)
    .length,
  totalProvidersCount: new Set(ALL_COURSE_RESOURCES.map((r) => r.provider))
    .size,
  countsByPhase: ([0, 1, 2, 3, 4, 5, 6, 7, 8] as PhaseNumber[]).reduce(
    (acc, phase) => {
      acc[phase] = getPhaseResourceEntries(phase).length;
      return acc;
    },
    {} as Record<PhaseNumber, number>
  ),
  countsByType: ALL_COURSE_RESOURCES.reduce(
    (acc, r) => {
      acc[r.resourceType] = (acc[r.resourceType] ?? 0) + 1;
      return acc;
    },
    {} as Record<ResourceType, number>
  ),
} as const;

/**
 * Canonical Featured Resources for the Stage 2 Landing Page Preview (Section 14).
 */
export const LANDING_FEATURED_RESOURCE_IDS = [
  "harvard-cs50-python",
  "mit-18-06sc-linear-algebra",
  "google-machine-learning-crash-course",
  "karpathy-zero-to-hero",
  "huggingface-llm-course",
  "stanford-cs336",
] as const;

export const LANDING_FEATURED_RESOURCES: CourseResource[] =
  LANDING_FEATURED_RESOURCE_IDS.map((id) => getResourceById(id)).filter(
    (r): r is CourseResource => Boolean(r)
  );
