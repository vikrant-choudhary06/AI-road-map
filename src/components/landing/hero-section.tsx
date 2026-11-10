import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Compass } from "lucide-react";
import { HERO_CURRICULUM_LABELS } from "@/data/landing-content";
import { Section } from "@/components/layout/section-container";
import { LearningPathDiagram } from "@/components/landing/learning-path-diagram";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const PILLAR_ICONS = {
  phases: Compass,
  projects: Code2,
  resources: BookOpen,
} as const;

export function HeroSection() {
  return (
    <Section spacing="hero" border="bottom" className="overflow-hidden">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Left Column: Editorial Copy, CTAs & Supporting Curriculum Labels */}
        <FadeIn className="flex flex-col gap-6 lg:col-span-6">
          <Eyebrow>Open &amp; Structured AI Engineering Curriculum</Eyebrow>

          <Heading
            level="display"
            as="h1"
            className="text-4xl sm:text-5xl lg:text-[3.35rem] leading-[1.08]"
          >
            From{" "}
            <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-foreground">
              Zero
            </span>{" "}
            to{" "}
            <span className="italic text-terracotta-strong underline decoration-terracotta/45 decoration-2 underline-offset-6">
              Building Your Own AI.
            </span>
          </Heading>

          <Text variant="lead" className="max-w-xl text-base sm:text-lg lg:text-xl">
            A complete, free learning roadmap that takes you from Python and
            mathematics to neural networks, Transformers, and training your own
            language models — step by step.
          </Text>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <Button asChild variant="primary" size="lg">
              <a href="#learning-journey">
                <span>Explore the Roadmap</span>
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#how-it-works">
                <span>How It Works</span>
              </a>
            </Button>
          </div>

          {/* Three Refined Curriculum Specification Labels */}
          <div
            aria-label="Planned curriculum overview"
            className="mt-2 grid grid-cols-1 gap-2.5 border-t border-border pt-6 sm:grid-cols-3"
          >
            {HERO_CURRICULUM_LABELS.map((item) => {
              const Icon = PILLAR_ICONS[item.id];
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-card/85 px-3.5 py-3 shadow-2xs"
                >
                  <span
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary/75 text-sage-deep"
                    aria-hidden="true"
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground leading-snug">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Right Column: Interactive Learning-Path Visualization */}
        <FadeIn delay={0.08} className="lg:col-span-6">
          <LearningPathDiagram />
          <div className="mt-3 flex items-center justify-between px-1 text-xs text-muted-foreground">
            <span className="font-mono text-[11px]">
              Path: Python → Math → ML → DL → NLP → Transformers → LLMs
            </span>
            <Link
              href="/roadmap"
              className="font-medium text-link hover:text-foreground underline-offset-4 hover:underline"
            >
              Full curriculum index →
            </Link>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
