'use server';

import { upsertAccount } from "@/services";
import { Account } from "@/services/types";

export async function UpsertAccountAction(
    account: Account
  ) {
    console.log("llegamos", account)
    const result = await upsertAccount(account)
   
    return {
      message: 'creado'
    };
  }