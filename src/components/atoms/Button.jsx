import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-instagram-gradient text-white shadow-lg hover:shadow-xl disabled:opacity-50",
    secondary: "border-2 border-instagram-pink text-instagram-pink hover:bg-instagram-pink hover:text-white disabled:opacity-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50",
    ghost: "text-gray-600 hover:bg-gray-100 disabled:opacity-50"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-instagram-purple focus:ring-offset-2",
        "hover:scale-105 active:scale-95",
        variants[variant],
        sizes[size],
        disabled && "cursor-not-allowed hover:scale-100",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button