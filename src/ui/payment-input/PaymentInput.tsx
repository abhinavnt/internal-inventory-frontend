import React from "react";
import { twMerge } from "tailwind-merge";

export interface PaymentInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const PaymentInput = React.forwardRef<HTMLInputElement, PaymentInputProps>(({ label, error, className, wrapperClassName, ...props }, ref) => {
  return (
    <div className={twMerge("w-full ", wrapperClassName)}>
      {label && <label className="block text-white text-[18px] lg:text-[28px] font-normal mb-3 lg:mb-4">{label}</label>}
      <div
        className={twMerge(
          "relative rounded-[10px] lg:rounded-[15px] p-[1px] bg-gradient-to-r from-[#ECFA23] via-[#8aba53] to-[#0CC2EF]",
          "w-full",
          className
        )}
      >
        <input
          ref={ref}
          {...props}
          className="w-full h-[58px] lg:h-[87px] bg-[#1C2023] rounded-[10px] lg:rounded-[15px] px-4 lg:px-6 text-white text-[16px] lg:text-[20px] placeholder:text-gray-500 focus:outline-none"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
});

PaymentInput.displayName = "PaymentInput";
