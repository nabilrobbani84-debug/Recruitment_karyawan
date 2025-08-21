// File: my-project/component/common/Alert.tsx
'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle2, XCircle, Info, X } from 'lucide-react'; // Mengganti AlertCircle agar lebih konsisten

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-200 [&>svg]:text-blue-500',
        success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-700 dark:text-green-200 [&>svg]:text-green-500',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-700 dark:text-yellow-200 [&>svg]:text-yellow-500',
        danger: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-700 dark:text-red-200 [&>svg]:text-red-500',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const icons = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />, // Menggunakan ikon yang lebih cocok untuk warning
  danger: <XCircle className="h-5 w-5" />,
};

// Tipe Props yang Diperbaiki
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string; // Jadikan title opsional
  children: React.ReactNode; // Pesan utama akan ada di children
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ className, variant, title, children, onClose, ...props }) => {
  // Pastikan variant tidak null, jika null, gunakan 'info'
  const finalVariant = variant || 'info';
  const IconComponent = icons[finalVariant];

  return (
    <div role="alert" className={alertVariants({ variant, className })} {...props}>
      {IconComponent}
      <div className="flex flex-col">
        {title && <h5 className="mb-1 font-bold tracking-tight">{title}</h5>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export { Alert, alertVariants }; // Tetap menggunakan named export