import { Search } from './components/layout/search';
import { ChooseVolumes } from './features/choose-volumes';
import { FilesBreadcumb } from './components/layout/files-breadcumb';
import { WindowControls } from './components/layout/window-controls';
import { useAppState } from './shared/state/app.state';
import { DirectoryContents } from './features/directory-contents';

export default function App() {
  const { currentVolumeMountPoint } = useAppState();

  return (
    <>
      <WindowControls />
      <div className="px-3.5 space-y-2.5 mt-20">
        <div className="flex justify-between items-center">
          <FilesBreadcumb />
          <Search />
        </div>
        <main className="space-y-2 flex-[1]">
          <h1 className="text-2xl mb-5">
            Bem vindo ao seu novo e mais rápido, explorador de arquivos!
          </h1>
          {!currentVolumeMountPoint ? <ChooseVolumes /> : <DirectoryContents />}
        </main>
      </div>
    </>
  );
}
