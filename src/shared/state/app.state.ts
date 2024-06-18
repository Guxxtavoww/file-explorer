import { create } from 'zustand';

export type AppState = {
  currentVolumeMountPoint: string | undefined;
  setCurrentVolumeMountPoint: (mountPoint?: string) => void;
  childPath: string[];
  setChildPath: (path: string) => void;
  removeChildPath: (index: number) => void;
  clearChildPath: () => void;
  searchResults: Maybe<iDirectoryContent[]>;
  setSearchResults: (searchResults: Maybe<iDirectoryContent[]>) => void;
};

export const useAppState = create<AppState>((set) => ({
  searchResults: null,
  setSearchResults: (searchResults) =>
    set(() => ({ searchResults, childPath: [] })),
  setCurrentVolumeMountPoint: (mountPoint) => {
    if (!mountPoint)
      return set({ childPath: [], currentVolumeMountPoint: undefined });

    return set({ currentVolumeMountPoint: mountPoint });
  },
  currentVolumeMountPoint: undefined,
  childPath: [],
  setChildPath: (path) => {
    return set((state) => ({
      childPath: [...state.childPath, path],
    }));
  },
  removeChildPath: (index) => {
    set((state) => {
      const newChildPath = state.childPath.slice();
      newChildPath.splice(index + 1);

      return { childPath: newChildPath };
    });
  },
  clearChildPath: () => set(() => ({ childPath: [] })),
}));
