# GA4/GTM Live-Event Validation Checklist

Source context: April `ga4-gtm-status.csv` confirmed source instrumentation and GTM mappings, but live `generate_lead` stream data still needs validation.

## Preconditions

- Production deployment includes the source tracking patch.
- Cookie/consent flow has been accepted in the validation browser.
- GTM container `GTM-WLJQZKB5` is live with no unintended workspace changes.
- GA4 Realtime or DebugView is open for the Mango Law web stream.

## Required Checks

| Check | Expected source event | Expected GA4 event | Key event | Pass/Fail | Evidence link/screenshot | Notes |
|---|---|---|---|---|---|---|
| Load homepage after consent acceptance | `mango_page_view` | `page_view` | No |  |  | Confirm one event per route load; no duplicate provider/SEO path emission. |
| Navigate to `/ovi-dui-defense-delaware-oh` | `mango_page_view` | `page_view` | No |  |  | Confirm `page_path`, `page_location`, and title are populated. |
| Click primary OVI CTA button | `cta_click` | `cta_click` | No |  |  | Confirm placement and target URL parameters. |
| Click header phone link | `lead_submitted` with `lead_source=phone` | `generate_lead` | Yes |  |  | Confirm target number and no duplicate optional tel trigger. |
| Submit approved test contact form | `lead_submitted` with `lead_source=form` | `generate_lead` | Yes |  |  | Use only an approved test lead; confirm once-per-event counting. |
| Submit approved test chat lead | `lead_submitted` with `lead_source=chat` | `generate_lead` | Yes |  |  | Confirm backend success precedes event emission. |
| Click email link on contact/about/footer | `lead_submitted` with `lead_source=email` | `generate_lead` | Yes |  |  | Confirm target email and no duplicate optional mailto trigger. |
| Open lead modal | `cta_click` with `cta=lead_modal_open` | `cta_click` | No |  |  | Treat as funnel interaction only. |
| Open chat launcher | `cta_click` with `cta=chat_open` | `cta_click` | No |  |  | Treat as assisted conversion context. |

## Decision Gate

Do not use organic lead counts in SEO/AEO reporting until at least one live `lead_submitted` path is observed as GA4 `generate_lead` and the phone/form/chat/email paths are checked for duplicate counting risk.
