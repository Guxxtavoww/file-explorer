import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useAppState } from '@/shared/state/app.state';
import { queryClient } from '@/providers/tanstack.provider';
import { openDirectory, openFile } from '@/utils/file-explorer.utils';

export function useDirectoryContent() {
  const { currentVolumeMountPoint, childPath, setChildPath } = useAppState();

  const { data: directoryContents, isLoading } = useQuery({
    queryKey: ['get-directories'],
    queryFn: () => {
      const path = String(
        childPath[childPath.length - 1] || currentVolumeMountPoint
      );

      return openDirectory(path);
    },
  });

  const onDirectoryDoubleClick = useCallback(async (path: string) => {
    setChildPath(path);
    queryClient.refetchQueries({ queryKey: ['get-directories'] });
  }, []);

  const onFileDoubleClick = useCallback(async (filePath: string) => {
    console.log(await openFile(filePath));
  }, []);

  return {
    directoryContents,
    isLoading,
    onDirectoryDoubleClick,
    onFileDoubleClick,
  };
}
