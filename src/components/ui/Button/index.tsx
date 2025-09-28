import React from 'react';
import { cn } from '../../../lib/utils';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-lg font-medium 
      transition-all duration-200 focus-visible:outline-none 
      focus-visible:ring-2 focus-visible:ring-offset-2 
      disabled:pointer-events-none disabled:opacity-50
      relative overflow-hidden
    `;

    const variants = {
      primary: `
        bg-blue-600 text-white hover:bg-blue-700 
        focus-visible:ring-blue-500 shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-emerald-600 text-white hover:bg-emerald-700 
        focus-visible:ring-emerald-500 shadow-sm hover:shadow-md
      `,
      outline: `
        border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
        focus-visible:ring-blue-500 shadow-sm hover:shadow-md
      `,
      ghost: `
        text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500
      `,
      danger: `
        bg-red-600 text-white hover:bg-red-700 
        focus-visible:ring-red-500 shadow-sm hover:shadow-md
      `,
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-white/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };