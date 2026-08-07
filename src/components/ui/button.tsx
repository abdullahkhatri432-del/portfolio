"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary via-[#8b5cf6] to-secondary text-white shadow-[0_8px_32px_-8px_rgba(124,58,237,0.6)] hover:shadow-[0_12px_44px_-8px_rgba(124,58,237,0.85)] hover:brightness-110",
        secondary: "glass text-white hover:border-white/25 hover:bg-white/10",
        outline:
          "border border-white/15 bg-transparent text-white hover:border-secondary/60 hover:bg-secondary/10 hover:text-secondary-soft",
        ghost: "text-muted hover:bg-white/5 hover:text-white",
        accent:
          "bg-gradient-to-r from-accent to-emerald-400 text-[#04120a] font-semibold shadow-[0_8px_32px_-8px_rgba(34,197,94,0.55)] hover:brightness-110",
        link: "text-secondary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-13 px-8 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
        "icon-sm": "size-9 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Emit an expanding ripple from the click position. */
  ripple?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      ripple = true,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);
    const Comp = asChild ? Slot : "button";

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !asChild) {
        const rect = event.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const id = Date.now() + Math.random();
        setRipples((prev) => [
          ...prev,
          {
            id,
            size,
            x: event.clientX - rect.left - size / 2,
            y: event.clientY - rect.top - size / 2,
          },
        ]);
        window.setTimeout(
          () => setRipples((prev) => prev.filter((r) => r.id !== id)),
          650,
        );
      }
      onClick?.(event);
    };

    const classes = cn(
      buttonVariants({ variant, size }),
      "overflow-hidden",
      className,
    );

    // `Slot` requires exactly one child, so the ripple layer is only rendered
    // for real <button> elements.
    if (asChild) {
      return (
        <Comp ref={ref} className={classes} onClick={onClick} {...props}>
          {children}
        </Comp>
      );
    }

    return (
      <button ref={ref} className={classes} onClick={handleClick} {...props}>
        {children}
        {ripple &&
          ripples.map((r) => (
            <span
              key={r.id}
              aria-hidden
              className="pointer-events-none absolute animate-[ripple_0.65s_ease-out] rounded-full bg-white/30"
              style={{
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
              }}
            />
          ))}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
