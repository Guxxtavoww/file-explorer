'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { invoke } from '@tauri-apps/api/tauri';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter, Search as SearchIcon } from 'lucide-react';

import { optionalStringSchema } from '@/utils/zod.utils';
import { fileExtentionsOptions } from '@/data/file-extentions-options.data';

import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { InputField } from '../ui/input';
import { SelectField } from '../ui/select-field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const formSchema = z.object({
  query: optionalStringSchema,
  fileExtention: optionalStringSchema,
});

type FormType = z.infer<typeof formSchema>;

export function Search() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit({ query, fileExtention }: FormType) {
    console.log(query, fileExtention);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-x-2 flex"
      >
        <InputField name="query" placeholder="Insira uma pasta ou arquivo" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" type="button">
              <Filter />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <SelectField
              options={fileExtentionsOptions}
              labelAccessor="label"
              valueAccessor="value"
              name="fileExtention"
              placeholder="Selecione uma extensão de arquivo"
              selectLabel="Extensões de arquivo"
            />
          </PopoverContent>
        </Popover>
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
}
