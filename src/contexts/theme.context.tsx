import { createContext, useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getTheme, setTheme } from '@/utils/app.utils';
import { queryClient } from '@/providers/tanstack.provider';

export type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isPending: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeProvider({ children }: WithChildren) {
  const { data: theme } = useQuery<Theme>({
    queryKey: ['theme'],
    queryFn: getTheme,
    initialData: 'light',
  });

  const { mutate: toggleTheme, isPending } = useMutation({
    mutationKey: ['set-theme', theme],
    mutationFn: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['theme'] }),
  });

  useEffect(() => {
    const body = document.querySelector('body');

    body?.classList.add(theme);

    return () => body?.classList.remove(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => toggleTheme(),
        isPending,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }

  return context;
}
