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

import { DollarSignIcon } from "../../icons/dollar";
import { getDictionary } from "@/app/dictionaries";
import { cn } from "@/lib/utils";
import { NavBarRoutes } from "@/lib/routes";

export default async function TooltipMenuList({ lng }: { lng: string }) {
  const dict = await getDictionary(lng);

  return (
    <TooltipProvider>
      <Link
        href="#"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        prefetch={false}
      >
        <DollarSignIcon className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Family Budget</span>
      </Link>
      {NavBarRoutes.map((route) => {
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/${lng}${route.url}`}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                )}
                prefetch={false}
              >
                <route.icon className="h-5 w-5" />
                <span className="sr-only">{route.i18n(dict)}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              {dict.navbar.dashboard}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </TooltipProvider>
  );
}
