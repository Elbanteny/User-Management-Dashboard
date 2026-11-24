import type React from "react";
import { IconHome, IconUsers, IconShield, IconSettings } from "@/components/ui/Icons";

export interface NavItemConfig {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  getBadge?: (data: { usersCount: number; rolesCount: number }) => number;
}

export const navigationConfig: NavItemConfig[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    icon: <IconHome />,
  },
  {
    id: "users",
    name: "Pengguna",
    path: "/users",
    icon: <IconUsers />,
    getBadge: (data) => data.usersCount,
  },
  {
    id: "roles",
    name: "Peran",
    path: "/roles",
    icon: <IconShield />,
    getBadge: (data) => data.rolesCount,
  },
  {
    id: "settings",
    name: "Pengaturan",
    path: "/settings",
    icon: <IconSettings />,
  },
];
