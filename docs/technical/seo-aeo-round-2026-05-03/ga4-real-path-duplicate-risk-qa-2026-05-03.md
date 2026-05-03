# GA4/GTM Real Lead-Path Duplicate-Risk QA - 2026-05-03

Scope: read-only source and docs QA for Mango Law lead-path tracking after GTM container `GTM-WLJQZKB5` Version 5 went live on 2026-05-03 at 11:09 EDT. No source files, package files, images, changelog, or other docs were edited.

## Evidence Reviewed

- Source tracking helpers: `src/lib/analytics.ts`.
- GTM/consent bootstrap: `src/app/layout.tsx` and route page-view source in `src/app/providers.tsx`.
- Public lead surfaces: `src/components/SiteHeader.tsx`, `src/components/Footer.tsx`, `src/components/PageHero.tsx`, `src/components/CTASection.tsx`, `src/components/ContactForm.tsx`, `src/components/QuickIntakeForm.tsx`, `src/components/LeadCaptureModal.tsx`, `src/components/ChatIntakeLauncher.tsx`, `src/components/chat/ConversationWindow.tsx`, `src/views/ContactPage.tsx`, and related public view CTA usages.
- Backend submission functions were checked for analytics sends: `supabase/functions/submit-contact`, `submit-lead`, and `chat-intake` do not emit GA4/GTM events server-side.
- Existing validation docs: `ga4-gtm-live-network-validation-2026-05-03.json`, `ga4-gtm-live-event-validation-checklist.md`, April `ga4-gtm-status.csv`, and related status/readme notes.
- Localhost check: `curl` to `http://localhost:3023/`, `/contact`, and `/ovi-dui-defense-delaware-oh` failed to connect, so no local browser path was available.

## Event Model Observed

| Source event | Source path | GA4 expectation | Duplicate-risk note |
|---|---|---|---|
| `mango_page_view` | `trackPageView()` in `src/app/providers.tsx` route effect | `page_view` through GTM | Source page-view emission is centralized, but live evidence shows an extra GA4 `page_view` on the `/contact` route change, likely from GA4 enhanced measurement/history handling. |
| `cta_click` | `trackCtaClick()` on header/footer/hero/modal/chat/open/contact CTAs | `cta_click` through GTM | Not a lead key event. It commonly fires with phone/email `lead_submitted` on the same click, which is expected support telemetry. |
| `lead_submitted` | `trackLeadSubmitted()` for `form`, `phone`, `email`, `chat` | `generate_lead` through GTM | Primary lead-counting path. Duplicate risk depends on extra GTM click triggers, fallback GA4 sends, or multiple lead actions in one user journey. |
| Direct GA4 fallback `lead_submitted` | `trackLeadSubmitted()` conditionally calls `gtag('event', 'lead_submitted', ...)` if a `gtag/js` script exists | Not the documented primary GA4 key event | Conditional naming mismatch and possible extra GA4 event if `gtag/js` is added outside current GTM-only bootstrap. |

## Tested Paths and Boundaries

- Live network validation already confirms public GA4 collect calls for `page_view`, `cta_click`, and one synthetic `generate_lead`.
- The saved live evidence explicitly says no contact form was submitted, no phone call was placed, no email was sent, and no chat lead was submitted.
- The synthetic validation pushed `lead_submitted` with `lead_source=synthetic_validation` and `checkpoint_id=gtm_generate_lead_validation_2026_05_03`; GTM converted that to GA4 `generate_lead`.
- No real-path form, phone, email, or chat lead was completed in this QA pass.
- No CAPTCHA/Turnstile bypass was attempted.
- No phone or email navigation was activated.

## Findings

1. **No confirmed duplicate `generate_lead` on the synthetic mapping path.**  
   Existing live evidence shows one synthetic `lead_submitted` reaching GA4 as `generate_lead`. This validates the GTM mapping, but it does not prove real form, phone, email, or chat paths are duplicate-free.

