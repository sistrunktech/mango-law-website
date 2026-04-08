import type { EmailSeason, EmailTheme } from "./tokens.ts";
import { getSeasonTokens, getThemeTokens } from "./tokens.ts";
import { recommendHelpfulLinks } from "./recommendations.ts";
import { escapeHtml, formatPhoneForDisplay, normalizePhoneForStorage } from "./utils.ts";

export type NotificationType = "contact" | "lead" | "chat";

export type EmailOptions = {
  theme?: EmailTheme;
  season?: EmailSeason;
  holiday?: boolean;
  appEnv?: string;
  siteUrl?: string;
};

export type AdminEmailData = {
  title: string;
  summaryLine?: string;
  fields: Array<{ label: string; value: string }>;
  messageLabel?: string;
  message?: string | null;
  transcriptLabel?: string;
  transcript?: string | null;
  meta?: Array<{ label: string; value: string }>;
  replyToEmail?: string | null;
  callToPhone?: string | null;
};

export type ClientEmailData = {
  title: string;
  greetingName: string;
  intro: string;
  details?: Array<{ label: string; value: string }>;
  message?: string | null;
  leadSource?: string | null;
  checkpointId?: string | null;
  caseType?: string | null;
  urgency?: string | null;
  county?: string | null;
  includeHelpfulLinks?: boolean;
};

function getDefaultOptions(options?: EmailOptions): Required<EmailOptions> {
  return {
    theme: options?.theme ?? "light",
    season: options?.season ?? "winter",
    holiday: options?.holiday ?? false,
    appEnv: options?.appEnv ?? "production",
    siteUrl: options?.siteUrl ?? "https://mango.law",
  };
}

function envBadgeHtml(appEnv: string, themeTokens: ReturnType<typeof getThemeTokens>): string {
  const normalized = (appEnv || "").trim().toLowerCase();
  if (!normalized || normalized === "production" || normalized === "prod") return "";

  const label = escapeHtml(appEnv.toUpperCase());
  return `
    <span style="display:inline-block; font-size:11px; letter-spacing:.14em; text-transform:uppercase; padding:6px 10px; border-radius:999px; border:1px solid ${themeTokens.border}; background:rgba(0,0,0,.18); color:${themeTokens.text};">
      ${label}
    </span>
  `;
}

