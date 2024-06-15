'use client';

import { appWindow } from '@tauri-apps/api/window';
import { X, Minimize2, Maximize, SunMedium, Moon } from 'lucide-react';

import { captalize } from '@/utils/string.utils';
import { useTheme } from '@/contexts/theme.context';

import { Loader } from './loader';
import { Button } from '../ui/button';

export function WindowControls() {
  const { theme, toggleTheme, isPending } = useTheme();

  return (
    <nav
      className="w-full py-2 px-2 flex items-center justify-between mb-3  border-b"
      data-tauri-drag-region
    >
      <div>
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="inline-flex gap-2 items-center"
          disabled={isPending}
        >
          {isPending ? (
            <Loader />
          ) : theme === 'light' ? (
            <SunMedium />
          ) : (
            <Moon />
          )}{' '}
          {captalize(theme)}
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => appWindow.minimize()}>
          <Minimize2 />
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            appWindow.toggleMaximize();
          }}
        >
          <Maximize />
        </Button>
        <Button
          onClick={() => appWindow.close()}
          className="bg-transparent transition-all text-[#121212] dark:text-white hover:bg-destructive hover:text-white"
        >
          <X />
        </Button>
      </div>
    </nav>
  );
}
