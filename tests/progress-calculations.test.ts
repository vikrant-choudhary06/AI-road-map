import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { ALL_CURRICULUM_PROJECTS, PROJECT_CATALOG_STATS } from "@/data/projects";
import { ALL_COURSE_RESOURCES } from "@/data/courses";
import {
  computeLearningStreak,
  formatDurationMinutes,
  isValidDateKey,
  toLocalDateKey,
} from "@/lib/date-utils";

describe("Curriculum & Catalog Integrity Suite", () => {
  it("should contain exactly 9 phases (Phase 0 through Phase 8)", () => {
    assert.strictEqual(COMPLETE_ROADMAP_PHASES.length, 9);
    COMPLETE_ROADMAP_PHASES.forEach((phase, index) => {
      assert.strictEqual(phase.phase, index);
      assert.ok(phase.id.startsWith("phase-"));
      assert.ok(phase.modules.length > 0, `Phase ${phase.phase} should have modules`);
    });
  });

  it("should contain exactly 14 primary projects matching PROJECT_CATALOG_STATS", () => {
    assert.strictEqual(ALL_CURRICULUM_PROJECTS.length, 14);
    assert.strictEqual(PROJECT_CATALOG_STATS.totalProjects, 14);

    let totalTasks = 0;
    ALL_CURRICULUM_PROJECTS.forEach((project, idx) => {
      assert.strictEqual(project.milestoneNumber, idx + 1);
      assert.ok(project.slug.length > 0);
      assert.ok(project.title.length > 0);
      assert.ok(project.tasks.length > 0);
      assert.ok(project.codeExamples.length > 0);
      assert.ok(project.testingGuide.testCases.length > 0);
      assert.ok(project.expectedDeliverable.length > 0);
      totalTasks += project.tasks.length;
    });

    assert.strictEqual(totalTasks, PROJECT_CATALOG_STATS.totalTasks);
    assert.ok(totalTasks >= 180, `Expected at least 180 tasks, got ${totalTasks}`);
  });

  it("should contain exactly 44 curated learning resources", () => {
    assert.strictEqual(ALL_COURSE_RESOURCES.length, 44);
    const seenSlugs = new Set<string>();

    ALL_COURSE_RESOURCES.forEach((resource) => {
      assert.ok(resource.id.length > 0);
      assert.ok(resource.title.length > 0);
      assert.ok(resource.provider.length > 0);
      assert.ok(resource.url.startsWith("http"));
      assert.ok(!seenSlugs.has(resource.slug), `Duplicate slug: ${resource.slug}`);
      seenSlugs.add(resource.slug);
      assert.ok(resource.phases.length > 0);
    });
  });
});

describe("Date & Streak Calculation Suite", () => {
  it("should format duration in minutes correctly", () => {
    assert.strictEqual(formatDurationMinutes(0), "0m");
    assert.strictEqual(formatDurationMinutes(45), "45m");
    assert.strictEqual(formatDurationMinutes(60), "1h");
    assert.strictEqual(formatDurationMinutes(125), "2h 5m");
  });

  it("should validate YYYY-MM-DD date keys correctly", () => {
    assert.strictEqual(isValidDateKey("2026-11-10"), true);
    assert.strictEqual(isValidDateKey("2026-01-01"), true);
    assert.strictEqual(isValidDateKey("invalid-date"), false);
    assert.strictEqual(isValidDateKey("2026-13-01"), false);
    assert.strictEqual(isValidDateKey(null), false);
    assert.strictEqual(isValidDateKey(undefined), false);
  });

  it("should calculate 0 streak when dates are empty", () => {
    const today = toLocalDateKey();
    const streak = computeLearningStreak([], today);
    assert.strictEqual(streak.currentStreak, 0);
    assert.strictEqual(streak.longestStreak, 0);
    assert.strictEqual(streak.activeToday, false);
    assert.strictEqual(streak.totalActiveDays, 0);
  });

  it("should correctly compute active streak for consecutive days", () => {
    const today = toLocalDateKey();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = toLocalDateKey(yesterdayDate);

    const twoDaysAgoDate = new Date();
    twoDaysAgoDate.setDate(twoDaysAgoDate.getDate() - 2);
    const twoDaysAgo = toLocalDateKey(twoDaysAgoDate);

    const activeDates = [twoDaysAgo, yesterday, today];
    const streak = computeLearningStreak(activeDates, today);

    assert.strictEqual(streak.activeToday, true);
    assert.strictEqual(streak.currentStreak, 3);
    assert.strictEqual(streak.longestStreak, 3);
    assert.strictEqual(streak.totalActiveDays, 3);
  });
});
