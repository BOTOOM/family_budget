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
import { HomeIcon } from "../icons/home";
import { DollarSignIcon } from "../icons/dollar";
import { MenuIcon } from "../icons/menu";
import { SearchIcon, Wallet } from "lucide-react";
import AuthButton from "../AuthButton";
import { getDictionary } from "@/app/dictionaries";
import { cn } from "@/lib/utils";

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
          <TooltipProvider>
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <DollarSignIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Family Budget</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${lng}/dashboard`}
                  className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8",)}
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span className="sr-only">{dict.navbar.dashboard}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{dict.navbar.dashboard}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${lng}/accounts`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <Wallet className="h-5 w-5" />
                  <span className="sr-only">{dict.navbar.accounts}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{dict.navbar.accounts}</TooltipContent>
            </Tooltip>
            
          </TooltipProvider>
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
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  prefetch={false}
                >
                  <DollarSignIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Family Budget</span>
                </Link>

                <Link
                  href={`/${lng}/dashboard`}
                  className="flex items-center gap-4 px-2.5 text-foreground"
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  {dict.navbar.dashboard}
                </Link>
                <Link
                  href={`/${lng}/accounts`}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Wallet className="h-5 w-5" />
                  {dict.navbar.accounts}
                </Link>
                
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`${lng}/dashboard`} prefetch={false}>
                    {dict.navbar.dashboard}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Remittance Monitoring</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={dict.navbar.search}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
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
        </header>
        <main className="">
          <div className="">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
