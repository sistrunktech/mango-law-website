import type { TrustSource, TrustSourceType } from './trust';

export type BlogSourceType = TrustSourceType;
export type BlogSource = TrustSource;

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  lastVerified: string;
  sources: TrustSource[];
  imageUrl?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-ovi-dui-charges-ohio',
    title: 'Understanding OVI/DUI Charges in Ohio: What You Need to Know',
    excerpt: 'Complete guide to Ohio OVI charges including penalties, defense strategies, and how to protect your record. Learn about ORC § 4511.19 and what to do if arrested.',
	    imageUrl: '/images/generated/blog-ovi-charges.png',
		    content: `## Introduction
		
		Operating a vehicle while impaired (OVI) – known in many states as driving under the influence (DUI) – is a serious offense in Ohio. Ohio uses the term OVI to cover drunk-driving cases and those involving drugs or a combination of alcohol and drugs. This post explains the law, common penalties, and defense considerations so you can make informed decisions. Where possible, it links to Ohio statutes and published opinions so you can verify the underlying authority.
		
		## What Does OVI Mean?
		
		Under the [Ohio Revised Code (ORC) § 4511.19](https://codes.ohio.gov/ohio-revised-code/section-4511.19), it is illegal to operate any vehicle if you are impaired by alcohol, drugs, or a combination of both. Ohio also defines prohibited concentrations for certain tests (often discussed as “per se” limits). The specific categories and thresholds can be updated over time, so confirm the current text of the statute and any applicable testing regulations.
		
		Ohio’s implied consent law ([ORC § 4511.191](https://codes.ohio.gov/ohio-revised-code/section-4511.191)) applies to chemical testing after arrest. Refusing a chemical test can trigger an administrative license suspension (ALS) and other consequences.

	## Criminal Penalties for a First OVI

	The penalties for a first-time OVI are found in [ORC § 4511.19(G)(1)(a)](https://codes.ohio.gov/ohio-revised-code/section-4511.19). Courts may impose or suspend portions of the sentence based on completion of a driver-intervention program and use of ignition-interlock devices. Penalty ranges, fees, and eligibility rules change over time, so confirm the current statute and local practice.

		## Higher-tier test results (“high-test”)
	
	If testing is at or above the “high-test” threshold, the penalties can increase and courts often impose additional conditions (for example: longer minimum jail or driver-intervention program time, ignition interlock, restricted plates, and alcohol monitoring). The exact requirements and eligibility/timing for limited driving privileges depend on the specific sentencing subsection and case history, so confirm the current rules against the statute and your attorney’s advice.

		## Repeat Offenses and Look-Back Period
		
		Ohio’s OVI statute uses a look-back period for repeat-offense sentencing. Whether a prior counts (and how it is measured) is record-dependent and should be confirmed using certified records and the current statute. For more detail, see our guide on [Ohio's DUI Lookback Period](/blog/ohio-dui-lookback-period).

	## Administrative License Suspension (ALS)
	
	When arrested for OVI, your license may be immediately suspended through an ALS. The ALS duration and any “hard time” before privileges depend on factors like prior history and whether you refused or tested over a prohibited limit. The controlling categories and timelines are in [ORC § 4511.191](https://codes.ohio.gov/ohio-revised-code/section-4511.191) and related provisions. Courts may grant limited occupational driving privileges in some cases, often with conditions like an ignition-interlock device.

	## Real-World Case Examples

	### “Drive-Thru” Reasonable Suspicion Case
	
	In [State v. Chattoo](https://www.supremecourt.ohio.gov/rod/docs/pdf/10/2020/2020-Ohio-6893.pdf) (2020-Ohio-6893), a restaurant manager called 911 to report a car blocking a drive-thru lane with a sleeping driver. An officer later stopped the vehicle and arrested the driver for OVI. The appellate court reversed, finding the stop lacked reasonable suspicion on the record presented. This case is a reminder that suppression arguments can turn on timing, what the officer observed, and how the stop was justified.

### Traffic-Stop Authority: State v. Mays

The Ohio Supreme Court held in [State v. Mays, 2008-Ohio-3365](https://www.supremecourt.ohio.gov/rod/docs/pdf/0/2008/2008-Ohio-3365.pdf), that an officer may stop a driver after observing a vehicle drift over lane lines even without additional evidence of impairment. This case is cited by prosecutors to justify traffic stops; experienced defense attorneys challenge stops by showing that the movement was minimal or due to road conditions.

### Blood-Test Suppression: State v. McCall
	
Ohio’s alcohol-testing regulations (including container/seal requirements) are in [Ohio Admin. Code 3701-53-05](https://codes.ohio.gov/ohio-administrative-code/rule-3701-53-05). In some cases, courts suppress test results when the state cannot prove required compliance. Whether suppression is available depends on the record, the regulation at issue, and the court’s rulings.

### Sentencing and conditions vary

OVI sentencing depends on the statutory category and the court’s findings, and conditions can vary by county, judge, and your history. For any case involving “high-test” allegations, refusal allegations, or priors, confirm the current rules against the statute and your record.

## Look-Back Period and prohibited concentrations

Both the look-back rules and the prohibited concentration categories are defined by statute and can change over time. Confirm the current law in [ORC § 4511.19](https://codes.ohio.gov/ohio-revised-code/section-4511.19) and related provisions, and verify how the statute applies to your certified record.

## Defending Against OVI Charges

Several defenses can be raised in OVI cases:

### Challenge the Stop

Law enforcement must have reasonable and articulable suspicion to stop a vehicle. Cases like State v. Chattoo show that an unlawful stop can invalidate evidence.

### Question Field-Sobriety Tests

Field-sobriety tests must be administered on a flat surface using standardized procedures. If an officer deviates from protocol, results may be excluded.

### Analyze Chemical Tests

Breath, blood and urine tests must follow strict regulations. Improper calibration or sealing – as in State v. McCall – can lead to suppression.

### Negotiate for Reduced Charges

Prosecutors may agree to amend an OVI to reckless operation or physical control, particularly for first offenders or cases with evidentiary issues.

### Request Limited Driving Privileges

Even during an ALS, courts can grant occupational privileges. Promptly filing for privileges and complying with interlock requirements can minimize life disruption.

## Civil & Collateral Consequences

Beyond criminal penalties, an OVI conviction affects insurance premiums, professional licenses and employment. A criminal record is public and may limit travel to Canada or other countries. Reinstatement of your driving privileges requires completion of suspension terms, payment of the reinstatement fee and proof of financial responsibility (SR-22 insurance).

## Conclusion

Ohio's OVI laws are complex and frequently updated. Penalties can include incarceration or programs, fines, license-related consequences, and collateral effects. Cases like State v. Chattoo and State v. Mays illustrate how legal standards and procedural details can shape outcomes. Work with an attorney who can verify the current statute and apply it to the specific facts in your case.

## Disclaimer

The information provided in this post is for general guidance only and does not constitute legal advice. Every case is unique, and outcomes depend on specific facts, applicable law, and procedure. If you are facing OVI charges, consult with a qualified attorney who can evaluate your individual circumstances.

	## Contact Mango Law for OVI Defense
	
	If you've been charged with OVI in Delaware or Franklin County, the stakes can be high. Mango Law regularly handles OVI defense matters and can help you understand what’s likely to matter in your specific court and timeline.

		**Call (740) 602-2155** today for a confidential consultation.`,
    category: 'OVI/DUI Defense',
    date: '2024-12-01',
    author: 'Dominic Mango',
	    lastVerified: '2025-12-17',
	    sources: [
      {
        label: 'Ohio Revised Code § 4511.19 (OVI)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.19',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 4511.191 (Implied consent)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.191',
        type: 'primary',
      },
      {
        label: 'Ohio Administrative Code 3701-53-05 (Alcohol testing)',
        url: 'https://codes.ohio.gov/ohio-administrative-code/rule-3701-53-05',
        type: 'primary',
      },
      {
        label: 'State v. Mays, 2008-Ohio-3365 (Ohio Supreme Court)',
        url: 'https://www.supremecourt.ohio.gov/rod/docs/pdf/0/2008/2008-Ohio-3365.pdf',
        type: 'primary',
      },
      {
        label: 'State v. Chattoo, 2020-Ohio-6893 (10th Dist.)',
        url: 'https://www.supremecourt.ohio.gov/rod/docs/pdf/10/2020/2020-Ohio-6893.pdf',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'motion-practice-criminal-defense',
    title: 'The Power of Motion Practice in Criminal Defense',
    excerpt: 'How strategic pre-trial motions can challenge evidence and shape outcomes—often before trial even begins.',
    imageUrl: '/images/generated/blog-motion-practice.png',
    content: `Motion practice is one of the most powerful—and underutilized—tools in criminal defense. Many cases are improved before trial ever begins through properly crafted and strategically argued pretrial motions. Understanding how motions work and why they matter can be a major factor in how a case resolves.

## What Are Pre-Trial Motions?

Pre-trial motions are formal written requests filed with the court asking for specific rulings before your case goes to trial. Under [Ohio Criminal Rule 12](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf), these motions challenge the admissibility of evidence, the legality of searches and seizures, the sufficiency of charges, or procedural violations.

### Why Pre-Trial Motions Matter

Effective motion practice can:
- **Suppress illegally obtained evidence**, weakening the prosecution's case
- **Seek dismissal** when legal or procedural defects exist
- **Exclude prejudicial evidence** from trial, improving the reliability of what the jury considers
- **Establish favorable legal precedents** for trial
- **Demonstrate preparation** to prosecutors, encouraging plea negotiations
- **Save time, money, and stress** by resolving issues before expensive trials

### What Varies (And Why Motions Are Not “One-Size-Fits-All”)

How strong a motion is (and what relief is realistically available) depends on:
- the facts (video, witnesses, timelines, alleged statements)
- the specific charge(s) and what the state must prove
- local rules and deadlines for filings
- the judge’s expectations for briefing and hearings
- the prosecutor’s evidence and willingness to negotiate

## Common Defense Motions Under Ohio Law

### Motion to Suppress Evidence (Crim.R. 12)

Under the **Fourth Amendment** and [Ohio Crim. R. 12(C)(3)](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf), defendants can file motions to suppress evidence obtained in violation of constitutional rights. If granted, the prosecution cannot use that evidence at trial.

**Common grounds for suppression:**

#### Illegal Traffic Stops

Police must have **reasonable suspicion** to stop your vehicle under [Terry v. Ohio, 392 U.S. 1 (1968)](https://supreme.justia.com/cases/federal/us/392/1/). If they lacked reasonable suspicion, evidence from the stop—breathalyzer results, field sobriety tests, drug discoveries—may be subject to suppression depending on the facts and legal rulings.

If the stop was unlawful, evidence from the stop may be suppressed depending on the facts and how the court applies the law.

#### Illegal Searches and Seizures

The Fourth Amendment protects against unreasonable searches. Common suppression arguments include:
- **Warrantless searches without probable cause**
- **Searches exceeding the scope of consent** ("You can look in my trunk" doesn't authorize searching closed containers)
- **Invalid search warrant affidavits** (false statements, stale information, insufficient probable cause)
- **Searches incident to arrest that exceed lawful scope**

Illustrative scenario: a search that expands beyond the reason for the stop, without a lawful basis, can create suppression issues—especially when the state’s case relies heavily on what was found.

#### Miranda Violations

Under [Miranda v. Arizona, 384 U.S. 436 (1966)](https://supreme.justia.com/cases/federal/us/384/436/), police must advise you of your rights before custodial interrogation. Statements obtained in violation of Miranda cannot be used against you.

**Suppression scenarios:**
- Police questioned you while in custody without reading Miranda rights
- You invoked your right to remain silent, but police continued questioning
- You invoked your right to an attorney, but police questioned you anyway
- You were not truly "free to leave" even though police said it wasn't custodial

Illustrative scenario: if someone is effectively in custody (even during a traffic stop) and is interrogated without Miranda warnings, those statements may be subject to suppression.

#### Coerced Confessions

Even with proper Miranda warnings, confessions obtained through coercion are inadmissible under the **Fifth Amendment**. Courts evaluate the "totality of circumstances" including:
- Length of interrogation
- Physical conditions (access to food, water, bathroom breaks, sleep)
- Threats or promises ("Tell us what happened and you can go home")
- Defendant's age, mental capacity, education level
- Use of deception beyond acceptable limits

Courts weigh these factors carefully, and outcomes depend heavily on the record created (reports, video/audio, and testimony).

### Motion to Dismiss (Crim.R. 12)

A Motion to Dismiss under [Ohio Crim. R. 12(C)(2)](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf) argues the charges should be dismissed before trial. Common grounds include:

#### Lack of Jurisdiction

The court doesn't have legal authority to hear the case because:
- The alleged offense didn't occur within the court's territorial jurisdiction
- The defendant wasn't properly served
- The wrong court level is hearing the case

#### Statute of Limitations

Under [ORC § 2901.13](https://codes.ohio.gov/ohio-revised-code/section-2901.13), criminal charges must be filed within certain time limits that depend on the offense and can involve tolling/exceptions. If you believe a charge is time-barred, your attorney should verify the exact rule for your charge and the relevant dates.

#### Insufficient Evidence (Preliminary Hearing Context)

In felony cases, preliminary hearings determine if probable cause exists. If the prosecution fails to establish probable cause, charges can be dismissed.

#### Violation of Speedy Trial Rights

Under [ORC § 2945.71](https://codes.ohio.gov/ohio-revised-code/section-2945.71), defendants have the right to speedy trial:
- **Felonies:** Trial must commence within 270 days of arrest
- **Misdemeanors:** Trial must commence within 90 days (if jailed) or 180 days (if not jailed)

If the state violates these deadlines without tolling (continuances, delays caused by defendant), charges must be dismissed **with prejudice** (cannot be re-filed).

	If the state violates the applicable speedy trial deadline (after accounting for tolling), a motion to dismiss may be available. Speedy-trial analysis is technical and fact-specific, so have counsel verify the timeline and the applicable statute for your charge.

#### Double Jeopardy

The **Fifth Amendment** prohibits being tried twice for the same offense. If you were previously acquitted, convicted, or charges were dismissed with prejudice, a Motion to Dismiss based on double jeopardy prevents re-prosecution.

### Motion in Limine (Evid.R. 103)

Motions in Limine under [Ohio Evidence Rule 103](https://www.supremecourt.ohio.gov/LegalResources/Rules/evidence/EvidenceRules.pdf) prevent the prosecution from introducing prejudicial, irrelevant, or inadmissible evidence at trial.

**Common targets for exclusion:**

#### Prior Bad Acts (Evid.R. 404(B))

Under [Ohio Evid. R. 404(B)](https://www.supremecourt.ohio.gov/LegalResources/Rules/evidence/EvidenceRules.pdf), the prosecution generally cannot introduce evidence of your prior crimes, wrongs, or bad acts to show you have a "criminal propensity." However, they can introduce such evidence for limited purposes like proving motive, opportunity, or intent.

**Defense strategy:** File motions in limine to exclude prior bad acts entirely or limit how they're presented to the jury.

#### Hearsay

Under [Ohio Evid. R. 802](https://www.supremecourt.ohio.gov/LegalResources/Rules/evidence/EvidenceRules.pdf), hearsay (out-of-court statements offered for their truth) is generally inadmissible unless an exception applies. Motions in limine can exclude unreliable hearsay the prosecution plans to introduce.

#### Prejudicial Evidence

Even if evidence is technically relevant, it can be excluded under [Ohio Evid. R. 403](https://www.supremecourt.ohio.gov/LegalResources/Rules/evidence/EvidenceRules.pdf) if its prejudicial effect substantially outweighs its probative value.

**Example:** In an assault case, the prosecution wants to show graphic photos of injuries. While relevant, if the photos are so inflammatory they'll inflame the jury beyond their probative value, they can be excluded or limited.

### Motion for Bill of Particulars (Crim.R. 7(E))

Under [Ohio Crim. R. 7(E)](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf), defendants can request more detailed information about charges when the indictment or complaint is vague. This forces prosecutors to specify:
- Exact dates, times, and locations of alleged offenses
- Specific statutes allegedly violated
- Identities of alleged victims or co-conspirators

**Why it matters:** Vague charges make it impossible to prepare a defense. A Bill of Particulars forces the prosecution to commit to specific facts, preventing them from changing theories mid-trial.

### Motion for Discovery (Crim.R. 16)

Under [Ohio Crim. R. 16](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf), defendants are entitled to discovery—evidence the prosecution intends to use at trial. Motions to compel discovery force prosecutors to turn over:
- Police reports and investigative files
- Witness statements
- Physical evidence and test results
- Exculpatory evidence (Brady material)
- Expert witness reports

**Brady violations:** Under [Brady v. Maryland, 373 U.S. 83 (1963)](https://supreme.justia.com/cases/federal/us/373/83/), prosecutors must disclose exculpatory evidence. Failure to do so is grounds for dismissal or new trial.

**Case example:** In State v. Thompson (Franklin County, 2020), prosecutors withheld a witness statement contradicting their theory of the case. We discovered it during trial preparation and filed a motion. The court sanctioned the prosecution and granted a continuance, ultimately leading to acquittal.

### Motion to Sever Charges or Defendants (Crim.R. 8 & 14)

Under [Ohio Crim. R. 14](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf), defendants can request separate trials when:
- Multiple charges are joined improperly (prejudicing the defendant)
- Multiple defendants are tried together, creating conflicting defenses
- Evidence admissible against one defendant is prejudicial to another

**Why it matters:** Trying multiple charges together can prejudice the jury ("If he's charged with 5 crimes, he must be guilty of something"). Severance allows each charge to be evaluated independently.

## The Strategic Value of Motion Practice

### Weakening the Prosecution's Case

Even if motions aren't fully granted, they force prosecutors to reveal weaknesses. During motion hearings:
- Officers testify under oath about their conduct
- Prosecutors must defend their evidence and procedures
- Defense attorneys get a "preview" of trial testimony
- Inconsistencies and credibility issues emerge

**Tactical advantage:** Cross-examining officers at suppression hearings locks in their testimony. If they change stories at trial, you can impeach them with prior statements.

### Encouraging Favorable Plea Negotiations

When prosecutors see well-researched, properly argued motions, they realize:
- You have a competent attorney who will fight
- Their case has vulnerabilities
- Trial will be expensive and risky
- Offering a better plea deal may be strategically wise

	In many cases, substantive motions can change leverage and lead to better negotiations—depending on the facts and the strength of the state’s evidence.

### Creating Appellate Issues

If the trial court denies your motion incorrectly, it creates an **appealable issue**. Even if you're convicted at trial, the conviction can be overturned on appeal if the motion should have been granted.

**Preservation of error:** Under [Ohio Crim. R. 12(F)](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf), most issues must be raised by pretrial motion or they're waived. Failing to file motions can forfeit your ability to appeal.

## Delaware and Franklin County Motion Practice

### Local Court Practices

	**Delaware Municipal Court** and **Delaware County Court of Common Pleas:**
	- Judges expect well-researched, professionally argued motions
	- Hearing timelines and briefing requirements vary by judge and docket
	- Suppression hearings often involve detailed testimony and video review

	**Franklin County Municipal Court** and **Franklin County Court of Common Pleas:**
	- High-volume courts with streamlined procedures
	- Judges appreciate concise, well-cited motions
	- Prosecutors are experienced and will vigorously defend against motions
	- Deadlines and hearing practices vary—coordinate early with counsel

### Common Local Issues

	**Traffic stop challenges:** Many cases begin with traffic stops. Whether a stop was lawful depends on the facts and how the court applies the governing case law.

**Search and seizure:** Many local cases involve vehicle searches during traffic stops. Knowing Ohio case law on consent searches, plain view doctrine, and search incident to arrest is critical.

**OVI motions:** Breathalyzer and [field sobriety test](/blog/refuse-field-sobriety-test-ohio) challenges are routine. Judges expect attorneys to understand NHTSA standards, breathalyzer calibration requirements under [Ohio Admin. Code § 3701-53-05](https://codes.ohio.gov/ohio-administrative-code/rule-3701-53-05), and rising BAC defenses.

	## How Mango Law Approaches Motion Practice

### Thorough Discovery Review

We meticulously review every page of discovery looking for:
- Constitutional violations
- Procedural errors
- Inconsistent statements
- Missing documentation
- Brady material the prosecution should have disclosed

### Legal Research and Case Law

We research and cite relevant Ohio Supreme Court decisions, appellate cases, and U.S. Supreme Court precedents. Judges expect well-supported legal arguments backed by authority.

### Strategic Timing

Some motions are best filed early (suppression, speedy trial), while others are strategic closer to trial (motions in limine). We time filings to maximum advantage.

### Aggressive Advocacy

Motion hearings are adversarial proceedings. We cross-examine officers, challenge prosecution arguments, and fight for favorable rulings.

## When to File Motions

Motion deadlines under [Ohio Crim. R. 12](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf) and local court orders can be strict. Courts often set deadlines early in the case, and late filings can be denied or limited depending on the issue.

Missing deadlines can waive issues. If timing is a concern, talk to counsel early so deadlines can be identified and managed.

## The Bottom Line

Motion practice can shape outcomes. Suppressed evidence, dismissed charges, and improved plea offers can result from strategic, well-argued motions—depending on the facts, the evidence, and the court.

If you're facing criminal charges in Delaware or Franklin County, don't wait. Early motion practice can change the trajectory of your case.

	**Contact Mango Law at (740) 602-2155** for a confidential consultation. We'll review your case, identify motion opportunities, and explain realistic options based on the record.

## Additional Resources

- [Ohio Rules of Criminal Procedure](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf)
- [Ohio Rules of Evidence](https://www.supremecourt.ohio.gov/LegalResources/Rules/evidence/EvidenceRules.pdf)
- [Ohio Revised Code § 2945.71 (Speedy Trial)](https://codes.ohio.gov/ohio-revised-code/section-2945.71)
- [U.S. Supreme Court - Criminal Procedure Cases](https://www.supremecourt.gov/)`,
    category: 'Criminal Defense',
    date: '2024-11-28',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Rules of Criminal Procedure',
        url: 'https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf',
        type: 'primary',
      },
      {
        label: 'Ohio Rules of Evidence',
        url: 'https://www.supremecourt.ohio.gov/LegalResources/Rules/evidence/EvidenceRules.pdf',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2945.71 (Speedy trial)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2945.71',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2901.13 (Statute of limitations)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2901.13',
        type: 'primary',
      },
      {
        label: 'Terry v. Ohio, 392 U.S. 1 (1968)',
        url: 'https://supreme.justia.com/cases/federal/us/392/1/',
        type: 'primary',
      },
      {
        label: 'Miranda v. Arizona, 384 U.S. 436 (1966)',
        url: 'https://supreme.justia.com/cases/federal/us/384/436/',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'drug-possession-vs-trafficking-ohio',
    title: 'Drug Possession vs. Trafficking: Understanding Ohio Drug Crime Charges',
    excerpt: 'Learn the critical differences between possession and trafficking charges in Ohio, and how these distinctions affect your defense strategy.',
    imageUrl: '/images/generated/blog-drug-possession-trafficking.png',
    content: `Ohio drug charges often come down to the statutory distinction between **possession** and **trafficking**—and the specific facts the state can prove.

## What Varies (and why charging can differ)

- the substance and how it’s classified/defined
- the amount involved and whether it crosses statutory “bulk amount” thresholds
- evidence of sale/intent (communications, packaging, cash, surveillance, admissions)
- where the incident happened (some locations can trigger enhanced penalties)
- your record and eligibility for diversion or treatment options
- constitutional issues (stop, search, seizure, and statements)

## Drug Possession (ORC § 2925.11)

Possession cases focus on whether the state can prove you **knowingly** had control over the substance (actual or constructive possession). Common defenses include lack of knowledge, lack of control, and suppression issues tied to the stop/search.

## Drug Trafficking (ORC § 2925.03)

Trafficking can include selling, offering to sell, preparing for shipment, shipping, transporting, delivering, distributing, or possessing with intent to distribute—depending on the subsection and the proof. Ohio’s statutes also use tiered thresholds that can elevate the charge level.

## “Bulk amount” and thresholds (ORC § 2925.01)

Ohio defines “bulk amount” and related measurement concepts in statute. The exact thresholds vary by substance and can be updated over time—so confirm the current definitions and the lab’s reported weights against the statute and discovery.

## Treatment alternatives (when eligible)

Ohio’s intervention-in-lieu-of-conviction statute can be an option in some cases, depending on the charge and your history. Eligibility is fact-specific and should be reviewed with counsel early.

If you’re facing drug possession or trafficking charges in Delaware or Franklin County, contact Mango Law for a confidential consultation.`,
    category: 'Drug Crimes',
    date: '2024-11-25',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code § 2925.11 (Drug possession)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2925.11',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2925.03 (Drug trafficking)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2925.03',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2925.01 (Definitions; bulk amount)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2925.01',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2951.041 (Intervention in lieu of conviction)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2951.041',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'white-collar-crime-defense-ohio',
    title: 'White Collar Crime Defense: What You Need to Know',
    excerpt: 'Facing fraud, embezzlement, or other white collar charges? Learn about defense strategies and how to protect your professional reputation.',
    imageUrl: '/images/generated/blog-white-collar-defense.png',
    content: `White collar crimes are non-violent offenses typically committed in business or professional settings. These cases can be high-stakes, document-heavy, and reputation-sensitive.

## What Varies (and why outcomes differ)

- whether the case is state or federal
- the alleged conduct and what intent the state must prove
- the amount and accounting methodology (and whether the state’s math is disputed)
- the quality of the documentary record (emails, logs, contracts, bank records)
- collateral consequences (licensing, employment, immigration, civil exposure)

## Common White Collar Charges in Ohio

### Fraud
- Credit card fraud
- Identity theft
- Insurance fraud
- Mortgage fraud
- Securities fraud

### Embezzlement
Taking property entrusted to your care for personal use, often in employment contexts.

### Money Laundering
Concealing the source of illegally obtained money through legitimate business transactions.

### Tax Evasion
Willfully avoiding tax obligations through fraud or deception.

## Unique Challenges in White Collar Defense

### Complex Evidence
White collar cases often involve:
- Thousands of documents
- Electronic records and emails
- Accounting records
- Expert testimony
- Technical financial concepts

### Federal Involvement
Many white collar cases are prosecuted federally, with different rules, harsher penalties, and more resources behind the prosecution.

### Professional Consequences
Beyond criminal penalties, white collar convictions can result in:
- Loss of professional licenses
- Inability to work in your field
- Reputational damage
- Civil liability

## Defense Strategies

### Early Investigation
We often get involved before charges are filed, helping clients navigate:
- Federal investigations
- Grand jury subpoenas
- Search warrant execution
- Interview requests

### Challenging the Case
- Demonstrating lack of intent
- Exposing accounting errors
- Questioning expert analyses through [motion practice](/blog/motion-practice-criminal-defense)
- Establishing good faith

### Mitigation
When appropriate, we work to:
- Demonstrate cooperation
- Make restitution
- Show rehabilitation
- Negotiate favorable pleas

## Protecting Your Future

White collar charges require immediate, sophisticated legal representation. At Mango Law, we understand the business context, can analyze complex financial records, and know how to challenge the prosecution's case through strategic [motion practice](/blog/motion-practice-criminal-defense) and expert analysis.

If you're under investigation or have been charged with a white collar offense, contact us immediately. Every day matters in these cases.`,
    category: 'White Collar Crimes',
    date: '2024-11-20',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code Chapter 2913 (Theft and fraud offenses)',
        url: 'https://codes.ohio.gov/ohio-revised-code/chapter-2913',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2913.02 (Theft)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2913.02',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2913.49 (Identity fraud)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2913.49',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'refuse-field-sobriety-test-ohio',
    title: 'Can I Refuse Field Sobriety Tests in Ohio? Your Rights Explained',
    excerpt: 'Learn your rights regarding field sobriety tests in Ohio, the consequences of refusal, and how this decision affects your OVI defense strategy.',
    imageUrl: '/images/generated/blog-field-sobriety-refusal.png',
    content: `If you’re stopped for suspected OVI/DUI in Ohio, an officer may ask you to perform field sobriety tests (FSTs). These roadside exercises are different from chemical tests (breath, blood, urine), and the consequences can be different.

## What Varies (and why the “best” choice depends on context)

- why you were stopped and what the officer observed
- medical conditions, injuries, footwear, weather, fatigue, and nerves
- whether tests were standardized and administered properly
- whether there is dash/body camera video
- what you say during the stop
- your prior history and whether an administrative suspension is at issue

## What are field sobriety tests?

FSTs are coordination and divided-attention exercises used to document observations and help an officer decide whether there is probable cause to arrest.

Common examples include:
- Horizontal Gaze Nystagmus (HGN)
- Walk-and-Turn
- One-Leg Stand

Officers sometimes use additional, non-standardized tasks as well.

## Are you required to do FSTs in Ohio?

Ohio’s implied consent law applies to chemical testing after arrest ([ORC § 4511.191](https://codes.ohio.gov/ohio-revised-code/section-4511.191)). It does not require roadside coordination tests. Practically, refusing FSTs may still influence an officer’s decision-making and what gets written in the report, depending on the totality of circumstances.

## Refuse vs. perform: practical tradeoffs

### If you refuse
- the officer may still investigate further or arrest based on other cues (driving, statements, odor, etc.)
- refusal may be documented (report/video)
- whether and how refusal evidence is argued can vary by case and local practice

### If you perform
- results are subjective and can be affected by non-alcohol factors
- your performance and statements may become central evidence

## Chemical tests are different

Refusing a breath/blood/urine test can trigger an administrative license suspension and other consequences under [ORC § 4511.191](https://codes.ohio.gov/ohio-revised-code/section-4511.191). The length and eligibility for driving privileges depend on the statutory category and your history—confirm the current rule with counsel.

## After an arrest

If you were arrested, act quickly to preserve evidence (video, receipts, medical info, witnesses) and to meet any administrative deadlines.

If you’re facing an OVI charge in Delaware or Franklin County, contact Mango Law for a confidential case evaluation.`,
    category: 'OVI/DUI Defense',
    date: '2024-12-07',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code § 4511.191 (Implied consent)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.191',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 4511.19 (OVI)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.19',
        type: 'primary',
      },
      {
        label: 'NHTSA: DWI Detection and Standardized Field Sobriety Testing (SFST) Participant Manual',
        url: 'https://www.nhtsa.gov/dwi-detection-and-standardized-field-sobriety-test-sfst',
        type: 'guide',
      },
      {
        label: 'Ohio Administrative Code 3701-53-05 (Alcohol testing)',
        url: 'https://codes.ohio.gov/ohio-administrative-code/rule-3701-53-05',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'ohio-dui-lookback-period',
    title: 'Ohio DUI Lookback Period: How Prior Convictions Can Affect Your Case',
    excerpt: 'Understand how Ohio’s OVI lookback rules work, what can count as a prior, and what varies by county, court, and the facts of your case.',
    imageUrl: '/images/generated/blog-dui-lookback-period.png',
    content: `If you're facing OVI/DUI charges in Ohio and have a prior conviction on your record, understanding the **lookback period** is important. Whether a prior counts can affect how the case is charged and sentenced.

## What Is the Lookback Period?

The lookback period (also called the "washout period") is the timeframe during which prior OVI convictions count toward enhanced penalties for subsequent offenses.

As of this post’s last-verified date, many repeat-offense enhancements are commonly described as using a **10-year lookback window** under Ohio’s OVI statute. Because details can change over time (and because record issues can be complicated), confirm the current rule against the statute and your certified record.

### How It Works

Ohio generally looks at whether a prior OVI (or equivalent) falls within the statutory lookback window when determining repeat-offense enhancements. The correct answer depends on your record and the specific statutory language.

**Important**: In many cases the analysis is offense-date to offense-date, not conviction-date to conviction-date. Your attorney should verify this against your certified driving record and the prior case paperwork.

## Why the Lookback Period Matters

Repeat-offense enhancements can significantly increase the consequences compared to a first offense. Depending on the charge and your record, this can affect:

- mandatory minimums and sentencing ranges
- license-related consequences
- vehicle-related sanctions (immobilization/forfeiture in some cases)
- monitoring/treatment conditions (interlock, education, assessment)

For a broader overview of OVI charges and defense strategy, see [Understanding OVI/DUI Charges in Ohio](/blog/understanding-ovi-dui-charges-ohio).

## “High test” and refusal allegations (what to know)

Some cases involve additional allegations related to test results or refusal. The impact of these issues can be highly fact-specific and depends on your history and what the state can prove. Confirm the current rules in ORC § 4511.19 and ORC § 4511.191.

## What Counts as a Prior Conviction?

For lookback purposes, Ohio counts:

- **Prior Ohio OVI/DUI convictions**
- **Out-of-state DUI convictions** (including other states' equivalents)
- **Physical control convictions** (ORC 4511.194)
- **Reckless operation plea deals** (if originally charged as OVI)
- **Municipal and common pleas court convictions**

### What Doesn't Count

- Diversions that were successfully completed and dismissed
- Charges that were reduced and never included an OVI conviction
- Some older convictions that fall outside the applicable lookback window

**Tip**: Prosecutors often rely on a **Bureau of Motor Vehicles (BMV) certified driving record** and court records to argue what counts as a prior. Have counsel verify the record details and the correct statutory window for your situation.

## Lookback rules can change over time

OVI sentencing rules are amended periodically. For any case where priors matter, it’s important to confirm the current rule in the statute and to verify your record details rather than relying on older summaries.

## Strategies When You Have Priors

### Challenge the Prior Conviction

Sometimes prior convictions can be challenged:

- **Constitutional violations**: Was your right to counsel violated?
- **Procedural errors**: Was the prior conviction properly recorded?
- **Jurisdiction issues**: Was it actually within 10 years?
- **Invalid guilty plea**: Was it knowing and voluntary?

Excluding a prior conviction can mean the difference between first-offense and second-offense penalties.

### Challenge the Current Charge

Even with priors, you can fight the current charge:

- Illegal traffic stop
- [Improper field sobriety tests](/blog/refuse-field-sobriety-test-ohio)
- Breathalyzer calibration issues
- Blood draw procedural violations
- Rising BAC defense
- Mouth alcohol contamination

A strong defense on the current charge can reduce or avoid the enhanced consequences that come with a repeat-offense conviction. Learn more about defense strategy through effective [motion practice in criminal defense](/blog/motion-practice-criminal-defense), which can help identify suppression issues and other leverage points.

### Negotiate Strategic Pleas

Experienced OVI attorneys can negotiate outcomes that:

- Avoid conviction (diversion, dismissal)
- Reduce to an alternate offense where appropriate (how it counts later depends on the record and circumstances)
- Minimize jail time and fines
- Preserve driving privileges
- Avoid ignition interlock

### Explore Diversion Programs

Some defendants with priors may still qualify for:

- Intervention in lieu of conviction (ILC)
- Treatment-focused sentencing
- Problem-solving courts (DUI court, drug court)

These programs focus on rehabilitation rather than incarceration.

## Other consequences to flag (varies)

Repeat-offense cases can involve additional license/vehicle restrictions, monitoring requirements, and collateral consequences (employment, professional licensing, insurance). The details depend on the charge, your record, and local practice—so treat online summaries as a starting point and have an attorney confirm the current rule and how it applies to you.

## Common misunderstandings

- Don’t assume a prior “falls off” without verifying the relevant offense dates and the record that proves them.
- Out-of-state history and related offenses can matter; the safest approach is to have counsel review both your BMV record and the prior case documents.

## Costs and practical impact (varies)

Repeat-offense cases can create costs beyond court fines, including monitoring requirements, programs/treatment, transportation alternatives, and missed work time.

## Conclusion

If you have priors, getting the “lookback” analysis right is an early priority. The outcome often depends on record details and case facts—so don’t guess. Have an attorney confirm what counts, what doesn’t, and whether the stop/testing can be challenged.

---

*This article is for educational purposes and does not constitute legal advice. OVI law is complex and fact-specific. Consult with a qualified Ohio OVI attorney about your situation.*`,
    category: 'OVI/DUI Defense',
    date: '2024-12-07',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code § 4511.19 (OVI sentencing; repeat offenses)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.19',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 4511.194 (Physical control)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.194',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 4511.191 (Implied consent; ALS categories)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.191',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'ex-parte-protection-orders-ohio-defense',
    title: 'Ex Parte Protection Orders in Ohio: What to Do When Accused Without Notice',
    excerpt: 'What an ex parte protection order is in Ohio, what varies by case, and practical next steps before the full hearing.',
    imageUrl: '/images/generated/blog-ex-parte-protection-orders.png',
    content: `Ex parte civil protection orders (CPOs) can be issued quickly, sometimes without the respondent present, based on the petition and supporting materials. If you’ve been served, treat it seriously and prepare for the full hearing.

## What Varies (case to case)

- which type of order is at issue and which statute applies
- what relief the court ordered (no-contact, stay-away distance, residence, custody-related terms)
- hearing timing and local court procedures
- what evidence exists (messages, witnesses, video, prior incidents)
- collateral consequences (employment, licensing, firearms, family court)

## Key statutes to review

- Domestic violence CPOs: [ORC § 3113.31](https://codes.ohio.gov/ohio-revised-code/section-3113.31)
- Menacing by stalking orders: [ORC § 2903.214](https://codes.ohio.gov/ohio-revised-code/section-2903.214)
- Violating a protection order: [ORC § 2919.27](https://codes.ohio.gov/ohio-revised-code/section-2919.27)

Federal firearms restrictions can also apply in certain situations; see [18 U.S.C. § 922](https://www.law.cornell.edu/uscode/text/18/922).

## Practical next steps

- Read the order carefully and follow it.
- Avoid any contact that could be viewed as a violation.
- Preserve communications and other evidence.
- Prepare for the full hearing with counsel (timeline, witnesses, exhibits).

If you’re dealing with a protection-order matter in Delaware or Franklin County, contact Mango Law for a confidential consultation.

---

*This article is for educational purposes and does not constitute legal advice. Protection-order law is complex and fact-specific. Consult with a qualified Ohio attorney about your situation.*`,
    category: 'Protection Orders',
    date: '2024-12-07',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code § 3113.31 (Domestic violence civil protection orders)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-3113.31',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2903.214 (Menacing by stalking protection orders)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2903.214',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2919.27 (Violating a protection order)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2919.27',
        type: 'primary',
      },
      {
        label: '18 U.S.C. § 922 (Firearms prohibitions)',
        url: 'https://www.law.cornell.edu/uscode/text/18/922',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'ohio-weapons-charges-ccw-defense',
    title: 'Ohio Weapons Charges: CCW, Improper Handling, and Weapons Disability Defense',
    excerpt: 'A conservative overview of Ohio weapons allegations, including concealed-carry, weapons-under-disability, and vehicle-transport issues under ORC Chapter 2923.',
    imageUrl: '/images/generated/blog-ohio-weapons-charges.png',
    content: `Ohio weapons cases often turn on technical statutory definitions (concealed vs. open, transport rules, location restrictions, and disability status). A charge can arise even when someone believed they were being careful.

## What Varies (and why small facts matter)

- whether the weapon was concealed and how it was carried
- whether it was in a vehicle and where it was stored
- the definitions and exceptions in the specific subsection charged
- license status (if any) and compliance with conditions
- prohibited locations and local enforcement practices
- prior convictions or orders that may create a “weapons under disability” issue
- federal overlap in some situations

## Key Ohio statutes to review

- Carrying concealed weapons: [ORC § 2923.12](https://codes.ohio.gov/ohio-revised-code/section-2923.12)
- Weapons under disability: [ORC § 2923.13](https://codes.ohio.gov/ohio-revised-code/section-2923.13)
- Improperly handling firearms in a motor vehicle: [ORC § 2923.16](https://codes.ohio.gov/ohio-revised-code/section-2923.16)

## Defense themes (high-level)

Depending on the situation, defenses may involve:
- challenging the stop/search and scope of consent
- disputing knowing or constructive possession
- applying statutory exceptions/definitions correctly
- addressing disability status and relief procedures when available
- mitigating collateral consequences and negotiating resolutions

Ohio weapons law is fact-specific. The safest approach is to have counsel review the exact statutory subsection being charged.

If you’re facing weapons charges in Delaware or Franklin County, contact Mango Law for a confidential consultation.

---

*This article is for educational purposes and does not constitute legal advice. Ohio weapons law is complex and fact-specific. Consult with a qualified Ohio attorney about your situation.*`,
    category: 'Criminal Defense',
    date: '2024-12-06',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code Chapter 2923 (Weapons control)',
        url: 'https://codes.ohio.gov/ohio-revised-code/chapter-2923',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2923.12 (Carrying concealed weapons)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2923.12',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2923.13 (Weapons under disability)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2923.13',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2923.16 (Improperly handling firearms in a motor vehicle)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2923.16',
        type: 'primary',
      },
      {
        label: '18 U.S.C. § 922 (Firearms prohibitions)',
        url: 'https://www.law.cornell.edu/uscode/text/18/922',
        type: 'primary',
      },
    ],
  },
  {
	    slug: 'sex-crimes-defense-ohio-what-you-need-to-know',
	    title: 'Sex Crimes Defense in Ohio: What You Need to Know About Sexual Battery, Registration, and Your Rights',
	    excerpt: 'Accused of a sex crime in Ohio? Learn the high-level legal framework, what varies by offense, and how sex offender registration duties can apply under ORC Chapters 2907 and 2950.',
	    imageUrl: '/images/generated/blog-sex-crimes-defense.png',
	    content: `Sex crime allegations are high-stakes and fact-sensitive. Charges, defenses, and potential registration consequences depend on the specific statute and the evidence in the case.

## What Varies (case to case)

- the specific offense and the elements the state must prove
- age/relationship issues (when relevant) and how the statute defines them
- digital evidence (messages, images, app data) and authenticity
- consent and capacity questions (when legally relevant)
- forensic evidence and chain of custody
- search warrant scope, device searches, and statements to law enforcement
- whether registration duties apply and what classification follows from a conviction

## Ohio statutes to review (common in many cases)

- Sexual battery: [ORC § 2907.03](https://codes.ohio.gov/ohio-revised-code/section-2907.03)
- Unlawful sexual conduct with a minor: [ORC § 2907.04](https://codes.ohio.gov/ohio-revised-code/section-2907.04)
- Importuning (often in online sting investigations): [ORC § 2907.07](https://codes.ohio.gov/ohio-revised-code/section-2907.07)

## Registration and reporting duties

Ohio’s registration framework is primarily in [ORC Chapter 2950](https://codes.ohio.gov/ohio-revised-code/chapter-2950). Whether registration applies, how long it lasts, and what reporting is required depends on the specific conviction and classification (see [ORC § 2950.01](https://codes.ohio.gov/ohio-revised-code/section-2950.01) and [ORC § 2950.05](https://codes.ohio.gov/ohio-revised-code/section-2950.05)).

## Next steps if you’re accused

Avoid contacting the accuser or discussing the allegation on social media. Preserve communications and other records, and get legal advice quickly—early steps can affect what evidence exists and what statements are in the record.

If you’re under investigation or charged in Delaware or Franklin County, contact Mango Law for a confidential consultation.

---

*This article is for educational purposes and does not constitute legal advice. Ohio sex crime law is complex and fact-specific. Consult with a qualified Ohio attorney about your situation.*`,
    category: 'Sex Crimes',
    date: '2024-12-05',
    author: 'Dominic Mango',
	    lastVerified: '2025-12-17',
	    sources: [
      {
        label: 'Ohio Revised Code § 2907.03 (Sexual battery)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2907.03',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2907.04 (Unlawful sexual conduct with a minor)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2907.04',
        type: 'primary',
      },
	      {
	        label: 'Ohio Revised Code § 2907.07 (Importuning)',
	        url: 'https://codes.ohio.gov/ohio-revised-code/section-2907.07',
	        type: 'primary',
	      },
      {
        label: 'Ohio Revised Code § 2950.01 (Sex offender classification definitions)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2950.01',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2950.05 (Registration duties)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2950.05',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'personal-injury-claims-ohio-negligence-law',
    title: 'Personal Injury Claims in Ohio: Understanding Negligence, Damages, and Your Legal Rights',
    excerpt: 'A conservative overview of Ohio negligence claims: what varies, how comparative fault works, and where to verify deadlines and damages rules.',
    imageUrl: '/images/generated/blog-personal-injury-claims.png',
    content: `When you’re injured due to someone else’s negligence, Ohio law may allow you to seek compensation. Personal injury claims are fact-specific, and outcomes often depend on the evidence, medical documentation, and how liability is allocated.

## What Varies (case to case)

- how the incident happened and who may be responsible
- the medical evidence and causation (what the incident actually caused)
- insurance coverage and policy limits
- comparative fault arguments (what each side claims you did or didn’t do)
- the type of damages available under the claim
- statutory deadlines and special rules for certain claims

## Key statutes to review

- Comparative negligence: [ORC § 2315.33](https://codes.ohio.gov/ohio-revised-code/section-2315.33)
- Limitations periods (bodily injury): [ORC § 2305.10](https://codes.ohio.gov/ohio-revised-code/section-2305.10)
- Noneconomic damages caps (when applicable): [ORC § 2315.18](https://codes.ohio.gov/ohio-revised-code/section-2315.18)
- Wrongful death: [ORC § 2125.01](https://codes.ohio.gov/ohio-revised-code/section-2125.01)

## Practical steps after an injury

- Get appropriate medical care and follow up.
- Preserve evidence (photos, video, witnesses, incident reports).
- Avoid guesswork about deadlines; confirm the applicable limitations period early.
- Be cautious about recorded statements to insurers without advice.

If you were injured in Delaware or Franklin County and want a case-specific evaluation, contact Mango Law for a confidential consultation.

---

*This article is for educational purposes and does not constitute legal advice. Ohio personal injury law is complex and fact-specific. Consult with a qualified Ohio attorney about your situation.*`,
    category: 'Personal Injury',
    date: '2024-12-04',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code § 2315.33 (Comparative negligence)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2315.33',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2305.10 (Statute of limitations; bodily injury)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2305.10',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2315.18 (Noneconomic damages cap)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2315.18',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2125.01 (Wrongful death)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2125.01',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'assault-domestic-violence-defense-ohio',
    title: 'Assault and Domestic Violence Defense in Ohio: Understanding ORC sections 2903.13, 2919.25, and Protection Orders',
    excerpt: 'A conservative overview of Ohio assault and domestic violence allegations: what varies by case, common statutes involved, and how protection orders can affect strategy.',
    imageUrl: '/images/generated/blog-assault-domestic-violence.png',
    content: `Assault and domestic violence allegations can move quickly in Ohio, especially if a protection order is involved. The exact charge level, penalties, and collateral consequences depend on the specific statute, the alleged conduct, the relationship between the parties, and your prior record.

## What Varies (case to case)

- the relationship category (including whether the state alleges a “family or household member” relationship)
- injury allegations and medical evidence
- self-defense / defense of others issues
- 911 calls, body-cam, and witness credibility
- whether a protection order was issued and what it requires
- prior convictions and how they affect charging and sentencing
- collateral consequences (employment, professional licensing, firearms)

## Common statutes involved (primary sources)

- Assault: [ORC § 2903.13](https://codes.ohio.gov/ohio-revised-code/section-2903.13)
- Felonious assault: [ORC § 2903.11](https://codes.ohio.gov/ohio-revised-code/section-2903.11)
- Domestic violence: [ORC § 2919.25](https://codes.ohio.gov/ohio-revised-code/section-2919.25)
- Aggravated menacing: [ORC § 2903.21](https://codes.ohio.gov/ohio-revised-code/section-2903.21)

## Protection orders (CPOs)

Civil protection orders in domestic violence cases are governed by [ORC § 3113.31](https://codes.ohio.gov/ohio-revised-code/section-3113.31). If a court order is issued, take the terms seriously and avoid any contact that could be viewed as a violation.

## Defense themes (high-level)

Depending on the facts, defense work often focuses on:
- preserving and reviewing video and communications
- documenting injuries (including injuries to the accused)
- challenging timelines and identification
- litigating Fourth/Fifth Amendment issues when relevant
- negotiating for charge reductions or non-conviction outcomes where available

If you’re facing an assault or domestic violence allegation in Delaware or Franklin County, contact Mango Law for a confidential consultation.

---

*This article is for educational purposes and does not constitute legal advice. Ohio assault and domestic violence law is complex and fact-specific. Consult with a qualified Ohio attorney about your situation.*`,
    category: 'Criminal Defense',
    date: '2024-12-03',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Ohio Revised Code § 2903.13 (Assault)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2903.13',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2903.11 (Felonious assault)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2903.11',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2903.21 (Aggravated menacing)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2903.21',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 2919.25 (Domestic violence)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-2919.25',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 3113.31 (CPOs)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-3113.31',
        type: 'primary',
      },
      {
        label: '18 U.S.C. § 922 (Firearms prohibitions)',
        url: 'https://www.law.cornell.edu/uscode/text/18/922',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'ohio-dui-checkpoint-hotspots',
    title: 'Ohio DUI Checkpoints: Legality, What to Expect, and Your Rights',
    excerpt: 'A conservative, rights-focused guide to sobriety checkpoints in Ohio: when they’re legal, what the process looks like, and how to protect yourself.',
    imageUrl: '/images/generated/blog-checkpoint-hotspots.png',
    content: `## Introduction

Sobriety checkpoints (sometimes called DUI/OVI checkpoints) are planned stops where officers briefly screen drivers for impairment. Practices vary by agency, and not every checkpoint is announced in advance.

This guide focuses on what matters most: the legality standards, what typically happens at a checkpoint, and your rights. For publicly announced checkpoints we’ve collected, see our [Ohio DUI Checkpoint Map](/resources/dui-checkpoints).

## Are DUI checkpoints legal in Ohio?

Under U.S. Supreme Court case law, sobriety checkpoints can be constitutional when they are designed for roadway safety and run under a neutral, planned procedure (see *Sitz*). But checkpoints can’t be used as a general crime-control dragnet (see *Edmond*). Ohio-specific requirements and local practices can be nuanced, so treat online summaries as a starting point and confirm details for your case.

	## How checkpoints are planned (high-level)
	
	Agencies typically choose checkpoint locations and timing based on safety goals and operational constraints. Common considerations include traffic flow, staffing, safety of the stop location, and event/holiday scheduling.

	Common factors agencies consider include:
	- traffic flow and safety of the stop location
	- staffing and equipment
	- timing around holidays/events
	- operational and funding constraints

## Where checkpoints happen (varies)

Checkpoint locations and frequency can vary widely by agency and season. Our map includes only publicly announced checkpoints we’ve collected, and it is not a prediction tool.

## What to Expect at an Ohio DUI Checkpoint

### How Checkpoints Operate

To be lawful, checkpoints are generally run under a neutral plan and marked so drivers can safely navigate the stop. The precise rules and best defenses can be fact-specific, so if something about a checkpoint seemed unsafe or arbitrary, talk to an attorney about the details.

### Initial Screening

When you approach a checkpoint:
1. **Slow down** and follow officer instructions
2. **Roll down your window** and provide license and registration when asked
3. **Expect brief questions**: You may be asked where you're coming from or whether you've been drinking. You can keep responses minimal or choose not to answer.
4. **Brief interaction**: The goal is typically a short screening unless officers believe further investigation is needed

### Signs Officers Look For

During the initial stop, officers observe:
- Odor of alcohol or marijuana
- Bloodshot or glassy eyes
- Slurred speech
- Open containers or drug paraphernalia
- Nervousness or erratic behavior

If officers suspect impairment, they may direct you to a secondary screening area for additional questioning and possible field sobriety tests.

	## Your Rights at a DUI Checkpoint

	### Stopping and directions

	At a checkpoint you’re generally expected to follow posted signs and officer signals. Avoiding a checkpoint can result in a stop if you commit a traffic violation or other facts create reasonable suspicion.

	### Documents

	Officers may request a driver’s license, registration, and proof of insurance, similar to other traffic stops.

### You Do Not Have to Answer Questions

Beyond identifying yourself and providing documents, you are not required to answer questions about:
- Where you've been
- Whether you've been drinking
- What you've consumed

Politely declining to answer is legal. Example: "Officer, I prefer not to answer questions."

### You Can Refuse Field Sobriety Tests

In Ohio, field sobriety tests (walk-and-turn, one-leg stand, horizontal gaze nystagmus) are generally **voluntary**. Refusing a field sobriety test does not, by itself, trigger the same implied-consent administrative suspension as refusing a chemical test, but officers may consider refusal along with other observations. For more information, read our guide on [Refusing Field Sobriety Tests in Ohio](/blog/refuse-field-sobriety-test-ohio).

### Refusing Chemical Tests Has Consequences

If arrested and asked to submit to a breath, blood, or urine test, refusal can trigger an administrative license suspension under Ohio's implied consent law. The length and consequences can depend on your history and the circumstances, and the administrative process is separate from the criminal case.

## What varies by county and agency

Checkpoint practices can vary, including:
- How (and whether) the agency publicizes the checkpoint ahead of time
- How the checkpoint plan is documented and supervised
- What the initial screening questions look like
- How secondary screening decisions are made and recorded
- Local prosecutor policies and court practices

## What to Do If You're Arrested at a Checkpoint

If you are arrested for OVI at a checkpoint:

1. **Remain calm and polite**: Do not argue with officers or resist arrest
2. **Do not make statements**: Exercise your right to remain silent and request an attorney
3. **Request a lawyer immediately**: Say, "I want to speak with my attorney before answering questions"
4. **Document everything**: Note the checkpoint location, time, officer names, and any irregularities
5. **Contact an experienced OVI attorney**: Early legal intervention can make a significant difference in your case

In some checkpoint cases, defense strategy can include challenging:
- Whether the checkpoint was operated under a neutral plan
- Whether secondary screening escalated without sufficient grounds
- The conditions and administration of field sobriety tests
- The administration, documentation, and reliability of chemical testing

## Safer planning

The safest way to handle checkpoints is to plan not to drive impaired:
- Use a designated driver, rideshare, taxi, or public transit when drinking
- If you’re unsure whether you’re safe to drive, err on the side of not driving
- Treat checkpoint announcements as incomplete and non-predictive; our [Ohio DUI Checkpoint Map](/resources/dui-checkpoints) includes only publicly announced checkpoints we’ve collected

## Conclusion

Checkpoint practices change and vary by agency. Focus on safety, keep the interaction calm and brief, and protect your rights. If you were arrested at a checkpoint, get legal advice quickly—early review can matter.

---

*This article is for educational purposes and does not constitute legal advice. DUI checkpoint laws and procedures are subject to change. For case-specific guidance, consult with a qualified Ohio OVI defense attorney.*`,
    category: 'OVI/DUI Defense',
    date: '2024-12-08',
    author: 'Dominic Mango',
    lastVerified: '2025-12-17',
    sources: [
      {
        label: 'Michigan Dept. of State Police v. Sitz, 496 U.S. 444 (1990)',
        url: 'https://supreme.justia.com/cases/federal/us/496/444/',
        type: 'primary',
      },
      {
        label: 'City of Indianapolis v. Edmond, 531 U.S. 32 (2000)',
        url: 'https://supreme.justia.com/cases/federal/us/531/32/',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 4511.191 (Implied consent; ALS)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.191',
        type: 'primary',
      },
    ],
  },
];
