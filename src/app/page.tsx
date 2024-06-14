'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { RadioGroupField } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const testesSchema = z.enum(['Fodase', 'KGUEI']);

const formSchema = z.object({
  testes: testesSchema.optional(),
});

type Testes = z.infer<typeof testesSchema>;
type FormType = z.infer<typeof formSchema>;

export default function Home() {
  const [formResult, setFormResult] = useState<FormType>();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  return (
    <main>
      <h2>Olá mundo!</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => setFormResult(values))}
          className="px-4 space-y-3"
        >
          <RadioGroupField<Testes>
            name="testes"
            radioGroupLabel="Testes"
            defaultValue="Fodase"
            radioFields={[
              { label: 'Teste 1', value: 'Fodase' },
              { label: 'Teste 2', value: 'KGUEI' },
            ]}
          />

          <Button>Testar</Button>
        </form>
      </Form>

      {formResult && <pre>{JSON.stringify(formResult, null, 2)}</pre>}
    </main>
  );
}
