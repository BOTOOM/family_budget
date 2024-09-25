import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

// Definir que tu componente acepta cualquier tipo de control
export default function DateField<T extends FieldValues>({
  name,
  title,
  formControl,
  description,
  calendarProps,
}: {
  name: Path<T>;
  title: string;
  description: string;
  formControl: Control<T>; // Definimos que formControl es un Control genérico
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "initialFocus"
  >;
}) {
  return (
    <FormField
      control={formControl} // Usamos el control proporcionado
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="pt-2">{title}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <div className="mr-2 h-4 w-4 opacity-50" />
                  {field.value ? (
                    format(field.value, "PP")
                  ) : (
                    <span>{description}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                {...calendarProps}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
