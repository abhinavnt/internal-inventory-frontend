import React from "react";

export const GradientBackgroundsSmall = () => {
  return (
    <div className="block lg:hidden">
      {/* Top left gradient (not at very top, pushed down a bit) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "0px",
          top: "0px",
          width: "180px",
          height: "180px",
          background: "linear-gradient(298.56deg, rgba(12, 194, 239, 0.15) 4.82%, rgba(236, 250, 35, 0.15) 88.76%)",
          borderRadius: "50%",
          filter: "blur(55px)",
        }}
      />

      {/* Bottom left gradient */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "0px",
          bottom: "0px",
          width: "200px",
          height: "200px",
          background: "linear-gradient(298.56deg, rgba(12, 194, 239, 0.15) 4.82%, rgba(236, 250, 35, 0.15) 88.76%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};
