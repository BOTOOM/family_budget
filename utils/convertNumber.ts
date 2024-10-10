export function adjustNumberByDebit(is_debit: boolean, number: number) {
    return is_debit ? -Math.abs(number) : Math.abs(number);
  }
