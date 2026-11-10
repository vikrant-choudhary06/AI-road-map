import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ALL_CURRICULUM_PROJECTS } from "@/data/projects";
import { COMPLETE_ROADMAP_PHASES, VALID_MODULE_IDS } from "@/data/roadmap";
import { ALL_COURSE_RESOURCES, VALID_RESOURCE_IDS } from "@/data/courses";

describe("Cross-Dataset Linkage & Referential Integrity Suite", () => {
  it("should ensure every project's relatedModuleIds exist in the roadmap", () => {
    for (const project of ALL_CURRICULUM_PROJECTS) {
      assert.ok(
        project.relatedModuleIds.length > 0,
        `Project ${project.id} has no relatedModuleIds`
      );
      for (const modId of project.relatedModuleIds) {
        assert.ok(
          VALID_MODULE_IDS.has(modId),
          `Project ${project.id} references non-existent module: ${modId}`
        );
      }
    }
  });

  it("should ensure every project's relatedResourceIds exist in the courses catalog", () => {
    for (const project of ALL_CURRICULUM_PROJECTS) {
      assert.ok(
        project.relatedResourceIds.length > 0,
        `Project ${project.id} has no relatedResourceIds`
      );
      for (const courseId of project.relatedResourceIds) {
        assert.ok(
          VALID_RESOURCE_IDS.has(courseId),
          `Project ${project.id} references non-existent course: ${courseId}`
        );
      }
    }
  });

  it("should ensure every phase references valid project milestone IDs", () => {
    const projectMap = new Map(ALL_CURRICULUM_PROJECTS.map((p) => [p.id, p]));
    for (const phase of COMPLETE_ROADMAP_PHASES) {
      for (const milestone of phase.primaryProjects) {
        assert.ok(
          projectMap.has(milestone.id),
          `Phase ${phase.phase} references unknown project milestone: ${milestone.id}`
        );
      }
    }
  });

  it("should ensure every course's target phases are between 0 and 8", () => {
    for (const course of ALL_COURSE_RESOURCES) {
      for (const phaseNum of course.phases) {
        assert.ok(
          phaseNum >= 0 && phaseNum <= 8,
          `Course ${course.id} targets invalid phase number: ${phaseNum}`
        );
      }
    }
  });
});
