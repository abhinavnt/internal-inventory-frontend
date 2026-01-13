import type { Meta, StoryObj } from "@storybook/nextjs";
import { SignupPage } from '../signup-page';

const meta = {
  title: 'Auth/SignupPage',
  component: SignupPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

