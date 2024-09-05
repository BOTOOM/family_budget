"use server";

import { upsertAccount } from "@/services";
import { Account } from "@/services/types";
import { redirect } from "next/navigation";

export async function UpsertAccountAction(account: Account, lng: string) {
  console.log("llegamos", account);
  const result = await upsertAccount(account);
  console.log("UpsertAccountAction", result);
  if (account.id) {
    redirect(`/${lng}/accounts/${account.id}`);
  } else {
    redirect(`/${lng}/accounts`);
  }
}
