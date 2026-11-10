import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("text-foreground tracking-tight text-balance", {
  variants: {
    level: {
      display:
        "font-display text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-[-0.02em]",
      h1: "font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.15] tracking-[-0.025em]",
      h2: "font-sans text-2xl sm:text-3xl font-semibold leading-[1.2] tracking-[-0.02em]",
      h3: "font-sans text-xl sm:text-2xl font-semibold leading-[1.28] tracking-[-0.015em]",
      h4: "font-sans text-base sm:text-lg font-semibold leading-[1.35] tracking-[-0.01em]",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

type HeadingElement = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingElement;
}

export function Heading({
  as,
  level = "h2",
  className,
  ...props
}: HeadingProps) {
  const Component: HeadingElement =
    as ?? (level === "display" ? "h1" : level ?? "h2");

  return (
    <Component
      className={cn(headingVariants({ level }), className)}
      {...props}
    />
  );
}

const textVariants = cva("text-pretty", {
  variants: {
    variant: {
      default: "text-base leading-7 text-foreground",
      lead: "text-lg sm:text-xl leading-relaxed text-muted-foreground font-normal",
      muted: "text-sm sm:text-base leading-relaxed text-muted-foreground",
      small: "text-sm leading-6 text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export function Text({ className, variant, ...props }: TextProps) {
  return <p className={cn(textVariants({ variant }), className)} {...props} />;
}

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  indicator?: boolean;
}

export function Eyebrow({
  className,
  indicator = true,
  children,
  ...props
}: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    >
      {indicator && (
        <span
          className="size-1.5 rounded-full bg-terracotta shrink-0"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
}

export function Caption({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-xs leading-5 text-muted-foreground", className)}
      {...props}
    />
  );
}

export function InlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CodeBlock({
  className,
  children,
  label,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-muted/80">
      {label && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground bg-card/50">
          <span>{label}</span>
          <span className="text-[11px] uppercase tracking-wider">PyTorch / Tensor</span>
        </div>
      )}
      <pre
        className={cn(
          "overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-foreground",
          className
        )}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function Kbd({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex min-h-5 items-center justify-center rounded border border-border-strong bg-card px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground shadow-2xs",
        className
      )}
      {...props}
    />
  );
}
