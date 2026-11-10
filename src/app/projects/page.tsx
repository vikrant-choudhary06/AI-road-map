import type { Metadata } from "next";
import { PageTransition } from "@/components/motion/page-transition";
import { ProjectsCatalogWorkspace } from "@/components/projects";

export const metadata: Metadata = {
  title: "Hands-On AI & LLM Engineering Projects",
  description:
    "Learn by building. Explore all 14 hands-on AI & LLM engineering projects from a pure-Python Matrix Operations Engine to training your own GPT language model from scratch.",
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <ProjectsCatalogWorkspace />
    </PageTransition>
  );
}
