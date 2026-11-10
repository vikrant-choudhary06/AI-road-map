"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Layers,
  Terminal,
} from "lucide-react";
import {
  LEARNING_JOURNEY_PHASES,
  TOTAL_ROADMAP_WEEKS,
} from "@/data/landing-content";
import { Section, SectionHeader } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LearningJourneySection() {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = React.useState<number>(5);
  const [mobileExpandedPhase, setMobileExpandedPhase] = React.useState<
    number | null
  >(0);
  const prefersReducedMotion = useReducedMotion();

  const activePhase =
    LEARNING_JOURNEY_PHASES[selectedPhaseIndex] ?? LEARNING_JOURNEY_PHASES[0];

  const cumulativeWeeksBeforeActive = LEARNING_JOURNEY_PHASES.slice(
    0,
    selectedPhaseIndex
  ).reduce((acc, item) => acc + item.estimatedWeeks, 0);

  return (
    <Section
      id="learning-journey"
      spacing="lg"
      surface="muted"
      border="bottom"
    >
      <FadeIn>
        <SectionHeader
          eyebrow="The 9-Phase Curriculum"
          title="One Roadmap. From Your First Line of Python to Your First LLM."
          description={`Structured into nine progressive phases spanning approximately ${TOTAL_ROADMAP_WEEKS} weeks at the planned study pace. Each phase builds the exact mathematical and engineering prerequisites required by the next.`}
          actions={
            <Button asChild variant="primary" size="md">
              <Link href="/roadmap">
                <span>View Complete Roadmap</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        {/* Proportional 78-Week Timeline Bar */}
        <div className="mb-8 rounded-xl border border-border bg-card p-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-mono font-semibold uppercase tracking-wider text-foreground">
              Planned Curriculum Horizon · {TOTAL_ROADMAP_WEEKS} Weeks Total
            </span>
            <span className="font-mono text-muted-foreground">
              Currently inspecting: Phase {activePhase.phase} ({activePhase.estimatedWeeks} weeks · Weeks{" "}
              {cumulativeWeeksBeforeActive + 1}–
              {cumulativeWeeksBeforeActive + activePhase.estimatedWeeks})
            </span>
          </div>

          <div
            className="mt-3 flex h-3 w-full overflow-hidden rounded-lg bg-muted p-0.5 gap-0.5"
            role="group"
            aria-label="Proportional 78-week phase timeline"
          >
            {LEARNING_JOURNEY_PHASES.map((item, idx) => {
              const isSelected = idx === selectedPhaseIndex;
              const isPast = idx < selectedPhaseIndex;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedPhaseIndex(idx)}
                  style={{
                    width: `${(item.estimatedWeeks / TOTAL_ROADMAP_WEEKS) * 100}%`,
                  }}
                  title={`Phase ${item.phase}: ${item.title} (${item.estimatedWeeks} weeks)`}
                  aria-label={`Select Phase ${item.phase}: ${item.title}, ${item.estimatedWeeks} weeks`}
                  className={cn(
                    "h-full first:rounded-l-md last:rounded-r-md transition-all cursor-pointer",
                    isSelected
                      ? "bg-terracotta"
                      : isPast
                        ? "bg-sage-muted hover:bg-terracotta/70"
                        : "bg-border-strong/60 hover:bg-sage-muted"
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Desktop Interactive Master-Detail View (lg and up) */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
          {/* Left Column: 9 Phase Selector List */}
          <div
            className="lg:col-span-7 flex flex-col gap-2.5"
            role="listbox"
            aria-label="Learning phases"
          >
            {LEARNING_JOURNEY_PHASES.map((item, index) => {
              const isSelected = index === selectedPhaseIndex;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setSelectedPhaseIndex(index)}
                  onMouseEnter={() => setSelectedPhaseIndex(index)}
                  className={cn(
                    "group flex w-full flex-col gap-2 rounded-xl border p-4 text-left transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "border-terracotta bg-card shadow-sm ring-1 ring-terracotta/30"
                      : "border-border bg-card/70 hover:border-border-strong hover:bg-card"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold transition-colors",
                          isSelected
                            ? "bg-terracotta text-accent-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        Phase {item.phase}
                      </span>
                      <h3 className="text-base font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Visual Identifier */}
                      <span className="rounded-md border border-border bg-muted/75 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {item.visualIdentifier}
                      </span>
                      {/* Estimated Timeline */}
                      <span className="inline-flex items-center gap-1 rounded-md bg-secondary/60 px-2 py-0.5 font-mono text-xs font-medium text-foreground">
                        <Clock className="size-3 text-terracotta" aria-hidden="true" />
                        {item.estimatedWeeks} weeks
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.oneSentenceExplanation}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Interactive Phase Preview Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              key={activePhase.code}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Card
                variant="default"
                padding="lg"
                className="border-border-strong shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="terracotta">
                      Phase {activePhase.phase} of 8
                    </Badge>
                    <Badge variant="phase">{activePhase.estimatedWeeks} Weeks</Badge>
                  </div>
                  <span className="rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs font-medium text-foreground">
                    {activePhase.visualIdentifier}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Phase Overview
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-normal text-foreground">
                    {activePhase.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {activePhase.oneSentenceExplanation}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                    Core Curriculum Objectives
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {activePhase.keyTopics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-sage-deep"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-xl border border-sage-muted/60 bg-secondary/45 p-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-sage-deep">
                    <Terminal className="size-3.5" aria-hidden="true" />
                    <span>Milestone Deliverable</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {activePhase.milestoneDeliverable}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Prerequisite: {activePhase.prerequisites}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    Interactive syllabus &amp; checklists
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/roadmap#${activePhase.slug}`}>
                      <span>Inspect Phase {activePhase.phase}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Mobile / Tablet Touch-Friendly Expandable Accordion (< lg) */}
        <div className="flex flex-col gap-3 lg:hidden">
          {LEARNING_JOURNEY_PHASES.map((item, index) => {
            const isExpanded = mobileExpandedPhase === index;
            return (
              <div
                key={item.code}
                className={cn(
                  "overflow-hidden rounded-xl border transition-colors",
                  isExpanded
                    ? "border-terracotta bg-card shadow-xs"
                    : "border-border bg-card/85"
                )}
              >
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => {
                    setMobileExpandedPhase(isExpanded ? null : index);
                    setSelectedPhaseIndex(index);
                  }}
                  className="flex w-full flex-col gap-2 p-4 text-left cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isExpanded ? "terracotta" : "sage"}
                        className="font-mono"
                      >
                        Phase {item.phase}
                      </Badge>
                      <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {item.visualIdentifier}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-medium text-foreground">
                        {item.estimatedWeeks} weeks
                      </span>
                      <ChevronDown
                        className={cn(
                          "size-4 text-muted-foreground transition-transform duration-200",
                          isExpanded && "rotate-180 text-terracotta"
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {item.oneSentenceExplanation}
                  </p>
                </button>

                {isExpanded && (
                  <div className="border-t border-border bg-muted/35 px-4 pb-4 pt-3">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
                      Key Topics Covered
                    </p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {item.keyTopics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-2 text-xs text-foreground"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-3.5 shrink-0 text-sage-deep"
                            aria-hidden="true"
                          />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 rounded-lg border border-border bg-card p-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-terracotta-strong">
                        Milestone Deliverable
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-foreground">
                        {item.milestoneDeliverable}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Summary & CTA Bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sage-deep">
              <Layers className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Complete 9-Phase Architectural Curriculum
              </p>
              <p className="text-xs text-muted-foreground">
                Spanning ~{TOTAL_ROADMAP_WEEKS} weeks from initial Python scripts
                to quantized LLM inference systems.
              </p>
            </div>
          </div>

          <Button asChild variant="terracotta" size="md">
            <Link href="/roadmap">
              <span>View Complete Roadmap</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}
