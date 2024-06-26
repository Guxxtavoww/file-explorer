import { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAppState } from '@/shared/state/app.state';
import { queryClient } from '@/providers/tanstack.provider';
import {
  deleteFile,
  deleteFolder,
  openDirectory,
  openFile,
} from '@/utils/file-explorer.utils';
import { toast } from '@/components/ui/use-toast';
import { Loader } from '@/components/layout/loader';

const GET_DIRECTORIES = 'get-directories';

const refechGetDirectories = () =>
  queryClient.refetchQueries({ queryKey: [GET_DIRECTORIES] });

export function useDirectoryContent() {
  const {
    currentVolumeMountPoint,
    childPath,
    setChildPath,
    searchResults,
    setSearchResults,
  } = useAppState();

  const { data: directoryContents, isLoading } = useQuery({
    queryKey: [GET_DIRECTORIES],
    queryFn: () => {
      const path = String(
        childPath[childPath.length - 1] || currentVolumeMountPoint
      );

      return openDirectory(path);
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['delete-file-or-dir'],
    mutationFn: async ({
      path,
      type,
    }: {
      type: 'Directory' | 'File';
      path: string;
    }) => {
      if (type === 'Directory') {
        return deleteFolder(path);
      }

      return deleteFile(path);
    },
    onSuccess: refechGetDirectories,
  });

  const onDirectoryClick = useCallback(
    async (path: string) => {
      setChildPath(path);
      setSearchResults(null);
    },
    [setChildPath, setSearchResults]
  );

  const onFileClick = useCallback(async (path: string) => {
    await openFile(path);
  }, []);

  const handleDelete = useCallback(
    async (type: 'Directory' | 'File', path: string) => {
      toast({ title: 'Deletando...', children: <Loader /> });

      await mutateAsync({ type, path }).finally(() => {
        toast({ title: 'Deletado com sucesso!' });
      });
    },
    []
  );

  useEffect(() => {
    refechGetDirectories();
  }, [childPath, currentVolumeMountPoint]);

  return {
    directoryContents,
    isLoading: isLoading,
    onDirectoryClick,
    onFileClick,
    handleDelete,
    searchResults,
    setSearchResults
  };
}
