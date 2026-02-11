import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold uppercase tracking-wider transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "glass bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/25 text-white",
        lime: "glass bg-accent-lime/10 hover:bg-accent-lime/20 text-accent-lime border border-accent-lime/30 hover:border-accent-lime",
        outline: "glass border border-white/20 hover:bg-white/10 text-white",
      },
      size: {
        default: "h-12 px-10 text-base md:text-lg",
        sm: "h-10 px-8 text-sm",
        lg: "h-14 px-12 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
