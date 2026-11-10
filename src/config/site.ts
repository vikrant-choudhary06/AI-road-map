import type { NavItem } from "@/types";

export const SITE_CONFIG = {
  name: "Open AI Roadmap",
  shortName: "Open AI Roadmap",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://open-ai-roadmap.dev",
  tagline:
    "A complete, free learning roadmap that takes you from Python and mathematics to neural networks, Transformers, and training your own language models — step by step.",
  footerNote:
    "An independent, free learning roadmap for aspiring AI and LLM developers.",
  disclaimer:
    "Open AI Roadmap is an independent educational curriculum platform and is not officially affiliated with, endorsed by, or sponsored by Harvard University, MIT, Stanford University, Google, Hugging Face, or any referenced course providers.",
  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Roadmap",
      href: "/roadmap",
    },
    {
      label: "Courses",
      href: "/courses",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ] satisfies NavItem[],
  footerExternalResources: [
    {
      label: "Harvard CS50",
      href: "https://cs50.harvard.edu/python/",
    },
    {
      label: "Google ML Crash Course",
      href: "https://developers.google.com/machine-learning/crash-course",
    },
    {
      label: "Hugging Face",
      href: "https://huggingface.co/learn/llm-course/chapter1/1",
    },
    {
      label: "Stanford CS336",
      href: "https://cs336.stanford.edu/spring2025/",
    },
  ],
  upcomingStages: [
    { label: "9-Phase Interactive Roadmap", stage: "Stage 3" },
    { label: "Verified Free Courses Library", stage: "Stage 4" },
    { label: "Learning Dashboard & Milestones", stage: "Stage 5" },
    { label: "Practical LLM Projects", stage: "Stage 6" },
  ],
} as const;
