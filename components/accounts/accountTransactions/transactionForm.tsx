"use client";

import { GetCategoriesAction, UpsertAccountTransactionAction } from "@/actions";
import DateField from "@/components/common/form/DateField";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import TextAreaField from "@/components/common/form/TextAreaField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AccountTransactionsForm, Categories } from "@/services/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  date: z.date(),
  amount: z.coerce.number(),
  comment: z.string(),
  transaction_categorie_id: z
    .string({
      required_error: "Debe seleccionar una categoria",
      invalid_type_error: "Debe seleccionar una categoria",
    })
    .min(10),
});

export default function TransactionForm() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const params = useParams<{ slug: string }>();
  console.log(params.slug);
  useEffect(() => {
    async function fetchPosts() {
      let res = await GetCategoriesAction();
      setCategories(res);
      console.log(res);
    }
    fetchPosts();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      let transactionTemp = {
        name: "",
        date: new Date(),
        amount: 0,
        comment: "",
        // transaction_categorie_id: "",
      };
      //   if (account) {
      //     transactionTemp = {
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
      return transactionTemp;
    }, []),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("oli", values);
    const transactionData: AccountTransactionsForm = {
      account_id: params.slug,
      amount: values.amount,
      comment: values.comment,
      date: values.date.toISOString(),
      transaction_categorie_id: values.transaction_categorie_id,
      name: values.name,
    };
    await UpsertAccountTransactionAction(transactionData);
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
              calendarProps={{
                disabled: (date) =>
                  date > new Date() || date < new Date("1900-01-01"),
              }}
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
            <InputField
              name="amount"
              formControl={form.control}
              description="monto"
              title="Monto"
              typeField="number"
            />
          </div>
          <div className="grid gap-1.5">
            <SelectField
              formControl={form.control}
              name="transaction_categorie_id"
              description="Selecciona una cateogoria"
              items={categories}
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
