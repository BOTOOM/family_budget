/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JRoBiirkjvF
 */

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import AuthButton from "../../AuthButton";
import { getDictionary } from "@/app/dictionaries";
import { User } from "lucide-react";
export default async function SettingsList({ lng }: { lng: string }) {
  const dict = await getDictionary(lng);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{dict.navbar.my_account}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{dict.navbar.settings}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <AuthButton lng={lng} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
