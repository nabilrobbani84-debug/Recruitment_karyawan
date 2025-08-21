import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle = ({ title, subtitle, align = 'center', className }: SectionTitleProps) => {
  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const marginAutoClass = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={cn(textAlignClass[align], className)}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400", marginAutoClass)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
