import { ImageIcon } from 'lucide-react';

type AspectRatio = '1:1' | '4:3' | '16:9' | '3:4' | '2:3' | '21:9';

type Props = {
  /** Aspect ratio for the placeholder */
  aspectRatio?: AspectRatio;
  /** Label describing what image should go here */
  label?: string;
  /** Additional context for FAL.ai prompt generation */
  promptHint?: string;
  /** Custom className for the container */
  className?: string;
  /** Show the prompt hint in the UI (for development) */
  showPromptHint?: boolean;
};

const aspectRatioClasses: Record<AspectRatio, string> = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-video',
  '3:4': 'aspect-[3/4]',
  '2:3': 'aspect-[2/3]',
  '21:9': 'aspect-[21/9]',
};

/**
 * ImagePlaceholder Component
 * 
 * Use this component to mark locations where FAL.ai-generated images should appear.
 * Once FAL.ai is integrated, these can be replaced with actual generated images.
 * 
 * Recommended image placements:
 * - Hero sections: 16:9 or 21:9 for backgrounds, 4:3 for side illustrations
 * - Practice area cards: 1:1 or 4:3 for icons/illustrations
 * - About page: 3:4 or 2:3 for attorney portraits
 * - CTA sections: 21:9 for background textures
 * - Location blocks: 16:9 for courthouse/skyline imagery
 * 
 * Example prompts for Mango Law:
 * - "Professional courthouse exterior, Delaware Ohio, golden hour lighting, architectural photography"
 * - "Abstract legal scales of justice, mango and teal color palette, modern minimalist illustration"
 * - "Franklin County courthouse skyline, Ohio, professional photography, warm tones"
 * - "Criminal defense attorney consultation, professional office setting, warm lighting"
 */
export default function ImagePlaceholder({
  aspectRatio = '4:3',
  label = 'Image placeholder',
  promptHint,
  className = '',
  showPromptHint = false,
}: Props) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-brand-black/5 via-brand-teal/5 to-brand-mango/5',
        'border-2 border-dashed border-brand-black/10',
        aspectRatioClasses[aspectRatio],
        className,
      ].join(' ')}
      data-fal-placeholder
      data-fal-aspect={aspectRatio}
      data-fal-prompt={promptHint}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-pulse-soft bg-gradient-to-br from-brand-mango/5 to-brand-teal/5" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-black/5">
          <ImageIcon className="h-6 w-6 text-brand-black/30" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-brand-black/50">{label}</p>
          {showPromptHint && promptHint && (
            <p className="max-w-xs text-xs text-brand-black/30">
              Prompt: {promptHint}
            </p>
          )}
          <p className="text-xs text-brand-black/30">
            {aspectRatio} • FAL.ai ready
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Suggested image placements for Mango Law website:
 * 
 * 1. HERO SECTION (HomePage)
 *    - Aspect: 4:3 or 16:9
 *    - Prompt: "Modern criminal defense law office, Delaware Ohio, professional atmosphere, warm lighting, mango and teal accents"
 * 
 * 2. PRACTICE AREA CARDS
 *    - Aspect: 1:1
 *    - Prompts per area:
 *      - OVI/DUI: "Abstract breathalyzer and car keys, legal concept, mango gold color palette"
 *      - Criminal Defense: "Scales of justice, gavel, modern minimalist illustration"
 *      - Drug Crimes: "Legal documents and evidence, professional photography"
 *      - Sex Crimes: "Confidential legal consultation, discrete professional setting"
 *      - White Collar: "Corporate legal documents, professional office"
 *      - Protection Orders: "Legal shield concept, protective imagery"
 * 
 * 3. ABOUT PAGE - Attorney Portrait
 *    - Aspect: 3:4 or 2:3
 *    - Note: Use actual headshot from public/images/headshots/
 * 
 * 4. LOCATION SECTION
 *    - Aspect: 16:9
 *    - Prompt: "Delaware County Courthouse Ohio, exterior view, golden hour, professional architectural photography"
 * 
 * 5. CTA SECTION BACKGROUND
 *    - Aspect: 21:9
 *    - Prompt: "Abstract legal texture, mango and teal gradient, subtle courthouse silhouette, modern design"
 * 
 * 6. TESTIMONIALS SECTION
 *    - Aspect: 1:1 (small)
 *    - Prompt: "Abstract client testimonial icon, professional, trustworthy, mango accent"
 */
