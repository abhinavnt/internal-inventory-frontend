"use client";

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1C2023] text-white space-y-6">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-gray-700 border-t-[#ECFA23] rounded-full animate-spin"></div>

      {/* Text */}
      <div className="flex flex-col items-center text-gray-300">
        <p className="text-lg font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
