import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium leading-5 transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        sage: "bg-secondary text-secondary-foreground border border-sage-muted/50",
        terracotta:
          "bg-terracotta-subtle text-terracotta-strong border border-terracotta/30",
        muted: "bg-muted text-muted-foreground border border-border",
        outline: "bg-transparent text-foreground border border-border-strong",
        phase:
          "font-mono text-[11px] font-semibold tracking-tight bg-card text-foreground border border-border-strong px-2 py-0.5",
        success:
          "bg-success-subtle text-success-foreground border border-success/25",
        warning:
          "bg-warning-subtle text-warning-foreground border border-warning/25",
        error: "bg-error-subtle text-error-foreground border border-error/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