function baseHtml(args: {
  title: string;
  subtitle: string;
  bodyHtml: string;
  footerHtml: string;
  options: Required<EmailOptions>;
}): string {
  const themeTokens = getThemeTokens(args.options.theme);
  const seasonTokens = getSeasonTokens(args.options.season);

  const ornament = args.options.holiday && args.options.season === "winter" ? "🎄" : "";
  const holidayLine = args.options.holiday && args.options.season === "winter"
    ? `<div style="margin:0 0 6px; font-weight:700; color:${themeTokens.text};">Happy holidays from Mango Law</div>`
    : "";

  const badge = envBadgeHtml(args.options.appEnv, themeTokens);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(args.title)}</title>
    <style>
      @media (prefers-color-scheme: dark) {
        .ml-bg { background: #0B0F14 !important; }
        .ml-panel { background: #111827 !important; }
        .ml-text { color: #E5E7EB !important; }
        .ml-muted { color: #9CA3AF !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background:${themeTokens.bg}; color:${themeTokens.text}; font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.45;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${themeTokens.bg};" class="ml-bg">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px; border:1px solid ${themeTokens.border}; border-radius:16px; overflow:hidden; background:${themeTokens.panel};" class="ml-panel">
            <tr>
              <td style="padding:0; height:3px; background:linear-gradient(90deg, ${seasonTokens.stripFrom}, ${seasonTokens.stripTo}); line-height:3px; font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:18px 22px; background:linear-gradient(90deg, ${seasonTokens.headerFrom} 0%, ${seasonTokens.headerTo} 100%); border-bottom:1px solid ${themeTokens.border};">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="left" style="vertical-align:middle;">
                      <div style="font-weight:800; letter-spacing:.02em; color:${themeTokens.text};" class="ml-text">${ornament ? `${ornament} ` : ""}Mango Law LLC</div>
                      <div style="margin-top:6px; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:rgba(229,231,235,.9);" class="ml-muted">${escapeHtml(args.subtitle)}</div>
                    </td>
                    <td align="right" style="vertical-align:top;">
                      ${badge}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px; color:${themeTokens.text};" class="ml-text">
                ${args.bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 22px; border-top:1px solid ${themeTokens.border}; background:rgba(255,255,255,.02); color:${themeTokens.muted2}; font-size:12px;">
                ${holidayLine}
                ${args.footerHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderKeyValueTable(
  rows: Array<{ label: string; value: string }>,
  themeTokens: ReturnType<typeof getThemeTokens>,
): string {
  const safeRows = rows
    .filter((r) => r.value !== undefined && r.value !== null)
    .map((r) => ({
      label: escapeHtml(r.label),
      value: escapeHtml(r.value),
    }));

  const body = safeRows
    .map((r) => `
      <tr>
        <td style="padding:8px 0; width:140px; color:${themeTokens.muted2}; font-size:12px; letter-spacing:.14em; text-transform:uppercase;">
          ${r.label}
        </td>
        <td style="padding:8px 0; color:${themeTokens.text}; font-size:13px;">
          ${r.value}
        </td>
      </tr>
    `)
    .join("");

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
      ${body}
    </table>
  `;
}

function renderPanel(args: {
  heading: string;
  bodyHtml: string;
  themeTokens: ReturnType<typeof getThemeTokens>;
}): string {
  return `
    <div style="margin-top:16px; border:1px solid ${args.themeTokens.border}; border-radius:14px; overflow:hidden;">
      <div style="padding:12px 14px; border-bottom:1px solid ${args.themeTokens.border}; background:rgba(255,255,255,.02); font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:${args.themeTokens.muted};">
        ${escapeHtml(args.heading)}
      </div>
      <div style="padding:12px 14px;">
        ${args.bodyHtml}
      </div>
    </div>
  `;
}

function renderConsoleBlock(args: {
  heading: string;
  text: string;
  themeTokens: ReturnType<typeof getThemeTokens>;
}): string {
  const content = escapeHtml(args.text).replace(/\n/g, "<br>");
  return `
    ${renderPanel({
      heading: args.heading,
      themeTokens: args.themeTokens,
      bodyHtml: `
        <div style="border:1px solid ${args.themeTokens.consoleBorder}; border-radius:12px; background:${args.themeTokens.consoleBg}; padding:12px 14px; font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono','Courier New', monospace; font-size:12.5px; line-height:1.45; color:${args.themeTokens.text};">
          ${content}
        </div>
      `,
    })}
  `;
}

export function buildAdminEmailHtml(type: NotificationType, data: AdminEmailData, options?: EmailOptions): string {
  const opts = getDefaultOptions(options);
  const themeTokens = getThemeTokens(opts.theme);

  const subtitle =
    type === "contact" ? "New contact request" : type === "lead" ? "New consultation request" : "New chat lead";

  const summary = data.summaryLine
    ? `<div style="margin:0 0 14px; color:${themeTokens.muted}; font-size:13px;">${escapeHtml(data.summaryLine)}</div>`
    : "";

  const fieldsPanel = renderPanel({
    heading: "Submission details",
    themeTokens,
    bodyHtml: renderKeyValueTable(data.fields, themeTokens),
  });

  const messagePanel = data.message
    ? renderConsoleBlock({
      heading: data.messageLabel ?? "Message",
      text: data.message,
      themeTokens,
    })
    : "";

  const transcriptPanel = data.transcript
    ? renderConsoleBlock({
      heading: data.transcriptLabel ?? "Chat transcript",
      text: data.transcript,
      themeTokens,
    })
    : "";

  const metaPanel = data.meta && data.meta.length > 0
    ? renderPanel({
      heading: "Technical metadata",
      themeTokens,
      bodyHtml: renderKeyValueTable(data.meta, themeTokens),
    })
    : "";

  const bodyHtml = `
    <div style="font-size:16px; font-weight:800; margin:0 0 8px;">${escapeHtml(data.title)}</div>
    ${summary}
    ${fieldsPanel}
    ${messagePanel}
    ${transcriptPanel}
    ${metaPanel}
    <div style="margin-top:14px; font-size:12px; color:${themeTokens.muted2};">
      Quick actions:
      <a href="mailto:${escapeHtml(data.replyToEmail || "office@mango.law")}" style="color:${themeTokens.link}; font-weight:700; text-decoration:none;">Reply</a>
      ·
      <a href="tel:${escapeHtml(data.callToPhone || "7404176191")}" style="color:${themeTokens.link}; font-weight:700; text-decoration:none;">Call/Text (740) 417-6191</a>
    </div>
  `;

  const footerHtml = `<div style="color:${themeTokens.muted2};">Mango Law LLC · Automated notification</div>`;

  return baseHtml({
    title: data.title,
    subtitle,
    bodyHtml,
    footerHtml,
    options: opts,
  });
}

export function buildClientConfirmationHtml(
  type: NotificationType,
  data: ClientEmailData,
  options?: EmailOptions,
): string {
  const opts = getDefaultOptions(options);
  const themeTokens = getThemeTokens(opts.theme);

  const subtitle =
    type === "contact" ? "We received your message" : type === "lead" ? "We received your request" : "We received your message";

  const safeName = escapeHtml(data.greetingName);
  const intro = escapeHtml(data.intro);

  const callTextHref = `tel:7404176191`;
  const callTextLabel = `Call/Text ${escapeHtml("(740) 417-6191")}`;
  const officeEmailHref = `mailto:office@mango.law`;

  const details = data.details && data.details.length > 0
    ? renderPanel({
      heading: "Your details (summary)",
      themeTokens,
      bodyHtml: renderKeyValueTable(data.details, themeTokens),
    })
    : "";

  const messagePanel = data.message
    ? renderConsoleBlock({
      heading: "What you sent",
      text: data.message,
      themeTokens,
    })
    : "";

  const helpfulLinks = data.includeHelpfulLinks === false
    ? []
    : recommendHelpfulLinks({
      siteUrl: opts.siteUrl,
      message: data.message,
      leadSource: data.leadSource,
      checkpointId: data.checkpointId,
      caseType: data.caseType,
      urgency: data.urgency,
      county: data.county,
    });

  const helpfulLinksHtml = helpfulLinks.length
    ? renderPanel({
      heading: "Helpful resources",
      themeTokens,
      bodyHtml: `
        <ul style="margin:0; padding-left:18px; color:${themeTokens.text};">
          ${helpfulLinks.map((l) => `<li style="margin:8px 0;"><a href="${l.href}" style="color:${themeTokens.link}; font-weight:700; text-decoration:none;">${l.label}</a></li>`).join("")}
        </ul>
      `,
    })
    : "";

  const bodyHtml = `
    <div style="font-size:16px; font-weight:800; margin:0 0 8px;">${escapeHtml(data.title)}</div>
    <div style="margin:0 0 14px; color:${themeTokens.text}; font-size:14px;">
      Hi ${safeName},
    </div>
    <div style="margin:0 0 14px; color:${themeTokens.muted}; font-size:14px;">${intro}</div>
    <div style="margin:16px 0; padding:14px 16px; border:1px solid ${themeTokens.border}; border-radius:12px; background:rgba(255,255,255,.02);">
      <div style="font-weight:800; margin-bottom:8px;">Need a quicker response?</div>
      <div style="font-size:14px; line-height:1.6; color:${themeTokens.text};">
        <a href="${callTextHref}" style="color:${themeTokens.link}; font-weight:800; text-decoration:none;">${callTextLabel}</a><br>
        <a href="${officeEmailHref}" style="color:${themeTokens.link}; font-weight:800; text-decoration:none;">Email office@mango.law</a>
      </div>
    </div>
    ${details}
    ${messagePanel}
    ${helpfulLinksHtml}
    <div style="margin-top:16px; font-size:12px; color:${themeTokens.muted2}; line-height:1.5;">
      This email confirms receipt only. No attorney-client relationship is formed until a written engagement agreement is signed.
      For urgent matters, call or text.
    </div>
  `;

  const footerHtml = `<div style="color:${themeTokens.muted2};">Mango Law LLC · Automated confirmation</div>
    <div style="margin-top:6px;">Please do not send confidential details by email.</div>`;

  return baseHtml({
    title: data.title,
    subtitle,
    bodyHtml,
    footerHtml,
    options: opts,
  });
}

export function normalizeAdminPhoneForEmail(phone: string | null | undefined): string {
  if (!phone) return "Not provided";
  return formatPhoneForDisplay(phone);
}

export function normalizeClientPhoneForEmail(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = normalizePhoneForStorage(phone);
  if (!digits) return null;
  return formatPhoneForDisplay(digits);
}
