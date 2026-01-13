import type { Meta, StoryObj } from "@storybook/nextjs";
import { CustomSelect } from "./CustomSelect";
import { FiFilter, FiShield, FiBarChart2 } from "react-icons/fi";

const meta = {
  title: "Ui/CustomSelect",
  component: CustomSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active Only" },
  { value: "blocked", label: "Blocked Only" },
];

const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
  { value: "user", label: "User" },
];

const sortOptions = [
  { value: "name", label: "Sort by Name" },
  { value: "date", label: "Sort by Join Date" },
  { value: "email", label: "Sort by Email" },
];

export const Default: Story = {
  args: {
    value: "all",
    onChange: () => {},
    options: statusOptions,
    placeholder: "Select status",
  },
};

export const WithIcon: Story = {
  args: {
    value: "all",
    onChange: () => {},
    options: statusOptions,
    icon: <FiFilter className="w-4 h-4" />,
    placeholder: "Filter by status",
  },
};

export const RoleFilter: Story = {
  args: {
    value: "all",
    onChange: () => {},
    options: roleOptions,
    icon: <FiShield className="w-4 h-4" />,
    placeholder: "Filter by role",
  },
};

export const SortSelect: Story = {
  args: {
    value: "name",
    onChange: () => {},
    options: sortOptions,
    icon: <FiBarChart2 className="w-4 h-4" />,
    placeholder: "Sort by",
  },
};

export const NoPlaceholder: Story = {
  args: {
    value: "active",
    onChange: () => {},
    options: statusOptions,
  },
};
