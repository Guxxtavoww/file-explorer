import * as React from 'react';
import { Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/utils/cn.util';

import { FormField, FormLabel, FormMessage } from './form';

export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'name' | 'defaultValue'
> & { name: string };

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

function CheckboxField({
  className,
  name,
  label,
  defaultChecked,
  disabled,
  ...rest
}: CheckboxProps & { label?: string }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultChecked}
      disabled={disabled}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <div className="items-top flex space-x-2">
            <Checkbox
              name={name}
              onCheckedChange={field.onChange}
              className={className}
              disabled={disabled}
              checked={field.value}
              id={name}
              {...rest}
            />
            {label && (
              <FormLabel
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </FormLabel>
            )}
          </div>
          <FormMessage />
        </div>
      )}
    />
  );
}

export { Checkbox, CheckboxField };
