import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function BreadcrumbNav({ items, className = '' }: BreadcrumbNavProps) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-safari-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-safari-700 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-semibold text-safari-800' : ''}>{item.label}</span>
              )}
              {!isLast ? <ChevronRight size={14} className="text-safari-400" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
