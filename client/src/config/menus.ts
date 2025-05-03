// import { Roles } from "@/constants";
// import {
//   LayoutDashboard,
//   PackageSearch,
//   Mail,
//   MessageSquare,
//   Tags,
//   Box,
//   Briefcase,
//   ShoppingCart,
//   Truck,
//   BarChart3,
//   Grid,
//   ListTree,
//   Shield,
//   BadgePercent,
//   Store,
// } from "lucide-react";

// export interface MenuItemProps {
//   title: string;
//   icon: any;
//   href?: string;
//   child?: MenuItemProps[];
//   megaMenu?: MenuItemProps[];
//   multi_menu?: MenuItemProps[];
//   nested?: MenuItemProps[];
//   onClick: () => void;
//   requiredRole?: string[];
// }

// export const menusConfig = {
//   mainNav: [],
//   sidebarNav: {
//     classic: [
//       {
//         isHeader: true,
//         title: "menu",
//       },
//       {
//         title: "Dashboard",
//         icon: LayoutDashboard,
//         href: "/dashboard",
//       },
//       {
//         title: "Category",
//         icon: Grid,
//         href: "/dashboard/category",
//       },
//       {
//         title: "Sub-Category",
//         icon: ListTree,
//         href: "/dashboard/sub-category",
//       },
//       {
//         title: "Attributes",
//         icon: Tags,
//         href: "/dashboard/attributes",
//       },
//       {
//         title: "Brand",
//         icon: Briefcase,
//         href: "/dashboard/brand",
//       },
//       {
//         title: "Product",
//         icon: PackageSearch,
//         href: "/dashboard/product",
//       },
//       {
//         title: "Vendor",
//         icon: Store,
//         href: "/dashboard/vendor",
//         requiredRole: [Roles.ADMIN, Roles.SUPER_ADMIN],
//       },
//       {
//         title: "Location",
//         icon: Store,
//         href: "/dashboard/location",
//         requiredRole: [Roles.VENDOR],
//       },
//       {
//         title: "Order",
//         icon: ShoppingCart,
//         href: "/dashboard/order",
//       },
//       {
//         title: "Delivery",
//         icon: Truck,
//         href: "/dashboard/delivery",
//       },
//       {
//         title: "Reports",
//         icon: BarChart3,
//         href: "/dashboard/reports",
//       },
//     ],
//   },
// };

// export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
// export type MainNavType = (typeof menusConfig.mainNav)[number];

import { RolesEnum, RoleType } from "@/constants";
import {
  LayoutDashboard,
  PackageSearch,
  Mail,
  MessageSquare,
  Tags,
  Box,
  Briefcase,
  ShoppingCart,
  Truck,
  BarChart3,
  Grid,
  ListTree,
  Shield,
  BadgePercent,
  Store,
  MapPin,
  User,
  Lightbulb,
} from "lucide-react";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick?: () => void;
  requiredRole?: RoleType[]; // Update this to use RoleType
  isHeader?: boolean;
}

export const menusConfig = {
  mainNav: [] as MenuItemProps[],
  sidebarNav: {
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        title: "Landing Page",
        icon: Lightbulb,
        requiredRole: [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN],
        child: [
          {
            title: "Slider",
            href: "/dashboard/slider",
            icon: LayoutDashboard,
          },
          {
            title: "Banner",
            href: "/dashboard/banner",
            icon: LayoutDashboard,
          },
        ],
      },
      {
        title: "Category",
        icon: Grid,
        href: "/dashboard/category",
        requiredRole: [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN],
      },
      {
        title: "Sub-Category",
        icon: ListTree,
        href: "/dashboard/sub-category",
        requiredRole: [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN],
      },
      {
        title: "Attributes",
        icon: Tags,
        href: "/dashboard/attributes",
        requiredRole: [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN],
      },
      {
        title: "Brand",
        icon: Briefcase,
        href: "/dashboard/brand",
        requiredRole: [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN],
      },
      {
        title: "Product",
        icon: PackageSearch,
        href: "/dashboard/product",
      },
      {
        title: "Vendor",
        icon: Store,
        href: "/dashboard/vendor",
        requiredRole: [RolesEnum.ADMIN, RolesEnum.SUPER_ADMIN],
      },
      {
        title: "Location",
        icon: MapPin,
        href: "/dashboard/location",
        requiredRole: [RolesEnum.VENDOR],
      },
      {
        title: "Order",
        icon: ShoppingCart,
        href: "/dashboard/order",
      },
      {
        title: "Delivery",
        icon: Truck,
        href: "/dashboard/delivery",
      },
      {
        title: "User",
        icon: User,
        href: "/dashboard/user",
      },
      {
        title: "Reports",
        icon: BarChart3,
        href: "/dashboard/reports",
      },
    ] as MenuItemProps[],
  },
};

export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
