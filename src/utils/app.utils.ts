'use client';

import { invoke } from '@tauri-apps/api/tauri';

import type { Theme } from '@/contexts/theme.context';

export async function closeSplashScreen() {
  const callback = () => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    invoke('close_splashscreen');
  };

  document.addEventListener('DOMContentLoaded', callback);

  return document.removeEventListener('DOMContentLoaded', callback);
}

export async function getTheme(): Promise<'light' | 'dark'> {
  return invoke<Theme>('read_theme');
}

export async function setTheme(theme: Theme) {
  return invoke('change_theme', { theme });
}
