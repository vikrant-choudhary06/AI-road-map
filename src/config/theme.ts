/**
 * Canonical design tokens and theme configuration for the AI & LLM Learning Roadmap Platform.
 *
 * Primary Palette:
 * - Warm Ivory:  #F7F5EF
 * - Soft Sage:   #D9E5D6
 * - Muted Green: #A9B9A3
 * - Terracotta:  #C77D63
 * - Charcoal:    #292D29
 */

export const BRAND_PALETTE = {
  warmIvory: "#F7F5EF",
  softSage: "#D9E5D6",
  mutedGreen: "#A9B9A3",
  terracotta: "#C77D63",
  charcoal: "#292D29",
} as const;

export const SEMANTIC_THEME_TOKENS = {
  light: {
    background: "#F7F5EF",
    foreground: "#292D29",
    card: "#FCFBF8",
    cardForeground: "#292D29",
    muted: "#EFECE3",
    mutedForeground: "#525952",
    sageSurface: "#D9E5D6",
    sageMuted: "#A9B9A3",
    sageDeep: "#364933",
    terracotta: "#C77D63",
    terracottaStrong: "#A8583E",
    terracottaSubtle: "#F6EAE4",
    border: "#DFDDD4",
    borderStrong: "#C7C4B8",
    ring: "#C77D63",
    link: "#A8583E",
    success: "#2E6B47",
    warning: "#B86B19",
    error: "#B9382C",
  },
  dark: {
    background: "#1A1D1A",
    foreground: "#F0EDE4",
    card: "#222622",
    cardForeground: "#F0EDE4",
    muted: "#262B26",
    mutedForeground: "#A5B0A3",
    sageSurface: "#2C342B",
    sageMuted: "#7C8F77",
    sageDeep: "#C5D6C1",
    terracotta: "#D0876E",
    terracottaStrong: "#DF9A82",
    terracottaSubtle: "#332520",
    border: "#323832",
    borderStrong: "#464E45",
    ring: "#D0876E",
    link: "#DF9A82",
    success: "#58A673",
    warning: "#DF9B48",
    error: "#E06C60",
  },
} as const;

export const THEME_CONFIG = {
  attribute: "class" as const,
  defaultTheme: "light",
  enableSystem: true,
  disableTransitionOnChange: false,
  storageKey: "ai-roadmap-theme",
};
