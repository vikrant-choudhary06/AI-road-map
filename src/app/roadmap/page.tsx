import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/page-transition";
import { RoadmapWorkspace } from "@/components/roadmap";

export const metadata: Metadata = {
  title: "Complete Interactive AI & LLM Learning Roadmap (Phase 0 – Phase 8)",
  description:
    "Your complete 9-phase, 78-week interactive curriculum into AI and LLM development—from Python and mathematics to Transformers, pretraining, alignment, and inference systems.",
};

export default function RoadmapPage() {
  return (
    <PageTransition>
      <RoadmapWorkspace />
    </PageTransition>
  );
}
