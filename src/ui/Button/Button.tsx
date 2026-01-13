"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "gradient" | "solid" | "outline" | "primary" | "secondary" | "soldOut" | "yellow";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  rounded?: string;
  shadow?: boolean;
  hoverEffect?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "gradient",
  fullWidth = false,
  rounded = "rounded-lg",
  shadow = false,

  children,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm md:text-base",
    md: "px-6 py-3 text-base md:text-lg",
    lg: "px-8 py-4 text-lg md:text-xl",
  };

  const variantClasses = {
    gradient: "bg-gradient-to-r from-[#0cc2ef] to-[#ecfa23] text-[#333333] cursor-pointer",
    solid: "bg-[#0cc2ef] text-white",
    outline: "border border-white/30 text-white cursor-pointer",
    primary: "bg-[#ECFA23] text-[#333333] cursor-pointer",
    secondary: "bg-[#0CC2EF] text-[#333333] cursor-pointer",
    soldOut: "border border-red-500 text-red-500 cursor-not-allowed ",
    yellow: "bg-[#ecfa23] text-[#333333]",
  };

  const shadowClasses = shadow ? "shadow-[0_10px_30px_rgba(12,194,239,0.15)]" : "";

  return (
    <button
      {...props}
      className={twMerge(
        "font-semibold flex items-center justify-center ",
        sizeClasses[size],
        variantClasses[variant],
        shadowClasses,
        rounded,
        fullWidth ? "w-full" : "",
        className
      )}
    >
      {children}
    </button>
  );
};
