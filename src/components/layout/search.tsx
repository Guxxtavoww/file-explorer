import { z } from 'zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { invoke } from '@tauri-apps/api/tauri';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Filter, Search as SearchIcon } from 'lucide-react';

import { useAppState } from '@/shared/state/app.state';
import { optionalStringSchema } from '@/utils/zod.utils';
import { fileExtentionsOptions } from '@/data/file-extentions-options.data';

import { Loader } from './loader';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { InputField } from '../ui/input';
import { CheckboxField } from '../ui/checkbox';
import { SelectField } from '../ui/select-field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const formSchema = z.object({
  query: optionalStringSchema.default(''),
  extension: optionalStringSchema.default(''),
  acceptFiles: z.boolean().default(true),
  acceptDirectories: z.boolean().default(true),
});

type FormType = z.infer<typeof formSchema>;

export function Search() {
  const { currentVolumeMountPoint, childPath, setSearchResults } =
    useAppState();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['search'],
    mutationFn: (filters: FormType) => {
      const payload = {
        ...filters,
        searchDirectory:
          childPath.length > 1
            ? childPath[childPath.length - 1]
            : childPath[0] || currentVolumeMountPoint,
        mountPnt: currentVolumeMountPoint,
      };

      console.log(payload)

      return invoke<iDirectoryContent[]>('search_directory', payload);
    },
    onSuccess: (data) => {
      if (!data.length) {
        return toast({ title: 'Sem resultados para essa busca' });
      }

      setSearchResults(data);
    },
    onError: () =>
      toast({
        title: 'Erro!',
        variant: 'destructive',
      }),
  });

  const isDisabled = !currentVolumeMountPoint || isPending;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    disabled: isDisabled,
  });

  const handleSubmit = useCallback(
    async (filters: FormType) => {
      await mutateAsync(filters);
    },
    [mutateAsync]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-x-2 flex"
      >
        <InputField name="query" placeholder="Insira uma pasta ou arquivo" />
        <Popover>
          <PopoverTrigger asChild disabled={isDisabled}>
            <Button variant="outline" type="button" disabled={isDisabled}>
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
        <Button
          type="submit"
          disabled={isDisabled}
          title={
            !currentVolumeMountPoint
              ? 'Selecione um volume para fazer buscas '
              : ''
          }
        >
          {isPending ? <Loader /> : <SearchIcon />}
        </Button>
      </form>
    </Form>
  );
}
