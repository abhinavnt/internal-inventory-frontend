import React, { useState, useEffect, type InputHTMLAttributes } from "react";

interface AuthInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // ADDED: Optional error prop
}

export const AuthInputField: React.FC<AuthInputFieldProps> = ({ label, error: propError, ...props }) => {
  const [displayError, setDisplayError] = useState<string | null>(null); // NEW: Local state for displayed error

  useEffect(() => {
    if (propError) {
      setDisplayError(propError); // Show error if provided
      const timer = setTimeout(() => {
        setDisplayError(null); // Hide after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setDisplayError(null); // Hide if no error
    }
  }, [propError]);

  return (
    <div>
      <label className="block text-white mb-3 text-lg font-medium leading-none md:text-[17px] lg:text-lg">
        {label}
      </label>
      <div className="bg-[rgba(217,217,217,0.1)] backdrop-blur-[35px] border border-white/20 rounded-[10px] w-[276px] h-[35px] md:rounded-[12px] md:w-full md:h-[45px] lg:rounded-[15px] lg:w-[447px] lg:h-[47px]">
        <input 
          {...props}
          className="w-full h-full bg-transparent px-3 md:px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#0cc2ef] rounded-[10px] md:rounded-[12px] lg:rounded-[15px]"
        />
      </div>
      {/* NEW: Error display below input */}
      {displayError && (
        <p className="mt-1 text-red-400 text-sm font-medium"> {/* Adjust styles as needed for your theme */}
          {displayError}
        </p>
      )}
    </div>
  );
};