export type TrustSourceType = 'primary' | 'secondary' | 'guide';

export type TrustSource = {
  label: string;
  url: string;
  type?: TrustSourceType;
};

export type TrustMetadata = {
  lastVerified: string;
  sources: TrustSource[];
};

