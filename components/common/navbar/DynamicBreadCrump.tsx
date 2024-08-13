"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function DynamicBreadCrump({ lng }: { lng: string }) {
  const path = usePathname().replace(`/${lng}`, "");

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`${lng}/dashboard`} prefetch={false}>
              holi, {path}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Remittance Monitoring</BreadcrumbPage>
          </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
