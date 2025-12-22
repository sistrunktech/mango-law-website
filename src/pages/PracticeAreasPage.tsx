import PracticeAreaCardGrid from '../components/PracticeAreaCardGrid';
import PageHero from '../components/PageHero';

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Focused on criminal defense and OVI in Delaware, Ohio."
        description="Scannable summaries for each area with quick paths to learn more or schedule a consultation."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
        phoneCtaId="practice_areas_hero_call_office"
      />
      <PracticeAreaCardGrid />
    </>
  );
}
