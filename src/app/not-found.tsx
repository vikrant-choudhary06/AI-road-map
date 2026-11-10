import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  Home,
} from "lucide-react";
import { Container } from "@/components/layout/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col justify-center py-16 sm:py-24">
      <Container className="max-w-3xl">
        <div className="space-y-8 text-center">
          <div className="inline-flex items-center gap-2">
            <Badge variant="terracotta">404 · Page Not Found</Badge>
            <Badge variant="outline">Educational Curriculum</Badge>
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              This Path Isn&apos;t in the Curriculum
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-foreground-secondary sm:text-lg">
              The page you are looking for may have moved, or the link may have
              been typed incorrectly. Continue your AI &amp; LLM journey from one
              of our primary hubs below.
            </p>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="grid gap-3.5 text-left sm:grid-cols-2">
            <Link href="/roadmap" className="group block">
              <Card
                variant="default"
                padding="md"
                className="h-full space-y-1.5 transition-colors group-hover:border-border-strong"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-terracotta">
                  <Compass className="h-4 w-4" />
                  <span>9-Phase Curriculum</span>
                </div>
                <h2 className="font-serif text-base font-semibold text-foreground group-hover:text-accent-terracotta">
                  Interactive AI Roadmap
                </h2>
                <p className="text-xs text-foreground-secondary">
                  Explore modules and topics from Python and linear algebra to
                  Transformers and custom LLM pretraining.
                </p>
              </Card>
            </Link>

            <Link href="/projects" className="group block">
              <Card
                variant="default"
                padding="md"
                className="h-full space-y-1.5 transition-colors group-hover:border-border-strong"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-terracotta">
                  <Code2 className="h-4 w-4" />
                  <span>14 Engineering Milestones</span>
                </div>
                <h2 className="font-serif text-base font-semibold text-foreground group-hover:text-accent-terracotta">
                  Projects &amp; Coding Challenges
                </h2>
                <p className="text-xs text-foreground-secondary">
                  Build mathematical engines, autograd, BPE tokenizers, and a
                  Mini-GPT language model from scratch.
                </p>
              </Card>
            </Link>

            <Link href="/courses" className="group block">
              <Card
                variant="default"
                padding="md"
                className="h-full space-y-1.5 transition-colors group-hover:border-border-strong"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-terracotta">
                  <BookOpen className="h-4 w-4" />
                  <span>44 Verified Resources</span>
                </div>
                <h2 className="font-serif text-base font-semibold text-foreground group-hover:text-accent-terracotta">
                  Free Courses Library
                </h2>
                <p className="text-xs text-foreground-secondary">
                  Access official free courses and research papers from Harvard,
                  MIT, Stanford, and Google.
                </p>
              </Card>
            </Link>

            <Link href="/dashboard" className="group block">
              <Card
                variant="default"
                padding="md"
                className="h-full space-y-1.5 transition-colors group-hover:border-border-strong"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-terracotta">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Personal Study Tracker</span>
                </div>
                <h2 className="font-serif text-base font-semibold text-foreground group-hover:text-accent-terracotta">
                  Learning Dashboard
                </h2>
                <p className="text-xs text-foreground-secondary">
                  Review your completed topics, active courses, study streaks,
                  and weekly planner.
                </p>
              </Card>
            </Link>
          </div>

          <div className="pt-2">
            <Button asChild variant="primary" size="md">
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                <span>Return to Homepage</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
