import type { Meta, StoryObj } from "@storybook/nextjs";
import { BackButton } from "./back-button";

const meta = {
  title: "Ui/BackButton",
  component: BackButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "400px", height: "200px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomText: Story = {
  args: {
    text: "Go Back",
  },
};

export const WithAction: Story = {
  args: {
    onClick: () => alert("Back button clicked!"),
  },
};
