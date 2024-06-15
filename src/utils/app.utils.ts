'use client';

import { invoke } from '@tauri-apps/api/tauri';

export async function closeSplashScreen() {
  const callback = () => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    invoke('close_splashscreen');
  };

  document.addEventListener('DOMContentLoaded', callback);

  return document.removeEventListener('DOMContentLoaded', callback);
}
