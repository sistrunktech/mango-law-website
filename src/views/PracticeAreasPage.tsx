import PageHero from '../components/PageHero';
import PracticeAreaCardGrid from '../components/PracticeAreaCardGrid';
import { SEO } from '../lib/seo';

export default function PracticeAreasPage() {
  return (
    <>
      <SEO
        title="Criminal Defense Practice Areas | Mango Law LLC"
        description="Focused on criminal defense and OVI/DUI in Delaware, Ohio. Explore our practice areas and schedule a free consultation."
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Practice Areas', item: '/practice-areas' },
        ]}
      />
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
