import * as React from "react";
import { Check, Sparkles } from "lucide-react";
import { FEATURE_SHOWCASE_ITEMS } from "@/data/landing-content";
import { Section, SectionHeader } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function FeatureMicroPreview({
  type,
}: {
  type: (typeof FEATURE_SHOWCASE_ITEMS)[number]["previewType"];
}) {
  switch (type) {
    case "roadmap-graph":
      return (
        <div
          aria-hidden="true"
          className="mt-5 rounded-xl border border-border bg-muted/50 p-3.5"
        >
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="rounded-md border border-sage-muted bg-secondary px-2.5 py-1 font-medium text-foreground">
              P1 · Linear Algebra
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="rounded-md border border-sage-muted bg-secondary px-2.5 py-1 font-medium text-foreground">
              P3 · Autograd &amp; Backprop
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="rounded-md border border-terracotta/50 bg-terracotta-subtle px-2.5 py-1 font-semibold text-terracotta-strong">
              P5 · Causal Attention
            </span>
          </div>
          <p className="mt-2.5 font-mono text-[11px] text-muted-foreground">
            Explicit prerequisite mapping · Zero unexplained concepts
          </p>
        </div>
      );

    case "course-providers":
      return (
        <div
          aria-hidden="true"
          className="mt-5 flex flex-wrap gap-1.5 rounded-xl border border-border bg-muted/50 p-3.5"
        >
          {[
            "Harvard CS50",
            "MIT OCW",
            "Stanford CS336",
            "Google ML",
            "Hugging Face",
            "Andrej Karpathy",
          ].map((provider) => (
            <span
              key={provider}
              className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] font-medium text-foreground"
            >
              {provider}
            </span>
          ))}
        </div>
      );

    case "project-internals":
      return (
        <div
          aria-hidden="true"
          className="mt-5 rounded-xl border border-border bg-muted/60 p-3.5 font-mono text-xs"
        >
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>attention_block.py</span>
            <span className="text-terracotta-strong">From Scratch</span>
          </div>
          <p className="mt-1.5 text-foreground truncate">
            scores = (q @ k.transpose(-2, -1)) / math.sqrt(d_k)
          </p>
        </div>
      );

    case "checklist-items":
      return (
        <div
          aria-hidden="true"
          className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-xl border border-border bg-muted/50 p-3.5 text-xs"
        >
          <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 border border-border/80">
            <span className="flex size-4 items-center justify-center rounded bg-secondary text-sage-deep">
              <Check className="size-3" />
            </span>
            <span className="truncate font-medium text-foreground">
              Implement BPE merge table
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-card px-3 py-2 border border-border/80">
            <span className="flex size-4 items-center justify-center rounded bg-secondary text-sage-deep">
              <Check className="size-3" />
            </span>
            <span className="truncate font-medium text-foreground">
              Verify RoPE rotation frequencies
            </span>
          </div>
        </div>
      );

    case "study-planner":
      return (
        <div
          aria-hidden="true"
          className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/50 p-3.5 text-xs"
        >
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">
              Target Study Pace
            </p>
            <p className="font-semibold text-foreground">
              10 hrs / week · Self-Paced
            </p>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="rounded bg-card px-2 py-1 border border-border text-muted-foreground">
              5h/wk
            </span>
            <span className="rounded bg-terracotta text-accent-foreground px-2 py-1 font-semibold">
              10h/wk
            </span>
            <span className="rounded bg-card px-2 py-1 border border-border text-muted-foreground">
              20h/wk
            </span>
          </div>
        </div>
      );

    case "milestone-tracker":
      return (
        <div
          aria-hidden="true"
          className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/50 p-3.5 text-xs"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-foreground font-medium">
                Phase 0 – Phase 5 Mastery
              </span>
              <span className="text-sage-deep">62%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-card border border-border">
              <div className="h-full w-[62%] bg-sage-deep rounded-full" />
            </div>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground shrink-0">
            9 / 14 Labs
          </span>
        </div>
      );
  }
}

export function FeatureShowcaseSection() {
  return (
    <Section id="features" spacing="lg" surface="sage" border="bottom">
      <FadeIn>
        <SectionHeader
          eyebrow="Platform Capabilities"
          title="Everything You Need to Go Beyond AI APIs."
          description="Calling an external API takes five lines of code; understanding why gradients stabilize, how tokenizers compress text, and how attention heads route information requires a true engineering workbench."
        />

        {/* Asymmetrical 12-Column Editorial Mosaic */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {FEATURE_SHOWCASE_ITEMS.map((feature) => (
            <Card
              key={feature.id}
              variant="default"
              padding="md"
              className={cn(
                "justify-between border-border-strong/80",
                feature.spanClass
              )}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {feature.eyebrow}
                  </span>
                  <Badge variant="muted" className="font-mono text-[11px]">
                    <Sparkles className="size-3 text-terracotta" aria-hidden="true" />
                    <span>{feature.stageAvailability}</span>
                  </Badge>
                </div>

                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>

              <FeatureMicroPreview type={feature.previewType} />
            </Card>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
