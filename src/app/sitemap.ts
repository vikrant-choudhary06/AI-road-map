import type { MetadataRoute } from "next";
import { ALL_COURSE_RESOURCES } from "@/data/courses";
import { ALL_CURRICULUM_PROJECTS } from "@/data/projects";
import { SITE_CONFIG } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = ALL_COURSE_RESOURCES.map(
    (course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const projectRoutes: MetadataRoute.Sitemap = ALL_CURRICULUM_PROJECTS.map(
    (project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  return [...coreRoutes, ...courseRoutes, ...projectRoutes];
}
