import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/layout/section-container";
import { BrandSymbol } from "@/components/layout/site-header";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <Container className="py-14 sm:py-18">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand & Mission Note */}
          <div className="flex flex-col gap-4 lg:col-span-6">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-3 rounded-lg py-1 pr-2"
            >
              <span className="flex size-8 items-center justify-center rounded-lg border border-border-strong bg-background shadow-2xs">
                <BrandSymbol className="size-4" />
              </span>
              <span className="text-base font-semibold tracking-tight text-foreground">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <p className="max-w-md text-sm font-medium leading-relaxed text-foreground">
              {SITE_CONFIG.footerNote}
            </p>

            <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">
              Structured across nine progressive phases—from Python and linear
              algebra to pretraining, fine-tuning, and aligning custom Large
              Language Models from scratch.
            </p>

            <div className="pt-2">
              <ThemeToggle variant="segmented" />
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="flex flex-col gap-3 sm:col-span-6 lg:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated External Resources */}
          <div className="flex flex-col gap-3 sm:col-span-6 lg:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Resources
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {SITE_CONFIG.footerExternalResources.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{resource.label}</span>
                    <ArrowUpRight
                      className="size-3.5 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Independence Disclaimer, Privacy Notice & Copyright */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <p className="leading-relaxed max-w-4xl">{SITE_CONFIG.disclaimer}</p>
          <div className="rounded-xl border border-border/80 bg-background/50 p-3.5 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              Local Storage &amp; Privacy Notice:{" "}
            </span>
            Open AI Roadmap stores all your topic completions, course bookmarks,
            project notes, and study sessions locally in your browser&apos;s{" "}
            <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[11px] text-foreground">
              localStorage
            </code>
            . We do not collect personal data, require user accounts, or run
            external tracking scripts. Because your learning data is
            device-specific, you can export a portable JSON backup from the{" "}
            <Link
              href="/dashboard"
              className="text-terracotta underline-offset-2 hover:underline"
            >
              Dashboard
            </Link>{" "}
            at any time.
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-1">
            <p>© 2026 {SITE_CONFIG.name}. Free &amp; open educational curriculum.</p>
            <p className="font-mono text-[11px]">
              9 Phases · 14 Projects · 78-Week Structured Pace
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
