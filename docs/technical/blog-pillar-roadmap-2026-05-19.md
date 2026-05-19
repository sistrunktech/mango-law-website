# Blog Pillar Roadmap and UX Follow-Through

Date: 2026-05-19

Purpose: connect the newly published checkpoint article to the right blog roll, pillar pages, and related posts, then scope the next support content based on recent SEO reports and consumer-style UX review.

## Implemented In This Pass

- Homepage blog roll now prioritizes the new checkpoint after-stop article, the Delaware County CPO hearing guide, and the drug-possession first-step guide.
- Blog archive issue paths now group links by OVI/DUI, criminal case, protection/domestic, and drug charges instead of showing an OVI-only path.
- Blog related-post selection now supports explicit pillar clusters, starting with checkpoint and holiday OVI content.
- Blog CTAs are now category-aware so non-OVI readers do not see OVI-specific calls to action.
- Public article copy no longer uses internal phrases such as "owner page."
- Contact and lead forms no longer leave users stranded behind an invisible verification requirement; fallback primary phone CTAs are visible.
- Floating contact options now show the primary call/text number and label the backup office line clearly.
- Checkpoint map now has an in-component list fallback if the interactive map fails to load.
- Checkpoint page labels future dates as "Upcoming" and filters obvious non-Ohio checkpoint articles from the Ohio map surface.
- First-offense OVI now places the practical 72-hour checklist before statute cards.

## Consumer UX Themes

The subagent review found three high-impact themes:

- Trust breaks quickly when content looks generic. Category-aware CTAs and public-facing wording matter.
- Mobile users need the direct path first: one primary phone number, immediate checklist, short next step, then details.
- Resource surfaces need graceful failure. A map, CAPTCHA, or cookie layer cannot be allowed to block urgent contact or core page value.

## Next 2-3 Blog Posts Per Pillar

### OVI / DUI

1. CDL or out-of-state driver charged with OVI in Ohio
   - Intent: high-anxiety driver with license/employment exposure.
   - Owner/support path: `/ovi-dui-defense-delaware-oh`, `/als-license-suspension-ohio`, `/first-offense-ovi-ohio`.
   - Source needs: ORC 4511.19, ORC 4511.191, BMV/CDL suspension guidance, FMCSA CDL disqualification sources.

2. OVI with accident, child passenger, or injury allegation in Ohio
   - Intent: aggravating facts and escalation risk.
   - Owner/support path: `/ovi-dui-defense-delaware-oh`, `/felony-ovi-lawyer-ohio`, `/motion-to-suppress-ovi-ohio`.
   - Source needs: ORC 4511.19, ORC 4511.193, ORC 2903.08, sentencing references.

3. Breath, blood, urine, and oral-fluid testing records checklist
   - Intent: evidence review and suppression-support content.
   - Owner/support path: `/motion-to-suppress-ovi-ohio`, `/ovi-test-refusal-lawyer-ohio`, `/blog/ohio-livs-law-ovi-changes`.
   - Source needs: OAC 3701-53, ORC 4511.19, ORC 4511.192.

### Criminal Defense

1. Summons vs. arrest in Delaware County
   - Intent: people who received paperwork but were not jailed, or who do not understand arraignment risk.
   - Owner/support path: `/criminal-defense-delaware-oh`, `/blog/delaware-county-criminal-case-timeline`.
   - Source needs: Ohio Criminal Rules, Delaware Municipal Court and Delaware County Clerk references.

2. Diversion, intervention in lieu, and treatment-based resolutions in Ohio
   - Intent: first-time or lower-level charges where alternatives may matter.
   - Owner/support path: `/criminal-defense-delaware-oh`, `/drug-crime-lawyer-delaware-oh`.
   - Source needs: ORC 2951.041, local court/probation references where available.

3. Record sealing after an Ohio criminal case
   - Intent: post-case recovery and long-tail conversion.
   - Owner/support path: `/criminal-defense-delaware-oh`, reviews/about trust pages.
   - Source needs: current Ohio sealing and expungement statutes.

### Domestic Violence / Protection Orders

1. No-contact bond terms after a domestic violence arrest
   - Intent: urgent "what can I do tonight" guidance.
   - Owner/support path: `/domestic-violence-lawyer-delaware-oh`, `/protection-order-lawyer-delaware-oh`.
   - Source needs: ORC 2919.25, Ohio Criminal Rules, local bond schedule/order references.

2. Evidence to bring to a CPO or DV-related hearing
   - Intent: practical hearing prep.
   - Owner/support path: `/blog/civil-protection-order-hearing-delaware-county-ohio`, `/civil-protection-order-defense-ohio`.
   - Source needs: ORC 3113.31, Ohio Rules of Civil Procedure, Delaware County Domestic Relations info.

3. Firearm restrictions after DV or protection-order allegations
   - Intent: collateral consequence and compliance-risk content.
   - Owner/support path: `/domestic-violence-lawyer-delaware-oh`, `/protection-order-lawyer-delaware-oh`.
   - Source needs: 18 USC 922(g)(8), 18 USC 922(g)(9), Ohio Supreme Court protection-order forms.

