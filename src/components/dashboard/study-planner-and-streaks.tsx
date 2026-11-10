"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  Flame,
  Forward,
  History,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import type {
  LearningActivityEvent,
  PlannerTaskStatus,
  StudyPlannerTask,
} from "@/types";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  addLocalDays,
  computeLearningStreak,
  formatDurationMinutes,
  formatLocalDateReadable,
  getLocalWeekDays,
  getStartOfLocalWeek,
  getTrailingLocalDays,
} from "@/lib/date-utils";

const STARTER_TASK_TEMPLATES: {
  id: string;
  title: string;
  phaseId: string;
  moduleId: string | null;
  estimatedMinutes: number;
}[] = [
  {
    id: "tpl-python",
    title: "Complete Python foundations topic",
    phaseId: "phase-0",
    moduleId: "p0-m1",
    estimatedMinutes: 45,
  },
  {
    id: "tpl-linalg",
    title: "Study Linear Algebra lecture",
    phaseId: "phase-1",
    moduleId: "p1-m1",
    estimatedMinutes: 60,
  },
  {
    id: "tpl-nn",
    title: "Implement neural network exercise",
    phaseId: "phase-3",
    moduleId: "p3-m1",
    estimatedMinutes: 90,
  },
  {
    id: "tpl-transformer",
    title: "Read Transformer architecture section",
    phaseId: "phase-5",
    moduleId: "p5-m1",
    estimatedMinutes: 60,
  },
];

export interface WeeklyStudyPlannerProps {
  todayDateKey: string;
  defaultPhaseId: string;
  plannerTasks: StudyPlannerTask[];
  onAddTask: (input: {
    title: string;
    dateKey: string;
    phaseId: string;
    moduleId: string | null;
    estimatedMinutes: number;
  }) => StudyPlannerTask | null;
  onUpdateTask: (
    taskId: string,
    patch: Partial<
      Pick<
        StudyPlannerTask,
        | "title"
        | "dateKey"
        | "phaseId"
        | "moduleId"
        | "estimatedMinutes"
        | "status"
      >
    >
  ) => void;
  onDeleteTask: (taskId: string) => void;
}

