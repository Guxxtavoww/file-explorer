import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/utils/cn.util';

import { FormField, FormLabel, FormMessage } from './form';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export type InputFieldProps = Omit<InputProps, 'name' | 'defaultChecked'> & {
  name: string;
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

function InputField({
  name,
  type = 'text',
  className,
  defaultValue,
  label,
  disabled,
  ...rest
}: InputFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
          <Input {...field} className={className} type={type} {...rest} />
          <FormMessage />
        </div>
      )}
    />
  );
}

export { Input, InputField };
