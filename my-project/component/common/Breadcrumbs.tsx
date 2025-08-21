// src/components/common/Breadcrumbs.tsx
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{item.label}</span>
            )}
            {index < items.length - 1 && <ChevronRight size={16} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}