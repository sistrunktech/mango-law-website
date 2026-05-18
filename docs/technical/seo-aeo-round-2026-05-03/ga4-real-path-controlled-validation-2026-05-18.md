# GA4 Real-Path Controlled Validation - 2026-05-18

Scope: approved controlled GA4 validation for Mango Law lead paths on the live site.

## Method

- Used headless Puppeteer against `https://mango.law`.
- Granted analytics consent with the `ml_consent_v2` cookie before loading pages.
- Prevented default `tel:` and `mailto:` navigation so no phone call or email client opened.
- Mocked Turnstile in the browser for the form test.
- Intercepted `submit-contact` `OPTIONS` and `POST` before network egress so no real lead email/SMS/database write was sent.

## Results

| Path | Source event | GA4 collect result | Notes |
|---|---|---|---|
| Header phone click | `lead_submitted`, `lead_source=phone`, `checkpoint_id=header_call` | One `generate_lead` | Live deployed site still served `tel:7404176191`, proving the production frontend is stale against the now-confirmed 602-primary source of truth. |
| Contact-page email click | `lead_submitted`, `lead_source=email`, `checkpoint_id=contact_page_email_office` | One `generate_lead` | `mailto:` navigation was prevented. |
| Contact form submit | `lead_submitted`, `lead_source=form`, `checkpoint_id=contact_form_submit` | One `generate_lead` | Frontend success path completed after controlled backend interception; no real lead was sent. |

## Evidence Notes

- Phone/email pass observed GA4 events: `page_view`, `cta_click`, `generate_lead`, `user_engagement`, then contact `page_view`, `cta_click`, `generate_lead`.
- Form-only pass observed GA4 events: contact `page_view`, `form_start`, `generate_lead`.
- Form interception methods observed: `OPTIONS`, `POST`.
- Form pass console errors: none.

## Follow-Up

The GA4 lead mapping is working for phone, email, and form paths, with one `generate_lead` per tested source event. Re-run the phone click after the 602-primary website build is deployed so `ep.target_number` changes from `7404176191` to `7406022155`.
