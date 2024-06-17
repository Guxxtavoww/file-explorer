import { useQuery } from '@tanstack/react-query';

import { useAppState } from '@/shared/state/app.state';
import { openDirectory } from '@/utils/file-explorer.utils';
import { useCallback, useState } from 'react';

export function useDirectoryContent() {
  const [childPath, setChildPath] = useState<string>();

  const { currentVolumeMountPoint, setPathHistory } = useAppState();

  const {
    data: directoryContents,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['get-directories'],
    queryFn: () => {
      const path = String(childPath || currentVolumeMountPoint);

      return openDirectory(path);
    },
  });

  const onDirectoryDoubleClick = useCallback(
    async (path: string) => {
      setChildPath(path);
      setPathHistory(path);
      refetch();
    },
    [refetch]
  );

  const onFileDoubleClick = useCallback(async (filePath: string) => {}, []);

  return {
    directoryContents,
    isLoading,
    onDirectoryDoubleClick,
    onFileDoubleClick,
  };
}
