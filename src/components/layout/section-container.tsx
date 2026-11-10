import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-10 sm:py-14",
      md: "py-14 sm:py-20",
      lg: "py-20 sm:py-28",
      hero: "pt-12 pb-16 sm:pt-18 sm:pb-24 lg:pt-22 lg:pb-28",
    },
    surface: {
      default: "bg-background text-foreground",
      muted: "bg-muted/60 text-foreground",
      sage: "bg-secondary/40 text-foreground",
      card: "bg-card text-card-foreground",
    },
    border: {
      none: "",
      top: "border-t border-border",
      bottom: "border-b border-border",
      both: "border-y border-border",
    },
  },
  defaultVariants: {
    spacing: "md",
    surface: "default",
    border: "none",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  containerSize?: VariantProps<typeof containerVariants>["size"];
}

export function Section({
  className,
  spacing,
  surface,
  border,
  containerSize = "xl",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing, surface, border }), className)}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  headingLevel?: "display" | "h1" | "h2" | "h3";
  actions?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  headingLevel = "h2",
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 flex flex-col gap-4",
        align === "center"
          ? "items-center text-center mx-auto max-w-3xl"
          : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          align === "center" ? "items-center" : "max-w-2xl"
        )}
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading
          level={headingLevel}
          as={headingLevel === "display" ? "h1" : headingLevel}
        >
          {title}
        </Heading>
        {description && (
          <Text variant="muted" className="text-base sm:text-lg">
            {description}
          </Text>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}
