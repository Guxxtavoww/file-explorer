import type { ReactNode } from 'react';

declare global {
  export type WithChildren<T extends Record<string, any> = {}> = T &
    Readonly<{ children: ReactNode }>;

  export type Maybe<T> = T | undefined | null;

  export interface DirectoryContent {
    [key: string]: [string, string]; // Key will be either "Directory" or "File"
  }
}
