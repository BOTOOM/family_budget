import { createClient } from "@/utils/supabase/server";
import { Account, AccountTypes, Banks, Currencies } from "./types";

export async function getBanks(): Promise<Banks[]> {
  const supabaseServer = createClient();
  let { data, error } = await supabaseServer
    .from("Banks")
    .select("id, name")
    .returns<Banks[]>();
  if (error) throw error;

  if (!data) {
    return [];
  }

  const banks: Banks[] = data;
  return banks;
}

export async function getAccountTypes(): Promise<AccountTypes[]> {
  const supabaseServer = createClient();
  let { data, error } = await supabaseServer
    .from("AccountTypes")
    .select("id, name, tag")
    .returns<AccountTypes[]>();
  if (error) throw error;

  if (!data) {
    return [];
  }

  const accpuntTypes: AccountTypes[] = data;
  return accpuntTypes;
}

export async function getCurrencies(): Promise<Currencies[]> {
  const supabaseServer = createClient();
  let { data, error } = await supabaseServer
    .from("Currencies")
    .select("id, name, tag")
    .returns<Currencies[]>();
  if (error) throw error;

  if (!data) {
    return [];
  }

  const currencies: Currencies[] = data;
  return currencies;
}

export async function upsertAccount(account: Account): Promise<Account | null> {
  const supabaseServer = createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  account.user_id = user?.id;

  const { data, error } = await supabaseServer
    .from("Accounts")
    .upsert([account])
    .select()
    .returns<Account[]>();
  if (error) throw error;
  if (!data) {
    return null;
  }
  const accountResponse: Account = data[0];
  return accountResponse;
}

export async function getAccounts(): Promise<Account[]> {
  const supabaseServer = createClient();
  const {
    data: { user },
  } = await supabaseServer.auth.getUser();
  const user_id = user?.id;
  let { data, error } = await supabaseServer
    .from("Accounts")
    .select(
      `*, 
       bank:bank_id (
       name
       )`
    )
    .eq("user_id", user_id)
    .returns<Account[]>();
  if (error) throw error;

  if (!data) {
    return [];
  }

  const accounts: Account[] = data;
  return accounts;
}

export async function getAccount(id: string): Promise<Account | null> {
  const supabaseServer = createClient();
  let { data, error } = await supabaseServer
    .from("Accounts")
    .select(`*`)
    .eq("id", id)
    .returns<Account[]>();
  if (error) throw error;

  if (!data) {
    return null;
  }

  const account: Account = data[0];
  return account;
}
