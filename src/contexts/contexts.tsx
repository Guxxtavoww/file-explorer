import { TanstackProvider } from '@/providers/tanstack-provider';

import ThemeProvider from './theme.context';
import { FilesContextProvider } from './files.context';

export function Contexts(props: WithChildren) {
  return (
    <TanstackProvider>
      <ThemeProvider>
        <FilesContextProvider>{props.children}</FilesContextProvider>
      </ThemeProvider>
    </TanstackProvider>
  );
}
