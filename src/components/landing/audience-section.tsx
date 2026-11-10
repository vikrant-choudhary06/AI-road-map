import * as React from "react";
import { Compass } from "lucide-react";
import { AUDIENCE_PROFILES } from "@/data/landing-content";
import { Section, SectionHeader } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function AudienceSection() {
  return (
    <Section id="who-is-this-for" spacing="lg" surface="sage" border="bottom">
      <FadeIn>
        <SectionHeader
          eyebrow="Designed for Every Starting Point"
          title="Who Is This For?"
          description="Whether you are writing your first Python function or already deploying applications with LLM APIs, the curriculum begins with foundational concepts and gradually progresses toward advanced systems."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {AUDIENCE_PROFILES.map((profile, idx) => (
            <Card
              key={profile.id}
              variant="default"
              padding="md"
              className={
                idx < 2
                  ? "lg:col-span-3 justify-between"
                  : "lg:col-span-2 justify-between"
              }
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="phase">Learner Path 0{idx + 1}</Badge>
                  <Compass
                    className="size-4 text-terracotta"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {profile.title}
                </h3>

                <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                  Background: {profile.currentBackground}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {profile.howRoadmapHelps}
                </p>
              </div>

              <div className="mt-5 border-t border-border pt-3.5">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-sage-deep">
                  <span>→</span>
                  <span>{profile.recommendedEntry}</span>
                </span>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          This roadmap is a self-paced educational guide focused on genuine
          mathematical and engineering comprehension—not a commercial bootcamp or
          credentialing program.
        </p>
      </FadeIn>
    </Section>
  );
}
