/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kSGRir7Uhwq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import AccountCard from "./accountCard"

export default function AccountComponent() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bank Accounts</h1>
        <Button>Add Bank Account</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccountCard/>
        <AccountCard/>
        <AccountCard/>
        
        
      </div>
    </div>
  )
}