import { Shield, Scale, Pill, Users, Briefcase, FileWarning, HeartPulse, MapPin, MapPinned, BookOpen, MessageSquare } from 'lucide-react';

export const megaMenuSections = {
  practiceAreas: {
    title: 'Practice Areas',
    items: [
      {
        title: 'Criminal Defense',
        href: '/criminal-defense-delaware-oh',
        description: 'Felony and misdemeanor charges',
        icon: Shield,
      },
      {
        title: 'OVI / DUI Defense',
        href: '/ovi-dui-defense-delaware-oh',
        description: 'High-test, felony OVI, underage DUI',
        icon: Scale,
      },
      {
        title: 'Drug Crimes',
        href: '/drug-crime-lawyer-delaware-oh',
        description: 'Possession, trafficking, paraphernalia',
        icon: Pill,
      },
      {
        title: 'Sex Crimes',
        href: '/sex-crime-defense-lawyer-delaware-oh',
        description: 'Discreet, aggressive defense',
        icon: Users,
      },
      {
        title: 'White Collar Crimes',
        href: '/white-collar-crimes-attorney-delaware-oh',
        description: 'Fraud, embezzlement, securities',
        icon: Briefcase,
      },
      {
        title: 'Protection Orders',
        href: '/protection-order-lawyer-delaware-oh',
        description: 'Civil protection order defense',
        icon: FileWarning,
      },
      {
        title: 'Personal Injury',
        href: '/personal-injury-lawyer-delaware-oh',
        description: 'Limited-scope PI representation',
        icon: HeartPulse,
      },
    ],
  },
  locations: {
    title: 'Service Locations',
    items: [
      {
        title: 'Delaware, OH',
        href: '/locations#delaware',
        description: 'Primary office location',
        icon: MapPin,
      },
      {
        title: 'Columbus, OH',
        href: '/locations#columbus',
        description: 'Franklin County seat',
        icon: MapPin,
      },
      {
        title: 'Dublin, OH',
        href: '/locations#dublin',
        description: 'Northwest Columbus suburbs',
        icon: MapPin,
      },
      {
        title: 'Westerville, OH',
        href: '/locations#westerville',
        description: 'Northeast Columbus area',
        icon: MapPin,
      },
      {
        title: 'Delaware County',
        href: '/locations#delaware-county',
        description: 'County-wide representation',
        icon: MapPin,
      },
      {
        title: 'Franklin County',
        href: '/locations#franklin-county',
        description: 'Columbus metro area',
        icon: MapPin,
      },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      {
        title: 'DUI Checkpoint Map',
        href: '/resources/dui-checkpoints',
        description: 'Real-time Ohio DUI checkpoint locations',
        icon: MapPinned,
      },
      {
        title: 'Legal Blog',
        href: '/blog',
        description: 'Insights and updates on Ohio law',
        icon: BookOpen,
      },
      {
        title: 'Client Reviews',
        href: '/reviews',
        description: 'What our clients say about us',
        icon: MessageSquare,
      },
      {
        title: 'Legal Glossary',
        href: '/glossary',
        description: 'Common legal terms explained',
        icon: BookOpen,
      },
    ],
  },
};
