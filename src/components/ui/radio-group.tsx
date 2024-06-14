'use client';

import * as React from 'react';
import { Circle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/utils/cn.util';

import { FormControl, FormField, FormItem, FormLabel } from './form';

export type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Define the props type for RadioGroupField
export type RadioGroupFieldProps<T extends string> = Omit<
  RadioGroupProps,
  'name' | 'defaultChecked' | 'defaultValue'
> & {
  radioFields: {
    label: string;
    readonly value: T;
  }[];
  name: string;
  defaultValue?: T;
  radioGroupLabel: string;
};

function RadioGroupField<T extends string>({
  name,
  radioFields,
  defaultValue,
  disabled,
  radioGroupLabel,
  ...rest
}: RadioGroupFieldProps<T>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{radioGroupLabel}</FormLabel>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-1"
            {...rest}
          >
            {radioFields.map(({ label, value }, index) => (
              <FormItem
                className="flex items-center space-x-3 space-y-0"
                key={index}
              >
                <FormControl>
                  <RadioGroupItem value={value} />
                </FormControl>
                <FormLabel className="font-normal">{label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormItem>
      )}
    />
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupField };
