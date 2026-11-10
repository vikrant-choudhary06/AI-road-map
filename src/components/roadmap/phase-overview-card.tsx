import * as React from "react";
import type { DifficultyLevel, RoadmapPhaseSummary } from "@/types";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMeta,
  CardTitle,
} from "@/components/ui/card";

const DIFFICULTY_BADGE_MAP: Record<
  DifficultyLevel,
  { label: string; variant: BadgeProps["variant"] }
> = {
  foundational: { label: "Foundational", variant: "sage" },
  intermediate: { label: "Intermediate", variant: "muted" },
  advanced: { label: "Advanced", variant: "terracotta" },
  research: { label: "Frontier / Research", variant: "default" },
};

interface PhaseOverviewCardProps {
  phase: RoadmapPhaseSummary;
}

/**
 * Foundational roadmap phase card primitive demonstrating how the design system
 * structures curriculum phases (Phase 0 through Phase 8).
 */
export function PhaseOverviewCard({ phase }: PhaseOverviewCardProps) {
  const difficultyMeta = DIFFICULTY_BADGE_MAP[phase.difficulty];

  return (
    <Card variant="default" padding="md" className="h-full justify-between">
      <div>
        <CardHeader>
          <CardMeta>
            <Badge variant="phase">Phase {phase.phase}</Badge>
            <Badge variant={difficultyMeta.variant}>{difficultyMeta.label}</Badge>
          </CardMeta>
          <CardTitle className="mt-1 text-base sm:text-lg">
            {phase.title}
          </CardTitle>
          <CardDescription>{phase.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="mt-3">
          <p className="font-mono text-xs text-muted-foreground">
            {phase.coreFocus}
          </p>
        </CardContent>
      </div>
      <CardFooter className="mt-4 pt-3 text-xs text-muted-foreground">
        <span className="font-mono text-[11px] uppercase tracking-wider">
          Code: {phase.code}
        </span>
        <span>Stage 3 Curriculum Module</span>
      </CardFooter>
    </Card>
  );
}
