"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { HERO_DIAGRAM_NODES } from "@/data/landing-content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Interactive 9-Stage Learning Path Schematic for the Hero Section.
 * Visualizes: Python → Mathematics → Machine Learning → Deep Learning → NLP →
 * Transformers → LLM Training → Alignment → Advanced Systems.
 */
export function LearningPathDiagram() {
  const [activeIndex, setActiveIndex] = React.useState<number>(5); // Default highlight on "Transformers"
  const prefersReducedMotion = useReducedMotion();

  const activeNode = HERO_DIAGRAM_NODES[activeIndex] ?? HERO_DIAGRAM_NODES[0];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : HERO_DIAGRAM_NODES.length - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev < HERO_DIAGRAM_NODES.length - 1 ? prev + 1 : 0
    );
  };

  // Group into 3 rows of 3 for the structured desktop schematic
  const row0 = HERO_DIAGRAM_NODES.slice(0, 3); // 0, 1, 2 (Left -> Right)
  const row1 = HERO_DIAGRAM_NODES.slice(3, 6); // 3, 4, 5 (Left -> Right with serpentine connector)
  const row2 = HERO_DIAGRAM_NODES.slice(6, 9); // 6, 7, 8 (Left -> Right)

  const rows = [
    { tier: "Tier I · Foundations", nodes: row0, startIdx: 0 },
    { tier: "Tier II · Core ML & Sequences", nodes: row1, startIdx: 3 },
    { tier: "Tier III · LLM Engineering", nodes: row2, startIdx: 6 },
  ];

  return (
    <div
      role="region"
      aria-label="Interactive AI and LLM learning progression diagram"
      className="relative overflow-hidden rounded-2xl border border-border-strong bg-card shadow-xs"
    >
      {/* Top Blueprint Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/55 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span
            className="size-2 rounded-full bg-terracotta"
            aria-hidden="true"
          />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            Curriculum Architecture Map
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted-foreground">
            Select any node to inspect
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Inspect previous stage"
              className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-border-strong hover:bg-muted cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Inspect next stage"
              className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-border-strong hover:bg-muted cursor-pointer"
            >
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Schematic Canvas */}
      <div className="p-4 sm:p-6">
        {/* Desktop / Tablet Structured 3-Tier Schematic */}
        <div className="hidden sm:flex sm:flex-col sm:gap-5">
          {rows.map((row, rowIndex) => (
            <div key={row.tier} className="relative flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {row.tier}
                </span>
                {rowIndex < 2 && (
                  <span className="font-mono text-[10px] text-muted-foreground/80">
                    Prerequisites flow ↓
                  </span>
                )}
              </div>

              <div className="relative grid grid-cols-3 gap-3">
                {/* Horizontal SVG Connector Line behind the 3 nodes */}
                <svg
                  className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 h-2 w-[calc(100%-4rem)]"
                  viewBox="0 0 300 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="4"
                    x2="300"
                    y2="4"
                    className="stroke-border-strong"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="0"
                    y1="4"
                    x2={
                      activeIndex >= row.startIdx + 2
                        ? "300"
                        : activeIndex === row.startIdx + 1
                          ? "150"
                          : "0"
                    }
                    y2="4"
                    className="stroke-terracotta transition-all duration-300"
                    strokeWidth="2"
                  />
                </svg>

                {row.nodes.map((node, colIdx) => {
                  const globalIdx = row.startIdx + colIdx;
                  const isSelected = globalIdx === activeIndex;
                  const isCompletedInPath = globalIdx < activeIndex;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveIndex(globalIdx)}
                      onMouseEnter={() => setActiveIndex(globalIdx)}
                      aria-pressed={isSelected}
                      aria-label={`Stage ${node.stepNumber}: ${node.label} (${node.phaseRange})`}
                      className={cn(
                        "group relative z-10 flex flex-col items-start justify-between rounded-xl border p-3 text-left transition-all duration-150 cursor-pointer",
                        isSelected
                          ? "border-terracotta bg-terracotta-subtle/75 shadow-xs ring-1 ring-terracotta/40"
                          : isCompletedInPath
                            ? "border-sage-muted bg-secondary/50 hover:border-terracotta/60"
                            : "border-border bg-card hover:border-border-strong hover:bg-muted/40"
                      )}
                    >
                      <div className="flex w-full items-center justify-between gap-1.5">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                            isSelected
                              ? "bg-terracotta text-accent-foreground"
                              : isCompletedInPath
                                ? "bg-sage-deep text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                          )}
                        >
                          {node.stepNumber}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {node.phaseRange}
                        </span>
                      </div>

                      <span className="mt-2.5 text-xs sm:text-sm font-semibold tracking-tight text-foreground line-clamp-1">
                        {node.label}
                      </span>

                      <div className="mt-1.5 flex w-full items-center justify-between">
                        <span className="font-mono text-[10px] text-muted-foreground truncate">
                          {isSelected
                            ? "Active focus"
                            : isCompletedInPath
                              ? "Prerequisite"
                              : "Upcoming"}
                        </span>
                        <span
                          className={cn(
                            "flex size-4 items-center justify-center rounded-full text-[9px]",
                            isSelected
                              ? "bg-terracotta text-accent-foreground"
                              : isCompletedInPath
                                ? "bg-secondary text-sage-deep"
                                : "bg-muted text-muted-foreground"
                          )}
                          aria-hidden="true"
                        >
                          {isCompletedInPath ? (
                            <Check className="size-2.5" />
                          ) : (
                            "→"
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Compact Stepped Grid (< sm) */}
        <div className="grid grid-cols-1 gap-2 sm:hidden">
          {HERO_DIAGRAM_NODES.map((node, idx) => {
            const isSelected = idx === activeIndex;
            const isCompletedInPath = idx < activeIndex;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-pressed={isSelected}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left transition-colors cursor-pointer",
                  isSelected
                    ? "border-terracotta bg-terracotta-subtle/75"
                    : isCompletedInPath
                      ? "border-sage-muted/70 bg-secondary/40"
                      : "border-border bg-card"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex size-6 items-center justify-center rounded font-mono text-xs font-semibold",
                      isSelected
                        ? "bg-terracotta text-accent-foreground"
                        : isCompletedInPath
                          ? "bg-sage-deep text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    )}
                  >
                    {node.stepNumber}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {node.label}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {node.phaseRange} · {node.category}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-terracotta-strong">
                  {isSelected ? "Inspecting" : "Select →"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Inspector Panel */}
        <motion.div
          key={activeNode.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-5 rounded-xl border border-border bg-muted/65 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="phase">
                Stage {activeNode.stepNumber} · {activeNode.phaseRange}
              </Badge>
              <Badge variant="sage">{activeNode.category}</Badge>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              Step {activeIndex + 1} of {HERO_DIAGRAM_NODES.length}
            </span>
          </div>

          <h3 className="mt-2.5 text-base font-semibold text-foreground">
            {activeNode.label}
          </h3>
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {activeNode.summary}
          </p>

          <div className="mt-3 flex flex-col gap-2 border-t border-border/80 pt-3 sm:flex-row sm:items-center sm:justify-between text-xs">
            <div className="flex items-center gap-1.5 text-foreground">
              <Sparkles
                className="size-3.5 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <span className="font-medium">Core Build:</span>
              <span className="text-muted-foreground">
                {activeNode.keyArtifact}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
