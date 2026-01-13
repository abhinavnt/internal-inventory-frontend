"use client";

import React, { type TextareaHTMLAttributes, type CSSProperties } from "react";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({ label, ...props }) => {
  const linedTextareaStyles: CSSProperties = {
    backgroundImage:
      "repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--textarea-line-height) - 1px), rgba(255, 255, 255, 0.24) calc(var(--textarea-line-height) - 1px), rgba(255, 255, 255, 0.24) var(--textarea-line-height))",
    backgroundRepeat: "repeat-y",
    backgroundSize: "100% var(--textarea-line-height)",
    backgroundPosition: "top left",
    lineHeight: "var(--textarea-line-height)",
    caretColor: "var(--color-event-primary, #0cc2ef)",
  };

  return (
    <div>
      <label className="block text-white text-sm font-normal mb-1 lg:text-lg lg:mb-3">{label}</label>
      <textarea
        {...props}
        style={{ ...linedTextareaStyles, overflow: "hidden" }}
        className="
          w-full px-0 pt-0.5 md:pt-1 pb-1
          bg-transparent text-white
          placeholder-white/40 placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-sm
          placeholder:-translate-y-1
          border-none resize-none transition focus:outline-none
          [--textarea-line-height:1.75rem] md:[--textarea-line-height:2rem]
          [--textarea-visible-rows:2] lg:[--textarea-visible-rows:1]
          min-h-[calc(var(--textarea-line-height)*var(--textarea-visible-rows))]
        "
      />
    </div>
  );
};
