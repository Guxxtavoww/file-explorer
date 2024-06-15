'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter, Search as SearchIcon } from 'lucide-react';

import { optionalStringSchema } from '@/utils/zod.utils';

import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { InputField } from '../ui/input';

const formSchema = z.object({
  search_query: optionalStringSchema,
});

type FormType = z.infer<typeof formSchema>;

export function Search() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => console.log(e))}
        className="space-x-2 flex"
      >
        <InputField
          name="search_query"
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
