import type { ReactNode } from 'react';

declare global {
  export type WithChildren<T extends Record<string, any> = {}> = T &
    Readonly<{ children: ReactNode }>;

  export type Maybe<T> = T | undefined | null;

  export interface iDirectoryContent
    extends Record<'Directory' | 'File', readonly [string, string]> {}

  export interface iVolume {
    name: string;
    mountpoint: string;
    available_gb: number;
    used_gb: number;
    total_gb: number;
  }
}
