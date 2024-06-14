import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils/cn.util';

import { FormField, FormLabel, FormMessage } from './form';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export type TextareaFieldProps = Omit<
  TextareaProps,
  'name' | 'defaultChecked' | 'ref' | 'value'
> & {
  name: string;
  label?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

function TextareaField({
  name,
  defaultValue,
  label,
  disabled,
  ...rest
}: TextareaFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => (
        <div className="grid w-full gap-1.5">
          {label && <FormLabel htmlFor={field.name}>Your message</FormLabel>}
          <Textarea {...field} {...rest} />
          <FormMessage />
        </div>
      )}
    />
  );
}

export { Textarea, TextareaField };
