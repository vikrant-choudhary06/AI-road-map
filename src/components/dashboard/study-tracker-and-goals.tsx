"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Pause,
  Play,
  PlusCircle,
  RotateCcw,
  Square,
  Target,
  Trash2,
} from "lucide-react";
import type {
  ActiveStudyTimerState,
  RoadmapPhase,
  StudyGoalConfig,
  StudyPacePreset,
  StudySessionRecord,
} from "@/types";
import type { PhaseProgressMetrics } from "@/hooks/use-roadmap-progress";
import { COMPLETE_ROADMAP_PHASES } from "@/data/roadmap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  addLocalDays,
  formatDurationMinutes,
  getLocalWeekDays,
  getStartOfLocalWeek,
} from "@/lib/date-utils";

const PACE_OPTIONS: {
  id: StudyPacePreset;
  label: string;
  minutes: number;
}[] = [
  { id: "casual", label: "Casual (30m/d)", minutes: 30 },
  { id: "steady", label: "Steady (60m/d)", minutes: 60 },
  { id: "focused", label: "Focused (120m/d)", minutes: 120 },
  { id: "intensive", label: "Intensive (180m/d)", minutes: 180 },
  { id: "custom", label: "Custom", minutes: 45 },
];

function formatStopwatchMs(elapsedMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export interface StudySessionTimerProps {
  todayDateKey: string;
  defaultPhaseId: string;
  defaultModuleId: string | null;
  activeTimerSession: ActiveStudyTimerState | null;
  studySessions: StudySessionRecord[];
  onStartTimer: (
    phaseId: string,
    moduleId: string | null,
    note: string
  ) => void;
  onPauseTimer: () => void;
  onResumeTimer: () => void;
  onUpdateTimerMeta: (patch: {
    phaseId?: string;
    moduleId?: string | null;
    note?: string;
  }) => void;
  onFinishTimer: (overrideNote?: string) => StudySessionRecord | null;
  onDiscardTimer: () => void;
  onLogManualSession: (input: {
    dateKey: string;
    durationMinutes: number;
    phaseId: string;
    moduleId: string | null;
    note: string;
  }) => StudySessionRecord | null;
  onDeleteSession: (sessionId: string) => void;
}

export function StudySessionTimer({
  todayDateKey,
  defaultPhaseId,
  defaultModuleId,
  activeTimerSession,
  studySessions,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onUpdateTimerMeta,
  onFinishTimer,
  onDiscardTimer,
  onLogManualSession,
  onDeleteSession,
}: StudySessionTimerProps) {
  const [entryMode, setEntryMode] = useState<"timer" | "manual">("timer");

  // Draft fields when timer is NOT active yet
  const [timerPhaseId, setTimerPhaseId] = useState<string>(defaultPhaseId);
  const [timerModuleId, setTimerModuleId] = useState<string>(
    defaultModuleId ?? ""
  );
  const [timerNote, setTimerNote] = useState<string>("");

  // Live tick epoch for displaying elapsed wall-clock time (updated in useEffect / handlers)
  const [nowEpochMs, setNowEpochMs] = useState<number>(0);

  // Manual study log form fields
  const [customManualDateKey, setCustomManualDateKey] = useState<string>("");
  const manualDateKey = customManualDateKey || todayDateKey;
  const [manualDuration, setManualDuration] = useState<number>(45);
  const [manualPhaseId, setManualPhaseId] = useState<string>(defaultPhaseId);
  const [manualModuleId, setManualModuleId] = useState<string>(
    defaultModuleId ?? ""
  );
  const [manualNote, setManualNote] = useState<string>("");
  const [manualSuccessMsg, setManualSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTimerSession || activeTimerSession.status !== "running") {
      return;
    }
    const tick = () => setNowEpochMs(Date.now());
    const initialTimeout = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(interval);
    };
  }, [activeTimerSession]);

  const effectiveElapsedMs = activeTimerSession
    ? activeTimerSession.accumulatedElapsedMs +
      (activeTimerSession.status === "running" &&
      activeTimerSession.lastResumedAtEpochMs
        ? Math.max(0, nowEpochMs - activeTimerSession.lastResumedAtEpochMs)
        : 0)
    : 0;

  const selectedTimerPhase =
    COMPLETE_ROADMAP_PHASES.find(
      (p) =>
        p.id === (activeTimerSession ? activeTimerSession.phaseId : timerPhaseId)
    ) ?? COMPLETE_ROADMAP_PHASES[0];

  const selectedManualPhase =
    COMPLETE_ROADMAP_PHASES.find((p) => p.id === manualPhaseId) ??
    COMPLETE_ROADMAP_PHASES[0];

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogManualSession({
      dateKey: manualDateKey,
      durationMinutes: manualDuration,
      phaseId: manualPhaseId,
      moduleId: manualModuleId || null,
      note: manualNote,
    });
    setManualNote("");
    setManualSuccessMsg("Manual study session logged.");
    window.setTimeout(() => setManualSuccessMsg(null), 3000);
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Study Time Tracking
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              Focus Timer &amp; Manual Study Log
            </h2>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-background p-1">
            <button
              type="button"
              onClick={() => setEntryMode("timer")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                entryMode === "timer"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Live Timer
            </button>
            <button
              type="button"
              onClick={() => setEntryMode("manual")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                entryMode === "manual"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Manual Log
            </button>
          </div>
        </div>

        {/* MODE 1: LIVE STUDY SESSION TIMER */}
        {entryMode === "timer" ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-border/80 bg-surface-soft/55 p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Badge
                  variant={
                    activeTimerSession
                      ? activeTimerSession.status === "running"
                        ? "terracotta"
                        : "outline"
                      : "sage"
                  }
                >
                  {activeTimerSession
                    ? activeTimerSession.status === "running"
                      ? "Timer Running (Persisted)"
                      : "Timer Paused (Recovered)"
                    : "Ready to Focus"}
                </Badge>
              </div>

              <p
                className="mt-2 font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                aria-live="polite"
              >
                {formatStopwatchMs(effectiveElapsedMs)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Elapsed time uses wall-clock timestamps and survives browser
                refreshes.
              </p>

              {/* Timer Controls */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                {!activeTimerSession ? (
                  <Button
                    type="button"
                    onClick={() => {
                      setNowEpochMs(Date.now());
                      onStartTimer(
                        timerPhaseId,
                        timerModuleId || null,
                        timerNote
                      );
                    }}
                  >
                    <Play className="size-4" />
                    <span>Start Study Session</span>
                  </Button>
                ) : (
                  <>
                    {activeTimerSession.status === "running" ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onPauseTimer}
                      >
                        <Pause className="size-4" />
                        <span>Pause</span>
                      </Button>
                    ) : (
                      <Button type="button" onClick={onResumeTimer}>
                        <Play className="size-4" />
                        <span>Resume</span>
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => onFinishTimer()}
                    >
                      <Square className="size-3.5" />
                      <span>Finish &amp; Log Session</span>
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onDiscardTimer}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Discard
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Associated Phase / Module / Note selectors */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="timer-phase-select"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Roadmap Phase
                </label>
                <select
                  id="timer-phase-select"
                  value={
                    activeTimerSession
                      ? activeTimerSession.phaseId
                      : timerPhaseId
                  }
                  onChange={(e) => {
                    const nextPhase = e.target.value;
                    if (activeTimerSession) {
                      onUpdateTimerMeta({ phaseId: nextPhase, moduleId: null });
                    } else {
                      setTimerPhaseId(nextPhase);
                      setTimerModuleId("");
                    }
                  }}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
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
                  htmlFor="timer-module-select"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Module (Optional)
                </label>
                <select
                  id="timer-module-select"
                  value={
                    activeTimerSession
                      ? activeTimerSession.moduleId ?? ""
                      : timerModuleId
                  }
                  onChange={(e) => {
                    const nextMod = e.target.value || null;
                    if (activeTimerSession) {
                      onUpdateTimerMeta({ moduleId: nextMod });
                    } else {
                      setTimerModuleId(e.target.value);
                    }
                  }}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">General Phase Study</option>
                  {selectedTimerPhase.modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.code}: {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="timer-session-note"
                className="block text-xs font-medium text-muted-foreground"
              >
                Session Note (Optional)
              </label>
              <input
                id="timer-session-note"
                type="text"
                value={
                  activeTimerSession ? activeTimerSession.note : timerNote
                }
                onChange={(e) => {
                  if (activeTimerSession) {
                    onUpdateTimerMeta({ note: e.target.value });
                  } else {
                    setTimerNote(e.target.value);
                  }
                }}
                placeholder="e.g., Implementing scaled dot-product attention in PyTorch..."
                maxLength={280}
                className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        ) : (
          /* MODE 2: MANUAL STUDY LOG */
          <form onSubmit={handleManualSubmit} className="mt-4 space-y-3.5">
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-surface-soft/45 px-3.5 py-2 text-xs">
              <span className="font-medium text-foreground">
                Manual Study Log Entry
              </span>
              <Badge variant="outline">Labeled as Manual Log</Badge>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="manual-date"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Study Date
                </label>
                <input
                  id="manual-date"
                  type="date"
                  value={manualDateKey}
                  onChange={(e) => setCustomManualDateKey(e.target.value)}
                  required
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="manual-duration"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Duration (Minutes)
                </label>
                <input
                  id="manual-duration"
                  type="number"
                  min={1}
                  max={720}
                  value={manualDuration}
                  onChange={(e) =>
                    setManualDuration(Math.max(1, Number(e.target.value) || 15))
                  }
                  required
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="manual-phase"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Roadmap Phase
                </label>
                <select
                  id="manual-phase"
                  value={manualPhaseId}
                  onChange={(e) => {
                    setManualPhaseId(e.target.value);
                    setManualModuleId("");
                  }}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
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
                  htmlFor="manual-module"
                  className="block text-xs font-medium text-muted-foreground"
                >
                  Module (Optional)
                </label>
                <select
                  id="manual-module"
                  value={manualModuleId}
                  onChange={(e) => setManualModuleId(e.target.value)}
                  className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">General Phase Study</option>
                  {selectedManualPhase.modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.code}: {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="manual-note"
                className="block text-xs font-medium text-muted-foreground"
              >
                Session Note (Optional)
              </label>
              <input
                id="manual-note"
                type="text"
                value={manualNote}
                onChange={(e) => setManualNote(e.target.value)}
                placeholder="e.g., Watched CS231n lecture & worked through backprop derivations"
                maxLength={280}
                className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <Button type="submit" size="sm">
                <PlusCircle className="size-3.5" />
                <span>Add Manual Study Log</span>
              </Button>
              {manualSuccessMsg ? (
                <span className="text-xs font-medium text-primary">
                  {manualSuccessMsg}
                </span>
              ) : null}
            </div>
          </form>
        )}

        {/* Recent Study Sessions List */}
        <div className="mt-5 border-t border-border/70 pt-4">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            <span>Recent Recorded Sessions ({studySessions.length})</span>
            <span>Entry Type</span>
          </div>

          {studySessions.length === 0 ? (
            <p className="mt-2.5 text-xs text-muted-foreground">
              No study sessions logged yet. Start the focus timer above or record
              a manual study log.
            </p>
          ) : (
            <div className="mt-2.5 space-y-2">
              {studySessions.slice(0, 4).map((sess) => {
                const phaseObj = COMPLETE_ROADMAP_PHASES.find(
                  (p) => p.id === sess.phaseId
                );
                return (
                  <div
                    key={sess.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-semibold text-foreground">
                          {formatDurationMinutes(sess.durationMinutes)}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">
                          Phase {phaseObj?.phase ?? 0}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">
                          {sess.localDateKey}
                        </span>
                      </div>
                      {sess.note ? (
                        <p className="mt-0.5 truncate text-muted-foreground">
                          {sess.note}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Badge
                        variant={
                          sess.entryMethod === "timer" ? "sage" : "outline"
                        }
                      >
                        {sess.entryMethod === "timer" ? "Timer" : "Manual Log"}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => onDeleteSession(sess.id)}
                        aria-label="Delete study session"
                        className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
        <span>All sessions persist locally in your browser</span>
        <span>
          Total:{" "}
          <strong className="text-foreground">
            {formatDurationMinutes(
              studySessions.reduce((acc, s) => acc + s.durationMinutes, 0)
            )}
          </strong>
        </span>
      </div>
    </div>
  );
}

export interface LearningGoalSettingsProps {
  studyGoal: StudyGoalConfig;
  onSaveGoal: (patch: Partial<StudyGoalConfig>) => void;
  onResetGoal: () => void;
}

export function LearningGoalSettings({
  studyGoal,
  onSaveGoal,
  onResetGoal,
}: LearningGoalSettingsProps) {
  const [pacePreset, setPacePreset] = useState<StudyPacePreset>(
    studyGoal.pacePreset
  );
  const [dailyMinutes, setDailyMinutes] = useState<number>(
    studyGoal.dailyMinutesTarget
  );
  const [daysPerWeek, setDaysPerWeek] = useState<number>(
    studyGoal.studyDaysPerWeek
  );
  const [targetDate, setTargetDate] = useState<string>(
    studyGoal.targetCompletionDate ?? ""
  );
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const handleSelectPace = (preset: StudyPacePreset) => {
    setPacePreset(preset);
    const match = PACE_OPTIONS.find((p) => p.id === preset);
    if (match && preset !== "custom") {
      setDailyMinutes(match.minutes);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveGoal({
      pacePreset,
      dailyMinutesTarget: dailyMinutes,
      studyDaysPerWeek: daysPerWeek,
      weeklyMinutesTarget: dailyMinutes * daysPerWeek,
      targetCompletionDate: targetDate.trim() || null,
      isPaused: false,
      isConfigured: true,
    });
    setSavedToast(true);
    window.setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Personal Learning Goals
            </p>
            <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
              Study Pace &amp; Weekly Target
            </h2>
          </div>

          <Badge variant={studyGoal.isPaused ? "outline" : "sage"}>
            {studyGoal.isPaused
              ? "Goal Paused"
              : `${formatDurationMinutes(dailyMinutes * daysPerWeek)} / week`}
          </Badge>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {/* Pace Preset Selector */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground">
              Pace Preset
            </label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {PACE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectPace(opt.id)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    pacePreset === opt.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/80 bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="goal-daily-minutes"
                className="block text-xs font-medium text-muted-foreground"
              >
                Daily Study Target (Minutes)
              </label>
              <input
                id="goal-daily-minutes"
                type="number"
                min={10}
                max={720}
                step={5}
                value={dailyMinutes}
                onChange={(e) => {
                  const val = Math.max(10, Number(e.target.value) || 30);
                  setDailyMinutes(val);
                  if (
                    val !== 30 &&
                    val !== 60 &&
                    val !== 120 &&
                    val !== 180
                  ) {
                    setPacePreset("custom");
                  }
                }}
                className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="goal-days-per-week"
                className="block text-xs font-medium text-muted-foreground"
              >
                Study Days Per Week (1–7)
              </label>
              <select
                id="goal-days-per-week"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value) || 5)}
                className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    {d} {d === 1 ? "day" : "days"} per week (
                    {formatDurationMinutes(dailyMinutes * d)}/wk)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="goal-target-date"
              className="block text-xs font-medium text-muted-foreground"
            >
              Optional Target Completion Date
            </label>
            <input
              id="goal-target-date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-border/70 bg-surface-soft/50 p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Derived Weekly Goal:</span>
              <span className="font-semibold text-foreground">
                {formatDurationMinutes(dailyMinutes * daysPerWeek)} (
                {dailyMinutes}m × {daysPerWeek}d)
              </span>
            </div>
            {targetDate ? (
              <div className="mt-1 flex items-center justify-between">
                <span className="text-muted-foreground">Target Milestone Date:</span>
                <span className="font-medium text-foreground">{targetDate}</span>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <Button type="submit" size="sm">
                <Target className="size-3.5" />
                <span>Save Goal</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  onSaveGoal({
                    isPaused: !studyGoal.isPaused,
                  })
                }
              >
                <span>
                  {studyGoal.isPaused ? "Resume Goal" : "Pause Goal"}
                </span>
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onResetGoal();
                setPacePreset("steady");
                setDailyMinutes(60);
                setDaysPerWeek(5);
                setTargetDate("");
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </Button>
          </div>
          {savedToast ? (
            <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <CheckCircle2 className="size-3.5" />
              <span>Study goal updated and saved locally.</span>
            </p>
          ) : null}
        </form>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3.5 text-xs text-muted-foreground">
        <span>Adjust your study pace anytime without losing history</span>
      </div>
    </div>
  );
}

export interface WeeklyStudyChartProps {
  todayDateKey: string;
  minutesByDate: Record<string, number>;
  totalAllTimeMinutes: number;
  totalSessionsCount: number;
  studyGoal: StudyGoalConfig;
  getPhaseProgress: (phase: RoadmapPhase) => PhaseProgressMetrics;
}

export function WeeklyStudyChart({
  todayDateKey,
  minutesByDate,
  totalAllTimeMinutes,
  totalSessionsCount,
  studyGoal,
  getPhaseProgress,
}: WeeklyStudyChartProps) {
  const weekMonday = getStartOfLocalWeek(todayDateKey);
  const weekDays = getLocalWeekDays(weekMonday, todayDateKey);

  const dailyTarget = Math.max(15, studyGoal.dailyMinutesTarget);
  const weeklyTarget = Math.max(60, studyGoal.weeklyMinutesTarget);

  const weekData = weekDays.map((day) => ({
    ...day,
    minutes: minutesByDate[day.dateKey] ?? 0,
  }));

  const currentWeekTotalMinutes = weekData.reduce(
    (sum, d) => sum + d.minutes,
    0
  );
  const weeklyGoalPercent = Math.min(
    100,
    Math.round((currentWeekTotalMinutes / weeklyTarget) * 100)
  );

  const maxBarScale = Math.max(
    dailyTarget,
    ...weekData.map((d) => d.minutes),
    60
  );

  // Previous 7-day range for comparison
  const prevWeekStart = addLocalDays(weekMonday, -7);

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Learning Analytics (Real Stored Data)
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-foreground sm:text-2xl">
            Weekly Study Time &amp; Phase Completion Breakdown
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="sage">
            <Clock className="mr-1 size-3.5" />
            This Week: {formatDurationMinutes(currentWeekTotalMinutes)} /{" "}
            {formatDurationMinutes(weeklyTarget)} ({weeklyGoalPercent}%)
          </Badge>
          <Badge variant="outline">
            All-Time: {formatDurationMinutes(totalAllTimeMinutes)} (
            {totalSessionsCount} sessions)
          </Badge>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 cols: Weekly Study Minutes Bar Chart */}
        <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-base font-semibold text-foreground">
                Current Week Study Minutes (Mon – Sun)
              </h3>
              <p className="text-xs text-muted-foreground">
                Compared against your{" "}
                {formatDurationMinutes(studyGoal.dailyMinutesTarget)}/day target
                line
              </p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              Week of {weekMonday}
            </span>
          </div>

          {/* Accessible Bar Chart */}
          <div className="mt-6 grid grid-cols-7 items-end gap-2 pt-4">
            {weekData.map((day) => {
              const heightPercent = Math.min(
                100,
                Math.round((day.minutes / maxBarScale) * 100)
              );
              const metDailyGoal = day.minutes >= dailyTarget;

              return (
                <div
                  key={day.dateKey}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="font-mono text-[11px] font-medium text-foreground">
                    {day.minutes > 0 ? `${day.minutes}m` : "0m"}
                  </span>

                  <div className="relative flex h-32 w-full max-w-[44px] items-end justify-center overflow-hidden rounded-lg border border-border/70 bg-secondary/50 p-1">
                    {/* Target reference line */}
                    <div
                      className="pointer-events-none absolute inset-x-0 border-t border-dashed border-accent/70"
                      style={{
                        bottom: `${Math.min(
                          95,
                          Math.round((dailyTarget / maxBarScale) * 100)
                        )}%`,
                      }}
                      title={`Daily target: ${dailyTarget}m`}
                    />
                    <div
                      className={`w-full rounded-md transition-all duration-300 ${
                        day.minutes === 0
                          ? "h-1 bg-border"
                          : metDailyGoal
                            ? "bg-primary"
                            : "bg-accent"
                      }`}
                      style={{
                        height:
                          day.minutes === 0 ? "4px" : `${Math.max(10, heightPercent)}%`,
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <p
                      className={`text-xs font-semibold ${
                        day.isToday ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {day.dayShort}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {day.monthShort} {day.dayNumber}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-xs bg-primary" />
                Met daily target ({dailyTarget}m+)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-xs bg-accent" />
                Logged session (&lt;{dailyTarget}m)
              </span>
            </div>
            <span className="text-[11px]">Prev week began {prevWeekStart}</span>
          </div>
        </div>

        {/* Right 5 cols: Phase Completion Distribution */}
        <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-background/60 p-4 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-foreground">
                Phase Completion Distribution
              </h3>
              <BarChart3 className="size-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Topic mastery across Phases 0–8
            </p>

            <div className="mt-4 space-y-2.5">
              {COMPLETE_ROADMAP_PHASES.map((phase) => {
                const metrics = getPhaseProgress(phase);
                return (
                  <div key={phase.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate font-medium text-foreground">
                        P{phase.phase}: {phase.title}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                        {metrics.completedCount}/{metrics.totalCount} (
                        {metrics.percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${metrics.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
            Computed directly from your checked curriculum topics.
          </div>
        </div>
      </div>
    </div>
  );
}
