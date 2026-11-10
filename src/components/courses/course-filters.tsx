"use client";

import { useEffect, useRef } from "react";
import {
  Bookmark,
  CheckCircle2,
  Clock,
  Filter,
  LayoutGrid,
  Layers,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import {
  AVAILABLE_PROVIDER_GROUPS,
  RESOURCE_TYPE_FILTER_GROUPS,
} from "@/data/courses";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import type { CourseLibraryProgressMetrics } from "@/hooks/use-roadmap-progress";
import type { DifficultyLevel, PhaseNumber, ProgressState } from "@/types";
import { cn } from "@/lib/utils";

export type PersonalCollectionTab =
  | "all"
  | "bookmarked"
  | "in_progress"
  | "completed";

export type CoursesSortOption = "recommended" | "title" | "phase";

export type CoursesLayoutMode = "by-phase" | "catalog-grid";

export interface CourseFilterState {
  searchQuery: string;
  collectionTab: PersonalCollectionTab;
  selectedPhase: PhaseNumber | "all";
  selectedTypeGroupId: string | "all";
  selectedDifficulty: DifficultyLevel | "all";
  selectedProviderGroup: string | "all";
  selectedStatus: ProgressState | "all";
  onlyRecommended: boolean;
  onlyFreeMaterial: boolean;
  sortBy: CoursesSortOption;
  layoutMode: CoursesLayoutMode;
}

interface CourseFiltersProps {
  filters: CourseFilterState;
  courseProgress: CourseLibraryProgressMetrics;
  matchingResourcesCount: number;
  totalResourcesCount: number;
  hasActiveFilters: boolean;
  onUpdateFilters: (patch: Partial<CourseFilterState>) => void;
  onResetFilters: () => void;
}

export function CourseFilters({
  filters,
  courseProgress,
  matchingResourcesCount,
  totalResourcesCount,
  hasActiveFilters,
  onUpdateFilters,
  onResetFilters,
}: CourseFiltersProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut "/" to focus the course search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        document.activeElement?.tagName !== "SELECT"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const collectionTabs: {
    id: PersonalCollectionTab;
    label: string;
    count: number;
    icon?: React.ReactNode;
  }[] = [
    {
      id: "all",
      label: "All Resources",
      count: courseProgress.totalResourcesCount,
    },
    {
      id: "bookmarked",
      label: "Bookmarked",
      count: courseProgress.bookmarkedCount,
      icon: <Bookmark className="size-3.5 text-terracotta" />,
    },
    {
      id: "in_progress",
      label: "In Progress",
      count: courseProgress.inProgressCount,
      icon: <Clock className="size-3.5 text-terracotta" />,
    },
    {
      id: "completed",
      label: "Completed",
      count: courseProgress.completedCount,
      icon: <CheckCircle2 className="size-3.5 text-success" />,
    },
  ];

  return (
    <div
      id="courses-explorer-controls"
      className="scroll-mt-24 space-y-5 rounded-2xl border border-border-strong bg-card p-4 shadow-xs sm:p-6"
    >
      {/* Row 1: My Learning Resources Tabs + Layout View Toggle */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="My Learning Resources filter tabs"
          className="flex flex-wrap items-center gap-1.5"
        >
          {collectionTabs.map((tab) => {
            const active = filters.collectionTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() =>
                  onUpdateFilters({
                    collectionTab: tab.id,
                    selectedStatus:
                      tab.id === "in_progress"
                        ? "in_progress"
                        : tab.id === "completed"
                          ? "completed"
                          : "all",
                  })
                }
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active
                    ? "border-terracotta bg-terracotta text-accent-foreground shadow-2xs"
                    : "border-border bg-surface-subtle text-foreground hover:border-border-strong hover:bg-muted/70"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 font-mono text-[11px]",
                    active
                      ? "bg-black/15 text-accent-foreground"
                      : "bg-card text-muted-foreground"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Display Mode Toggle: Phase-Grouped vs Unified Catalog Grid */}
        <div
          role="group"
          aria-label="Library display layout"
          className="inline-flex shrink-0 items-center self-start rounded-lg border border-border-strong bg-surface-subtle p-1 lg:self-auto"
        >
          <Button
            type="button"
            size="sm"
            variant={filters.layoutMode === "by-phase" ? "primary" : "ghost"}
            onClick={() => onUpdateFilters({ layoutMode: "by-phase" })}
            className="h-8 px-3 text-xs"
          >
            <Layers className="size-3.5" />
            <span>By Roadmap Phase</span>
          </Button>
          <Button
            type="button"
            size="sm"
            variant={
              filters.layoutMode === "catalog-grid" ? "primary" : "ghost"
            }
            onClick={() => onUpdateFilters({ layoutMode: "catalog-grid" })}
            className="h-8 px-3 text-xs"
          >
            <LayoutGrid className="size-3.5" />
            <span>All Unique Catalog</span>
          </Button>
        </div>
      </div>

      {/* Row 2: Search Input + Sort Selector */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchInputRef}
            type="search"
            value={filters.searchQuery}
            onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
            placeholder="Search by course title, provider (MIT, Stanford, Karpathy, Hugging Face), topic, or tag... (Press '/' to focus)"
            aria-label="Search courses and learning resources"
            className="h-10 w-full rounded-lg border border-border-strong bg-surface-subtle pr-9 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-terracotta focus:bg-card focus:outline-none sm:text-sm"
          />
          {filters.searchQuery ? (
            <button
              type="button"
              onClick={() => onUpdateFilters({ searchQuery: "" })}
              aria-label="Clear search query"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="courses-sort-select"
            className="shrink-0 font-mono text-xs text-muted-foreground"
          >
            Sort by:
          </label>
          <select
            id="courses-sort-select"
            value={filters.sortBy}
            onChange={(e) =>
              onUpdateFilters({
                sortBy: e.target.value as CoursesSortOption,
              })
            }
            className="h-10 rounded-lg border border-border-strong bg-surface-subtle px-3 text-xs font-medium text-foreground focus:border-terracotta focus:outline-none"
          >
            <option value="recommended">Recommended Study Order</option>
            <option value="phase">Phase Sequence (P0 → P8)</option>
            <option value="title">Title (A → Z)</option>
          </select>
        </div>
      </div>

      {/* Row 3: Phase Filter Pills (All Phases, Phase 0 – Phase 8) */}
      <div className="space-y-2">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          Filter by Roadmap Phase
        </span>
        <div
          role="group"
          aria-label="Filter resources by roadmap phase"
          className="flex flex-wrap gap-1.5"
        >
          <button
            type="button"
            aria-pressed={filters.selectedPhase === "all"}
            onClick={() => onUpdateFilters({ selectedPhase: "all" })}
            className={cn(
              "cursor-pointer rounded-md border px-2.5 py-1 font-mono text-xs font-medium transition-colors",
              filters.selectedPhase === "all"
                ? "border-terracotta bg-terracotta text-accent-foreground"
                : "border-border bg-surface-subtle text-foreground hover:border-border-strong"
            )}
          >
            All Phases
          </button>

          {COMPLETE_ROADMAP_PHASES.map((phase) => {
            const active = filters.selectedPhase === phase.phase;
            return (
              <button
                key={phase.id}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  onUpdateFilters({
                    selectedPhase: active ? "all" : phase.phase,
                  })
                }
                className={cn(
                  "cursor-pointer rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-terracotta bg-terracotta text-accent-foreground"
                    : "border-border bg-surface-subtle text-muted-foreground hover:border-border-strong hover:text-foreground"
                )}
              >
                <span className="font-mono font-semibold">P{phase.phase}</span>
                <span className="hidden sm:inline"> · {phase.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 4: Dropdowns for Resource Type, Difficulty, Provider, Status + Check Toggles */}
      <div className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Resource Type Filter */}
        <div className="space-y-1">
          <label
            htmlFor="filter-resource-type"
            className="block font-mono text-[11px] font-medium text-muted-foreground uppercase"
          >
            Resource Type
          </label>
          <select
            id="filter-resource-type"
            value={filters.selectedTypeGroupId}
            onChange={(e) =>
              onUpdateFilters({ selectedTypeGroupId: e.target.value })
            }
            className="h-9 w-full rounded-lg border border-border-strong bg-surface-subtle px-2.5 text-xs font-medium text-foreground focus:border-terracotta focus:outline-none"
          >
            <option value="all">All Resource Types</option>
            {RESOURCE_TYPE_FILTER_GROUPS.map((group) => (
              <option key={group.id} value={group.id}>
                {group.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-1">
          <label
            htmlFor="filter-difficulty"
            className="block font-mono text-[11px] font-medium text-muted-foreground uppercase"
          >
            Difficulty Level
          </label>
          <select
            id="filter-difficulty"
            value={filters.selectedDifficulty}
            onChange={(e) =>
              onUpdateFilters({
                selectedDifficulty: e.target.value as DifficultyLevel | "all",
              })
            }
            className="h-9 w-full rounded-lg border border-border-strong bg-surface-subtle px-2.5 text-xs font-medium text-foreground focus:border-terracotta focus:outline-none"
          >
            <option value="all">All Difficulty Levels</option>
            <option value="foundational">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="research">Research</option>
          </select>
        </div>

        {/* Provider Filter */}
        <div className="space-y-1">
          <label
            htmlFor="filter-provider"
            className="block font-mono text-[11px] font-medium text-muted-foreground uppercase"
          >
            Provider / Institution
          </label>
          <select
            id="filter-provider"
            value={filters.selectedProviderGroup}
            onChange={(e) =>
              onUpdateFilters({ selectedProviderGroup: e.target.value })
            }
            className="h-9 w-full rounded-lg border border-border-strong bg-surface-subtle px-2.5 text-xs font-medium text-foreground focus:border-terracotta focus:outline-none"
          >
            <option value="all">All Providers</option>
            {AVAILABLE_PROVIDER_GROUPS.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Learning Status Filter */}
        <div className="space-y-1">
          <label
            htmlFor="filter-learning-status"
            className="block font-mono text-[11px] font-medium text-muted-foreground uppercase"
          >
            Learning Status
          </label>
          <select
            id="filter-learning-status"
            value={filters.selectedStatus}
            onChange={(e) =>
              onUpdateFilters({
                selectedStatus: e.target.value as ProgressState | "all",
                collectionTab:
                  e.target.value === "in_progress"
                    ? "in_progress"
                    : e.target.value === "completed"
                      ? "completed"
                      : filters.collectionTab === "bookmarked"
                        ? "bookmarked"
                        : "all",
              })
            }
            className="h-9 w-full rounded-lg border border-border-strong bg-surface-subtle px-2.5 text-xs font-medium text-foreground focus:border-terracotta focus:outline-none"
          >
            <option value="all">All Learning Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Row 5: Quick Boolean Filter Chips + Result Count + Clear All */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Filter className="size-3.5" />
            Quick Filters:
          </span>

          <button
            type="button"
            aria-pressed={filters.onlyRecommended}
            onClick={() =>
              onUpdateFilters({ onlyRecommended: !filters.onlyRecommended })
            }
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
              filters.onlyRecommended
                ? "border-terracotta bg-terracotta-subtle text-terracotta-strong"
                : "border-border bg-surface-subtle text-muted-foreground hover:text-foreground"
            )}
          >
            <Sparkles className="size-3" />
            <span>Recommended (&ldquo;Start Here&rdquo;) Only</span>
          </button>

          <button
            type="button"
            aria-pressed={filters.onlyFreeMaterial}
            onClick={() =>
              onUpdateFilters({ onlyFreeMaterial: !filters.onlyFreeMaterial })
            }
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
              filters.onlyFreeMaterial
                ? "border-sage-strong bg-secondary text-secondary-foreground"
                : "border-border bg-surface-subtle text-muted-foreground hover:text-foreground"
            )}
          >
            <span>Exclude Mixed Paid Catalogs</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="muted" className="font-mono text-xs">
            Showing {matchingResourcesCount} of {totalResourcesCount} resources
          </Badge>

          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-8 px-2.5 text-xs text-terracotta-strong hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              <span>Clear All Filters</span>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
