import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '.';
import { Button } from '../Button';
import { Heart, MessageCircle, Share } from 'lucide-react';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with header, content, and footer sections. Supports different variants and padding options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hover: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Default Card</h3>
        <p className="text-gray-600">This is a basic card with default styling.</p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
        <p className="text-gray-600">This card has a thicker border.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
        <p className="text-gray-600">This card has a shadow for elevation.</p>
      </div>
    ),
  },
};

export const WithHover: Story = {
  args: {
    hover: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
        <p className="text-gray-600">Hover over this card to see the effect.</p>
      </div>
    ),
  },
};

export const CompleteCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
        <CardDescription>Organize your work efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Keep track of your daily tasks and boost your productivity with our
          intuitive task management system.
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Completed</span>
            <span className="text-sm font-medium">24/30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" variant="primary">
          View Tasks
        </Button>
        <Button size="sm" variant="outline">
          Settings
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <Card className="w-96" hover>
      <CardContent padding="none">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
        <div className="p-6">
          <CardHeader padding="none">
            <CardTitle>Building Modern UIs</CardTitle>
            <CardDescription>March 15, 2024 • 5 min read</CardDescription>
          </CardHeader>
          <CardContent padding="none">
            <p className="text-gray-600 mt-4">
              Learn how to create beautiful and accessible user interfaces with
              modern design principles and best practices.
            </p>
          </CardContent>
          <CardFooter padding="none" className="mt-6 justify-between">
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500">
                <Heart size={16} />
                <span className="text-sm">24</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500">
                <MessageCircle size={16} />
                <span className="text-sm">8</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-green-500">
                <Share size={16} />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  ),
};

export const PaddingVariations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card padding="sm">
        <h4 className="font-medium">Small Padding</h4>
        <p className="text-sm text-gray-600 mt-1">Compact spacing</p>
      </Card>
      <Card padding="md">
        <h4 className="font-medium">Medium Padding</h4>
        <p className="text-sm text-gray-600 mt-1">Default spacing</p>
      </Card>
      <Card padding="lg">
        <h4 className="font-medium">Large Padding</h4>
        <p className="text-sm text-gray-600 mt-1">Generous spacing</p>
      </Card>
      <Card padding="none" className="border-2 border-dashed border-gray-300">
        <div className="p-4">
          <h4 className="font-medium">No Padding</h4>
          <p className="text-sm text-gray-600 mt-1">Custom spacing</p>
        </div>
      </Card>
    </div>
  ),
};