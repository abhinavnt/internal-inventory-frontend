import type { Meta, StoryObj } from "@storybook/nextjs";
import { TextareaField } from "./TextareaField";

const meta = {
  title: "UI/TextareaFieldAdmin",
  component: TextareaField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter description...",
  },
};

export const WithValue: Story = {
  args: {
    label: "Bio",
    value: "This is a sample bio text that spans multiple lines.",
  },
};

export const Required: Story = {
  args: {
    label: "Comments",
    required: true,
    placeholder: "Please provide your comments",
  },
};
