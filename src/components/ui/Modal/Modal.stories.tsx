import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalTrigger, ModalFooter } from '.';
import { Button } from '../Button';
import { Input } from '../Input';
import { useState } from 'react';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component built on Radix UI with smooth animations and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal 
          open={open} 
          onOpenChange={setOpen}
          title="Default Modal"
          description="This is a basic modal with title and description."
        >
          <p className="text-gray-600 mb-4">
            This is the modal content. You can put any content here.
          </p>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Create Account</Button>
        <Modal 
          open={open} 
          onOpenChange={setOpen}
          title="Create Account"
          description="Enter your details to create a new account."
          size="md"
        >
          <form className="space-y-4">
            <Input label="Full Name" placeholder="Enter your full name" required />
            <Input label="Email" type="email" placeholder="Enter your email" required />
            <Input label="Password" type="password" placeholder="Create a password" required />
            
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={() => setOpen(false)}>
                Create Account
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  },
};

export const ConfirmationModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete Item
        </Button>
        <Modal 
          open={open} 
          onOpenChange={setOpen}
          title="Confirm Deletion"
          description="This action cannot be undone. Are you sure you want to delete this item?"
          size="sm"
        >
          <div className="text-center py-4">
            <p className="text-gray-600 mb-6">
              The item will be permanently removed from your account.
            </p>
            <ModalFooter className="justify-center">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </>
    );
  },
};

export const LargeModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
        <Modal 
          open={open} 
          onOpenChange={setOpen}
          title="Large Modal"
          description="This modal demonstrates the large size variant."
          size="xl"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              This is a larger modal that can accommodate more content. It's perfect for forms,
              detailed information, or when you need more space for your content.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Save Changes
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal 
          open={open} 
          onOpenChange={setOpen}
          title="Modal Without Close Button"
          description="This modal doesn't show the X button in the corner."
          showCloseButton={false}
        >
          <p className="text-gray-600 mb-4">
            You must use the buttons below to close this modal.
          </p>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};