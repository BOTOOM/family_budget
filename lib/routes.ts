import { HomeIcon, LucideProps, Wallet } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface INavBarRoutesBase {
    tag: string;
    url: string;
}

export interface INavBarRoutes extends INavBarRoutesBase {
    i18n: (dict: any) => any;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

}

export const NavBarRoutes: INavBarRoutes[] = [
  {
    tag: "dashboard",
    i18n: (dict:any) => {
      return dict.navbar.dashboard;
    },
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    tag: "accounts",
    i18n: (dict:any) => {
        return dict.navbar.accounts;
      },
    url: "/accounts",
    icon: Wallet,
  },
];

export function routeItemActive (lng: string, path: string, item: string) {
    console.log("validando", path.replace(`/${lng}`, "") === item,path.replace(`/${lng}`, "") ,item)
    if (path.replace(`/${lng}`, "") === item) return true
    return false
}