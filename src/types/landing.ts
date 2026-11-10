import type { DifficultyLevel, PhaseNumber } from "./roadmap";

/**
 * Types for the Stage 2 Landing Page sections and interactive previews.
 */

export interface HeroDiagramNode {
  id: string;
  stepNumber: string;
  label: string;
  shortLabel: string;
  phaseRange: string;
  category: "Foundations" | "Core ML & DL" | "LLM Engineering";
  summary: string;
  keyArtifact: string;
  outcome: string;
}

export interface JourneyPhasePreview {
  phase: PhaseNumber;
  code: string;
  slug: string;
  title: string;
  oneSentenceExplanation: string;
  estimatedWeeks: number;
  visualIdentifier: string;
  difficulty: DifficultyLevel;
  keyTopics: string[];
  milestoneDeliverable: string;
  prerequisites: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  artifactTitle: string;
  artifactItems: {
    label: string;
    detail: string;
    status?: "ready" | "active" | "locked";
  }[];
}

export interface FeatureHighlightItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  stageAvailability: string;
  spanClass: string;
  previewType:
    | "roadmap-graph"
    | "course-providers"
    | "project-internals"
    | "checklist-items"
    | "study-planner"
    | "milestone-tracker";
}

export interface LandingProjectPreview {
  id: string;
  number: string;
  title: string;
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  technologies: string[];
  learningObjective: string;
  phase: PhaseNumber;
  phaseLabel: string;
  complexityTier: 1 | 2 | 3;
  architectureNote: string;
}

export interface FreeResourcePreviewItem {
  id: string;
  title: string;
  provider: string;
  phaseLabel: string;
  description: string;
  url: string;
  formatLabel: string;
}

export interface AudienceProfileItem {
  id: string;
  title: string;
  currentBackground: string;
  howRoadmapHelps: string;
  recommendedEntry: string;
}
