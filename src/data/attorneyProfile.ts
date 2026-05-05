import type { TrustMetadata } from './trust';

export type PublicRecordHighlight = {
  label: string;
  value: string;
  detail: string;
  sourceUrl?: string;
  sourceLabel?: string;
};

export type RepresentativeMatter = {
  title: string;
  court: string;
  summary: string;
  url: string;
};

export const attorneyProfile = {
  legalName: 'Dominic Mango',
  displayName: 'Dominic "Nick" Mango',
  preferredName: 'Nick Mango',
  alternateName: 'Nick Mango',
  jobTitle: 'Ohio Criminal Defense Attorney',
  registrationNumber: '0071238',
  practiceSinceYear: 1999,
  foundedFirmLabel: 'February 2009',
  sixthCircuitAdmissionLabel: 'November 10, 2014',
  lawSchool: 'The Ohio State University Moritz College of Law',
  siteDescription:
    'Ohio criminal defense and OVI attorney in Delaware, Ohio, serving Delaware and Franklin County clients with trial and appellate defense.',
  homeSubtitle: 'Nick Mango | Practicing Since 1999 | Former Prosecutor',
  aboutMetaDescription:
    'Ohio criminal defense attorney, Ohio Supreme Court registration no. 0071238. Practicing in Central Ohio since 1999 and founded Mango Law in Delaware in February 2009.',
  aboutIntro:
    'Nick (Dominic) Mango is an Ohio criminal defense attorney (Ohio Supreme Court registration no. 0071238) who has practiced criminal law in Central Ohio since 1999. He founded Mango Law in Delaware, Ohio in February 2009 after earlier prosecutorial work and years of private practice.',
  aboutExpanded:
    'His work emphasizes careful case analysis, motion practice, and courtroom advocacy in OVI/DUI and criminal cases. Published Ohio appellate decisions list him as counsel in OVI-related appeals involving BAC DataMaster breath-test issues and field sobriety testing disputes grounded in NHTSA-referenced standards.',
  aboutCourtAdmission:
    'He is also admitted to the United States Court of Appeals for the Sixth Circuit, with a publicly listed admission date of November 10, 2014.',
  articleBio:
    'Dominic Mango is an Ohio criminal defense attorney (Ohio Supreme Court registration no. 0071238) who has practiced in Central Ohio since 1999. He founded Mango Law in February 2009 and handles trial and appellate OVI/DUI and criminal defense matters, including motions challenging stops, field sobriety testing, and breath-test evidence where the facts support them.',
  servicePageBio:
    'Former prosecutor practicing criminal law in Central Ohio since 1999.',
} as const;

export const attorneyPublicRecordHighlights: PublicRecordHighlight[] = [
  {
    label: 'Ohio attorney registration',
    value: `No. ${attorneyProfile.registrationNumber}`,
    detail:
      'Official Ohio Supreme Court filings identify Dominic L. Mango with this registration number.',
    sourceUrl:
      'https://www.supremecourt.ohio.gov/pdf_viewer/pdf_viewer.aspx?pdf=886520.pdf&source=DL_Clerk&subdirectory=2020-0701%5CDocketItems',
    sourceLabel: 'Ohio Supreme Court filing',
  },
  {
    label: 'Practicing in Central Ohio since',
    value: String(attorneyProfile.practiceSinceYear),
    detail:
      'The firm timeline and public biographical sources place the start of his Ohio criminal-law practice in 1999.',
  },
  {
    label: 'Mango Law founded',
    value: attorneyProfile.foundedFirmLabel,
    detail:
      'Mango Law LLC has operated from Delaware, Ohio since 2009, following earlier prosecutorial and private-practice work.',
  },
  {
    label: 'Sixth Circuit bar admission',
    value: attorneyProfile.sixthCircuitAdmissionLabel,
    detail:
      'The Sixth Circuit active attorney status report lists Dominic Leo Mango with an ECF account and this admission date.',
    sourceUrl: 'https://www.opn.ca6.uscourts.gov/active_atty/rptAccountStatus_M.pdf',
    sourceLabel: 'Sixth Circuit active attorney report',
  },
];

export const attorneyRepresentativeMatters: RepresentativeMatter[] = [
  {
    title: 'State v. Hartman (2007-Ohio-3051)',
    court: 'Ohio Fifth District',
    summary:
      'Published OVI appeal reflecting BAC DataMaster suppression litigation.',
    url: 'https://law.justia.com/cases/ohio/fifth-district-court-of-appeals/2007/2007-ohio-3051.html',
  },
  {
    title: 'State v. Auld (2007-Ohio-3508)',
    court: 'Ohio Fifth District',
    summary:
      'Published OVI appeal tied to field sobriety testing issues and NHTSA-based suppression arguments.',
    url: 'https://law.justia.com/cases/ohio/fifth-district-court-of-appeals/2007/2007-ohio-3508.html',
  },
  {
    title: 'State v. Lange (2019-Ohio-4687)',
    court: 'Ohio Fifth District',
    summary:
      'Published OVI appeal naming Dominic L. Mango as counsel in a Delaware County case involving breath-test suppression issues.',
    url: 'https://www.supremecourt.ohio.gov/rod/docs/PDF/5/2019/2019-Ohio-4687.pdf',
  },
  {
    title: 'State v. Myers (2021-Ohio-4087)',
    court: 'Ohio Fifth District',
    summary:
      'Published OVI-related appellate matter showing continued OVI and criminal defense work in the appellate record.',
    url: 'https://law.justia.com/cases/ohio/fifth-district-court-of-appeals/2021/21ca060027.html',
  },
];

export const attorneyTrustMetadata: TrustMetadata = {
  lastVerified: '2026-04-04',
  sources: [
    {
      label: 'Ohio Supreme Court filing showing Dominic L. Mango (#0071238)',
      url: 'https://www.supremecourt.ohio.gov/pdf_viewer/pdf_viewer.aspx?pdf=886520.pdf&source=DL_Clerk&subdirectory=2020-0701%5CDocketItems',
      type: 'primary',
    },
    {
      label: 'Sixth Circuit active attorney report',
      url: 'https://www.opn.ca6.uscourts.gov/active_atty/rptAccountStatus_M.pdf',
      type: 'primary',
    },
    {
      label: 'State v. Auld (2007-Ohio-3508)',
      url: 'https://law.justia.com/cases/ohio/fifth-district-court-of-appeals/2007/2007-ohio-3508.html',
      type: 'secondary',
    },
    {
      label: 'State v. Lange (2019-Ohio-4687)',
      url: 'https://www.supremecourt.ohio.gov/rod/docs/PDF/5/2019/2019-Ohio-4687.pdf',
      type: 'primary',
    },
  ],
};
