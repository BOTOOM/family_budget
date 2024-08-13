"use client";

import Link from "next/link";

import {
  INavBarRoutesBase,
  routeItemActive,
} from "@/lib/routes";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MenuItemList({
  lng,
  children,
  item
}: {
  lng: string;
  item: INavBarRoutesBase;
  children: React.ReactNode;

}) {
  const path = usePathname();
  const active = routeItemActive(lng, path, item.url)
  console.log({
    "text-foreground": active,
  },
  { "text-muted-foreground hover:text-foreground": !active })
  return (
    <Link
      href={`/${lng}${item.url}`}
      className={clsx(
        "flex items-center gap-4 px-2.5  hover:text-foreground",
        {
          "text-foreground": active,
        },
        { "text-muted-foreground": !active }
      )}
      prefetch={false}
    >
      {children}
      {item.tag}
    </Link>
  );
}
