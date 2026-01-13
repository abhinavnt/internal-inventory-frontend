import type { Meta, StoryObj } from "@storybook/nextjs";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Ui/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

// Default Radio
export const Default: Story = {
  args: {
    label: "General Inquiry",
    value: "General Inquiry",
    checked: false,
  },
};

// Checked Radio
export const Checked: Story = {
  args: {
    label: "Ticket Assistance",
    value: "Ticket Assistance",
    checked: true,
  },
};

// Multiple Radios Example
export const MultipleRadios: Story = {
  render: () => (
    <div className="flex gap-6">
      <RadioButton label="General Inquiry" value="general" name="subject" checked={true} onChange={() => {}} />
      <RadioButton label="Ticket Assistance" value="ticket" name="subject" checked={false} onChange={() => {}} />
      <RadioButton label="Media & Press" value="media" name="subject" checked={false} onChange={() => {}} />
    </div>
  ),
};
