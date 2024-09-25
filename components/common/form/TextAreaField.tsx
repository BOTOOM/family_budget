import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Control, FieldValues, Path } from "react-hook-form";

export default function TextAreaField<T extends FieldValues>({
  name,
  title,
  formControl,
  description,
}: {
  name: Path<T>;
  title: string;
  description: string;
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
          <Textarea
              placeholder={description}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
