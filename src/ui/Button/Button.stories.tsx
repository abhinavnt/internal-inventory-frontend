import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "soldOut"],
    },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Get Ticket",
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Coming Soon",
    disabled: true,
  },
};

export const SoldOut: Story = {
  args: {
    variant: "soldOut",
    children: "Sold Out",
    disabled: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    children: "Get Ticket",
    disabled: true,
  },
};