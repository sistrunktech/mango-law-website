import { SEO } from '../lib/seo';

export default function TermsPage() {
  return (
    <section className="container py-12">
      <SEO
        title="Terms of Use | Mango Law LLC - Ohio Criminal Defense"
        description="Terms of use for mango.law, including jurisdiction, confidentiality, and legal disclaimer."
      />
      <h1 className="text-3xl font-bold text-brand-black">Terms of Use</h1>
      <p className="mt-2 text-sm text-brand-black/60">Mango Law LLC - Ohio Criminal Defense</p>
      <p className="mt-2 text-sm text-brand-black/60">Effective Date: [Month Day, Year]</p>

      <div className="mt-8 space-y-6 text-sm text-brand-black/80">
        <p>
          These Terms of Use govern your access to and use of mango.law (the "Website"). By using this Website, you agree
          to these Terms.
        </p>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">1. No Attorney-Client Relationship</h2>
          <p>
            The information on this Website is provided for general informational purposes only and is not legal advice.
          </p>
          <p>
            Viewing this Website, submitting information through it, or communicating with us through online forms or chat
            does not create an attorney-client relationship.
          </p>
          <p>
            An attorney-client relationship is formed only through a written engagement agreement signed by both you and
            Mango Law LLC.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">2. No Legal Advice</h2>
          <p>
            The content on this Website may discuss Ohio criminal law topics, including OVI/DUI, drug offenses, sex
            offenses, violent crimes, theft offenses, and related matters. Laws change frequently, and outcomes depend on
            specific facts.
          </p>
          <p>
            You should not act or refrain from acting based on information from this Website without consulting a
            qualified Ohio criminal defense attorney regarding your specific situation.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">3. Jurisdiction and Geographic Scope</h2>
          <p>
            Mango Law LLC practices law only in the State of Ohio. This Website is intended for individuals seeking
            information about Ohio criminal defense matters.
          </p>
          <p>
            We do not seek to represent anyone based on their viewing of this Website in jurisdictions where this Website
            does not comply with local laws or professional rules.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">4. Confidentiality of Communications</h2>
          <p>
            Communications sent through this Website, including contact forms and chat features, are not confidential and
            are not protected by attorney-client privilege unless and until a formal attorney-client relationship is
            established.
          </p>
          <p>Do not submit confidential or sensitive information through this Website.</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">5. Intellectual Property</h2>
          <p>
            All content on this Website, including text, graphics, logos, and design elements, is the property of Mango
            Law LLC or its licensors and is protected by applicable intellectual property laws.
          </p>
          <p>You may view and print content for personal, non-commercial use only. No other use is permitted without prior written consent.</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">6. Third-Party Links</h2>
          <p>
            This Website may contain links to third-party websites for convenience or informational purposes. Mango Law
            LLC does not control and is not responsible for the content or privacy practices of those sites.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">7. Disclaimer of Warranties</h2>
          <p>
            This Website is provided "as is" and "as available." We make no warranties, express or implied, regarding the
            accuracy, completeness, or availability of the Website or its content.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Mango Law LLC shall not be liable for any damages arising out of or
            related to your use of this Website.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">9. Governing Law</h2>
          <p>
            These Terms of Use are governed by and construed in accordance with the laws of the State of Ohio, without
            regard to conflict-of-law principles.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">10. Changes to These Terms</h2>
          <p>
            We may update these Terms of Use from time to time. Changes will be posted on this page with an updated
            effective date.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">11. Contact Information</h2>
          <p>If you have questions about these Terms of Use, please contact Mango Law LLC using the contact information provided on this Website.</p>
        </div>
      </div>
    </section>
  );
}
