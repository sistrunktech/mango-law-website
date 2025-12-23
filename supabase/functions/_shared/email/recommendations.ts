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
};

export function recommendHelpfulLinks(input: HelpfulLinkInput): HelpfulLink[] {
  const text = normalizeTextForMatch(
    [
      input.message ?? "",
      input.leadSource ?? "",
      input.checkpointId ?? "",
    ].join(" "),
  );

  const links: HelpfulLink[] = [];

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
    links.push({ label: "Bond & jail information (Delaware County)", href: absolute(input.siteUrl, "/resources/bond-jail-information") });
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

