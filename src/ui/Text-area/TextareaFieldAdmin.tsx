"use client";

import React, { type TextareaHTMLAttributes } from "react";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextareaFieldAdmin: React.FC<TextareaFieldProps> = ({ label, error, ...props }) => {
  return (
    <div>
      <label className="block text-white text-sm font-normal mb-2 lg:text-lg">{label}</label>
      <textarea
        {...props}
        className={`w-full px-4 py-3 bg-transparent border ${
          error ? "border-red-500" : "border-white/30"
        } rounded-lg text-white placeholder-white/40 focus:border-[#0cc2ef] focus:outline-none transition-colors min-h-[120px] resize-y`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
