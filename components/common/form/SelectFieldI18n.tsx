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
import { useTranslation } from "@/i18n/client";

import { Control, FieldValues, Path } from "react-hook-form";

export default function SelectFieldI18n<T extends FieldValues>({
  name,
  title,
  formControl,
  description,
  lng,
  items,
}: {
  name: Path<T>;
  title: string;
  description: string;
  lng: string;
  items: any[];
  formControl: Control<T>; // Definimos que formControl es un Control genérico
}) {
  const { t } = useTranslation(lng);
  return (
    <FormField
      control={formControl}
      // i18nIsDynamicList
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
                    {t(`Categories.${item.tag}`)}
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
