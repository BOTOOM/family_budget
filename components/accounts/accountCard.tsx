/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kSGRir7Uhwq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function AccountCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chase Bank</h2>
          <div className="text-primary font-medium">$12,345.67</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-muted-foreground">Account Name</div>
          <div className="font-medium">John Doe</div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline">View Transactions</Button>
          <Button variant="secondary">Edit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
