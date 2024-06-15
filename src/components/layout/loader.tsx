import { LoaderCircle } from 'lucide-react';

import { cn } from '@/utils/cn.util';

export function Loader({ className }: { className?: string }) {
  return (
    <LoaderCircle
      className={cn(
        'animate-spin fade-in-10 text-3xl transition-all',
        className
      )}
    />
  );
}
