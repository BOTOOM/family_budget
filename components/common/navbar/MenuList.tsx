import Link from "next/link";
import { SheetContent } from "@/components/ui/sheet";

import { DollarSignIcon } from "../../icons/dollar";
import { getDictionary } from "@/app/dictionaries";
import { NavBarRoutes } from "@/lib/routes";
import MenuItemList from "./MenuItemList";

export default async function MenuList({ lng }: { lng: string }) {
  const dict = await getDictionary(lng);

  return (
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
        {NavBarRoutes.map((route, index) => {
          const Icon = route.icon;
          return (
            <MenuItemList
              key={`mi-${index}-${route.tag}`}
              lng={lng}
              item={{
                tag: route.tag,
                url: route.url,
              }}
            >
              <Icon className="h-5 w-5" />
            </MenuItemList>
          );
        })}
      </nav>
    </SheetContent>
  );
}
