import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/page-transition";
import { CoursesWorkspace } from "@/components/courses";

export const metadata: Metadata = {
  title: "Free Courses & Learning Resources Library — AI Roadmap",
  description:
    "Explore carefully curated free courses, tutorials, lectures, documentation, and research papers from Harvard, MIT, Stanford, Google, Hugging Face, and Andrej Karpathy—organized around your 9-phase AI & LLM roadmap.",
};

export default function CoursesPage() {
  return (
    <PageTransition>
      <CoursesWorkspace />
    </PageTransition>
  );
}
