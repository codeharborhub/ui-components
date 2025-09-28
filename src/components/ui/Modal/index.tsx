import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  size = 'md',
  showCloseButton = true,
}) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-black/50 z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  className={cn(
                    'fixed left-1/2 top-1/2 z-50 w-full bg-white rounded-lg shadow-xl p-6',
                    sizes[size]
                  )}
                  initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                  animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                  exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                  transition={{ duration: 0.2 }}
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  {showCloseButton && (
                    <Dialog.Close asChild>
                      <button
                        className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label="Close modal"
                      >
                        <X size={16} />
                      </button>
                    </Dialog.Close>
                  )}
                  
                  {(title || description) && (
                    <div className="mb-4">
                      {title && (
                        <Dialog.Title className="text-lg font-semibold text-gray-900 mb-1">
                          {title}
                        </Dialog.Title>
                      )}
                      {description && (
                        <Dialog.Description className="text-sm text-gray-500">
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                  )}
                  
                  <div>{children}</div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export interface ModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({ children, asChild = false }) => {
  return (
    <Dialog.Trigger asChild={asChild}>
      {children}
    </Dialog.Trigger>
  );
};

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('flex items-center justify-end space-x-2 pt-4 mt-4 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Modal, ModalTrigger, ModalFooter };