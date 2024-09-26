import AccountComponent from "@/components/accounts/account";
import AuthButton from "@/components/AuthButton";
import { getAccounts } from "@/services";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountsPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const accounts = await getAccounts();

  return (
    <div className=" flex items-center justify-center">
      <AccountComponent lng={lng} accounts={accounts} />
    </div>
  );
}
