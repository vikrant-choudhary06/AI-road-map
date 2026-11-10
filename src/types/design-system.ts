/**
 * Design system token & navigation types.
 */

export type ThemeMode = "light" | "dark" | "system";

export interface ColorTokenSwatch {
  name: string;
  token: string;
  cssVar: string;
  lightHex: string;
  darkHex: string;
  role: string;
  contrastNote: string;
}

export interface TypographySpec {
  id: string;
  label: string;
  element: string;
  fontFamily: "display" | "sans" | "mono";
  sizeSpec: string;
  lineHeight: string;
  sampleText: string;
  usage: string;
}

export interface NavItem {
  label: string;
  href: string;
  stageNote?: string;
  badge?: string;
}
