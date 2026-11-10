import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpenCheck } from "lucide-react";
import { LANDING_FEATURED_RESOURCES } from "@/data/courses";
import { Section, SectionHeader } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FreeResourcesSection() {
  return (
    <Section
      id="courses-preview"
      spacing="lg"
      surface="muted"
      border="bottom"
    >
      <FadeIn>
        <SectionHeader
          eyebrow="Verified Open-Access Library"
          title="The Best Learning Resources. Without the Paywall."
          description="World-class AI education is already publicly available from leading universities and researchers—if you know what order to study it in. Every recommended resource is 100% free."
          actions={
            <Button asChild variant="primary" size="md">
              <Link href="/courses">
                <span>Browse Free Courses</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LANDING_FEATURED_RESOURCES.map((resource) => {
            const phaseLabel =
              resource.phases.length === 1
                ? `Phase ${resource.phases[0]}`
                : `Phases ${resource.phases.join(", ")}`;

            return (
              <Card
                key={resource.id}
                variant="interactive"
                padding="md"
                className="justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="phase">{phaseLabel}</Badge>
                    <Badge variant="success">
                      <BookOpenCheck className="size-3" aria-hidden="true" />
                      <span>100% Free</span>
                    </Badge>
                  </div>

                  <p className="mt-3.5 font-mono text-xs font-medium text-terracotta-strong">
                    {resource.provider}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-foreground">
                    <Link
                      href={`/courses/${resource.slug}`}
                      className="transition-colors hover:text-terracotta-strong"
                    >
                      {resource.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {resource.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <Link
                    href={`/courses/${resource.slug}`}
                    className="font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {resource.formatSubtitle ?? resource.resourceType} · Details →
                  </Link>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${resource.title} (${resource.provider}) in a new tab`}
                    className="group inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-link transition-colors hover:bg-secondary/60 hover:text-foreground"
                  >
                    <span>Open Course</span>
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            External course links open directly on the official university or
            educator portals—no sign-up walls or middleman fees.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/courses">
              <span>Browse Free Courses</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}
