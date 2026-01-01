import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { SEO } from '../lib/seo';

export default function BrandGuidelinesPage() {
  return (
    <>
      <SEO title="Brand Guidelines | Mango Law LLC" noindex={true} />
      <PageHero
        eyebrow="Brand Guidelines"
        title="Mango Law Brand System"
        description="Typography, colors, logos, and design patterns for consistent brand communication."
        variant="light"
        ctaLabel="Contact Us"
        ctaHref="/contact"
        phoneCtaId="brand_guidelines_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container max-w-6xl">
          <div className="prose prose-lg max-w-none">
            <div className="mb-16">
              <h2 className="font-display text-display-md font-bold text-brand-black mb-6">Typography System</h2>
              <p className="text-lg text-brand-black/70 mb-8">
                Our typography system uses two carefully selected typefaces to create hierarchy, authority, and readability.
              </p>

              <div className="grid gap-8 md:grid-cols-2 mb-12">
                <div className="card bg-brand-offWhite p-8">
                  <h3 className="font-display text-3xl font-bold text-brand-black mb-4">Lora</h3>
                  <p className="text-brand-black/70 mb-4">Display font for headlines and major headings</p>
                  <div className="space-y-2">
                    <div className="font-display text-4xl font-bold text-brand-black">The quick brown</div>
                    <div className="font-display text-3xl font-semibold text-brand-black/80">fox jumps over</div>
                    <div className="font-display text-2xl font-medium text-brand-black/60">the lazy dog</div>
                  </div>
                  <div className="mt-6 text-sm text-brand-black/60">
                    Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
                  </div>
                </div>

                <div className="card bg-brand-offWhite p-8">
                  <h3 className="font-sans text-3xl font-bold text-brand-black mb-4">Inter</h3>
                  <p className="text-brand-black/70 mb-4">Primary font for body text, navigation, and UI elements</p>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-brand-black">The quick brown</div>
                    <div className="text-3xl font-semibold text-brand-black/80">fox jumps over</div>
                    <div className="text-2xl font-medium text-brand-black/60">the lazy dog</div>
                  </div>
                  <div className="mt-6 text-sm text-brand-black/60">
                    Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
                  </div>
                </div>
              </div>

              <div className="card bg-brand-forest/5 p-6 border-l-4 border-brand-forest">
                <h4 className="font-bold text-brand-black mb-2">Usage Guidelines</h4>
                <ul className="space-y-2 text-brand-black/70">
                  <li><strong>Lora:</strong> Use for h1, h2, and prominent h3 headings to add authority and elegance</li>
                  <li><strong>Inter:</strong> Use for all body text, navigation, buttons, forms, and UI components</li>
                  <li><strong>Hierarchy:</strong> Maintain consistent sizing: Display (48-72px), Heading (32-40px), Body (16-20px)</li>
                  <li><strong>Line Height:</strong> 150% for body text, 120% for headings</li>
                </ul>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-display text-display-md font-bold text-brand-black mb-6">Color System</h2>
              <p className="text-lg text-brand-black/70 mb-8">
                Our color palette reflects professionalism, authority, and warmth through forest greens and mango gold accents.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Primary Colors</h3>
                  <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-black shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Black</div>
                        <div className="text-brand-black/60">#0A0A0A</div>
                        <div className="text-xs text-brand-black/60">brand-black</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-charcoal shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Charcoal</div>
                        <div className="text-brand-black/60">#0F0F0F</div>
                        <div className="text-xs text-brand-black/60">brand-charcoal</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-leaf shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Forest Green</div>
                        <div className="text-brand-black/60">#2F5F4F</div>
                        <div className="text-xs text-brand-black/60">brand-leaf</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-mango shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Mango Gold</div>
                        <div className="text-brand-black/60">#E8A33C</div>
                        <div className="text-xs text-brand-black/60">brand-mango</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Forest Green Variants</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-leafLight shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Light Forest</div>
                        <div className="text-brand-black/60">#3D7360</div>
                        <div className="text-xs text-brand-black/60">brand-leafLight</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-leafDark shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Dark Forest</div>
                        <div className="text-brand-black/60">#1F3F2F</div>
                        <div className="text-xs text-brand-black/60">brand-leafDark</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-forest shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Deep Forest</div>
                        <div className="text-brand-black/60">#1B4332</div>
                        <div className="text-xs text-brand-black/60">brand-forest</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Mango Gold Variants</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-mangoLight shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Light Mango</div>
                        <div className="text-brand-black/60">#F4B95A</div>
                        <div className="text-xs text-brand-black/60">brand-mangoLight</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-mangoDark shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Deep Mango</div>
                        <div className="text-brand-black/60">#C4872E</div>
                        <div className="text-xs text-brand-black/60">brand-mangoDark</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-gold shadow-soft"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Gold</div>
                        <div className="text-brand-black/60">#D4A84B</div>
                        <div className="text-xs text-brand-black/60">brand-gold</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Neutral Colors</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-offWhite shadow-soft border border-brand-black/10"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Off-White</div>
                        <div className="text-brand-black/60">#FAF9F7</div>
                        <div className="text-xs text-brand-black/60">brand-offWhite</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-24 rounded-lg bg-brand-cream shadow-soft border border-brand-black/10"></div>
                      <div className="text-sm">
                        <div className="font-bold text-brand-black">Cream</div>
                        <div className="text-brand-black/60">#FFF8E7</div>
                        <div className="text-xs text-brand-black/60">brand-cream</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-brand-forest/5 p-6 border-l-4 border-brand-forest">
                  <h4 className="font-bold text-brand-black mb-2">Color Usage Guidelines</h4>
                  <ul className="space-y-2 text-brand-black/70">
                    <li><strong>Black (#0A0A0A):</strong> Primary text, dark backgrounds</li>
                    <li><strong>Forest Green (#2F5F4F):</strong> Professional primary color for headers, key elements, authority</li>
                    <li><strong>Mango Gold (#E8A33C):</strong> CTAs, accents, energy, warmth - use strategically</li>
                    <li><strong>Deep Forest (#1B4332):</strong> Gradients, depth, dark sections</li>
                    <li><strong>Off-White (#FAF9F7):</strong> Clean backgrounds, light sections</li>
                    <li><strong>Accessibility:</strong> All color combinations meet WCAG AA contrast standards (4.5:1 minimum)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-display text-display-md font-bold text-brand-black mb-6">Logo Usage</h2>
              <p className="text-lg text-brand-black/70 mb-8">
                The Mango Law logo represents our brand identity. Proper usage ensures consistency and professionalism.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Logo Variants</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="card bg-brand-offWhite p-8 text-center">
                      <img
                        src="/images/brand/mango-logo-tagline-fullcolor.svg"
                        alt="Mango Law Horizontal Logo"
                        className="w-full max-w-xs mx-auto mb-4"
                      />
                      <div className="text-sm font-bold text-brand-black">Horizontal Lockup</div>
                      <div className="text-xs text-brand-black/60">Primary logo for website headers</div>
                    </div>

                    <div className="card bg-brand-offWhite p-8 text-center">
                      <img
                        src="/images/brand/mango-logo-vertical-fullcolor.svg"
                        alt="Mango Law Vertical Logo"
                        className="w-full max-w-[200px] mx-auto mb-4"
                      />
                      <div className="text-sm font-bold text-brand-black">Vertical Lockup</div>
                      <div className="text-xs text-brand-black/60">For square formats and social media</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Color Variations</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="card bg-white p-6 text-center border-2 border-brand-black/10">
                      <img
                        src="/images/brand/mango-icon-fullcolor.svg"
                        alt="Full Color Icon"
                        className="w-24 h-24 mx-auto mb-3"
                      />
                      <div className="text-sm font-bold text-brand-black">Full Color</div>
                      <div className="text-xs text-brand-black/60">Primary usage</div>
                    </div>

                    <div className="card bg-brand-forest p-6 text-center">
                      <img
                        src="/images/brand/icon-white.svg"
                        alt="White Icon"
                        className="w-24 h-24 mx-auto mb-3"
                      />
                      <div className="text-sm font-bold text-white">White</div>
                      <div className="text-xs text-white/80">Dark backgrounds</div>
                    </div>

                    <div className="card bg-brand-offWhite p-6 text-center">
                      <img
                        src="/images/brand/icon-black.svg"
                        alt="Black Icon"
                        className="w-24 h-24 mx-auto mb-3"
                      />
                      <div className="text-sm font-bold text-brand-black">Black</div>
                      <div className="text-xs text-brand-black/60">Print, monochrome</div>
                    </div>
                  </div>
                </div>

                <div className="card bg-brand-forest/5 p-6 border-l-4 border-brand-forest">
                  <h4 className="font-bold text-brand-black mb-2">Logo Guidelines</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-brand-leaf mb-2">✓ Do</h5>
                      <ul className="space-y-1 text-sm text-brand-black/70">
                        <li>• Use horizontal lockup for website headers</li>
                        <li>• Use vertical lockup for square formats</li>
                        <li>• Maintain minimum clear space (equal to icon height)</li>
                        <li>• Use white version on dark backgrounds</li>
                        <li>• Download from Supabase asset library</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">✗ Don't</h5>
                      <ul className="space-y-1 text-sm text-brand-black/70">
                        <li>• Don't stretch or distort the logo</li>
                        <li>• Don't change logo colors arbitrarily</li>
                        <li>• Don't add effects, shadows, or outlines</li>
                        <li>• Don't place on busy backgrounds</li>
                        <li>• Don't use low-resolution versions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card bg-amber-50 p-6 border-l-4 border-amber-600">
                  <h4 className="font-bold text-brand-black mb-2">Professional Logo Updates</h4>
                  <p className="text-brand-black/70 mb-3">
                    For logo revisions or new variants, work with a professional designer (Penji) to create true vector SVG files.
                    Upload finalized logos to Supabase for dynamic serving across the website.
                  </p>
                  <p className="text-sm text-brand-black/60">
                    <strong>Workflow:</strong> Designer creates vectors → Upload to Supabase → Update website references → Archive old versions
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-display text-display-md font-bold text-brand-black mb-6">Component Patterns</h2>
              <p className="text-lg text-brand-black/70 mb-8">
                Reusable UI components that maintain consistency across the website.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Buttons</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="btn-primary">Primary Button</button>
                    <button className="btn-secondary">Secondary Button</button>
                    <a href="/contact" className="btn-primary">Link as Button</a>
                  </div>
                  <div className="mt-4 text-sm text-brand-black/60">
                    Primary: Mango gold for CTAs | Secondary: Forest green for alternative actions
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Cards</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="card bg-white p-6 shadow-soft-lg">
                      <h4 className="text-xl font-bold text-brand-black mb-3">Card Title</h4>
                      <p className="text-brand-black/70">
                        Cards use subtle shadows, rounded corners (16px), and generous padding for clean, modern presentation.
                      </p>
                    </div>
                    <div className="card bg-brand-offWhite p-6 hover:shadow-soft-lg transition-shadow">
                      <h4 className="text-xl font-bold text-brand-black mb-3">Hover Card</h4>
                      <p className="text-brand-black/70">
                        Hover effects add interactivity with smooth shadow transitions and subtle scale transforms.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-brand-black mb-4">Section Layouts</h3>
                  <div className="space-y-4 text-sm text-brand-black/70">
                    <div><strong>Section padding:</strong> 80px top/bottom (desktop), 48px (mobile)</div>
                    <div><strong>Container max-width:</strong> 1280px with auto margins</div>
                    <div><strong>Grid gaps:</strong> 48px between major sections, 24px between cards</div>
                    <div><strong>Backgrounds:</strong> Alternate white (#FFFFFF) and off-white (#FAF9F7) for visual rhythm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-display text-display-md font-bold text-brand-black mb-6">Voice & Tone</h2>
              <p className="text-lg text-brand-black/70 mb-8">
                Our communication style reflects professionalism, confidence, and client-focused service.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="card bg-brand-forest/5 p-6">
                  <h3 className="font-display text-xl font-bold text-brand-black mb-3">We Are</h3>
                  <ul className="space-y-2 text-brand-black/70">
                    <li>• <strong>Professional</strong> - Authoritative and knowledgeable</li>
                    <li>• <strong>Direct</strong> - Clear and honest communication</li>
                    <li>• <strong>Strategic</strong> - Thoughtful and methodical</li>
                    <li>• <strong>Assertive</strong> - Confident advocacy for clients</li>
                    <li>• <strong>Respectful</strong> - Dignified and discreet</li>
                  </ul>
                </div>

                <div className="card bg-red-50 p-6 border-l-4 border-red-600">
                  <h3 className="font-display text-xl font-bold text-brand-black mb-3">We Are Not</h3>
                  <ul className="space-y-2 text-brand-black/70">
                    <li>• <strong>Aggressive</strong> - Avoid combative language</li>
                    <li>• <strong>Salesy</strong> - No hype or exaggeration</li>
                    <li>• <strong>Casual</strong> - Maintain professionalism</li>
                    <li>• <strong>Overpromising</strong> - Set realistic expectations</li>
                    <li>• <strong>Jargon-heavy</strong> - Use plain English</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 card bg-brand-mango/10 p-6 border-l-4 border-brand-mango">
                <h4 className="font-bold text-brand-black mb-2">Example Messaging</h4>
                <div className="space-y-4 text-brand-black/70">
                  <div>
                    <div className="text-sm font-semibold text-brand-leaf mb-1">✓ Good:</div>
                    <div className="italic">"Strategic criminal defense for Delaware, Ohio"</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-red-600 mb-1">✗ Avoid:</div>
                    <div className="italic line-through">"Hire an aggressive attorney who fights for you!"</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-display text-display-md font-bold text-brand-black mb-6">Accessibility Standards</h2>
              <p className="text-lg text-brand-black/70 mb-6">
                We follow WCAG AA accessibility guidelines to ensure our website is usable by everyone.
              </p>

              <div className="space-y-4">
                <div className="card bg-white p-6 shadow-soft">
                  <h4 className="font-bold text-brand-black mb-2">Color Contrast</h4>
                  <p className="text-brand-black/70">All text meets 4.5:1 contrast ratio minimum (AA standard)</p>
                </div>

                <div className="card bg-white p-6 shadow-soft">
                  <h4 className="font-bold text-brand-black mb-2">Typography</h4>
                  <p className="text-brand-black/70">Minimum 16px body text, clear hierarchy, readable line height (1.5-1.6)</p>
                </div>

                <div className="card bg-white p-6 shadow-soft">
                  <h4 className="font-bold text-brand-black mb-2">Images</h4>
                  <p className="text-brand-black/70">All images include descriptive alt text for screen readers</p>
                </div>

                <div className="card bg-white p-6 shadow-soft">
                  <h4 className="font-bold text-brand-black mb-2">Interactive Elements</h4>
                  <p className="text-brand-black/70">Buttons and links have clear focus states, minimum 44x44px touch targets</p>
                </div>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-brand-forest to-brand-leaf text-white p-12 text-center">
              <h2 className="font-display text-display-md font-bold mb-4">Questions About Brand Guidelines?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                For press inquiries, partnership opportunities, or questions about using Mango Law brand assets,
                contact our office.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
