/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JRoBiirkjvF
 */

import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HomeIcon } from "../icons/home";
import { DollarSignIcon } from "../icons/dollar";
import { MenuIcon } from "../icons/menu";
import { SearchIcon, Wallet } from "lucide-react";
import AuthButton from "../AuthButton";
import { getDictionary } from "@/app/dictionaries";
import { cn } from "@/lib/utils";
import DynamicBreadCrump from "./navbar/DynamicBreadCrump";
import TooltipMenuList from "./navbar/TooltipMenuList";
import SettingsList from "./navbar/SettingsList";
import MenuList from "./navbar/MenuList";
export default async function NavBar({
  children, // will be a page or nested layout
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const dict = await getDictionary(lng);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {/* <TooltipMenuList lng={lng} /> */}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            {/* <MenuList lng={lng} /> */}
          </Sheet>
          <DynamicBreadCrump lng={lng} />
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={dict.navbar.search}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          {/* <SettingsList lng={lng} /> */}
        </header>
        <main className="">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
