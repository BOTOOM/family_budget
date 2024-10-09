/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kSGRir7Uhwq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import BalanceCard from "./balanceCard";
import Link from "next/link";
import { BalanceAccount } from "@/services/types";
import { getDictionary } from "@/app/dictionaries";

export default async function AccountBalanceComponent({
  lng,
  balanceaccounts,
}: {
  lng: string;
  balanceaccounts: BalanceAccount[];
}) {
  const dict = await getDictionary(lng);
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{dict.accountbalance.title}</h1>
        <Link href={`balance/new`}>
          <Button>{dict.accountbalance.add_account}</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {balanceaccounts.map((balanceaccount) => {
          return (
            <BalanceCard key={balanceaccount.id} accountbalance={balanceaccount} lng={lng} />
          )
        })}
      </div>
    </div>
  );
}
