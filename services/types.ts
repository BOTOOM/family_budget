export interface Banks {
	id: string;
	name: string;
}

export interface AccountTypes {
	id: string;
	name: string;
	tag: string;
}

export interface Currencies {
	exchange_rate: number;
	id: string;
	name: string;
	symbol: string;
	tag: string;
}

export interface Account {
	account_number: string | null;
	account_type_id: string;
	bank_id: string | null;
	bank?: Banks | undefined;
	closing_date: string | null;
	currency_id: string;
	current_balance: number;
	id?: string | null;
	initial_balance: number;
	name: string;
	payment_date: string | null;
	user_id?: string;
}

export interface AccountTransactions {
	account_id: string;
	amount: number;
	author_id: string;
	comment: string | null;
	date: string;
	id: string;
	transaction_categorie_id: string | null;
	transaction_type: string;
	name: string;
	categorie?: { name: string; tag: string } | undefined;
	is_debit: boolean;
}

export interface AccountTransactionsForm
	extends Omit<AccountTransactions, "transaction_type" | "author_id" | "id"> {
	id?: string;
}

export interface Categories {
	family_id: string | null;
	id: string;
	is_general: boolean | null;
	name: string;
	parent_category_id: string | null;
	tag: string | null;
}

export interface TransactionCategories {
	category_id: string | null;
	id: string;
	transaction_id: string;
}

export interface BalanceAccount {
	account_id: string | null;
	end_ammount: number | null;
	end_date: string | null;
	id?: string | null;
	is_closed: boolean | null;
	notes: string | null;
	start_ammount: number | null;
	start_date: string | null;
}
