import AccountDetailComponent from "@/components/accounts/detail/accountDetail";
import AuthButton from "@/components/AuthButton";
import { getBanks } from "@/services";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AccountDetailPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const banks = await getBanks();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Suspense>
        <AccountDetailComponent banks={banks} />
        {/* <AccountDetailComponent banks={banks} /> */}
      </Suspense>
    </div>
  );
}
