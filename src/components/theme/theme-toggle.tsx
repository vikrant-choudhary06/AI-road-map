"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "compact" | "segmented";
  className?: string;
}

/**
 * Accessible theme switcher supporting Light, Dark, and System modes.
 * Hydration-safe via `useMounted`.
 */
export function ThemeToggle({
  variant = "compact",
  className,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (variant === "segmented") {
    const options = [
      { value: "light", label: "Light", icon: Sun },
      { value: "dark", label: "Dark", icon: Moon },
      { value: "system", label: "System", icon: Monitor },
    ] as const;

    return (
      <div
        role="group"
        aria-label="Color theme selection"
        className={cn(
          "inline-flex items-center gap-1 rounded-lg border border-border bg-muted/70 p-1",
          className
        )}
      >
        {options.map(({ value, label, icon: Icon }) => {
          const isActive = mounted && theme === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex min-h-8 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-card text-foreground shadow-2xs border border-border/80"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  const isDark = mounted && resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme (currently ${isDark ? "dark" : "light"})`
          : "Toggle color theme"
      }
      title={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-border-strong hover:bg-muted/60 cursor-pointer",
        className
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4 text-terracotta transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Moon className="size-4 text-foreground transition-transform duration-200" aria-hidden="true" />
        )
      ) : (
        <span className="size-4 rounded-full bg-muted" aria-hidden="true" />
      )}
      <span className="sr-only">
        {mounted ? `Current theme: ${isDark ? "dark" : "light"}` : "Toggle theme"}
      </span>
    </button>
  );
}
