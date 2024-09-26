"use server";

import { getCategories, upsertAccount, upsertTransaction } from "@/services";
import type {
	Account,
	AccountTransactionsForm,
	Categories,
} from "@/services/types";
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

export async function GetCategoriesAction(): Promise<Categories[]> {
	const result = await getCategories();
	console.log("UpsertAccountAction", result);
	return result;
}

export async function UpsertAccountTransactionAction(
	transaction: AccountTransactionsForm,
) {
	console.log("llegamos", transaction);
	const result = await upsertTransaction(transaction);
	console.log("UpsertAccountTransactionAction", result);
	return result;
	// if (account.id) {
	//   redirect(`/${lng}/accounts/${account.id}`);
	// } else {
	//   redirect(`/${lng}/accounts`);
	// }
}
