"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Fatal error caught by global error boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#F7F5EF] p-4 text-[#292D29] font-sans antialiased">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#292D29]/15 bg-[#D9E5D6] text-[#C77D63]">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#292D29]">
              Fatal Application Error
            </h1>
            <p className="text-sm leading-relaxed text-[#292D29]/75">
              A critical error occurred while rendering the root application
              shell. Your local learning data remains safely preserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl bg-[#292D29] px-4 py-2.5 text-sm font-medium text-[#F7F5EF] hover:opacity-90"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reload Application</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#292D29]/20 bg-white px-4 py-2.5 text-sm font-medium text-[#292D29] hover:bg-[#F7F5EF]"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
