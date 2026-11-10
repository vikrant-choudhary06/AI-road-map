"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { ArrowRight, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/layout/section-container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Custom geometric architectural emblem — two interlocking coordinate frames
 * with a terracotta trajectory node. Zero generic robot or brain clichés.
 */
export function BrandSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
    >
      <rect
        x="3"
        y="3"
        width="11"
        height="11"
        rx="2"
        className="stroke-foreground"
        strokeWidth="1.75"
      />
      <rect
        x="10"
        y="10"
        width="11"
        height="11"
        rx="2"
        className="stroke-sage-deep fill-secondary/60"
        strokeWidth="1.5"
      />
      <circle cx="15.5" cy="8.5" r="2.5" className="fill-terracotta" />
      <path
        d="M8.5 14L13.5 10"
        className="stroke-terracotta"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ActiveNavLinks({
  onItemClick,
  mobile = false,
}: {
  onItemClick?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      {SITE_CONFIG.navigation.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        if (mobile) {
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary/75 text-foreground font-semibold border border-sage-muted/50"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{item.label}</span>
              {isActive && (
                <span
                  className="size-2 rounded-full bg-terracotta"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative inline-flex min-h-9 items-center rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "text-foreground font-semibold bg-secondary/65"
                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            <span>{item.label}</span>
            {isActive && (
              <span
                className="ml-2 size-1.5 rounded-full bg-terracotta"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        isScrolled
          ? "border-b border-border-strong bg-card/95 shadow-2xs"
          : "border-b border-border/80 bg-background"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Brand Wordmark & Geometric Symbol */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-lg py-1 pr-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-border-strong bg-card shadow-2xs transition-colors group-hover:border-terracotta">
            <BrandSymbol />
          </span>
          <span className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-foreground leading-none">
              {SITE_CONFIG.name}
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground leading-none">
              Phase 0 – Phase 8
            </span>
          </span>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1"
        >
          <React.Suspense
            fallback={
              <div className="flex items-center gap-1">
                {SITE_CONFIG.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex min-h-9 items-center rounded-lg px-3.5 py-1.5 text-sm font-medium text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            }
          >
            <ActiveNavLinks />
          </React.Suspense>
        </nav>

        {/* Right Side: Theme Toggle, Start Learning CTA & Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle variant="compact" />

          <Button
            asChild
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/roadmap">
              <span>Start Learning</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          {/* Accessible Mobile Navigation Drawer */}
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-4" />
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col justify-between border-l border-border-strong bg-background p-6 shadow-lg focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-200">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-md border border-border-strong bg-card">
                        <BrandSymbol className="size-4" />
                      </span>
                      <div>
                        <Dialog.Title className="text-sm font-semibold text-foreground">
                          {SITE_CONFIG.name}
                        </Dialog.Title>
                        <Dialog.Description className="font-mono text-[11px] text-muted-foreground">
                          9-Phase AI &amp; LLM Curriculum
                        </Dialog.Description>
                      </div>
                    </div>
                    <Dialog.Close asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Close navigation menu"
                      >
                        <X className="size-4" />
                      </Button>
                    </Dialog.Close>
                  </div>

                  <nav
                    aria-label="Mobile primary navigation"
                    className="flex flex-col gap-1.5"
                  >
                    <React.Suspense fallback={null}>
                      <ActiveNavLinks
                        mobile
                        onItemClick={() => setMobileOpen(false)}
                      />
                    </React.Suspense>
                  </nav>

                  <div className="pt-2">
                    <Button
                      asChild
                      variant="terracotta"
                      size="md"
                      className="w-full justify-center"
                    >
                      <Link
                        href="/roadmap"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>Start Learning</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Appearance
                  </span>
                  <ThemeToggle
                    variant="segmented"
                    className="w-full justify-between"
                  />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  );
}
