import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90 active:translate-y-[0.5px]",
        terracotta:
          "bg-terracotta text-accent-foreground shadow-2xs hover:bg-terracotta-strong active:translate-y-[0.5px]",
        secondary:
          "bg-secondary text-secondary-foreground border border-sage-muted/50 hover:bg-sage-muted/35 active:translate-y-[0.5px]",
        outline:
          "border border-border-strong bg-card text-foreground shadow-2xs hover:bg-muted/70 hover:border-foreground/30",
        subtle:
          "bg-muted text-foreground border border-border hover:bg-muted/80 hover:border-border-strong",
        ghost:
          "text-foreground hover:bg-muted/75 hover:text-foreground",
        link: "text-link underline-offset-4 hover:underline hover:text-foreground px-0 h-auto",
      },
      size: {
        sm: "min-h-9 px-3.5 py-1.5 text-xs gap-1.5 rounded-md",
        md: "min-h-10 px-4 py-2 text-sm gap-2 rounded-lg",
        lg: "min-h-11 px-6 py-2.5 text-base gap-2.5 rounded-lg",
        icon: "size-10 rounded-lg",
        "icon-sm": "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
