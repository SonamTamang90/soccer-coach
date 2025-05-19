"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  Cog8ToothIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
  { name: "Jobs", href: "/dashboard/jobs", icon: BriefcaseIcon },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: ClipboardDocumentListIcon,
    badge: {
      text: "New",
      color: "bg-green-500",
    },
  },
  { name: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog8ToothIcon,
  },
];

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-indigo-700 dark:bg-indigo-950">
      <div className="flex h-16 items-center justify-center border-b border-indigo-600 dark:border-indigo-900">
        <h2 className="text-2xl font-bold text-white">Auth App</h2>
      </div>
      <div className="flex grow flex-col justify-between p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-indigo-800 text-white dark:bg-indigo-900"
                    : "text-indigo-100 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-800"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 flex-shrink-0 ${
                    isActive ? "text-white" : "text-indigo-300"
                  }`}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span
                    className={`ml-2 inline-flex items-center rounded-full ${item.badge.color} px-2 py-0.5 text-xs font-medium text-white`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="pt-4">
          <button
            onClick={onLogout}
            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-800"
          >
            <ArrowLeftOnRectangleIcon
              className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
