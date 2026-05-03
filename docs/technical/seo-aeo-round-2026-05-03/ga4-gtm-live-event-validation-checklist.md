# GA4/GTM Live-Event Validation Checklist

Source context: April `ga4-gtm-status.csv` confirmed source instrumentation and GTM mappings. On 2026-05-03, GTM Version 5 was published and live network validation confirmed the public GA4 event mapping.

## Preconditions

- Production deployment includes the source tracking patch.
- Cookie/consent flow has been accepted in the validation browser.
- GTM container `GTM-WLJQZKB5` is live on Version 5: `Fix Mango GA4 event tags 2026-05-03`.
- GA4 Realtime or DebugView is open for the Mango Law web stream if validating user-visible lead paths.

## Required Checks

| Check | Expected source event | Expected GA4 event | Key event | Pass/Fail | Evidence link/screenshot | Notes |
|---|---|---|---|---|---|---|
| Load homepage after consent acceptance | `mango_page_view` | `page_view` | No | Pass | `ga4-gtm-live-network-validation-2026-05-03.json` | Live public network capture observed GA4 `page_view`. |
| Navigate to `/ovi-dui-defense-delaware-oh` | `mango_page_view` | `page_view` | No | Pass | `ga4-gtm-live-network-validation-2026-05-03.json` | Tag Assistant preview and live network capture observed route page views. |
| Click primary OVI CTA button | `cta_click` | `cta_click` | No | Pass | `ga4-gtm-live-network-validation-2026-05-03.json` | Tag Assistant preview and live network capture observed `cta_click`. |
| Synthetic `lead_submitted` mapping check | `lead_submitted` with `lead_source=synthetic_validation` | `generate_lead` | Yes | Pass | `ga4-gtm-live-network-validation-2026-05-03.json` | Mapping validated without form submit, phone call, email send, or chat lead. |
| Click header phone link | `lead_submitted` with `lead_source=phone` | `generate_lead` | Yes | Pending real-path QA |  | Confirm target number and no duplicate optional tel trigger. |
| Submit approved test contact form | `lead_submitted` with `lead_source=form` | `generate_lead` | Yes | Pending approved test lead |  | Use only an approved test lead; confirm once-per-event counting. |
| Submit approved test chat lead | `lead_submitted` with `lead_source=chat` | `generate_lead` | Yes | Pending approved test lead |  | Confirm backend success precedes event emission. |
| Click email link on contact/about/footer | `lead_submitted` with `lead_source=email` | `generate_lead` | Yes | Pending real-path QA |  | Confirm target email and no duplicate optional mailto trigger. |
| Open lead modal | `cta_click` with `cta=lead_modal_open` | `cta_click` | No | Pending secondary QA |  | Treat as funnel interaction only. |
| Open chat launcher | `cta_click` with `cta=chat_open` | `cta_click` | No | Pending secondary QA |  | Treat as assisted conversion context. |
| Click post-form success phone CTA | `cta_click` with `lead_followup_after_form=true` | `cta_click` | No | Source hardened | `ga4-real-path-duplicate-risk-qa-2026-05-03.md` | Source no longer emits a second `lead_submitted` after the same modal form success. |
| Direct GA4 fallback event name | fallback `trackLeadSubmitted()` call when standalone `gtag/js` exists | `generate_lead` | Yes | Source hardened | `analyticsFallback.test.ts` | Fallback is conditional and should remain secondary to GTM, but it now matches the GA4 key-event name. |

## Decision Gate

The GTM-to-GA4 mapping is live and validated. Source hardening now reduces two known duplicate/naming risks: standalone fallback events use `generate_lead`, and post-form success phone clicks stay as support `cta_click` telemetry. Use organic lead counts cautiously until at least one real user-visible form, phone, email, and chat path is observed in GA4 `generate_lead` and the GA4 enhanced-measurement/history page-view duplicate is resolved in the GA4/GTM configuration.
