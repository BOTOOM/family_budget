/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kSGRir7Uhwq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { getDictionary } from "@/app/dictionaries";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Account } from "@/services/types";
import Link from "next/link";

export default async function AccountCard({ account, lng }: { account: Account, lng: string }) {
  const dict = await getDictionary(lng);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{account.name}</h2>
          <div className="text-primary font-medium">
            {account.current_balance.toLocaleString("es-CO", { style: 'currency', currency: 'COP' })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-muted-foreground">{dict.account.bank}</div>
          <div className="font-medium">{account.bank?.name}</div>
        </div>
        <div className="flex justify-between">
          <Link href={`accounts/${account.id}/transactions`}>
            <Button variant="outline">{dict.account.view}</Button>
          </Link>
          <Link href={`accounts/${account.id}`}>
            <Button variant="secondary">{dict.common.edit}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
