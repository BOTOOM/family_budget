/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kSGRir7Uhwq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { getDictionary } from "@/app/dictionaries";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BalanceAccount } from "@/services/types";
import { format } from "date-fns";
import Link from "next/link";

export default async function BalanceCard({
  accountbalance,
  lng,
}: {
  accountbalance: BalanceAccount;
  lng: string;
}) {
  const dict = await getDictionary(lng);
  const balanceammount = accountbalance.end_ammount
    ? accountbalance.end_ammount
    : accountbalance.start_ammount;
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {format(accountbalance.start_date ?? "", "PP")}
          </h2>
          <div className="text-primary font-medium">
            {balanceammount?.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {/* <div className="text-muted-foreground">{dict.account.bank}</div>
          <div className="font-medium">no se</div> */}
        </div>
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <Link
            className="w-full sm:w-auto"
            href={`balance/${accountbalance.id}`}
          >
            <Button variant="secondary">{dict.common.edit}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
