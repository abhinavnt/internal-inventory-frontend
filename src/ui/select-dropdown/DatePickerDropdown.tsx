"use client";
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
interface DatePickerDropdownProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  minWidth?: string;
}
export function DatePickerDropdown({ label, value = "", onChange, minWidth = "120px" }: DatePickerDropdownProps) {
  const [selectedDate, setSelectedDate] = useState(value);
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    onChange?.(e.target.value);
  };
  return (
    <div
      className="relative p-[1px] rounded-lg"
      style={{
        background: "linear-gradient(260.24deg, #0CC2EF 2.29%, #ECFA23 94.49%)",
      }}
    >
      <div
        className="relative bg-[#2d3635] rounded-lg px-1.5 xs:px-2.5 py-2.5 pr-5 xs:pr-7 text-xs xs:text-sm text-white cursor-pointer overflow-hidden"
        style={{ minWidth }}
      >
        {/* Display label if no date, else formatted date */}
        <span className="truncate block">{selectedDate ? formatDate(selectedDate) : label}</span>
        {/* Hidden input that actually triggers the calendar */}
        <input type="date" value={selectedDate} onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        {/* Dropdown Arrow */}
        <TiArrowSortedDown className="absolute right-1 xs:right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" size={12} />
      </div>
    </div>
  );
}
