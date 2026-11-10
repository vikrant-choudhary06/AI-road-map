import type { DifficultyLevel, PhaseNumber } from "./roadmap";

/**
 * Strongly typed domain architecture for Stage 6:
 * Complete AI/LLM Projects & Coding Challenges Platform.
 */

export type ProjectDifficultyCategory =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Research";

export interface ProjectTaskItem {
  /** Stable unique task ID used for localStorage persistence (e.g. "p1-t01") */
  id: string;
  stepNumber: number;
  title: string;
  explanation: string;
  instructions: string;
  expectedOutcome: string;
  acceptanceCriteria: string;
  hint?: string;
  difficulty?: "Core" | "Intermediate" | "Advanced";
}

export interface ProjectImplementationStage {
  stageNumber: number;
  title: string;
  summary: string;
  taskIds: string[];
}

export interface ProjectCodeExample {
  title: string;
  language: "python" | "bash" | "json";
  purpose: string;
  code: string;
}

export interface ProjectTestCaseItem {
  title: string;
  purpose: string;
  verificationSteps: string;
  expectedResult: string;
}

export interface ProjectTestingGuide {
  summary: string;
  testCases: ProjectTestCaseItem[];
  verificationCommand?: string;
}

export interface ProjectStretchChallenge {
  id: string;
  title: string;
  description: string;
  whatYouLearn: string;
}

export interface ProjectHintItem {
  id: string;
  title: string;
  category:
    | "Mathematical Formula"
    | "Expected Tensor Shapes"
    | "Debugging Technique"
    | "Common Mistake"
    | "Testing Strategy";
  content: string;
}

export interface ProjectGithubSubmissionGuidance {
  suggestedRepoName: string;
  recommendedStructure: string[];
  readmeChecklist: string[];
}

export interface CurriculumProject {
  /** Canonical ID matching ALL_PRIMARY_MILESTONES (e.g., "milestone-01-matrix-operations-engine") */
  id: string;
  /** Unique URL slug for `/projects/[slug]` */
  slug: string;
  /** Canonical number 1 through 14 */
  milestoneNumber: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  detailedOverview: string;
  whyThisProjectMatters: string;
  /** Associated roadmap phase (0–8) */
  phase: PhaseNumber;
  difficulty: DifficultyLevel;
  difficultyFilter: ProjectDifficultyCategory;
  difficultyLabel: string;
  estimatedEffort: string;
  educationalScaleNote?: string;
  securityRequirementsNote?: string;
  technologies: string[];
  prerequisites: string[];
  requiredMathConcepts: string[];
  learningObjectives: string[];
  skillsPracticed: string[];
  implementationStages: ProjectImplementationStage[];
  tasks: ProjectTaskItem[];
  acceptanceCriteria: string[];
  testingGuide: ProjectTestingGuide;
  codeExamples: ProjectCodeExample[];
  hints: ProjectHintItem[];
  optionalChallenges: ProjectStretchChallenge[];
  expectedDeliverable: string;
  deliverablesList: string[];
  /** Specific outcomes shown under "After Completing This Project, You Should Be Able To..." */
  learningOutcomes: string[];
  githubSubmissionGuidance: ProjectGithubSubmissionGuidance;
  /** Canonical course resource IDs from ALL_COURSE_RESOURCES */
  relatedResourceIds: string[];
  /** Canonical roadmap module IDs from COMPLETE_ROADMAP_PHASES */
  relatedModuleIds: string[];
  /** Canonical related project IDs */
  relatedProjectIds: string[];
}

export interface ProjectGithubSubmission {
  repoUrl: string;
  notes: string;
  completedDateKey: string | null;
  updatedAtIso: string;
}

export interface ProjectNoteRecord {
  content: string;
  updatedAtIso: string;
}

/**
 * Legacy summary retained for backwards compatibility.
 */
export interface ProjectSpecificationSummary {
  id: string;
  slug: string;
  title: string;
  phase: PhaseNumber;
  difficulty: DifficultyLevel;
  objective: string;
  skillsPracticed: string[];
}
