"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { THEME_CONFIG } from "@/config/theme";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={THEME_CONFIG.attribute}
      defaultTheme={THEME_CONFIG.defaultTheme}
      enableSystem={THEME_CONFIG.enableSystem}
      disableTransitionOnChange={THEME_CONFIG.disableTransitionOnChange}
      storageKey={THEME_CONFIG.storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
