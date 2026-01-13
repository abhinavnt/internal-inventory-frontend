import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder, icon, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={twMerge("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer  border border-white/10 rounded-lg text-foreground hover:border-[#0cc2ef]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0cc2ef]/50"
      >
        {icon && <span className="text-muted-foreground flex-shrink-0">{icon}</span>}
        <span className="flex-1 text-left text-sm">{selectedOption?.label || placeholder}</span>
        <FiChevronDown className={twMerge("w-4 h-4 text-muted-foreground transition-transform flex-shrink-0", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto no-scrollbar" >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={twMerge(
                  "w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[hsl(195,13%,20%)]",
                  value === option.value ? "bg-muted text-foreground font-medium" : "text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
