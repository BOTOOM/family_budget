"use server";

import {
	getCategories,
	upsertAccount,
	upsertBalanceAccount,
	upsertTransaction,
} from "@/services";
import type {
	Account,
	AccountTransactionsForm,
	BalanceAccount,
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
	transactions: AccountTransactionsForm[],
) {
	console.log("llegamos", transactions);
	const result = await upsertTransaction(transactions);
	console.log("UpsertAccountTransactionAction", result);
	return result;
	// if (account.id) {
	//   redirect(`/${lng}/accounts/${account.id}`);
	// } else {
	//   redirect(`/${lng}/accounts`);
	// }
}

export async function UpsertAccountBalanceAction(
	accountbalance: BalanceAccount,
	lng: string,
) {
	console.log("llegamos", accountbalance);
	const result = await upsertBalanceAccount(accountbalance);
	console.log("UpsertAccountAction", result);
	if (accountbalance.id) {
		redirect(
			`/${lng}/accounts/${accountbalance.account_id}/balance/${accountbalance.id}`,
		);
	} else {
		redirect(`/${lng}/accounts/${accountbalance.account_id}/balance`);
	}
}
