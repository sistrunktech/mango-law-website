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
    slug: 'bond-jail-information-delaware-county-ohio',
    title: 'Bond & Jail Information in Delaware County, Ohio',
    excerpt: 'If someone is arrested for OVI or another charge in Delaware County, this guide explains how bail works in Ohio and how to post bond to secure a release.',
    imageUrl: '/images/generated/criminal-defense-hero.png',
    content: `Delaware County citizens regularly ask what happens if someone is arrested for an OVI or another criminal charge. This guide answers two practical questions: **how a judge decides release conditions (bail)** and **how to post bond in Delaware County to secure a loved one’s release**.

## Bail vs. bond (what people mean)

**Bail** is the set of release conditions the court orders to help ensure the accused returns to court and to address safety risks. Bail can involve money, but it can also include non-financial conditions.

**Bond** is the mechanism used to satisfy the bail order (for example, signing a recognizance bond, posting a cash/deposit bond, or using a surety/bondsman).

## How Ohio courts decide bail

In Ohio, judges typically consider factors such as:

- the seriousness of the charge(s)
- community ties (work, family, housing)
- criminal history and prior failures to appear
- safety concerns and any alleged threats to victims or witnesses

Ohio law allows release on recognizance in appropriate cases, and it also allows more restrictive conditions when necessary. In limited circumstances, courts may order detention without bail after making required findings under Ohio law.

## Common bond types in Ohio

### Recognizance bond (O.R./ROR)

Often the least restrictive option. The person is released based on a written promise to appear (and any conditions the judge imposes). No cash deposit is required.

### Cash / deposit (“10%”) bond

In many courts, a judge may permit a **deposit bond** where a portion of the bail amount (commonly described as “10%”) is deposited with the clerk. Whether any part is refunded and whether costs/fees are deducted depends on court orders and local practice.

### Surety bond (bail bondsman)

A surety bond is posted through a licensed bonding company. The bondsman typically charges a **non-refundable fee**. If the defendant fails to appear, the bondsman can be required to pay the bond and may pursue the defendant under applicable law and contract terms.

## How to post bond in Delaware County

The Delaware County Sheriff’s Office publishes guidance for families on its **Inmates** page. In short: **bond is paid at the Delaware County Municipal Court building (not at the jail)**.

- **Delaware County Municipal Court**: 70 N. Union St., Delaware, OH 43015

After bond is paid and the court processes the release, the jail must receive the proper paperwork before release. The Sheriff’s Office notes the process can take **up to four hours**, depending on the court’s caseload.

## Step-by-step: posting bond for a loved one

1. **Confirm the bond amount and type.** Use the case number (if you have it) and call the clerk to confirm the amount and what kind of bond is required.
2. **Decide how you’ll post bond.** Depending on the judge’s order, you may be able to post a cash/deposit bond, or you may need a surety agent.
3. **Go to the court with ID and payment.** Call ahead to confirm accepted payment methods and hours.
4. **Wait for release processing.** Release timing varies; it can take hours after the jail receives the court’s paperwork.

## Important local contact information

- **Delaware County Municipal Court Clerk**: 70 N. Union St., Delaware, OH 43015 • (740) 203-1550
- **Delaware County Sheriff’s Office Jail**: 844 U.S. Rt. 42 N., Delaware, OH 43015 • (740) 833-2840

## Additional notes

- **Surety bond fees aren’t refundable.** Paying a bondsman is typically a fee-based service.
- **Recognizance depends on the judge’s assessment.** It’s usually reserved for lower-risk situations.
- **Release conditions can include restrictions.** Courts may impose conditions like no-contact orders, electronic monitoring, or travel restrictions.

## Conclusion

Understanding bail and bond can reduce stress and help your family move faster after an arrest. If you have questions about the bond order, court dates, or how to protect someone’s rights after an arrest, talk to a criminal defense attorney as early as possible.`,
    category: 'Criminal Defense',
    date: '2025-12-18',
    author: 'Dominic Mango',
    lastVerified: '2025-12-18',
    sources: [
      {
        label: 'Ohio Crim.R. 46 (Bail)',
        url: 'https://www.supremecourt.ohio.gov/docs/LegalResources/Rules/criminal/criminalprocedure.pdf',
        type: 'primary',
      },
      {
        label: 'Ohio Constitution, Article I, Section 9 (Bail)',
        url: 'https://codes.ohio.gov/ohio-constitution/section-1.9',
        type: 'primary',
      },
      {
        label: 'Delaware County Sheriff’s Office: Inmates (bond + release processing notes)',
        url: 'https://sheriff.co.delaware.oh.us/inmates/',
        type: 'primary',
      },
      {
        label: 'Delaware County Municipal Court (online portal)',
        url: 'https://connect.municipalcourt.org/AWC/court/',
        type: 'primary',
      },
      {
        label: 'Delaware County Clerk of Courts (Bail bond agents)',
        url: 'https://clerkofcourts.co.delaware.oh.us/',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'understanding-ovi-dui-charges-ohio',
    title: 'Understanding OVI/DUI Charges in Ohio: What You Need to Know',
    excerpt: 'Complete guide to Ohio OVI charges including penalties, defense strategies, and how to protect your record. Learn about ORC § 4511.19 and what to do if arrested.',
	    imageUrl: '/images/generated/blog-ovi-charges.png',
		    content: `## Introduction

Operating a vehicle while impaired (OVI) is the Ohio term for what many states call DUI. Ohio uses OVI to cover alcohol, drugs, or a combination of both. This guide explains how Ohio defines OVI, how cases are built, and what tends to vary by court so you can verify the law and make informed decisions.

## What OVI means in Ohio

Ohio's core OVI statute is [ORC 4511.19](https://codes.ohio.gov/ohio-revised-code/section-4511.19). It prohibits operating a vehicle while impaired and sets out prohibited concentration categories. The exact thresholds and penalty subsections are statutory and can be updated, so confirm the current text in the statute.

[VISUAL:OVI_VS_PHYSICAL_CONTROL]

Physical control is a separate statute under [ORC 4511.194](https://codes.ohio.gov/ohio-revised-code/section-4511.194). The distinction matters because the elements and penalties differ, and defense strategy can change depending on which charge you face.

## Impairment vs per se categories

Ohio can charge an OVI based on observed impairment or based on a prohibited concentration category. In some cases the state relies heavily on testing, while in others it relies on officer observations and driving behavior. The defense analysis changes depending on which theory the state is pursuing and how the evidence was collected.

## What counts as operating

Whether someone was "operating" a vehicle is a fact-specific issue. The analysis can involve where the vehicle was located, whether it was running, and whether the person was in control of the vehicle. If the facts are closer to "physical control" than "operation," the charge and the penalties can change.

## Alcohol OVI vs drug OVI

Alcohol cases often rely on chemical testing and standardized field sobriety tests. Drug OVI cases can involve prescription medications, marijuana, or other controlled substances. Drug cases may rely more heavily on officer observations, drug recognition protocols, and toxicology testing. The approach to defense can change depending on the substance alleged.

## How Ohio proves an OVI

Most OVI cases are built on a combination of:
- driving behavior and the traffic stop reason
- officer observations (speech, coordination, odor, admissions)
- field sobriety test performance
- chemical testing results or refusal

No single factor decides a case. Courts evaluate the totality of the evidence, which is why detailed records and video are important.

## The traffic stop and roadside investigation

The stop must be supported by lawful grounds. Courts evaluate the specific facts of the stop and the officer's observations. If the stop is not supported by reasonable suspicion, suppression may be possible.

[VISUAL:RIGHTS_HIGHLIGHT]

## Field sobriety tests (SFST)

Ohio officers use standardized field sobriety tests based on NHTSA guidance. These tests can be challenged when conditions are poor, instructions are inconsistent, or the officer deviates from protocol. For a focused discussion, see [Refusing Field Sobriety Tests in Ohio](/blog/refuse-field-sobriety-test-ohio).

## Preliminary breath tests (PBT)

In some stops, an officer may use a handheld preliminary breath test. PBTs are different from evidentiary breath tests at the station. They are typically treated as preliminary investigative tools, and the accuracy or use of the device can be a point of challenge depending on the facts.

## Chemical testing and implied consent

Ohio's implied consent law is in [ORC 4511.191](https://codes.ohio.gov/ohio-revised-code/section-4511.191). Refusing a chemical test can trigger an administrative license suspension (ALS) even before a criminal case ends. The testing rules are governed in part by [Ohio Admin. Code 3701-53-05](https://codes.ohio.gov/ohio-administrative-code/rule-3701-53-05), which is often the source for suppression arguments when procedures are not followed.

## Breath vs blood vs urine

Each testing method has its own rules and practical issues. Breath tests are common in roadside or station settings, blood tests require proper collection and chain of custody, and urine tests are used less frequently. When test results are central to the case, the testing method and compliance with procedures can be decisive.

## Blood draws and warrants

Blood draws can raise additional issues, including whether consent was voluntary and whether a warrant was obtained when required. The way the sample is collected, stored, and tested can matter. Chain-of-custody issues and lab procedures are common topics in OVI defense work.

## OVI without chemical testing

Some cases proceed without chemical results. In those matters, the state often relies on driving behavior, officer observations, admissions, and video. Defenses frequently focus on the legitimacy of the stop, the reliability of observations, and whether the state can prove impairment beyond a reasonable doubt without test results.

## Timing and rising BAC issues

Alcohol absorption is time-dependent. The timing between driving, the stop, and the test can affect how results are interpreted. In some cases, the defense may evaluate whether a rising BAC theory is plausible based on the timeline and other evidence. This analysis is fact-specific and often requires expert review.

## Refusal decisions and ALS challenges

A chemical test refusal can trigger an ALS, but the statutory and procedural requirements must be met. Courts may review whether the officer properly advised the driver of consequences and whether the refusal was recorded correctly. These issues can affect both the criminal case and the administrative suspension.

## Criminal penalties (overview)

Penalty ranges and mandatory terms are set by statute and depend on:
- offense level and prior history
- test category (including refusal or high-test allegations)
- whether aggravating factors apply

If you need the detailed ranges, review the applicable subsections in ORC 4511.19 with counsel and compare them to your certified record.

## Cost and penalty structure (varies by case)

When evaluating practical exposure, separate costs into consistent buckets:
1) mandatory statutory penalties (fines, minimum terms, suspension ranges)
2) administrative and BMV consequences (reinstatement fees, SR-22 requirements)
3) common case costs (programs, probation, monitoring, assessments)
4) scenario-dependent costs (high-test, refusal, priors, interlock)
5) market estimates (attorney fees and insurance impact)

[VISUAL:OVI_COSTS]

## Administrative license suspension (ALS)

ALS is an immediate, administrative suspension tied to test results or refusal. Privileges, interlock, and timing vary based on history and court practice. Always check the current statutory categories in ORC 4511.191 and confirm your record details.

## Interlock, restricted plates, and privileges

Some cases involve ignition interlock or restricted plates as conditions for driving privileges. The timing and requirements can differ by court. A local attorney can explain whether interlock is mandatory, optional, or part of a negotiated outcome in the relevant county.

## Treatment and assessment expectations

Many courts require assessments, treatment, or education programs. The scope of those requirements can vary based on prior history, test category, and the court's local policies. These requirements are important when evaluating the total cost and timeline of a case.

## Diversion and specialty courts

Some counties offer diversion programs or specialized dockets for eligible cases. Eligibility rules and required admissions differ by court. If a diversion option is available, the timing of that decision can be crucial for both strategy and eligibility.

## Lookback and repeat offenses

Ohio uses lookback windows for repeat offenses. The analysis is record-specific, and even small date differences can change how an offense is classified. See the deeper guide on [Ohio DUI Lookback Period](/blog/ohio-dui-lookback-period).

[VISUAL:LOOKBACK_TIMELINE]

[VISUAL:LOOKBACK_SCENARIOS]

## What varies by county and court

Local practice matters in OVI cases. Differences often include:
- bond and pretrial release conditions
- availability and structure of diversion or treatment programs
- sentencing preferences and interlock requirements
- local plea norms and typical case timelines
- how quickly ALS appeals or privilege motions are scheduled

## Why local context matters

Two cases with similar facts can resolve differently in practice based on court culture and local policies. Understanding the judge's preferences, the prosecutor's approach, and the county's treatment options helps set realistic expectations and improves strategy decisions.

## Defense strategy overview

Defenses typically focus on the stop, testing, and the specific statutory elements the state must prove.

[VISUAL:DEFENSE_STRATEGIES]

Common themes include suppression motions, testing challenges, record-based arguments about priors, and negotiating alternatives when appropriate.

## Sentencing factors courts consider

Courts often consider the full record, the nature of the stop, and whether aggravating factors are alleged. They also consider local sentencing norms and treatment availability. Understanding those factors helps attorneys craft a realistic strategy for the case.

## Discovery and expert review

OVI cases often involve technical records, including calibration logs, operator permits, and lab records. Defense counsel may request these records and compare them to statutory and administrative rules. Experts can help evaluate whether testing procedures and results are reliable in the specific case.

## Negotiation and resolution paths

Many cases resolve by plea, but the available options can vary based on the strength of the evidence, the client's record, and the court's approach. The goal is to assess risk, identify legal issues, and pursue the best outcome the facts allow.

## Evidence and records to preserve

If you are charged, preserve:
- citation and court paperwork
- body cam or dash cam references
- names of witnesses and passengers
- receipts or timeline notes that explain your location
- medical information that could affect testing or appearance

An attorney can request additional records, including calibration logs and maintenance history for testing devices.

## What to expect after arrest

Most OVI cases move quickly at the beginning. You may face an ALS, bond conditions, and a first court date within a short window. Early decisions about driving privileges, interlock, and testing challenges can shape the entire case strategy.

## Bond conditions and compliance

Courts may impose no-driving orders, alcohol restrictions, or monitoring conditions as part of bond. Compliance with these terms is critical. Even minor violations can affect release status or negotiation posture, so take bond terms seriously and document any compliance steps.

## Consultation checklist

Before a first consultation, it helps to gather:
- the citation and any court paperwork
- a rough timeline of where you were and when you drove
- names of any passengers or witnesses
- any medical or prescription information that could affect testing

## Case timeline (typical sequence)

While every case is different, many OVI cases follow a similar progression:
1) arrest and booking
2) administrative license suspension starts
3) arraignment and initial court orders
4) discovery, motions, and evidentiary review
5) resolution by plea, dismissal, or trial

## Special categories to flag

Some cases involve additional categories such as under-21 drivers, commercial driver considerations, or alleged high-test results. The rules and consequences can differ, so verify the current statute and local practice before relying on general summaries.

## Crash and injury cases

If an OVI involves a crash or injury allegations, the stakes can change dramatically. These cases can involve additional charges and additional investigative steps. The strategy often becomes more complex, and early legal review is critical.

## Checkpoints and data sources

OVI checkpoints are legal in Ohio when properly run. If your case involves a checkpoint, documentation and compliance with guidelines can matter. See the [DUI checkpoint map](/resources/dui-checkpoints) for Ohio locations and context.

## Common misconceptions

- assuming a refusal ends the case
- assuming all OVI cases use the same penalties
- assuming a prior is outside the window without checking dates
- assuming SFST results are always reliable
- assuming a case cannot be challenged if testing was taken
- assuming early cooperation guarantees dismissal
- assuming every court handles privileges the same way

## Collateral consequences

An OVI conviction can affect employment, professional licensing, insurance, and travel. These impacts often matter as much as court penalties, and they vary based on your record and occupation.

## CDL and professional driver impact

Commercial drivers often face separate administrative rules and employer policies. A single OVI can affect CDL status, job eligibility, and insurance coverage. If you drive for work, factor those consequences into the strategy early.

## Insurance and SR-22 considerations

Insurance rates often increase after an OVI, and some cases require proof of financial responsibility. The timing and cost of those requirements vary, but they are part of the real-world impact of an OVI case.

## Travel and background checks

Some clients worry about travel or professional background checks. The impact depends on the outcome and the type of travel or licensing involved. Ask counsel how a specific outcome might affect your needs.

## Record sealing and long-term planning

Some convictions can be sealed under Ohio law, while others have limits. OVI-related outcomes often require a careful eligibility review. If a clean record matters for employment or licensing, discuss long-term record planning with counsel early.

## Professional licensing and work impact

Many professional boards ask about criminal convictions, and some employers have driving-related requirements. If your job involves a company vehicle, deliveries, or travel, an OVI can create immediate workplace issues that should be discussed with counsel as part of the overall strategy.

## Questions to ask your attorney

- Which statutory subsection is the state using and why?
- What records support the stop, testing, and offense timeline?
- How does local court practice affect privileges and plea options?
- Are any testing or documentation issues likely to be challenged?

## Conclusion

OVI law is fact-specific and procedure-driven. The best defense starts with the record, the statute, and the exact facts of the stop and testing. If you are facing an OVI charge, consult counsel quickly to verify the statutory category, the record details, and the local court practices that can change outcomes.

---

This article is for educational purposes and does not constitute legal advice. Outcomes vary by facts, record history, and court practice.

If you need help in Delaware or Franklin County, contact Mango Law for a confidential consultation.
`,
    category: 'OVI/DUI Defense',
    date: '2024-12-01',
    author: 'Dominic Mango',
	    lastVerified: '2025-12-27',
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
        label: 'Ohio Revised Code § 4511.194 (Physical control)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.194',
        type: 'primary',
      },
      {
        label: 'Ohio BMV: Reinstatement fees',
        url: 'https://www.bmv.ohio.gov/dl-reinstatement-fees.aspx',
        type: 'primary',
      },
      {
        label: 'Ohio Traffic Safety Office (campaigns and enforcement guidance)',
        url: 'https://otso.ohio.gov/',
        type: 'primary',
      },
      {
        label: 'NHTSA: Standardized Field Sobriety Testing (SFST)',
        url: 'https://www.nhtsa.gov/dwi-detection-and-standardized-field-sobriety-test-sfst',
        type: 'guide',
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

	**Contact Mango Law at (740) 417-6191** for a confidential consultation. We'll review your case, identify motion opportunities, and explain realistic options based on the record.

## Additional Resources

- [Ohio Rules of Criminal Procedure](https://www.supremecourt.ohio.gov/LegalResources/Rules/criminal/CriminalProcedure.pdf)
- [Ohio Rules of Evidence](https://www.supremecourt.ohio.gov/LegalResources/Rules/evidence/EvidenceRules.pdf)
- [Ohio Revised Code § 2945.71 (Speedy Trial)](https://codes.ohio.gov/ohio-revised-code/section-2945.71)
- [U.S. Supreme Court - Criminal Procedure Cases](https://www.supremecourt.gov/)`,
    category: 'Criminal Defense',
    date: '2024-11-28',
    author: 'Dominic Mango',
    lastVerified: '2025-12-27',
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
    lastVerified: '2025-12-27',
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
    lastVerified: '2025-12-27',
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
    content: `Field sobriety tests are a common part of an OVI stop in Ohio, but many drivers do not know what the tests are, how they are used, or whether they are required. This guide explains the basics, what refusing means, and where local practice can change outcomes.

## What field sobriety tests are

Standardized field sobriety tests (SFSTs) are the set of roadside coordination tests taught under NHTSA guidance. The common tests include:
- horizontal gaze nystagmus (HGN)
- walk-and-turn
- one-leg stand

Officers use these tests to look for clues of impairment, but results are still subject to interpretation and the conditions of the stop.

## Are field sobriety tests required in Ohio

Field sobriety tests are generally voluntary in Ohio. Refusing them is not the same as refusing a chemical test under implied consent. That said, an officer can still note a refusal and rely on other observations in a decision to arrest.

[VISUAL:FST_REFUSAL_COMPARISON]

## Field tests vs chemical tests

Chemical testing is governed by implied consent under [ORC 4511.191](https://codes.ohio.gov/ohio-revised-code/section-4511.191). A chemical refusal can trigger an administrative license suspension. Field sobriety tests do not trigger that administrative suspension on their own, but they can still influence the officer's decision-making.

[VISUAL:CHEMICAL_VS_FST_COMPARISON]

## How SFSTs are scored

Officers are trained to look for specific cues or "clues" during each test. The scoring is not a medical diagnosis; it is a checklist of observations. If the environment or instruction is inconsistent, the reliability of the scoring can be challenged.

## Quick overview of each test

HGN involves observing eye movements while a person follows a stimulus. The walk-and-turn and one-leg stand evaluate balance and divided attention. Each test has a specific instruction sequence and timing. Deviations from that sequence can change how the results should be interpreted.

## HGN details

HGN is often described as the most technical of the SFSTs because it depends on proper positioning, timing, and observation. Lighting, movement, and the subject's vision can affect what the officer sees. Defense counsel often review video and documentation to confirm the test was conducted consistently with training.

## Walk-and-turn and one-leg stand details

These two tests are sensitive to conditions. Uneven pavement, weather, footwear, or simple nervousness can influence performance. The instructions matter because even small changes in how the test is explained can change how a person performs.

## Why SFST results are challenged

Defense attorneys often challenge SFST evidence because the tests are sensitive to conditions and method. Common issues include:
- uneven surfaces or poor lighting
- unclear instructions or inconsistent scoring
- medical conditions, fatigue, or injuries
- footwear, weather, or traffic distractions
- deviations from standardized procedures

[VISUAL:REFUSAL_STATS]

## What refusing does (and does not do)

Refusing SFSTs does not create a chemical-test penalty by itself, but it also does not prevent an arrest. Officers can still rely on driving behavior, admissions, and other observations. The decision often turns on the totality of circumstances.

## What officers document

In most cases, officers document:
- driving behavior that led to the stop
- physical observations and statements
- whether SFSTs were offered and how you responded
- any field test performance or refusal
- any chemical test results or refusal

These details become the factual basis for the case, which is why the quality and accuracy of reporting matters.

## Preliminary breath tests and admissions

Some stops include a handheld preliminary breath test. A PBT is not the same as an evidentiary breath test at the station, but it can still influence an officer's decision. Admissions about drinking can also be cited, which is why most defense reviews focus on the totality of observations rather than one single factor.

## Medical and environmental factors

Balance issues, injuries, anxiety, fatigue, and certain medical conditions can affect SFST performance. Weather, lighting, and surface conditions can also matter. These factors do not automatically resolve a case, but they can be important in evaluating the reliability of SFST evidence.

## Drug impairment considerations

In drug OVI cases, officers may use a different set of observations and drug recognition protocols. SFSTs can still be used, but the analysis often focuses on the totality of symptoms rather than a single test result.

## What varies by county and court

Local practice matters for how SFSTs are treated:
- some courts are more skeptical of SFST evidence
- some prosecutors focus heavily on body-cam compliance
- plea and diversion availability can shift the practical leverage
- timelines for suppression motions vary by court

## Defense considerations

Common defense themes include:
- lack of reasonable suspicion for the stop
- improper SFST administration under NHTSA standards
- medical or physical conditions affecting performance
- inaccurate or incomplete reporting of clues
- inconsistent video or missing documentation

If you want a broader view of OVI law and penalties, see [Understanding OVI/DUI Charges in Ohio](/blog/understanding-ovi-dui-charges-ohio).

## How SFSTs show up in court

In many cases, SFST evidence is presented through officer testimony and video. Defense attorneys often compare testimony to body-cam footage and evaluate whether the officer followed standardized procedures. When the video is inconsistent with the report, it can change the weight of the evidence.

## SFST admissibility and foundation

Courts often expect the state to lay a foundation for SFST evidence. That foundation can involve training, method, and compliance with standardized procedures. If the foundation is weak, the weight of the SFST evidence can be reduced or challenged.

## How attorneys use NHTSA materials

NHTSA training materials outline how tests should be administered and scored. Defense attorneys compare the officer's actions to those standards. When the procedure deviates from the standard, it can weaken the reliability of the evidence.

## What to request in discovery

Common requests include:
- body-cam and dash-cam footage
- incident reports and SFST score sheets
- dispatch logs and timing information
- calibration records for any testing devices

This documentation can clarify whether the SFSTs were administered under appropriate conditions.

## Why some drivers decline tests

Some drivers decline SFSTs because they are nervous, have medical issues, or do not believe they can perform well on the roadside. Others decline because they want to avoid generating additional evidence. The outcome still depends on the totality of circumstances, so refusal is not a guaranteed outcome in either direction.

## What to remember at the stop

This is not legal advice, but it is common for people to:
- stay calm and polite
- avoid volunteering extra details
- keep responses brief

Your specific situation may require different decisions, so discuss your case with counsel.

## Practical next steps after an arrest

- Write down your timeline while details are fresh
- Keep any medical records that may explain testing performance
- Preserve receipts or location records that support your timeline
- Bring all paperwork to your attorney early

## Common questions

- Can an officer arrest me without SFSTs? In some cases, yes, depending on the totality of observations.
- Do SFSTs prove a specific BAC? No. They are observational tools, not chemical tests.
- Does refusing guarantee dismissal? No. It changes the evidence, but does not end the case.

## Conclusion

Field sobriety tests are only one part of an OVI case. Whether you complied or refused, the case still depends on the legality of the stop, testing procedures, and what the state can prove. An attorney can evaluate the record and identify suppression issues early.

---

This article is for educational purposes and does not constitute legal advice. Consult a qualified Ohio OVI attorney about your situation.
`,
    category: 'OVI/DUI Defense',
    date: '2024-12-07',
    author: 'Dominic Mango',
    lastVerified: '2025-12-27',
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
    content: `If you are facing an OVI and have any prior history, the lookback analysis is one of the first things to confirm. Whether a prior counts can change the charge level, sentencing range, and license consequences.

## What is the lookback period

The lookback period (sometimes called the washout window) is the timeframe during which prior OVI convictions are counted for enhanced penalties under [ORC 4511.19](https://codes.ohio.gov/ohio-revised-code/section-4511.19). The exact rule is statutory and can change, so confirm the current law and your certified record rather than relying on older summaries.

[VISUAL:LOOKBACK_TIMELINE]

## How the lookback is calculated

The analysis often turns on the date of the offense, not just the conviction date. Prosecutors typically use:
- certified BMV driving records
- court dockets and prior case paperwork
- out-of-state records when applicable

If any dates or records are missing or inconsistent, the lookback classification can change. This is one of the most common areas for factual disputes.

## Offense date vs conviction date

Many people assume the conviction date is what matters, but the statute focuses on the offense timeline. A difference of weeks or months can change how a prior is classified. Always compare offense dates against the statutory window.

## Step-by-step lookback review

A typical review starts with the BMV record, then matches each alleged prior to a court case file. The goal is to confirm the offense date, the statute of conviction, and the disposition. Small date errors matter later in court. If any of those pieces are missing, the classification may be challenged.

## Build a date table

It can help to build a simple table with each offense date, disposition date, and statute. Seeing the dates side by side makes it easier to confirm whether a prior falls inside or outside the statutory window and helps identify record gaps early. It also helps reconcile BMV entries with court records before the first hearing more quickly.

## What counts as a prior

Common categories that can be counted include:
- prior Ohio OVI convictions
- out-of-state DUI equivalents
- physical control convictions under [ORC 4511.194](https://codes.ohio.gov/ohio-revised-code/section-4511.194)
- certain amended pleas that still qualify under the statute

[VISUAL:LOOKBACK_SCENARIOS]

## What typically does not count

Examples can include:
- completed diversions that were dismissed
- charges reduced without an OVI conviction
- offenses that fall outside the statutory window

## Amended pleas and equivalent offenses

Some older cases were amended to a different traffic or alcohol-related offense. Whether those count as priors depends on how the statute defines qualifying offenses. This is why it matters to pull the actual judgment entry instead of relying on a summary or memory of the charge.

## Out-of-state and municipal records

Out-of-state priors can count, but the analysis usually depends on whether the other state offense is equivalent under Ohio law. Municipal court records also matter. If the documentation is incomplete, the classification can be contested.

## Moving from another state

If you moved to Ohio, the state may still rely on out-of-state records. That means it is important to identify the other state's statute and how it aligns with Ohio's OVI statute. An attorney can compare the elements to see whether the prior qualifies.

## Multiple priors close in time

Sometimes multiple cases occur within a short period of time, or two cases overlap in the window. The order of offenses and dispositions can affect how the state classifies the current charge. Confirm the sequence and the dates before assuming how the court will count priors.

## ALS vs criminal priors

An administrative license suspension (ALS) is not the same as a criminal OVI conviction. ALS history can still affect privileges and local court expectations, but it is typically not the same as a prior offense for statutory enhancement. Confirm the distinction with counsel using the actual record.

## How prosecutors prove priors

Common proof sources include:
- certified BMV driving records
- certified copies of the prior judgment entry
- docket entries showing offense dates
- case files showing the statutory section charged

If any of these sources are missing or inconsistent, it can change how the state classifies the case.

## Disputed priors and litigation

When a prior is disputed, the court often requires certified records to resolve the issue. Defense counsel may file motions, request additional records, or challenge whether the statutory elements match. These disputes are technical but can have major impact on outcomes.

## Records to pull early

If priors are alleged, it is common to gather:
- BMV certified driving record
- copies of prior complaints and judgments
- sentencing entries and license suspension terms
- proof of dates for the prior offense and disposition

## Why this matters

Repeat-offense status can affect:
- mandatory minimum terms
- license suspension length and eligibility for privileges
- vehicle sanctions (immobilization or forfeiture in some cases)
- monitoring requirements and treatment expectations

For a broader overview, see [Understanding OVI/DUI Charges in Ohio](/blog/understanding-ovi-dui-charges-ohio).

## High-test and refusal issues

Some cases involve additional allegations tied to test categories or refusal. The consequences are statutory and depend on history, test category, and what the state can prove. Confirm the current rules in ORC 4511.19 and ORC 4511.191.

## Cost and penalty structure (varies)

Repeat-offense cases often involve multiple cost layers:
1) statutory penalties tied to the offense level
2) administrative fees and BMV reinstatement costs
3) programs, monitoring, or treatment requirements
4) scenario-dependent costs tied to refusals or high-test allegations
5) market costs such as attorney fees and insurance impact

## How the lookback affects privileges

Repeat-offense classifications often change the timing and conditions for driving privileges and interlock. Some courts require additional documentation or assessments before granting privileges. The exact timeline is court-specific.

## Restricted plates and interlock considerations

Repeat-offense classifications can also affect whether restricted plates or ignition interlock are required. These requirements are often tied to both statute and local practice, so confirm the current court policies and any local administrative orders.

## How the lookback affects plea strategy

Prosecutors often decide whether a case is charged as a first, second, or third offense early. That classification influences plea posture and leverage. If the lookback classification is wrong, it can affect every stage of negotiation. This is why confirming the offense dates and record detail is often one of the first tasks after arrest.

## What varies by county and court

Local practice can meaningfully change outcomes:
- bond practices and pretrial conditions
- availability of diversion or problem-solving courts
- interlock expectations and timing for privileges
- plea norms and sentencing preferences
- how evidence challenges are handled and scheduled

## Defense strategy when priors are alleged

Common focus areas include:
- confirming the record and offense dates
- challenging whether a prior legally qualifies
- challenging the current stop and testing
- negotiating alternatives where the statute allows

For motion-based strategies, see [motion practice in criminal defense](/blog/motion-practice-criminal-defense).

## Practical checklist before the first court date

- Confirm the offense dates of any prior OVI cases
- Pull the BMV record and prior court paperwork
- Identify any missing records or inconsistencies
- Preserve notes about the current stop and testing

## Example scenarios (simplified)

- If a prior offense date falls just outside the statutory window, it may not be counted for repeat-offense sentencing.
- If an out-of-state conviction is not equivalent under Ohio law, it may not qualify as a prior.
- If the record is incomplete or inconsistent, the classification can change after review.

## Questions to ask your attorney

- Which prior offenses are being alleged and what documents support them?
- Are any priors outside the statutory window?
- Are any priors legally non-equivalent to Ohio OVI?
- What local court rules impact privileges or interlock timing?

## Common misconceptions

- assuming a prior automatically "falls off" without verifying offense dates
- assuming all out-of-state priors count the same way
- assuming a prior will count without verifying the exact statutory subsection

## How record errors get resolved

If the record appears incorrect, attorneys can request certified copies and compare the dates, charging sections, and disposition details. In some cases, a court or agency record does not match the actual case file, and that discrepancy can be used to challenge the classification.

## Reading a BMV record

BMV records can contain multiple entries for the same event, and they do not always show the full context of the case. A certified record should be read alongside the court file, not in isolation. That comparison is often where the most meaningful issues appear.

## Insurance and employment impact

Repeat-offense classifications often increase insurance costs and can affect employment for drivers, CDL holders, and licensed professionals. These collateral impacts are not always obvious on first review, so they should be considered alongside court penalties.

## Conclusion

Lookback analysis is not a guess. It is a record-driven, statute-driven assessment that should be verified early. Confirm the dates, confirm the statute, and confirm the local court practices that can affect how the case resolves.

---

This article is for educational purposes and does not constitute legal advice. OVI law is complex and fact-specific. Consult a qualified Ohio OVI attorney about your situation.
`,
    category: 'OVI/DUI Defense',
    date: '2024-12-07',
    author: 'Dominic Mango',
    lastVerified: '2025-12-27',
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
      {
        label: 'Ohio BMV: Driving record requests',
        url: 'https://www.bmv.ohio.gov/dl-record.aspx',
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
  {
    slug: 'holiday-ovi-enforcement-ohio-delaware-dublin-columbus',
    title: 'Holiday OVI Enforcement in Ohio: What Drivers in Delaware, Dublin, and Central Ohio Should Expect',
    excerpt: 'Ohio\'s holiday enforcement wave ramps up from mid-December through New Year\'s Day. Here\'s what\'s changing, what police are looking for, and what to do if a traffic stop turns into an OVI investigation.',
    imageUrl: '/images/generated/blog-ohio-holiday-ovi-enforcement.png',
    content: `Holiday travel in Central Ohio is not just more traffic. It is more enforcement.

Between family get-togethers, work parties, winter weather, and late-night driving, law enforcement agencies across Ohio traditionally increase patrols and OVI enforcement during the Christmas and New Year window. If you are traveling through Delaware, Dublin, Powell, Lewis Center, Westerville, Worthington, or into Columbus, assume you will see more marked cruisers, more traffic stops, and less tolerance for "close enough" driving decisions.

[VISUAL:HOLIDAY_KEY_TAKEAWAYS]

This post covers what's actually happening during the 2025 holiday season, what officers are focused on, and what to do if a routine stop starts turning into an OVI investigation.

[VISUAL:QUICK_LINKS]

> **Important**: This article is general information, not legal advice. If you are facing an OVI, the details matter. Evidence, timelines, and the exact charge level can change outcomes.

## Key takeaways

If you only read one section, read this:

- Expect heightened enforcement from mid-December through New Year's Day due to the national **Drive Sober or Get Pulled Over** push.
- Ohio agencies commonly use grant-funded overtime for targeted OVI, distracted driving, and general traffic enforcement.
- Winter conditions make "minor" driving errors look worse (and officers take them more seriously).
- Ride-voucher programs exist in some counties during the holidays. Use them if you are even close to the line.
- If you are stopped, your choices in the first 5 to 10 minutes can shape the entire case.

## Why enforcement spikes during the holidays in Ohio

The short version: more drivers + more parties + worse road conditions = higher crash risk, and agencies plan around that reality.

Local reporting around Ohio has been consistent on the same points:
- Holiday travel increases volume.
- Winter weather adds a risk multiplier.
- Alcohol and drug impairment are more common during holiday celebration windows.
- Distracted driving increases with navigation, texting, and coordination.

That combination is exactly why the national enforcement push exists, and why Ohio agencies stack overtime patrols and OVI task force activity during this period.

## What is happening right now: the 2025 holiday enforcement window

There are three overlapping layers to understand: national, statewide, and local.

### 1) National enforcement: Drive Sober or Get Pulled Over (Dec 12 through Jan 1)
NHTSA's Drive Sober or Get Pulled Over campaign runs **December 12 through January 1** for the winter holiday season. The message is not subtle, and the point is deterrence: more patrols, more stops, more impaired-driving enforcement.

### 2) Ohio grant and campaign alignment: OTSO enforcement participation
Ohio's Traffic Safety Office programming ties directly into these national enforcement windows. OTSO grant guidance materials list the winter holiday Drive Sober or Get Pulled Over period as **December 12, 2025 through January 1, 2026**, and agencies using overtime enforcement funds are expected to participate in those campaign windows.

### 3) Local agencies: targeted overtime patrols and local initiatives
This is where it becomes real for drivers.

For example, Dayton Police publicly announced increased traffic enforcement during the holiday season using grant-funded overtime for **OVI enforcement, distracted driving enforcement, and general traffic enforcement**. Their traffic supervisor specifically pointed to more enforcement not only on major highways, but across city streets as well.

Even if you never drive near Dayton, the takeaway matters for Central Ohio: local agencies across the state commonly do the same thing during the same time window, and the increased patrol visibility is the point.

## A simple table to plan your holiday driving

[VISUAL:HOLIDAY_ENFORCEMENT_TABLE]

## What officers are focused on during holiday enforcement

During holiday enforcement pushes, the "stop reasons" tend to be basic traffic issues that are easy to observe and easy to justify in a report.

[VISUAL:HOLIDAY_OFFICER_FOCUS]

### Impaired driving indicators
- Lane violations and weaving
- Rolling stops
- Wide turns
- Speed variance (too fast or unusually slow)
- Delayed reaction at lights or to braking traffic

### Distracted driving
Ohio's current distracted driving framework is stricter than many drivers assume. Local reporting has emphasized that Ohio law makes it illegal to **hold or support a phone while driving**, with limited exceptions. If you are glancing down at your phone in stop-and-go traffic on US-23, I-71, or I-270, you are giving an officer an easy reason to initiate contact.

### Speed and basic compliance (seat belts, lights, plates)
Holiday patrol periods often pair OVI enforcement with selective traffic enforcement: speeding, following too close, equipment issues, and seat belts.

Those stops are not "OVI stops" at the beginning. They become OVI investigations if the officer thinks impairment is possible.

## Local programs that can keep you out of an OVI case entirely

Some counties use holiday ride programs to prevent impaired driving. If you have a safe option that costs $0 to $20 instead of an OVI arrest, use it.

[VISUAL:HOLIDAY_RIDE_PROGRAMS]

### Montgomery County: ArriveSafe
Montgomery County's ArriveSafe program has been promoted as a holiday Uber voucher option for residents, with public reporting noting specific holiday windows and QR code redemption.

### Summit County: Arrive Alive (Lyft codes)
Summit County has also promoted an "Arrive Alive" holiday rides program with Lyft codes for Christmas and New Year's season windows. Programs like this change year to year, and codes can be time-limited, but they are worth checking if you are traveling to Northeast Ohio.

**Bottom line**: search your county prosecutor, local safety coalition, or city police social channels before you go out. If you find a ride program, screenshot it before you head out.

## The local lesson from the McGuff case

If you want a real-life Central Ohio example of how quickly a vehicle encounter can turn into an OVI-related case, read our breakdown on [OSU women's basketball coach Kevin McGuff and the physical control process in Dublin](/blog/physical-control-parked-car-ohio-kevin-mcguff).

Why include it here?
- Dublin is close to Delaware County, and many drivers move between these areas daily.
- High-profile cases generate public assumptions that are usually wrong.
- The same legal mechanics apply whether you are a coach, a student, or a parent leaving a holiday party.

If you are trying to understand "what happens next" in an OVI-related case, that post is a useful companion to this one.

## If you get pulled over: how to keep a traffic stop from turning into a disaster

This is not a "talk your way out of it" section. It is a "do not make it worse" section.

[VISUAL:HOLIDAY_STOP_TIPS]

### 1) Control the basics first
- Signal early.
- Pull over safely.
- Keep your hands visible.
- Provide license, registration, insurance.

Officers document the smallest things: fumbling, confusion, slow responses, or repeated questions. Some of that may be nerves, but it often gets written as impairment indicators.

### 2) Do not guess or volunteer details
If asked questions like:
- "Where are you coming from?"
- "Have you been drinking?"
- "How much?"
- "When was your last drink?"

Understand what is happening: the officer is building a timeline and creating admissions. You can be polite without giving a story that becomes evidence.

### 3) Know what the stop is turning into
The moment you see the shift from traffic enforcement to impairment investigation, you are in a different category of risk.

Common signs:
- "Step out of the vehicle."
- "Any medical issues?"
- "Would you mind doing a few tests?"
- Flashlight checks, balance observations, repeated instructions.

This is usually the start of field sobriety testing territory. For more on this, see our guide on [field sobriety test refusal](/blog/field-sobriety-test-refusal-ohio).

### 4) After the stop, document everything you can
If you are released or someone picks you up:
- Write down times, locations, and the sequence of events.
- Note weather, road conditions, footwear, and anything that affects balance.
- Save receipts, ride-share logs, and messages showing your timeline.
- Do not post about it.

These details fade quickly. They matter later.

## What happens after an OVI arrest in Ohio (high level)

Every case is different, but the early phases are predictable:

1. **Arrest and booking**
2. **License consequences** (often immediate and confusing)
3. **First court dates** (arraignment, pretrial scheduling)
4. **Discovery and evidence review**
5. **Motion practice and negotiations**
6. **Resolution** (plea, dismissal, or trial)

If you want the detailed version, including license suspension mechanics and typical penalties, use our full guide: [Understanding OVI and DUI charges in Ohio](/blog/understanding-ovi-dui-charges-ohio).

[VISUAL:MID_ARTICLE_CTA]

## A 24-hour checklist if you are charged during the holidays

Holiday cases are harder because people travel, offices close, and evidence can disappear. Use this list to reduce damage fast.

[VISUAL:HOLIDAY_24HR_CHECKLIST]

### Within the first 24 hours:
- Write a timeline (where you were, who you were with, what you ate and drank, when you left).
- Save any ride-share, GPS history, or text logs relevant to timing.
- Identify potential witnesses and preserve contact info.
- Photograph footwear and note any injuries or medical issues.
- Gather any medical prescriptions and dosing timing (do not assume this "explains it away," but it matters).
- Do not discuss the facts on social media or with acquaintances.
- Do not assume your case is "standard." Holiday enforcement often includes extra documentation and video.
- Schedule a consultation quickly, because court dates and license issues do not wait for January.

## Where to find checkpoint and enforcement information

For Ohio drivers, checkpoint information is inconsistent and sometimes released late. When it is available, it helps you plan.

Use Mango Law's [DUI Checkpoint Map](/resources/dui-checkpoints) as a starting point, and remember:
- Not every enforcement effort is a checkpoint.
- Saturation patrols and "moving" enforcement are common during holiday windows.

## FAQ

### Are OVI checkpoints common in Central Ohio?
They can happen, but many holiday enforcement efforts are saturation patrols and overtime-funded traffic stops rather than fixed checkpoints. Plan for both.

### Can I avoid an OVI by "sleeping it off" in my car?
Not necessarily. There are charges and legal risks tied to being in or near a vehicle while impaired, even when you believe you are making a safer choice. For the full breakdown, read our post on [physical control charges and the McGuff case](/blog/physical-control-parked-car-ohio-kevin-mcguff).

### What is the safest decision if I am unsure?
Do not drive. Use a ride-share, a sober driver, or stay put. Compared to the cost and consequences of an OVI, the safest option is usually the cheapest option.

## Talk to a defense lawyer early if you are charged

Holiday OVI cases can move quickly, especially on license issues and early court dates. The earlier you get guidance, the more options you typically have to preserve evidence, challenge procedure, and limit damage.

If you need help, [contact Mango Law](/contact) for a consultation.`,
    category: 'OVI/DUI Defense',
    date: '2025-12-23',
    author: 'Dominic Mango',
    lastVerified: '2025-12-25',
    sources: [
      {
        label: 'NHTSA Drive Sober or Get Pulled Over Campaign',
        url: 'https://www.nhtsa.gov/campaign/drive-sober-or-get-pulled-over',
        type: 'primary',
      },
      {
        label: 'Ohio Traffic Safety Office (OTSO) Grant Guidance',
        url: 'https://dam.assets.ohio.gov/image/upload/otso.ohio.gov/grants/FFY2026-Safe-Communities-Proposal-Guidelines-Presentation.pdf',
        type: 'primary',
      },
      {
        label: 'Dayton Daily News: Holiday traffic enforcement',
        url: 'https://www.daytondailynews.com/local/dayton-police-step-up-traffic-enforcement-urge-drivers-to-stay-sober-safe-this-holiday-season/65QL42PM2NDK5G4AMLA2HRI7VA/',
        type: 'secondary',
      },
      {
        label: 'WHIO: Montgomery County ArriveSafe program',
        url: 'https://www.whio.com/news/local/county-offering-free-rides-combat-ovi-crashes-during-holidays/WGWM65T7CJFK7NSTESM7KP7CTU/',
        type: 'secondary',
      },
      {
        label: 'Cleveland 19: Summit County Arrive Alive program',
        url: 'https://www.cleveland19.com/2025/12/24/arrive-alive-free-rides-summit-county-residents-during-holiday-season/',
        type: 'secondary',
      },
      {
        label: 'Ohio Revised Code § 4511.19 (OVI)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.19',
        type: 'primary',
      },
    ],
  },
  {
    slug: 'physical-control-parked-car-ohio-kevin-mcguff',
    title: 'Physical Control of a Parked Car in Ohio: What the Kevin McGuff Case Teaches About ORC 4511.194',
    excerpt: 'Ohio State coach Kevin McGuff was charged with physical control while parked in his driveway. Learn what this offense means, how it differs from OVI, and why "sleeping it off" can still lead to charges.',
    imageUrl: '/images/generated/blog-physical-control-parked-car.png',
    content: `Ohio State women's basketball coach Kevin McGuff made headlines when he was charged with physical control of a vehicle while intoxicated after being found asleep in his parked car in his own driveway. The case resolved with a plea to a reduced charge of disorderly conduct, but it raises important questions about Ohio's physical control statute and what it means for everyday drivers.

[VISUAL:PHYSICAL_CONTROL_HIGHLIGHT]

## What happened in the McGuff case

According to public reports, Kevin McGuff was found asleep in his parked car in his driveway in the early morning hours after returning from a team function. His blood alcohol content was reportedly above the legal limit. Rather than an OVI charge (operating a vehicle while intoxicated), he was charged with **physical control** under [ORC 4511.194](https://codes.ohio.gov/ohio-revised-code/section-4511.194).

The case ultimately resolved with McGuff pleading to disorderly conduct, avoiding the physical control conviction and any license suspension that would have followed.

## What is "physical control" under Ohio law?

Physical control under [ORC 4511.194](https://codes.ohio.gov/ohio-revised-code/section-4511.194) makes it illegal to be in the driver's position of a vehicle while under the influence of alcohol or drugs, even if the vehicle isn't moving. The statute is designed to prevent impaired individuals from putting themselves in a position where they could easily operate the vehicle.

### Key elements the state must prove

1. The person was in the driver's seat or "in control" of the vehicle
2. The vehicle was on a public road, street, or property open to the public (with exceptions)
3. The person was under the influence of alcohol, drugs, or a combination

### The critical location question

One nuance in the McGuff case involves where the vehicle was located. Physical control charges typically apply to vehicles on public roads or property open to the public for vehicular traffic. A private driveway can complicate this analysis, depending on the specific facts and how the property is situated.

## Physical control vs. OVI: what's the difference?

[VISUAL:OVI_VS_PHYSICAL_CONTROL]

| Factor | OVI (4511.19) | Physical Control (4511.194) |
|--------|---------------|----------------------------|
| Vehicle movement | Required (operating) | Not required (stationary) |
| Location | Any public road | Public road or property open to public |
| Penalties | Generally more severe | Slightly less severe for first offense |
| License suspension | Mandatory ALS | Possible suspension |
| Points on license | 6 points | 6 points |

Both charges are serious and can result in jail time, fines, license suspension, and a permanent criminal record.

## Why "sleeping it off" can still lead to charges

Many people believe that if they've had too much to drink, the responsible thing to do is pull over and sleep it off rather than drive. While this is certainly safer than driving, it doesn't always protect you from criminal charges in Ohio.

[VISUAL:SLEEPING_IT_OFF_WARNING]

If you're found in the driver's seat with the keys accessible, you can be charged with physical control even if:
- The car is parked
- The engine is off
- You're asleep
- You had no intention of driving

### Factors that can influence a physical control case

Courts and officers may consider:
- Where the keys were located (in the ignition, in your pocket, in the trunk)
- Whether the engine was running
- The position of the driver's seat (reclined suggests sleeping, upright suggests ready to drive)
- Location of the vehicle
- Time of day and circumstances

## Defense strategies for physical control charges

Physical control cases can be defended through several approaches:

### Challenge the "control" element

If the keys weren't accessible or you weren't in a position to easily operate the vehicle, the state may not be able to prove you had "physical control."

### Challenge the location

If the vehicle was on genuinely private property not open to public traffic, the statute may not apply.

### Challenge the testing

Like [OVI cases](/blog/understanding-ovi-dui-charges-ohio), physical control charges often depend on breath or blood test results. These tests can be challenged based on:
- Improper administration
- Calibration issues
- Chain of custody problems
- Rising BAC defense

### Negotiate for reduced charges

As the McGuff case illustrates, physical control charges can sometimes be negotiated down to lesser offenses like disorderly conduct or reckless operation, particularly for first-time offenders or cases with evidentiary weaknesses.

## Penalties for physical control in Ohio

[VISUAL:PHYSICAL_CONTROL_PENALTIES]

A first-offense physical control conviction carries:
- Up to 180 days in jail (with minimums possible depending on circumstances)
- Fines up to $1,000 plus court costs
- Possible license suspension
- 6 points on your driving record
- Potential requirement for alcohol treatment

Repeat offenses or high BAC levels can increase these penalties significantly.

## Lessons from the McGuff case

The McGuff case highlights several important points:

1. **Being parked doesn't protect you.** Even in your own driveway, you can face charges if you're in a position to operate the vehicle while impaired.

2. **Location matters but isn't always dispositive.** The private driveway aspect may have been a factor in the favorable resolution.

3. **Negotiation is possible.** With experienced defense counsel, charges can sometimes be reduced to avoid the most serious consequences.

4. **High-profile cases follow the same laws.** Whether you're a college coach or an everyday driver, Ohio's physical control statute applies equally.

## What to do if you're too impaired to drive

[VISUAL:SAFE_ALTERNATIVES]

If you find yourself impaired and need to avoid driving:

- **Best option**: Arrange alternative transportation (rideshare, taxi, designated driver)
- **If you must stay with the car**: Put the keys in the trunk or away from the driver's area, and position yourself in the back seat or passenger seat
- **Document your choices**: If possible, your positioning and key placement can support a defense if charges arise

## Conclusion

Ohio's physical control statute serves a legitimate safety purpose, but it can catch well-intentioned people who were trying to avoid driving while impaired. The McGuff case demonstrates both the risks of being in the driver's seat while intoxicated and the possibility of favorable outcomes with proper legal representation.

If you're facing physical control charges in Delaware or Franklin County, the specific facts of your case matter. Contact Mango Law for a confidential consultation to understand your options.

---

*This article is for educational purposes and does not constitute legal advice. Ohio law is complex and fact-specific. Consult with a qualified Ohio attorney about your situation.*`,
    category: 'OVI/DUI Defense',
    date: '2025-12-22',
    author: 'Dominic Mango',
    lastVerified: '2025-12-22',
    sources: [
      {
        label: 'Ohio Revised Code § 4511.194 (Physical control)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.194',
        type: 'primary',
      },
      {
        label: 'Ohio Revised Code § 4511.19 (OVI)',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4511.19',
        type: 'primary',
      },
      {
        label: 'Columbus Dispatch: Kevin McGuff case reporting',
        url: 'https://www.dispatch.com/',
        type: 'secondary',
      },
    ],
  },
];
