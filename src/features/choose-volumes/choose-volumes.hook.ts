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

  const { setCurrentVolumeMountPoint } = useAppState();

  const handleVolumeClick = useCallback(
    async (mount_point: string) => {
      setCurrentVolumeMountPoint(mount_point);
    },
    [setCurrentVolumeMountPoint]
  );

  return {
    volumes,
    isLoading,
    handleVolumeClick,
  };
}
