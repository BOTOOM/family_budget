import BalanceAccountDetailComponent from "@/components/accounts/balance/detail/balanceAccountDetail";
import { getAccountBalanceByID } from "@/services";
import { BalanceAccount } from "@/services/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AccountDetailPage({
  params: { lng, slugBalance, slug },
}: {
  params: { lng: string; slugBalance: string; slug: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  let balance: BalanceAccount | null = null;
  if (slugBalance !== "new") {
    balance = await getAccountBalanceByID(slugBalance);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Suspense>
        <BalanceAccountDetailComponent
          lng={lng}
          slugBalance={slugBalance}
          slugAccount={slug}
          balance={balance}
        />
      </Suspense>
    </div>
  );
}
