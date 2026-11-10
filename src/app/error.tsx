"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error("Runtime error caught by page error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col justify-center py-16 sm:py-24">
      <Container className="max-w-xl text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="terracotta">Application Error</Badge>
            <Badge variant="outline">Graceful Recovery</Badge>
          </div>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-soft text-accent-terracotta">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Something Interrupted Your Session
            </h1>
            <p className="text-sm leading-relaxed text-foreground-secondary">
              An unexpected client error occurred. Your saved learning progress
              in localStorage is secure and has not been affected.
            </p>
          </div>

          {error.digest && (
            <p className="font-mono text-xs text-foreground-muted">
              Error Digest: {error.digest}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={reset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Again</span>
            </Button>

            <Button asChild variant="outline" size="md">
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                <span>Return to Homepage</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
