import type { DifficultyLevel, PhaseNumber, ProgressState } from "./roadmap";

/**
 * Strongly typed data model for the Stage 4 Free Courses & Learning Resources Library.
 */

export type ResourceType =
  | "Full Course"
  | "Video Lecture"
  | "Video Series"
  | "Tutorial"
  | "Interactive Course"
  | "Textbook"
  | "Documentation"
  | "GitHub Repository"
  | "Research Paper";

export type ResourceRoleInPhase =
  | "start_here"
  | "additional_learning"
  | "practice_and_reference"
  | "advanced_reading";

export type ResourceAccessTier =
  | "free_open_access"
  | "free_audit_paid_certificate"
  | "mixed_free_and_paid";

export type LinkVerificationStatus = "verified" | "verified_redirect" | "unverified";

export interface PhaseResourcePlacement {
  phase: PhaseNumber;
  /** Curriculum catalog code from Section 4 (e.g., "0.1", "3.1", "4.3", "5.1") */
  catalogCode: string;
  /** Optional phase-Contextualized title (e.g., "Makemore — Neural Networks: Zero to Hero" in Phase 4) */
  phaseSpecificTitle?: string;
  /** Pedagogical role within this phase */
  role: ResourceRoleInPhase;
  /** Whether this resource is the primary recommended starting point for this phase */
  isRecommendedStart?: boolean;
  /** Phase-specific guidance explaining which lectures, chapters, or files to study */
  phaseGuidance: string;
  /** Associated Stage 3 roadmap module IDs in this phase */
  moduleIds: string[];
}

export interface CourseResource {
  /** Unique stable canonical ID used for bookmarking and progress persistence */
  id: string;
  /** Unique human-readable URL slug for `/courses/[slug]` */
  slug: string;
  /** Canonical title of the resource */
  title: string;
  /** Institution, educator, or open-source organization */
  provider: string;
  /** Normalized provider filter group (e.g. "Harvard", "MIT", "Stanford", "Hugging Face") */
  providerGroup: string;
  /** Concise summary of the resource */
  description: string;
  /** Extended editorial overview for `/courses/[slug]` */
  detailedDescription: string;
  /** Primary roadmap phase number (0–8) */
  primaryPhase: PhaseNumber;
  /** All roadmap phases where this resource is actively recommended */
  phases: PhaseNumber[];
  /** All Stage 3 roadmap module IDs linked to this resource */
  relevantModuleIds: string[];
  /** Phase-by-phase pedagogical placement and study recommendations */
  phasePlacements: PhaseResourcePlacement[];
  /** Strict canonical resource classification */
  resourceType: ResourceType;
  /** Optional specific format subtitle (e.g., "University Course Materials", "Course Module", "Mixed Free/Paid Catalog") */
  formatSubtitle?: string;
  /** Difficulty key matching roadmap difficulty levels */
  difficulty: DifficultyLevel;
  /** Human-readable difficulty label */
  difficultyLabel: "Beginner" | "Intermediate" | "Advanced" | "Research";
  /** Language when known */
  language?: string;
  /** Official destination URL */
  url: string;
  /** Whether the core educational material is freely accessible */
  isFreeLearningMaterial: boolean;
  /** Detailed access classification (distinguishing 100% free vs paid certificates vs mixed catalogs) */
  accessTier: ResourceAccessTier;
  /** Accurate note about free access, public materials, or optional certificate costs */
  accessNote: string;
  /** Optional note regarding certificate availability/cost */
  certificateCostNote?: string;
  /** Recommended prerequisites before starting this resource */
  prerequisites: string[];
  /** Key learning objectives covered by this resource */
  learningObjectives: string[];
  /** Suggested learning position in the curriculum */
  suggestedLearningPosition: string;
  /** Estimated study duration ONLY when reliably documented by the official source */
  estimatedDuration?: string;
  /** Global recommended order index for sorting */
  recommendedOrder: number;
  /** Whether this resource is highlighted as a primary phase recommendation */
  isRecommended: boolean;
  /** Searchable topic tags */
  tags: string[];
  /** Short geometric/typographic monogram for provider badge */
  providerMonogram: string;
  /** Link verification metadata */
  verification: {
    status: LinkVerificationStatus;
    checkedDate?: string;
    resolvedUrl?: string;
    note?: string;
  };
  /** Canonical IDs of closely related resources in the library */
  relatedResourceIds: string[];
}

export type ResourceLearningStatus = ProgressState;

/**
 * Legacy lightweight summary kept for backwards compatibility.
 */
export type CourseFormat =
  | "video_lecture"
  | "interactive_course"
  | "textbook"
  | "documentation"
  | "workshop";

export interface CourseResourceSummary {
  id: string;
  title: string;
  provider: string;
  instructor?: string;
  url: string;
  phase: PhaseNumber;
  difficulty: DifficultyLevel;
  format: CourseFormat;
  isFree: true;
}
