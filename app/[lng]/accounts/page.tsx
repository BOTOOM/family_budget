import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountsPage({
  params: { lng }
}: {
  params: { lng: string }
}) {
  

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      Accounts
    </div>
  );
}
