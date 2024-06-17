import { create } from 'zustand';

export type AppState = {
  currentVolumeMountPoint: string | undefined;
  setCurrentVolumeMountPoint: (mountPoint?: string) => void;
  childPath: string[];
  setChildPath: (path: string) => void;
  removeChildPath: (path: string) => void;
};

export const useAppState = create<AppState>((set) => ({
  setCurrentVolumeMountPoint: (mountPoint) =>
    set({ currentVolumeMountPoint: mountPoint }),
  currentVolumeMountPoint: undefined,
  childPath: [],
  setChildPath: (path) =>
    set((state) => ({
      childPath: [
        ...state.childPath,
        path.replace(state.currentVolumeMountPoint as string, ''),
      ],
    })),
  removeChildPath: (path) =>
    set((state) => ({
      childPath: state.childPath.filter((item) => item !== path),
    })),
}));
