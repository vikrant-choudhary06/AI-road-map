import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_COURSE_RESOURCES, getResourceBySlug } from "@/data/courses";
import { PageTransition } from "@/components/motion/page-transition";
import { CourseDetailView } from "@/components/courses";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_COURSE_RESOURCES.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found — Open AI Roadmap",
    };
  }

  return {
    title: `${resource.title} (${resource.provider}) — Free AI & LLM Courses`,
    description: resource.description,
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <PageTransition>
      <CourseDetailView resource={resource} />
    </PageTransition>
  );
}
