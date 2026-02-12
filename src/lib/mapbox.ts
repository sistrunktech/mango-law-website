const PROD_MAPBOX_PUBLIC_TOKEN =
  'pk.eyJ1Ijoic2lzdGVjaC10aW0iLCJhIjoiY21peGR3MHg5MDNkZDNkcHllaDlxdnY4aCJ9.ki5gsUR547d0i2rbMQvyog';

export function getMapboxPublicToken(): string | null {
  const token =
    process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN ||
    process.env.VITE_MAPBOX_PUBLIC_TOKEN ||
    PROD_MAPBOX_PUBLIC_TOKEN;

  if (!token) return null;
  const trimmed = token.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getMapboxStyleUrl(): string {
  return process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL || process.env.VITE_MAPBOX_STYLE_URL || 'mapbox://styles/mapbox/streets-v12';
}
