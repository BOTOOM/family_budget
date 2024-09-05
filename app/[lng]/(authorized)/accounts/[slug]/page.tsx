import AccountDetailComponent from "@/components/accounts/detail/accountDetail";
import AuthButton from "@/components/AuthButton";
import {
  getAccount,
  getAccountTypes,
  getBanks,
  getCurrencies,
} from "@/services";
import { Account } from "@/services/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AccountDetailPage({
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
  const banks = await getBanks();
  const accountTypes = await getAccountTypes();
  const currencies = await getCurrencies();
  let account: Account | null = null;
  if (slug !== "new") {
    account = await getAccount(slug);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Suspense>
        <AccountDetailComponent
          lng={lng}
          banks={banks}
          accountTypes={accountTypes}
          currencies={currencies}
          account={account}
          slug={slug}
        />
      </Suspense>
    </div>
  );
}
