# Annex: Structured Data Policy

## 1) Required Entity Policy

Homepage structured data must represent legal-service local identity with complete, non-placeholder values.

Minimum required coverage:

- legal service identity
- canonical contact details
- physical address and geo
- opening hours
- service coverage and service catalog
- linked attorney/person entity

## 2) Source Tier Policy

- Tier 1 (normative): Schema.org and Google Search developer structured-data documentation
- Tier 2 (tactical): vetted SEO implementation guidance when Tier 1 is silent
- Tier 3 (internal): proven historical implementation patterns and internal tickets

Tier 1 always overrides Tier 2/3 in conflicts.

## 3) Hard Gate Rules

Build must fail when any is true:

1. Placeholder tokens detected in structured data source.
2. Required key coverage is missing.
3. Known invalid regression patterns reappear (for example, disallowed property/type history).
4. Canonical contact/address binding is not sourced from project constants.

## 4) Manual Validation Cadence

Every Monday and Friday:

1. validate representative pages using Schema Validator
2. validate representative pages using Rich Results Test
3. log outputs and follow-up actions in performance/activity logs

## 5) Representative Page Set

- `/`
- `/about`
- one service page
- one blog post with article schema

## 6) No-Drift Rule

Do not introduce schema fields or claims that are unsupported, unsourced, or inconsistent with on-page content.