export function WeeklyStudyPlanner({
  todayDateKey,
  defaultPhaseId,
  plannerTasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}: WeeklyStudyPlannerProps) {
  const [customWeekMondayKey, setCustomWeekMondayKey] = useState<string | null>(
    null
  );
  const [customSelectedDateKey, setCustomSelectedDateKey] = useState<
    string | null
  >(null);

  const weekMondayKey =
    customWeekMondayKey ?? getStartOfLocalWeek(todayDateKey);
  const selectedDateKey = customSelectedDateKey ?? todayDateKey;

  // Add task form state
  const [newTitle, setNewTitle] = useState<string>("");
  const [newPhaseId, setNewPhaseId] = useState<string>(defaultPhaseId);
  const [newModuleId, setNewModuleId] = useState<string>("");
  const [newMinutes, setNewMinutes] = useState<number>(45);

  // Inline edit task state
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editMinutes, setEditMinutes] = useState<number>(45);

  const weekDays = getLocalWeekDays(weekMondayKey, todayDateKey);
  const selectedPhaseObj =
    COMPLETE_ROADMAP_PHASES.find((p) => p.id === newPhaseId) ??
    COMPLETE_ROADMAP_PHASES[0];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask({
      title: newTitle,
      dateKey: selectedDateKey,
      phaseId: newPhaseId,
      moduleId: newModuleId || null,
      estimatedMinutes: newMinutes,
    });
    setNewTitle("");
  };

  const handleAddTemplate = (
    template: (typeof STARTER_TASK_TEMPLATES)[number]
  ) => {
    onAddTask({
      title: template.title,
      dateKey: selectedDateKey,
      phaseId: template.phaseId,
      moduleId: template.moduleId,
      estimatedMinutes: template.estimatedMinutes,
    });
  };

  const weekStartKey = weekDays[0]?.dateKey ?? weekMondayKey;
  const weekEndKey = weekDays[6]?.dateKey ?? addLocalDays(weekMondayKey, 6);

  const weekTasks = plannerTasks.filter(
    (t) => t.dateKey >= weekStartKey && t.dateKey <= weekEndKey
  );
  const weekPlannedMinutes = weekTasks.reduce(
    (sum, t) => sum + t.estimatedMinutes,
    0
  );
  const weekCompletedCount = weekTasks.filter(
    (t) => t.status === "completed"
  ).length;

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      {/* Header & Week Navigator */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Daily &amp; Weekly Study Planner
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Weekly Study Schedule (Mon – Sun)
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="sage">
            {weekCompletedCount}/{weekTasks.length} tasks done (
            {formatDurationMinutes(weekPlannedMinutes)} planned)
          </Badge>
          <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-background p-1">
            <button
              type="button"
              onClick={() => {
                const prevMonday = addLocalDays(weekMondayKey, -7);
                setCustomWeekMondayKey(prevMonday);
                setCustomSelectedDateKey(prevMonday);
              }}
              aria-label="Previous week"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                const currentMonday = getStartOfLocalWeek(todayDateKey);
                setCustomWeekMondayKey(currentMonday);
                setCustomSelectedDateKey(todayDateKey);
              }}
              className="rounded-lg px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary"
            >
              This Week
            </button>
            <button
              type="button"
              onClick={() => {
                const nextMonday = addLocalDays(weekMondayKey, 7);
                setCustomWeekMondayKey(nextMonday);
                setCustomSelectedDateKey(nextMonday);
              }}
              aria-label="Next week"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 7-Day Weekly Calendar Strip */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {weekDays.map((day) => {
          const dayTasks = plannerTasks.filter(
            (t) => t.dateKey === day.dateKey
          );
          const completedDayCount = dayTasks.filter(
            (t) => t.status === "completed"
          ).length;
          const isSelected = selectedDateKey === day.dateKey;

          return (
            <div
              key={day.dateKey}
              onClick={() => setCustomSelectedDateKey(day.dateKey)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCustomSelectedDateKey(day.dateKey);
                }
              }}
              role="button"
              tabIndex={0}
              className={`flex min-h-[155px] cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                isSelected
                  ? "border-primary bg-surface-soft/65 shadow-xs ring-1 ring-primary/25"
                  : day.isToday
                    ? "border-accent/55 bg-background/90"
                    : "border-border/80 bg-background/55 hover:border-border hover:bg-background"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-xs font-semibold ${
                      day.isToday ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {day.dayShort}
                    {day.isToday ? " · Today" : ""}
                  </span>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {day.monthShort} {day.dayNumber}
                  </span>
                </div>

                {/* Day Tasks Preview */}
                <div className="mt-2.5 space-y-1.5">
                  {dayTasks.length === 0 ? (
                    <p className="py-3 text-center text-[11px] text-muted-foreground/70">
                      No tasks planned
                    </p>
                  ) : (
                    dayTasks.map((task) => {
                      const isDone = task.status === "completed";
                      const isPostponed = task.status === "postponed";
                      return (
                        <div
                          key={task.id}
                          onClick={(e) => e.stopPropagation()}
                          className={`rounded-lg border p-2 text-[11px] transition-colors ${
                            isDone
                              ? "border-primary/35 bg-surface-soft/80 text-muted-foreground line-through"
                              : isPostponed
                                ? "border-border/60 bg-secondary/40 text-muted-foreground"
                                : "border-border/80 bg-card text-foreground"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateTask(task.id, {
                                  status: isDone ? "planned" : "completed",
                                })
                              }
                              className="flex items-start gap-1.5 text-left font-medium hover:text-primary"
                            >
                              <span
                                className={`mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-xs border ${
                                  isDone
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background"
                                }`}
                              >
                                {isDone ? <Check className="size-2.5" /> : null}
                              </span>
                              <span className="line-clamp-2 leading-tight">
                                {task.title}
                              </span>
                            </button>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                            <span>
                              P{task.phaseId.replace("phase-", "")} ·{" "}
                              {task.estimatedMinutes}m
                            </span>
                            {isPostponed ? <span>Postponed</span> : null}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-1.5 text-[10px] text-muted-foreground">
                <span>
                  {completedDayCount}/{dayTasks.length} done
                </span>
                <span className="font-medium text-primary">+ Select</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Day Task Manager & Add Task Form */}
      <div className="mt-6 grid grid-cols-1 gap-6 border-t border-border/70 pt-5 lg:grid-cols-12">
        {/* Add Task Form + Starter Templates */}
        <div className="space-y-4 lg:col-span-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-foreground">
              Add Study Task for {formatLocalDateReadable(selectedDateKey)}
            </h3>
            <Badge variant="outline">{selectedDateKey}</Badge>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="planner-task-title"
                className="block text-xs font-medium text-muted-foreground"
              >
                Task Title
              </label>
              <input
                id="planner-task-title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Implement multi-head causal attention mask..."
                maxLength={160}
                required
                className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="planner-task-phase"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Phase
                </label>
                <select
                  id="planner-task-phase"
                  value={newPhaseId}
                  onChange={(e) => {
                    setNewPhaseId(e.target.value);
                    setNewModuleId("");
                  }}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  {COMPLETE_ROADMAP_PHASES.map((p) => (
                    <option key={p.id} value={p.id}>
                      Phase {p.phase}: {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="planner-task-module"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Module (Optional)
                </label>
                <select
                  id="planner-task-module"
                  value={newModuleId}
                  onChange={(e) => setNewModuleId(e.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Any Module</option>
                  {selectedPhaseObj.modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.code}: {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="planner-task-minutes"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Est. Minutes
                </label>
                <input
                  id="planner-task-minutes"
                  type="number"
                  min={5}
                  max={600}
                  step={5}
                  value={newMinutes}
                  onChange={(e) =>
                    setNewMinutes(Math.max(5, Number(e.target.value) || 30))
                  }
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" size="sm">
              <Plus className="size-3.5" />
              <span>Add Task to {selectedDateKey}</span>
            </Button>
          </form>

          {/* Starter Task Templates */}
          <div className="rounded-xl border border-border/70 bg-surface-soft/45 p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Sparkles className="size-3.5 text-accent" />
              <span>One-Click Starter Task Templates (Planned)</span>
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Adds a planned task to {selectedDateKey} (never auto-marked as
              completed).
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {STARTER_TASK_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleAddTemplate(tpl)}
                  className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-background"
                >
                  <Plus className="size-3 text-primary" />
                  <span>{tpl.title}</span>
                  <span className="text-[10px] text-muted-foreground">
                    ({tpl.estimatedMinutes}m)
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Day Detailed Task Controls (Edit / Complete / Postpone / Delete) */}
        <div className="space-y-3 lg:col-span-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-semibold text-foreground">
              Tasks Scheduled on {formatLocalDateReadable(selectedDateKey)}
            </h3>
            <span className="text-xs text-muted-foreground">
              {
                plannerTasks.filter((t) => t.dateKey === selectedDateKey).length
              }{" "}
              tasks
            </span>
          </div>

          {plannerTasks.filter((t) => t.dateKey === selectedDateKey).length ===
          0 ? (
            <div className="rounded-xl border border-dashed border-border bg-background/50 p-6 text-center">
              <p className="text-sm font-medium text-foreground">
                No study tasks scheduled for {selectedDateKey}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Use the form or a one-click starter template on the left to
                schedule focused study work for this day.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {plannerTasks
                .filter((t) => t.dateKey === selectedDateKey)
                .map((task) => {
                  const isEditing = editingTaskId === task.id;
                  const phaseObj = COMPLETE_ROADMAP_PHASES.find(
                    (p) => p.id === task.phaseId
                  );

                  return (
                    <div
                      key={task.id}
                      className="rounded-xl border border-border/80 bg-background/75 p-3.5"
                    >
                      {isEditing ? (
                        <div className="space-y-2.5">
                          <div className="flex flex-wrap gap-2">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="h-8 flex-1 rounded-md border border-border bg-card px-2.5 text-xs text-foreground"
                            />
                            <input
                              type="number"
                              min={5}
                              max={600}
                              value={editMinutes}
                              onChange={(e) =>
                                setEditMinutes(Number(e.target.value) || 30)
                              }
                              className="h-8 w-20 rounded-md border border-border bg-card px-2 text-xs text-foreground"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => {
                                onUpdateTask(task.id, {
                                  title: editTitle,
                                  estimatedMinutes: editMinutes,
                                });
                                setEditingTaskId(null);
                              }}
                              className="h-7 px-2.5 text-xs"
                            >
                              Save
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingTaskId(null)}
                              className="h-7 px-2.5 text-xs"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <Badge
                                  variant={
                                    task.status === "completed"
                                      ? "sage"
                                      : task.status === "postponed"
                                        ? "outline"
                                        : "terracotta"
                                  }
                                >
                                  {task.status === "completed"
                                    ? "Completed"
                                    : task.status === "postponed"
                                      ? "Postponed"
                                      : "Planned"}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Phase {phaseObj?.phase ?? 0} ·{" "}
                                  {formatDurationMinutes(task.estimatedMinutes)}
                                </span>
                              </div>
                              <p
                                className={`mt-1.5 text-sm font-semibold ${
                                  task.status === "completed"
                                    ? "text-muted-foreground line-through"
                                    : "text-foreground"
                                }`}
                              >
                                {task.title}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingTaskId(task.id);
                                  setEditTitle(task.title);
                                  setEditMinutes(task.estimatedMinutes);
                                }}
                                aria-label="Edit task"
                                className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                              >
                                <Edit3 className="size-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteTask(task.id)}
                                aria-label="Delete task"
                                className="rounded p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Button
                                type="button"
                                variant={
                                  task.status === "completed"
                                    ? "outline"
                                    : "primary"
                                }
                                size="sm"
                                onClick={() =>
                                  onUpdateTask(task.id, {
                                    status:
                                      task.status === "completed"
                                        ? ("planned" as PlannerTaskStatus)
                                        : ("completed" as PlannerTaskStatus),
                                  })
                                }
                                className="h-7 px-2.5 text-xs"
                              >
                                <CheckCircle2 className="size-3.5" />
                                <span>
                                  {task.status === "completed"
                                    ? "Mark Planned"
                                    : "Complete Task"}
                                </span>
                              </Button>

                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  onUpdateTask(task.id, {
                                    dateKey: addLocalDays(task.dateKey, 1),
                                    status: "postponed",
                                  })
                                }
                                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                              >
                                <Forward className="size-3.5" />
                                <span>Postpone +1 Day</span>
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface LearningStreakCardProps {
  todayDateKey: string;
  activeStudyDateKeys: ReadonlySet<string>;
  minutesByDate: Record<string, number>;
}

export function LearningStreakCard({
  todayDateKey,
  activeStudyDateKeys,
  minutesByDate,
}: LearningStreakCardProps) {
  const streak = computeLearningStreak(activeStudyDateKeys, todayDateKey);
  const trailing28Days = getTrailingLocalDays(todayDateKey, 28);

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Learning Streaks &amp; Consistency
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              28-Day Local Activity Calendar
            </h2>
          </div>
          <Badge variant={streak.activeToday ? "terracotta" : "outline"}>
            <Flame className="mr-1 size-3.5" />
            {streak.currentStreak}{" "}
            {streak.currentStreak === 1 ? "Day" : "Days"} Current Streak
          </Badge>
        </div>

        {/* Streak Metrics Row */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Current Streak
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {streak.currentStreak}{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                days
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Longest Streak
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {streak.longestStreak}{" "}
              <span className="font-sans text-xs font-normal text-muted-foreground">
                days
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-3">
            <p className="text-[11px] font-medium text-muted-foreground">
              Last Active Day
            </p>
            <p className="mt-1 truncate font-mono text-xs font-semibold text-foreground">
              {streak.lastActiveDateKey ?? "No activity yet"}
            </p>
          </div>
        </div>

        {/* 28-Day Local Calendar Grid */}
        <div className="mt-4 rounded-xl border border-border/80 bg-background/60 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">
              Last 28 Local Calendar Days
            </span>
            <span className="text-muted-foreground">
              {streak.totalActiveDays} total active{" "}
              {streak.totalActiveDays === 1 ? "day" : "days"}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {trailing28Days.map((day) => {
              const isActive = activeStudyDateKeys.has(day.dateKey);
              const studyMinutes = minutesByDate[day.dateKey] ?? 0;

              return (
                <div
                  key={day.dateKey}
                  title={`${day.dateKey}: ${
                    isActive
                      ? `Active learning day (${studyMinutes}m logged)`
                      : "No recorded activity"
                  }`}
                  className={`flex flex-col items-center justify-center rounded-lg border py-1.5 text-center transition-colors ${
                    isActive
                      ? studyMinutes >= 60
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-primary/50 bg-surface-soft text-foreground"
                      : day.isToday
                        ? "border-accent/60 bg-background text-foreground"
                        : "border-border/60 bg-background/50 text-muted-foreground"
                  }`}
                >
                  <span className="text-[9px] uppercase opacity-75">
                    {day.dayShort}
                  </span>
                  <span className="font-mono text-xs font-semibold">
                    {day.dayNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explicit Honest Streak Rule Disclosure */}
      <div className="mt-4 rounded-xl border border-border/60 bg-surface-soft/45 p-3 text-[11px] leading-relaxed text-muted-foreground">
        <strong className="font-semibold text-foreground">
          How streaks work:
        </strong>{" "}
        A local calendar day counts only when you complete a topic, log a study
        session, finish a planned task, update a course to In Progress /
        Completed, or complete a project milestone. Simply opening the dashboard
        never inflates your streak.
      </div>
    </div>
  );
}

export interface ActivityHistoryProps {
  activityEvents: LearningActivityEvent[];
}

export function ActivityHistory({ activityEvents }: ActivityHistoryProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Learning Activity History
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              Recent Curriculum &amp; Study Log
            </h2>
          </div>
          <Badge variant="outline">
            <History className="mr-1 size-3.5" />
            {activityEvents.length} Recorded Events
          </Badge>
        </div>

        <div className="mt-4">
          {activityEvents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface-soft/35 p-6 text-center">
              <Calendar className="mx-auto size-6 text-muted-foreground" />
              <p className="mt-2 font-serif text-base font-medium text-foreground">
                Your learning timeline is ready
              </p>
              <p className="mx-auto mt-1 max-w-md text-xs leading-relaxed text-muted-foreground">
                As you check off roadmap topics, start or complete courses,
                record focus sessions, or finish planner tasks, your actions
                will appear in reverse-chronological order here.
              </p>
            </div>
          ) : (
            <div className="max-h-[340px] space-y-2.5 overflow-y-auto pr-1">
              {activityEvents.slice(0, 20).map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/75 bg-background/70 p-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground">{ev.label}</p>
                    {ev.detail ? (
                      <p className="text-muted-foreground">{ev.detail}</p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {ev.localDateKey}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
        <span>Reverse-chronological log of real recorded actions</span>
        <span>Max 250 local entries</span>
      </div>
    </div>
  );
}
