import { create } from 'zustand';

export type AppState = {
  currentVolumeMountPoint: string | undefined;
  setCurrentVolumeMountPoint: (mountPoint?: string) => void;
  pathHistory: string[];
  setPathHistory: (newPath: string) => void;
  currentHistoryPlace: number;
  setCurrentHistoryPlace: (newPlace: number) => void;
};

export const useAppState = create<AppState>((set) => ({
  currentVolumeMountPoint: undefined,
  pathHistory: [],
  currentHistoryPlace: 0,
  setCurrentVolumeMountPoint: (mountPoint) =>
    set({ currentVolumeMountPoint: mountPoint }),
  setPathHistory: (newPath) =>
    set((state) => ({ pathHistory: [...state.pathHistory, newPath] })),
  setCurrentHistoryPlace: (newPlace) => set({ currentHistoryPlace: newPlace }),
}));
