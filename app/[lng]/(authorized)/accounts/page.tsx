import AccountComponent from "@/components/accounts/account";
import { getAccounts } from "@/services";

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
