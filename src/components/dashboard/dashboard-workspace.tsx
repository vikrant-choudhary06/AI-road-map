"use client";

import { useState } from "react";
import { useRoadmapProgress } from "@/hooks/use-roadmap-progress";
import { Container } from "@/components/layout";
import {
  ContinueLearningCard,
  DashboardHeader,
  DashboardOnboarding,
  RoadmapProgressSummary,
} from "./dashboard-header";
import {
  ActiveCourses,
  BookmarkedResources,
  PhaseProgressList,
} from "./phase-and-course-progress";
import {
  LearningGoalSettings,
  StudySessionTimer,
  WeeklyStudyChart,
} from "./study-tracker-and-goals";
import {
  ActivityHistory,
  LearningStreakCard,
  WeeklyStudyPlanner,
} from "./study-planner-and-streaks";
import {
  AchievementList,
  DashboardDataControls,
  LearningInsights,
  MilestoneOverview,
} from "./milestones-achievements-insights";

const DASHBOARD_SECTION_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "study-tracker", label: "Timer & Goals" },
  { id: "study-planner", label: "Weekly Planner" },
  { id: "streaks-activity", label: "Streaks & Log" },
  { id: "analytics", label: "Study Analytics" },
  { id: "phases-courses", label: "Phases & Courses" },
  { id: "milestones", label: "14 Milestones" },
  { id: "achievements", label: "Achievements" },
  { id: "data-controls", label: "Backup & Reset" },
] as const;

