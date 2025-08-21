// src/components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">{icon}</div>}
                <input
                    className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };