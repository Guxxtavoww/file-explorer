import { EllipsisVertical, File, Folder, Trash } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/layout/loader';

import { useDirectoryContent } from './directory-contents.hook';

export function DirectoryContents() {
  const {
    directoryContents,
    isLoading,
    onDirectoryClick,
    onFileClick,
    handleDelete,
    searchResults,
  } = useDirectoryContent();

  if (isLoading) {
    return <Loader label="Carregando dados..." />;
  }

  const data = (searchResults ?? directoryContents)?.sort((a, b) => {
    const [typeA, [nameA]] = Object.entries(a)[0] as [
      'File' | 'Directory',
      readonly [string, string]
    ];

    const [typeB, [nameB]] = Object.entries(b)[0] as [
      'File' | 'Directory',
      readonly [string, string]
    ];

    // Prioritize directories over files
    if (typeA !== typeB) {
      return typeA === 'Directory' ? -1 : 1;
    }

    // Alphabetical order
    return nameA.localeCompare(nameB);
  });

  if (!data?.length) return <h2>Não há conteúdo nessa pasta.</h2>;

  return (
    <div className="w-full flex flex-col items-start gap-3">
      {data.map((content, index) => {
        const [type, [name, path]] = Object.entries(content)[0] as [
          'File' | 'Directory',
          readonly [string, string]
        ];

        const isDirectory = type === 'Directory';

        return (
          <div key={index} className="w-full flex items-center justify-between">
            <Button
              variant="ghost"
              className="flex justify-between flex-[1] !py-8"
              onClick={() => {
                if (isDirectory) {
                  return onDirectoryClick(path);
                }

                return onFileClick(path);
              }}
            >
              <strong className="inline-flex items-center gap-3">
                {isDirectory ? <Folder /> : <File />} {name}
              </strong>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="!py-7">
                  <EllipsisVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="inline-flex items-center gap-2"
                  onClick={() => handleDelete(type, path)}
                >
                  <Trash className="w-3 h-3" /> Deletar{' '}
                  {isDirectory ? 'Pasta' : 'Arquivo'}
                </DropdownMenuItem>
                {!!searchResults ? (
                  <DropdownMenuItem>Caminho: {path}</DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </div>
  );
}
