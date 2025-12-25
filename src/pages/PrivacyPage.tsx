import { SEO } from '../lib/seo';

export default function PrivacyPage() {
  return (
    <section className="container py-12">
      <SEO
        title="Privacy Policy | Ohio Criminal Defense Attorney - Mango Law LLC"
        description="Read how Mango Law LLC collects, uses, and protects information on mango.law."
      />
      <h1 className="text-3xl font-bold text-brand-black">Privacy Policy</h1>
      <p className="mt-2 text-sm text-brand-black/60">
        Mango Law LLC - Ohio Criminal Defense Attorney
      </p>
      <p className="mt-2 text-sm text-brand-black/60">Effective Date: [Month Day, Year]</p>

      <div className="mt-8 space-y-6 text-sm text-brand-black/80">
        <p>
          This Privacy Policy applies to information collected online through mango.law (the "Website"), operated by Mango
          Law LLC, an Ohio law firm providing criminal defense representation in the State of Ohio, including Delaware
          County, Franklin County, and surrounding Central Ohio counties.
        </p>
        <p>This Privacy Policy explains:</p>
        <ul className="list-disc pl-5">
          <li>what information we collect,</li>
          <li>how and why we use it,</li>
          <li>how we protect it,</li>
          <li>when it may be shared, and</li>
          <li>the choices you have regarding your information.</li>
        </ul>
        <p>By using this Website, you consent to the practices described in this Privacy Policy.</p>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">1. Information We Collect and Why</h2>
          <p>
            We collect information to operate this Website, respond to inquiries regarding Ohio criminal defense matters,
            and improve Website performance, security, and usability.
          </p>
          <p>Information is collected in three ways:</p>
          <ul className="list-disc pl-5">
            <li>information you provide directly,</li>
            <li>information collected automatically through server logs, and</li>
            <li>information collected through cookies and similar technologies.</li>
          </ul>
          <p>We do not sell personal information.</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">2. Information You Provide to Us</h2>
          <p className="font-semibold text-brand-black">Contact Forms and Legal Inquiries</p>
          <p>
            If you contact us through this Website (for example, to inquire about OVI / DUI charges, drug offenses, sex
            offenses, violent crimes, theft offenses, probation violations, or other Ohio criminal charges), you may be
            asked to provide:
          </p>
          <ul className="list-disc pl-5">
            <li>name</li>
            <li>email address</li>
            <li>phone number</li>
            <li>city, county, or state within Ohio</li>
            <li>a brief description of your legal concern</li>
          </ul>
          <p>We use this information to:</p>
          <ul className="list-disc pl-5">
            <li>respond to your inquiry,</li>
            <li>determine whether our Ohio criminal defense practice may be able to assist,</li>
            <li>communicate with you regarding your request.</li>
          </ul>
          <p>Submitting information through this Website does not create an attorney-client relationship.</p>
          <p className="font-semibold text-brand-black">No Confidential or Sensitive Information</p>
          <p>Please do not submit confidential, privileged, or highly sensitive information through this Website, including:</p>
          <ul className="list-disc pl-5">
            <li>Social Security numbers</li>
            <li>dates of birth</li>
            <li>driver's license numbers</li>
            <li>financial account information</li>
            <li>detailed facts regarding alleged criminal conduct</li>
          </ul>
          <p>
            Information submitted online is not protected by attorney-client privilege unless and until a formal written
            engagement agreement is executed.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">3. Information Collected Automatically (Server Logs)</h2>
          <p>When you visit this Website, our servers may automatically collect technical information, including:</p>
          <ul className="list-disc pl-5">
            <li>IP address</li>
            <li>internet service provider</li>
            <li>approximate location (city, county, state within Ohio)</li>
            <li>browser and device type</li>
            <li>pages viewed and links clicked</li>
            <li>date and time of access</li>
            <li>referring website or search query</li>
          </ul>
          <p>This information is used to:</p>
          <ul className="list-disc pl-5">
            <li>administer and secure the Website,</li>
            <li>analyze usage trends by Ohio visitors,</li>
            <li>improve content related to Ohio criminal defense services.</li>
          </ul>
          <p>This data is generally aggregated and not used to identify you personally.</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">4. Cookies, Analytics, and Consent</h2>
          <p className="font-semibold text-brand-black">Cookies and Similar Technologies</p>
          <p>We may use cookies and similar technologies to:</p>
          <ul className="list-disc pl-5">
            <li>support core Website functionality,</li>
            <li>remember user preferences,</li>
            <li>understand how visitors access information about Ohio criminal defense services,</li>
            <li>evaluate Website performance.</li>
          </ul>
          <p className="font-semibold text-brand-black">Consent-Based Analytics</p>
          <p>
            Where required by law, cookies and analytics tools are used only after consent is provided. You may change or
            withdraw your consent at any time.
          </p>
          <p>
            You may also manage cookies through your browser settings. Some Website features may not function properly if
            cookies are disabled.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">5. Analytics and Third-Party Services</h2>
          <p>We may use third-party services to assist with:</p>
          <ul className="list-disc pl-5">
            <li>Website analytics and performance measurement,</li>
            <li>security monitoring and abuse prevention.</li>
          </ul>
          <p>
            These services may collect information such as IP address or device data in aggregated or pseudonymous form.
            We do not sell personal information to advertisers.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">6. Advertising and Measurement</h2>
          <p>
            We may use limited advertising or measurement tools to understand how Ohio residents find our Website,
            including searches related to criminal defense attorneys in Ohio.
          </p>
          <p>You may opt out of certain interest-based advertising through:</p>
          <ul className="list-disc pl-5">
            <li>https://www.aboutads.info/choices</li>
            <li>Google Ad Settings</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">7. Do Not Track Signals</h2>
          <p>
            Some browsers offer "Do Not Track" signals. At this time, our Website does not respond to DNT signals. Privacy
            preferences are managed through consent tools and browser settings.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">8. How We Protect Information</h2>
          <p>
            We use reasonable administrative, technical, and physical safeguards designed to protect personal
            information. However, no internet transmission or storage system can be guaranteed to be completely secure.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">9. Information Sharing</h2>
          <p>We do not sell or rent personal information. Information may be shared only:</p>
          <ul className="list-disc pl-5">
            <li>with service providers assisting in Website operations,</li>
            <li>with attorneys or firms if a referral is appropriate,</li>
            <li>to comply with Ohio or federal law or court orders,</li>
            <li>to protect our rights, safety, or property,</li>
            <li>in connection with a business transition.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">10. Your Rights</h2>
          <p>You may contact us to:</p>
          <ul className="list-disc pl-5">
            <li>request access to personal information we hold,</li>
            <li>request correction or deletion,</li>
            <li>opt out of future communications.</li>
          </ul>
          <p>Requests may be submitted using the contact information on this Website.</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">11. Children's Information</h2>
          <p>This Website is not intended for children under the age of 13, and we do not knowingly collect information from children.</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            effective date.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-brand-black">13. Contact Information</h2>
          <p>If you have questions about this Privacy Policy, please contact Mango Law LLC using the contact information provided on this Website.</p>
        </div>
      </div>
    </section>
  );
}
