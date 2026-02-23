import PageHero from '../components/PageHero';
import PracticeAreaCardGrid from '../components/PracticeAreaCardGrid';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import { SEO } from '../lib/seo';

export default function PracticeAreasPage() {
  return (
    <>
      <SEO
        title="Practice Areas | Criminal Defense and OVI | Mango Law"
        description="Explore Mango Law practice areas for OVI, criminal defense, drug charges, and related Ohio legal matters."
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
      <RelatedDefenseGuides
        title="High-intent Ohio defense pages"
        description="These focused pages support specific OVI, domestic, protection-order, and drug-intent searches."
        links={[
          {
            title: 'First offense OVI in Ohio',
            description: 'Immediate priorities and timeline control after a first OVI arrest.',
            href: '/first-offense-ovi-ohio',
          },
          {
            title: 'Felony OVI lawyer Ohio',
            description: 'Defense guidance for felony-level OVI risk and litigation posture.',
            href: '/felony-ovi-lawyer-ohio',
          },
          {
            title: 'OVI test refusal defense',
            description: 'Refusal-focused strategy across administrative and criminal tracks.',
            href: '/ovi-test-refusal-lawyer-ohio',
          },
          {
            title: 'ALS license suspension defense',
            description: 'Administrative suspension process and early defensive planning.',
            href: '/als-license-suspension-ohio',
          },
          {
            title: 'Motion to suppress OVI evidence',
            description: 'Suppression-focused approach to stop, detention, and testing issues.',
            href: '/motion-to-suppress-ovi-ohio',
          },
          {
            title: 'Domestic violence first-offense defense',
            description: 'Case strategy for first-offense domestic allegations in Ohio.',
            href: '/domestic-violence-first-offense-ohio-defense',
          },
          {
            title: 'Civil protection order defense',
            description: 'Hearing preparation and response strategy for CPO proceedings.',
            href: '/civil-protection-order-defense-ohio',
          },
          {
            title: 'Drug possession vs trafficking defense',
            description: 'Charge distinction analysis and evidence-based drug-defense planning.',
            href: '/drug-possession-vs-trafficking-ohio-defense',
          },
        ]}
      />
    </>
  );
}
