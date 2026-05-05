# Ahrefs Metadata, Schema, and GA4 Lead-Path QA - 2026-05-05

Scope: Ahrefs Site Audit cleanup for title/meta/schema issues plus local browser QA for Mango lead-path analytics before GSC indexing requests.

## Ahrefs Issues Addressed

- `Title too long`: shortened blog SEO titles, static page metadata titles, and hydrated client-side `<SEO>` title overrides.
- `Meta description too long`: shortened homepage/default, about/contact, and selected static page descriptions while preserving visible page copy.
- `Structured data has schema.org validation error`: removed `dateIssued` from `EducationalOccupationalCredential` nodes under the attorney `Person` schema. Ahrefs reported `dateIssued` as an unexpected property for that type.

## Rendered Metadata QA

Local browser QA ran against `http://localhost:3023` after hydration with external GTM/GA/Turnstile network calls blocked. The checked set covered the homepage, About, Contact, DUI checkpoint resource, drug/DV/protection/glossary/privacy/holiday owner/resource pages, and the active new blog cluster.

Result: `metadataFailures: []`.

| Path | Rendered title length | Meta description length | Credential `dateIssued` present |
|---|---:|---:|---|
| `/` | 56 | 136 | no |
| `/about` | 31 | 122 | no |
| `/contact` | 29 | 136 | no |
| `/resources/dui-checkpoints` | 35 | 129 | no |
| `/drug-crime-lawyer-delaware-oh` | 43 | 131 | no |
| `/domestic-violence-lawyer-delaware-oh` | 48 | 155 | no |
| `/protection-order-lawyer-delaware-oh` | 47 | 144 | no |
| `/glossary` | 38 | 111 | no |
| `/privacy` | 26 | 77 | no |
| `/holiday-ovi-enforcement-ohio` | 40 | 121 | no |
| `/blog/high-tier-ovi-ohio-17-test` | 33 | 123 | no |
| `/blog/ovi-refusal-vs-failed-test-ohio` | 46 | 124 | no |
| `/blog/drug-ovi-ohio` | 28 | 130 | no |
| `/blog/drug-possession-in-car-ohio` | 44 | 130 | no |
| `/blog/civil-protection-order-hearing-delaware-county-ohio` | 47 | 119 | no |

## GA4 Lead-Path QA

Boundary: no production lead was created, no phone call was placed, no email was sent, and no chat lead was sent to Supabase. Contact and chat submissions used local browser interaction with CORS-correct mocked Edge Function responses, so the React success paths could complete without transmitting lead data.

| Path | UI action | Source event observed | Boundary |
|---|---|---|---|
| Phone | Clicked contact-page/header `tel:` path with protocol navigation prevented | `lead_submitted`, `lead_source=phone`, `checkpoint_id=mobile_header_call`, `target_number=7404176191` | No call placed. |
| Email | Clicked contact-page `mailto:` path with protocol navigation prevented | `lead_submitted`, `lead_source=email`, `checkpoint_id=contact_page_email_office`, `target_email=office@mango.law` | No email client opened/sent. |
| Contact form | Filled real contact form UI; mocked `submit-contact` OPTIONS and POST | `lead_submitted`, `lead_source=form`, `checkpoint_id=contact_form_submit` | POST intercepted locally; no production lead. |
| Chat | Completed real chat UI sequence; mocked `chat-intake` OPTIONS and POST | `lead_submitted`, `lead_source=chat`, `checkpoint_id=chat_widget`, `source=chat_widget` | POST intercepted locally; no production chat lead. |

The direct GA4 fallback unit test now covers `form`, `phone`, `email`, and `chat` lead sources and confirms fallback event naming remains `generate_lead`.

## GSC Indexing Submission

Live production read checks returned HTTP `200` with title and canonical tags present for the eight May support posts:

- `https://mango.law/blog/high-tier-ovi-ohio-17-test`
- `https://mango.law/blog/ovi-refusal-vs-failed-test-ohio`
- `https://mango.law/blog/domestic-violence-arrest-delaware-county-ohio`
- `https://mango.law/blog/delaware-county-criminal-case-timeline`
- `https://mango.law/blog/ohio-misdemeanor-vs-felony-charges-delaware-county`
- `https://mango.law/blog/drug-ovi-ohio`
- `https://mango.law/blog/civil-protection-order-hearing-delaware-county-ohio`
- `https://mango.law/blog/drug-possession-in-car-ohio`

Action-time approval was provided in the Codex thread. Search Console inspection for all eight URLs reported `URL is on Google`, `Page is indexed`, HTTPS valid, Breadcrumbs valid, and FAQ valid.

Result: Request indexing was submitted for all eight URLs during the 2026-05-04 late-ET browser session, and GSC confirmed each URL was added to a priority crawl queue. Follow-up check date is 2026-05-12.

Boundary: no visible CAPTCHA appeared, no quota warning appeared, and no Search Console property/settings changes were made.
