'use client';

import Link from 'next/link';

import { Loader } from '@/components/layout/loader';
import { useFilesContext } from '@/contexts/files.context';

export default function Home() {
  const { volumes, isLoading } = useFilesContext();

  return (
    <main className="space-y-2">
      <h1 className="text-2xl mb-5">Bem vindo ao seu explorador de arquivos!</h1>
      {isLoading ? (
        <Loader
          className="w-10 h-10"
          label="Aguarde enquanto estamos casheando seus arquivos. Isso pode demorar alguns minutos"
        />
      ) : (
        volumes?.map((volume, index) => (
          <Link key={index} href="/">
            {volume.name}
          </Link>
        ))
      )}
    </main>
  );
}
