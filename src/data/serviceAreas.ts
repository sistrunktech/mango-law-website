export type LocationType = 'city' | 'township' | 'county' | 'region';

export interface ServiceArea {
  id: string;
  name: string;
  type: LocationType;
  county?: string;
  description: string;
  tier: 1 | 2 | 3;
  slug: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    id: 'delaware',
    name: 'Delaware',
    type: 'city',
    county: 'Delaware County',
    description: 'Home to our primary office, providing comprehensive criminal defense representation in Delaware Municipal Court and Delaware County Common Pleas Court.',
    tier: 1,
    slug: 'delaware',
  },
  {
    id: 'columbus',
    name: 'Columbus',
    type: 'city',
    county: 'Franklin County',
    description: 'Serving clients throughout Ohio\'s capital city with experienced representation in Franklin County courts and Columbus Municipal Court.',
    tier: 1,
    slug: 'columbus',
  },
  {
    id: 'dublin',
    name: 'Dublin',
    type: 'city',
    county: 'Franklin County',
    description: 'Defending clients in Dublin Municipal Court and surrounding Franklin County courts with local knowledge and courtroom experience.',
    tier: 1,
    slug: 'dublin',
  },
  {
    id: 'westerville',
    name: 'Westerville',
    type: 'city',
    county: 'Franklin County',
    description: 'Providing criminal defense services to Westerville residents with representation in both Delaware and Franklin County courts.',
    tier: 1,
    slug: 'westerville',
  },
  {
    id: 'marysville',
    name: 'Marysville',
    type: 'city',
    county: 'Union County',
    description: 'Representing clients in Marysville and Union County with experienced criminal defense advocacy.',
    tier: 2,
    slug: 'marysville',
  },
  {
    id: 'gahanna',
    name: 'Gahanna',
    type: 'city',
    county: 'Franklin County',
    description: 'Defending Gahanna residents in criminal matters throughout Franklin County courts.',
    tier: 2,
    slug: 'gahanna',
  },
  {
    id: 'grove-city',
    name: 'Grove City',
    type: 'city',
    county: 'Franklin County',
    description: 'Providing criminal defense representation to Grove City clients in Franklin County courts.',
    tier: 2,
    slug: 'grove-city',
  },
  {
    id: 'reynoldsburg',
    name: 'Reynoldsburg',
    type: 'city',
    county: 'Franklin County',
    description: 'Serving Reynoldsburg with comprehensive criminal defense services in Franklin County.',
    tier: 2,
    slug: 'reynoldsburg',
  },
  {
    id: 'upper-arlington',
    name: 'Upper Arlington',
    type: 'city',
    county: 'Franklin County',
    description: 'Representing Upper Arlington clients with discreet, effective criminal defense advocacy.',
    tier: 2,
    slug: 'upper-arlington',
  },
  {
    id: 'hilliard',
    name: 'Hilliard',
    type: 'city',
    county: 'Franklin County',
    description: 'Defending clients in Hilliard and throughout Franklin County with experienced representation.',
    tier: 2,
    slug: 'hilliard',
  },
  {
    id: 'jackson-township',
    name: 'Jackson Township',
    type: 'township',
    county: 'Delaware County',
    description: 'Serving Jackson Township residents with criminal defense representation in Delaware County courts.',
    tier: 3,
    slug: 'jackson-township',
  },
  {
    id: 'norwich-township',
    name: 'Norwich Township',
    type: 'township',
    county: 'Franklin County',
    description: 'Providing criminal defense services to Norwich Township residents in Franklin County.',
    tier: 3,
    slug: 'norwich-township',
  },
  {
    id: 'truro-township',
    name: 'Truro Township',
    type: 'township',
    county: 'Franklin County',
    description: 'Representing Truro Township clients in criminal matters throughout Franklin County.',
    tier: 3,
    slug: 'truro-township',
  },
  {
    id: 'madison-township',
    name: 'Madison Township',
    type: 'township',
    county: 'Franklin County',
    description: 'Defending Madison Township residents with experienced criminal defense representation.',
    tier: 3,
    slug: 'madison-township',
  },
  {
    id: 'delaware-county',
    name: 'Delaware County',
    type: 'county',
    description: 'Comprehensive criminal defense representation throughout Delaware County courts, including Delaware Municipal Court, Delaware County Common Pleas Court, and all township jurisdictions.',
    tier: 1,
    slug: 'delaware-county',
  },
  {
    id: 'franklin-county',
    name: 'Franklin County',
    type: 'county',
    description: 'Experienced criminal defense advocacy across Franklin County, including Columbus Municipal Court, Franklin County Common Pleas Court, and all municipal and township courts within the county.',
    tier: 1,
    slug: 'franklin-county',
  },
];

export const getLocationsByTier = (tier: 1 | 2 | 3) => {
  return serviceAreas.filter((area) => area.tier === tier);
};

export const getLocationsByType = (type: LocationType) => {
  return serviceAreas.filter((area) => area.type === type);
};

export const getLocationBySlug = (slug: string) => {
  return serviceAreas.find((area) => area.slug === slug);
};

export const majorCities = serviceAreas.filter(
  (area) => area.type === 'city' && area.tier === 1
);

export const surroundingCities = serviceAreas.filter(
  (area) => area.type === 'city' && area.tier === 2
);

export const townships = serviceAreas.filter((area) => area.type === 'township');

export const counties = serviceAreas.filter((area) => area.type === 'county');
