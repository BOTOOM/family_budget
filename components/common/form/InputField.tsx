import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Control, FieldValues, Path } from "react-hook-form";

export default function InputField<T extends FieldValues>({
  name,
  title,
  formControl,
  description,
  typeField,
}: {
  name: Path<T>;
  title: string;
  description: string;
  typeField: string;
  formControl: Control<T>; // Definimos que formControl es un Control genérico
}) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input
              id={name}
              type={typeField}
              placeholder={description}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
