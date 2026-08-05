export type CheckpointRelevanceInput = {
  title?: string | null;
  description?: string | null;
  rawText?: string | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
  locationText?: string | null;
  locationAddress?: string | null;
  locationCity?: string | null;
  locationCounty?: string | null;
};

const CHECKPOINT_INTENT_PATTERNS = [
  /\b(?:sobriety|ovi|dui|impaired[-\s]driving|traffic safety)\s+checkpoints?\b/i,
  /\bcheckpoints?\b[\s\S]{0,80}\b(?:sobriety|ovi|dui|impaired[-\s]driving)\b/i,
] as const;

const OHIO_COUNTY_NAMES = new Set<string>([
  'adams', 'allen', 'ashland', 'ashtabula', 'athens', 'auglaize', 'belmont',
  'brown', 'butler', 'carroll', 'champaign', 'clark', 'clermont', 'clinton',
  'columbiana', 'coshocton', 'crawford', 'cuyahoga', 'darke', 'defiance',
  'delaware', 'erie', 'fairfield', 'fayette', 'franklin', 'fulton', 'gallia',
  'geauga', 'greene', 'guernsey', 'hamilton', 'hancock', 'hardin', 'harrison',
  'henry', 'highland', 'hocking', 'holmes', 'huron', 'jackson', 'jefferson',
  'knox', 'lake', 'lawrence', 'licking', 'logan', 'lorain', 'lucas', 'madison',
  'mahoning', 'marion', 'medina', 'meigs', 'mercer', 'miami', 'monroe',
  'montgomery', 'morgan', 'morrow', 'muskingum', 'noble', 'ottawa', 'paulding',
  'perry', 'pickaway', 'pike', 'portage', 'preble', 'putnam', 'richland',
  'ross', 'sandusky', 'scioto', 'seneca', 'shelby', 'stark', 'summit',
  'trumbull', 'tuscarawas', 'union', 'van wert', 'vinton', 'warren',
  'washington', 'wayne', 'williams', 'wood', 'wyandot',
]);

const OHIO_COUNTY_SIGNAL_PATTERN = new RegExp(
  `\\b(?:${[...OHIO_COUNTY_NAMES].join('|')}) county\\b`,
  'i',
);

const OHIO_SIGNAL_PATTERNS = [
  /\bohio\b/i,
  /\bovi\b/i,
  /\boshp\b/i,
  /\bohio (?:state )?highway patrol\b/i,
  /\b(?:cleveland|columbus|cincinnati|dayton|akron|toledo|youngstown)\b/i,
  OHIO_COUNTY_SIGNAL_PATTERN,
] as const;

const PUBLIC_NOISE_PATTERNS = [
  /\b(?:tsa|precheck|global entry)\b/i,
  /\b(?:airport|aviation|border|security)\s+checkpoints?\b/i,
  /\bcheckpoints?\b[\s\S]{0,40}\b(?:airport|aviation|border|security)\b/i,
  /\b(?:free|discounted)\s+(?:lyft|uber|rides?)\b/i,
  /\b(?:lyft|uber)\b[\s\S]{0,30}\b(?:free|discounted)\b/i,
  /\bdesignated driver\b/i,
  /\b(?:road|traffic) safety (?:campaign|message|tips?)\b/i,
  /\b(?:stopdrinking|sobriety journey|addiction recovery|sober living|aa meeting|rehab|alcoholic)\b/i,
  /\bcheckpoint inhibitor\b/i,
  /\bcorrespondents'? dinner\b/i,
  /\b(?:pennsylvania|california|chula vista|sacramento|stockton|barstow|somerset)\b/i,
  /\b(?:psp|pa state police)\b/i,
] as const;

const NON_DIRECT_SOURCE_PATTERNS = [
  /(?:^|\.)ovicheckpoint\.com$/i,
  /(?:^|\.)duiblock\.com$/i,
  /(?:^|\.)reddit\.com$/i,
  /(?:^|\.)facebook\.com$/i,
  /(?:^|\.)nextdoor\.com$/i,
  /(?:^|\.)(?:x|twitter)\.com$/i,
  /(?:^|\.)news\.google\.com$/i,
] as const;

const NON_DIRECT_SOURCE_NAME_PATTERNS = [
  /\bovicheckpoint(?:\.com)?\b/i,
  /\bduiblock(?:\.com)?\b/i,
  /\breddit\b/i,
  /\bfacebook\b/i,
  /\bnextdoor\b/i,
  /\b(?:twitter|google news)\b/i,
] as const;

function combinedText(input: CheckpointRelevanceInput): string {
  return [
    input.title,
    input.description,
    input.rawText,
    input.sourceName,
    input.sourceUrl,
    input.locationText,
    input.locationAddress,
    input.locationCity,
    input.locationCounty,
  ]
    .filter(Boolean)
    .join('\n');
}

export function hasOhioOviCheckpointIntent(input: CheckpointRelevanceInput): boolean {
  const text = combinedText(input);
  if (!text || PUBLIC_NOISE_PATTERNS.some((pattern) => pattern.test(text))) return false;

  const hasCheckpointIntent = CHECKPOINT_INTENT_PATTERNS.some((pattern) => pattern.test(text));
  if (!hasCheckpointIntent) return false;

  const normalizedCounty = input.locationCounty
    ?.trim()
    .toLowerCase()
    .replace(/\s+county$/, '');
  const hasKnownOhioCounty = Boolean(
    normalizedCounty && OHIO_COUNTY_NAMES.has(normalizedCounty),
  );

  return hasKnownOhioCounty || OHIO_SIGNAL_PATTERNS.some((pattern) => pattern.test(text));
}

export function isDirectCheckpointSource(
  sourceName: string | null | undefined,
  sourceUrl: string | null | undefined,
): boolean {
  if (!sourceUrl?.trim()) return false;

  let hostname = '';
  try {
    hostname = new URL(sourceUrl).hostname.replace(/^www\./, '');
  } catch {
    return false;
  }

  return (
    !NON_DIRECT_SOURCE_PATTERNS.some((pattern) => pattern.test(hostname)) &&
    !NON_DIRECT_SOURCE_NAME_PATTERNS.some((pattern) => pattern.test(sourceName || ''))
  );
}
