import * as React from "react";
import { Check, CircleDot, Lock } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/data/landing-content";
import { Section, SectionHeader } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" spacing="lg" border="bottom">
      <FadeIn>
        <SectionHeader
          eyebrow="Learning Methodology"
          title="Learn. Build. Track. Repeat."
          description="Mastery in artificial intelligence comes from pairing mathematical intuition with hands-on implementation. Our four-part methodology eliminates tutorial fatigue."
        />

        {/* Editorial Ledger Composition with Connecting Spine & Alternating Rows */}
        <div className="relative flex flex-col divide-y divide-border rounded-2xl border border-border-strong bg-card overflow-hidden shadow-2xs">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={step.stepNumber}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Narrative Column */}
                <div
                  className={cn(
                    "flex flex-col justify-between p-6 sm:p-8 lg:col-span-7",
                    isEven
                      ? "lg:order-2 lg:border-l lg:border-border"
                      : "lg:border-r lg:border-border"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl sm:text-4xl font-normal leading-none text-terracotta">
                        {step.stepNumber}
                      </span>
                      <div className="h-6 w-px bg-border-strong" aria-hidden="true" />
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        Step {index + 1} — {step.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 max-w-xl">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                      Step {index + 1} — {step.title}
                    </h3>
                    <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-sage-deep" aria-hidden="true" />
                    <span>
                      {index < 3
                        ? `Leads directly into Step 0${index + 2}`
                        : "Completes the phase mastery cycle"}
                    </span>
                  </div>
                </div>

                {/* Illustrative Blueprint Artifact Column */}
                <div
                  className={cn(
                    "flex flex-col justify-center bg-muted/45 p-6 sm:p-8 lg:col-span-5",
                    isEven && "lg:order-1"
                  )}
                >
                  <div className="rounded-xl border border-border bg-card p-4 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-border pb-2.5">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
                        {step.artifactTitle}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        Specimen {step.stepNumber}
                      </span>
                    </div>

                    <ul className="mt-3 flex flex-col gap-2">
                      {step.artifactItems.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-start justify-between gap-3 rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-xs"
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <span
                              className={cn(
                                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                                item.status === "ready"
                                  ? "bg-secondary text-sage-deep"
                                  : item.status === "active"
                                    ? "bg-terracotta-subtle text-terracotta-strong"
                                    : "bg-muted text-muted-foreground"
                              )}
                              aria-hidden="true"
                            >
                              {item.status === "ready" ? (
                                <Check className="size-2.5" />
                              ) : item.status === "active" ? (
                                <CircleDot className="size-2.5" />
                              ) : (
                                <Lock className="size-2.5" />
                              )}
                            </span>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {item.label}
                              </p>
                              <p className="font-mono text-[11px] text-muted-foreground">
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Section>
  );
}
