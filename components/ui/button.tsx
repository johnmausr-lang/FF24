import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    // Базовые стили: центрирование, шрифты, переходы
    const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-DEFAULT disabled:pointer-events-none disabled:opacity-50 active:scale-95"
    
    // Дизайн вариантов (используем ваши переменные из globals.css)
    const variants = {
      default: "bg-accent-DEFAULT text-black hover:bg-white shadow-neon hover:shadow-none",
      outline: "border-2 border-accent-DEFAULT text-accent-DEFAULT hover:bg-accent-DEFAULT hover:text-black bg-transparent",
      ghost: "hover:bg-white/10 text-white",
      link: "text-accent-DEFAULT underline-offset-4 hover:underline",
    }

    // Размеры
    const sizes = {
      default: "h-12 px-6 py-3",
      sm: "h-9 px-4 text-xs",
      lg: "h-16 px-10 text-lg",
      icon: "h-12 w-12",
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
