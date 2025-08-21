'use client';

import React, { InputHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

const inputStyles = cva(
  'flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      hasError: {
        true: 'border-red-500 focus-visible:ring-red-500',
      },
      hasIcon: {
        true: 'pl-10',
      }
    },
  }
);

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  Icon?: React.ElementType; // Menggunakan ElementType agar lebih fleksibel
  containerClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, id, error, Icon, containerClassName, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={`w-full ${containerClassName || ''}`}>
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <input
            id={inputId}
            className={inputStyles({ hasError: !!error, hasIcon: !!Icon, className })}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };