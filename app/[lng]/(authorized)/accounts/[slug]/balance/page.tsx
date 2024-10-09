import AccountBalanceComponent from "@/components/accounts/balance/balance";
import { getBalanceAccounts } from "@/services";

export default async function AccountsBalancePage({
  params: { lng, slug },
}: {
  params: { lng: string; slug: string };
}) {
  const balanceAccounts = await getBalanceAccounts(slug);

  return (
    <div className=" flex items-center justify-center">
      <AccountBalanceComponent lng={lng} balanceaccounts={balanceAccounts} />
    </div>
  );
}
