import { TanstackProvider } from '@/providers/tanstack-provider';

import ThemeProvider from './theme.context';

export function Contexts(props: WithChildren) {
  return (
    <TanstackProvider>
      <ThemeProvider>{props.children}</ThemeProvider>
    </TanstackProvider>
  );
}
