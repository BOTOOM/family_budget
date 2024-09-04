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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Account, AccountTypes, Banks, Currencies } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { UpsertAccountAction } from "@/actions";
import { useTranslation } from "@/i18n/client";

const formSchema = z.object({
  currency: z.string(),
  bank: z.string(),
  name: z.string(),
  account_type: z.string(),
  account_number: z.string(),
  initial_balance: z.number(),
  payment_date: z.date(),
  close_date: z.date(),
});
export default function AccountDetailComponent({
  lng,
  banks,
  accountTypes,
  currencies
}: {
  lng: string;
  banks: Banks[];
  accountTypes: AccountTypes[];
  currencies: Currencies[];
}) {

  const { t } = useTranslation(lng);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank: "",
      currency: "",
      name: "",
      account_number: "",
      account_type: "",
      close_date: new Date(),
      payment_date: new Date(),
      initial_balance: 0,
    },
  });

  const creditID = accountTypes.find((acctype) => acctype.tag === "credit")?.id;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const account: Account = {
      account_number: values.account_number,
      account_type_id: values.account_type,
      bank_id: values.bank,
      closing_date: values.close_date.toISOString(),
      currency_id: values.currency,
      current_balance: values.initial_balance,
      initial_balance: values.initial_balance,
      name: values.name,
      payment_date: values.payment_date.toISOString(),
    };
    const response = await UpsertAccountAction(account);
  }

  return (
    <Card className="w-full max-w-2xl">
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("Account.title")}</CardTitle>
                <CardDescription>
                {t("Account.description")}
                </CardDescription>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Account.form.currency")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("Account.form.currency_description")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {currencies.map((curr) => {
                            return (
                              <SelectItem key={curr.id} value={curr.id}>
                                {curr.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Account.form.bank")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("Account.form.bank_description")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {banks.map((bank) => {
                            return (
                              <SelectItem key={bank.id} value={bank.id}>
                                {bank.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="account_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Account.form.account_type")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("Account.form.account_type_description")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accountTypes.map((accountType) => {
                            return (
                              <SelectItem
                                key={accountType.id}
                                value={accountType.id}
                              >
                                {accountType.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Account.form.name")}</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t("Account.form.name_description")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Account.form.account_number")}</FormLabel>
                    <FormControl>
                      <Input
                        id="account-number"
                        type="text"
                        placeholder={t("Account.form.account_number_description")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initial-balance">{t("Account.form.initial_balance")}</Label>
              <Input
                id="initial-balance"
                type="number"
                placeholder={t("Account.form.initial_balance_description")}
              />
            </div>
            {creditID === form.watch("account_type") ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="close_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="pt-2">{t("Account.form.close_date")}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start  text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <div className="mr-2 h-4 w-4 opacity-50" />
                                {field.value ? (
                                  format(field.value, "PP")
                                ) : (
                                  <span>{t("Account.form.close_date_description")}</span>
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
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="payment_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="pt-2">{t("Account.form.payment_date")}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start  text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <div className="mr-2 h-4 w-4 opacity-50" />
                                {field.value ? (
                                  format(field.value, "PP")
                                ) : (
                                  <span>{t("Account.form.payment_date_description")}</span>
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
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ) : null}
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
    </Card>
  );
}
