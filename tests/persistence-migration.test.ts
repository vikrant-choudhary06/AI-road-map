import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeProgressStore } from "@/hooks/use-roadmap-progress";
import { VALID_TOPIC_IDS } from "@/data/roadmap";

describe("Store Persistence & Sanitization Suite", () => {
  it("should return default store when input is null, undefined, or empty object", () => {
    const storeNull = sanitizeProgressStore(null);
    assert.strictEqual(storeNull.schemaVersion, 1);
    assert.deepStrictEqual(storeNull.completedTopicIds, []);
    assert.deepStrictEqual(storeNull.completedProjectTaskIds, []);

    const storeEmpty = sanitizeProgressStore({});
    assert.strictEqual(storeEmpty.schemaVersion, 1);
  });

  it("should return default store when schemaVersion does not match 1", () => {
    const storeFuture = sanitizeProgressStore({
      schemaVersion: 99,
      completedTopicIds: ["topic-0-1-1-interpreter"],
    });
    assert.strictEqual(storeFuture.schemaVersion, 1);
    assert.deepStrictEqual(storeFuture.completedTopicIds, []);
  });

  it("should filter out non-existent / bogus topic IDs safely", () => {
    const validTopicId = Array.from(VALID_TOPIC_IDS)[0];
    const sanitized = sanitizeProgressStore({
      schemaVersion: 1,
      completedTopicIds: [validTopicId, "bogus-fake-topic-id", 123, null],
    });

    assert.strictEqual(sanitized.completedTopicIds.length, 1);
    assert.strictEqual(sanitized.completedTopicIds[0], validTopicId);
  });

  it("should automatically backfill project tasks when a milestone is completed", () => {
    const sanitized = sanitizeProgressStore({
      schemaVersion: 1,
      completedMilestoneIds: ["milestone-01-matrix-operations-engine"],
      completedProjectTaskIds: [],
    });

    assert.ok(
      sanitized.completedProjectTaskIds.length >= 12,
      "Expected Milestone 01 tasks to be backfilled into completedProjectTaskIds"
    );
    assert.ok(
      sanitized.completedProjectTaskIds.includes("p1-t01"),
      "Expected p1-t01 to be in completedProjectTaskIds"
    );
  });

  it("should safely sanitize and normalize study goals", () => {
    const sanitized = sanitizeProgressStore({
      schemaVersion: 1,
      studyGoal: {
        pacePreset: "intensive",
        dailyMinutesTarget: 120,
        studyDaysPerWeek: 6,
        isConfigured: true,
      },
    });

    assert.strictEqual(sanitized.studyGoal.pacePreset, "intensive");
    assert.strictEqual(sanitized.studyGoal.dailyMinutesTarget, 120);
    assert.strictEqual(sanitized.studyGoal.studyDaysPerWeek, 6);
    assert.strictEqual(sanitized.studyGoal.weeklyMinutesTarget, 720);
    assert.strictEqual(sanitized.studyGoal.isConfigured, true);
  });
});
