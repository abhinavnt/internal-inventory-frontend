import type { Meta, StoryObj } from "@storybook/nextjs";
import { SelectDropdown } from "./SelectDropdown";

const meta: Meta<typeof SelectDropdown> = {
  title: "Ui/SelectDropdown",
  component: SelectDropdown,
  tags: ["autodocs"],
  args: {
    label: "Select Option",
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SelectDropdown>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: "2",
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 10 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `${i + 1}`,
    })),
  },
};

export const CustomWidth: Story = {
  args: {
    minWidth: "200px",
  },
};
