export type EmailTheme = "dark" | "light";
export type EmailSeason = "spring" | "summer" | "fall" | "winter";

export type EmailThemeTokens = {
  bg: string;
  panel: string;
  text: string;
  muted: string;
  muted2: string;
  border: string;
  consoleBg: string;
  consoleBorder: string;
  link: string;
};

export type EmailSeasonTokens = {
  stripFrom: string;
  stripTo: string;
  headerFrom: string;
  headerTo: string;
  accent: string;
};

export function getThemeTokens(theme: EmailTheme): EmailThemeTokens {
  if (theme === "light") {
    return {
      bg: "#F3F4F6",
      panel: "#FFFFFF",
      text: "#111827",
      muted: "#4B5563",
      muted2: "#6B7280",
      border: "rgba(17,24,39,.10)",
      consoleBg: "#0B0F14",
      consoleBorder: "rgba(17,24,39,.10)",
      link: "#0F6E63",
    };
  }

  return {
    bg: "#0B0F14",
    panel: "#111827",
    text: "#E5E7EB",
    muted: "#9CA3AF",
    muted2: "#6B7280",
    border: "rgba(255,255,255,.10)",
    consoleBg: "#05080C",
    consoleBorder: "rgba(255,255,255,.10)",
    link: "#22C55E",
  };
}

export function getSeasonTokens(season: EmailSeason): EmailSeasonTokens {
  switch (season) {
    case "spring":
      return {
        stripFrom: "#22C55E",
        stripTo: "#F4A300",
        headerFrom: "#0D3B2E",
        headerTo: "#F4A300",
        accent: "#22C55E",
      };
    case "summer":
      return {
        stripFrom: "#F59E0B",
        stripTo: "#22C55E",
        headerFrom: "#0F6E63",
        headerTo: "#F59E0B",
        accent: "#F59E0B",
      };
    case "fall":
      return {
        stripFrom: "#F97316",
        stripTo: "#F4A300",
        headerFrom: "#7C2D12",
        headerTo: "#F4A300",
        accent: "#F97316",
      };
    case "winter":
    default:
      return {
        stripFrom: "#38BDF8",
        stripTo: "#22C55E",
        headerFrom: "#0F172A",
        headerTo: "#0D3B2E",
        accent: "#38BDF8",
      };
  }
}

