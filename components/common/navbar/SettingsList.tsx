/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JRoBiirkjvF
 */
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HomeIcon } from "../../icons/home";
import { DollarSignIcon } from "../../icons/dollar";
import { MenuIcon } from "../../icons/menu";
import { SearchIcon, Wallet } from "lucide-react";
import AuthButton from "../../AuthButton";
import { getDictionary } from "@/app/dictionaries";
import { cn } from "@/lib/utils";
import DynamicBreadCrump from "./DynamicBreadCrump";
import { NavBarRoutes } from "@/lib/routes";
import TooltipMenuList from "./TooltipMenuList";
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
          <img
            src="/placeholder.svg"
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
            style={{ aspectRatio: "36/36", objectFit: "cover" }}
          />
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
