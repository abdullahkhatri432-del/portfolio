import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  /** Constrain content to the page container. */
  container?: boolean;
}

/** Standard page section with consistent vertical rhythm and scroll offset. */
export function Section({
  id,
  className,
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-28 lg:py-36", className)}
      {...props}
    >
      {container ? <div className="container-page">{children}</div> : children}
    </section>
  );
}
