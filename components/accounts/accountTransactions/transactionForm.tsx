"use client";

import { GetCategoriesAction, UpsertAccountTransactionAction } from "@/actions";
import DateField from "@/components/common/form/DateField";
import InputField from "@/components/common/form/InputField";
import SelectField from "@/components/common/form/SelectField";
import SelectFieldI18n from "@/components/common/form/SelectFieldI18n";
import TextAreaField from "@/components/common/form/TextAreaField";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/i18n/client";
import {
  AccountTransactions,
  AccountTransactionsForm,
  Categories,
} from "@/services/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  date: z.date(),
  amount: z
    .string()
    .transform((val) => Number(`${val}`.replace(",", ".")))
    .pipe(z.number()),
  comment: z.string(),
  transaction_categorie_id: z
    .string({
      required_error: "Debe seleccionar una categoria",
      invalid_type_error: "Debe seleccionar una categoria",
    })
    .min(10),
}) satisfies z.ZodSchema<{ amount: number }, z.ZodTypeDef, { amount: string }>;

export default function TransactionForm({
  transaction,
  setShowModal,
  lng,
}: {
  transaction: AccountTransactions;
  setShowModal: Function;
  lng: string;
}) {
  const { t } = useTranslation(lng);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isDebit, setIsDebit] = useState(true);
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
        transaction_categorie_id: "",
      };
      if (transaction.id) {
        transactionTemp = {
          amount: adjustNumber(false, transaction.amount),
          comment: transaction.comment ?? "",
          date: new Date(transaction.date),
          name: transaction.name,
          transaction_categorie_id: transaction.transaction_categorie_id ?? "",
        };
        setIsDebit(transaction.is_debit);
      }
      return transactionTemp;
    }, []),
  });
  function adjustNumber(is_debit: boolean, number: number) {
    return is_debit ? -Math.abs(number) : Math.abs(number);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const transactionData: AccountTransactionsForm = {
      account_id: params.slug,
      amount: adjustNumber(isDebit, values.amount),
      comment: values.comment,
      date: values.date.toISOString(),
      transaction_categorie_id: values.transaction_categorie_id,
      name: values.name,
      is_debit: isDebit,
    };
    console.log("oli", transactionData);

    if (transaction.id) {
      transactionData.id = transaction.id;
    }
    const response = await UpsertAccountTransactionAction(transactionData);
    if (response?.id) {
      setShowModal(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <DateField
              name="date"
              title={t("Transactions.table.date")}
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
              title={t("Transactions.table.commerce")}
              typeField="text"
            />
          </div>
          <div className="grid gap-1.5">
            <InputField
              name="amount"
              formControl={form.control}
              description="monto"
              title={t("Transactions.table.ammount")}
              typeField="text"
              min={0}
            />
          </div>
          <div className="grid gap-1.5">
            <Tabs
              defaultValue={`${isDebit}`}
              onValueChange={(value) => setIsDebit(value === "true")}
            >
              <TabsList>
                <TabsTrigger value="false">
                  {t("Transactions.form.credit")}
                </TabsTrigger>
                <TabsTrigger value="true">
                  {t("Transactions.form.debit")}
                </TabsTrigger>
              </TabsList>
              {/* <TabsContent value="false">Credito</TabsContent>
              <TabsContent value="true">Debito</TabsContent> */}
            </Tabs>
          </div>
          <div className="grid gap-1.5">
            <SelectFieldI18n
              lng={lng}
              formControl={form.control}
              name="transaction_categorie_id"
              description="Selecciona una cateogoria"
              items={categories}
              title={t("Transactions.table.category")}
            />
          </div>

          <div className="grid gap-1.5">
            <TextAreaField
              formControl={form.control}
              name="comment"
              description="Comentarios sobre la transaccion"
              title={t("Transactions.table.notes")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="mt-1" type="submit">
            {t("Common.save")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
