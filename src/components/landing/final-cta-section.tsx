import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Section } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

export function FinalCtaSection() {
  return (
    <Section spacing="lg">
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-card px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          {/* Subtle Architectural Corner Framing */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-secondary/50"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-terracotta-subtle/60"
          />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow>Begin at Phase 0 or Your Current Level</Eyebrow>

            <Heading
              level="display"
              as="h2"
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl"
            >
              Your First AI Model Starts with Understanding.
            </Heading>

            <Text
              variant="lead"
              className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground"
            >
              No shortcuts. No black boxes. Just a clear path from the
              fundamentals to building real models.
            </Text>

            <div className="mt-8 flex flex-col w-full sm:w-auto gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button asChild variant="primary" size="lg">
                <Link href="/roadmap">
                  <span>Start Your Learning Journey</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/courses">
                  <BookOpen className="size-4 text-terracotta" />
                  <span>Explore Free Courses</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
