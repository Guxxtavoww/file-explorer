import { Toaster } from '@/components/ui/toaster';
import ThemeProvider from '@/contexts/theme.context';

import { TanstackProvider } from './tanstack.provider';

export function Providers(props: WithChildren) {
  return (
    <TanstackProvider>
      <ThemeProvider>{props.children}</ThemeProvider>
      <Toaster />
    </TanstackProvider>
  );
}
