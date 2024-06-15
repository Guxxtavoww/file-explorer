'use client';

import { appWindow } from '@tauri-apps/api/window';
import { X, Minimize2, Maximize } from 'lucide-react';

import { Button } from '../ui/button';

export function WindowControls() {
  return (
    <nav
      className="w-full py-2 px-2 flex items-center justify-between mb-3  border-b"
      data-tauri-drag-region
    >
      <div></div>
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
        <Button variant="ghost" onClick={() => appWindow.close()}>
          <X />
        </Button>
      </div>
    </nav>
  );
}
