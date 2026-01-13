import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onOtpChange?: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 4, onComplete, onOtpChange }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onOtpChange?.(otpString);

    // Focus next input
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (otpString.length === length && !otpString.includes("")) {
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        onOtpChange?.(newOtp.join(""));
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
        onOtpChange?.(newOtp.join(""));
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("").slice(0, length);

    if (pasteArray.every((char) => !isNaN(Number(char)))) {
      const newOtp = [...pasteArray, ...new Array(length - pasteArray.length).fill("")];
      setOtp(newOtp);
      onOtpChange?.(newOtp.join(""));

      const nextEmpty = pasteArray.length < length ? pasteArray.length : length - 1;
      inputRefs.current[nextEmpty]?.focus();

      if (pasteArray.length === length) {
        onComplete?.(newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex gap-3 md:gap-4 lg:gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-[50px] h-[60px] 
                     bg-[rgba(217,217,217,0.1)] backdrop-blur-[35px] border border-white/20 
                     rounded-[5px] 
                     text-white text-center text-xl md:text-2xl lg:text-3xl font-semibold
                     focus:outline-none focus:border-[#0cc2ef] focus:border-2
                     transition-all duration-200"
        />
      ))}
    </div>
  );
};
