import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

import { cn } from '@/utils/cn.util';
import { Contexts } from '@/contexts/contexts';
import { WindowControls } from '@/components/layout/window-controls';

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
          <body className={cn(inter.className, 'body w-full min-h-svh')}>
            <WindowControls />
            {children}
          </body>
        </html>
      </Contexts>
    </HydrationOverlay>
  );
}
