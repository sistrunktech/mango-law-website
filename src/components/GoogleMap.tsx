import { ExternalLink } from 'lucide-react';

interface GoogleMapProps {
  businessName?: string;
  rating?: number;
  reviewCount?: number;
  placeId?: string;
  height?: number;
}

export default function GoogleMap({
  businessName = "Mango Law LLC",
  rating = 4.9,
  reviewCount = 45,
  placeId = "0x0:0x5c800d103881fc5c",
  height = 350,
}: GoogleMapProps) {
  const mapUrl = `https://www.google.com/maps/place/Mango+Law+LLC/@40.2983,-83.0683,17z/data=!4m2!3m1!1s${placeId}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.5!2d-83.0683!3d40.2983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${placeId}!2s${encodeURIComponent(businessName)}!5e0!3m2!1sen!2sus!4v1733544000000!5m2!1sen!2sus`;

  return (
    <div className="space-y-3">
      {/* Rating Display */}
      {rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-brand-black">
            {rating} <span className="text-brand-black/60">({reviewCount} reviews)</span>
          </span>
        </div>
      )}

      {/* Map Embed */}
      <div className="relative overflow-hidden rounded-xl shadow-md">
        <iframe
          src={embedUrl}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mango Law LLC office location in Delaware, Ohio"
          className="rounded-xl"
        />
      </div>

      {/* View on Google Maps Link */}
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-goldText hover:text-brand-goldText/80 transition-colors"
      >
        <ExternalLink className="h-4 w-4" />
        View on Google Maps
      </a>
    </div>
  );
}
