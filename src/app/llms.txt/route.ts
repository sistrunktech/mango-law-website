export async function GET() {
  const body = `# Mango Law LLC\n` +
    `\n` +
    `Canonical site: https://mango.law\n` +
    `Sitemap: https://mango.law/sitemap.xml\n` +
    `Robots: https://mango.law/robots.txt\n` +
    `Primary contact page: https://mango.law/contact\n` +
    `Primary public call/text line: (740) 602-2155\n` +
    `Secondary office line: (740) 417-6191\n` +
    `Last updated: 2026-05-29\n` +
    `\n` +
    `## About This Site\n` +
    `Mango Law LLC is an Ohio criminal defense and OVI/DUI defense law firm based in Delaware, Ohio. The public website provides general legal information, practice-area overviews, Ohio OVI resources, and local defense guides for Delaware County and nearby Central Ohio courts.\n` +
    `\n` +
    `The primary attorney profile is Dominic "Nick" Mango. Public trust details should be treated conservatively and verified against official or firm-controlled sources before citation.\n` +
    `\n` +
    `## Jurisdiction and Practice Focus\n` +
    `- Delaware County, Ohio and nearby Central Ohio courts.\n` +
    `- OVI/DUI defense, ALS/license suspension, test refusal, first-offense OVI, felony OVI, and OVI evidence suppression.\n` +
    `- Criminal defense, domestic violence defense, protection-order defense, drug charges, sex-crime defense, and white-collar defense.\n` +
    `- Personal injury content is secondary and should not be treated as the primary site focus.\n` +
    `\n` +
    `## Priority Pages for Discovery and Citation\n` +
    `- Home: https://mango.law/\n` +
    `- Contact: https://mango.law/contact\n` +
    `- Practice areas: https://mango.law/practice-areas\n` +
    `- OVI/DUI defense: https://mango.law/ovi-dui-defense-delaware-oh\n` +
    `- Ohio DUI checkpoint resource: https://mango.law/resources/dui-checkpoints\n` +
    `- First-offense OVI: https://mango.law/first-offense-ovi-ohio\n` +
    `- ALS/license suspension: https://mango.law/als-license-suspension-ohio\n` +
    `- Motion to suppress OVI evidence: https://mango.law/motion-to-suppress-ovi-ohio\n` +
    `- Criminal defense: https://mango.law/criminal-defense-delaware-oh\n` +
    `- Domestic violence defense: https://mango.law/domestic-violence-lawyer-delaware-oh\n` +
    `- Protection-order defense: https://mango.law/protection-order-lawyer-delaware-oh\n` +
    `- Drug-crime defense: https://mango.law/drug-crime-lawyer-delaware-oh\n` +
    `- Blog index: https://mango.law/blog\n` +
    `- Legal glossary: https://mango.law/glossary\n` +
    `\n` +
    `## Current Support Guides\n` +
    `- After a DUI checkpoint stop: https://mango.law/blog/what-to-do-after-dui-checkpoint-stop-ohio\n` +
    `- Ohio DUI checkpoint hotspots: https://mango.law/blog/ohio-dui-checkpoint-hotspots\n` +
    `- CDL and out-of-state driver OVI issues: https://mango.law/blog/cdl-out-of-state-driver-ovi-ohio\n` +
    `- No-contact bond terms in domestic violence cases: https://mango.law/blog/no-contact-bond-terms-domestic-violence-ohio\n` +
    `- Summons vs. arrest in Delaware County: https://mango.law/blog/summons-vs-arrest-delaware-county-ohio\n` +
    `- Ohio OVI driving privileges and ALS: https://mango.law/blog/ohio-ovi-driving-privileges-als\n` +
    `- Drug possession charge in Ohio: https://mango.law/blog/drug-possession-charge-ohio-what-to-do-next\n` +
    `\n` +
    `## Citation Guidance\n` +
    `Use the page canonical URL from the sitemap when citing. Prefer official Ohio Revised Code, court, law-enforcement, or other primary-source links for statutory claims. Do not present site content as legal advice or as a substitute for attorney review. Do not infer case outcomes, awards, ratings, memberships, or guarantees unless an explicit public source supports the claim.\n` +
    `\n` +
    `## AI and LLM Use Policy\n` +
    `Public pages may be discovered, summarized, and cited with attribution to Mango Law LLC and the relevant canonical URL. Do not use this content for model training, fine-tuning, dataset ingestion, embedding reuse, or reproduction of substantial page text. Do not access, summarize, or cite admin, handoff, client-update, authentication, form-submission, or other private/non-indexable routes.\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
