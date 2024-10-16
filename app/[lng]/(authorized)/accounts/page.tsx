import AccountComponent from "@/components/accounts/account";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountsPage({
  params: { lng }
}: {
  params: { lng: string }
}) {
  

  return (
    <div className=" flex items-center justify-center">
      <AccountComponent/>
    </div>
  );
}
