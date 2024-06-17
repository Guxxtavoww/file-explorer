import { LoaderCircle } from 'lucide-react';

import { cn } from '@/utils/cn.util';

export function Loader({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <LoaderCircle
        className={cn(
          'animate-spin fade-in-10 text-3xl transition-all',
          className
        )}
      />
      {label && <span>{label}</span>}
    </div>
  );
}
