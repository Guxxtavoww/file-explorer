import { EllipsisVertical, File, Folder } from 'lucide-react';

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

  const data = searchResults ?? directoryContents;

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
              className="flex justify-start flex-[1] !py-8"
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
                <DropdownMenuItem onClick={() => handleDelete(type, path)}>
                  Deletar {isDirectory ? 'Pasta' : 'Arquivo'}
                </DropdownMenuItem>
                <DropdownMenuItem>Propriedades</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      })}
    </div>
  );
}
