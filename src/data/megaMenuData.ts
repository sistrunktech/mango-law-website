import { Shield, Scale, Pill, Users, Briefcase, FileWarning, HeartPulse, MapPin } from 'lucide-react';

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
        href: '/locations/delaware-oh',
        description: 'Primary office location',
        icon: MapPin,
      },
      {
        title: 'Franklin County',
        href: '/locations/franklin-county-oh',
        description: 'Serving Columbus metro',
        icon: MapPin,
      },
    ],
  },
};