### Drug Crimes

1. Constructive possession in shared homes, borrowed cars, and passenger cases
   - Intent: "it was not mine" proof questions.
   - Owner/support path: `/drug-crime-lawyer-delaware-oh`, `/blog/drug-possession-in-car-ohio`.
   - Source needs: ORC 2925.11, ORC 2925.01, current Ohio constructive-possession case law.

2. Lab testing and chain of custody in Ohio drug possession cases
   - Intent: evidence reliability and negotiation leverage.
   - Owner/support path: `/drug-crime-lawyer-delaware-oh`, `/blog/motion-practice-criminal-defense`.
   - Source needs: Ohio Rules of Evidence, BCI/lab process references where available.

3. Intervention in lieu and treatment options for first drug charges
   - Intent: resolution-seeking and recovery-focused.
   - Owner/support path: `/drug-crime-lawyer-delaware-oh`, `/drug-possession-vs-trafficking-ohio-defense`.
   - Source needs: ORC 2951.041 and local court program references.

### Sensitive Charges / Sex Crimes

1. What to do if police contact you about a sex-offense investigation in Ohio
   - Intent: pre-charge investigation and statement-risk guidance.
   - Owner/support path: `/sex-crime-defense-lawyer-delaware-oh`, `/criminal-defense-delaware-oh`.
   - Source needs: Ohio criminal procedure, Miranda/interview guidance from primary sources.

2. Digital evidence and search warrants in sensitive-charge cases
   - Intent: phone, cloud, and social-media investigation concerns.
   - Owner/support path: `/sex-crime-defense-lawyer-delaware-oh`, `/blog/motion-practice-criminal-defense`.
   - Source needs: Fourth Amendment, Ohio Criminal Rule 41, relevant federal/Ohio warrant standards.

3. Ohio sex-offender registration levels and collateral consequences
   - Intent: consequence research before plea decisions.
   - Owner/support path: `/sex-crime-defense-lawyer-delaware-oh`.
   - Source needs: ORC Chapter 2950 and Ohio Attorney General registration resources.

### White Collar / Financial Allegations

1. What to do after receiving a fraud investigation letter or detective call
   - Intent: pre-charge, document-preservation, no-statement guidance.
   - Owner/support path: `/white-collar-crimes-attorney-delaware-oh`, `/criminal-defense-delaware-oh`.
   - Source needs: theft/fraud statutes, criminal procedure, search/subpoena basics.

2. Theft vs. fraud vs. embezzlement in Ohio
   - Intent: allegation classification.
   - Owner/support path: `/white-collar-crimes-attorney-delaware-oh`.
   - Source needs: ORC 2913.02 and related fraud statutes.

3. Subpoena and document preservation checklist for Ohio investigations
   - Intent: evidence handling and early risk control.
   - Owner/support path: `/white-collar-crimes-attorney-delaware-oh`, `/criminal-defense-delaware-oh`.
   - Source needs: subpoena rules, obstruction/tampering statutes, document-retention references.

### Personal Injury

1. What to do after a crash in Delaware County
   - Intent: local immediate-action checklist.
   - Owner/support path: `/personal-injury-lawyer-delaware-oh`.
   - Source needs: Ohio crash reporting, limitations period, insurance basics.

2. Medical records, treatment gaps, and injury claim value
   - Intent: claim documentation.
   - Owner/support path: `/personal-injury-lawyer-delaware-oh`.
   - Source needs: Ohio limitations and medical-record access references.

3. Insurance adjuster calls after an Ohio accident
   - Intent: statement risk and claim setup.
   - Owner/support path: `/personal-injury-lawyer-delaware-oh`, `/contact`.
   - Source needs: Ohio insurance/claim references and consumer guidance.

## Suggested Publishing Order

1. No-contact bond terms after a domestic violence arrest. Completed in follow-up branch on 2026-05-19.
2. CDL or out-of-state driver charged with OVI in Ohio. Completed in follow-up branch on 2026-05-19 as `/blog/cdl-out-of-state-driver-ovi-ohio`.
3. Summons vs. arrest in Delaware County.
4. Lab testing and chain of custody in Ohio drug possession cases.
5. What to do if police contact you about a sex-offense investigation in Ohio.

This sequence balances current UX findings, existing keyword evidence, and the highest anxiety states where a visitor is most likely to need direct help.

## Risks To Monitor

- Contact conversion can still suffer if Cloudflare Turnstile or CSP blocks verification. Keep the visible phone fallback and monitor form errors.
- Checkpoint trust depends on data quality. Continue filtering non-Ohio sources and label future dates as upcoming.
- Avoid adding broad commercial blog posts that compete with owner pages. Support posts should route readers to the main practice page.
- Keep protection-order and domestic-violence language calm and compliance-first. Avoid language that sounds escalatory or outcome-promising.
