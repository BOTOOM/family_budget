import { createClient } from "@/utils/supabase/server";
import type {
	Account,
	AccountTransactions,
	AccountTransactionsForm,
	AccountTypes,
	BalanceAccount,
	Banks,
	Categories,
	Currencies,
} from "./types";

export async function getBanks(): Promise<Banks[]> {
	const supabaseServer = createClient();
	const { data, error } = await supabaseServer
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
	const { data, error } = await supabaseServer
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
	const { data, error } = await supabaseServer
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
	const { data, error } = await supabaseServer
		.from("Accounts")
		.select(
			`*, 
       bank:bank_id (
       name
       )`,
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
	const { data, error } = await supabaseServer
		.from("Accounts")
		.select("*")
		.eq("id", id)
		.returns<Account[]>();
	if (error) throw error;

	if (!data) {
		return null;
	}

	const account: Account = data[0];
	return account;
}

export async function getCategories(): Promise<Categories[]> {
	const supabaseServer = createClient();
	const { data, error } = await supabaseServer
		.from("Categories")
		.select("id, name, tag")
		.order("name", { ascending: true })
		.returns<Categories[]>();
	if (error) throw error;

	if (!data) {
		return [];
	}

	const categories: Categories[] = data;
	return categories;
}

export async function upsertTransaction(
	transactionData: Partial<AccountTransactionsForm>,
): Promise<AccountTransactions | null> {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await supabaseServer.auth.getUser();
	console.log("user", user);
	console.log("user id", user?.id);

	if (!user?.id) {
		console.log("SIN USUARIO");
		return null;
	}
	const user_id = user?.id;
	const transaction: Partial<AccountTransactions> = {
		...transactionData,
		author_id: user_id ?? "",
		transaction_type: "",
	};

	const { data, error } = await supabaseServer
		.from("AccountTransactions")
		.upsert([transaction])
		.select()
		.returns<AccountTransactions[]>();
	console.log({ data, error });
	if (error) throw error;
	if (!data) {
		return null;
	}
	const accountResponse: AccountTransactions = data[0];
	return accountResponse;
}

export async function getaccountTransactions(
	account_id: string,
): Promise<AccountTransactions[]> {
	const supabaseServer = createClient();
	const { data, error } = await supabaseServer
		.from("AccountTransactions")
		.select(
			`*, 
       categorie:transaction_categorie_id (
       name, tag
       )`,
		)
		.eq("account_id", account_id)
		.order("date", { ascending: false })
		.range(0, 9)
		.returns<AccountTransactions[]>();
	if (error) throw error;

	if (!data) {
		return [];
	}
	const transactions: AccountTransactions[] = data;
	return transactions;
}

export async function getBalanceAccounts(
	account_id: string,
): Promise<BalanceAccount[]> {
	const supabaseServer = createClient();

	const { data, error } = await supabaseServer
		.from("BalanceAccount")
		.select("*")
		.eq("account_id", account_id)
		.returns<BalanceAccount[]>();
	if (error) throw error;

	if (!data) {
		return [];
	}

	const balanceaccounts: BalanceAccount[] = data;
	return balanceaccounts;
}

export async function getAccountBalanceByID(
	id: string,
): Promise<BalanceAccount | null> {
	const supabaseServer = createClient();
	const { data, error } = await supabaseServer
		.from("BalanceAccount")
		.select("*")
		.eq("id", id)
		.returns<BalanceAccount[]>();
	if (error) throw error;

	if (!data) {
		return null;
	}

	const balanceaccount: BalanceAccount = data[0];
	return balanceaccount;
}

export async function upsertBalanceAccount(
	balanceaccount: BalanceAccount,
): Promise<BalanceAccount | null> {
	const supabaseServer = createClient();

	const { data, error } = await supabaseServer
		.from("BalanceAccount")
		.upsert([balanceaccount])
		.select()
		.returns<BalanceAccount[]>();
	if (error) throw error;
	if (!data) {
		return null;
	}
	const accountResponse: BalanceAccount = data[0];
	return accountResponse;
}
