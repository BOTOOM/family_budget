"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KgKJEivHvAW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BalanceAccount } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslation } from "@/i18n/client";
import { useMemo } from "react";
import InputField from "@/components/common/form/InputField";
import DateField from "@/components/common/form/DateField";
import TextAreaField from "@/components/common/form/TextAreaField";
import { Form } from "@/components/ui/form";
import { UpsertAccountBalanceAction } from "@/actions";

const formSchema = z.object({
  end_ammount: z
    .string()
    .transform((val) => Number(`${val}`.replace(",", ".")))
    .pipe(z.number()),
  end_date: z.date(),
  notes: z.string(),
  start_ammount: z
    .string()
    .transform((val) => Number(`${val}`.replace(",", ".")))
    .pipe(z.number()),
  start_date: z.date(),
}) satisfies z.ZodSchema<
  { start_ammount: number; end_ammount: number },
  z.ZodTypeDef,
  { start_ammount: string; end_ammount: string }
>;
export default function BalanceAccountDetailComponent({
  lng,
  slugBalance,
  slugAccount,
  balance,
}: {
  lng: string;
  slugBalance: string;
  slugAccount: string;
  balance: BalanceAccount | null;
}) {
  const { t } = useTranslation(lng);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      let balanceaccountTemp = {
        end_ammount: 0,
        end_date: new Date(),
        notes: "",
        start_ammount: 0,
        start_date: new Date(),
      };
      if (balance) {
        balanceaccountTemp = {
          end_ammount: balance.end_ammount ?? 0,
          end_date: balance.end_date ? new Date(balance.end_date) : new Date(),
          notes: balance.notes ?? "",
          start_ammount: balance.start_ammount ?? 0,
          start_date: balance.start_date
            ? new Date(balance.start_date)
            : new Date(),
        };
      }
      return balanceaccountTemp;
    }, [balance]),
    // }, []),
  });
  // useEffect(() => {
  //   if (account) {
  //     form.reset({
  //       bank_id: account.bank_id ? account.bank_id : "",
  //       currency_id: account.currency_id,
  //       name: account.name,
  //       account_number: account.account_number ?? "",
  //       account_type_id: account.account_type_id,
  //       closing_date: new Date(),
  //       payment_date: new Date(),
  //       // initial_balance: account.initial_balance,
  //     });
  //   }
  // }, [account]);

  // const loaded = slug === "new" ? true : account?.id ? true : false;
  const loaded = slugBalance === "new" ? true : true ? true : false;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const accountbalanceData: BalanceAccount = {
      account_id: slugAccount,
      end_ammount: values.end_ammount,
      end_date: values.end_date.toISOString(),
      is_closed: false,
      notes: values.notes,
      start_ammount: values.start_ammount,
      start_date: values.start_date.toISOString(),
    };
    if (balance) {
      accountbalanceData.id = balance.id;
      accountbalanceData.is_closed = balance.is_closed;
    }
    await UpsertAccountBalanceAction(accountbalanceData, lng);
  }

  return (
    <Card className="w-full max-w-2xl">
      {loaded ? (
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("Account.title")}</CardTitle>
                  <CardDescription>{t("Account.description")}</CardDescription>
                </div>
                <Link
                  href="./"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  {t("Common.back")}
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <DateField
                    name="start_date"
                    title={t("AccountBalance.form.start_date")}
                    formControl={form.control}
                    description="Ingrese la fecha de inicio"
                    calendarProps={{
                      disabled: (date) => date < new Date("1900-01-01"),
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <DateField
                    name="end_date"
                    title={t("AccountBalance.form.end_date")}
                    formControl={form.control}
                    description="Ingrese la fecha de fin"
                    calendarProps={{
                      disabled: (date) =>
                        date < new Date("1900-01-01") ||
                        date < form.getValues("start_date"),
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <InputField
                  name="start_ammount"
                  formControl={form.control}
                  description="monto"
                  title={t("AccountBalance.form.start_ammount")}
                  typeField="text"
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <InputField
                  name="end_ammount"
                  formControl={form.control}
                  description="monto"
                  title={t("AccountBalance.form.end_ammount")}
                  typeField="text"
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <TextAreaField
                  formControl={form.control}
                  name="notes"
                  description="Comentarios sobre la transaccion"
                  title={t("Transactions.table.notes")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link
                href="./"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {t("Common.cancel")}
              </Link>
              <Button type="submit">{t("Common.save")}</Button>
            </CardFooter>
          </form>
        </Form>
      ) : (
        "loading"
      )}
    </Card>
  );
}
