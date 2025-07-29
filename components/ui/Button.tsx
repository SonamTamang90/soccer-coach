"use client";

import React, { forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = "primary", 
    size = "md", 
    isLoading = false, 
    children, 
    className, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = "relative flex justify-center items-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "text-black bg-primary hover:bg-primary focus:ring-primary shadow-lg hover:shadow-xl",
      secondary: "text-primary-white bg-surface hover:bg-surface-light border border-dark shadow-sm focus:ring-primary"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-4 py-3.5 text-sm",
      lg: "px-8 py-3.5 text-lg"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {typeof children === "string" && children.includes("Sign") 
              ? "Signing in..." 
              : "Loading..."
            }
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };