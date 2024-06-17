import { useCallback, useRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { useQuery } from '@tanstack/react-query';

import { useAppState } from '@/shared/state/app.state';

export function useChooseVolumes() {
  const { data: volumes, isLoading } = useQuery({
    queryKey: ['volumes'],
    queryFn: async () => {
      if (volumesLengthRef.current > 0) return;

      const volumes_res = await invoke<iVolume[]>('get_volumes');

      volumesLengthRef.current = volumes_res.length;

      return volumes_res;
    },
  });

  const volumesLengthRef = useRef<number>(0);

  const {
    setCurrentVolumeMountPoint,
    pathHistory,
    setPathHistory,
    setCurrentHistoryPlace,
  } = useAppState();

  const handleVolumeClick = useCallback(
    async (mount_point: string) => {
      const pathHistoryIndex = pathHistory.length - 1;

      if (pathHistory[pathHistoryIndex] != mount_point) {
        setPathHistory(mount_point);
      }

      setCurrentVolumeMountPoint(mount_point);
      setCurrentHistoryPlace(pathHistoryIndex);
    },
    [pathHistory]
  );

  return {
    volumes,
    isLoading,
    handleVolumeClick,
  };
}
