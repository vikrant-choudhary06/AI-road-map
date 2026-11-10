import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  CircleDot,
  Compass,
  FolderCode,
} from "lucide-react";
import { DASHBOARD_PREVIEW_DEMO } from "@/data/landing-content";
import { Section, SectionHeader } from "@/components/layout/section-container";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProgressPreviewSection() {
  return (
    <Section id="dashboard-preview" spacing="lg" border="bottom">
      <FadeIn>
        <SectionHeader
          eyebrow="Study Organization & Telemetry"
          title="Your Learning Journey, Clearly Organized."
          description="Long-horizon technical study succeeds when your next milestone is unmistakable. Open your live learning dashboard to track phases, courses, study sessions, and weekly tasks—or explore the illustrative sample state below."
          actions={
            <Button asChild variant="primary" size="md">
              <Link href="/dashboard">
                <span>Open Learning Dashboard</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />

        {/* Editorial Product Preview Window */}
        <div
          role="region"
          aria-label="Illustrative learning dashboard preview with sample data"
          className="overflow-hidden rounded-2xl border border-border-strong bg-card shadow-sm"
        >
          {/* Top Window Bar with Explicit Sample Data Disclosure */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/65 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-terracotta/80" />
                <span className="size-2.5 rounded-full bg-sage-muted" />
                <span className="size-2.5 rounded-full bg-border-strong" />
              </div>
              <span className="ml-1 font-mono text-xs font-semibold text-foreground">
                Study Workspace · Preview
              </span>
            </div>

            <Badge variant="sage" className="font-mono text-[11px]">
              {DASHBOARD_PREVIEW_DEMO.bannerNote}
            </Badge>
          </div>

          <div className="p-5 sm:p-8">
            {/* Row 1: Phase Completion Progress Rail */}
            <div className="rounded-xl border border-border bg-background/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Compass
                    className="size-4 text-terracotta"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-foreground">
                    Phase Completion Progress (Sample State)
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  5 of 9 Phases Completed · Phase 5 Active
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-9">
                {DASHBOARD_PREVIEW_DEMO.phaseCompletion.map((item) => (
                  <div
                    key={item.code}
                    className={cn(
                      "flex flex-col justify-between rounded-lg border p-2.5 text-xs",
                      item.status === "completed"
                        ? "border-sage-muted/70 bg-secondary/45 text-foreground"
                        : item.status === "active"
                          ? "border-terracotta bg-terracotta-subtle/75 text-foreground"
                          : "border-border bg-card text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold">
                        {item.code}
                      </span>
                      <span className="font-mono text-[10px]">
                        {item.percent}%
                      </span>
                    </div>
                    <p className="mt-1.5 truncate text-[11px] font-medium">
                      {item.label}
                    </p>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          item.status === "completed"
                            ? "bg-sage-deep"
                            : item.status === "active"
                              ? "bg-terracotta"
                              : "bg-transparent"
                        )}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: 3-Column Workspace Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Column A: Current Milestone & Course Progress Indicators */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                {/* Current Learning Milestone */}
                <div className="rounded-xl border border-terracotta/40 bg-terracotta-subtle/45 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-terracotta-strong">
                      Current Learning Milestone
                    </span>
                    <Badge variant="phase">
                      {DASHBOARD_PREVIEW_DEMO.currentMilestone.phaseCode}
                    </Badge>
                  </div>

                  <h4 className="mt-2 text-base font-semibold text-foreground">
                    {DASHBOARD_PREVIEW_DEMO.currentMilestone.title}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {DASHBOARD_PREVIEW_DEMO.currentMilestone.moduleProgress}
                  </p>

                  <div className="mt-3.5 rounded-lg border border-border bg-card p-3 text-xs">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Next Action Item:
                    </span>
                    <p className="mt-0.5 font-medium text-foreground">
                      {DASHBOARD_PREVIEW_DEMO.currentMilestone.nextAction}
                    </p>
                  </div>
                </div>

                {/* Course Progress Indicators */}
                <div className="rounded-xl border border-border bg-background/70 p-5">
                  <div className="flex items-center gap-2">
                    <BookOpen
                      className="size-4 text-sage-deep"
                      aria-hidden="true"
                    />
                    <h4 className="text-sm font-semibold text-foreground">
                      Course Progress Indicators
                    </h4>
                  </div>

                  <div className="mt-4 flex flex-col gap-4">
                    {DASHBOARD_PREVIEW_DEMO.courseIndicators.map((course) => (
                      <div key={course.title} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-medium text-foreground truncate">
                            {course.title}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                            {course.completedUnits}
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted border border-border">
                          <div
                            className="h-full rounded-full bg-sage-deep"
                            style={{ width: `${course.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column B: Project Completion Checklist */}
              <div className="rounded-xl border border-border bg-background/70 p-5 lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FolderCode
                        className="size-4 text-terracotta"
                        aria-hidden="true"
                      />
                      <h4 className="text-sm font-semibold text-foreground">
                        Project Completion Checklist
                      </h4>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      4 / 6 Sample
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-col gap-2">
                    {DASHBOARD_PREVIEW_DEMO.projectChecklist.map((proj) => (
                      <li
                        key={proj.title}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs",
                          proj.done
                            ? "border-border bg-card text-foreground"
                            : "active" in proj && proj.active
                              ? "border-terracotta/50 bg-terracotta-subtle/50 text-foreground font-medium"
                              : "border-border/60 bg-muted/40 text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={cn(
                              "flex size-4 shrink-0 items-center justify-center rounded",
                              proj.done
                                ? "bg-secondary text-sage-deep"
                                : "active" in proj && proj.active
                                  ? "bg-terracotta text-accent-foreground"
                                  : "border border-border-strong bg-card"
                            )}
                            aria-hidden="true"
                          >
                            {proj.done ? (
                              <Check className="size-3" />
                            ) : "active" in proj && proj.active ? (
                              <CircleDot className="size-2.5" />
                            ) : null}
                          </span>
                          <span className="truncate">{proj.title}</span>
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                          {proj.phase}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 border-t border-border pt-3 font-mono text-[11px] text-muted-foreground">
                  Sample preview state · Track your own 14 milestones in{" "}
                  <Link
                    href="/dashboard"
                    className="font-semibold text-foreground underline underline-offset-2 hover:text-terracotta"
                  >
                    /dashboard
                  </Link>
                  .
                </p>
              </div>

              {/* Column C: Weekly Learning Overview */}
              <div className="rounded-xl border border-border bg-background/70 p-5 lg:col-span-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar
                        className="size-4 text-sage-deep"
                        aria-hidden="true"
                      />
                      <h4 className="text-sm font-semibold text-foreground">
                        Weekly Cadence
                      </h4>
                    </div>
                  </div>

                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    Target: {DASHBOARD_PREVIEW_DEMO.weeklyOverview.targetHours}
                  </p>

                  <div className="mt-4 flex flex-col gap-2">
                    {DASHBOARD_PREVIEW_DEMO.weeklyOverview.days.map((d) => (
                      <div
                        key={d.day}
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="w-8 font-mono text-[11px] text-muted-foreground">
                          {d.day}
                        </span>
                        <div className="flex-1 h-2 overflow-hidden rounded-full bg-muted border border-border">
                          <div
                            className="h-full rounded-full bg-terracotta"
                            style={{ width: `${(d.hours / 2.5) * 100}%` }}
                          />
                        </div>
                        <span className="w-10 text-right font-mono text-[11px] text-foreground">
                          {d.hours.toFixed(1)}h
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-secondary/50 px-3 py-2 text-xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sage-deep">
                    Sample Weekly Rhythm
                  </span>
                  <p className="font-semibold text-foreground">
                    {DASHBOARD_PREVIEW_DEMO.weeklyOverview.loggedDemoHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
