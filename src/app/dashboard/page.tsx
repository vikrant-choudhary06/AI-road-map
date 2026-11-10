import type { Metadata } from "next";
import { DashboardWorkspace } from "@/components/dashboard";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Learning Dashboard & Study Workspace | Open AI Roadmap",
  description:
    "Track your progress across all nine AI & LLM roadmap phases, manage saved courses, run timed study sessions, plan your weekly schedule, and track 14 implementation milestones.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <PageTransition>
      <DashboardWorkspace />
    </PageTransition>
  );
}
