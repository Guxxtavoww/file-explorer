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
import { CheckboxField } from '../ui/checkbox';
import { SelectField } from '../ui/select-field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const formSchema = z.object({
  query: optionalStringSchema.default(''),
  extension: optionalStringSchema,
  acceptFiles: z.boolean().default(true),
  acceptDirectories: z.boolean().default(true),
});

type FormType = z.infer<typeof formSchema>;

export function Search() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit(filters: FormType) {
    const results = await invoke<iDirectoryContent[]>('search_directory', {
      ...filters,
      searchDirectory: '',
      mountPnt: '',
    });

    console.log(results);
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
          <PopoverContent
            className="min-w-[600px] flex flex-col items-start gap-5"
            align="end"
          >
            <h3 className="text-2xl">Filtros</h3>
            <div className="flex items-center gap-4">
              <SelectField
                options={fileExtentionsOptions}
                labelAccessor="label"
                valueAccessor="value"
                name="extension"
                placeholder="Selecione uma extensão de arquivo"
              />
              <CheckboxField
                name="acceptDirectories"
                label="Pastas"
                defaultChecked={true}
              />
              <CheckboxField
                name="acceptFiles"
                label="Arquivos"
                defaultChecked={true}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
}
