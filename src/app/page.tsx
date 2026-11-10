import {
  AudienceSection,
  FeatureShowcaseSection,
  FinalCtaSection,
  FreeResourcesSection,
  HeroSection,
  HowItWorksSection,
  LearningJourneySection,
  ProgressPreviewSection,
  ProjectsPreviewSection,
} from "@/components/landing";
import { PageTransition } from "@/components/motion";

export default function LandingPage() {
  return (
    <PageTransition>
      <HeroSection />
      <LearningJourneySection />
      <HowItWorksSection />
      <FeatureShowcaseSection />
      <ProjectsPreviewSection />
      <FreeResourcesSection />
      <ProgressPreviewSection />
      <AudienceSection />
      <FinalCtaSection />
    </PageTransition>
  );
}
