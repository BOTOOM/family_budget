import AccountTransactionsComponent from "@/components/accounts/accountTransactions/accountTransaction";
import { getaccountTransactions, getCategories } from "@/services";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AccountTransactionsPage({
  params: { lng, slug },
}: {
  params: { lng: string; slug: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const transactions = await getaccountTransactions(slug)
  console.log("tran", transactions)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Suspense>
        <AccountTransactionsComponent accountTransactions={transactions} lng={lng} />
      </Suspense>
    </div>
  );
}
