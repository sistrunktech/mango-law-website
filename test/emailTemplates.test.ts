import assert from "node:assert/strict";
import { buildAdminEmailHtml, buildClientConfirmationHtml } from "../supabase/functions/_shared/email/templates.ts";

function run() {
  const adminHtml = buildAdminEmailHtml(
    "lead",
    {
      title: "New consultation request",
      summaryLine: "Tim · (614) 900-0604 · header_cta",
      fields: [
        { label: "Name", value: "<b>Tim</b>" },
        { label: "Email", value: "tfsistrunk@gmail.com" },
        { label: "Phone", value: "(614) 900-0604" },
      ],
      message: "Test <script>alert(1)</script>",
      meta: [
        { label: "IP", value: "127.0.0.1" },
        { label: "UA", value: "Test UA" },
      ],
      replyToEmail: "tfsistrunk@gmail.com",
      callToPhone: "6149000604",
    },
    { appEnv: "staging", theme: "dark", season: "winter", holiday: true, siteUrl: "https://mango.law" },
  );

  assert.ok(adminHtml.includes("New consultation request"));
  assert.ok(adminHtml.includes("STAGING"));
  assert.ok(!adminHtml.includes("<script>"));
  assert.ok(adminHtml.includes("&lt;script&gt;"));
  assert.ok(adminHtml.includes("&lt;b&gt;Tim&lt;/b&gt;"));

  const clientHtml = buildClientConfirmationHtml(
    "lead",
    {
      title: "We received your consultation request",
      greetingName: "Tim",
      intro: "Thanks for reaching out.",
      details: [{ label: "Email", value: "tfsistrunk@gmail.com" }],
      message: "I was arrested for OVI last night.",
      leadSource: "modal",
      caseType: "ovi_dui",
      includeHelpfulLinks: true,
    },
    { theme: "light", season: "spring", holiday: false, siteUrl: "https://mango.law" },
  );

  assert.ok(clientHtml.includes("Helpful resources"));
  assert.ok(clientHtml.includes("4511.19"));
  assert.ok(clientHtml.includes("/blog/what-to-do-after-ovi-arrest-ohio"));
}

run();
