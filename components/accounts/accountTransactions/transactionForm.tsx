"use client";

import DateField from "@/components/common/form/DateField";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import TextAreaField from "@/components/common/form/TextAreaField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  date: z.date(),
  amount: z.number(),
  comment: z.string(),
  transaction_type: z.string(),
});

export default function TransactionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      let accountTemp = {
        name: "",
        date: new Date(),
        amount: 0,
        comment: "",
        transaction_type: "",
      };
      //   if (account) {
      //     accountTemp = {
      //       bank_id: account.bank_id ? account.bank_id : "",
      //       currency_id: account.currency_id,
      //       name: account.name,
      //       account_number: account.account_number ?? "",
      //       account_type_id: account.account_type_id,
      //       closing_date: new Date(),
      //       payment_date: new Date(),
      //       initial_balance: account.initial_balance,
      //     };
      //   }
      return accountTemp;
    }, []),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("oli", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <DateField
              name="date"
              title="Fecha"
              formControl={form.control}
              description="Ingrese la fecha de la transacción"
            />
          </div>
          <div className="grid gap-1.5">
            <InputField
              name="name"
              formControl={form.control}
              description="comercio"
              title="Comercio"
              typeField="text"
            />
          </div>
          <div className="grid gap-1.5">
            <SelectField
              formControl={form.control}
              name="transaction_type"
              description="Selecciona una cateogoria"
              items={[
                {id:"Shopping",name: "Shopping" },
                {id:"Food",name: "Food" },
                {id:"Transportation",name: "Transportation" },
                {id:"Entertainment",name: "Entertainment" },
                {id:"Groceries",name: "Groceries" },
              ]}
              title="Categoría"

            />
            
          </div>

          <div className="grid gap-1.5">
            <TextAreaField
              formControl={form.control}
              name="comment"
              description="Comentarios sobre la transaccion"
              title="Comentarios"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="mt-1" type="submit">
            Guardar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
