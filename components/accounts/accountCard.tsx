/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kSGRir7Uhwq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Account } from "@/services/types";
import Link from "next/link";

export default function AccountCard({ account }: { account: Account }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{account.name}</h2>
          <div className="text-primary font-medium">
            ${account.current_balance}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-muted-foreground">Bank</div>
          <div className="font-medium">{account.bank?.name}</div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline">View Transactions</Button>
          <Link href={`accounts/${account.id}`}>
            <Button variant="secondary">Edit</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
