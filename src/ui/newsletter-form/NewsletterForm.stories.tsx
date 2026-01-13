import type { Meta, StoryObj } from "@storybook/nextjs";
import { NewsletterForm } from "./NewsletterForm";

const meta: Meta<typeof NewsletterForm> = {
  title: "Ui/NewsletterForm",
  component: NewsletterForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

export const Default: Story = {};
