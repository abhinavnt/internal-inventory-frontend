"use client";

import React, { type InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, error, ...props }) => {
  return (
    <div>
      <label className="block text-white text-sm font-normal mb-2 lg:text-lg">{label}</label>
      <input
        {...props}
        className={`w-full px-0 py-2 bg-transparent border-0 border-b ${
          error ? "border-red-500" : "border-white/30"
        } text-white placeholder-white/40 focus:border-[#0cc2ef] focus:outline-none transition-colors`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
