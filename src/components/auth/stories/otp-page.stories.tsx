import type { Meta, StoryObj } from "@storybook/nextjs";
import { OtpPage } from "../otp-page";

const meta: Meta<typeof OtpPage> = {
  title: "Auth/OtpPage",
  component: OtpPage,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => console.log("Back clicked"),
    onSubmit: (otp: string) => console.log("OTP submitted:", otp),
    onSwitchToLogin: () => console.log("Switch to login clicked"),
  },
};

export const WithAlerts: Story = {
  args: {
    onBack: () => alert("Back button clicked"),
    onSubmit: (otp: string) => alert(`OTP submitted: ${otp}`),
    onSwitchToLogin: () => alert("Switching to login"),
  },
};
