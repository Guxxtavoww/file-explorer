'use client';

import { createContext, useContext } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { useQuery } from '@tanstack/react-query';

export type FileContextType = {
  volumes: Maybe<iVolume[]>;
  isLoading: boolean;
};

const FilesContext = createContext<FileContextType | null>(null);

export function FilesContextProvider(props: WithChildren) {
  const { data: volumes, isLoading } = useQuery({
    queryKey: ['volumes'],
    queryFn: () => invoke<iVolume[]>('get_volumes'),
  });

  return (
    <FilesContext.Provider value={{ volumes, isLoading }}>
      {props.children}
    </FilesContext.Provider>
  );
}

export function useFilesContext(): FileContextType {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error('Invalid hook usage');
  }

  return context;
}
