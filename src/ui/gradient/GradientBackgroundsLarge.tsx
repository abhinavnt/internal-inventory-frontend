import React from "react";

export const GradientBackgroundsLarge = () => {
  return (
    <div className="hidden lg:block">
      {/* Left gradient */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "0px",
          top: "50%",
          width: "250px",
          height: "250px",
          background:
            "linear-gradient(298.56deg, rgba(12, 194, 239, 0.15) 4.82%, rgba(236, 250, 35, 0.15) 88.76%)",
          transform: "translateY(-50%)",
          borderRadius: "50%",
          filter: "blur(70px)",
        }}
      />

      {/* Bottom center gradient */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          bottom: "0px",
          width: "200px",
          height: "200px",
          background:
            "linear-gradient(298.56deg, rgba(12, 194, 239, 0.15) 4.82%, rgba(236, 250, 35, 0.15) 88.76%)",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      {/* Top right gradient */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "0px",
          top: "150px",
          width: "170px",
          height: "170px",
          background:
            "linear-gradient(298.56deg, rgba(12, 194, 239, 0.15) 4.82%, rgba(236, 250, 35, 0.15) 88.76%)",
          borderRadius: "50%",
          filter: "blur(55px)",
        }}
      />
    </div>
  );
};
