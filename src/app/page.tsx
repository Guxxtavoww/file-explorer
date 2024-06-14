'use client';

import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';

export default function Home() {
  const { data: rand_str, error, isLoading } = useQuery({
    queryKey: ['get-random'],
    queryFn: async () => invoke<string>('random_string', { length: 10 }),
  });

  if (isLoading) return <span>carregando...</span>

  return (
    <main>
      <h2>Olá mundo!</h2>
      <span>Esse resultado veio do rust: {!rand_str ? error?.message : rand_str}</span>
    </main>
  );
}
