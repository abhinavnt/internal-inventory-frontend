"use client";
import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
interface Option {
  label: string;
  value: string;
}
interface SelectDropdownProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  minWidth?: string;
}
export function SelectDropdown({ label, options, value = "", onChange, minWidth = "120px" }: SelectDropdownProps) {
  return (
    <div
      className="relative p-[1px] rounded-lg"
      style={{
        background: "linear-gradient(260.24deg, #0CC2EF 2.29%, #ECFA23 94.49%)",
      }}
    >
      <div className="relative bg-[#2d3635] rounded-lg">
        <select
          className="
            appearance-none bg-[#2d3635] text-white truncate
            px-1.5 xs:px-2.5 py-2.5 pr-5 xs:pr-7
            rounded-lg outline-none w-full cursor-pointer
            text-xs xs:text-sm
          "
          style={{ minWidth }}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="" disabled hidden>
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1c2023] text-white py-2 px-3 text-sm hover:bg-[#0cc2ef] hover:text-black">
              {option.label}
            </option>
          ))}
        </select>
        <TiArrowSortedDown className="absolute right-1 xs:right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={12} />
      </div>
    </div>
  );
}
