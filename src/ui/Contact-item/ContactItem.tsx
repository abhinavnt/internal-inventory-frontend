"use client";

import React from "react";

interface ContactItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
  gradientId: string;
}

export const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, children, gradientId }) => {
  return (
    <div className="flex items-center gap-4">
      <Icon
        className="h-[18px] w-[18px] md:h-7 md:w-7 lg:h-9 lg:w-9 flex-shrink-0"
        style={{
          fill: `url(#${gradientId})`,
          stroke: `url(#${gradientId})`,
        }}
      />
      {children}
    </div>
  );
};