2. **Real lead paths remain pending.**  
   `ContactForm`, `QuickIntakeForm`, `LeadCaptureModal`, and `ConversationWindow` emit `trackLeadSubmitted()` only after successful backend submission. That is the right sequencing, and submit buttons are disabled while submitting. Residual risk remains until an approved test lead confirms one backend success equals one GA4 `generate_lead`.

3. **Phone/email clicks are source-instrumented and should not also be captured by broad GTM click conversion triggers.**  
   Header, footer, contact page, hero, CTA section, chat chooser, about, home, service area, checkpoint banner, location block, and practice-area phone/email surfaces generally call `trackCtaClick()` plus `trackLeadSubmitted()`. A broad GTM trigger such as "Click URL starts with `tel:`" or `mailto:` mapped to a lead event would double count many real clicks. Existing docs correctly warn not to enable broad optional tel/mailto triggers without a crawl and de-duplication plan.

4. **Direct GA4 fallback creates a conditional naming and duplication risk.**  
   Current root layout installs GTM, not a standalone `gtag/js` script. The saved live resource evidence records `gtm.js` resources. However, `trackLeadSubmitted()` also has a fallback path that sends GA4 event name `lead_submitted` directly if a `gtag/js` script is present. That event name differs from the documented GA4 lead key event `generate_lead`, and if a standalone Google tag is later added it could create parallel GA4 lead-like events alongside the GTM `generate_lead` mapping.

5. **Post-form success phone CTA can count a second lead in the same user journey.**  
   `LeadCaptureModal` emits `lead_submitted` with `lead_source=form` after `submit-lead` succeeds, then the success screen call button emits another `lead_submitted` with `lead_source=phone` if clicked. This is not one click causing two lead events, but it can count one person as two key events when they submit and immediately call.

6. **Synthetic validation can pollute lead reporting if not excluded.**  
   Because the GTM trigger accepts the synthetic `lead_submitted` event, the validation generated a GA4 `generate_lead` with `lead_source=synthetic_validation`. Reporting should filter out that `lead_source` and `checkpoint_id`.

7. **Supporting page-view duplicate risk is visible in the live network capture.**  
   The OVI CTA-to-contact validation includes both source-driven SPA page-view behavior and an additional GA4 `page_view` collect for `/contact`. This is not a lead duplicate, but it can affect lead-path funnel analysis and landing/next-page counts if not resolved.

8. **Experiment exposure events are not lead events, but live evidence shows repeated A/B exposure pushes.**  
   The saved network evidence includes multiple `experiment_exposure` pushes for the OVI page. There is no confirmed GTM/GA4 mapping for this event, so it does not affect lead counts today. If mapped later, validate exposure de-duplication first.

## Recommended Next Actions

1. Validate one approved real form lead, one approved real chat lead, and one prevented-default phone/email click path in GTM Preview plus GA4 DebugView/Realtime. For phone/email, use a browser setup that prevents the default `tel:`/`mailto:` navigation while still allowing React click handlers to run; do not place calls or send emails.
2. Keep broad GTM tel/mailto click triggers disabled unless they are explicitly scoped to links that do not already emit source `lead_submitted`.
3. Decide whether the `LeadCaptureModal` success-screen phone click should remain a second `generate_lead` or become a support event such as `cta_click` only.
4. Align or remove the direct GA4 fallback event path before adding any standalone `gtag/js` script. If kept, send the same GA4 event name and parameters as the GTM path or document it as non-key telemetry.
5. Exclude `lead_source=synthetic_validation` and `checkpoint_id=gtm_generate_lead_validation_2026_05_03` from SEO conversion reporting.
6. Investigate the duplicate `/contact` `page_view` behavior in the live network capture. Choose one SPA page-view source: custom `mango_page_view` via GTM or GA4 enhanced measurement/history page views.

## Reporting Confidence

Use GA4 `generate_lead` cautiously for May SEO reporting. The GTM mapping is live, but final conversion counts should wait for real-path validation of form, phone, email, and chat leads with duplicate checks in place.
