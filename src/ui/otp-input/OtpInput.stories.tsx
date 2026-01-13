import type { Meta, StoryObj } from "@storybook/nextjs";
import { OtpInput } from "./OtpInput";

const meta: Meta<typeof OtpInput> = {
  title: "UI/OtpInput",
  component: OtpInput,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    length: {
      control: { type: "number", min: 1, max: 8 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 4,
    onComplete: (otp: string) => console.log("OTP Complete:", otp),
    onOtpChange: (otp: string) => console.log("OTP Change:", otp),
  },
};

export const SixDigits: Story = {
  args: {
    length: 6,
    onComplete: (otp: string) => console.log("OTP Complete:", otp),
    onOtpChange: (otp: string) => console.log("OTP Change:", otp),
  },
};

export const WithHandlers: Story = {
  args: {
    length: 4,
    onComplete: (otp: string) => {
      alert(`OTP Complete: ${otp}`);
    },
    onOtpChange: (otp: string) => {
      console.log(`Current OTP: ${otp}`);
    },
  },
};
