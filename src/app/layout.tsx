import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

import { cn } from '@/utils/cn.util';
import { Contexts } from '@/contexts/contexts';
import { Search } from '@/components/layout/search';
import { WindowControls } from '@/components/layout/window-controls';
import { FilesBreadcumb } from '@/components/layout/files-breadcumb';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'File Explorer',
  description: 'Generated ',
};

export default function RootLayout({ children }: WithChildren) {
  return (
    <HydrationOverlay>
      <Contexts>
        <html lang="en" suppressHydrationWarning>
          <body className={cn(inter.className, 'w-full min-h-svh')}>
            <WindowControls />
            <div className="px-3.5 space-y-2.5">
              <div className="flex justify-between items-center">
                <FilesBreadcumb />
                <Search />
              </div>
              {children}
            </div>
          </body>
        </html>
      </Contexts>
    </HydrationOverlay>
  );
}
