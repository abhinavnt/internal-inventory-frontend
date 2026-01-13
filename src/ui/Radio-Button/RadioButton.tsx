"use client";

import React from "react";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function RadioButton({ label, ...props }: RadioButtonProps) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        {...props}
        className="
          appearance-none w-6 h-6 rounded-full border-2 border-white/80 bg-transparent relative
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 
          before:w-3.5 before:h-3.5 before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2
          before:scale-0 checked:before:scale-100
          before:bg-gradient-to-r before:from-[#0CC2EF] before:to-[#ECFA23]
          transition-all duration-300
        "
      />
      <span className="text-white/90 text-[11px] md:text-sm lg:text-lg">{label}</span>
    </label>
  );
}
