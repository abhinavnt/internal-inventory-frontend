import React from "react";
import { ContactItem } from "./ContactItem";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";

export default {
  title: "Ui/ContactItem",
  component: ContactItem,
};

const gradientId = "storybook-contact-gradient";

export const Phone = () => (
  <>
    <svg aria-hidden="true" className="absolute h-0 w-0">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ECFA23" />
          <stop offset="100%" stopColor="#0CC2EF" />
        </linearGradient>
      </defs>
    </svg>
    <ContactItem icon={FaPhoneAlt} gradientId={gradientId}>
      <span className="text-white">+1 (555) 123-4567</span>
    </ContactItem>
  </>
);

export const Email = () => (
  <>
    <svg aria-hidden="true" className="absolute h-0 w-0">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ECFA23" />
          <stop offset="100%" stopColor="#0CC2EF" />
        </linearGradient>
      </defs>
    </svg>
    <ContactItem icon={HiEnvelope} gradientId={gradientId}>
      <span className="text-white">support@example.com</span>
    </ContactItem>
  </>
);

export const Location = () => (
  <>
    <svg aria-hidden="true" className="absolute h-0 w-0">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ECFA23" />
          <stop offset="100%" stopColor="#0CC2EF" />
        </linearGradient>
      </defs>
    </svg>
    <ContactItem icon={FaMapMarkerAlt} gradientId={gradientId}>
      <div>
        <div>3am Project Alpha</div>
        <div>Mohali, India</div>
      </div>
    </ContactItem>
  </>
);
