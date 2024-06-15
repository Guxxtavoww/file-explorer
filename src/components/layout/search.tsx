'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { invoke } from '@tauri-apps/api/tauri';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter, Search as SearchIcon } from 'lucide-react';

import { optionalStringSchema } from '@/utils/zod.utils';

import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { InputField } from '../ui/input';

const formSchema = z.object({
  query: optionalStringSchema,
});

type FormType = z.infer<typeof formSchema>;

export function Search() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit({ query }: FormType) {
    const result = await invoke('search_in_disk', {
      query,
      acceptFiles: false,
    });

    console.log(result);

    return result;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-x-2 flex"
      >
        <InputField
          name="query"
          placeholder="Insira uma pasta ou arquivo"
        />
        <Button variant="outline" type="button">
          <Filter />
        </Button>
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
}
