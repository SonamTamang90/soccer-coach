import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import {
  Gauge,
  Dumbbell,
  User,
  Users,
  Trophy,
  Calendar,
  Bell,
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarHeading {
  heading: string;
  items: SidebarItem[];
}

type SidebarLink = SidebarItem | SidebarHeading;

const sidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Gauge as React.ElementType,
  },
  {
    name: "Training",
    href: "/dashboard/exercises",
    icon: Dumbbell as React.ElementType,
  },
  {
    name: "Perfomance",
    href: "/dashboard/exercises",
    icon: Dumbbell as React.ElementType,
  },
  {
    name: "My Results",
    href: "/dashboard/profile",
    icon: User as React.ElementType,
  },
  {
    heading: "General",
    items: [
      {
        name: "Team",
        href: "/dashboard/exercises",
        icon: Users as React.ElementType,
      },
      {
        name: "Upcoming Matches",
        href: "/dashboard/profile",
        icon: Calendar as React.ElementType,
      },
      {
        name: "Tournaments",
        href: "/dashboard/profile",
        icon: Trophy as React.ElementType,
      },
    ],
  },
];

const bottomLinks: SidebarItem[] = [
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell as React.ElementType,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog8ToothIcon as React.ElementType,
  },
];

export { sidebarLinks, bottomLinks };
