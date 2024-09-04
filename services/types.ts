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
  bank_id: string  | null;
  bank?: Banks | null;
  closing_date: string | null;
  currency_id: string;
  current_balance: number;
  id?: string | null;
  initial_balance: number;
  name: string;
  payment_date: string | null;
  user_id?: string;
}
