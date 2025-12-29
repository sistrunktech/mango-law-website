import { escapeHtml } from "./utils.ts";

export type HelpfulLink = {
  label: string;
  href: string;
};

function uniqByHref(links: HelpfulLink[]): HelpfulLink[] {
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

function absolute(siteUrl: string, path: string): string {
  const base = siteUrl.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function normalizeTextForMatch(value: string): string {
  return value.toLowerCase();
}

export type HelpfulLinkInput = {
  siteUrl: string;
  message?: string | null;
  leadSource?: string | null;
  checkpointId?: string | null;
  caseType?: string | null;
  urgency?: string | null;
  county?: string | null;
};

export function recommendHelpfulLinks(input: HelpfulLinkInput): HelpfulLink[] {
  const text = normalizeTextForMatch(
    [
      input.message ?? "",
      input.leadSource ?? "",
      input.checkpointId ?? "",
      input.caseType ?? "",
      input.urgency ?? "",
      input.county ?? "",
    ].join(" "),
  );

  const links: HelpfulLink[] = [];

  const caseType = (input.caseType || "").trim().toLowerCase();
  if (caseType) {
    switch (caseType) {
      case "ovi_dui":
      case "ovi":
      case "dui":
        links.push(
          { label: "OVI / DUI defense", href: absolute(input.siteUrl, "/ovi-dui-defense-delaware-oh") },
          { label: "What to do after an OVI arrest (guide)", href: absolute(input.siteUrl, "/resources/what-to-do-after-ovi-arrest") },
          { label: "ORC § 4511.19 — OVI/DUI (official)", href: "https://codes.ohio.gov/ohio-revised-code/section-4511.19" },
        );
        break;
      case "criminal_defense":
        links.push({ label: "Criminal defense", href: absolute(input.siteUrl, "/criminal-defense-delaware-oh") });
        break;
      case "drug_crimes":
        links.push({ label: "Drug crimes defense", href: absolute(input.siteUrl, "/drug-crime-lawyer-delaware-oh") });
        break;
      case "sex_crimes":
        links.push({ label: "Sex crimes defense", href: absolute(input.siteUrl, "/sex-crime-defense-lawyer-delaware-oh") });
        break;
      case "protection_orders":
        links.push(
          { label: "Protection order defense", href: absolute(input.siteUrl, "/protection-order-lawyer-delaware-oh") },
          { label: "ORC § 3113.31 — Civil protection orders (official)", href: "https://codes.ohio.gov/ohio-revised-code/section-3113.31" },
        );
        break;
      case "white_collar":
        links.push({ label: "White collar defense", href: absolute(input.siteUrl, "/white-collar-crimes-attorney-delaware-oh") });
        break;
      case "personal_injury":
        links.push({ label: "Personal injury", href: absolute(input.siteUrl, "/personal-injury-lawyer-delaware-oh") });
        break;
      case "bond_jail":
        links.push({ label: "Bond & jail information (Delaware County)", href: absolute(input.siteUrl, "/blog/bond-jail-information-delaware-county-ohio") });
        break;
      default:
        break;
    }
  }

  if (
    text.includes("ovi") ||
    text.includes("dui") ||
    text.includes("drunk") ||
    text.includes("impaired") ||
    text.includes("breath") ||
    text.includes("bac")
  ) {
    links.push(
      { label: "What to do after an OVI arrest (guide)", href: absolute(input.siteUrl, "/resources/what-to-do-after-ovi-arrest") },
      { label: "ORC § 4511.19 — OVI/DUI (official)", href: "https://codes.ohio.gov/ohio-revised-code/section-4511.19" },
      { label: "Ohio Revised Code glossary", href: absolute(input.siteUrl, "/glossary") },
    );
  }

  if (text.includes("checkpoint")) {
    links.push({ label: "Ohio DUI checkpoint map", href: absolute(input.siteUrl, "/resources/dui-checkpoints") });
  }

  if (text.includes("bond") || text.includes("bail") || text.includes("jail")) {
    links.push({ label: "Bond & jail information (Delaware County)", href: absolute(input.siteUrl, "/blog/bond-jail-information-delaware-county-ohio") });
  }

  if (text.includes("protection order") || text.includes("cpo") || text.includes("restraining")) {
    links.push(
      { label: "Protection order defense", href: absolute(input.siteUrl, "/protection-order-lawyer-delaware-oh") },
      { label: "ORC § 3113.31 — Civil protection orders (official)", href: "https://codes.ohio.gov/ohio-revised-code/section-3113.31" },
    );
  }

  if (text.includes("drug") || text.includes("possession") || text.includes("trafficking")) {
    links.push({ label: "Drug crimes defense", href: absolute(input.siteUrl, "/drug-crime-lawyer-delaware-oh") });
  }

  if (text.includes("sex crime") || text.includes("rape") || text.includes("importuning")) {
    links.push({ label: "Sex crimes defense", href: absolute(input.siteUrl, "/sex-crime-defense-lawyer-delaware-oh") });
  }

  if (text.includes("fraud") || text.includes("embezzle") || text.includes("white collar")) {
    links.push({ label: "White collar defense", href: absolute(input.siteUrl, "/white-collar-crimes-attorney-delaware-oh") });
  }

  const unique = uniqByHref(links).slice(0, 4);
  return unique.map((l) => ({ label: escapeHtml(l.label), href: escapeHtml(l.href) }));
}
