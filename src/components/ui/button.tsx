import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap outline-none select-none cursor-pointer transition-all duration-200 ease-in-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 hover:shadow-sm",
        primary:
          "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 hover:shadow-sm",
        secondary:
          "bg-gray-100 text-gray-800 shadow-xs hover:bg-gray-200 hover:text-gray-900",
        outline:
          "border border-gray-200 bg-white text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300",
        ghost:
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700 hover:shadow-sm",
        "destructive-outline":
          "border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700",
        "destructive-ghost":
          "text-red-600 hover:bg-red-50 hover:text-red-700",
        link:
          "text-indigo-600 underline-offset-4 hover:underline hover:text-indigo-700 p-0 h-auto",
        success:
          "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 hover:shadow-sm",
        "success-outline":
          "border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700",
        info:
          "bg-blue-600 text-white shadow-xs hover:bg-blue-700 hover:shadow-sm",
        "info-outline":
          "border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700",
        "info-ghost":
          "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm rounded-xl gap-2 [&_svg]:size-4",
        xs: "h-7 px-2.5 text-xs rounded-lg gap-1 [&_svg]:size-3",
        sm: "h-8 px-3 text-xs sm:text-sm rounded-lg gap-1.5 [&_svg]:size-3.5",
        lg: "h-11 px-5 py-2.5 text-sm sm:text-base rounded-xl gap-2 [&_svg]:size-4.5",
        xl: "h-12 px-6 py-3 text-base rounded-2xl gap-2.5 [&_svg]:size-5",
        icon: "size-9 p-0 rounded-xl [&_svg]:size-4.5",
        "icon-xs": "size-6 p-0 rounded-md [&_svg]:size-3",
        "icon-sm": "size-7 p-0 rounded-lg [&_svg]:size-3.5",
        "icon-lg": "size-10 p-0 rounded-xl [&_svg]:size-5",
      },
      pill: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Button({
  className,
  variant = "default",
  size = "default",
  pill,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, pill, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-1.5" />
          {children}
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </ButtonPrimitive>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
