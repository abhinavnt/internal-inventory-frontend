import type { Meta, StoryObj } from "@storybook/nextjs";
import { PaymentInput } from "./PaymentInput";

const meta = {
  title: "UI/PaymentInput",
  component: PaymentInput,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1C2023" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
      description: "Input type",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
} satisfies Meta<typeof PaymentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Card Holder Name",
    placeholder: "Enter card holder name",
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: "Enter text here",
  },
};

export const CardNumber: Story = {
  args: {
    label: "Card Number",
    placeholder: "1234 5678 9012 3456",
    type: "text",
  },
};

export const ExpireDate: Story = {
  args: {
    label: "Expire Date",
    placeholder: "MM/YY",
  },
};

export const CVV: Story = {
  args: {
    label: "CVV",
    placeholder: "123",
    type: "password",
  },
};

export const WithError: Story = {
  args: {
    label: "Card Holder Name",
    placeholder: "Enter card holder name",
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Card Holder Name",
    placeholder: "Enter card holder name",
    disabled: true,
  },
};

export const Email: Story = {
  args: {
    label: "Email Address",
    placeholder: "user@example.com",
    type: "email",
  },
};
