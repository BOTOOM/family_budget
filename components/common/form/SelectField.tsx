import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Control, FieldValues, Path } from "react-hook-form";

export default function SelectField<T extends FieldValues>({
  name,
  title,
  formControl,
  description,
  items,
}: {
  name: Path<T>;
  title: string;
  description: string;
  items: any[];
  formControl: Control<T>; // Definimos que formControl es un Control genérico
}) {
  return (
    <FormField
      control={formControl}
      i18nIsDynamicList
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={description} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => {
                return (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