export function DashboardWorkspace() {
  const {
    store,
    todayDateKey,
    isStoragePersistent,
    overallProgress,
    continueLearningTarget,
    courseLibraryProgress,
    activeStudyDateKeys,
    studyTimeMetrics,
    achievements,
    learningInsights,
    isMilestoneCompleted,
    isResourceBookmarked,
    toggleTopic,
    toggleMilestone,
    toggleResourceBookmark,
    setResourceStatus,
    recordResourceViewed,
    updateLearnerPreferences,
    saveStudyGoal,
    resetStudyGoal,
    startTimerSession,
    pauseTimerSession,
    resumeTimerSession,
    updateActiveTimerMeta,
    finishTimerSession,
    discardTimerSession,
    logManualStudySession,
    deleteStudySession,
    clearStudySessions,
    addPlannerTask,
    updatePlannerTask,
    deletePlannerTask,
    clearPlannerTasks,
    resetDashboardPreferencesOnly,
    exportProgressBackupJson,
    importProgressBackupJson,
    resetProgress,
    getModuleProgress,
    getPhaseProgress,
  } = useRoadmapProgress();

  const [manualShowOnboarding, setManualShowOnboarding] =
    useState<boolean>(false);

  const isFirstTimeLearner =
    overallProgress.completedTopicsCount === 0 &&
    store.studySessions.length === 0 &&
    store.activityEvents.length === 0 &&
    store.bookmarkedResourceIds.length === 0 &&
    Object.keys(store.resourceStatuses).length === 0;

  const shouldShowOnboarding =
    manualShowOnboarding ||
    (!store.learnerPreferences.onboardingCompleted &&
      !store.learnerPreferences.onboardingSkipped &&
      isFirstTimeLearner);

  const currentPhaseMetrics = getPhaseProgress(continueLearningTarget.phase);
  const currentModuleMetrics = getModuleProgress(continueLearningTarget.module);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Personalized Welcome Header */}
      <DashboardHeader
        isFirstTimeLearner={isFirstTimeLearner}
        preferences={store.learnerPreferences}
        studyGoal={store.studyGoal}
        continueLearningTarget={continueLearningTarget}
        overallProgress={overallProgress}
        onUpdatePreferences={updateLearnerPreferences}
        onOpenOnboarding={() => setManualShowOnboarding(true)}
      />

      {/* Sticky Section Anchor Bar */}
      <div className="sticky top-16 z-20 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <Container>
          <nav
            aria-label="Dashboard sections"
            className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar"
          >
            {DASHBOARD_SECTION_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border/80 hover:bg-surface-soft/60 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      <Container className="mt-8 space-y-10">
        {/* 2. Optional Lightweight First-Visit Onboarding */}
        {shouldShowOnboarding ? (
          <section aria-label="First-visit study pace setup">
            <DashboardOnboarding
              preferences={store.learnerPreferences}
              studyGoal={store.studyGoal}
              onSaveOnboarding={(prefsPatch, goalPatch) => {
                updateLearnerPreferences(prefsPatch);
                saveStudyGoal(goalPatch);
                setManualShowOnboarding(false);
              }}
              onSkipOnboarding={() => {
                updateLearnerPreferences({ onboardingSkipped: true });
                setManualShowOnboarding(false);
              }}
            />
          </section>
        ) : null}

        {/* 3. Continue Learning + Overall Roadmap Progress */}
        <section
          id="overview"
          aria-label="Continue learning and overall progress"
          className="scroll-mt-28 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <ContinueLearningCard
              continueLearningTarget={continueLearningTarget}
              phaseProgress={currentPhaseMetrics}
              moduleProgress={currentModuleMetrics}
              onToggleTopic={toggleTopic}
            />
          </div>
          <div className="lg:col-span-5">
            <RoadmapProgressSummary
              overallProgress={overallProgress}
              currentPhase={continueLearningTarget.phase}
              courseLibraryProgress={courseLibraryProgress}
            />
          </div>
        </section>

        {/* 4. Study Session Timer, Manual Log & Personal Learning Goals */}
        <section
          id="study-tracker"
          aria-label="Study timer and personal learning goals"
          className="scroll-mt-28 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <StudySessionTimer
              todayDateKey={todayDateKey}
              defaultPhaseId={continueLearningTarget.phase.id}
              defaultModuleId={continueLearningTarget.module.id}
              activeTimerSession={store.activeTimerSession}
              studySessions={store.studySessions}
              onStartTimer={startTimerSession}
              onPauseTimer={pauseTimerSession}
              onResumeTimer={resumeTimerSession}
              onUpdateTimerMeta={updateActiveTimerMeta}
              onFinishTimer={finishTimerSession}
              onDiscardTimer={discardTimerSession}
              onLogManualSession={logManualStudySession}
              onDeleteSession={deleteStudySession}
            />
          </div>
          <div className="lg:col-span-5">
            <LearningGoalSettings
              studyGoal={store.studyGoal}
              onSaveGoal={saveStudyGoal}
              onResetGoal={resetStudyGoal}
            />
          </div>
        </section>

        {/* 5. Daily & Weekly Study Planner */}
        <section
          id="study-planner"
          aria-label="Weekly study planner"
          className="scroll-mt-28"
        >
          <WeeklyStudyPlanner
            todayDateKey={todayDateKey}
            defaultPhaseId={continueLearningTarget.phase.id}
            plannerTasks={store.plannerTasks}
            onAddTask={addPlannerTask}
            onUpdateTask={updatePlannerTask}
            onDeleteTask={deletePlannerTask}
          />
        </section>

        {/* 6. Learning Streaks & Activity History */}
        <section
          id="streaks-activity"
          aria-label="Learning streaks and activity history"
          className="scroll-mt-28 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-6">
            <LearningStreakCard
              todayDateKey={todayDateKey}
              activeStudyDateKeys={activeStudyDateKeys}
              minutesByDate={studyTimeMetrics.minutesByDate}
            />
          </div>
          <div className="lg:col-span-6">
            <ActivityHistory activityEvents={store.activityEvents} />
          </div>
        </section>

        {/* 7. Learning Analytics (Weekly Study Chart & Phase Distribution) */}
        <section
          id="analytics"
          aria-label="Weekly study analytics"
          className="scroll-mt-28"
        >
          <WeeklyStudyChart
            todayDateKey={todayDateKey}
            minutesByDate={studyTimeMetrics.minutesByDate}
            totalAllTimeMinutes={studyTimeMetrics.totalAllTimeMinutes}
            totalSessionsCount={studyTimeMetrics.totalSessionsCount}
            studyGoal={store.studyGoal}
            getPhaseProgress={getPhaseProgress}
          />
        </section>

        {/* 8. Phase-by-Phase Progress & Course Library Progress */}
        <section
          id="phases-courses"
          aria-label="Phase-by-phase and course progress"
          className="scroll-mt-28 space-y-6"
        >
          <PhaseProgressList
            currentPhaseId={continueLearningTarget.phase.id}
            getPhaseProgress={getPhaseProgress}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <ActiveCourses
                resourceStatuses={store.resourceStatuses}
                recentlyViewedResourceIds={store.recentlyViewedResourceIds}
                courseLibraryProgress={courseLibraryProgress}
                isResourceBookmarked={isResourceBookmarked}
                onSetResourceStatus={setResourceStatus}
                onToggleBookmark={toggleResourceBookmark}
                onRecordResourceViewed={recordResourceViewed}
              />
            </div>
            <div className="lg:col-span-6">
              <BookmarkedResources
                bookmarkedResourceIds={store.bookmarkedResourceIds}
                resourceStatuses={store.resourceStatuses}
                onToggleBookmark={toggleResourceBookmark}
                onSetResourceStatus={setResourceStatus}
                onRecordResourceViewed={recordResourceViewed}
              />
            </div>
          </div>
        </section>

        {/* 9. 14 Primary Project Milestones Overview */}
        <section
          id="milestones"
          aria-label="Project milestones overview"
          className="scroll-mt-28"
        >
          <MilestoneOverview
            isMilestoneCompleted={isMilestoneCompleted}
            onToggleMilestone={toggleMilestone}
          />
        </section>

        {/* 10. Deterministic Achievements & Factual Learning Insights */}
        <section
          id="achievements"
          aria-label="Learning achievements and insights"
          className="scroll-mt-28 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <AchievementList achievements={achievements} />
          </div>
          <div className="lg:col-span-5">
            <LearningInsights insights={learningInsights} />
          </div>
        </section>

        {/* 11. Data Safety, Portable JSON Backup & Scoped Reset Controls */}
        <section
          id="data-controls"
          aria-label="Data safety and backup controls"
          className="scroll-mt-28"
        >
          <DashboardDataControls
            isStoragePersistent={isStoragePersistent}
            onResetStudyGoal={resetStudyGoal}
            onClearStudySessions={clearStudySessions}
            onClearPlannerTasks={clearPlannerTasks}
            onResetDashboardPreferencesOnly={resetDashboardPreferencesOnly}
            onResetAllProgress={resetProgress}
            onExportBackupJson={exportProgressBackupJson}
            onImportBackupJson={importProgressBackupJson}
          />
        </section>
      </Container>
    </div>
  );
}
