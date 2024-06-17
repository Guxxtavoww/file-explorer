import { File, Folder, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/layout/loader';

import { useDirectoryContent } from './directory-contents.hook';

export function DirectoryContents() {
  const {
    directoryContents,
    isLoading,
    onDirectoryDoubleClick,
    onFileDoubleClick,
  } = useDirectoryContent();

  if (isLoading) {
    return <Loader label="Carregando dados..." />;
  }

  if (!directoryContents?.length) return <h2>Não há conteúdo nessa pasta.</h2>;

  return (
    <div className="w-full flex flex-col items-start gap-3">
      {directoryContents.map((content, index) => {
        const [type, [name, path]] = Object.entries(content)[0] as [
          'File' | 'Directory',
          [string, string]
        ];

        const isDirectory = type === 'Directory';

        return (
          <Button
            variant="ghost"
            key={index}
            className="flex justify-between w-full !py-8"
            onDoubleClick={() =>
              isDirectory
                ? onDirectoryDoubleClick(path)
                : onFileDoubleClick(path)
            }
          >
            <strong className="inline-flex items-center gap-3">
              {isDirectory ? <Folder /> : <File />} {name}
            </strong>
            <div className="flex items-center gap-3">
              <Button variant="destructive">
                <Trash />
              </Button>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
