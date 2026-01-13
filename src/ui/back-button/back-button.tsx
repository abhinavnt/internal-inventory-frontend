"use client";

import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  onClick?: () => void;
  text?: string;
}

export const BackButton = ({ onClick, text = "Back" }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute flex items-center gap-2 text-white hover:opacity-80 transition-opacity 
                 top-6 left-4 md:top-10 md:left-10 lg:top-12 lg:left-12"
    >
      <FaAngleLeft size={16} className="text-[#ECFA23] md:w-[18px] md:h-[18px] lg:w-5 lg:h-5" />
      <span className="text-sm md:text-sm lg:text-base">{text}</span>
    </button>
  );
};
