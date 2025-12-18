import * as React from "react"

type Variant = "default" | "outline" | "ghost"
type Size = "default" | "lg" | "sm"

const base =
  "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(var(--primary))] disabled:opacity-50 disabled:pointer-events-none"
const variants: Record<Variant, string> = {
  default:
    "bg-[rgb(var(--primary))] text-white hover:opacity-90 shadow-sm",
  outline:
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
}
const sizes: Record<Size, string> = {
  default: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  sm: "h-9 px-3 text-sm",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
