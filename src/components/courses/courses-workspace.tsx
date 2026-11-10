"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, History, Sparkles } from "lucide-react";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui";
import {
  ALL_COURSE_RESOURCES,
  getResourceById,
  RESOURCE_TYPE_FILTER_GROUPS,
  type PhaseContextualResource,
} from "@/data/courses";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";
import type { CourseResource } from "@/types";
import { CoursesPageHeader } from "./courses-page-header";
import {
  CourseFilters,
  type CourseFilterState,
  type PersonalCollectionTab,
} from "./course-filters";
import { CourseEmptyState } from "./course-primitives";
import { CourseList, PhaseResourceGroup } from "./phase-resource-group";

const DEFAULT_FILTER_STATE: CourseFilterState = {
  searchQuery: "",
  collectionTab: "all",
  selectedPhase: "all",
  selectedTypeGroupId: "all",
  selectedDifficulty: "all",
  selectedProviderGroup: "all",
  selectedStatus: "all",
  onlyRecommended: false,
  onlyFreeMaterial: false,
  sortBy: "recommended",
  layoutMode: "by-phase",
};

export function CoursesWorkspace() {
  const {
    store,
    isStoragePersistent,
    continueLearningTarget,
    courseLibraryProgress,
    isResourceBookmarked,
    getResourceStatus,
    toggleResourceBookmark,
    setResourceStatus,
  } = useRoadmapProgress();

  const [filters, setFilters] =
    useState<CourseFilterState>(DEFAULT_FILTER_STATE);

  const handleUpdateFilters = useCallback(
    (patch: Partial<CourseFilterState>) => {
      setFilters((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const handleResetFilters = useCallback(() => {
    setFilters((prev) => ({
      ...DEFAULT_FILTER_STATE,
      layoutMode: prev.layoutMode,
    }));
  }, []);

  const handleExploreResources = useCallback(() => {
    const el = document.getElementById("courses-explorer-controls");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleSelectCollectionTab = useCallback((tab: PersonalCollectionTab) => {
    setFilters((prev) => ({
      ...prev,
      collectionTab: tab,
      selectedStatus:
        tab === "in_progress"
          ? "in_progress"
          : tab === "completed"
            ? "completed"
            : "all",
    }));
    const el = document.getElementById("courses-explorer-controls");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Find most recently updated in-progress resource for the Hero secondary CTA
  const activeInProgressResource = useMemo(() => {
    const inProgressIds = Object.entries(store.resourceStatuses)
      .filter(([, status]) => status === "in_progress")
      .map(([id]) => id);

    if (inProgressIds.length === 0) return undefined;

    inProgressIds.sort((a, b) => {
      const timeA = store.resourceStatusUpdatedAt[a] ?? "";
      const timeB = store.resourceStatusUpdatedAt[b] ?? "";
      return timeB.localeCompare(timeA);
    });

    return getResourceById(inProgressIds[0]);
  }, [store.resourceStatuses, store.resourceStatusUpdatedAt]);

  // Recently viewed resources
  const recentlyViewedResources = useMemo(
    () =>
      store.recentlyViewedResourceIds
        .map((id) => getResourceById(id))
        .filter((r): r is CourseResource => Boolean(r))
        .slice(0, 4),
    [store.recentlyViewedResourceIds]
  );

  const hasActiveFilters =
    filters.searchQuery.trim() !== "" ||
    filters.collectionTab !== "all" ||
    filters.selectedPhase !== "all" ||
    filters.selectedTypeGroupId !== "all" ||
    filters.selectedDifficulty !== "all" ||
    filters.selectedProviderGroup !== "all" ||
    filters.selectedStatus !== "all" ||
    filters.onlyRecommended ||
    filters.onlyFreeMaterial;

  // Match function for a canonical resource (optionally within a specific phase context)
  const matchesFilters = useCallback(
    (resource: CourseResource, phaseContext?: number): boolean => {
      // 1. Collection Tab filter
      if (
        filters.collectionTab === "bookmarked" &&
        !isResourceBookmarked(resource.id)
      ) {
        return false;
      }
      const status = getResourceStatus(resource.id);
      if (filters.collectionTab === "in_progress" && status !== "in_progress") {
        return false;
      }
      if (filters.collectionTab === "completed" && status !== "completed") {
        return false;
      }

      // 2. Explicit Status dropdown filter
      if (filters.selectedStatus !== "all" && status !== filters.selectedStatus) {
        return false;
      }

      // 3. Phase filter
      if (filters.selectedPhase !== "all") {
        if (
          typeof phaseContext === "number" &&
          phaseContext !== filters.selectedPhase
        ) {
          return false;
        }
        if (!resource.phases.includes(filters.selectedPhase)) {
          return false;
        }
      }

      // 4. Resource Type Group filter
      if (filters.selectedTypeGroupId !== "all") {
        const group = RESOURCE_TYPE_FILTER_GROUPS.find(
          (g) => g.id === filters.selectedTypeGroupId
        );
        if (group && !group.types.includes(resource.resourceType)) {
          return false;
        }
      }

      // 5. Difficulty filter
      if (
        filters.selectedDifficulty !== "all" &&
        resource.difficulty !== filters.selectedDifficulty
      ) {
        return false;
      }

      // 6. Provider group filter
      if (
        filters.selectedProviderGroup !== "all" &&
        resource.providerGroup !== filters.selectedProviderGroup
      ) {
        return false;
      }

      // 7. Recommended ("Start Here") filter
      if (filters.onlyRecommended) {
        if (typeof phaseContext === "number") {
          const placement = resource.phasePlacements.find(
            (p) => p.phase === phaseContext
          );
          if (
            !placement?.isRecommendedStart &&
            placement?.role !== "start_here"
          ) {
            return false;
          }
        } else if (!resource.isRecommended) {
          return false;
        }
      }

      // 8. Free educational material filter
      if (filters.onlyFreeMaterial && !resource.isFreeLearningMaterial) {
        return false;
      }

      // 9. Search query across title, phase-specific title, provider, description, tags, and phase number
      const q = filters.searchQuery.trim().toLowerCase();
      if (q) {
        const matchesTitle = resource.title.toLowerCase().includes(q);
        const matchesProvider =
          resource.provider.toLowerCase().includes(q) ||
          resource.providerGroup.toLowerCase().includes(q);
        const matchesDesc =
          resource.description.toLowerCase().includes(q) ||
          resource.detailedDescription.toLowerCase().includes(q);
        const matchesTags = resource.tags.some((t) =>
          t.toLowerCase().includes(q)
        );
        const matchesType =
          resource.resourceType.toLowerCase().includes(q) ||
          (resource.formatSubtitle?.toLowerCase().includes(q) ?? false);
        const matchesPlacements = resource.phasePlacements.some(
          (p) =>
            `phase ${p.phase}`.includes(q) ||
            `p${p.phase}` === q ||
            p.catalogCode.toLowerCase().includes(q) ||
            (p.phaseSpecificTitle?.toLowerCase().includes(q) ?? false) ||
            p.phaseGuidance.toLowerCase().includes(q)
        );

        if (
          !matchesTitle &&
          !matchesProvider &&
          !matchesDesc &&
          !matchesTags &&
          !matchesType &&
          !matchesPlacements
        ) {
          return false;
        }
      }

      return true;
    },
    [
      filters.collectionTab,
      filters.onlyFreeMaterial,
      filters.onlyRecommended,
      filters.searchQuery,
      filters.selectedDifficulty,
      filters.selectedPhase,
      filters.selectedProviderGroup,
      filters.selectedStatus,
      filters.selectedTypeGroupId,
      getResourceStatus,
      isResourceBookmarked,
    ]
  );

  // Filtered & sorted unique canonical resources
  const filteredUniqueResources = useMemo(() => {
    const list = ALL_COURSE_RESOURCES.filter((r) => matchesFilters(r));

    return [...list].sort((a, b) => {
      if (filters.sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (filters.sortBy === "phase") {
        if (a.primaryPhase !== b.primaryPhase) {
          return a.primaryPhase - b.primaryPhase;
        }
        return a.recommendedOrder - b.recommendedOrder;
      }
      // Default: "recommended" — Start Here resources first within their order
      return a.recommendedOrder - b.recommendedOrder;
    });
  }, [filters.sortBy, matchesFilters]);

  // Filtered phase-grouped entries for "By Roadmap Phase" view
  const phaseGroupsWithEntries = useMemo(() => {
    return COMPLETE_ROADMAP_PHASES.map((phase) => {
      const entries: PhaseContextualResource[] = [];

      for (const resource of ALL_COURSE_RESOURCES) {
        const placement = resource.phasePlacements.find(
          (p) => p.phase === phase.phase
        );
        if (placement && matchesFilters(resource, phase.phase)) {
          entries.push({
            resource,
            placement,
            displayTitle: placement.phaseSpecificTitle ?? resource.title,
          });
        }
      }

      entries.sort((a, b) => {
        if (filters.sortBy === "title") {
          return a.displayTitle.localeCompare(b.displayTitle);
        }
        return a.placement.catalogCode.localeCompare(
          b.placement.catalogCode,
          undefined,
          { numeric: true }
        );
      });

      return {
        phase,
        entries,
      };
    }).filter((group) => group.entries.length > 0);
  }, [filters.sortBy, matchesFilters]);

  // Determine appropriate Empty State message if 0 matches
  const renderEmptyState = () => {
    if (
      filters.collectionTab === "bookmarked" &&
      courseLibraryProgress.bookmarkedCount === 0
    ) {
      return (
        <CourseEmptyState
          title="No Bookmarked Resources Yet"
          description="You haven't bookmarked any resources yet. Explore the library to build your learning collection."
          actionLabel="Explore All Resources"
          onAction={() => handleUpdateFilters({ collectionTab: "all" })}
        />
      );
    }

    if (
      filters.collectionTab === "in_progress" &&
      courseLibraryProgress.inProgressCount === 0
    ) {
      return (
        <CourseEmptyState
          title="No Courses Currently In Progress"
          description="Mark any course, textbook, or lecture series as 'Studying' when you begin working through it so you can resume quickly from here."
          actionLabel="Browse All Resources"
          onAction={() =>
            handleUpdateFilters({
              collectionTab: "all",
              selectedStatus: "all",
            })
          }
        />
      );
    }

    if (
      filters.collectionTab === "completed" &&
      courseLibraryProgress.completedCount === 0
    ) {
      return (
        <CourseEmptyState
          title="No Completed Resources Yet"
          description="As you finish courses, tutorials, or research papers across the 9 phases, mark them 'Completed' to build your permanent study record."
          actionLabel="Browse All Resources"
          onAction={() =>
            handleUpdateFilters({
              collectionTab: "all",
              selectedStatus: "all",
            })
          }
        />
      );
    }

    return (
      <CourseEmptyState
        title="No Resources Match Your Active Filters"
        description="Your saved bookmarks and learning statuses are untouched. Try clearing one or more filters or broadening your search query."
        actionLabel="Clear All Filters"
        onAction={handleResetFilters}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Main Courses Page Hero */}
      <CoursesPageHeader
        courseProgress={courseLibraryProgress}
        continueTarget={continueLearningTarget}
        activeInProgressResource={activeInProgressResource}
        isStoragePersistent={isStoragePersistent}
        onExploreResources={handleExploreResources}
        onSelectCollectionTab={handleSelectCollectionTab}
      />

      {/* 2. Focused Primary Learning Path Summary Strip (Phases 0–8 Start Here Guide) */}
      <section
        aria-labelledby="primary-spine-heading"
        className="border-b border-border bg-surface-subtle/60 py-8"
      >
        <Container>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-terracotta-strong uppercase">
                <Sparkles className="size-3.5" />
                Recommended Primary Learning Path
              </span>
              <h2
                id="primary-spine-heading"
                className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl"
              >
                Where to Start in Each Roadmap Phase
              </h2>
            </div>
            <p className="max-w-md text-xs text-muted-foreground">
              Follow this focused spine if you want one clear starting course
              per phase without getting overwhelmed by supplementary options.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                phase: 0,
                label: "Phase 0 · Python",
                primaryTitle: "Harvard CS50 Python",
                slug: "harvard-cs50-introduction-to-programming-with-python",
              },
              {
                phase: 1,
                label: "Phase 1 · Mathematics",
                primaryTitle: "3Blue1Brown + MIT 18.06SC Linear Algebra",
                slug: "3blue1brown-essence-of-linear-algebra",
              },
              {
                phase: 2,
                label: "Phase 2 · Classical ML",
                primaryTitle: "Google Machine Learning Crash Course",
                slug: "google-machine-learning-crash-course",
              },
              {
                phase: 3,
                label: "Phase 3 · Deep Learning",
                primaryTitle: "Karpathy Neural Networks: Zero to Hero",
                slug: "andrej-karpathy-neural-networks-zero-to-hero",
              },
              {
                phase: 4,
                label: "Phase 4 · NLP & Tokens",
                primaryTitle: "Hugging Face LLM Course",
                slug: "hugging-face-llm-course",
              },
              {
                phase: 5,
                label: "Phase 5 · Transformers",
                primaryTitle: "Karpathy Zero to Hero — GPT",
                slug: "andrej-karpathy-neural-networks-zero-to-hero",
              },
              {
                phase: 6,
                label: "Phase 6 · Pretraining",
                primaryTitle: "Stanford CS336: Language Modeling",
                slug: "stanford-cs336-language-modeling-from-scratch",
              },
              {
                phase: 7,
                label: "Phase 7 · Alignment",
                primaryTitle: "Hugging Face smol-course",
                slug: "hugging-face-smol-course-fine-tuning-language-models",
              },
              {
                phase: 8,
                label: "Phase 8 · LLM Systems",
                primaryTitle: "Stanford CS336 + GPU MODE Lectures",
                slug: "gpu-mode-programming-and-kernel-lectures",
              },
            ].map((item) => (
              <Link
                key={item.phase}
                href={`/courses/${item.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3.5 py-2.5 transition-colors hover:border-terracotta/50"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[11px] font-semibold text-terracotta-strong">
                    {item.label}
                  </span>
                  <p className="truncate text-xs font-semibold text-foreground group-hover:text-terracotta-strong sm:text-sm">
                    {item.primaryTitle}
                  </p>
                </div>
                <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-terracotta-strong" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Search, Personal Collection Tabs & Multi-Dimensional Filters */}
      <section aria-label="Search and filter learning resources" className="pt-8">
        <Container>
          <CourseFilters
            filters={filters}
            courseProgress={courseLibraryProgress}
            matchingResourcesCount={filteredUniqueResources.length}
            totalResourcesCount={ALL_COURSE_RESOURCES.length}
            hasActiveFilters={hasActiveFilters}
            onUpdateFilters={handleUpdateFilters}
            onResetFilters={handleResetFilters}
          />
        </Container>
      </section>

      {/* Optional Recently Viewed Strip */}
      {recentlyViewedResources.length > 0 && filters.collectionTab === "all" && !hasActiveFilters ? (
        <section aria-label="Recently viewed resources" className="pt-6">
          <Container>
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-muted-foreground uppercase">
                <History className="size-3.5 text-terracotta" />
                Recently Viewed:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {recentlyViewedResources.map((res) => (
                  <Link
                    key={res.id}
                    href={`/courses/${res.slug}`}
                    className="rounded-md border border-border bg-surface-subtle px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-terracotta/50 hover:text-terracotta-strong"
                  >
                    {res.title}
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* 4. Resource Results Area */}
      <section aria-label="Course library results" className="pt-8">
        <Container className="space-y-10">
          {filteredUniqueResources.length === 0 ? (
            renderEmptyState()
          ) : filters.layoutMode === "by-phase" &&
            filters.collectionTab === "all" ? (
            phaseGroupsWithEntries.map(({ phase, entries }) => (
              <PhaseResourceGroup
                key={phase.id}
                phase={phase}
                entries={entries}
                getResourceStatus={getResourceStatus}
                isResourceBookmarked={isResourceBookmarked}
                onToggleBookmark={toggleResourceBookmark}
                onChangeStatus={setResourceStatus}
              />
            ))
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
                    {filters.collectionTab === "bookmarked"
                      ? "Bookmarked Learning Resources"
                      : filters.collectionTab === "in_progress"
                        ? "Resources Currently In Progress"
                        : filters.collectionTab === "completed"
                          ? "Completed Learning Resources"
                          : "Complete Canonical Resource Catalog"}
                  </h2>
                  <Badge variant="phase">
                    {filteredUniqueResources.length}{" "}
                    {filteredUniqueResources.length === 1
                      ? "Resource"
                      : "Resources"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Multi-phase resources appear once here with all associated
                  phases listed.
                </p>
              </div>

              <CourseList
                resources={filteredUniqueResources}
                getResourceStatus={getResourceStatus}
                isResourceBookmarked={isResourceBookmarked}
                onToggleBookmark={toggleResourceBookmark}
                onChangeStatus={setResourceStatus}
              />
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
